import axios from "axios";
import CrPromise from "../../utils/CrPromise.js";
import HttpImplementHandler from "./HttpImplementHandler.js";
export default class CrFactoryHttpModule {

	static get instance() {
		if (!CrFactoryHttpModule._instance)
			CrFactoryHttpModule._instance = new CrFactoryHttpModule();
		return CrFactoryHttpModule._instance;
	}

	constructor() {
		this.httpConfig = {};
		this.httpOnceConfig = undefined;
		this.httpConfig.apiConfig = {
			method: 'GET',
			header: {
				'Content-Type': 'application/json'
			},
			cookies: false,
			mainUrl: ''
		};
		//针对body数据进行全局处理
		this.httpConfig.initBody = function (res) {
			return {
				result: 'success',
				code: res.status,
				body: res
			};
		};
		//相应错误返回的处理
		this.httpConfig.codeForHandler = {
			"404": function (res) {
				console.log('404')
			},
			"400": function (res) {
				console.log('400')
			},
			"500": function (res) {
				console.log('500')
			},
			'unknow': function (res) {
				console.error(res);
				return true;
			},
		};
		const that = this;
		this.httpConfig.openLoading = undefined;
		this.httpConfig.endLoading = undefined;

	}

	/**
	 * @param {Object} fn设置http访问库回调
	 */
	setHttpAccessLibrary(fn) {
		HttpImplementHandler.instance.registerHttpAccessFn(fn);
	}

	/**
	 * 设置加载框回调
	 * @param {Object} startFn
	 * @param {Object} endFn
	 */
	setLoadCallBack(startFn, endFn) {
		this.httpConfig.openLoading = startFn;
		this.httpConfig.endLoading = endFn;
	}

	setHttpApiConfig(apiConfig) {
		this.httpConfig.apiConfig = {
			...this.httpConfig.apiConfig,
			...apiConfig
		};
	}

	/**
	 * 获取http请求配置
	 */
	getConfig() {
		return this.httpConfig;
	}

	/**
	 * 获取http请求配置备份
	 */
	getConfigCopy() {
		return {
			...this.httpConfig
		};
	}

	/**
	 * 注册http状态值对应的全局处理函数
	 * @param {Object} code
	 * @param {Object} fn
	 */
	registerCodeForHandler(handler) {
		this.httpConfig.codeForHandler = {
			...this.httpConfig.codeForHandler,
			...handler
		};
	}

	/**
	 * 获取一个http请求代理处理
	 * @param {Object} url
	 */
	getRequestHander(url) {
		let handler = new RequestHandler(url, this.getConfigCopy(), this);
		return handler;
	}

	/**
	 * 获取一个请求
	 */
	getRequest(url, data = {}, httpOnceConfig) {
		return new Promise((resolve, reject) => {
			this._getRequest(url, resolve, reject, data, httpOnceConfig);
		});
	}

	_getRequest(url, resolve, reject, data = {}, httpOnceConfig) {
		let useConfig = null;
		if (httpOnceConfig === undefined || httpOnceConfig === null) {
			useConfig = this.httpConfig;
		} else {
			useConfig = httpOnceConfig;
		}

		let _header = useConfig.apiConfig.header;
		let _method = useConfig.apiConfig.method;
		let _url = useConfig.apiConfig.mainUrl + url;
		let operating = null;
		if (useConfig.openLoading) {
			operating = useConfig.openLoading({
				url: _url,
				method: _method,
				data: data,
				header: _header
			});
		};
		const that = this;
		HttpImplementHandler.instance.openHttpAccess(useConfig.apiConfig, _url, data, (res) => {
			if (useConfig.endLoading) {
				useConfig.endLoading({
					url: _url,
					method: _method,
					data: data,
					header: _header
				}, operating);
			}
			//针对返回的res进行相关处理
			let initData = that.httpConfig.initBody(res);
			if (initData.code === undefined) {
				//如果返回值中不包含code值，则报错，initBody处理后必须包括code返回值
				console.error("When processing body data, the set code value to undefined");
				return;
			}
			const callBack = useConfig.codeForHandler[initData.code];
			//如果包含全局处理，则调用全局处理，并且全局处理如果返回true,则还是将结果交给本次http访问回调
			if (callBack && callBack(initData) && resolve) {
				resolve(initData);
			}
		}, (error) => {
			if (useConfig.endLoading) {
				useConfig.endLoading({
					url: _url,
					method: _method,
					data: data,
					header: _header
				}, operating);
			}
			let e = {};
			if (error.response && error.response.status && that.httpConfig.codeForHandler[error.response.status]) {
				e = {
					result: 'fail',
					code: error.response.status + "",
					res: error.response,
					error: error
				};
			} else {
				e = {
					result: 'fail',
					code: 'unknow',
					res: error,
					error: error
				};
			}
			const callBack = useConfig.codeForHandler[e.code];
			//如果存在全局错误回调，则调用全局错误回调，并且如果全局错误回调返回true，则还是将结果交给本次http访问错误回调
			if (callBack && callBack(e) && reject) {
				reject(e);
				return;
			}
		});
	}

}

