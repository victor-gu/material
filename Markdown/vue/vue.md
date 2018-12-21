## Vue
> Vue是一个构建数据驱动的 web 界面的渐进式框架。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。它不仅易于上手，还便于与第三方库或既有项目整合

#### 数据驱动模式
> 通过控制数据的变化来改变某物或某事，通俗一点就有一个人（数据驱动）在监视一个叫（数据）的家伙，一旦这个家伙有任何举动他讲会告诉他的领导（视图DOM）,然后领导就会做出一些相应的变化。vue为什么不支持 IE8 及以下版本, 因为vue用了defineProperty方法来监听数据，defineProperty只支持IE9及以上版本浏览器

#### MVVM 模式
> MVVM 是数据驱动模式的一种实现，Vue 是 MVVM 的一种实现

1. M：Model，称之为数据模型，在前端以对象的形式表现
2. V：View，视图，也就是 HTML
3. VM：ViewModel，就是连接数据和视图的桥梁，当 Model 发生改变的时候，ViewModel 便将数据映射到视图

#### 指令
> {{}}相当于v-text, {{}}里面可以写表达式

1. v-text: (string) 插入一段文本, 效果等同于{{}}, 但v-text的权重高于 {{}}
2. v-html: (string) 插入一段html
3. v-show: (boolean) show 值会直接影响 div 在文档中是否**显示**
4. v-if: (boolean) 值会直接影响 div 在文档中是否**存在**
5. v-else-if: (boolean) 必须跟 v-if 或者 v-else-if 元素后面
6. v-else: (不需要表达式) 必须跟 v-if 或者 v-else-if 元素后面
7. v-on: (function) 绑定一个方法, 简写: `@`
8. v-bind: (Object) html属性不能使用双大括号形式绑定, 只能使用v-bind指令, 简写: `:`
9. v-model: (表单元素的值) 仅限于表单元素, 双向绑定
10. v-pre: {{}} 不编译，当字符串输出
11. v-cloak: 防止加载过慢, 出现{{}}
12. v-once: 内容只解释一次
13. v-for: (number, string, object) `<ul v-for="(item, index) in data"></ul>`

#### 实例化基本属性

1. 实例元素: el
> 实例元素指的是 Vue 实例化时编译的容器元素，或者说是 Vue 作用的元素容器，

* 可以有多个实例元素
* 如果有多个相同的实例元素则只有第一个起效
* 可以在实例化的时候不指定实例元素，后面用\$mount()手动进行挂载 vm.\$mount("#app")
* 可以通过实例获取实例元素: `console.log(vm.$el)`

        var vm = new Vue({
            el: '#app' // 可以后其他选择器
        })

2. 数据对象 data
> 在 MVVM 模式中充当着M(Model)数据模型层，更多的体现于将 M 层映射到 V 层

