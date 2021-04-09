import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'showForm';
root.components = {}

root.data = {
  tableData: [], //表格信息


}
root.methods = {

    getupdateFill() {
      let that = this;
      this.componentsMoudel.openLocalStorage("showForm");
      that.tableData = this.componentsMoudel.getData("signForm");
      that.tableData.contentJson = JSON.parse(that.tableData.contentJson);
    },



  },



  root.mounted = function () {
    this.getupdateFill()
    //   this.componentsMoudel.openLocalStorage("showForm");
    //       let row = this.componentsMoudel.getData("signForm");

  }
FactoryComponents.initComponent(root);