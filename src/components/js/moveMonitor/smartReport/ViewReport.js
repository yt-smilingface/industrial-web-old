import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
const root = {}
root.components = {

};
//重点产业运行监测
export default root
root.name = 'SmartReportTabOne';

root.data = {
    thisId: '',
    tableData: {
        visibilityDep: [],
    },
    richHtml: '',
    queryAgencyData: [],
}

root.methods = {
    selectReport() {
        let that = this;
        that.componentsMoudel.startGet('intelligencereports/selectReport/' + this.thisId, false).then((res) => {
            that.tableData = res.body.data;
            that.tableData.visibilityDep = JSON.parse(res.body.data.visibilityDep)
        })
    },
    // 获取可见责任机构
    queryAgency() {
        let that = this;
        that.componentsMoudel.startPost('governmentfill/queryAgency', false).then((res) => {
            that.queryAgencyData = res.body.data;
        })
    },
    // xiazai 
    attachmentDownload() {
        window.open(
            this.tableData.reportAttachmentUrl + '',
            '_self'
        );
    },
    cancelSubmit() {
        this.$router.go(-1)
    },
}
root.mounted = function () {
    this.thisId = this.$route.query.id;
    this.queryAgency();
    this.selectReport();

}

FactoryComponents.initComponent(root);