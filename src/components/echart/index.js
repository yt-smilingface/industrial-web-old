import EchartsUtils from './EchartsUtils.js';
EchartsUtils.install = function(Vue){
	Vue.prototype.echartsUtils = new EchartsUtils();
}
export default EchartsUtils;