import os
import json

data_path = os.path.join(os.path.dirname(__file__), '../docs/data')
print(data_path)

data = []
for root, dirs, files in os.walk(data_path):
    if root[-4:] == 'data':
        continue
    # print(root, dirs, files)
    print(root)
    info_path = os.path.join(root, 'info_local.json')

    with open(info_path, 'r') as f:
        info = json.load(fp=f)

        data.append({
            'show_id': info['show_id'],
            'show_cover': info['show_cover'],
            'show_intro': info['show_intro'],
            'script_name': info['script_info']['script_name']
        })

data.sort(key=lambda i: i['show_id'], reverse=True)
with open(os.path.join(data_path, 'info.json'), 'w') as f:
    json.dump(obj=data, fp=f, sort_keys=False, indent=4, ensure_ascii=False)



