/*
	* 封装常用方法
	* 提取公共代码
 */













// var element = {
//             /**
//              * [获取元素节点]
//              * @param  {Node} nodes [传入的节点]
//              * @return {Element}   res    [返回元素节点]
//              */
//             get:function(nodes){
//                 var res = [];
//                 for(var i=0;i<nodes.length;i++){
//                     if(nodes[i].nodeType == 1){
//                         res.push(nodes[i]);
//                     }
//                 }
//                 return res;
//             },

//             /**
//              * [获取子元素]
//              * @param  {element} element [传入的元素]
//              * @return {element}   res   [返回元素节点]
//              */
//             children:function(element1){
//                 var nodes = element1.childNodes;
//                 var res = element.get(nodes);
//                 return res;
//             },

//             /**
//              * [获取下一个元素]
//              * @param  {element} element [传入的元素]
//              * @return {element}     res    [返回下一个元素]
//              */
//             next:function(element){
//                 var res = element.nextSibling;
//                 while(res.nodeType != 1){
//                     res = res.nextSibling;
//                 }
//                 return res;
//             },

//             /**
//              * [获取上一个元素]
//              * @param  {element} element [传入的元素]
//              * @return {element}     res    [返回上一个元素]
//              */
//             prev:function(element){
//                 var res = element.previousSibling;
//                 while(res.nodeType != 1){
//                     res = res.previousSibling;
//                 }
//                 return res;
//             }
//         }



// /**
//  * [获取css样式兼容ie8以下]
//  * @param  {element} ele [元素]
//  * @param  {attribute} attr [属性名]
//  * @return {String}     [返回属性值]
//  */
// function getCss(ele,attr){
//     // 兼容的思路：判断当前浏览器是否支持这个方法
//     // 而不是判断当前时什么浏览器
//     if(window.getComputedStyle){
//         return getComputedStyle(ele)[attr]
//     }else if(ele.currentStyle){
//         return ele.currentStyle[attr];
//     }else{
//         // 如果以上两个都不支持，则直接返回内联样式
//         return ele.style[attr];
//     }
// }


// var Event = {
//     /**
//      * [绑定事件的方法，兼容所有浏览器]
//      * @param  {Element}  ele       [绑定事件的元素]
//      * @param  {String}  type      [事件类型]
//      * @param  {Function}  handler   [事件处理函数]
//      * @param  {Boolean} isCapture [是否捕获]
//      */
//     bind:function(ele,type,handler,isCapture){
//         // W3C标准的事件监听器
//         if(ele.addEventListener){
//             ele.addEventListener(type,handler,isCapture)
//         }

//         // IE8以下浏览器
//         else if(ele.attachEvent){
//             ele.attachEvent('on'+type,handler)
//         }

//         // DOM节点绑定方式
//         else{
//             ele['on' + type] = handler;
//         }
//     },
//     remove(ele,type,handler,isCapture){
//         if(ele.removeEventListener){
//             ele.removeEventListener(type,handler,isCapture)
//         }
//         else if(ele.detachEvent){
//             ele.detachEvent('on'+type,handler)
//         }
//         else{
//             ele['on' + type] = null;
//         }
//     }
// }







// /**
//  * [动画函数]
//  * @param  {Element} ele    [动画元素]
//  * @param  {String} attr   [动画属性]
//  * @param  {Number} target [目标值]
//  */
// /*function animate(ele,attr,target){
//     var timername = attr + 'timer';//toptimer,lefttimer
//     clearInterval(ele[timername]);
//     ele[timername] = setInterval(()=>{
//         // 获取当前值
//         let current = getComputedStyle(ele)[attr];//'100px,50deg,0.3'

//         //提取单位
//         let unit = current.match(/[a-z]+$/);//px,deg,null

//         // 
//         unit = unit ? unit[0] : '';

//         // 提取值
//         current = parseFloat(current);



//         // 计算缓冲速度
//         let speed = Math.floor((target-current)/10);//-32->20->10->5.5->0.5

//         // 计算top值
//         current += speed;

//         if(current === target || speed === 0){
//             clearInterval(ele[timername]);

//             // 重置current值
//             current = target;
//         }

//         ele.style[attr] = current + unit;

//     },30);
// }*/

