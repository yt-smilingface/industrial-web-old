
import CrFactoryModule from '../module/CrFactoryModule.js';

export default class ComponentsMoudel {
	
	constructor() {
		this.httpRequest = CrFactoryModule.instance.getHttpRequest();
		this.saveData = {};
	}
	
	getRequestHander(url){
		return this.httpRequest.getRequestHander(url);
	}
	
	//post请求
	startPost(url, data, openLoad){
		if(openLoad){
			return this.httpRequest.getRequestHander(url).openLoad().startPost(data);
		}else{
			return this.httpRequest.getRequestHander(url).closeLoad().startPost(data);
		}
		
	}
	
	//get请求
	startGet(url, data, openLoad){
		if(openLoad){
			return this.httpRequest.getRequestHander(url).openLoad().startGet(data);
		}else{
			return this.httpRequest.getRequestHander(url).closeLoad().startGet(data);
		}
		
	}
	
	//put请求
	startPut(url, data, openLoad){
		if(openLoad){
			return this.httpRequest.getRequestHander(url).openLoad().startPut(data);
		}else{
			return this.httpRequest.getRequestHander(url).closeLoad().startPut(data);
		}
		
	}
	
	//del请求
	startDel(url, data, openLoad){
		if(openLoad){
			return this.httpRequest.getRequestHander(url).openLoad().startDel(data);
		}else{
			return this.httpRequest.getRequestHander(url).closeLoad().startDel(data);
		}
	}
	
	//option请求
	startOpt(url, data, openLoad){
		if(openLoad){
			return this.httpRequest.getRequestHander(url).openLoad().startOpt(data);
		}else{
			return this.httpRequest.getRequestHander(url).closeLoad().startOpt(data);
		}
	}
	
	
	/**
	 * 开启本地持久化数据存储
	 */
	openLocalStorage(key){
		this.localStorageSaveKey = key;
	}
	
	/**
	 * 关闭本地持久化数据存储
	 */
	closeLocalStorage(){
		localStorage.clear();
		this.localStorageSaveKey = undefined;
	}
	
	/**
	 * 清除本地缓存
	 */
	clearLocalStorage(){
		window.sessionStorage.clear();
	}
	
	//存储数据
	setData(key, data){
		if(this.localStorageSaveKey !== undefined){
			let localData = JSON.parse(window.sessionStorage.getItem(this.localStorageSaveKey));
			if(localData === null){
				localData = {};
			}
			localData[key] = data;
			const jsonStr = JSON.stringify(localData);
			window.sessionStorage.setItem(this.localStorageSaveKey, jsonStr);
			this.saveData = localData;
		}else{
			this.saveData[key] = data;
		}
	}
	
	//合并数据
	mergeData(key, data){
		if(this.localStorageSaveKey !== undefined){
			let localData = JSON.parse(window.sessionStorage.getItem(this.localStorageSaveKey));
			if(localData === null){
				localData = {};
			}
			const saveData = {...this.saveData, ...localData};
			const jsonStr = JSON.stringify(saveData);
			window.sessionStorage.setItem(this.localStorageSaveKey, jsonStr);
			this.saveData = saveData;
		}else{
			this.saveData[key] = data;
		}
	}
	
	//存储数据
	delData(key){
		if(this.localStorageSaveKey !== undefined){
			let localData = JSON.parse(window.sessionStorage.getItem(this.localStorageSaveKey));
			if(localData === null){
				localData = {};
			}
			delete localData[key];
			const jsonStr = JSON.stringify(localData);
			window.sessionStorage.setItem(this.localStorageSaveKey, jsonStr);
			this.saveData = localData;
		}else{
			const index = this.saveData.indexOf(key);
			if (index > -1) {
				delete this.saveData[key];
			}
		}
	}
	
	//根据key获取数据
	getData(key){
		const data = this.saveData[key];
		if(data === undefined && this.localStorageSaveKey !== undefined){
			const localData = JSON.parse(window.sessionStorage.getItem(this.localStorageSaveKey));
			this.saveData = localData;
		}
		if(this.saveData === null){
			this.saveData = {};
		}
		return this.saveData[key];
	}
	
	//获取所有数据
	getDataAll(key){
		if(this.localStorageSaveKey !== undefined){
			const localData = JSON.parse(window.sessionStorage.getItem(this.localStorageSaveKey));
			this.saveData = localData;
		}
		return this.saveData;
	}
	
}