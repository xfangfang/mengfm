# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import os
import json
from scrapy.pipelines.files import FilesPipeline
from urllib.parse import urlparse
from scrapy.http import Request


DOWNLOAD_PATH = os.path.join(os.path.dirname(__file__), '../public/data')


def change2local(show_id, url):
    if url:
        return f'data/{show_id}/{os.path.basename(urlparse(url).path)}'
    return url


class MengfmPipeline1:
    def process_item(self, item, spider):
        download_path = os.path.join(DOWNLOAD_PATH, str(item['info']['show_id']))
        if not os.path.exists(download_path):
            os.makedirs(download_path)
        with open(os.path.join(download_path, 'info.json'), "w") as f:
            json.dump(obj=item['info'], fp=f, sort_keys=False, indent=4, ensure_ascii=False)

        info = item['info']
        id = str(item['info']['show_id'])

        # role user pic
        for i in info['show_role']:
            i['user_icon'] = change2local(id, i['user_icon'])

        # script_info
        info['show_icon'] = change2local(id, info['show_icon'])
        info['show_cover'] = change2local(id, info['show_cover'])
        for i in info['script_info']['script_role']:
            i['role_icon'] = change2local(id, i['role_icon'])

        # dialogues
        attr = ['dialogue_bgm', 'phase_sound', 'dialogue_sound',
                'dialogue_image', 'dialogue_bgm', 'dialogue_video', 'phase_bgm']
        for i in info['dialogues']:
            for a in attr:
                i[a] = change2local(id, i[a])

            dialogue_compose = i.get('dialogue_compose', None)
            if dialogue_compose:
                sceneBgUri = dialogue_compose.get('sceneBgUri', None)
                if sceneBgUri:
                    i['dialogue_compose']['sceneBgUri'] = change2local(id, sceneBgUri)

        # userinfo
        info['user_info']['user_icon'] = change2local(id, info['user_info']['user_icon'])

        with open(os.path.join(download_path, 'info_local.json'), "w") as f:
            json.dump(obj=info, fp=f, sort_keys=False, indent=4, ensure_ascii=False)

        return item


class MengfmPipeline(FilesPipeline):

    def get_media_requests(self, item, info):
        urls = ItemAdapter(item).get(self.files_urls_field, [])
        return [Request(u, dont_filter=False) for u in urls]

    def file_path(self, request, response=None, info=None, *, item=None):
        path = os.path.basename(urlparse(request.url).path)
        return os.path.join(str(item['info']['show_id']), path)