// // function animate(ele,opt,callback){
// //     // opt= {left:100,top:200,fontSize:40}

// //     // 属性（动画）数量
// //     ele.timerLen = 0;

// //     // 遍历设置定时器（动画）
// //     for(var attr in opt){
// //         // 遍历过程设定动画数量
// //         ele.timerLen++;

// //         // 匿名函数传递attr
// //         (function(attr){
// //             var timername = attr + 'timer';
// //             var target = opt[attr];

// //             // 清除同名timer
// //             clearInterval(ele[timername]);

// //             ele[timername] = setInterval(function(){
// //                 // 获取当前值
// //                 var current = getCss(ele,attr);//100px,45deg,0.3

// //                 // 提取单位
// //                 var unit = current.match(/[a-z]+$/);//[px],[deg],null

// //                 unit = unit ? unit[0] : '';

// //                 // 提取值
// //                 current = parseFloat(current);

// //                 // 计算缓冲速度
// //                 var speed = (target-current)/10;//-0.5,10,0.2

// //                 // 避免速度变成0

// //                 // 有单位
// //                 speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

// //                 if(attr === 'opacity'){
// //                     speed = speed<0 ? -0.02 : 0.02;
// //                 }

// //                 current += speed;

// //                 // 当到达目标值时
// //                 if(current === target || speed === 0){
// //                     clearInterval(ele[timername]);
// //                     current = target;

// //                     ele.timerLen--;

// //                     // 执行回到函数
// //                     // if(typeof callback === 'function'){
// //                     //  callback();
// //                     // }


// //                     // 动画完成后执行回掉函数
// //                     if(ele.timerLen === 0){
// //                         typeof callback === 'function' && callback();
// //                     }
// //                 }
// //                 ele.style[attr] = current + unit;
// //             },30);

// //         })(attr);
// //     }
// // }
















// ajax全局配置

//ajax请求开始前
$(document).ajaxStart(function(){
    common.loadingShow();
});


//ajax请求时
$(document).ajaxSend(function(){
    // common.loadingShow();
});


//ajax获取数据后
$(document).ajaxSuccess(function(){
    common.loadingHide();
});


//ajax请求完成时
$(document).ajaxComplete(function(){
    common.loadingHide();
});


//ajax请求发生错误后
$(document).ajaxError(function(){
    common.loadingHide();
});


