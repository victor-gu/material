## 遇到问题

#### IE报 vuex requires a Promise polyfill in this browser
> 原因是IE不能解析ES6语法

###### 解决：npm install babel-polyfill --save-dev，找到build/webpack.base.conf.js，找到entry添加：app: ["babel-polyfill", './src/main.js']

#### ESlint全局变量报错：xx is not defined

###### 解决： /* global layer */，这样使用就告诉了eslint，我全局变量里面有xx，不要再报错了

#### ESlint声明未使用报错：'xxx' is assigned a value but never used

######解决：1. 在声明变量的当前行加上一条注释 // eslint-disable-line no-unused-vars。2. 找到eslint.json，\{"rules":\{ "no-unused-vars":0 }}

#### element select在edge浏览器有个bug，官网就是如此，el-select选择几次后，会出现刷新页面，有时会出现跳转到一个404页面，（并不是所有的edge都会）

######解决

    <el-select @visible-change="visibleChange">
        /// options
    </el-select>

    export default {
        methods: {
            visibleChange(isVisible) {
                const isEdge = window.navigator.userAgent.includes('Edge');
                if (isEdge && !isVisible) {
                    document
                        .querySelectorAll('body > .el-select-dropdown.el-popper')
                        .forEach((it) => it.remove());
                }
            },
        },
    }

#### 常规的vue项目分为本地环境和生产环境，我们只要对 config 文件夹下的 dev.env.js 和 prod.env.js 做相应的配置即可。但是最近在做的项目中，涉及到私有化部署，就是对应的生产环境的地址，不是唯一的。如果每次都修改一个地址，再打包文件进行部署，过程繁琐且低效。那么如何把环境地址设置成可配置的，不需要再构建代码就能直接生效呢

###### 解决
* 在 static 文件夹中新建一个 config.json，把你要写的配置写入
* 用http的请求的方式读取数据，不能直接引用读取文件，打包后再修改config.js后不会发生变化

#### element的table组件expand会渲染两次模板内容

* 原因： The fixed attribute in \<el-table-column\> will causes \<el-table-body\> to be rendered twice
* 具有fixed属性的table会这样，因为现在 fixed table 的实现方式就是用多个 table 拼装而成的，实现方式不一样，去掉fixed属性就好了

#### vue中如何动态的绑定图片，vue中通过data返回图片路径
> 在data中必须用require加载，否则会当成字符串来处理

        data() {
            return {
                logo: require('@/assets/user/default.png')
            }
        }

#### 不同的路由中加载同一个组件，切换时默认情况下这两个页面切换时并不会触发 vue 的 created 或者 mounted 钩子

        {
            path: '/login',
            component: () => import('@/views/login/index')
        }
        {
            path: '/login1',
            component: () => import('@/views/login/index')
        }
###### 解决
* watch $route 的变化
* router-view 上加上一个唯一的 key：`<router-view :key="key"></router-view>`

#### 为了不污染其他部分样式，我们一般希望这里添加scoped，此时样式作用域不能深入到子组件中
> 可以通过深度作用选择器（ >>> ）来解决，less或者sass等预编译，是不支持>>>操作符的，可以使用/deep/来替换>>>