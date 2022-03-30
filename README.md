# 麦萌的纪念站

通过爬虫获取广播剧数据用于个人留念

### 如何记录广播剧

1. clone项目（template分支包含最简单的示例数据，可以加速拉取的速度） `git clone --depth=1  -b template https://github.com/xfangfang/mengfm.git`  
2. 自定义 `mengfm/spiders/meng_user.py` 中的 `items` 列表，此列表为广播剧的id列表，将所有你想留存的广播剧id填入此列表，关于获取广播剧id的诸多方式请看附录  
3. 补充上一条：如果只需要爬取某个人的所有广播剧，只需要修改 `mengfm/settings.py` 下的 `MENG_USER_ID` 为他的用户id即可  
4. 运行爬虫：`scrapy crawl user`  
5. 检查爬虫结果：`python check_download.py` （可能存在部分图片未下载成功，这是因为爬虫设置了不重复下载，在 `mengfm/popelines.py` 设置 `dont_filter` 为True重新爬虫即可）  
6. 生成首页数据：`python generate_index.py`
7. 本地测试，项目根目录：`python -m http.server` 浏览器访问：`localhost:8000/docs`  
8. 上传到Github部署，仓库开启 `Github Pages`（注意选择部署根目录为：`docs`）

⚠️：爬虫时请注意不要影响官方网站的正常使用，合理配置爬虫速度、爬虫时间。

### 附录

#### 如何获取广播剧id

1. 直接从客户端分享链接，如：http://www.mengfm.com/show/20222022

2. 从用户的个人首页获取：http://www.mengfm.com/member/999999

3. 从随机推荐获取：http://www.mengfm.com/allshow

4. 麦萌的广播剧id从1开始计数，所以原则上只需要遍历就可以了：http://www.mengfm.com/show/20222022

5. 从剧本的分享链接中获取：http://m.mengfm.com/share/script/530524


#### 如何获取个人的全部广播剧id

1. 如果个人广播剧数量小于等于20个，那么可以通过个人首页获取: http://www.mengfm.com/member/999999

2. 数量大于20个推荐抓包客户端获取

3. 如果想自动化抓取个人用户的所有广播剧，这里提供一下思路：  
麦萌客户端访问api时增加了加密header阻止自定义访问服务，我尝试反编译了一下麦萌的安卓客户端，发现其使用header字段、时间戳与api链接生成了加密的key，加密算法由一个so文件提供，考虑到在这上面花太多时间有点浪费，所以我直接抓包客户端数据获取了个人广播剧，希望我的分析可以对后面有需求的朋友有帮助。

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
