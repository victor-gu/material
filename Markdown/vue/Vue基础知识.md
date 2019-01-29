## Vue 基础知识
> Vue是一个构建数据驱动的 web 界面的渐进式框架。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。它不仅易于上手，还便于与第三方库或既有项目整合

#### 数据驱动模式
> 通过控制数据的变化来改变某物或某事，通俗一点就有一个人（数据驱动）在监视一个叫（数据）的家伙，一旦这个家伙有任何举动他讲会告诉他的领导（视图DOM）,然后领导就会做出一些相应的变化。vue为什么不支持 IE8 及以下版本, 因为vue用了defineProperty方法来监听数据，defineProperty只支持IE9及以上版本浏览器

#### MVVM 模式
> MVVM 是数据驱动模式的一种实现，Vue 是 MVVM 的一种实现

1. M：Model，称之为数据模型，在前端以对象的形式表现
2. V：View，视图，也就是 HTML
3. VM：ViewModel，就是连接数据和视图的桥梁，当 Model 发生改变的时候，ViewModel 便将数据映射到视图

#### 虚拟DOM
> 所谓虚拟DOM的诞生，是我们可以不直接操作DOM元素，只操作数据便可以重新渲染页面，而隐藏在背后的原理便是其diff算法，它的核心基于两个简单的假设

* 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构
* 同一层级的组节点,他们可以通过唯一的id进行区分

#### 指令
> {{}}里面可以写表达式，有个限制就是，每个绑定都只能包含单个表达式

1. v-text: (string) 插入一段文本, 效果等同于{{}}, 但v-text的权重高于 {{}}
2. v-html: (string) 插入一段html
3. v-show: (boolean) show 值会直接影响 div 在文档中是否**显示**
4. v-if: (boolean) 值会直接影响 div 在文档中是否**存在**
    > 因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 \<template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 \<template> 元素

        <template v-if="ok">
            <h1>Title</h1>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
        </template>
5. v-else-if: (boolean) 必须跟 v-if 或者 v-else-if 元素后面
6. v-else: (不需要表达式) 必须跟 v-if 或者 v-else-if 元素后面
7. v-on: (function) 绑定一个方法, 简写: `@`
8. v-bind: (Object) html属性不能使用双大括号形式绑定, 只能使用v-bind指令, 简写: `:`
9. v-model: (表单元素的值) 仅限于表单元素, 双向绑定
10. v-pre: {{}} 不编译，当字符串输出
11. v-cloak: 防止加载过慢, 出现{{}}
12. v-once: 内容只解释一次
13. v-for: (number, string, object) `<ul v-for="(item, index) in data"></ul>`建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升

#### key 管理可复用的元素
> Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换

        <template v-if="loginType === 'username'">
            <label>Username</label>
            <input placeholder="Enter your username">
        </template>
        <template v-else>
            <label>Email</label>
            <input placeholder="Enter your email address">
        </template>
* 那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，\<input> 不会被替换掉——仅仅是替换了它的 placeholder
* 这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 属性即可

#### 实例化基本属性

1. 实例元素: el
> 实例元素指的是 Vue 实例化时编译的容器元素，或者说是 Vue 作用的元素容器，

* 可以有多个实例元素
* 如果有多个相同的实例元素则只有第一个起效
* 可以在实例化的时候不指定实例元素，后面用\$mount()手动进行挂载 vm.\$mount("#app")
* 可以通过实例获取实例元素: `console.log(vm.$el)`
* 也支持class选择器

        var vm = new Vue({
            el: '.app'
        })

2. 数据对象 data
> 在 MVVM 模式中充当着M(Model)数据模型层，更多的体现于将 M 层映射到 V 层

* 可以通过实例获取数据对象: `console.log(vm.$data)一个对象, console.log(vm.key1)单个值`

        var vm = new Vue({
            el: '#app',
            data: function(){
                return {
                    key1: '文本'
                }
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
> Vue 提供了对单个属性的监听器，当该属性发生改变的时候，自动触发，此项使用不当会影响性能，所以慎用，一般用来监听单个属性，基本数据类型,复杂数据类型深度监视

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
                    //不能使用箭头函数，this有问题
                }
            },
            watch: {
                a: 'changeA'
            }
        }

###### 监听引用类型
> 监听引用类型的时候会监听不到，这时添加可以深度监听

        watch: {
            msg: {
                deep: true,
                handler: function(newV, oldV){
                    console.log(newV, oldV);
                }
            }
        }

###### watch 与 compute 区别

* computed 创建新的属性， watch 监听 data 已有的属性
* computed 会产生依赖缓存
* 当 watch 监听 computed 时，watch 在这种情况下无效，仅会触发 computed.setter
* computed可以监听多个属性，比如计算购物车的总价格

6. template
> 如果template里面有值，优先渲染template，或者渲染el

#### 生命周期钩子
> 所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着你不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())。这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，this.fetchTodos 的行为未定义

* beforeCreate：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
* created：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见，可以在这里操作数据
* beforeMount：在挂载开始之前被调用：相关的 render 函数首次被调用,组件还没有渲染到dom
* mounted：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内，vue已经渲染到了dom
* beforeUpdate：数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器，在更新dom之前
* updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子，在更新dom之后
* activated：keep-alive 组件激活时调用
* deactivated：keep-alive 组件停用时调用
* beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用
* destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

