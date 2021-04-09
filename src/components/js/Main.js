import Vue from 'vue';
import FactoryComponents from '../../factory/components/FactoryComponents.js';
const root = {}
export default root
root.name = 'Main';
root.data = {
	test:{},
}
root.method = {
	// login: function(){
	// 	this.componentsMoudel.startPost(this.componentsMoudel.getData('urls').login, data, true,).then()
	// }
}
root.watch = {
	$route(to,from){
		console.log(to.path);
	}
}
root.mounted = function(){
	
}
FactoryComponents.initComponent(root);