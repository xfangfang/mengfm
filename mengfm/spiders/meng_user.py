import os
import re
import json
import scrapy
import requests
from urllib.parse import urlparse

from mengfm.items import MengfmItem
from mengfm.pipelines import DOWNLOAD_PATH
from mengfm.settings import MENG_USER_ID

def get_user_shows(user_id):
    url = "http://m.mengfm.com/index.php?c=member&a=loadmoreshowlist"
    index = 1
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    shows = []
    try:
        while True:
            payload=f'startNum={index}&user_id={user_id}'
            response = requests.request("POST", url, headers=headers, data=payload)
            data = re.findall('show_id=([0-9]*)', json.loads(response.text)['content'])
            if len(data) == 0:
                break
            shows += data
            index += 10
    except Exception as e:
        print(e)

    return shows


class UserSpider(scrapy.Spider):
    name = 'user'
    allowed_domains = ['www.mengfm.com']
    start_urls = []
    # 想要下载的show id 列表
    items = get_user_shows(MENG_USER_ID)
    # items = [17925833]

    for i in items:
        start_urls.append(f'http://www.mengfm.com/show/{i:0>8}')

    def parse(self, response):
        info = response.selector.re('showInfo = ({.*})')
        if len(info) == 0:
            return

        item = MengfmItem()
        info = json.loads(info[0])
        item['info'] = info

        urls = []

        urls.append(info['show_icon'])
        urls.append(info['show_cover'])

        # role user pic
        for i in info['show_role']:
            urls.append(i['user_icon'])

        # script_info
        urls.append(info['script_info']['script_icon'])
        urls.append(info['script_info']['script_cover'])
        for i in info['script_info']['script_role']:
            urls.append(i['role_icon'])

        # dialogues
        attr = ['dialogue_bgm', 'phase_sound', 'dialogue_sound',
                'dialogue_image', 'dialogue_bgm', 'dialogue_video', 'phase_bgm']
        for i in info['dialogues']:
            for a in attr:
                value = i.get(a, None)
                if value:
                    urls.append(value)
            dialogue_compose = i.get('dialogue_compose', None)
            if dialogue_compose:
                sceneBgUri = dialogue_compose.get('sceneBgUri', None)
                if sceneBgUri:
                    urls.append(sceneBgUri)

        item['file_urls'] = []
        for url in urls:
            if url is None:
                continue
            path = os.path.basename(urlparse(url).path)
            show_id = str(info['show_id'])
            if not os.path.exists(os.path.join(DOWNLOAD_PATH, show_id, path)):
                item['file_urls'].append(url.replace('meng2u', 'mengfm').replace('http://res02', 'http://res'))

        yield item