#### 绑定 class

###### 对象语法：`<div :class="{classNam1: 1 == 1, className2: 1 == 2}"></div>`
> v-bind:class="{样式名: 结果为 boolean 的表达式}"，表达式结果为 true，则元素 class="样式名"，否则元素 class="", v-bind:class 指令也可以与普通的 class 属性共存，`<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>`

###### 数组语法：`<div :class="[class1, class2, 'className3', active ? 'className4' : '']"></div>`
> v-bind:class="[]"，数组元素可以为表达式，也可以为字符串，如果是字符串则直接输出为样式名

#### 绑定 style
> 在对象当中，CSS 的属性名要用驼峰式表达：fontSize 解析成 font-size

###### 对象语法：`<div :style="{color: color, fontSize: fontSize, backgroundColor: '#ccc'}"></div>`

###### 数组语法：`<div :style="[styleObject, {backgroundColor: '#ccc'}]"></div>`

#### 数组更新检测

###### 变异方法
> Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

###### 注意事项
> 由于 JavaScript 的限制，Vue 不能检测以下变动的数组

* 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
* 当你修改数组的长度时，例如：vm.items.length = newLength

###### 解决办法

* Vue.set (vm.$set)：`Vue.set(vm.items, indexOfItem, newValue)`
* Array.prototype.splice：`vm.items.splice(indexOfItem, 1, newValue)`

#### 对象更改检测注意事项
> 还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除

* Vue.set (vm.$set)：`Vue.set(vm.items, indexOfItem, newValue)`

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

* 如果是给标签绑定ref属性，在组件内部使用this.$refs.xxx是获取的js的DOM对象
* 如果是给组件绑定ref属性,那么this.$refs.xxx获取的是组件对象

#### $nextTick
> 当时动态生成的dom，使用ref是无法获取到节点的，这时应该用到\$nextTick，\$nextTick是在dom更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，可以在回调中获取到更新后的dom

        <div id="app">
            <input type="text" v-if="show" ref="show1">
        </div>

        var vm = new Vue({
            el: '#app',
            data: function(){
                return {
                    show: false
                }
            },
            mounted: function(){
                this.show = true;
                this.$nextTick(function(){
                    this.$refs.show1.focus();
                })
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

###### 全部的按键别名：

* .enter
* .tab
* .delete (捕获“删除”和“退格”键)
* .esc
* .space
* .up
* .down
* .left
* .right

###### 可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器

* .ctrl
* .alt
* .shift
* .meta

        <!-- Alt + C -->
        <input @keyup.alt.67="clear">

###### .exact 修饰符
> .exact 修饰符允许你控制由精确的系统修饰符组合触发的事件

        <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
        <button @click.ctrl="onClick">A</button>
        <!-- 有且只有 Ctrl 被按下的时候才触发 -->
        <button @click.ctrl.exact="onCtrlClick">A</button>
        <!-- 没有任何系统修饰符被按下的时候才触发 -->
        <button @click.exact="onClick">A</button>

###### 鼠标按钮修饰符
> 这些修饰符会限制处理函数仅响应特定的鼠标按钮

* .left
* .right
* .middle

#### 表单修饰符

* 在 "change" 而不是 "input" 事件中更新
    `<input v-model.lazy="counter">`
* 自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值）
    `<input v-model.number="counter" type="number">`
* 自动过滤用户输入的首尾空格
    `<input v-model.trim="counter">`

#### 表单输入绑定
> 你可以用 v-model 指令在表单 \<input>、\<textarea> 及 \<select> 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素

* 复选框
> 单个复选框，绑定到布尔值, check被选中为true，取消check为false

        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>

> 多个复选框，绑定到同一个数组，每选中一个复选框，checked数组中就会添加一个input的value的数组项，取消则会删除

        <input type="checkbox" id="checkbox" value="checkbox" v-model="checked">
        <input type="checkbox" id="checkbox1" value="checkbox1" v-model="checked">
        <input type="checkbox" id="checkbox2" value="checkbox2" v-model="checked">
        <input type="checkbox" id="checkbox3" value="checkbox3" v-model="checked">
        <P>{{checked}}</P>

* 单选按钮
> 绑定到一个字符串，字符串的值为input的value值

        <input type="radio" id="checkbox" value="checkbox" v-model="checked">
        <input type="radio" id="checkbox2" value="checkbox2" v-model="checked">
        <P>{{checked}}</P>

* 下拉列表
> 单选是绑定到字符串，字符串的值为input的value值,多选是绑定到一个数组，数组项为选中的value值

#### 值绑定
> 对于单选按钮，复选框及选择框的选项，v-model 绑定的值通常是静态字符串 (对于复选框也可以是布尔值), 但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串

* 复选框
> 这里的 true-value 和 false-value 特性并不会影响输入控件的 value 特性，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(比如“yes”或“no”)，请换用单选按钮

        <input type="checkbox" v-model="toggle" true-value="yes" false-value="no"
        >
        // 当选中时
        vm.toggle === 'yes'
        // 当没有选中时
        vm.toggle === 'no'

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
        //参数 vnode： 整个 Vue 实例，vnode.context可以访问到当前实例
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

#### 自定义插件
> 像使用Vue.use(router)一样使用

    function installer(){}

    installer.install = function(Vue){
        console.log(Vue);
    }

    export default installer;









































*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*