# MongoDB配置
- 安装 MongoDB
- 启动数据库服务器
- 在安装目录的 bin 目录下打开命令窗口并执行命令 mongod.exe --dbpath 路径，注意：路径为手动创建的一个全新目录，如：E:\DB\MONGO\db，不要有中文








#### Unhandled promise rejection (rejection id: 2): TypeError: Cannot read property 'db' of undefined （未处理的承诺拒绝（拒绝id:2）：TypeError：不能读取未定义的属性'db'）这种报错是没开启服务





### 对于nodejs开服务，node server,窗口必须一直开着，这时可以安装forever，这时就可以关闭窗口也了
 - 全局安装： npm install -g forever
 - 开始： forever start server.js
 - 结束： forever stop server.js
