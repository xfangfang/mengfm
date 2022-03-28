import scrapy
from mengfm.items import MengfmItem
import os
import json
from urllib.parse import urlparse
from mengfm.pipelines import DOWNLOAD_PATH


class UserSpider(scrapy.Spider):
    name = 'user'
    allowed_domains = ['www.mengfm.com']
    start_urls = []
    # 想要下载的show id 列表
    items = [18701442,18701419,18643069,18629687,18533637,18496415,18496386,18496331,18447287,18415849,18073460,18073421,18073395,18073356,18046874,18046830,18046752,18046679,18026996,18026959,18026946,18024842,18013697,18013660,18013644,18013616,17985156,17985083,17964811,17964735,17964588,17925833,17384301,16768188,15822675,15301639,15301376,15301328,15301117,15289275,14157456,13178073,12861562,12397235,12397051,12396918,12364375,12364362,11938485,11607713,11336674,11256029,11255760,11255619,11191155,10973845,10854866,10688556,10687075,10681821,8992546,8992333,8991938,8991819,8991508,8991234,8985822,6613050]
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
