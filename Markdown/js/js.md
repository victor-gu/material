## js常用的方法

#### history.pushState()
> history.pushState(data,title,url) //每执行一次都会增加一条历史记录

* data：对象，可以存放一些数据表示当前状态。当浏览器执行前进后退操作时触发onpopstate事件，state将成为event的子对象，可通过event.state获取先前状态。但是注意state中的属性值不能为引用类型对象，会报ObjectCloneError（对象克隆异常），例如允许{data:”test”}，不允许{data:document.querySelector(‘#testId’)}

* title：现在大多数浏览器不支持或者忽略这个参数，最好用null代替。

* url：地址栏的值，若不需要可用空来代替

> 例如：history.pushState('a', null, 'index.html?b=1');

监听浏览器的前进后退事件

    window.addEventListener("popstate", function() {
        // history.state：取出设置好的值，做判断
    });

#### history.replaceState()
> pushState会在浏览器中创建一条新的历史纪录，而replaceState仅仅替换将当前地址为指定URL，replaceState()是用来修改当前的历史记录(history实体)，而不是创建一个新的历史记录，所以，当执行完history.replaceState()后，点击返回按钮照样会返回上一个一面。  当需要更新一个state对象或者当前history实体时，可以用replaceState()来实现

#### #hash
> URL中#称为位置的标识符，代表网页中的一个位置，当浏览器读取这个URL后，会自动将可视区域滚动至所定义的锚点处。HTTP请求中不包括#，也就是说改变#后的内容不会向服务器发起请求，因此也就不会引起页面重载。window.location.hash这个属性可读可写。读取时，可以用来判断网页状态是否改变；写入时，则会在不重载网页的前提下，创造一条访问历史记录

当#值发生变化时，就会触发onhashchange事件。

    window.addEventListener("popstate", function() {
        // history.state：取出设置好的值，做判断
    });

> 需要注意的是每次hash发生变化时都会触发onhashchange事件。而onpopstate事件只会在历史记录(history entry)变化时触发，比如执行浏览器的前进/后退操作。

#### document.visibilitychange

1. 页面可见性
> 页面可见性API通过document的visibilitychange让脚本知道用户是否已经看不到这个页面了。可以在特定的时候暂缓一些不必要的操作，以减少客户端、服务端压力。

2. 应用场景
> 监控用户行为，当用户的视角不在当前页面时，暂停加载广告，幻灯片、停止加载视频、开始加载小动画等。减少对用户宽带的占用，减少服务器压力，节省用户内存，以及到达更好的播放效果

3. 属性
> document.visibilityState

4. 注意事项
> 在目前，浏览器对 Page Visibility 的支持还是通过私有属性支持，因此在检测或利用 Page Visibility 提供的属性时需要加上浏览器私有前缀，例如在 Chrome 中检测上面的 visibilityState 属性时，就需要检测 document.webkitVisibilityState 而不是 document.visibilityState 。所以，需要首先检测浏览器类型，然后才使用 Page Visibility 的 API

5. 兼容写法

示例

    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    
    // 添加监听器
    document.addEventListener(visibilityChange, function() {
        console.log("当前页面是否被隐藏：" + document[hidden]);
    }, false);

#### document.hidden
> bool型，表示页面是否处于隐藏状态。页面隐藏包括页面在后台标签页或者浏览器最小化



















*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*