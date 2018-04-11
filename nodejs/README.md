# MongoDB配置

- 安装 MongoDB

#### 启动数据库服务器

- 在安装目录的 bin 目录下打开命令窗口并执行命令 mongod.exe --dbpath 路径，注意：路径为手动创建的一个全新目录，如：E:\DB\MONGO，不要有中文
- 测试：可以在浏览器访问 http://127.0.0.1:27017/ 有内容则表示连接成功，否则看27017端口是否被占用
- 连接：在安装目录的 bin 目录下打开命令窗口并执行命令 mongo.exe

#### MongoDB 配置成服务

###### 由于每次连接启动数据库服务器，每次都要重复第一步操作，配置成服务就可省掉第一步操作

- 在 E:\DB\MONGO（刚刚新建的文件夹） 新建目录文件夹 dblog
- 在 E:\DB\MONGO（刚刚新建的文件夹） 新建 mongod.cfg 的配置文件，类容如下：
<pre>
		systemLog:
	    destination: file
	    path: E:\DB\MONGO\dblog\mongod.log
	    logAppend: true
	storage:
	    journal:
	        enabled: true
	    dbPath: E:\DB\MONGO\db
	net:
	    port: 27017
	此处的path：E:\DB\MONGO\换成新建的目录，后面的东西不要动
	此处的dbPath: E:\DB\MONGO\换成新建的目录，并在下面建一个db文件夹
</pre>
- 在 MongoDB 的安装目录下的 bin 目录打开命令窗口（以管理员权限）执行命令 mongod.exe --config "E:\DB\MONGO\mongod.cfg" --install（E:\DB\MONGO\为新建的目录）
- 配置成功的情况可以在命令窗口（以管理员权限）手动操作该服务
 1. net start MongoDB 开户服务
 2. net stop MongoDB 停止服务
 3. sc delete MongoDB 删除服务
- 配置成功的同时也可以在服务窗口找到对应的服务，服务名为 MongoDB，可设置为自动启动
- 在启动服务的前提下，可以直接在命令窗口输入命令 mongo 便可直接进入 MongoDB 的命令操作窗口，无需要先跳转到 bin 目录


#### Unhandled promise rejection (rejection id: 2): TypeError: Cannot read property 'db' of undefined （未处理的承诺拒绝（拒绝id:2）：TypeError：不能读取未定义的属性'db'）这种报错是没开启服务


### 对于nodejs开服务，node server,窗口必须一直开着，这时可以安装forever，这时就可以关闭窗口也了
 - 全局安装： npm install -g forever
 - 开始： forever start server.js
 - 结束： forever stop server.js
