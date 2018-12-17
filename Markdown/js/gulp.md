## gulp
> gulp是当下最流行的自动化工具 ，可以自动化完成我们开发过程中大量的重复工作

#### 安装与运行
> 前提是安装了nodejs环境，测试nodeJs (node -v)，测试npm (npm -v)

* 全局安装 gulp
> npm install -g gulp，全局安装gulp目的是为了通过它执行gulp任务
* 本地安装gulp
> npm install gulp，本地 安装gulp是为了调用gulp插件的功能，这步操作前先新建package.json文件(npm init)
* 创建gulpfile.js文件
> 在项目根目录下创建一个名为 gulpfile.js 的文件，gulpfile.js是gulp项目的配置文件
* 运行 gulp
> gulp <任务名称>，如果有不需要编译的文件，只需要在文件前加下划线

#### gulp工作流程

1. 先通过 gulp.src() 方法获取到想要处理的文件，并返回文件流
2. 然后文件流通过 pipe 方法导入到 gulp 的插件中
3. 经过插件处理后的文件流再通过pipe方法导入到 gulp.dest() 方法中
4. 最后通过gulp.dest() 方法把流中的内容写入到文件中
> 文件流=>文件在内存中的状态

#### API

1. 创建任务

        gulp.task('buildsass',function(){

        });
2. 匹配要处理的文件

        gulp.src(globs[, options])
        // options 有3个属性buffer、read、base
3. 输出文件
> 把文件流中的内容中输出到指定目录

        gulp.dest(path[, options])
4. 监听文件修改，并执行相应任务

    gulp.watch(glob [, opts], tasks)
    gulp.watch(glob [, opts, cb])

#### gulp插件
[gulp中文网](https://www.gulpjs.com.cn/docs/getting-started/ "gulp中文网") [npm中文网](https://www.npmjs.com/ "npm中文网")

1. 安装插件
> 可一次性安装多个插件，插件间用空格隔开，卸载插件npm uninstall ...(卸载不需要写--save, --save-dev就可以更新package.json文件)

        npm install --save gulp-htmlmin
2. 引包：require()

        var htmlmin = require('gulp-htmlmin')
3. 使用：pipe()

        gulp.task('htmlmin',function(){
            gulp.src('src/html/*.html')
            .pipe(htmlmin())
            .pipe(gulp.dest('dist/html'));
        });

#### 常用gulp插件

* htmml压缩：gulp-htmlmin
* js压缩：gulp-uglify(ES6的有些语法可能不支持,所以压缩之前先用babel转成es5)
* 合并文件：gulp-concat
* 文件重命名：gulp-rename
* 编译Sass: gulp-sass
* 编译 Less：gulp-less
* 浏览器同步测试：browser-sync
* 创建node服务器：http-server
* 图片压缩：gulp-image
* css压缩：gulp-clean-css
* 补全浏览器兼容的css：gulp-autoprefixer

gulp-sass

    gulp.task('compileSass', async()=>{
        gulp.src("./src/sass/*.scss")
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(gulp.dest("./src/css"))
    });

    <!-- 配置参数 -->
    nested(默认）
    expanded：展开
    compact：单行
    compressed：压缩

sass监听

    gulp.task("jtSass", function(){
        gulp.watch("./src/sass", gulp.series("compileSass"));
    });

gulp-uglify, gulp-concat, gulp-rename

    gulp.task("merge", async()=>{
        gulp.src(["./src/js/*.js", "!./src/js/{all, all.min}.js"])
        // 合并
        .pipe(concat("all.js"))
        .pipe(gulp.dest("./src/js"))
        // 压缩
        .pipe(uglify({compress: true}))
        // 重命名
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("./src/js"))
    });

babel

1. 全局安装babel-cli
2. 局部安装babel-preset-es2015, babel
3. 在项目目录建立.babelrc文件，内容：`{"presets": ["es2015"],"plugins": []}`
4. 输出
    * 转码结果写入一个文件，-out-file 或 -o 参数指定输出文件：`babel example.js -o compiled.js`
    * 整个目录转码，--out-dir 或 -d 参数指定输出目录：`babel src -d lib`

http-server

1. 全局安装http-server
2. 启动：http-server，可以指定端口-p: `http-server -p 1000`

browser-sync

    gulp.task("server", async()=>{
        browserSync({
            // 创建一个静态服务器
            server: "./src",
            // 监听文件
            files: ["./src/**/*.html", "./src/**/*.css"],
            // 指定端口
            port: 10000,
            // 代理服务器，代理php服务器，能够识别php
            proxy: "http://localhost:10000"
        })
        // 监听sass的修改
        gulp.watch("./src/sass", gulp.series("compileSass"));
    });

gulp-image

    gulp.task("imageMin", async()=>{
        gulp.src("./src/img/*")
        .pipe(image())
        .pipe(gulp.dest("./image"))
    });

gulp-autoprefixer

    gulp.task('cssPre', async()=>{
        gulp.src('./src/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./cssTest'))
    });

