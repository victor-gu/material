/*
	* 封装常用方法
	* 提取公共代码
 */


/**
 * [生成一个范围内的随机整数]
 * @param  {Number} min [范围最小值]
 * @param  {Number} max [范围内最大值]
 * @return {Number}     [返回随机整数]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min;
}


/**
 * [生成4位随机数字验证码]
 * @return {String} [返回随机4位数字的字符串]
 */
function vCode(){
	var res = '';
	for(var i=0;i<4;i++){
		res += parseInt(Math.random()*10);//'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
	}
	return res;
}


/**
 * [生成一个任意数字的阶乘]
 * @param  {Number} n [任意数字]
 * @return {Number}     [返回一个任意数字的阶乘]
 */
function factorial(n){
            var res = 1;
            for(var i=2; i<=n; i++){
                res*=i;
            }
            return res;
        }


/**
 * [生成一个表格]
 * @param  {Number} a [行]
 * @param  {Number} b [列]
 * @return {String}     [返回表格字符串]
 */
function sheet(a, b){
            var html = "<table><tbody>";
            for(i=1; i<=a; i++){
                html += "<tr>"
                for(j=1; j<=b; j++){
                html += "<td>"+i+j+"</td>"
                }
                html += "</tr>"
            }
            return html += "</tbody></table>"
        }



/**
 * [计算所有传入参数的和]
 * @return {Number}     [返回几个数的和]
 */
function sum(){
            var res=0;
            for(var i=0; i<arguments.length; i++){
                res +=  arguments[i];
            }
            return res;
        }


/**
 * [生成随机颜色]
 * @return {String} [返回rgb颜色字符串]
 */
