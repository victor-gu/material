## CSS垂直居中技巧整理
> 自古以来，网页CSS的垂直居中需求始终没有停过，而其困难度也始终没有让人轻松过，部分公司甚至将CSS的垂直居中技巧当成面试题，其重要性可见一斑

#### 单行文字垂直居中技巧

1. ##### line-height
> 这个方式应该是最多人知道的了，此方式的原理是在于将单行文字的行高设定后，文字会位于行高的垂直中间位置

#### 多行文字的垂直居中技巧

1. ##### :before + inline-block
> :before 伪类元素搭配 inline-block 属性的写法应该是很传统的垂直居中的技巧了，利用:before伪类元素设定为100%高的inline-block，再搭配上将需要居中的子元素同样设置成inline-block

    <h2>:before + inline-block</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                :before + inline-block
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        text-align: center;
    }
    .box::before{
        content:'';
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
    .box .content{
        width: 400px;
        background: #ccc;
        display: inline-block;
        vertical-align: middle;
    }

2. ##### absolute + margin auto
> 当元素设置为绝对定位后，假设它是抓不到整体可运用的空间范围，所以margin:auto会失效，但当你设置了top:0;bottom:0;时，绝对定位元素就抓到了可运用的空间了，这时你的margin:auto就生效了

    <h2>absolute + margin auto</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                absolute + margin auto
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        position: relative;
    }
    .content{
        width: 400px;
        background: #ccc;
        height: 70px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }

3. ##### absolute + translate
> 利用绝对定位时的top 与right设置元素的上方跟左方各为50%，再利用translate(-50%,-50%)位移居中元素自身宽与高的50%就能达成居中的目的

    <h2>absolute + translate</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                absolute + translate
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        position: relative;
    }
    .box .content{
        width: 400px;
        background: #ccc;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

4. ##### Flex + align-items
> 设定父层display:flex以及设定侧轴属性align-items:center（flex布局可以参考这篇文章[flex布局基础知识整理](https://blog.csdn.net/guxingsheng/article/details/84245832 "flex布局基础知识整理")）

    <h2>Flex + align-items</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                Flex + align-items
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{
        width: 400px;
        background: #ccc;
    }

7. ##### Flex + :before + flex
> 利用了flex-direction:column直式排法，搭配:before伪元素适用flex伸展值能够取得剩下所有空间的特性

    <h2>Flex + :before + flex</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                Flex + :before + flex
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .box:before{
        content: '';
        flex-grow: .5;
    }
    .content{
        width: 400px;
        background: #ccc;
    }

8. ##### Flex + margin
> 由于Flex元素对空间解读的特殊性，我们只要在父层元素设定display:flex，接着在需要垂直居中的元素上设定margin:auto

    <h2>Flex + margin</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                Flex + margin
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        display: flex;
    }
    .content{
        width: 400px;
        background: #ccc;
        margin: auto;
    }

9. ##### Flex + align-self
> align-self就是对flex侧轴的个别对齐方式只要对单一元素设定align-self:center就能达成垂直居中的目的

    <h2>Flex + align-self</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                Flex + align-self
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        display: flex;
        justify-content: center;
    }
    .content{
        width: 400px;
        background: #ccc;
        align-self: center
    }

10. Flex + align-content
> 在正常的状况下，align-content 仅能对次轴多行flex item做居中，为单个子组件多加两个兄弟，使用:before以及:after 来让子元素增加到多个，并给父元素flex-wrap:wrap，这样就能使用flex的align-content属性来居中

    <h2>Flex + align-content</h2>
    <div class="box">
        <div class="content">
            <a href="#/">
                Flex + align-content
            </a>
            <p>多行文字的垂直居中技巧</p>
        </div>
    </div>

    h2{
        text-align: center;
    }
    .box{
        width: 500px;
        height: 250px;
        border: 1px solid #f00;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
    }
    .content{
        width: 400px;
        background: #ccc;
    }
    .box:before, .box:after{
        content: '';
        display: block;
        width:100%;
    }

[余](https://mp.weixin.qq.com/s/bdhjmcIIh5TYcd2d_g11aw)
[网格布局](https://blog.csdn.net/ceshi986745/article/details/51733383)
[网格布局](https://blog.jirengu.com/?p=990)


*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*
