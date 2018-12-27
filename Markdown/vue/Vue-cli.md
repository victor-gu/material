## Vue-cli

1. 全局安装：`npm install -g vue-cli`
2. 局部安装：`vue init webpack-simple 项目名`
3. `cd 项目名`
4. `npm install`
5. `npm run dev`

#### 参数

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