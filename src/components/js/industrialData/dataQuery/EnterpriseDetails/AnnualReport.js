import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents'

const root = {}
root.components = {}
export default root
root.name = 'AnnualReport';
root.data = {
    AnnualReportData: {},

}
root.methods = {

}

root.mounted = function () {
    this.componentsMoudel.openLocalStorage("anReport");
    this.AnnualReportData = this.componentsMoudel.getData("annualReport");


}
FactoryComponents.initComponent(root);