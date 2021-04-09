import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'ShowInteract';


root.data = {
    tableData: [], //表格信息

    value1: [],
}
root.methods = {
    //  查看企业详情
    viewEnterprise(id) {
        let that = this;
        that.componentsMoudel.startGet('interaction/viewCompanyDetails/' + id, false).then((res) => {
            let enterpriseData = res.body.data;
            document.documentElement.scrollTop = 0; //跳转回到顶部
            this.$router.push({
                path: '/enterpriseDetails',
                query: {
                    Id: enterpriseData.bbdQyxxId,
                    info: enterpriseData
                }
            })
        });
    },
    //    取消
    cancelAuditOpinion() {
        this.$router.go(-1)
    }

}

root.mounted = function () {
    this.componentsMoudel.openLocalStorage("showInteract");
    this.tableData = this.componentsMoudel.getData("showInteract");
}
FactoryComponents.initComponent(root);