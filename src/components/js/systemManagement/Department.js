import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'Department';
root.components = {}

root.data = {
    selectData: {
        name: '', //机构名称
        leaderId: '', //分管领导id
        categoryId: '', //机构列别id
    },
    // 分管领导
    leaderNameList: [],
    // 机构分类菜单列表
    categoryList: [],
    //表格信息
    tableData: [],

    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
}
root.methods = {
    // 获取 查询 部门数据
    getProcessData(curPage = 1, limit = 10) {
        let that = this;
        let data = that.selectData;
        data.curPage = curPage;
        data.limit = limit;
        that.componentsMoudel.startPost('manage/department/list_all', data, false).then(res => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
        })
    },
    // 获取分管领导列表
    getLeaderNameList() {
        let that = this;
        that.componentsMoudel.startGet('manage/department/getLeaderNameList', false).then(res => {
            that.leaderNameList = res.body.data;
        })
    },
    // 获取机构分类菜单列表
    getCategoryList() {
        let that = this;
        that.componentsMoudel.startGet('manage/department/getCategoryList', false).then(res => {
            that.categoryList = res.body.data;
        })
    },

    // 新增处室
    AddDepartment() {
        this.$router.push({
            path: '/departmentDetails',
            query: {
                index: 0
            }
        })
    },
    //修改
    modifyClick(row) {
        this.$router.push({
            path: '/departmentDetails',
            query: {
                id: row.id,
                index: 2
            }
        })
        this.componentsMoudel.openLocalStorage("departmentDetails");
        this.componentsMoudel.setData("department", row);
    },
    // 查看
    lookClick(row) {
        this.$router.push({
            path: '/departmentDetails',
            query: {
                id: row.id,
                index: 1
            }
        })
        this.componentsMoudel.openLocalStorage("departmentDetails");
        this.componentsMoudel.setData("department", row);
    },

    // 删除
    deleteClick(row) {
        let that = this;
        let data = {
            id: row.id
        }
        this.$confirm("删除后不可恢复，确认删除" + row.name + "室？", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.componentsMoudel.startPost('manage/department/delDep', data, false).then(res => {
                if (res.body.status_code === 100) {
                    that.$message.success('删除部门成功');
                    this.getProcessData(this.currentPage, this.cpage);
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },

    //重置
    resetForm() {
        this.selectData = {
            tableName: '', //表名称
            companyName: '', //企业名称
            startTime: '', //开始时间
            endTime: '', //结束时间
            checkStatus: '2', //状态信息
            fillId: '',
            writeStatus: '',
        }
        this.fileTime = ''
    },
    // 分页
    handleSizeChange(val) {
        this.cpage = val;
        this.getProcessData(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.getProcessData(this.currentPage, this.cpage);
    },
}



root.mounted = function () {
    this.getLeaderNameList();
    this.getCategoryList();
    this.getProcessData();


}
FactoryComponents.initComponent(root);