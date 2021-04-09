import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';
import TabOne from '../../template/moveMonitor/smartReport/SmartReportTabOne.vue'
import TabTwo from '../../template/moveMonitor/smartReport/SmartReportTabTwo.vue'
const root = {}
root.components = {
    TabOne,
    TabTwo,
};
//重点产业运行监测
export default root
root.name = 'SmartReport';

root.data = {
    activeName: '',
    //plank tab页显示标题
    menuIndex: '',
    slotData: [],
    //当前tab页
    thisTab: {},
}

root.methods = {
    // 获取子集
    getMenu() {
        let url = 'monitoring/getMenu/' + this.menuIndex;
        this.componentsMoudel.startGet(url, {}, false).then(res => {
            this.slotData = res.body.data
            for (let index = 0; index < this.slotData.length; index++) {
                let slotDataTwo = {}
                let value = 'value'
                this.slotData[index][value] = this.slotData[index].directoryName;
            }
            this.activeName = String(this.slotData[0].id);
        })

    },

    //tab页切换
    tabChange: function (tab, event) {
        this.thisTab = tab;
    },

}
root.mounted = function () {
    this.menuIndex = this.$route.query.index;
    this.getMenu();
}

FactoryComponents.initComponent(root);