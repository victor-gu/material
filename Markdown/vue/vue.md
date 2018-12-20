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

#### 实例化时基本属性

1. 实例元素: el
> 实例元素指的是 Vue 实例化时编译的容器元素，或者说是 Vue 作用的元素容器，

* 可以有多个实例元素
* 如果有多个相同的实例元素则只有第一个起效
* 可以在实例化的时候不指定实例元素，后面用$mount()手动进行挂载 vm.$mount("#app")
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