function RequestHandler(url, config, handler) {
	this.url = url;
	this.handler = handler;
	this.config = config;
	//设置请求头
	this.setHeader = function (header) {
		this.config.apiConfig.header = header;
		return this;
	}
	this.addHeader = function (header) {
		this.config.apiConfig.header = {
			...this.header,
			...header
		};
		return this;
	}
	this.withCredentialsOpen = function () {
		this.config.apiConfig.cookies = true;
		return this;
	}
	this.withCredentialsClose = function () {
		this.config.apiConfig.cookies = false;
		return this;
	}
	//设置加载框
	this.openLoad = function (startFn, endFn) {
		this.load = true;
		if (startFn === undefined || startFn === null) {
			this.config.openLoading = this.handler.getConfigCopy().openLoading;
		} else {
			this.config.openLoading = startFn;
		}
		if (endFn === undefined || endFn === null) {
			this.config.endLoading = this.handler.getConfigCopy().endLoading;
		} else {
			this.config.endLoading = endFn;
		}
		return this;
	}
	//关闭加载框
	this.closeLoad = function () {
		this.config.openLoading = undefined;
		this.config.endLoading = undefined;
		return this;
	}
	this.closeLoad();
	//针对url字符串和data数据进行url修改(一些restful接口可用到)
	this.urlSplice = function (url, data) {
		return url;
	}
	//设置对response数据进行前置处理回调
	this.setInitBodyHandler = function (fn) {
		this.config.initBody = fn;
		if (this.config.initBody === undefined || this.config.initBody === null || typeof fn !== "function") {
			this.config.initBody = this.handler.getConfigCopy().initBody;
		}
		return this;
	}
	//开始请求
	this.startGet = function (data) {
		const reqUrl = this.urlSplice(this.url, data);
		this.config.apiConfig.method = "GET";
		if (localStorage.getItem('userInfo')) {
			this.config.apiConfig.header = {
				'Authorization': JSON.parse(localStorage.getItem('userInfo')).token
			}
		}
		return this.handler.getRequest(reqUrl, data, this.config)
	}
	this.startPost = function (data) {
		const reqUrl = this.urlSplice(this.url, data);
		if (localStorage.getItem('userInfo')) {
			this.config.apiConfig.header = {
				'Authorization': JSON.parse(localStorage.getItem('userInfo')).token
			}
		}
		this.config.apiConfig.method = "POST";
		return this.handler.getRequest(reqUrl, data, this.config)
	}
	this.startPut = function (data) {
		const reqUrl = this.urlSplice(this.url, data);
		this.config.apiConfig.method = "PUT";
		if (localStorage.getItem('userInfo')) {
			this.config.apiConfig.header = {
				'Authorization': JSON.parse(localStorage.getItem('userInfo')).token
			}
		}
		return this.handler.getRequest(reqUrl, data, this.config)
	}
	this.startDel = function (data) {
		const reqUrl = this.urlSplice(this.url, data);
		this.config.apiConfig.method = "DELETE";
		if (localStorage.getItem('userInfo')) {
			this.config.apiConfig.header = {
				'Authorization': JSON.parse(localStorage.getItem('userInfo')).token
			}
		}
		return this.handler.getRequest(reqUrl, data, this.config)
	}
	this.startOpt = function (data) {
		const reqUrl = this.urlSplice(this.url, data);
		this.config.apiConfig.method = "OPTIONS";
		if (localStorage.getItem('userInfo')) {
			this.config.apiConfig.header = {
				'Authorization': JSON.parse(localStorage.getItem('userInfo')).token
			}
		}
		return this.handler.getRequest(reqUrl, data, this.config)
	}
}