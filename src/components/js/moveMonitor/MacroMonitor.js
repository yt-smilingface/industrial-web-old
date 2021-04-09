import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';
import LeftMenu from "../../template/menu/LeftMenu.vue";

const root = {}
root.components = {
	LeftMenu
};
export default root
root.name = 'MacroMonitor';
root.data = {
	
}

root.computed = {

}

root.methods = {

}
root.mounted = function() {

}
FactoryComponents.initComponent(root);
