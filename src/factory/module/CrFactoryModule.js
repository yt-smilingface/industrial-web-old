import VueRouter from 'vue-router'
import CrFactoryHttpModule from './http/CrFactoryHttpModule.js'
export default class CrFactoryModule {
	
	static get instance() {
	    if (!CrFactoryModule._instance)
	        CrFactoryModule._instance = new CrFactoryModule();
	    return CrFactoryModule._instance;
	}

	constructor() {
	    this.httpModule = CrFactoryHttpModule.instance;
	}
	

	configRouter(config){
		let router = new VueRouter({
			routes: config
		});
		this.routerConfig = router;
	}
	
	getHttpRequest(){
		return this.httpModule;
	}
	
	/**
	 * http请求配置
	 * @param {Object} httpConfig
	 */
	configHttp(httpConfig){	
		if(httpConfig.apiConfig){
			this.getHttpRequest().setHttpApiConfig(httpConfig.apiConfig);
		}
		if(httpConfig.initBody !== undefined && httpConfig.initBody !== null && typeof httpConfig.initBody === "function"){
			this.getHttpRequest().getConfig().initBody = httpConfig.initBody;
		}
		if(httpConfig.codeForHandler && httpConfig.codeForHandler.length > 0){
			httpConfig.codeForHandler.forEach((item, index)=>{
				this.getHttpRequest().registerCodeForHandler(item);
			})
		}
		if(httpConfig.loadCallBack){
			this.getHttpRequest().setLoadCallBack(httpConfig.loadCallBack.openLoading, 
			httpConfig.loadCallBack.endLoading);
		}
		this.getHttpRequest().setHttpAccessLibrary(httpConfig.httpAccessFn);
	}
	
	/**
	 * 单独针对urlHandler进行注册
	 * @param {Object} urlMaps
	 */
	regiterHttpHander(urlMaps){
		this.getHttpRequest().regiterHttpHander(urlMaps);
	}
	
}