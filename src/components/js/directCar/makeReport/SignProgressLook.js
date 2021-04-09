import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'signProgressLook';
root.components = {}

root.data = {
    selectData: {
        tableId: '',
        companyName: '', //企业名称
        checkStatus: '', //状态信息
    },
    options: [{
        value: null,
        label: '全部'
    }, {
        value: '0',
        label: '待填报'
    }, {
        value: '1',
        label: '已填报'
    }],
    // 表格信息
    tableData: [],

    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
}
root.methods = {
    handleUrl(id){
        console.log(id);
        this.$router.push('signAndHand?index=13&isActive=0&id='+id);
    },
    // 获取 查询 填报数据
    getProcessData(curPage = 1, limit = 10) {
        console.log(111111111);
        let that = this;
        let data = that.selectData;
        data.relatedGmtCreate=this.$route.query.relatedGmtCreate;
        data.curPage = curPage;
        data.limit = limit;
        that.componentsMoudel.startPost('governmentfill/getProcessData', data, false).then(res => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
            // that.tableData.forEach((item, index) => {
            //     that.tableData[index].contentJson = JSON.parse(item.contentJson);
            // })

        })
    },
    resetForm() {
        this.selectData = {
            tableId: '',
            companyName: '', //企业名称
            checkStatus: '', //状态信息
        }
    },
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val;
        this.getProcessData(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getProcessData(this.currentPage, this.cpage);
    },

}

root.mounted = function () {
    let {relatedGmtCreate,id} = this.$route.query;
     this.selectData.relatedGmtCreate=relatedGmtCreate;
    this.selectData.tableId = id;
    this.getProcessData();

}
FactoryComponents.initComponent(root);