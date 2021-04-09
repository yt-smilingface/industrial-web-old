import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';
import LeftMenu from "../../template/menu/LeftMenu.vue";
const root = {}
root.components = {
	LeftMenu
};
root.props = {
	//当前标题
	titleName: Array,
	//当前tab页
	thisTab: Object,
	//请求数据构建
	requestDataInit: Function,
	//请求数据返回后针对echart数据构建
	responseInit: Function,
};
//重点产业运行监测
export default root
root.name = 'Estate';
FactoryComponents.initComponent(root);