var common = {
    /**
     * [压缩图片成为base64的编码]
     * @param  {string} path [图片的原始路径，必填]
     * @param  {number} imgWidth [压缩后的图片宽度，可不填，默认为原始宽高]
     * @param  {number} quality [压缩率0-1,越小压缩率越高，可不填，默认为0.7]
     * @param  {string} suffix [压缩后的图片格式,类型为image/jpeg或image/webp的quality才会生效，可不填，默认为原始后缀]
     * @param  {function} callback [携带图片的base64编码返回，必填]
     */
    getBase64Image: function(params, callback){
        var tempImage = new Image();
        tempImage.src = params.path;
        tempImage.crossOrigin = "*";
        tempImage.onload = function(){
            var canvas = document.createElement("canvas");
            // 图片原始尺寸
            var originWidth = tempImage.width;
            var originHeight = tempImage.height;

            var scale = originWidth / originHeight;
            var width = params.imgWidth || originWidth;
            var height = parseInt(width / scale);

            // canvas对图片进行缩放
            canvas.width = width;
            canvas.height = height;
            
            var ctx = canvas.getContext("2d");
            ctx.drawImage(tempImage, 0, 0, width, height);
            var ext = tempImage.src.substring(tempImage.src.lastIndexOf(".")+1).toLowerCase();
            suffix = params.suffix || ext;
            quality = params.quality || 0.7;
            var dataURL = canvas.toDataURL("image/"+suffix, quality);
            callback(dataURL);
        }
    },



    /* [imgToBase64 压缩图片]
        * @param  {[type]} file      [file对象 event.target.files[0]]
        * @param  {[type]} maxWidth  [最大宽度]
        * @param  {[type]} maxHeight [最大高度]
        * @param  {[type]} callBack  [回调函数，参数为base64码]
        * @return {[type]}           [description]
    */
    imgToBase64: function(file, maxWidth, maxHeight, callBack) {
        // 压缩图片需要的一些元素和对象
        var reader = new FileReader();
        var img = new Image();
        img.onload = function() {
            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;
            // 目标尺寸
            var targetWidth = originWidth;
            var targetHeight = originHeight;
            // 图片尺寸超过最大限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }
            // 缩放图片需要的canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            var base64 = canvas.toDataURL();
            callBack(base64);
        };
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },
  
    /**
        * [base64ToFileObject base64码转blob二进制，再转file对象]
        * @param  {[type]} base64 [base64码]
        * @param  {[type]} name [文件名]
        * @return {[type]} newFile [返回新的file对象]
     */
    base64ToFileObject: function(base64, name) {
        var type = base64.split(',')[0].match(/:(.*?);/)[1];
        base64 = base64.split(',')[1];
        base64 = window.atob(base64);
        var ia = new Uint8Array(base64.length);
        for (var i = 0; i < base64.length; i++) {
            ia[i] = base64.charCodeAt(i);
        }
        var blob = new Blob([ia], { type: type });
        return new File([blob], name + '.png');
    },


 
    /**
     * [select下拉框]
     * @param  {Array} data [需要显示的数组内容]
     * @param  {Function} callback [携带当前选中的文本信息]
     */
    popupSelect: function (data, callback) {
        callback = callback || function () {};
        var selText01 = '<div class="gu_select"><ul>';
        var selText03 = '</ul></div>';
        var selText02 = "";
        for (var i = 0; i < data.length; i++) {
            selText02 += '<li>' + data[i] + '</li>';
        }
        var selText = selText01 + selText02 + selText03;
        
        $("body").append(selText);

        $(".gu_select ul").animate({"top": "50%"}, "fast");
       
        $(".gu_select li").click(function(){
            var text = $(this).text();
            callback(text);
            $(".gu_select").remove();
            return false;
        });

        $(".gu_select").click(function(){
            $(".gu_select").remove();
        });
    },


    /**
     * [tip提示框]
     * @param  {string} content [需要提示的内容]
     * @param  {object} def [配置参数，time多少时间自动消失,默认1秒，selfClosing是否需要自动关闭，默认是自动关闭]
     * @param  {Function} callback [当关闭时执行相应操作]
     */
    popupTip: function (content, def, callback) {
        def = def || {};
        def.time = def.time || 1000;
        def.selfClosing = def.selfClosing || "true";
        callback = callback || function(){};
        var text = '<div class="gu_tip">' +
                        '<span>' + content + '</span>' +
                    '</div>';

        $("body").append(text);

        $(".gu_tip span").animate({"bottom": "50%"}, "fast");
        
        if(def.selfClosing == "true"){
            setTimeout(function(){
                $(".gu_tip").remove();
                callback();
            }, def.time);
        }
    },


    /**
     * [text文本提示框, 尽量内容在12个字之内]
     * @param  {object} par [content:需要提示的内容, sure:在确认需要显示的字符，默认是"确认", cancel:在取消需要显示的字符,默认是"取消"]
     * @param  {Function} callback [必填，确定成功回调]
     * @param  {Function} closeCallback [取消回调]
     */
    popupTextShow: function (par, callback, closeCallback) {
        par.sure = par.sure || "确认";
        par.cancel = par.cancel || "取消";
        callback = callback || function(){};
        closeCallback = closeCallback || function(){};
        var text = '<div class="gu_text">'+
                        '<div class="text">'+
                            '<p class="title">提示</p>'+
                            '<div class="content">' + par.content + '</div>'+
                            '<div class="deal">'+
                                '<span class="sure">'+par.sure+'</span><span class="cancel">'+par.cancel+'</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

        $("body").append(text);

        $(".gu_text .text").animate({"top": "50%"}, "fast");

        $(".gu_text .sure").click(function(){
            callback();
            $(".gu_text").remove();
        });

        $(".gu_text .cancel").click(function(){
            closeCallback();
            $(".gu_text").remove();
        });
    },


    /**
     * [loading加载]
     * @param  {object} par [需要配置的参数，hasClose是否有关闭按钮，默认没有。title文字提示]
     * @param  {Function} callback [点击关闭按钮回调函数]
     */
    loadingShow: function(par, callback) {
        par = par || {};
        par.hasClose = par.hasClose || false;
        par.title = par.title || "";
        callback = callback || function(){};
        var content = '<div class="gu_loading">'+
                        '<div class="loading_main">'+
                            '<div class="circle_bounce">'+
                                '<div class="child circle-1"></div>'+
                                '<div class="child circle-2"></div>'+
                                '<div class="child circle-3"></div>'+
                                '<div class="child circle-4"></div>'+
                                '<div class="child circle-5"></div>'+
                                '<div class="child circle-6"></div>'+
                                '<div class="child circle-7"></div>'+
                                '<div class="child circle-8"></div>'+
                                '<div class="child circle-9"></div>'+
                                '<div class="child circle-10"></div>'+
                                '<div class="child circle-11"></div>'+
                                '<div class="child circle-12"></div>'+
                            '</div>'+
                            '<div class="close">&times;</div>'+
                            '<div class="text">'+par.title+'</div>'+
                        '</div>'+
                    '</div>';
        $("body").append(content);
        if(par.title == ""){
            $(".gu_loading .text").remove();
        }
        if(!par.hasClose){
            $(".gu_loading .close").remove();
        }
        $(".gu_loading .close").click(function(){
            common.loadingHide();
            callback();
        });
    },


    /**
     * [移除loading]
     */
    loadingHide: function(){
        $(".gu_loading").remove();
    },


    /**
     * [checkbox多选框]
     * @param  {Array} data [需要显示的数组内容]
     * @param  {Function} callback [携带当前选中的文本信息，以逗号分隔]
     */
    popupCheckBox: function(data, callback) {
        callback = callback || function () {};
        var checkText01 = '<div class="gu_checkBox"><div class="main"><ul>';
        var checkText03 = '</ul><div class="finish">完成</div></div></div>';
        var checkText02 = "";
        for (var i = 0; i < data.length; i++) {
            checkText02 += '<li>' + data[i] + '</li>';
        }
        var checkText = checkText01 + checkText02 + checkText03;
        
        $("body").append(checkText);
       
        $(".gu_checkBox .main").animate({"top": "50%"}, "fast");

        $(".gu_checkBox li").click(function(){
            $(this).toggleClass("active");
            return false;
        });

        $(".gu_checkBox .finish").click(function(){
            var string = $.map($(".gu_checkBox .active"), function(item, index){
                return $(item).text();
            }).join(",");
            callback(string);
            $(".gu_checkBox").remove();
        });

        $(".gu_checkBox").click(function(){
            $(".gu_checkBox").remove();
        });
    },


    /**
     * [生成一个范围内的随机整数,包括两端的数字]
     * @param  {Number} min [范围最小值]
     * @param  {Number} max [范围内最大值]
     * @return {Number}     [返回随机整数]
     */
    randomNumber: function(min, max){
        return parseInt(Math.random()*(max-min+1)) + min;
    },


    /**
     * [生成4位随机数字验证码]
     * @return {String} [返回随机4位数字的字符串]
     */
    vCode: function(){
        var res = '';
        for(var i=0; i<4; i++){
            res += parseInt(Math.random()*10);
        }
        return res;
    },


    /**
     * [生成一个任意数字的阶乘]
     * @param  {Number} n [任意数字,必填]
     * @return {Number}    [返回一个任意数字的阶乘]
     */
    factorial: function(n){
        var res = 1;
        for(var i=2; i<=n; i++){
            res*=i;
        }
        return res;
    },


    /**
     * [计算所有传入参数的和]
     * @return {Number}     [返回几个数的和]
     */
    sum: function(){
        var res=0;
        for(var i=0; i<arguments.length; i++){
            res +=  arguments[i];
        }
        return res;
    },


    /**
     * [生成随机颜色]
     * @return {String} [返回rgb颜色字符串]
     */
    randomColor: function(){
        var r = parseInt(Math.random()*256);
        var g = parseInt(Math.random()*256);
        var b = parseInt(Math.random()*256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    },


    /**
     * [生成随机颜色]
     * @return {String} [返回十六进制颜色字符串]
     */
    getColor: function(){
        var res = '#';
        var str = '0123456789abcdef';
        for(var i=0; i<6; i++){
            var idx = parseInt(Math.random()*str.length);
            res += str.charAt(idx);
        }
        return res;
    },


    /**
     * [得到日期date的n天后的日期]
     * @param  {Date} date [当前日期]
     * @param  {Number} n [n天时间]
     * @return {String}     [返回日期date的n天后的日期]
     */
    afterDate: function(date, n){
        var day = date.getDate();
        date.setDate(day+n);
        var reg = /\//g;
        return date.toLocaleDateString().replace(reg, '-');
    },


    /**
     * [字符转译，防xss]
     * @param  {string} string [需要转义的字符串]
     * @return {String}     [返回转义后的字符串]
     */
    escapeHtml:function(string){
        if(!string){
            return "";
        };
        var reg = "";
        var entityMap = {
            // "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            // "'": '&#39;',
            // "/": '&#x2F;'
        };
        for(idx in entityMap){
            reg += idx;
        };
        reg = eval("/["+re+"]/g");
        return String(string).replace(reg, function(s){
            return entityMap[s];
        });
    },


    /**
     * [进入全屏]
     * @param  {Object} ele [元素对象]
     */
    FullScreen: function(ele){
        if(ele.requestFullscreen){
            ele.requestFullscreen();
        }else if(ele .mozRequestFullScreen){
            ele.mozRequestFullScreen();
        }else if(ele .webkitRequestFullScreen){
            ele.webkitRequestFullScreen();
        }
    },


    /**
     * [退出全屏]
     * @param  {Object} ele [元素对象]
     */
    exitFullscreen: function(ele){
        if(ele.exitFullscreen){
            ele.exitFullscreen();
        }else if(ele.mozCancelFullScreen){
            ele.mozCancelFullScreen();
        }else if(ele.webkitCancelFullScreen){
            ele.webkitCancelFullScreen();
        }
    },


    /**
     * [预加载图片]
     * @return {Object}     [返回promise对象，调用promise的then方法可以在图片加载成功后执行操作]
     */
    preloadImage: function(path){
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.src = path;
            image.onload  = function(){
                resolve(image);
            }
        });
    },


    /**
     * [数据类型判断]
     * @param  {All}    data [数据类型]
     * @return {String}      [返回数据类型字符串]
     */
    type: function(data){
        return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
    },



    /**
     * [预定义时间格式化]
     * @param  {Date} data [需格式化时间]
     * @param  {string} fmt [定义时间格式，例如："YYYY-MM-DD hh:mm:ss"]
     * @return  {string} fmt [返回时间]
    */
    format: function(data, fmt){
        var o = {
            "M+": data.getMonth() + 1,
            "D+": data.getDate(),
            "h+": data.getHours(),
            "m+": data.getMinutes(),
            "s+": data.getSeconds()
        };
        if(/(Y+)/.test(fmt)){
        	var res = String(data.getFullYear()).substring(4 - RegExp.$1.length);
        	fmt = fmt.replace(RegExp.$1, res);
        }

        for(var str in o){
        	var reg = new RegExp('(' + str + ')');
        	if(reg.test(fmt)){
        		var res = RegExp.$1.length>1 ? ('00' + o[str]).substring(String(o[str]).length) : o[str];
        		fmt = fmt.replace(RegExp.$1, res);
        	}
        }

        return fmt;
    }
}




