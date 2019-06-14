## vscode常用插件及快捷键整理

#### 常用插件：

1. Chinese：中文语言包
2. View In Browser：在浏览器里打开
3. vscode-icons：让vscode资源目录加上图标
4. Auto Rename Tag：修改html标签，自动帮你完成尾部闭合标签的同步修改
5. Auto Close Tag：自动闭合HTML/XML标签
6. cssrem：将px转为rem，在左下角点设置，搜索cssrem，设置对应参数
7. Vetur：vue插件
8. Bracket Pair Colorizer：给括号加上不同的颜色
9. Beautify：格式化代码（在工作目录下建立.jsbeautifyrc文件），代码如下，可以根据自己的需求修改相应参数，格式化代码快捷键：alt + shift + k

        {
            "brace_style": "none,preserve-inline",
            "indent_size": 4,
            "indent_char": " ",
            "jslint_happy": true,
            "unformatted": [""],
            "css": {
                "indent_size": 2
            }
        }
10. Debugger for Chrome：映射vscode上的断点到chrome上：
[详细可以参考我这篇博客](https://blog.csdn.net/guxingsheng/article/details/84203431 "
VSCode配置 Debugger for Chrome插件")
11. GitLens：方便查看git日志，git的重度患者使用
12. Markdown Preview Enhanced：实时预览markdown
13. markdownlint：markdown语法纠错
14. React/Redux/react-router Snippets：React/Redux/react-router语法智能提示
15. settings Sync：同步vscode用户配置,详情：https://www.jianshu.com/p/c10ac793eec0
    * github
        * 登陆github>用户头像 > settings > developers > Personal access tokens > Generate new token
        * 勾选gist
        * 复制access token
    * VSCode上传配置
        * 快捷键 shift+alt+u 或 ctrl+p 输入>sync点击update/updload settings
        * 把之前复制的access token粘贴后回车
        * 成功后复制GITHUB GIST的内容，在需要同步的另一台电脑上使用
    * VSCode下载配置
        * 在需要同步的电脑打开VSCode,安装相同的插件
        * 按快捷键 shift+alt+d 或 ctrl+p 输入>sync点击Download Settings
        * 把GITHUB GIST的内容粘贴然后回车
    * token : 75397d355541e59e018b83a506d5b15ca470ef50
    * GIST ID : f7f4fc26e230f6321f43093ef7bdeb09
16. eslint-plugin-vue：自动修复eslint报错
    * vscode安装eslint，vetur 插件
    * npm install eslint-plugin-vue --save-dev
    * 找到 .eslint.js文件，添加plugins: [ "vue" ]
    * 修改vscode首选项配置
    * 重启vscode
17. minapp：微信小程序标签，属性智能补全（同时支持原生小程序，mpvue，wepy框架）

#### 常用快捷键：

1. 打开命令行 (>)：Ctrl + Shift + P
2. 查找文件窗口：Ctrl + P
3. 删除当前行：Ctrl + Shift + K
4. 显示/隐藏侧边栏：Ctrl + B
5. 搜索变量或者函数：Ctrl + Shift + O
6. 跳转到行数：Ctrl + G
7. 代码行缩进：Ctrl + [ ,  Ctrl + ]
8. 代码格式化：Alt + Shift + F
9. 上下移动一行：Alt + Up , Alt + Down
10. 向上向下复制一行：Alt + Shift + Up ， Alt + Shift +Down
11. 在当前行下面插入一行：Ctrl + Enter
12. 在当前行上面插入一行：Ctrl + Shift + Enter
13. 回退到上一个光标：Ctrl + U
14. 移动到文件末尾：Ctrl + End
15. 移动到文件开头：Ctrl + Hone
16. 移动到行首：Home
17. 移动到行尾：End
18. 同时选中所有匹配：Ctrl + Shift + L
19. 删除光标所在行：Ctrl + Shift + K
20. 移动到定义处：F12（会跳转）
21. 定义处缩略图：Alt + F12（不跳转）
22. 找到所有的引用：Shift + F12
23. 删除光标右侧的所有字： Ctrl + Delete
24. 下一个匹配的也被选中：Ctrl + D
25. 打开一个新窗口：Ctrl + Shift + N
26. 关闭窗口：Ctrl + Shift + W
27. 文件之间切换：Ctrl + Tab
28. 查找：Ctrl + F
29. 查找替换：Ctrl + H
30. 整个文件夹中查找：Ctrl + Shift + F
31. 全屏：F11
32. 放大/缩小：Ctrl +/-
33. 显示资源管理器：Ctrl + Shift + E

34. 显示Git：Ctrl + Shift + G
35. 显示Debug：Ctrl + Shift + D
36. 显示Output：Ctrl + Shift + U

#### 常见操作：
> 刚clone下来的vue项目会有格式只是空两格：文件-->首选项-->设置,搜索tabsize修改设置

> vscode我经常用到的就是这些了，以后还会持续更新...

*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*