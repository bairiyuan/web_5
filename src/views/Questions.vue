<template>
  <section>
    <h2>题目管理</h2>
    <div class="toolbar">
      <el-input v-model="keyword" placeholder="请输入题目关键词" aria-label="题目关键词查询" clearable @clear="search" @keyup.enter.native="search" />
      <el-button type="primary" @click="search">查询题目</el-button><el-button @click="reset">重置</el-button>
      <el-button type="success" @click="edit()">添加题目</el-button>
    </div>
    <el-table :data="paged" border stripe empty-text="暂无符合条件的题目">
      <el-table-column prop="id" label="编号" width="70" />
      <el-table-column prop="question" label="问题" min-width="200" />
      <el-table-column label="选项" min-width="190"><template slot-scope="scope"><div v-for="key in letters" :key="key" class="options">{{ key }}. {{ scope.row['option' + key] }}</div></template></el-table-column>
      <el-table-column prop="answer" label="答案" width="70" />
      <el-table-column label="操作" width="170"><template slot-scope="scope"><el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button><el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button></template></el-table-column>
    </el-table>
    <el-pagination background :current-page.sync="page" :page-size.sync="pageSize" :page-sizes="[5, 10, 20]" :total="filtered.length" layout="total, sizes, prev, pager, next" @size-change="resize" />
    <el-dialog :title="form.id ? '编辑题目' : '添加题目'" :visible.sync="visible" :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="90px" @submit.native.prevent="save">
        <el-form-item label="问题内容" prop="question" :rules="required('请输入问题内容')"><el-input v-model.trim="form.question" type="textarea" :rows="3" maxlength="500" /></el-form-item>
        <el-form-item v-for="key in letters" :key="key" :label="'选项 ' + key" :prop="'option' + key" :rules="required('请输入选项 ' + key)"><el-input v-model.trim="form['option' + key]" maxlength="200" /></el-form-item>
        <el-form-item label="正确答案" prop="answer" :rules="required('请选择正确答案')"><el-radio-group v-model="form.answer"><el-radio v-for="key in letters" :key="key" :label="key">{{ key }}</el-radio></el-radio-group></el-form-item>
      </el-form>
      <span slot="footer"><el-button @click="visible = false">取消</el-button><el-button type="primary" @click="save">确定</el-button></span>
    </el-dialog>
  </section>
</template>
<script>
import listMixin from './listMixin'
export default {
  name: 'QuestionManage', mixins: [listMixin],
  data: () => ({
    searchField: 'question', letters: ['A', 'B', 'C', 'D'], form: {},
    rows: [
      { id: 1, question: 'HTML 中用于定义超链接的标签是？', optionA: '<a>', optionB: '<p>', optionC: '<div>', optionD: '<span>', answer: 'A' },
      { id: 2, question: 'CSS 中设置文字颜色的属性是？', optionA: 'width', optionB: 'color', optionC: 'margin', optionD: 'display', answer: 'B' },
      { id: 3, question: 'Vue 中用于双向数据绑定的指令是？', optionA: 'v-if', optionB: 'v-for', optionC: 'v-model', optionD: 'v-show', answer: 'C' },
      { id: 4, question: 'Element UI 的表格组件是？', optionA: 'el-input', optionB: 'el-menu', optionC: 'el-form', optionD: 'el-table', answer: 'D' },
      { id: 5, question: 'JavaScript 中声明常量使用哪个关键字？', optionA: 'const', optionB: 'var', optionC: 'let', optionD: 'return', answer: 'A' },
      { id: 6, question: 'Vue 中用于列表渲染的指令是？', optionA: 'v-bind', optionB: 'v-for', optionC: 'v-on', optionD: 'v-if', answer: 'B' }
    ]
  }),
  methods: {
    required(message) { return [{ required: true, whitespace: true, message, trigger: 'blur' }] },
    edit(row) { this.open(row, { question: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '' }) },
    save() { this.$refs.form.validate(valid => { if (valid) this.saveRow() }) }
  }
}
</script>