var Cookie = {
    /**
     * [写入修改cookie]
     * @param {String} name   [cookie名]
     * @param {String} val    [cookie值]
     * @param {[Object]} params [cookie参数]
        * expires {Date} 
        * path    {String}
        * domain  {String}
        * secure  {Boolean}
     */
    set: function(name, val, params){
        // params={expires,path,domain,secure}

        // cookie名与cookie值
        var cookieStr = name + '=' + val;
        params = params || {};
        // 有效期
        if(params.expires){
            cookieStr += ';expires=' + params.expires.toUTCString();
        }
        // 路径
        if(params.path){
            cookieStr += ';path=' + params.path;
        }
        // 域名
        if(params.domain){
            cookieStr += ';domain=' + params.domain;
        }
        // 安全性
        if(params.secure){
            cookieStr += ';secure';
        }
        document.cookie = cookieStr;
    },


    /**
     * [获取cookie]
     * @param  {String} name [description]
     * @return {[type]}      [description]
     */
    get: function(name){
        var cookies = document.cookie;

        // 如果cookie不存在，直接返回空字符串
        if(cookies.length===0){
            return '';
        }

        var res = '';

        cookies = cookies.split('; ');
        for(var i=0; i<cookies.length; i++){
            var arr = cookies[i].split('=');
            if(arr[0] === name){
                res = arr[1];
                break;
            }
        }
        return res;
    },


    /**
     * [删除cookie]
     * @param  {String} name [删除cookie]
     */
    remove: function(name){
        var now = new Date();
        now.setDate(now.getDate()-10);
        // document.cookie = name + '=x;expires=' + now.toUTCString(); 
        this.set(name,'x',{expires:now});
    }
};






