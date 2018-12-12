## gulp





#### npm的 --save 和 --save-dev 之间的区别
> npm包管理器在安装包的时候，会有两种安装方式，一种是–save，另一种是–save-dev

###### 共同点

* 两种方式都会安装到node_modules目录中
* 两种方式都会保存到package.json文件中

###### 区别

* –save会存放到”dependencies”，而–save-dev会存放到”devDependencies”。 
* --save是对生产环境所需依赖的声明(开发应用中使用的框架，库)比如：jq，react，vue都需要放到这里面 （npm install gulpName默认是--save）
* --save-dev是对开发环境所需依赖的声明(构建工具，测试工具) 比如：babel，webpack，都放到当前目录

###### 使用

* npm install进行项目安装，这种默认是生产环境和开发环境都会安装
* 如果带上后缀npm install --production则只会安装生产环境的所有模块，而无视开发环境的相关模块




[gulp中文网](https://www.gulpjs.com.cn/docs/getting-started/ "gulp中文网")
[npm中文网](https://www.npmjs.com/ "npm中文网")