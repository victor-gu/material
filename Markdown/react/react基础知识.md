## react基础知识

#### react历史

* angular: 2009年
* vue: 2014年开源（双向数据绑定，双向数据流，内存的改变影响页面的改变，页面的改变影响内存的改变）
* react: 2013年面向开发者，并不是开源的
    * 单向数据流
    * 不管页面的改变，影响内存的改变（自己处理页面的改变影响内存，通过事件调用函数，通知根据内存对象改变页面）
* 没有指令

#### 脚手架

* 内部如果依赖yarn工具（类似npm的工具）：`npm install -g yarn`
* 全局安装：`npm install -g create-react-app`
* 使用
    * `create-react-app` 项目名 
    * cd 项目名
    * npm install
* 运行
    * `npm run start`启动
    * `npm run build`生产dist

#### import
> 导入放到最上方，必须在顶级作用域

* 默认导入:
    * 导入：`import test1 from "test1.js"`
    * 导出：`export default "数据"`
* 按需导入:
    * 导入: `import {num1, num2} from "test2.js"`
    * 导出: `export "数据"`
* 全体导入:
    * 导入: `import * as test from "test3.js"`
    * 导出: `export default "数据" || export "数据"`

#### import和require

* import属于加载前置的机制，因此将其全放在代码的顶部，代码解析逐给import获取一个引入的列表,先引入依赖，再向下执行代码 ------ **加载前置**
* require **加载滞后**，代码执行到哪一行才进行加载

#### jsx
> js + xml，一种特殊的 js 语法糖，可以在代码中把 html 标签当对象使用

* 不加任何引号
* 标签一定要有对应的结束标标签或结束标识
* 只能有一个根节点
* 不能在标签当中加注释（在 jsx 语法当中，html 标签是一个对象，是一种数据结构，而不是真实的 dom 节点，也不是字符串）
* jsx 语法允许 html 标签和 javascript 代码混写：用{}

#### 基本操作总结

* index.js
    1. 引入React对象
    2. 引入ReactDOM对象
    3. 操作jsx
        * jsx不能用+=来运算（不是字符串）
        * jsx可以通过数组来输出数据
    4. 渲染到指定元素上   
        * ReactDOM.render(<App />, document.getElementById('root'));
    5. 启动：npm start
* app.js
    1. 使用jsx的时候必须引入React
    2. 组件要继承React.Component
    3. 保证render的return只有一个根节点
    4. 导出export default App

            import React, { Component } from 'react';

            class App extends Component {
                render() {
                    return (
                    <div className="App">
                        <header className="App-header">
                            test
                        </header>
                    </div>
                    );
                }
            }
            export default App;
* 组件基础
    * state：constructor里面定义变量，记得调用super();

            constructor(){
                super();
                this.state = {
                    num: 666
                }
            }
    * setState：用来改变定义的变量的值，传入一个对象

            this.setState({
                num: 777
            });
#### 异步行为
> 在react异步渲染以后的行为,类似vue中的$nextTict函数

    this.setState({
        num: 777
    }, ()=>{
        // 这里可以写异步行为
    });

#### React中有变化的属性

* className
* htmlFor

#### 生命周期

* 渲染
    * 1：constructor
    * 2：componentWillMount
    * 3：render
    * 4：componentDidMount（一般在这里面发送请求）
* 更新
    * shouldComponentUpdate（里面可以返回一个布尔值，来确定是否继续下面的更新）
    * componentWillUpdate
    * render
    * componentDidUpdate
* 卸载
    * componentWillUnmount

#### 父子通信
> 组件名必须是首字母大写，import的引入可以省略掉js后缀

* 传值
    * 子组件用`this.props.属性名`来接收
* 传dom
    * 子组件用`this.props.children`来接收

#### 属性的约定和默认值
> 必须先引入PropTypes

    import PropTypes from "prop-types";
    static propTypes = {
        name: PropTypes.number.isRequired
    }
    static defaultProps = {
        name: "默认值"
    }

#### 内置便捷函数
> this.props.children有可能有三种数据结构，对象/数组/undefined

* React.Children.map(children, function(thisArg))返回数组
> 更加健壮的排出空节点，null，undefined的情况
* React.Children.forEach(children, function(thisArg))

#### template
> 由于每个组件必须保证一个根节点，就会出现很多的多余的节点此时可以用`<React.Fragment></React.Fragment>`

#### React15与React16的区别

* 创建组件的不同
    * 15 `const Contacts = React.createClass({})`
    * 16 `class Contacts extends React.Component{}`
* 状态初始化不同
    * 15 `getInitialState(){return {name: "jack"}}`
    * 16 `constructor(){ super(); this.state = { num: 666 } }`
* this的指向不同
    * 15 this会自动获取到React实例
    * 16 this不是React实例，可以用bind()
* propTypes 和 getDefaultProps
    * 15 ` propTypes = { name: PropTypes.string }  getDefaultProps() { return { name: "默认 name" } }`
    * 16 `static propTypes = { name: PropTypes.string } static defaultProps = { name: "默认 name" }`
* Mixins混合的区别
    * 15 `let myMixins = { doSomething(){} } let todo = React.createClass({ mixins: [myMixins], render(){ return () } })`
    * 16 `export default class wrap extends Component{ componentDidMount(){}; render(){ <Son/> }}`，就是在组件外边包了一层

#### 获取DOM元素

* 在元素上使用：`ref = "xxx"`
* 在组件中使用：`this.refs.xxx`

#### 插件

* 基本使用
    * react-router-dom(在浏览器中使用)
    * react-router-native(开发手机原生应用使用的)
        * 推荐使用react-navigation

* 使用流程
    * 下载 npm install react-router-dom
    * 引入对象
        * 按需引入 HashRouter, BrowserRouter, Route
    * HashRouter: 代表路由框架的坑
    * BrowserRouter: 代表路由框架的坑，最终是没有#的方式，原理是基于click + history.pushState
    * Route: 代表锚点及组件和填入的位置，里面有path，component，相当于配置路由规则

            import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';

* switch 匹配一个
    * 横向匹配一个
    * 被其标签**包裹**的Route从上到下，只会匹配一个（选其一）

* exact 精确匹配
    * 纵向（精确）匹配一个
    * 精确匹配锚点
    * 应用场景：首页"/"需要使用，因为"/"范围太大，会匹配很多东西，其他路由不使用，为了能使用嵌套路由

* 默认重定向（相当于404）
    * 放在路由最后一位，用来处理页面找不到，配合Switch
    * Redirect：to属性指定路由

* 路由传参
    * params
        * 路由：`<Route path="/user/:id" component={User}></Route>`
        * 接收：`this.props.match.params.id`
    * query
        * 路由：`<NavLink to={{pathname: "/Luyou1", query: {id: 9}}}>路由传参</NavLink>`
        * 接收：`this.props.location.query.id`

* 前进/后退
    * goForward()
    * goBack()





`...`这是es6的特性，主要用于 数组和对象的析构
















*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*