gulp-clean-css

    gulp.task("cssMin", async()=>{
        gulp.src('./cssTest/*.css')
            .pipe(cssmin({
                advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(gulp.dest('./cssMin')) // 将会在dist/css下生成index.css
    });

#### globs语法
> globs需要处理的源文件匹配符路径，语法如下

* 匹配单个文件：`gulp.src('src/js/index.js')`
* 匹配多个文件：`gulp.src(['src/js/index.js','src/js/detail.js']) //多个文件以数组形式传入`
* 匹配所有文件：`gulp.src('src/js/*.js')`
* 匹配符：
    * !：排除文件，
    * *：匹配所有文件，
    * **：匹配0个或多个子文件夹，
    * {}：匹配多个属性

#### cnpm
> 因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事

> cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm

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


## sass
> SASS是一个成熟、稳定、强大的 CSS 扩展语言解析器，提供变量、嵌套、混合、继承等特性，大大节省了设计者的时间，使得CSS的开发变得简单和可维护

#### 语法

1. 注释
    * 多行注释 /* */ (会出现在css中)
    * 单行注释 // (不会出现在css中)

2. 变量
> sass的变量必须是$开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号(:)分隔开，可以建一个var.scss文件，存放公共变量

* 全局变量与局部变量
> 定义在任何选择器之外的变量被认为是全局变量，定义在选择器内的变量称之为局部变量,但启用了global后，即使写在局部也能覆盖全局变量

        $color:#fff !global;

* 默认变量
> sass的默认变量仅需要在值后面加上!default即可,覆盖的方式只需要在默认变量之前重新声明下变量即可

    $baseLineHeight:2;
    $baseLineHeight:1.5 !default;
    body{
        line-height: $baseLineHeight; 
    }
    输出：
    body{
        line-height:2;
    }
可以看出现在编译后的line-height为2，而不是我们默认的1.5。默认变量的价值在进行组件化开发的时候会非常有用

* 特殊变量
> 一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等,则必须要以#{$variables}形式使用

        $borderDirection:top !default;
            //应用于class和属性
            .border-#{$borderDirection}{
            border-#{$borderDirection}:1px solid #ccc;
        }

* 多值变量
> 值变量分为list类型和map类型，简单来说list类型有点像js中的数组，而map类型有点像js中的对象

        //list类型
        $pd: 5px 10px 20px 30px;

        //使用
        .content{padding:$pd;}
        .btop{border-top:nth($pd,1);}


        //map类型
        $headings: (h1: 2em, h2: 1.5em, h3: 1.2em);

        //使用
        h1{map-get($headings,h1)}

3. 嵌套
> 在嵌套中用&表示父元素选择器

4. 混合器
> 变量可以实现简单样式的重用（如color,width等），但是当你的样式变得越来越复杂，你需要大段大段的重用样式的代码，可以通过sass的混合器实现重用

sass中使用@mixin声明混合，通过@include来调用

* 无参数mixin
* 有参数mixin：参数名以$符号开始
* 多个参数mixin：多个参数以逗号分开
* @content

        @mixin max-screen($res){
            @media only screen and (max-width:$res){
                @content;
            }
        }
        @include max-screen(480px){
            body{ 
                color:red;
            }
        }
        结果
        @media only screen and (max-width: 480px) { body { color: red; } }

>@mixin通过@include调用后解析出来的样式是以拷贝形式存在的，而下面的继承则是以联合声明的方式存在的，所以从3.2.0版本以后，建议传递参数的用@mixin，而非传递参数类的使用下面的继承

5. 继承
> 使用选择器的继承，要使用关键词@extend

* 继承一般样式
`@extend h1`
* 占位选择器%

        %ir{
            color: transparent;
            text-shadow: none;
            background-color: transparent;
            border: 0;
        }
        @extend %ir;

6. 函数

* 常用函数
    * percentage($value)：将一个不带单位的数转换成百分比值；
    * round($value)：将数值四舍五入，转换成一个最接近的整数；
    * ceil($value)：将大于自己的小数转换成下一位整数；
    * floor($value)：将一个数去除他的小数部分；
    * abs($value)：返回一个数的绝对值；
    * min($numbers…)：找出几个数值之间的最小值；
    * max($numbers…)：找出几个数值之间的最大值。
    * lighten($color,$percent)
    * darken($color,$percent)，$color颜色值，$percent百分比
> 数值可以带单位

* 自定义函数
> 格式：@fuction 函数名。sass变量带上$，关键字带上@，函数声明必须在使用前


        $oneWidth: 10px;  
        $twoWidth: 40px;
        @function widthFn($n){ 
            @return $n * $twoWidth + ($n - 1) * $oneWidth;  
        }  
        .leng {
            width: widthFn($n : 5);  
        }

7. 运算
> sass具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。请注意运算符前后请留一个空格，不然会出错, 可以带单位

8. 条件判断及循环

* @if判断
    @if可一个条件单独使用，也可以和@else结合多条件使用， @else后面的if不用带上@

        @if $type == ocean {
            color: blue;
        } @else if $type == matador {
            color: red;
        } @else {
            color: black;
        }

* for循环

        @for $var from <start> through <end>（包含end值）
        @for $var from <start> to <end>（不包含en值）

9. 导入
> sass中导入其他sass文件，最后编译为一个css文件，优于纯css的@import

`@import 'reset';`

* 默认为当前scss路径
* 可以省略后缀名(scss)
* 可以省略下滑线(_)


*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*