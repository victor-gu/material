## Git
> Git是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理

#### 安装与配置

* 配置个人信息（名字与邮箱）使用Git的第一件事就是设置你的名字和email,这些就是你在提交commit时的签名

        git config --global user.name "Your Name"
        git config --global user.email "email@example.com"
        查看是否配置成功，用命名git config -l

#### git的使用

1. 创建本地仓库
    * git init：把当前目录变成一个git仓库，并自动创建master分支
    * Git有三大区：工作区、暂存区、版本库
        * 工作区（Working Directory）：电脑中的目录
        * 仓库：工作区有一个隐藏目录.git，这个不算工作区，而是Git仓库。
        * 暂存区（stage/index）：一个临时的存储区域
        * 版本库 （Repository）

2. 添加文件到版本库
    1. 添加到暂存区：git add \<file\>
        * git add 文件夹：把文件夹下的所有修改添加到暂存区
        * git add .：添加所有修改到暂存区
    2. 提交到版本库：git commit -m "备注"
        * 如果不写-m回车会进入vim编辑界面，退出方法：
        * 退出编辑状态：ESC,同时按下Shift和冒号（:），接着输入输入：q（退出不保存），wq（保存并退出）
    3. 其他辅助命令：
        * 查看仓库变更状态：git status
        * 用status查看仓库会有几种状态：untracked、 unstaged、uncommitted 
            * 绿色的全部在暂存区， uncommitted
            * 红色的可能在暂存区或者在版本库
                * unstaged:以前添加到过版本库，但文件有修改
                * untracked：从来没有添加到过版本库
        * 查看日志：git log

3. git远程仓库
    1. 关联本地仓库与远程仓库
        * 创建SSH Key：`ssh-keygen -t rsa -C 'email地址'`, 将在c盘admin下创建.ssh文件夹
        * 添加SSH Key到Git服务器：打开id_rsa.pub文件夹，将里面的代码复制到远程仓库的setting的ssh&GPG keys下，此时电脑和账户已经关联了起来
        * 测试线路是否连通：ssh -T git@github.com
    2. 建立本地仓库与远程仓库的连接
        1. 适用于先有本地仓库，后有远程仓库的情况
            * 格式：git remote add 远程仓库名 远程仓库地址
            * 输入git remote，如果有出现远程仓库名则连接成功，或者git remote -v详细的
            * 删除远程仓库连接：git remote remove 远程仓库名
        2. 克隆（适用于先有远程库，后有本地仓库的情况）（推荐使用）
            * 格式：git clone 远程仓库地址
            * 当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin

4. 推送到远程仓库
* 格式：git push 远程仓库名 本地分支名:远程分支名
* 把本地分支内容推送到远程分支（远程分支名省略表示推送到与本地分支相同的分支）
* （做push之前先pull以下）如果远程有更新，pull可能会出错，这时执行git pull origin master --allow-unrelated-histories

5. 拉取与合并
* 格式：git pull 远程仓库名 远程分支名:本地分支名
* 拉取远程分支内容到本地并与本地分支进行合并（本地分支名省略表示合并到与远程分支名相同的分支）
> 当出现“MERGING”时则是文件有冲突，可以用git status查看， 解决冲突是打开删除掉

6. git过滤配置
> 一般来说每个Git项目中都需要一个“.gitignore”文件，这个文件的作用就是告诉Git哪些文件不需要添加到版本管理中

* \#过滤dist根目录下的文件（不过滤其他目录下的dist文件夹）/dist
* \#过滤所有mtk文件夹 mtk/
* \#过滤所有.zip文件 *.zip
* \#过滤某个具体文件 /mtk/do.c
* \#为注释

7. 版本回退
> 回退前一定commit，commit后会出现在git reflog里面

* 回退到上一个版本：`git reset --hard HEAD^`
    * 当前版本：HEAD
    * 上一个版本：HEAD^
    * 上上个版本：HEAD^^
    * 前100个版本：HEAD~100
* 回退到指定版本：`git reset --hard [commit id]`,版本号可以不写全，Git会自动去找，查看日志：`git log`
* 回退指定文件：`git reset --hard [commit id] <file>`
* 显示从最近到最远的提交日志：git log
    * –pretty=oneline（显示简要信息id+备注）
    * –graph（图形显示版本走向）
    * –abbrev-commit（显示简写的id）
    * 一大串类似3628164…882e1e0的是commit id（版本号）
* 查看命令历史：git reflog
* 撤销文件修改
    * git checkout -- \<file\>：放弃工作区的修改
    * git rm --cache \<file\>：撤销暂存区的修改
    * git reset HEAD \<file\>：撤销暂存区的修改
* 对比文件：git diff \<file\>

8. 分支操作
* 创建分支：`git branch 分支名`
* 切换分支：`git checkout 分支名`
    > 以上两步合并为：`git checkout -b 分支名`
* 查看分支：`git branch`
* 合并分支：git merge 分支名
    * `git merge dev`：把dev分支合并到当前分支
    * `Fast-forward`：快速合并
    禁用快速合并： –no-ff （保持分支信息）
        > 合并要创建一个新的commit，所以加上-m参数，把commit描述写进去
* 删除分支：`git branch -d 分支名`
    > 强行删除，需要使用命令`git branch -D feature-vulcan`
* 获取远程分支
    * 先获取（git fetch）
    * 然后在本地创建一个同名分支,并将远程分支映射到此分支（git branch dev origin/dev）

###### 然后在本地创建一个同名分支,并将远程分支映射到此分支（git branch dev origin/dev）

* 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

* 那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

* 你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*


