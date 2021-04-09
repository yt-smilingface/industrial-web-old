import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';

import TitleMonitor from '../../../template/moveMonitor/title/TitleMonitor.vue';
import ECharts from 'vue-echarts';
// import DataCoverUtils from '../DataCoverUtils.js';
import DataCoverUtils from './CenterDataCoverUtils';

const root = {}
root.components = {
    ECharts,
}
root.props = {
    //当前标题
    titleName: Array,
    //当前tab页
    thisData: Object,
    //请求数据构建
    requestDataInit: Function,
    //请求数据返回后针对echart数据构建
    responseInit: Function,
};
//变化趋势
export default root
root.name = 'centerChangeTrend';
root.data = {
    //tab名称
    thisName: '变化趋势',

    //变化趋势图表
    echartsData: {
        echartsTrendData: {},
    },
    //当前选择的指标
    thisMonitoringData: {
        optionData:[
            {dataItem: "地区生产总值累计值(亿元)",
                id: 157,
                option: { 157: "地区生产总值累计值(亿元)", 158: "地区生产总值指数(上年同期=100)累计值(%)", }
            }
        ],

    },

}
root.methods = {
    //获取变化趋势数据
    getChangeTrend: function(data) {
        // const dataOption = {};
        // dataOption.index = this.thisData.index;
        // dataOption.tabType = this.thisData.tabType;
        // this.componentsMoudel.startPost('/estate/getDropDownData', dataOption, false).then((res)=>{
        //     this.thisMonitoringData.optionData.dataItem = res.body.data[0].dataItem
        //     this.thisMonitoringData.optionData.id = res.body.data[0].id
        //     for(let i = 0; i<res.body.data.length; i++){
        //
        //     }
        // });

        // this.thisMonitoringData.optionData[0].option = res.body.
        console.log(this.thisMonitoringData.optionData.option)
        // console.log(this.titleName)
        // console.log(data)
        // console.log(this.thisMonitoringData.optionData[0].id)
        if (this.thisMonitoringData.optionData[0].id) {
            const that = this;
            this.$refs.eCharts.clear();
            console.log(this.titleName[0].url[0])
            this.componentsMoudel.startPost(this.titleName[0].url[0], data, false).then((res)=>{
                console.log(res.body.data);
                let echartsDataInit = {};
                let option = [];
                //判断是否存在两个指标，如果存在，则echart的采用第二个指标
                if(that.thisMonitoringData.optionData[1]){
                    option = that.thisMonitoringData.optionData[1].option;
                }else{
                    option = that.thisMonitoringData.optionData[0].option;
                }
                if(that.responseInit){
                    echartsDataInit = that.responseInit(res.body.data, option);
                    that.echartsData.echartsTrendData = that.echartsUtils.getInitOption("1", echartsDataInit);
                }else{
                    echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    that.echartsData.echartsTrendData = that.echartsUtils.getInitOption("1", echartsDataInit);
                    console.log(that.echartsData.echartsTrendData)
                }
            });

        }
    },

}
root.mounted = function() {
        this.getChangeTrend(this.thisData);

}
root.watch = {
    thisTab: function(newThisTab, oldThisTab) {
        if (newThisTab.itemData.value === this.thisName) {
            // this.getChangeTrend();
        }
    }
}

FactoryComponents.initComponent(root);
