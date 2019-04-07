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

#### 闭包
> 函数嵌套函数, 内部函数可以引用外部函数的参数和变量,参数和变量不会被垃圾回收机制所回收

    function aa(){
        var num=10;
        function bb(){
            num++
            console.log(num);
        }
        return bb;
    }
    //bb(); //无法直接访问函数内部的函数

    aa()();//11
    aa()();//11
    aa()();//11

    var closure = aa();
    closure();//11
    closure();//12
    closure();//13

###### 闭包的好处

* 可以让一个变量长期驻扎在内存当中不被释放
* 避免全局变量的污染, 和全局变量不同, 闭包中的变量无法被外部使用
* 私有成员的存在, 无法被外部调用, 只可以自己内部使用

###### 垃圾回收机制

* 找到不再被使用的变量，然后释放其占用的内存，但这个过程不是时时的，因为其开销比较大，所以垃圾回收器会按照固定时间间隔周期性的执行
* 回收方式
    * 标记清除（当变量进入环境时，将这个变量标记为“进入环境”;当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存）
    * 引入计数(低级浏览器)
* 内存泄露：闭包引起的：原因: 活动对象被引用，使闭包内的变量不会被释放

###### 对闭包更深的一些理解

1. 由于在JS中，变量的作用域属于函数作用域，在函数执行后作用域就会被清理、内存也随之回收，但是由于闭包是建立在一个函数内部的子函数，由于其可访问上级作用域的原因，即使上级函数执行完，作用域也不会随之销毁，这时的子函数——也就是闭包，便拥有了访问上级作用域中的变量的权限，即使上级函数执行完后作用域内的值也不会被销毁。
2. 闭包解决了什么？在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。由于闭包可以缓存上级作用域，那么就使得函数外部打破了“函数作用域”的束缚，可以访问函数内部的变量。
3. 闭包有哪些应用场景？闭包随处可见，一个Ajax请求的成功回调，一个事件绑定的回调方法，一个setTimeout的延时回调，或者一个函数内部返回另一个匿名函数，这些都是闭包。

###### 结论

* 闭包是指有权访问另一函数作用域中的变量的函数
* 闭包可以访问函数内部的局部变量，并让其长期驻留内存
* 由于闭包会携带包含它的作用域(运行环境)，因此会比其他函数占用更多内存，过度使用闭包可能会造成性能问题。

#### post,get的区别

1. get是从服务器上获取数据，post是向服务器传送数据
2. get传送的数据量较小，不能大于2KB。post传送的数据量较大，一般被默认为不受限制。但理论上，IIS4中最大量为80KB，IIS5中为100KB
3. get安全性非常低，post安全性较高。但是执行效率却比Post方法好
4. get是把参数数据队列加到提交表单的ACTION属性所指的URL中，值和表单内各个字段一一对应，在URL中可以看到
5. 在做数据查询时，建议用Get方式
6. post是通过HTTP post机制，将表单内各个字段与其内容放置在HTML HEADER内一起传送到ACTION属性所指的URL地址，用户看不到这个过程

#### reduce归并方法

* 接收两个参数，reduce(fn[, initval])
* initval为初始值
* 函数需要返回一个值，这个值会在下一次迭代中作为prev的值，没有初始值时，prev为数组的第一项
* fn有个四个参数，prev(前一个值)，cur(当前值)，index(当前索引)，array(数组对象)

        var names = [ 'Tom', 'Jack', 'Toy', 'Tom' ]; 输出：{ 'Tom': 2, 'Jack': 1, 'Toy': 1 }
        var countedNames = names.reduce(function (allNames, name) { 
        if (name in allNames) {
            allNames[name]++;
        }
        else {
            allNames[name] = 1;
        }
        return allNames;
        }, {});

#### JavaScript 判断对象中是否有某属性

1. 点( . )或者方括号( [ ] )
> 通过点或者方括号可以获取对象的属性值，如果对象上不存在该属性，则会返回undefined。当然，这里的“不存在”指的是对象自身和原型链上都不存在，如果原型链有该属性，则会返回原型链上的属性值，局限性就是：不能用在x的属性值存在，但可能为 undefined的场景
2. in 运算符
> 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true，局限性就是无法区分自身和原型链上的属性
3. hasOwnProperty()
> `test.hasOwnProperty('toString')    //false  原型链上属性`，可以看到，只有自身存在该属性时，才会返回true。适用于只判断自身属性的场景

#### 在 JS 对象中使用 . 和 [] 操作属性的区别
> 点方法后面跟的必须是一个指定的属性名称，而中括号方法里面可以是变量

























*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*