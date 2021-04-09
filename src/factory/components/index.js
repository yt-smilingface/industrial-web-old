import ComponentsMoudel from './ComponentsMoudel.js';
ComponentsMoudel.install = function(Vue){
	Vue.prototype.componentsMoudel = new ComponentsMoudel();
}
export default ComponentsMoudel;