var Session = {
    /**
     * [写入session]
     * @param {String} key   [session名]
     * @param {[Object]} object [session值，可写对象]
     */
    saveObject:function(key, object) {
        window.sessionStorage[key] = JSON.stringify(object);
    },


    /**
     * [读取session]
     * @param {String} key   [session名]
     */
    loadObject:function(key) {
        var objectString =  window.sessionStorage[key];
        return objectString == null ? null : JSON.parse(objectString);
    },


    /**
     * [删除session]
     * @param {String} key   [session名]
     */
    deleteObject:function(key) {
        window.sessionStorage.removeItem(key);
    },


    /**
     * [删除全部session]
     */
    clearObject: function()
    {
        try{
            window.sessionStorage.clear();
        }catch(e){
            for (var i in window.sessionStorage){
                window.sessionStorage.removeItem(i);
            }
        }
    }
};






var SessionObj = {
	/**
     * [写入session，如果没有对应key的session则创建，有则添加]
     * @param {String} key   [session名]
     * @param {string} name [需要写入的名]
     * @param {string} value [需要写入的值]
     */
    saveObject: function(key, name, value){
		if("count" == name){return false;}
		var obj = new Object();
		var str = window.sessionStorage[key];
		if(str=="" || str==undefined){str='{"count":0}';}
		obj = JSON.parse(str);
		obj[name] = value;
		var count = 0;
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                count++;
            }
        }
        console.log(obj);
		obj["count"] = count-1;
        window.sessionStorage[key] = JSON.stringify(obj);
    },


	/**
     * [读取session对应key中的name值]
     * @param {String} key   [session名]
     * @param {string} name [需要读取的名]
     */
    loadObject: function(key, name){
		var obj = new Object();
		var str = window.sessionStorage[key];
		if(str=="" || str==undefined){str='{"count":0}';}  //如果对应的session没有找到，下面一句就会报错
		obj = JSON.parse(str);
        return obj[name];
    },


	/**
     * [删除session对应key中的name值]
     * @param {String} key   [session名]
     * @param {string} name [需要读取的名]
     */
    deleteObject: function(key, name){
		if("count"==name){return false;}
        var obj = new Object();
		var str = window.sessionStorage[key];
		if(str=="" || str==undefined){str='{"count":0}';}  //如果对应的session没有找到，下面一句就会报错
		obj = JSON.parse(str);
		delete obj[name];
		var count=0;
		for(var i in obj){
            if(obj.hasOwnProperty(i)){
                count++;
            }
        }
		obj["count"] = count-1;
        window.sessionStorage[key] = JSON.stringify(obj);
    },


	/**
     * [清空session对应key中的值]
     * @param {String} key   [session名]
     */
	clearObject:function(key) {
        var obj = new Object();
		obj = JSON.parse('{"count":0}');
        window.sessionStorage[key] = JSON.stringify(obj);
    }
};







