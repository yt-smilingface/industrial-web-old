import mainOption from "./EchartsMainOption.js";
import echartsMacroTrend from "./EchartsMacroTrend.js";
import echartsAreaOption from "./EchartsAreaOption.js";
import echartsJuxtaposeOption from './EchartsJuxtaposeOption';
import echartsAreaGdpOption from './EchartsAreaGdpOption';
import echartsIndustryDis from './EchartsIndustryDis'
import {
	parseInt
} from "core-js/fn/number";

export default class EchartsUtils {

	constructor() {
		this.mapData = {
			//登录后首页表格，暂时未使用
			"0": mainOption,
			//变化趋势
			"1": echartsMacroTrend,
			//区域分布
			"2": echartsAreaOption,
			//全国对比
			"3": echartsJuxtaposeOption,
			//全国对比
			"4": echartsAreaGdpOption,
			// 
			"5": echartsIndustryDis
		};
	}

	getInitOption(type, data, otherData) {
		const basal = this.mapData[type];
		let option = JSON.parse(JSON.stringify(basal));;
		if (otherData) {
			option = {
				...option,
				...otherData
			};
		}
		if (data.x) {
			option.xAxis[0].data = data.x;
			if (type !== '1') {
				option.xAxis[0].axisLabel.formatter = function (value, index) {
					const values = value.split("-");
					return values[0];
				}
			}

		}
		if (data.yAxis[0]) {
			option.yAxis[0] = {
				...option.yAxis[0],
				...data.yAxis[0]
			};
		}
		if (data.yAxis[1]) {
			option.yAxis[1] = {
				...option.yAxis[1],
				...data.yAxis[1]
			};
		}
		// if(data.legend){
		// 	option.legend = data.legend;
		// }
		option.series = data.y;
		data.y.forEach((item, index) => {
			if (item.setflag == 1) {
				option.series[index].itemStyle = {
					normal: {
						lineStyle: {
							width: 2,
							type: 'dotted' //'dotted'虚线 'solid'实线
						}
					}
				}
			}

		})

		return option;
	}

	getInitOption2(type, data, otherData) {
		const basal = this.mapData[type];
		let option = JSON.parse(JSON.stringify(basal));;
		if (otherData) {
			option = {
				...option,
				...otherData
			};
		}
		if (data.x) {
			option.xAxis[0].data = data.x;
		}
		if (data.yAxis[0]) {
			option.yAxis[0] = {
				...option.yAxis[0],
				...data.yAxis[0]
			};
		}
		if (data.yAxis[1]) {
			option.yAxis[1] = {
				...option.yAxis[1],
				...data.yAxis[1]
			};
		}
		if (data.legend) {
			option.legend = data.legend;
		}
		option.series = data.y;
		option.color = ['#FF7F50', '#03a9f4', '#da70d6', '#67abbd', '#0265ba'];
		return option;
	}

}