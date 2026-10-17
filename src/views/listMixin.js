// 两个管理页面共用的查询、分页和删除逻辑。
export default {
  data: () => ({ keyword: '', query: '', page: 1, pageSize: 5, visible: false }),
  computed: {
    filtered() { return this.rows.filter(row => row[this.searchField].toLowerCase().includes(this.query.toLowerCase())) },
    paged() { return this.filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize) }
  },
  methods: {
    search() { this.query = this.keyword.trim(); this.page = 1 },
    reset() { this.keyword = ''; this.search() },
    resize() { this.page = 1 },
    open(row, blank) {
      this.form = row ? JSON.parse(JSON.stringify(row)) : blank
      this.visible = true
      this.$nextTick(() => this.$refs.form.clearValidate())
    },
    saveRow() {
      const index = this.rows.findIndex(row => row.id === this.form.id)
      const row = JSON.parse(JSON.stringify(this.form))
      if (index < 0) { row.id = Math.max(0, ...this.rows.map(item => item.id)) + 1; this.rows.unshift(row) }
      else this.rows.splice(index, 1, row)
      this.visible = false
      this.reset()
      this.$message.success('保存成功')
    },
    async remove(row) {
      try { await this.$confirm('确定删除这条记录吗？删除后无法恢复。', '删除确认', { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' }) }
      catch { return }
      this.rows = this.rows.filter(item => item.id !== row.id)
      this.page = Math.min(this.page, Math.max(1, Math.ceil(this.filtered.length / this.pageSize)))
      this.$message.success('删除成功')
    }
  }
}
