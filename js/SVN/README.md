# SVN的使用

### 服务器安装

### 下载：[https://www.visualsvn.com/downloads/](https://www.visualsvn.com/downloads/)

### 客户端安装

### 下载：[https://tortoisesvn.net/downloads.zh.html](https://tortoisesvn.net/downloads.zh.html)

### 基本操作

1. 迁出（SVN Checkout）：获取远程仓库(服务器)内容（必须在非svn目录中操作）
	- 拿到服务器仓库地址（URL of repository）
	- 获得用户名密码
2. 更新（SVN Update）：同步文件
3. 提交(SVN Commit)：把本地修改提交到服务器
	- 填写关于本次更新的日志（log message），这是必填项，否则commit会失败
	- 每成功提交一次，SVN版本号自动加1

### 其他操作

- 增加文件(Add)
- 检查更新（Check for modifications）
- 删除文件（Delete）
- 撤销更改（Revert）还没有提交时修改了，这个时候就可以撤销修改，撤销后就拿不回来
- 版本回退（Update to revision）这是已经提交了的可以回到以前的版本
- 文件过滤 Settings -> Global -> ignore -> pattern在这里添加要过滤的文件
- 获取历史文件（Show log）
- 重命名文件（Rename）
- settings -> Saved Data -> Clear可以清除账户

### 利用SVN管理代码一天的工作流程

1. 从服务器下载项目组最新代码
2. 然后进行工作，每隔一段时间向服务器自己的分支提交一次代码
3. 下班时间快到了，把自己的代码合并到服务器上，一天的工作完成

### 术语

1. Revision (修订版本)－－文件历史记录中的被开发者提交的变化。一个修订版本就是一个时常变化的项目的 snapshot (瞬态图)
2. Repository (源代码库)－－CVS 存储所有修订版本历史记录的地方。每个项目都有自己的一个确定的源代码库
3. Working copy (工作拷贝)－－开发者对文件作出修改时文件所在的拷贝
4. Check out (检验)－－从源代码库中申请一份工作拷贝。该工作拷贝反映的是取出时项目的瞬时状态。当开发者对拷贝作出修改时，必须运用 commit (提交)和 update (更新) 命令来 “发布”变化和查看其他开发者所作的修改
5. Commit (提交)－－将工作拷贝中的变化输入中央源代码库
6. Log message (日志信息)－－提交修订版本的时候，附带描述变化的注解。通过查阅记录信息，人们可以获得一个当前项目进程的总结
7. Update (更新)－－从源代码库中取出别人的修改数据，将其输入自己的工作拷贝，并显示自己的工作拷贝是否有未提交的修改。注意，不要和 commit (提交)混淆，更新和提交是一对互补的指令。记住： Update 将使工作拷贝和源代码库拷贝保持同步更新。
8. Conflicts (冲突)－－两个开发者对同一个区域所做的改动都提交给主版本时出现的情况，在 CVS 觉察并指出这个冲突后，开发者必须解决该冲突。