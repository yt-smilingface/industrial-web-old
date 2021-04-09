export default class HttpImplementHandler {

	static get instance() {
		if (!HttpImplementHandler._instance)
			HttpImplementHandler._instance = new HttpImplementHandler();
		return HttpImplementHandler._instance;
	}

	constructor() {
		this.filters = [];
	}
	
	//添加请求前过滤器，此过滤器本质不能做任何事情，是能针对请求访问进行监听
	addFilters(filter){
		if(filter && typeof filter === "function"){
			this.filters.push(filter);
		}
	}

	openHttpAccess(config, url, data, success, error) {
		if (this.fn) {
			this.filters.forEach((item, index)=>{
				item(config, url, data);
			})
			this.fn(config, url, data, success, error);
		} else {
			console.error("未配置http访问库");
		}
	}

	registerHttpAccessFn(fn) {
		if (fn && typeof fn === "function") {
			this.fn = fn;
		}

	}

}
