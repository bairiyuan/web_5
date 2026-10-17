<template>
  <el-container class="layout">
    <el-header><h1>Quiz 管理后台</h1></el-header>
    <el-container class="body">
      <el-aside width="180px">
        <el-menu router :default-active="$route.path">
          <el-menu-item index="/users"><i class="el-icon-user"></i><span>用户管理</span></el-menu-item>
          <el-menu-item index="/questions"><i class="el-icon-document"></i><span>题目管理</span></el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><keep-alive><router-view /></keep-alive></el-main>
    </el-container>
  </el-container>
</template>


