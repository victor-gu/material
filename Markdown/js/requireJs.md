## requireJs
> RequireJS的目标是鼓励代码的模块化，它使用在js中加载js文件的方式代替传统的script加载步骤。可以用它来加速、优化代码，但其主要目的还是为了代码的模块化

#### requirejs的出现主要解决两个问题

1. 实现js文件的异步加载，避免网页失去响应
2. 管理模块之间的依赖性，便于代码的编写和维护

#### 使用
> 按照requireJS当中的规范要求，你只需加载一个文件就可以，并指定页面主模块main.js，由于requirejs默认的文件后缀名是js，所以可以把main.js简写成main(把一个文件当做一个模块)

`<script src ="require.js" data-main ="main"></script>`

* data-main属性的作用是，指定网页程序的主模块
* 基础路径baseUrl: 基础路径baseUrl
    * 默认值是加载require.js的HTML文件所在的路径
    * 但如果用了data-main属性，则主模块所在的目录就变成baseUrl

#### 常用方法

* 配置参数：requirejs.config/require.config
* 加载模块：requirejs/require
* 定义模块：define

##### 配置config

    //config.js-----
    requirejs.config({
        baseUrl : "js",  // 一般不写
        paths : {        // 简化
             "jquery": "lib/jquery.1.11.3"
        },
        shim: {
             "jquery.scroll": {
                 deps: ["jquery"],  // 设置依赖
                 exports: "jQuery.fn.scroll"   // 非标准化的模块
             }
        }
    });
* baseUrl：指定基础路径
* paths：path映射那些不直接放置于baseUrl下的模块名。设置path时起始位置是相对于baseUrl的
* shim配置
    > 严格意义上来说，requirejs必须加载由define()函数定义的模块，但有一些插件，本身未return任何对象或函数，只是对某个框架的扩展，例如 jquery.scroll.js 该怎么实现模块化加载，答案是shim配置

#### 加载模块

    requirejs(['jquery', "common"],function(jq){
        // jquery, common加载顺序不一定，所以要用require.config设置依赖
    });

#### 定义模块define
> 在引入模块时，回调函数中得到什么取决于定义模块时返回了什么

    define(function(){
        return {
            getStyle : function(){ ........ },
            randomColor : function(){ ......... }
        }
    });
* 如果定义的模块需依赖其他模块，格式如下，这种模块加载方式称为：预加载

        //本模块依赖jquery
        //第一个参数为依赖模块，可以是多个，这里的路径同样基于baseUrl或path
        define(["jquery"],function(jq){
            return {
                start: function(){
                    jq("#box").show(1000);
                    console.log("模块提供的start方法");
                }
            }
        });
* 如果需要在define内部依赖其他模块，则写法如下，这种模块加载方式称为：延迟加载

        define(["require","jquery"],function(require){
            var a = require('./js/a');
        });

通常config将公共的的全局配置

    require.config({
        // baseUrl:'js'
        paths:{
            'jquery':'../lib/jquery-3.2.1',
            'zoom':'../lib/jquery.gdsZoom/jquery.gdsZoom'
        },
        shim:{
            // 设置依赖
            'zoom':['jquery'],
            // 'common':['jquery']
        }
    });
加载

    require(['config'],function(){
        // 建议：有返回值的写前面
        require(['jquery','carousel','zoom'],function($,ca){
            console.log('name:',ca.type($));
            $('.box').gdsZoom({
                position:'bottom'
            })
        })
    });


#### 模块化开发的优点

1. 避免命名冲突
2. 更好的依赖处理
3. 按需加载
3. 面向对象编程

#### 模块化规范与框架

1. 1.commonJS：通用的模块规范（同步）
> 模块化框架：nodejs
2. AMD：异步模块定义规范（预加载）
> 模块化框架：requirejs
3. CMD：通用模块定义规范（延迟加载）
> 模块化框架：seajs

###### ADM，CommonJS，CMD的区别
> Commonjs是一个更偏向于服务器端的规范。Node.js采用了这个规范。 根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读 取一个文件并执行。但是Commonjs是同步加载模块，这种同步机制到了浏览器里边就有问题了，鉴于浏览器的特殊情况，又出现了一个规范，这个规范呢可以实现异步加载依赖模块，并且会提前加载那就是AMD规范。CMD这个规范实际上是为了Seajs的推广然后搞出来的。


*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*