var Local = {
    /**
     * [写入Local]
     * @param {String} key   [Local名]
     * @param {[Object]} object [Local值，可写对象]
     */
    saveObject: function(key, object){
        window.localStorage[key] = JSON.stringify(object);
    },


    /**
     * [读取Local]
     * @param {String} key   [Local名]
     */
    loadObject: function(key){
        var objectString =  window.localStorage[key];
        return objectString == null ? null : JSON.parse(objectString);
    },


    /**
     * [删除Local]
     * @param {String} key   [Local名]
     */
    deleteObject: function(key){
        window.localStorage.removeItem(key);
    },


    /**
     * [删除全部Local]
     */
    clearObject: function(){
        try{
            window.localStorage.clear();
        }catch(e){
            for(var i in window.localStorage){
                window.localStorage.removeItem(i);
            }
        }
    }
};







var LocalObj = {
	/**
     * [写入Local，如果没有对应key的Local则创建，有则添加]
     * @param {String} key   [Local名]
     * @param {string} name [需要写入的名]
     * @param {string} value [需要写入的值]
     */
    saveObject: function(key, name, value){
		if("count"==name){return false;}
		var obj = new Object();
		var str = window.localStorage[key];
		if(str=="" || str==undefined){str='{"count":0}';}
		obj = JSON.parse(str);
		obj[name] = value;
		var count = 0;
		for(var i in obj){
            if(obj.hasOwnProperty(i)){
                count++;
            }
        }
		obj["count"] = count-1;
        window.localStorage[key] = JSON.stringify(obj);
    },

    
	/**
     * [读取Local对应key中的name值]
     * @param {String} key   [Local名]
     * @param {string} name [需要读取的名]
     */
    loadObject: function(key, name){
		var obj = new Object();
		var str = window.localStorage[key];
		if(str=="" || str==undefined){str='{"count":0}';}   //如果对应的Local没有找到，下面一句就会报错
		obj = JSON.parse(str);
        return obj[name];
    },
    
    
    /**
     * [删除Local对应key中的name值]
     * @param {String} key   [Local名]
     * @param {string} name [需要读取的名]
     */
    deleteObject: function(key, name){
		if("count"==name){return false;}
        var obj = new Object();
		var str = window.localStorage[key];
		if(str=="" || str==undefined){ str='{"count":0}';}  //如果对应的session没有找到，下面一句就会报错
		obj = JSON.parse(str);
		delete obj[name];
		var count = 0;
		for(var i in obj){
            if(obj.hasOwnProperty(i)){
                count++;
            }
        }
		obj["count"] = count-1;
        window.localStorage[key] = JSON.stringify(obj);
    },
    
    
    /**
     * [清空Local对应key中的值]
     * @param {String} key   [Local名]
     */
	clearObject: function(key){
        var obj = new Object();
		obj = JSON.parse('{"count":0}');
        window.localStorage[key] = JSON.stringify(obj);
    }
};







