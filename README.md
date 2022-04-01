# 麦萌的纪念站

通过爬虫获取 `麦萌对手戏` 广播剧数据用于个人留念

Demo地址：https://xfangfang.github.io/mengfm/

### 如何使用

1. clone 项目（template 分支包含最简单的示例数据，可以加快拉取的速度）： 

    ```shell
    git clone --depth=1  -b template https://github.com/xfangfang/mengfm.git
    ```  


2. 自定义 `mengfm/spiders/meng_user.py` 中的 `items` 列表，此列表为广播剧的id列表，将所有你想留存的广播剧id填入此列表，关于获取广播剧id的诸多方式请看附录  
3. 补充上一条：如果只需要爬取某个人的所有广播剧，只需要修改 `mengfm/settings.py` 下的 `MENG_USER_ID` 为他的用户id即可  
4. 运行爬虫：`scrapy crawl user`  
5. 检查爬虫结果：`python mengfm/check_download.py` （可能存在部分图片未下载成功，这是因为爬虫设置了不重复下载，在 `mengfm/popelines.py` 设置 `dont_filter` 为True重新爬虫即可）  
6. 生成首页数据：`python  mengfm/generate_index.py`
7. 本地测试，项目根目录：`python -m http.server 8080` 浏览器访问：`localhost:8080/docs`  
8. 补充上一条：本地部署测试推荐使用：`npx http-server -c-1` ，性能更好还可以禁止浏览器缓存，避免service worker缓存影响开发   
9. 上传到 Github 部署，仓库开启 `Github Pages`（选择部署根目录为：`docs`）

⚠️：爬虫时请注意不要影响官方网站的正常使用，合理配置爬虫速度、爬虫时间。

### 附录

#### 如何获取广播剧id

1. 直接从客户端分享链接，如：http://www.mengfm.com/show/20222022

2. 从用户的个人首页获取：http://www.mengfm.com/member/999999

3. 从随机推荐获取：http://www.mengfm.com/allshow

4. 麦萌的广播剧 id 从1开始计数，所以原则上只需要遍历就可以了：http://www.mengfm.com/show/20222022

5. 从剧本的分享链接中获取：http://m.mengfm.com/share/script/530524


#### 如何获取个人的全部广播剧id

1. 如果个人广播剧数量小于等于 20 个，那么可以通过个人首页获取: http://www.mengfm.com/member/999999

2. 数量大于 20 个推荐抓包客户端获取

3. 如果想自动化抓取个人用户的所有广播剧，这里提供一下思路：  
麦萌客户端访问 api 时增加了加密 header 阻止自定义访问服务，我尝试反编译了一下麦萌的安卓客户端，发现其使用 header 字段、时间戳与 api 链接生成了加密的 key，加密算法由一个 so 文件提供，考虑到在这上面花太多时间有点浪费，所以我直接抓包客户端数据获取了个人广播剧，希望我的分析可以对后面有需求的朋友有帮助。

4. 补充，偶然发现了一个没有加密的接口，下面是获取某用户全部广播剧id的示例代码：


```python
import requests,json,re

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

get_user_shows(885928)
```

### 关于麦萌

> `麦萌对手戏` 是全球首款手机声音对戏玩法的APP，是一个声音、文字、图片原创社区，旨在让用户挥洒自我、展现才华！

因为一些原因 `麦萌` 处在关停边缘，为了更好的备份大家的历史剧本，本项目提供了针对个人的快速备份方案，备份页面在麦萌官网页面的基础上还针对性的做了一些调整和修复。


一些改进：

- 修复在iOS设备上音频音量错乱的问题
- 移除无用UI，显示更多剧本相关信息
- 通过service worker自动缓存数据，加快页面打开速度
- 支持PWA，媲美原生应用
  - **android**: Chrome打开Demo地址，点击 `右上角菜单` 选择 `添加到主屏幕`
  - **ios**: Safari打开Demo地址，点击 `分享` 选择 `添加到主屏幕`

