---
title: 总会收集一些有用的 CSS
date: 2018-02-24 09:50:03
tags: [CSS,面试]
summary: 不知道写什么概括语，就这样写吧：目前收集了盒子模型、box-sizing 属性、CSS 选择器、CSS 继承属性、CSS3新特性等等。
---
#### 1. CSS 盒子模型
在一个文档中，每个**元素**都被表示为一个**矩形**的盒子。确定这些盒子的尺寸, 属性 --- 像它的颜色，背景，边框方面 --- 和位置是渲染引擎的标。
在 CSS 中使用标准的**盒模型**来描述这些矩形盒子中的每一个，这个模型描述了元素所占空间的内容。每个盒子有四个边：**外边距边**, **边框边**, **内填充边** 与 **内容边**。分别对应CSS中的 **margin** **border** **padding** **content**。
<img src="/blog/img/css-interview/boxmodel.png">
或者可以这样描述: 宽度(width)=内容的宽度(content) + padding + border + margin
<p class="tip">上面描述的是标准的盒子模型，当然还有低版本IE盒子模型，它可以进行这样描述:宽度(width)=内容的宽度(content+ padding + border) + margin，两者的区别可以很明显的看出。</p>

#### 2. box-sizing 属性
**box-sizing**在开发中很常见，它是盒子模型的解析模式,她有两个值：content-box和border-box,默认为content-box
* **content-box**: 标准的W3C盒子模型，设置元素的height/width属性指的是conent部分的height/width
* **border-box**: IE传统盒子模型，设置元素的height/width属性指的是border+padding+content部分的height/width

> 这个属性很实用，比如你想将一个div的宽度设置为100%，然后又想加一个padding，如果不将box-sizing设置为border-box，那么这个div就会溢出，反之就是你想要的效果。

#### 3. CSS 选择器
在 CSS 中，选择器是一种模式，用于选择需要添加样式的元素。

|选择器|例子|例子描述|CSS
|---|---
|.class|.info|选择 class="info" 的所有元素。|1
|#id|#idName|选择 id="idName" 的所有元素。|1
|*|*|选择所有元素。|2
|element|	p|选择 所有`<p>`元素。|1
|element,element|div,p|选择所有`<div>`元素和所有 `<p>` 元素。|1
|element element|div p|选择 `<div>` 元素内部的所有 `<p>` 元素。|1
|element>element|	div>p|选择所有父元素为`div`的`p`元素|2
|element+element|div+p|选择紧接着`div`元素之后的所有`p`元素|2
|[attribute]|[target]|选择带有 target 属性所有元素。|	2
|[attribute=value]|[target=_blank]|选择 target="_blank" 的所有元素。|2
|:link|a:link|选择所有未被访问的链接。|1
|:first-letter|p:first-letter|选择每个 `<p>` 元素的首字母。。|1
|:before|	p:before|在每个 `<p>` 元素的内容之前插入内容。|2
|:first-of-type|	p:first-of-type|选择属于其父元素的首个 `<p>` 元素。|3
|:not(selector)|:not(p)|选择非 `<p>` 元素的每个元素。|3

<p class="tip">上面这些选择器是一些比较常见的选择器，其中也包含了一些CSS3中的新的选择器。[更多选择器](http://www.w3school.com.cn/cssref/css_selectors.ASP)</p>

#### 4. CSS 哪些属性可以继承
CSS 可继承的属性有: 
``` css
* font-size 
* font-family 
* color
```

#### 5. CSS3新增伪类有那些
* p:first-of-type 选择其父元素的首个`<p>`元素
* p:first-of-type 选择其父元素的最后一个`<p>`元素
* p:only-of-type 选择属于其父元素唯一的元素
* p:only-child 选择属于其父元素的唯一子元素
* p:nth-child(2) 选择属于其父元素的第二个子元素
* :enabled :disabled 表单控件的禁用状态。
* :checked 单选框或复选框被选中。

#### 6. CSS3有哪些新特性？
* RGBA和透明度
* background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
* word-wrap（对长的不可分割单词换行）word-wrap：break-word
* 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
* font-face属性：定义自己的字体
* 圆角（边框半径）：border-radius 属性用于创建圆角
* 边框图片：border-image: url(border.png) 30 30 round
* 盒阴影：box-shadow: 10px 10px 5px #888888
* 媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性

#### 7. 用纯CSS创建一个三角形的原理
首先将其宽度和高度设置为0，然后再设置其边框的样式。
``` css
width: 0;
height: 0;
border-top: 50px solid transparent;
border-left: 50px solid transparent;
border-right: 50px solid transparent;
border-bottom: 50px solid #00ff00
```

#### 8. 清除浮动
``` css
.clearfix {
  zoom:1
  &::after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }
}
```

#### 9. 移动端布局的媒体查询
通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示。
* <head></head>里面
``` html
<link rel="stylesheet" type="text/css" href="xxx.css" media="only screen and (max-device-width:480px)">
```
* CSS
``` css
: @media only screen and (max-device-width:480px) {/css样式/}
```

#### 10.  ::before 和 :after中双冒号和单冒号的区别
1.单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素
2.::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。
:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after

#### 11. png、jpg、gif、webp图片格式
* png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
* jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
* gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
* webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

##### 持续更新中....
