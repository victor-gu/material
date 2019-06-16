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
