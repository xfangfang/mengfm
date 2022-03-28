import os
import json
from urllib.parse import urlparse

data_path = os.path.join(os.path.dirname(__file__), '../public/data')
print(data_path)

for root, dirs, files in os.walk(data_path):
    if root[-4:] == 'data':
        continue
    # print(root, dirs, files)
    print(root)
    info_path = os.path.join(root, 'info.json')
    with open(info_path, 'r') as f:
        info = json.load(fp=f)
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

        for url in urls:
            if url is None:
                continue
            path = os.path.basename(urlparse(url).path)
            show_id = str(info['show_id'])
            if not os.path.exists(os.path.join(data_path, show_id, path)):
                print(url)
