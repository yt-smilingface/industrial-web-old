import axios from "axios";

export default {
	
	initComponent: function(component){
		const data = component.data;
		if(data !== undefined && data !== null && typeof data !== "function"){
			component.data = this.formatData(component.data);
		}
	},
	
	formatData: function(data){
		return function () {
		    return JSON.parse(JSON.stringify(data));
		}
	},
	
}