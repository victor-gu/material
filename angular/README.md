# Angular搭建环境

### 全局安装 Angular CLI

- 安装 Angular CLI npm install -g @angular/cli
- 检测 Angular CLI 是否安装成功 ng --version

### 使用 Angular CLI

1. 创建新的项目 ng new [project-name]
2. cd project-name
3. 启动本地服务器ng server，默认端口为 4200 
4.  可配置端口 ng serve --host 0.0.0.0 --port 4201
5.  使用--open（或-o）参数可以自动打开浏览器并访问http://localhost:4200/

## 会在 ./src/app 目录下自动创建
#### 新建 (Class)	ng generate class my-new-class	简写：ng g cl my-new-class
#### 新建组件 (Component)	ng generate component my-new-component	简写：ng g c my-new-component
#### 新建指令 (Directive)	ng generate directive my-new-directive	简写：ng g d my-new-directive
#### 新建枚举 (Enum)	ng generate enum my-new-enum	  简写：ng g e my-new-enum
#### 新建模块 (Module)	ng generate module my-new-module	  简写：ng g m my-new-module
#### 新建管道 (Pipe)	ng generate pipe my-new-pipe	  简写：ng g p my-new-pipe
#### 新建服务 (Service)	ng generate service my-new-service	简写：ng g s my-new-service