var browser = {
    versions: function(){
        var u = navigator.userAgent, app = navigator.appVersion, ua = navigator.userAgent.toLowerCase();
        return { 
            trident: u.indexOf('Trident') > -1, //IE内核 
            presto: u.indexOf('Presto') > -1, //opera内核 
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器 
            iPad: u.indexOf('iPad') > -1, //是否iPad 
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 
            wx: ua.match(/MicroMessenger/i)=="micromessenger" //是否为微信端
        };
    }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


/**
     * [移动端模拟长按事件]
     * @param  {options} object [longTime：多少时间算长按事件，默认是800毫秒
     *                           longFn：长按后的回调函数
     *                           clickFn：单击的回调函数
     *                           endFn：手指离开的回到函数]
*/

$.fn.longPress = function(options){
    options = options || {};
    options.longTime = options.longTime || 800;
    options.longFn = options.longFn || function(){};
    options.clickFn = options.clickFn || function(){};
    options.endFn = options.endFn || function(){};
    var longTimeout = 0,lStatX,lStatY,lendX,lendY,lMoveX,lMoveY;
    var $this = this,$the = $(this);
    for(var i = 0; i < $this.length; i++){
        $this[i].addEventListener("touchstart", function(e){
            lStatX = e.touches[0].pageX;
            lStatY = e.touches[0].pageY;
            var the1 = $(this);
            longTimeout = setTimeout(function(){
                longTimeout = 0;
                options.longFn(the1)
            }, options.longTime);
            // e.preventDefault();
        },false);
        $this[i].addEventListener("touchmove", function(e){
            lendX = e.touches[0].pageX;
            lendY = e.touches[0].pageY;
            lMoveX = lendX - lStatX;
            lMoveY = lendY - lStatY;
            lMoveX = lMoveX < 0 ? -lMoveX : lMoveX;
            lMoveY = lMoveY < 0 ? -lMoveY : lMoveY;
            if(lMoveX > 10 || lMoveY >10){
                clearTimeout(longTimeout);
                longTimeout = 0;
            }
        }, false);
        $this[i].addEventListener("touchend", function(e){
            var the2 = $(this);
            clearTimeout(longTimeout);
            if(longTimeout != 0){
                options.clickFn(the2);
            }else{
                options.endFn(the2);
            }
            return false;
        }, false);
    }
};



// 兼容trim方法
!String.prototype.trim && (String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '');
});


