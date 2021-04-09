import httpUrls from './HttpUrlConfig.js'
import Element from 'element-ui'
import main from '../../main.js'
import axios from "axios";
const HttpConfig = {
	apiConfig: {
		// mainUrl: 'http://139.9.150.10:9876/dv/',
		// mainUrl: '',
		// mainUrl: 'http://192.168.40.212:9090/dv/',
		// mainUrl: 'http://192.168.40.212:9090/dv/',
		mainUrl: 'http://59.216.193.7:80/dv/',
		// mainUrl: 'http://127.0.0.1:9876/dv/',
		cookies: false
	}
};
const urlConfig = httpUrls
export default HttpConfig

//http 针对返回的response进行初始化设置(可以在此处对业务status进行相关配置)
HttpConfig.initBody = function (res) {
	if (res.data.status_code === 100) {
		return {
			result: 'success',
			code: res.data.status_code + "",
			body: res.data,
			url: res.config.url
		};
	} else {
		return {
			result: 'fail',
			code: res.data.status_code + "",
			body: res.data,
			url: res.config.url
		};
	}

};

//设置针对http status和业务自定义的status进行集中处理回调
HttpConfig.codeForHandler = [];
HttpConfig.codeForHandler.push({
	"520": function (e) {
		Element.Message(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"500": function (e) {
		Element.Message(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"501": function (e) {
		Element.Message(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"510": function (e) {
		Element.Message(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"530": function (e) {
		Element.Message(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"100": function (e) {
		//此处返回true时，该数据将继续分发给http请求处的then回调方法
		return true;
	}
});

HttpConfig.codeForHandler.push({
	"420": function (e) {
		Element.Message(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"401": function (e) {
		Element.Message(e.body.error_msg);
		// Element.Message('请重新登录');
		main.$router.push({
			path: '/'
		});
		main.componentsMoudel.clearLocalStorage();
	}
});
HttpConfig.codeForHandler.push({
	"-3": function (e) {
		Element.Message(e.body.error_msg);
		console.error(e.body.error_msg);
	}
});
HttpConfig.codeForHandler.push({
	"400": function (e) {
		Element.Message(e.body.error_msg);
	}
});

//设置访问加载框
HttpConfig.loadCallBack = {
	openLoading: function (option) {
		const loading = Element.Loading.service({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});
		return loading;
	},
	endLoading: function (option, operating) {
		operating.close();
	}
}

HttpConfig.httpAccessFn = function (config, url, data, success, error) {
	axios({
		url: url,
		method: config.method,
		data: data,
		headers: config.header,
		withCredentials: config.cookies,
	}).then(success).catch(error);
}