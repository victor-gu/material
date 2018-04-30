### git的使用

1. 配置个人信息（名字与邮箱）使用Git的第一件事就是设置你的名字和email,这些就是你在提交commit时的签名
	- git config --global user.name "Your Name"
	- git config --global user.email "email@example.com"
	- 查看是否配置成功，用命名git config -l

2. 创建本地仓库：git init：把当前目录变成一个git仓库，并自动创建master分支
	- 工作区（Working Directory）：电脑中的目录
	- 仓库：工作区有一个隐藏目录.git，这个不算工作区，而是Git仓库。
	- 暂存区（stage/index）：一个临时的存储区域
	- 版本库 （Repository）

3. 添加文件到版本库

	- 添加到暂存区：git add file
		- git add 文件夹：把文件夹下的所有修改添加到暂存区
		- git add .：添加所有修改到暂存区
	- 提交到版本库：git commit -m "备注"
		- 如果不写-m回车会进入vim编辑界面，退出方法：
		- 退出编辑状态：ESC
		- 同时按下Shift和冒号（:），接着输入输入：q（退出不保存），wq（保存并退出）
	- 其他辅助命令：
		- 查看仓库变更状态：git status
		- 用status查看仓库会有几种状态：untracked、unstaged、uncommitted 
		- 绿色的全部在暂存区， uncommitted
		- 红色的可能在暂存区或者在版本库
		- unstaged:以前添加到过版本库，但文件有修改
		- untracked：从来没有添加到过版本库
	
4. 关联本地仓库与远程仓库

	- 创建SSH Key：ssh-keygen -t rsa -C 'email地址'，将在c盘admin下创建.ssh文件夹
	- 添加SSH Key到Git服务器 ：用编辑器打开id_rsa.pub文件夹，将里面的代码复制到远程仓库的setting的ssh和gpg密钥下，此时电脑和账户已经关联了起来，测试线路是否连通：ssh -T git@github.com
	- 建立本地仓库与远程仓库的连接
		- 方式1：适用于先有本地仓库，后有远程仓库的情况
		- 格式：git remote add 远程仓库名 远程仓库地址
		- 输入git remote，如果有出现远程仓库名则连接成功，或者git remote -v 详细的
		- 删除远程仓库连接：git remote remove 远程仓库名
		- 方式2：克隆（适用于先有远程库，后有本地仓库的情况）
		- 格式：git clone 远程仓库地址
		- 当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin

5. 推送到远程仓库

	- 格式：git push 远程仓库名 本地分支名:远程分支名
	- 把本地分支内容推送到远程分支（远程分支名省略表示推送到与本地分支相同的分支）
	- （做push之前先pull以下）如果远程有更新，pull可能会出错，这时执行git pull origin master --allow-unrelated-histories

6. 拉取与合并

	- 格式：git pull 远程仓库名 远程分支名:本地分支名
	- 拉取远程分支内容到本地并与本地分支进行合并（本地分支名省略表示合并到与远程分支名相同的分支）
	- 当出现“MERGING”时则是文件有冲突，可以用git status查看， 解决冲突是打开删除掉

7. git过滤配置

	- #过滤dist根目录下的文件（不过滤其他目录下的dist文件夹）/dist 
	- #过滤所有mtk文件夹 mtk/ 
	- #过滤所有.zip文件 *.zip 
	- #过滤某个具体文件 /mtk/do.c 
	- #为注释
	- 过滤了太大的插件后，由于要让别人知道你装了什么插件，要有一个package.json文件，可以在该页面打开cmd命令，输入npm init按照步骤自动生成package.json文件，如果还要继续安装插件（npm install gulp-rename --save）在后面加上--save会自动在package.json文件中添加，有了此文件，别人clone下来直接在cmd中输入npm install 就可以下载所有有的插件

8. 版本回退

	- 回退到上一个版本： git reset --hard HEAD^
	- 回退到指定版本：git reset --hard [commit id] 版本号没必要写全，前几位就可以了，Git会自动去找
	- 回退指定文件：git reset --hard [commit id] <file>
	- 当前版本：HEAD
	- 上一个版本：HEAD^
	- 上上个版本：HEAD^^
	- 显示从最近到最远的提交日志：git log
		- –pretty=oneline（显示简要信息id+备注）
		- –graph（图形显示版本走向）
		- –abbrev-commit（显示简写的id）
		- 一大串类似3628164…882e1e0的是commit id（版本号）
	- 查看命令历史：git reflog
	- 撤销文件修改
		- git checkout -- <file>：放弃工作区的修改
		- git rm --cache <file>：撤销暂存区的修改
		- git reset HEAD <file>：撤销暂存区的修改
	- 对比文件：git diff <file>

9. 分支操作

	- 创建分支：git branch 分支名
	- git branch 查看有哪些分支，带星号的是当前分支
	- 切换分支：git checkout 分支名
		- 以上两步合并为：git checkout -b 分支名