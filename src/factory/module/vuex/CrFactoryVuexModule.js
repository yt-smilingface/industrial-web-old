
import HttpImplementHandler from "../http/HttpImplementHandler.js";

export default class CrFactoryVuex{
	
	static get instance() {
	    if (!CrFactoryVuex._instance)
	        CrFactoryVuex._instance = new CrFactoryVuex();
	    return CrFactoryVuex._instance;
	}
	
	constructor() {
		this.saveData = {};
		HttpImplementHandler.instance.addFilters(this.httpFilter);
	}
	
	httpFilter(config, url, data){
		
	}
	
	getCacheData(){
		
	}
	
	
}