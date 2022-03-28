# 麦萌的纪念站

通过爬虫获取广播剧数据用于个人留念

### 如何记录自己的广播剧

1. fork项目，删除 `public/data` 下的demo数据  
2. 修改 `mengfm/spiders/meng_user.py` 中的 `items` 列表，此列表为单个广播剧的id列表，关于如何获取id列表请看附录  
3. 运行爬虫：`scrapy crawl user`  
4. 检查爬虫结果：`python check_download.py` （可能存在部分图片未下载成功，这是因为爬虫设置了不重复下载，在 `mengfm/popelines.py` 设置 `dont_filter` 为True重新爬虫即可）  
5. 生成首页数据：`python generate_index.py`
6. 上传到github，仓库开启 `Github Pages`

### 附录

#### 如何获取广播剧id

直接从客户端分享链接，如：http://www.mengfm.com/show/20222022

从用户的个人首页获取：http://www.mengfm.com/member/999999

从随机推荐获取：http://www.mengfm.com/allshow

#### 如何获取个人的全部广播剧id

如果个人广播剧数量小于等于20个，那么可以通过个人首页获取

数量大于20个推荐抓包客户端获取

#### 如何自动化的获取所有广播剧

麦萌的广播剧id从1开始计数，所以原则上只需要遍历就可以了：http://www.mengfm.com/show/20222022

如果想定制化抓取单个个人用户的所有广播剧，这里提供一下思路：  
麦萌客户端访问api时增加了加密header阻止自定义访问服务，我尝试反编译了一下麦萌的安卓客户端，发现其使用header字段、时间戳与api链接生成了加密的key，加密算法由一个so文件提供，考虑到在这上面花太多时间有点浪费，所以我直接抓包客户端数据获取的个人广播剧，希望我的分析可以对后面有需求的朋友有帮助。
