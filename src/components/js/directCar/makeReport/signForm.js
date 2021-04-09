import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'signForm';
root.components = {}

root.data = {
    newIndex: '',
    isActive: '',
    //表格信息
    tableData: [],
    tableDataTwo: [],

    // 分页数据 表格1
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,

    // 分页数据 表格2
    currentPage2: 1,
    cpage2: 10,
    total2: 0,
}
root.methods = {
    getDepFillPage(curPage = 1, limit = 10) {
        let that = this;
        let data = {
            curPage,
            limit
        }
        that.componentsMoudel.startPost('governmentfill/getDepFillPage', data, false).then(res => {
            that.tableDataTwo = res.body.data;
            that.total2 = res.body.cum;
        })
    },

    handleClick(row) {
        this.$router.push({
            path: '/makeReport/showForm',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                id: row.id
            },
        });
        this.componentsMoudel.openLocalStorage("showForm");
        this.componentsMoudel.setData("signForm", row);
    },
    // 分页1
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
    },
    // 分页2
    handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
        this.cpage2 = val;
        this.getDepFillPage(this.currentPage2, this.cpage2);
    },
    handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.currentPage2 = val;
        this.getDepFillPage(this.currentPage2, this.cpage2);
    },
    //获取常规填报表单

    getNormalForm() {

    },
}


root.mounted = function () {
    this.newIndex = this.$route.query.index;
    this.isActive = this.$route.query.isActive;
    this.getNormalForm();
    this.getDepFillPage();
}
FactoryComponents.initComponent(root);