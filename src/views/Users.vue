<template>
  <section>
    <h2>用户管理</h2>
    <div class="toolbar">
      <el-input v-model="keyword" placeholder="请输入用户名" aria-label="用户名查询" clearable @clear="search" @keyup.enter.native="search" />
      <el-button type="primary" @click="search">查询用户</el-button><el-button @click="reset">重置</el-button>
      <el-button type="success" @click="edit()">添加用户</el-button>
    </div>
    <el-table :data="paged" border stripe empty-text="暂无符合条件的用户">
      <el-table-column prop="id" label="编号" width="70" />
      <el-table-column prop="date" label="日期" min-width="120" />
      <el-table-column prop="username" label="用户名" min-width="140" />
      <el-table-column label="密码" min-width="100"><template>******</template></el-table-column>
      <el-table-column label="操作" width="170"><template slot-scope="scope"><el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button><el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button></template></el-table-column>
    </el-table>
    <el-pagination background :current-page.sync="page" :page-size.sync="pageSize" :page-sizes="[5, 10, 20]" :total="filtered.length" layout="total, sizes, prev, pager, next" @size-change="resize" />
    <el-dialog :title="form.id ? '编辑用户' : '添加用户'" :visible.sync="visible" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px" @submit.native.prevent="save">
        <el-form-item label="用户名" prop="username"><el-input v-model.trim="form.username" maxlength="30" /></el-form-item>
        <el-form-item label="密码" prop="password"><el-input v-model="form.password" show-password maxlength="64" /></el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword"><el-input v-model="form.confirmPassword" show-password maxlength="64" /></el-form-item>
      </el-form>
      <span slot="footer"><el-button @click="visible = false">取消</el-button><el-button type="primary" @click="save">确定</el-button></span>
    </el-dialog>
  </section>
</template>
<script>
import listMixin from './listMixin'
export default {
  name: 'UserManage', mixins: [listMixin],
  data() {
    return {
      searchField: 'username', form: {},
      rows: ['张三', '李四', '王五', '赵六', '陈七', '刘八'].map((username, i) => ({ id: i + 1, username, date: '2026-10-17', password: '123456' })),
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: (rule, value, callback) => callback(this.rows.some(row => row.id !== this.form.id && row.username.toLowerCase() === value.toLowerCase()) ? new Error('用户名已存在') : undefined), trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码至少为 6 位', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }, { validator: (rule, value, callback) => callback(value !== this.form.password ? new Error('两次密码不一致') : undefined), trigger: 'blur' }]
      }
    }
  },
  methods: {
    edit(row) { this.open(row ? { ...row, confirmPassword: row.password } : null, { username: '', password: '', confirmPassword: '', date: new Date().toLocaleDateString('sv-SE') }) },
    save() { this.$refs.form.validate(valid => { if (valid) this.saveRow() }) }
  }
}
</script>
