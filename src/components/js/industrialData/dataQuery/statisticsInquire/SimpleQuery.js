import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'SimpleQuery';
root.data = {
    industrialAddedValue: '', //全局搜索框值
    dataItemName: '', //传参值
    //搜索框值
    //    表格数据
    statisticalData: [],

    //   筛选数据
    options: [{
        value: '全部',
        label: '全部'
    }],
    value: '全部',
    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
    loading: true,

}
root.methods = {
    getItemDateByParam(curPage = 1, limit = 10) {
        let that = this;
        let data = {
            dataItemName: that.dataItemName,
            curPage,
            limit,
        };
        that.componentsMoudel.startPost('dataQuery/getItemDateByParam', data, false).then(res => {
            that.statisticalData = res.body.data;
            that.total = res.body.cum;
            that.loading = false;
        })
    },
    resetForm(formInline) {
        this.$refs[formInline].resetFields();
    },

    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val;
        this.loading = true;
        this.getItemDateByParam(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.loading = true;
        this.getItemDateByParam(this.currentPage, this.cpage);
    },

    //    相关报表
    relatedReports(row) {
        this.$router.push({
            path: '/dataShowList',
            query: {
                row: row,
            }
        });
    },


}

root.mounted = function () {
    this.dataItemName = this.$route.query.dQS;
    this.getItemDateByParam();
}
FactoryComponents.initComponent(root);