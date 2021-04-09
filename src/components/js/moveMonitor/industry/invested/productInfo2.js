import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
const root = {}
root.components = {

} //调用Echarts
export default root
//工业运行监测-工业投资整体情况
root.name = 'productInfo2';
root.data = {
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

    //获取数据
    that.componentsMoudel.startGet('investment/selectInfo/' + id, data, false).then((res) => {
        that.baseInfo = res.body.data
    })

}

FactoryComponents.initComponent(root);