* 可以通过实例获取数据对象: `console.log(vm.$data)`

        var vm = new Vue({
            el: '#app',
            data: {
                key1: '文本'
            }
        }

3. 事件处理器 methods
> 事件处理器 methods元素可以通过 v-on:事件 || @事件 进行绑定事件，事件中的 this 默认指向实例 vm

        var vm = new Vue({
            el: '#app',
            data: {
                count: 0
            },
            methods: {
                counter: function(){
                    this.count += 1;
                }
            }
        })
* 在 js 的事件中默认会有个 event 对象，Vue 在事件上对 event 对象进行继承二次封装，改名为 $event，在事件当中默认传过去

        var vm = new Vue({
            el: '#app',
            data: {
                count: 0
            },
            methods: {
                counter: function(e){
                    console.log(e.target); // 事件源对象
                    this.count += 1;
                }
            }
        })

* 在事件中很多情况下要传参数，Vue 也可以在事件中传参数
`<input type="button" @click="parameter(10, $event)">`,如果有参数传递, 需要事件源对象时，需要将$event传递过去

4. 计算属性 computed
> computed 主要是针对 data 的属性进行操作，this 的指针默认指向实例 vm

        <p>{{fullName}}</p>
        <input type="text" v-model="newName">
        <input type="button" value="changeName" @click="changeName">
        var vm = new Vue({
            el: '#app',
            data: {
                firstName:'DK',
                lastName: 'Lan',
                newName: ''
            },
            computed: {
                fullName:{
                    get: function(){
                        return this.firstName + '.' + this.lastName
                    },
                    set: function(newValue){
                        this.firstName = newValue   // 传值
                    }
                }
            },
            methods: {
                changeName: function(){
                    this.fullName = this.newName;
                }
            }
        })

* 当我们在 V 层调用 {{fullName}} 的时候会自动触发 fullName.get()
* 当改变fullName属性时，会自动触发 fullName.set() 方法, 可以向set()方法传递参数，参数值为fullName的值
* Vue在getter上面作了基于对应属性的依赖缓存，也就是说多次调用同一个属性，get只会执行一次。而事件在每次触发时都会被调用，当然在改变该属性值的时候会再次被调用

5. 监听器 watch
> Vue 提供了对单个属性的监听器，当该属性发生改变的时候，自动触发，此项使用不当会影响性能，所以慎用

        {
            data: {
                a: 1
            },
            watch: {
                a: function (newVal, oldVal) {
                    //自动触发此方法
                    console.log('new: %s, old: %s', newVal, oldVal)    // 接收两个值，一个新值，一个旧值
                },
            }
        }

        也可以把方法放到 data 对象中
        {
            data: {
                a: 1,
                changeA: function (newVal, oldVal) {
                    //自动触发此方法
                    console.log('new: %s, old: %s', newVal, oldVal)
                }
            },
            watch: {
                a: 'changeA'
            }
        }

###### watch 与 compute 区别

* computed 创建新的属性， watch 监听 data 已有的属性
* compute 会产生依赖缓存
* 当 watch 监听 computed 时，watch 在这种情况下无效，仅会触发 computed.setter

#### 绑定 class

###### 对象语法：`<div :class="{classNam1: 1 == 1, className2: 1 == 2}"></div>`
> v-bind:class="{样式名: 结果为 boolean 的表达式}"，表达式结果为 true，则元素 class="样式名"，否则元素 class=""

###### 数组语法：`<div :class="[class1, class2, 'className3', active ? 'className4' : '']"></div>`
> v-bind:class="[]"，数组元素可以为表达式，也可以为字符串，如果是字符串则直接输出为样式名

#### 绑定 style
> 在对象当中，CSS 的属性名要用驼峰式表达：fontSize 解析成 font-size

###### 对象语法：`<div :style="{color: color, fontSize: fontSize, backgroundColor: '#ccc'}"></div>`

###### 数组语法：`<div :style="[styleObject, {backgroundColor: '#ccc'}]"></div>`

#### 自定义指令
> 自定义指令和定义组件的方式很类式，也是有全局指令和局部指令之分

###### 全局指令

    Vue.directive('global',  function(element){
        element.value = "世界和平";   // 参数 element：使用指令的元素
        element.focus();
    })
###### 局部指令

    var vm = new Vue({
        el: '#app',
        directives: {
            private: function(element){
                element.style.background = '#ccc';
                element.value = "世界和平";
            }
        }
    })

#### 钩子函数
> 钩子函数可以理解成是指令的生命周期

    <div id="app">
        <input type="text" v-model="text" v-demo="{color:'red'}">
    </div>
    Vue.directive('demo', {
        //被绑定元素插入父节点时调用
        //后于 bind 触发
        //参数 element： 使用指令的元素
        //参数 binding： 使用指令的属性对象
        //参数 vnode： 整个 Vue 实例
        inserted: function(element, binding, vnode){
            console.log('inserted');
        },

        //只调用一次，指令第一次绑定到元素时调用，
        //用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
        //先于 inserted 触发
        bind: function(element, binding, vnode){
            console.log('bind');
            element.style.color = binding.value.color
        },

        //被绑定元素所在的模板更新时调用，而不论绑定值是否变化
        update: function(element, binding, vnode){
            console.log('update');
        },

        //被绑定元素所在模板完成一次更新周期时调用。
        componentUpdated: function(element, binding, vnode){
            console.log('componentUpdated');
        }
    })

    var vm = new Vue({
        el: '#app',
        data:{
            text: '钩子函数'
        }
    })

#### $set 
> 当实例对象 data 先设置好了结构，比如：data: {dataform: {}}，在后期想添加一个属性 username 时，这个 username 不会自动绑定到视图当中，所以调用 $set(原对象，新属性名，属性值) 进行绑定到视图当中

        <div id="app">
            <input type="button" value="set" @click="set">
            <span>{{dataform.username}}</span>
        </div>
        var vm = new Vue({
            el: '#app',
            data: {
                dataform: {}
            },
            methods: {
                set: function(){
                    this.$set(this.dataform, 'username', '123')
                }
            }
        })

#### 事件修饰符
> 对事件添加一些通用的限制，比如阻止事件冒泡，Vue 对这种事件的限制提供了特定的写法，称之为修饰符 用法：v-on:事件.修饰符

* 阻止事件冒泡.stop: `<div @click.stop="event1(1)">`
* 使用事件捕获模式.capture: `<div @click.capture="event1(1)">`
* 事件只作用本身.self，类似于已阻止事件冒泡: `<div @click.self="event1(1)">`
* 阻止浏览器默认行为.prevent: `<div @click.prevent="event1(1)">`
* 只作用一次.once: `<div @click.stop="once(1)">`
* 修饰符可以串联.click.prevent.once: `<div @click.prevent.once="event1(1)">`

#### 按键修饰符

* ASCII：`<input @keyup.13="submit">`
* 回车键：`<input @keyup.enter="submit">`
* 自定义按键：`<input @keyup.number1="submit"/>`
    Vue.config.keyCodes.number1 = 49

#### 表单修饰符

* 在 "change" 而不是 "input" 事件中更新




















#### webpack

1. 全局安装：`npm install -g vue-cli`
2. 局部安装：`vue init webpack-simple 项目名`
3. `cd 项目名`
4. `npm install`
5. `npm run dev`

###### 由于windows系统的某方面问题，vue脚手架安装(vue init ...)可能会出现第一证书丢失, 报错：vue-cli · Failed to download repo vuejs-templates/webpack-simple: unable to verify the first certificate，这时可以离线安装

1. 在https://github.com/vuejs-templates/下载相应的模板
2. 把解压出的文件夹放在 `C:\Users\Administrator\.vue-templates`文件夹
3. 没有就新建一个 `.vue-templates`文件夹, 新建失败的话，记得要在后面加一个点`.vue-templates.`
4. 安装了vue-cli之后进行初始化项目: vue init webpack-simple project --offline，`--offline`是离线安装

###### npm install总是报错：unable to verify the first certificate（无法验证第一证书）
> 2017年2月27日，npm不再支持自签名证书。因为npm install走的是https协议，需要通过数字证书来保证的

解决方法1

* 取消ssl验证：npm config set strict-ssl false
* 如果还没成功，则将npm源更换为国内镜像：
    npm config set registry http://registry.cnpmjs.org/
    npm config set registry http://registry.npm.taobao.org/

解决方法2

* 升级：npm install npm -g --ca=null
* 或者 npm config set ca=""

*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*