function randomColor(){
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function getColor(){
    var res = '#';
    var str = '0123456789abcdef';
    for(var i=0;i<6;i++){
        var idx = parseInt(Math.random()*str.length);
        res += str.charAt(idx);
    }
    return res;
}


/**
 * [生成数组中的随机一个元素]
 * @param  {Array} arr [数组]
 * @return {String} [随机返回数组中的一个元素]
 */
function getName(arr){
            return arr[parseInt(Math.random()*arr.length)];
        }


/**
 * [格式化时间]
 */
function autoTime(){
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth()+1;
            var day = time.getDate();
            var week = time.getDay();
            var hour = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            var arr = ["天","一","二","三","四","五","六"];
            var hour = hour<10? "0"+hour:hour;
            var minutes = minutes<10? "0"+minutes:minutes;
            var seconds = seconds<10? "0"+seconds:seconds;
            output.innerHTML = year+"年"+month+"月"+day+"日星期"+arr[week]+","+hour+"时"+minutes+"分"+seconds+"秒";
        }


/**
 * [得到日期date的n天后的日期]
 * @param  {Date} date [当前日期]
 * @param  {Number} n [n天时间]
 * @return {String}     [返回日期date的n天后的日期]
 */
function afterDate(date,n){
            var day = date.getDate();
            date.setDate(day+n);
            var reg = /\//g;
            return date.toLocaleDateString().replace(reg, '-');;
        }


/**
 * [倒计时]
 * @param  {Date} end [结束日期]
 * @return {String}     [返回格式化后的时间]
 */
function showTime(end){
            var start = Date.now();

            var offset = (end-start)/1000;

            if(offset<=0){
                clearInterval(timeId);
            }

            seconds = Math.floor(offset)%60;
            minutes = Math.floor(offset/60)%60;
            hour = Math.floor(offset/60/60)%24;
            day = Math.floor(offset/60/60/24);

            seconds = seconds<10 ? "0"+seconds : seconds;
            minutes = minutes<10 ? "0" + minutes : minutes;
            hour = hour<10 ? "0" + hour : hour;
            day = day<10 ? "0" + day : day;

            return  day + "天" + hour + "时" + minutes + "分" + seconds + "秒"; 
        }



var element = {
            /**
             * [获取元素节点]
             * @param  {Node} nodes [传入的节点]
             * @return {Element}   res    [返回元素节点]
             */
            get:function(nodes){
                var res = [];
                for(var i=0;i<nodes.length;i++){
                    if(nodes[i].nodeType == 1){
                        res.push(nodes[i]);
                    }
                }
                return res;
            },

            /**
             * [获取子元素]
             * @param  {element} element [传入的元素]
             * @return {element}   res   [返回元素节点]
             */
            children:function(element1){
                var nodes = element1.childNodes;
                var res = element.get(nodes);
                return res;
            },

            /**
             * [获取下一个元素]
             * @param  {element} element [传入的元素]
             * @return {element}     res    [返回下一个元素]
             */
            next:function(element){
                var res = element.nextSibling;
                while(res.nodeType != 1){
                    res = res.nextSibling;
                }
                return res;
            },

            /**
             * [获取上一个元素]
             * @param  {element} element [传入的元素]
             * @return {element}     res    [返回上一个元素]
             */
            prev:function(element){
                var res = element.previousSibling;
                while(res.nodeType != 1){
                    res = res.previousSibling;
                }
                return res;
            }
        }



/**
 * [获取css样式兼容ie8以下]
 * @param  {element} ele [元素]
 * @param  {attribute} attr [属性名]
 * @return {String}     [返回属性值]
 */
function getCss(ele,attr){
    // 兼容的思路：判断当前浏览器是否支持这个方法
    // 而不是判断当前时什么浏览器
    if(window.getComputedStyle){
        return getComputedStyle(ele)[attr]
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        // 如果以上两个都不支持，则直接返回内联样式
        return ele.style[attr];
    }
}


var Event = {
    /**
     * [绑定事件的方法，兼容所有浏览器]
     * @param  {Element}  ele       [绑定事件的元素]
     * @param  {String}  type      [事件类型]
     * @param  {Function}  handler   [事件处理函数]
     * @param  {Boolean} isCapture [是否捕获]
     */
    bind:function(ele,type,handler,isCapture){
        // W3C标准的事件监听器
        if(ele.addEventListener){
            ele.addEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.attachEvent){
            ele.attachEvent('on'+type,handler)
        }

        // DOM节点绑定方式
        else{
            ele['on' + type] = handler;
        }
    },
    remove(ele,type,handler,isCapture){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handler,isCapture)
        }
        else if(ele.detachEvent){
            ele.detachEvent('on'+type,handler)
        }
        else{
            ele['on' + type] = null;
        }
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
    set:function(name,val,params){
        // params={expires,path,domain,secure}

        // cookie名与cookie值
        var cookieStr = name +'=' + val;

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
    get:function(name){
        var cookies = document.cookie;

        // 如果cookie不存在，直接返回空字符串
        if(cookies.length===0){
            return '';
        }

        var res = '';

        cookies = cookies.split('; ');
        for(var i=0;i<cookies.length;i++){
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
    remove:function(name){
        var now = new Date();
        now.setDate(now.getDate()-10);

        // document.cookie = name + '=x;expires=' + now.toUTCString(); 
        this.set(name,'x',{expires:now});
    }
}

// 需求驱动开发
// Cookie.set('goodslist',JSON.stringify(goodslist),null,'')
// Cookie.set('top','200px')
// now = new Date()
// now.setDate(now.getDate()+7)
// Cookie.set('left','100px',{expires:now,path:'/'})
// Cookie.get('top');//得到top的cookie值
// Cookie.remove('top');




/**
 * [动画函数]
 * @param  {Element} ele    [动画元素]
 * @param  {String} attr   [动画属性]
 * @param  {Number} target [目标值]
 */
/*function animate(ele,attr,target){
    var timername = attr + 'timer';//toptimer,lefttimer
    clearInterval(ele[timername]);
    ele[timername] = setInterval(()=>{
        // 获取当前值
        let current = getComputedStyle(ele)[attr];//'100px,50deg,0.3'

        //提取单位
        let unit = current.match(/[a-z]+$/);//px,deg,null

        // 
        unit = unit ? unit[0] : '';

        // 提取值
        current = parseFloat(current);



        // 计算缓冲速度
        let speed = Math.floor((target-current)/10);//-32->20->10->5.5->0.5

        // 计算top值
        current += speed;

        if(current === target || speed === 0){
            clearInterval(ele[timername]);

            // 重置current值
            current = target;
        }

        ele.style[attr] = current + unit;

    },30);
}*/

function animate(ele,opt,callback){
    // opt= {left:100,top:200,fontSize:40}

    // 属性（动画）数量
    ele.timerLen = 0;

    // 遍历设置定时器（动画）
    for(var attr in opt){
        // 遍历过程设定动画数量
        ele.timerLen++;

        // 匿名函数传递attr
        (function(attr){
            var timername = attr + 'timer';
            var target = opt[attr];

            // 清除同名timer
            clearInterval(ele[timername]);

            ele[timername] = setInterval(function(){
                // 获取当前值
                var current = getCss(ele,attr);//100px,45deg,0.3

                // 提取单位
                var unit = current.match(/[a-z]+$/);//[px],[deg],null

                unit = unit ? unit[0] : '';

                // 提取值
                current = parseFloat(current);

                // 计算缓冲速度
                var speed = (target-current)/10;//-0.5,10,0.2

                // 避免速度变成0

                // 有单位
                speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

                if(attr === 'opacity'){
                    speed = speed<0 ? -0.02 : 0.02;
                }

                current += speed;

                // 当到达目标值时
                if(current === target || speed === 0){
                    clearInterval(ele[timername]);
                    current = target;

                    ele.timerLen--;

                    // 执行回到函数
                    // if(typeof callback === 'function'){
                    //  callback();
                    // }


                    // 动画完成后执行回掉函数
                    if(ele.timerLen === 0){
                        typeof callback === 'function' && callback();
                    }
                }
                ele.style[attr] = current + unit;
            },30);

        })(attr);
    }
}



if(!Object.prototype.type){
    Object.prototype.type = function(){
        return Object.prototype.toString.call(this).slice(8,-1).toLowerCase();//[object Function],[object Null],[object Number]
    }
}
/**
 * [数据类型判断]
 * @param  {All} data [数据类型]
 * @return {String}      [返回数据类型字符串]
 */
function type(data){
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}





/**
 * [格式化日期]
 * @param  {string} string [传入日期模型]
 * @return {string} string [返回格式化后的日期]
 */
if(!Date.prototype.format){
    Date.prototype.format = function(fmt){

        fmt = fmt.toUpperCase();
        
        var o = {
            "M+":this.getMonth()+1,
            "D+":this.getDate(),
            "H+":this.getHours(),
            "M+":this.getMinutes(),
            "S+":this.getSeconds()
        };

        if(/(Y+)/.test(fmt)){
            var res = String(this.getFullYear()).substr(4 - RegExp.$1.length);
            fmt = fmt.replace(RegExp.$1, res);
        }

        for(var str in o){
            var reg = new RegExp("("+str+")");
            if(reg.test(fmt)){
                var res = RegExp.$1.length>1 ? ('00' + o[str]).substr(String(o[str]).length) : o[str];
                fmt = fmt.replace(RegExp.$1, res);
            }
        }
        return fmt;
    }
}




function Ajax(options){
    // 默认值
    var defaults = {
        type:'get',//post,put,delete...,jsonp
        async:true,
        jsonpName:'callback'
    }

    // 扩展参数
    var opt = Object.assign({},defaults,options);

    this.init(opt);
}

Ajax.prototype = {
    init(opt){
        // 处理请求类型大小
        opt.type = opt.type.toLowerCase();

        // opt.data:{pageNo:1,qty:2} => 'pageNo=1&qty=2';
        // 改变参数格式
        var params = '';

        for(var attr in opt.data){
            params += attr + '=' + opt.data[attr] + '&';
        }

        // 去除多余的&
        params = params.slice(0,-1);

        var type = ['get','jsonp'];
        // if(opt.type === 'get' || opt.type === 'jsonp'){
        if(type.indexOf(opt.type) >= 0){
            var op = opt.url.indexOf('?') >=0 ? '&':'?';//?,&
            opt.url += op + params;

            params = null;
        }


        // jsonp请求
        if(opt.type === 'jsonp'){
            var callbackName = 'getData' + Date.now();//getData1213165465432165

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

            return;
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
    },
    format(){

    },
    jsonp(){

    }
}

Object.defineProperty(Ajax.prototype,'constructor',{
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
