import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
const root = {}
root.components = {

};
//重点产业运行监测
export default root
root.name = 'SmartReportTabTwo';

root.data = {
    basicDatabaseValue: {
        reportName: '',
        reportType: null,
        responsibilityInstitutions: '',
    },
    responsibilityInstitutionsTwo: 0,
    basicOption0: [{
        value: 0,
        label: '一次'
    }, {
        value: 1,
        label: '月报'
    }, {
        value: 2,
        label: '季报'
    }, {
        value: 3,
        label: '年报'
    }, {
        value: null,
        label: '全部'
    }],
    organListOption: [],
    tableData: [],


    pageSize: [10, 12, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
}

root.methods = {
    // 查询数据
    queryClick(curPage = 1, limit = 10) {
        let that = this;
        let data = {
            reportName: that.basicDatabaseValue.reportName,
            reportType: that.basicDatabaseValue.reportType,
            responsibilityInstitutions: that.basicDatabaseValue.responsibilityInstitutions,
            curPage,
            limit
        }
        that.componentsMoudel.startPost('intelligencereports/queryPageData', data, true).then((res) => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
        })
    },
    // 责任机构
    getOrganList() {
        let that = this;
        that.componentsMoudel.startGet('intelligencereports/getOrganList', false).then((res) => {
            that.organListOption = res.body.data;
            // that.basicDatabaseValue.responsibilityInstitutions = res.body.data[0].id;
            // that.responsibilityInstitutionsTwo = res.body.data[0].id;
        })
    },
    // 修改
    editingReports(row) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/editingReports',
            query: {
                id: row.id,
            }
        })
    },
    // 新增
    addReports(row) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/editingReports',
            query: {
                id: 0,
            }
        })
    },
    // 查看
    handleClick(row) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/viewReport',
            query: {
                id: row.id,
            }
        })
    },
    // 修改发布状态
    reportRelease(row) {
        let that = this;
        let id = row.id;
        let state = row.state === 0 ? state = 1 : state = 0;
        console.log(state);
        that.componentsMoudel.startGet('intelligencereports/updateReleaseStatus/' + id + '/' + state, true).then((res) => {
            if (res.body.status_code === 100) {
                that.$message.success('修改成功');
                that.queryClick(this.currentPage, this.cpage);
            } else {
                that.$message.error("修改失败");
            }
        })
    },
    // 删除报告
    deleteReport(row) {
        let that = this;
        let data = {};
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.componentsMoudel.startDel('intelligencereports/deleteReport/' + row.id, data, true).then((res) => {
                that.$message.success('删除成功');
                that.queryClick();
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });

    },

    // 重置
    resetForm() {
        this.basicDatabaseValue = {
            reportName: '',
            reportType: null,
            responsibilityInstitutions: '',
        }
    },
    //分页22
    handleSizeChange(val) {
        this.cpage = val;
        this.queryClick(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.queryClick(this.currentPage, this.cpage);
    },
}
root.mounted = function () {
    this.getOrganList();
    this.queryClick();

}

FactoryComponents.initComponent(root);