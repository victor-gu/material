## 遇到问题

#### IE报 vuex requires a Promise polyfill in this browser
> 原因是IE不能解析ES6语法

###### 解决：npm install babel-polyfill --save-dev，找到build/webpack.base.conf.js，找到entry添加：app: ["babel-polyfill", './src/main.js']