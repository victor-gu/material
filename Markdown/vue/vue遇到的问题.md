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