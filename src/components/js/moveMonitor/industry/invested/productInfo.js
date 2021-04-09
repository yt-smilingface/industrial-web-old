import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
const root = {}
root.components = {

} //调用Echarts
export default root
//工业运行监测-工业投资整体情况
root.name = 'productInfo';
root.data = {
    // baseInfo: [{
    //         name: '专项名称',
    //         info: "2020年重点复工项目补助",
    //         span: 8
    //     },
    //     {
    //         name: '企业名称',
    //         info: "云南鑫耀半导体材料有限公司",
    //         span: 8

    //     },
    //     {
    //         name: '企业所在地',
    //         info: "昆明市",
    //         span: 8

    //     },
    //     {
    //         name: '申报方向',
    //         info: "重大工业项目",
    //         span: 8

    //     },
    //     {
    //         name: '企业统一信用代码',
    //         info: "915301000776173000",
    //         span: 8

    //     },
    //     {
    //         name: '所属行业',
    //         info: "计算机、通信和其他电子设备制造业",
    //         span: 8

    //     },
    //     {
    //         name: '所属行业',
    //         info: "计算机、通信和其他电子设备制造业",
    //         span: 12

    //     },
    //     {
    //         name: '所属行业',
    //         info: "计算机、通信和其他电子设备制造业",
    //         span: 12

    //     },
    // ],
    baseInfo: {},

}

root.methods = {
    //点击了下载按钮
    clickDownload: function (data, refPlank) {

    },
    //plank右上角状态切换
    checkoutChange: function (status, data, refPlank) {

    },

}

root.mounted = function () {
    let that = this;
    let id = this.$route.query.id;
    let data = {};
    console.log(11);

    //获取数据
    that.componentsMoudel.startGet('specificFund/selectDetails/' + id, data, false).then((res) => {
        that.baseInfo = res.body.data
    })
    
}

FactoryComponents.initComponent(root);