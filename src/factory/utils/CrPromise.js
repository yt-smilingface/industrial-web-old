function CrPromise(fn) {

	const that = this;
	
	//访问成功后的回调
	this.then = function(thenCallBack){
		that.thenCallBack = thenCallBack;
		return that;
	}
	
	//http请求出错后的回调
	this.catch = function(errorCallBack){
		that.errorCallBack = errorCallBack;
		return that;
	}
	
	this.resolve = function(value){
		if(that.thenCallBack !== undefined && that.thenCallBack !== null){
			that.thenCallBack(value);
		}
	}
	
	this.reject = function(error){
		if(that.errorCallBack !== undefined && that.errorCallBack !== null){
			that.errorCallBack(error);
		}else{
			throw error;
		}
	}

	fn(this.resolve, this.reject);
	
}
export default CrPromise;
