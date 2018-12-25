## Vue 基础知识
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
13. v-for: (number, string, object) `<ul v-for="(item, index) in data"></ul>`, 每改变一次数据就要重新循环整个数据，当循环数据较多时，性能较差，加入`:key=""`后，就会对比数据，当没有变化的数据就不会循环

#### 实例化基本属性

1. 实例元素: el
> 实例元素指的是 Vue 实例化时编译的容器元素，或者说是 Vue 作用的元素容器，

* 可以有多个实例元素
* 如果有多个相同的实例元素则只有第一个起效
* 可以在实例化的时候不指定实例元素，后面用\$mount()手动进行挂载 vm.\$mount("#app")
* 可以通过实例获取实例元素: `console.log(vm.$el)`
* 也支持class选择器

        var vm = new Vue({
            el: '#app'
        })

2. 数据对象 data
> 在 MVVM 模式中充当着M(Model)数据模型层，更多的体现于将 M 层映射到 V 层

* 可以通过实例获取数据对象: `console.log(vm.$data)一个对象, console.log(vm.key1)单个值`

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
        inserted: function(eleement, binding, vnode){
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
> 当实例对象 data 先设置好了结构，比如：data: {dataform: {}}，在后期想添加一个属性 username 时，这个 username 不会自动绑定到视图当中，所以调用 $set(原对象，新属性名，属性值) 进行绑定到视图当中，只有当实例被创建时 data 中存在的属性才是响应式的

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

#### $ref
> 当必须要操作节点是可以用`ref`, 获取用`this.$refs.focus`,focus为定义的

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
    `<input v-model.lazy="counter">`
* 自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值）
    `<input v-model.number="counter" type="number">`
* 自动过滤用户输入的首尾空格
    `<input v-model.trim="counter">`

#### 组件
> 组件（Component）是前端在单页面应用（SPA）上最好的一种实现方式，把所有功能模块拆解成单独的组件，每个组件都有独立的作用域，且还可以相互通信

###### 认识单页面应用（SPA）
> 在传统的页面之间跳转，是通过刷新，重新渲染一个页面而实现，在渲染的过程中势必要加载外部资源文件，页面在服务器中渲染出来是通过一系列的生命周期，在这个过程中会因为网速等硬件问题直接影响页面的加载速度，为解决这一问题，前端在新的设计模式上引入了组件的概念，页面之间的跳转变成了组件之间的切换，不需要重新加载整个页面，也不用考虑页面的生命周期，换成组件的生命周期，在性能上大大的提升了

* 全局组件
> template里面只能有一个根元素，不能有兄弟元素

        <div id="app">
            <global-component></global-component>
        </div>
        Vue.component('global-component', {
            template: '<h1>全局组件</h1>'
        })

* 局部组件
> 在组件里面 data 一定是 function 并返回一个对象

        <div id="app">
            <private-component></private-component>
        </div>
        var vm = new Vue({
            el: '#app',
            components:{
                'private-component': {
                    template: '<h1>局部组件</h1>'
                }
            }
        })

* 组件是一个单独的作用域

        var vm = new Vue({
            components:{
                'component1': {
                    template: '<button>{{ count }}</button>',
                    data: function(){
                        //在组件里面 data 一定是 function 并返回一个对象
                        return {
                            count: 0
                        }
                    }
                }
            }
        })

* 特殊的 HTML 结构中使用 is
> 特殊的 HTML 结构中使用 is

        <div id="app">
            <select>
                <option is="privateOption"></option>
            </select>
        </div>

* 动态组件 - :is
> `<p :is="show"></p>`: 定义一个data: show，再在组件里面定义与data可能值相同的组件

* 组件属性
> 组件的属性要先声明后使用，props: ['属性名'...]

        <div id="app">
            <private-component title="组件属性" :text="mess"></private-component>
        </div>
        var vm = new Vue({
            el: '#app',
            data: {
                mess: '-动态属性'
            }
            components:{
                'private-component': {
                    template: '<h1>{{title + text}}</h1>',
                    props: ['title', 'text']
                }
            }
        })

* 组件自定义事件
> <组件名 v-on:自定义事件名="">，必须用v-on定义，自定义事件名不需要声明，直接用 $emit() 触发

    <div id="app">
        <increment v-on:count="increment"></increment>
    </div>
    var vm = new Vue({
         methods: {
            increment: function(){
            }
        },
        components: {
            'increment': {
                template: '<input type="button" @click="incrementTotal"/>',
                methods: {
                    incrementTotal: function(){
                        this.$emit('count')
                    }
                }
            }
        }
    })

#### slot 分发内容
> Vue 组件默认是覆盖渲染，为了解决这一问题，Vue 提出了 slot 分发内容

        <div id="app">
            <component1>
                <h1>Sam</h1>
                <h1>Lucy</h1>
            </component1>
        </div>
        Vue.component('component1', {
            template: `
                <div>
                    <h1>Tom</h1>
                    <slot></slot>
                </div>
            `
        })
> conponent1中的内容默认放到slot里面

###### 具名 slot
> 如果要将组件里面不同的子元素放到不同的地方，那就为子元素加上一个属性 slot="名称"，然后在组件定义的时候用name对应位置 ，其它没有 slot 属性的子元素将统一分发到 slot 里面

        <div id="app">
            <component1>
                <h1>Sam</h1>
                <h1 slot="lucy">Lucy</h1>
            </component1>
        </div>
        Vue.component('component1', {
            template: `
                <div>
                    <slot name="lucy"></slot>
                    <h1>Tom</h1>
                    <slot></slot>
                </div>
            `
        })

#### 模版写法

        <template id="component1">
            <div>
                <input type="text" v-model="name"/>
                <p>{{name}}</p>			
            </div>
        </template>

        <div id="app">
            <component1/>
        </div>  

        var vm = new Vue({
            el: '#app',
            components: {
                'component1': {
                    template: '#component1',
                    data: function(){
                        return {name: 'Tom'};
                    }
                }
            }
        })

#### 过渡效果

###### 过渡效果应用场景

* 条件渲染 (使用 v-if)
* 条件展示 (使用 v-show)
* 动态组件
* 组件根节点

###### 过渡状态
> 每个状态在使用的时候都是在 CSS 中使用，结合组件 transition 的 name 属性。如 \<transition name="fade">\</transition>，对应的是 fade- 加上每个状态：.fade-enter。

* enter：定义进入过渡的开始状态。在元素被插入时生效。
* enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效。
* enter-to: 2.1.8版及以上 定义进入过渡的结束状态。
* leave：定义离开过渡的开始状态。在离开过渡被触发时生效。
* leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效。
* leave-to: 2.1.8版及以上 定义离开过渡的结束状态。

        <style type="text/css" media="screen">
            .fade-enter, .fade-leave-to{ opacity:0; }
            .fade-enter-active, .fade-leave-active{ transition:all .5s; }
        </style>

        <div id="app">
            <input type="button" :value="show ? 'hide' : 'show'" @click="show = !show" />
            <br/>
            <transition name="fade">
                <img src="imgs/green.jpg" v-show="show" />
            </transition>
        </div>

        <script type="text/javascript">
            var vm = new Vue({
                el: '#app',
                data: {
                    show: true
                }
            })
        </script>

#### CSS 动画

        <style type="text/css" media="screen">
            .fade-enter-active{animation: fade-in .5s;}
            .fade-leave-active{animation: fade-out .5s;}
            @keyframes fade-in{
                from{
                    opacity: 0;
                }
                to{
                    opacity: 1;
                }
            }
            @keyframes fade-out{
                from{opacity: 1;}
                to{opacity: 0;}
            }
        </style>
        <div id="app">
            <input type="button" :value="show ? 'hide' : 'show'" @click="show = !show" />
            <br/>
            <transition name="fade">
                <img src="imgs/green.jpg" v-if="show" />
            </transition>
        </div>
        <script type="text/javascript">
            var vm = new Vue({
                el: '#app',
                data: {
                    show: true
                }
            })
        </script>

#### 初始渲染的过渡
> 第一次加载时的过渡效果，使用到组件transition的属性: appear appear-class appear-active-class

        <style type="text/css" media="screen">
            .fade-enter{opacity: 0;}
            .fade-enter-active{transition: all 3s;}
        </style>

        <div id="app">
            <transition appear appear-class="fade-enter" appear-active-class="fade-enter-active">
                <img src="imgs/green.jpg" />
            </transition>
        </div>

        <script type="text/javascript">
            var vm = new Vue({
                el: '#app'
            })
        </script>

#### 多个元素的过渡效果
> 使用到组件 transition 的属性: mode

* in-out：新元素先进行过渡，完成之后当前元素过渡离开
* out-in：当前元素先进行过渡，完成之后新元素过渡进入

        <style>
            .fade-enter, .fade-leave-to{ opacity:0; }
            .fade-enter-active, .fade-leave-active{ transition:all .5s; }
        </style>
        <div id="app">
            <input type="button" value="click" @click="set">
            <transition name="fade" mode="out-in">
                <p v-if="show" key="red">{{ text }}</p>
                <p v-else key="green">6666</p>
            </transition> // 这里要加key
        </div>

        <script>
            var vm = new Vue({
                el: '#app',
                data: {
                    text: "text",
                    show: true
                },
                methods: {
                    set: function(){
                        this.show = !this.show;
                    }
                }
            })
        </script>

#### 列表(v-for)的过渡效果
> v-for 生成列表过渡效果要使用组件 transition-group，组件提供属性 tag 表示该组件将会渲染成对应的 DOM 节点，其它的使用和 transition 一样

        <style>
            .fade-enter, .fade-leave-to{ opacity:0; }
            .fade-enter-active, .fade-leave-active{ transition:all .5s; }
        </style>
        <div id="app">
            <input type="button" value="click" @click="set">
            <transition-group name="fade" tag="ul">
                <li v-for="(item, index) in data" :key="item">{{item}}</li>
            </transition-group>
        </div>

        <script>
            var vm = new Vue({
                el: '#app',
                data: {
                    data: [1,2,3]
                },
                methods: {
                    set: function(){
                        this.data.push("6");
                    }
                }
            })
        </script>

#### 自定义过渡的类名
> 对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用

* enter-class
* enter-active-class
* enter-to-class (2.1.8+)
* leave-class
* leave-active-class
* leave-to-class

        <link rel="stylesheet" type="text/css" href="animate.css">
        <div id="app">
            <button @click="show = !show">Toggle render</button>
            <transition enter-active-class="animated jello" leave-active-class="animated bounceOutRight">
                <div v-if="show"><img src="./imgs/green.jpg" /></div>
            </transition>
        </div>
        <script type="text/javascript">
            var vm = new Vue({
                el: '#app',
                data: {
                    show: true
                }
            })
        </script>

#### 过渡效果钩子函数
> 过渡效果钩子函数除了用CSS过渡的动画来实现vue的组件过渡，还可以用JavaScript的钩子函数来实现，在钩子函数中直接操作DOM。我们可以在属性中声明以下钩子

        <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:enter-cancelled="enterCancelled"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave"
            v-on:leave-cancelled="leaveCancelled"
        >
        </transition>
        <script type="text/javascript">
            var vm = new Vue({
                el: '#app',
                methods: {
                    // 过渡进入
                    // 设置过渡进入之前的组件状态
                    beforeEnter: function (el) {
                    // ...
                    },
                    // 设置过渡进入完成时的组件状态
                    enter: function (el, done) {
                    // ...
                    done()
                    },
                    // 设置过渡进入完成之后的组件状态
                    afterEnter: function (el) {
                    // ...
                    },
                    enterCancelled: function (el) {
                    // ...
                    },
                    // 过渡离开
                    // 设置过渡离开之前的组件状态
                    beforeLeave: function (el) {
                    // ...
                    },
                    // 设置过渡离开完成时地组件状态
                    leave: function (el, done) {
                    // ...
                    done()
                    },
                    // 设置过渡离开完成之后的组件状态
                    afterLeave: function (el) {
                    // ...
                    },
                    // leaveCancelled 只用于 v-show 中
                    leaveCancelled: function (el) {
                    // ...
                    }
                }
            })
        </script>






























#### webpack

1. 全局安装：`npm install -g vue-cli`
2. 局部安装：`vue init webpack-simple 项目名`
3. `cd 项目名`
4. `npm install`
5. `npm run dev`

###### 参数

* webpack.config.json类似于gulp的gulpfile.js文件
* entry：打包入口文件
* output：打包出来的文件配置
* rules：打包规则

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