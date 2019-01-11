## Webpack + Vue-cli

1. 全局安装：`npm install -g vue-cli`
2. 局部安装：`vue init <template-name> 项目名`
3. `cd 项目名`
4. `npm install`
5. `npm run dev`

#### templale-name

1. webpack：一个功能齐全的webpack+vue-loader设置，具有热重载，linting，测试和css提示功能
2. webpack-simple：一个简单的webpack+vue-loader设置，用于快速的原型设计
3. browserify：全功能的browserify+vueify设置用热重载，linting和热重载
4. browserify-simple：一个简单的browserify+vueify设置，用于快速的原型设计
5. pwa：基于webpack模板的vue-cli的pwa模板
6. simple：单个html文件中最简单的vue设置

[模板下载地址](https://github.com/vuejs-templates/)

#### webpack-simple参数

* webpack.config.json (类似于gulp的gulpfile.js文件)
    * entry：打包入口文件
    * output：打包出来的文件配置
    * rules：打包规则
* package.json
    * scripts对象里的dev，可更改dev为start,打开为`npm run start`,可直接`npm start`，只有start可以省略run
        * --open：自动打开
        * --hot：热更新
        * --port 88：更改端口
        * --inline: 自动刷新

#### webpack参数

* config/index.js
    * host：ip地址, 更改为"0.0.0.0"后，localhost和本地ip地址都可以访问
    * port：端口
    * autoOpenBrowser：自动打开l浏览器
    * useEslint：是否使用Eslint
* main.js
    * Vue.config.productionTip：是否显示提示信息
* build/webpack.base.conf.js
    * @：指定了路径的别名
* webpack默认没有引入sass，可以引入sass，
    * `npm install sass-loader node-sass webpack --save-dev`
    * `npm install style-loader css-loader --save-dev`
* scoped：默认只对当前组件有作用，解决了样式私有化的问题

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