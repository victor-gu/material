## flex布局整理
> 2009年，W3C 提出了一种新的方案—-Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能，Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性

#### 主要思想
> 让容器有能力让其子项目能够改变其宽度、高度（甚至顺序），以最佳的方式填充可用空间（主要是为了适应所有类型的显示设备和屏幕大小）。flex容器会使子项目扩展来填充可用空间，或缩小他们以防止溢出容器

#### 父元素 
> 设置弹性盒display:flex。内部的元素默认全部在主轴的方向一行显示，不会换行（横轴）。注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将会失效

1. ##### flex-direction：设置主轴的方向

* row 水平向右（默认）
* column 垂直向下
* row-reverse 与row相反
* column-reverse 与column相反

2. ##### flex-wrap：伸缩换行

* wrap：换行
* nowrap：不换行（默认）
* wrap-reverse：换行，第一行在下方

3. ##### flex-flow：主轴方向及换行

> flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

4. ##### justify-content：子项目在主轴方向的对齐方式

* flex-start：伸缩项目向主轴的起始位置靠齐
* flex-end：伸缩项目向主轴的结束位置靠齐
* center：伸缩项目向主轴的中间位置靠齐
* space-between：子项目会在主轴方向的空白区域两者之间平分多余部分
* space-around：子项目会在主轴方向的空白区域两侧平分多余部分

5. ##### align-items：单个子项目在侧轴方向的的对齐方式

* stretch：拉伸（默认）
* flex-start
* flex-end
* center
* baseline：基线对齐

6. ##### align-content：多个子项目在侧轴方向的对齐方式

* flex-start：伸缩项目向主轴的起始位置靠齐
* flex-end：伸缩项目向主轴的结束位置靠齐
* center：伸缩项目向主轴的中间位置靠齐
* space-between：子项目会在主轴方向的空白区域两者之间平分多余部分
* space-around：子项目会在主轴方向的空白区域两侧平分多余部分

#### 子元素
> 若是不给子项目设置高度，默认子项目在侧轴方向拉伸

1. ##### flex：每个子项目在主轴方向大小的比份

2. ##### align-self：单个子项目在侧轴方向的对齐方式

* stretch：拉伸（默认）
* flex-start
* flex-end
* center
* baseline：基线对齐

3. ##### order：order显示顺序，属性值越小，越在前面

*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*