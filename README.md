## Font-End-Blog
> 前端博客，在于记录平时开发中技术，体会，总结。

> github + hexo + vueUI

### 主页
[kuangpf.github.io/blog](https://kuangpf.github.io/blog)

![README-img1](https://github.com/KuangPF/blog/blob/blog/source/img/readme-img/readme1.png)

![README-img2](https://github.com/KuangPF/blog/blob/blog/source/img/readme-img/readme2.png)

![README-img3](https://github.com/KuangPF/blog/blob/blog/source/img/readme-img/readme3.png)

### 前言
当你接触到更多的技术，更加优雅的代码写法，更加有趣的代码demo。你总会有个想法，将他记录下来，告诉自己以后来看(其实都懂，再也不会来看:innocent::innocent:)，然后我们骗了自己一次又一次。其实可以写成博客，从而不骗自己，至少在写博客的时候没有骗自己。
### 实现
该博客采用的是`github`+`hexo`+`vue-UI`,其实这样来描述不是很准确，因为`vue-UI`并不是具体的某个UI框架，我这样形容是由于该博客采用了`vue`的官网风格，这个实现是使用了`hexo`主题[vexo](https://github.com/yanm1ng/hexo-theme-vexo),并在此做了一些简单的修改，简单点，就是中了`vue`的毒....
### 统计
使用[不蒜子](http://ibruce.info/)对博客进行统计，分为网站的浏览量和文章的阅读数，使用方法可参考官方介绍，以下是将官网的方法搬运了以下
  * 通过标签引入脚本
``` html
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
  * 显示站点总访问量
``` html
## 要显示站点总访问量，复制以下代码添加到你需要显示的位置。有两种算法可选：
算法a：pv的方式，单个用户连续点击n篇文章，记录n次访问量。

<span id="busuanzi_container_site_pv">
    本站总访问量<span id="busuanzi_value_site_pv"></span>次
</span>

算法b：uv的方式，单个用户连续点击n篇文章，只记录1次访客数。

<span id="busuanzi_container_site_uv">
  本站访客数<span id="busuanzi_value_site_uv"></span>人次
</span>

如果你是用的hexo，打开themes/你的主题/layout/_partial/footer.ejs添加即可。
```
  * 显示单页面访问量
``` html
## 要显示每篇文章的访问量，复制以下代码添加到你需要显示的位置。
算法：pv的方式，单个用户点击1篇文章，本篇文章记录1次阅读量。

<span id="busuanzi_container_page_pv">
  本文总阅读量<span id="busuanzi_value_page_pv"></span>次
</span>

代码中文字是可以修改的，只要保留id正确即可。
```
  * 显示站点总访问量和单页面访问量: 你懂的吧，上面两种标签代码都安装。
  * 只计数不显示: 只安装脚本代码，不安装标签代码。
### 评论
本博客的评论系统采用的是`Gitment`,详情可参开[Gitment教程](https://imsun.net/posts/gitment-introduction/)
### 使用
`master`分支为博客文章，`blog`为开发分支，默认分支是`blog`， 如果需要使用该博客，步骤如下：
``` bash
clone 代码到本地:
git clone https://github.com/KuangPF/kuangpf.github.io.git   

安装依赖： 
cnpm install

启动服务：
hexo server

浏览器打开:
localhost:4000
```