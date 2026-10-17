# Quiz 管理后台

Web 课程作业：学习 ElementUI 前端组件框架并完成 Quiz 管理后台。

## 技术与功能

使用 Vue 2、Element UI 2、Vue Router 3 和 Vue CLI 5，采用顶部标题、左侧菜单、右侧内容的常规后台布局。

- 用户管理：用户名查询、分页、添加、编辑、删除；校验用户名重复、密码长度及两次密码一致。
- 题目管理：题干查询、分页、添加、编辑、删除；维护 A/B/C/D 四个选项和正确答案，校验必填项。
- 删除前二次确认，取消编辑不修改原数据，空查询结果显示提示。
- 使用 Container、Menu、Table、Pagination、Dialog、Form、Input、Button、Radio、Message 和 MessageBox 等 Element UI 组件。

本作业为前端模拟管理后台，无需数据库或后端。页面切换保留本次修改，刷新页面恢复初始示例数据。密码仅用于模拟表单操作，不用于实际登录，列表以星号显示。

## 运行

建议使用 Node.js 20 或更高版本。

```bash
npm install
npm run serve
```

打开终端输出的本地地址（默认 http://localhost:8080）。

```bash
npm run build
```

构建结果位于 `dist/`，可部署到静态服务器。路由使用 hash 模式。

## 目录

```text
public/index.html         HTML 入口
src/main.js              注册 Vue 和 Element UI
src/App.vue              后台布局
src/router/index.js      页面路由
src/views/Users.vue       用户管理
src/views/Questions.vue   题目管理
src/views/listMixin.js    查询、分页与增删改的共用逻辑
```