/**
     * [拓展Date原型对象，格式化时间]
     * @param  {options} fmt [定义时间格式，例如："YYYY-MM-DD hh:mm:ss"]
*/
if(!Date.prototype.format){
    Date.prototype.format = function(fmt){
    	var o = {
            "M+": this.getMonth() + 1,
            "D+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds()
        };
        if(/(Y+)/.test(fmt)){
        	var res = String(this.getFullYear()).substring(4 - RegExp.$1.length);
        	fmt = fmt.replace(RegExp.$1, res);
        }

        for(var str in o){
        	var reg = new RegExp('(' + str + ')');
        	if(reg.test(fmt)){
        		var res = RegExp.$1.length>1 ? ('00' + o[str]).substring(String(o[str]).length) : o[str];
        		fmt = fmt.replace(RegExp.$1, res);
        	}
        }

        return fmt;
    }
};



/**
     * [封装ajax]
     * @param  {object} options [默认参数：tyep:get, async:true, jsonpName。
     *                           可传参数：data:{}, success:function(){}]
*/
function Ajax(options){
    var defaults = {
        type:'get',
        async:true,
        jsonpName:'callback'
    }
    var opt = Object.assign({},defaults,options);
    this.init(opt);
}

Ajax.prototype = {
    init(opt){
        opt.type = opt.type.toLowerCase();
        var params = '';
        for(var attr in opt.data){
            params += attr + '=' + opt.data[attr] + '&';
        };
        params = params.slice(0,-1);
        var type = ['get','jsonp'];
        if(type.indexOf(opt.type) >= 0){
            var op = opt.url.indexOf('?') >=0 ? '&':'?';//?,&
            opt.url += op + params;
            params = null;
        }

        // jsonp请求
        if(opt.type === 'jsonp'){
            var callbackName = 'getData' + Date.now();
            var script;
            // 创建全局函数
            window[callbackName] = function(data){
                var res = data;
                try{
                    res = JSON.parse(res);
                }catch(err){
                    try{
                        res = eval('(' + res + ')');
                    }catch(er){
                        res = res;
                    }
                }
                opt.success(res);
                // 请求完成后，删除script标签
                script.parentNode.removeChild(script)
            }
            // 生成script标签
            script = document.createElement('script');
            script.src = opt.url + '&'+opt.jsonpName+'=' + callbackName;
            document.body.appendChild(script);
            return false;
        }

        var xhr = null;
        try{
            xhr = new XMLHttpRequest();
        }catch(error){
            try{
                 // ie低版本浏览有多种异步请求的实现
                 xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(err){
                try{
                    xhr = new new ActiveXObject("Microsoft.XMLHTTP");
                }catch(e){
                    alert('你的浏览器太low，赶紧换电脑');
                }
            }
        }

        var arr_status = [200,304];
        // 处理返回数据
        xhr.onload = function(){
            if(arr_status.indexOf(xhr.status) >= 0){
                var res = xhr.responseText;
                try{
                    res = JSON.parse(res);
                }catch(err){
                    try{
                        res = eval('(' + res + ')');
                    }catch(er){
                        res = res;
                    }
                }

                opt.success(res);
            }
        }

        // 配置参数，建立与服务器连接
        xhr.open(opt.type,opt.url,opt.async);
        // post请求，设置请求头
        if(opt.type === 'post'){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        }
        xhr.send(params);
    }
}

Object.defineProperty(Ajax.prototype, 'constructor', {
    configurable:true,
    value:Ajax
});

function ajax(options){
    return new Ajax(options);
}

ajax.get = function(options){
    options.type = 'get';
    return new Ajax(options);
}
ajax.post = function(options){
    options.type = 'post';
    return new Ajax(options);
}
ajax.jsonp = function(options){
    options.type = 'jsonp';
    return new Ajax(options);
}






