## 小程序

# A Mpvue project

## 步骤

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
npm install

# 开发时构建
npm run dev

# 打包构建
npm run build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm run dev:wx
npm run dev:swan
npm run dev:tt
npm run dev:my

# 指定平台的打包构建
npm run build:wx
npm run build:swan
npm run build:tt
npm run build:my

# 生成 bundle 分析报告
npm run build --report
```
## 开发

1. 尺寸单位

| 设备 | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| ------ | ------ | ------ |
| iPhone5 | 1rpx = 0.42px | 1px = 2.34rpx |
| iPhone6 | 1rpx = 0.5px | 1px = 2rpx |
| iPhone6 Plus | 1rpx = 0.552px | 1px = 1.81rpx |

**建议以 iPhone6 作为视觉稿的标准**

2. 页面栈

| 路由方式 | 页面栈表现 |
| ------ | ------ |
| 初始化 | 新页面入栈 |
| 打开新页面 | 新页面入栈 |
| 页面重定向 | 当前页面出栈，新页面入栈 |
| 页面返回 | 页面不断出栈，直到目标返回页 |
| Tab 切换 | 页面全部出栈，只留下新的 Tab 页面 |
| 重加载 | 页面全部出栈，只留下新的页面 |

3. 生命周期

* beforeCreate，created：所有模块里面的beforeCreate，created生命周期函数都会在小程序加载的时候一次性执行，后面进入该模块不会执行该钩子
* beforeCreate先于created
* beforeMount，mounted，onReady，onLoad：在模块加载过一次后，切换tab和返回到该模块时，该钩子不会执行，可参考页面栈
* 执行先后顺序为：onLoad，onReady，beforeMount，mounted
* 建议发送http请求在onLoad生命钩子里，可以减少白屏时间
* onShow：在模块显示的时候执行，切换tab和返回到该模块时，该钩子会执行，多次触发
* onHide：在模块隐藏的时候执行，切换tab和返回到该模块时，该钩子会执行，多次触发

4. 不支持过滤器filters，不可以在template中使用methods中的方法，不支持Vue-router
5. mpvue 建议使用v-model.lazy绑定方式以优化性能，此外 v-model 在老基础库下输入框输入时可能存在光标重设的问题
6. 通过 this.$root.$mp.query 进行获取小程序在 page onLoad 时候传递的 options。通过 this.$root.$mp.appOptions 进行获取小程序在 app onLaunch/onShow 时候传递的 options
7. 新添加的页面有时候不会渲染出来，因为 webpack 编译的文件使用配置的 entry决定的，新增的页面并没用添加进 entry，所以需要手动 npm run dev 一下
8. 小程序转发：path要写app.json中所配置的绝对路径，将app.json中配置该页面的路径直接复制过来就好了，转发后的页面，也需要先扫一下微信开发者工具，更新到最新代码才可以
9. 背景图片手机无法预览：小程序官方文档说明：本地资源无法通过 WXSS 获取
10. 小程序分享报错 Cannot read property 'apply' of null;at page XXX onShareAppMessage function：onShareAppMessage()分享函数，不能再子组件去触发父级的分享，把 onShareAppMessage 放在父级就好啦
11. 小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用
12. bind事件名需要改成@事件名
13. tabbar的icon路径需要放到static目录下，否则会找不到
14. 新增页面需要重新npm run dev
15. 小程序双括号内不支持方法，所以vue里面的filter都不能用
16. 微信小程序的 javascript 运行环境和浏览器不同，页面的脚本逻辑是在JsCore中运行

#### mpvue + iView weapp 问题

1. 若原生组件通过click事件，即this.triggerEvent('click', { index })来进行父子组件通信，mpvue无法从event.mp中读取到正确的detail，原因是因为mpvue将click事件编译为tap导致this.triggerEvent('click', { index })无法找到click句柄

    * 暂时解决方案：修改组件库click事件名称，例如：

          this.triggerEvent('click', { index }) => this.triggerEvent('iclick', { index })

    * 对应的模板中：

          @click => @iclick

    * 受影响组件(仅传值情况受影响)
      * action-sheet
      * modal

2. 微信小程序中，关于第三方组件，不允许直接修改样式，但是可以通过i-class的方式进行添加样式，但是这样不能覆盖修改第三方组件已经写好的样式

    * 修改源码添加需要修改样式的class，已修改组件有：
        * action-sheet添加i-class-actions类，支持修改选择项样式
    * 为了不污染其他部分样式，我们一般希望这里添加scoped，此时样式作用域不能深入到子组件中，所以可以通过深度作用选择器（ >>> ）来解决，less或者sass等预编译，是不支持>>>操作符的，可以使用/deep/来替换>>>