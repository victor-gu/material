const express = require("express");
const app = express();
const path = require("path");


const bp = require("body-parser");

const users = require("./users");
const cart = require("./cart");
const frontproducts = require("./frontProducts");
const order = require("./order.js");
const backproducts = require("./backProduct");
const updatefile = require("./updatefile");

// 提供跨域支持
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

// 访问静态资源的代码
app.use(express.static(path.join(path.resolve(__dirname,'../'),'/')));

// express的post需要，任何路由都要经过这里
app.use(bp.urlencoded({extended:false}));



module.exports = {
    start:(_port) => {
        frontproducts.register(app);
        users.register(app);
        backproducts.register(app);
        updatefile.register(app);
        cart.register(app);
        order.register(app);
        // 监听端口
        app.listen(_port || 8080);
    }
}