import echartsYunNanMapOption from '../../../echart/EchartsYunNanMapOption';

import pieInProfessionPercentage from '../../../echart/PieInProfessionPercentage.js';
//数据转换
/**
 * 数据结构说明
 * 除开区域数据(地图数据)，其余数据格式都为{y:[], x:[]}
 * x: 为横坐标指标数据。一般情况下后台数据包含一个为x的数据,需要将此x与后台的x进行赋值
 * y: 数组格式，里面包含的数据为initData格式
 * 
 * 方法中的option参数的格式如下:
 * {1252: "地区生产总值累计值(亿元)"
	1253: "地区生产总值指数(上年同期=100)累计值(%)"
	1316: "地区生产总值(亿元)"
	1330: "地区生产总值指数(上年=100)"
	7370: "地区生产总值累计值(亿元)"
	7371: "地区生产总值累计同比增长（%）"}
 * 其中，key值为指标id，value为指标名称
 */
export default {

	initData: {
		//一般为指标名称即可
		name: '',
		//类型，一般为包含%的指标为line，否则为bar
		type: '',
		//0:以左边y坐标为标准。1:以右边坐标为标准()一般为包含%的指标值为1)
		yAxisIndex: 0,
		//颜色
		color: '',
		//数据
		data: [],
		//是否显示0刻度
		scale: true,
		//最大宽度
		barMaxWidth: '30%',

	},

	areaMap: {
		"quan_guo": "全国",
		"yun_nan": "云南",
	},

	colorMap: ["#FFA516", "#03A9F4"],

	//变化趋势echart数据
	/**
	 * @param {Object} data
	 * 格式为{x:[], "指标id(此id与option中的id对应)":{'省份代码':['展示数据(该数据就是需要赋值到initData中的data)']},{'':[]},....}
	 * 例如:
	 * {x:["2020-08", "2020-07"], 1: {'quan_guo':["5.6", "4.8"]}}
	 * 		
	 * @param {Object} option
	 * 格式参考文件开头option
	 */
	dataInit: function (data, option) {
		let yData = {
			y: [],
			x: [],
			yAxis: [],
			// legend: {
			// 	bottom: 0,
			// 	data: []
			// }
			xAxis: {
				axisLabel: {
					interval: 0,
					rotate: 45,
				}
			},

		};

		for (let key in data) {
			const oneData = data[key];
			//如果是x，则表示横坐标单位，直接进行赋值
			if (key === 'x') {
				yData.x = oneData;
			} else {
				let min = 100000000;
				let max = -100000000;
				//对数据进行封装，将数据结合option中的指标，封装initData数据
				for (let childKey in oneData) {
					const init = {
						...this.initData
					};
					const keyValue = option[key];
					if(keyValue === undefined){
						continue;
					}
					if (keyValue.indexOf("%") < 0) {
						init.yAxisIndex = 0;
						init.type = 'bar';
						if (childKey === 'quan_guo') {
							init.color = '#FFA516';
						}
						if (childKey === 'yun_nan') {
							init.color = '#03a9f4';
						}

					} else {
						init.yAxisIndex = 1;
						init.type = 'line';
						if (childKey === 'quan_guo') {
							init.color = '#FFA516';
						}
						if (childKey === 'yun_nan') {
							init.color = '#03a9f4';
						}
					}
					init.data = oneData[childKey];
					init.data.forEach((item, index) => {
						const value = parseFloat(item);
						if (min > value) {
							min = value;
						}
						if (max < value) {
							max = value;
						}
						init.scale = false
					})
					init.name = this.areaMap[childKey] + ":" + option[key];
					// yData.legend.data.push(init.name);
					//封装完成后添加到y中
					yData.y.push(init);
				}
				if (min !== 100000000) {
					yData.yAxis.push({
						min: min,
						max: max,
					})
				}
			}
		}
		return yData;
	},

	//全国对比
	/**
	 * @param {Object} data
	 * 格式为{x:[{'省份代码':'省份名称'},...], "指标id(此id与option中的id对应)":['展示数据(该数据就是需要赋值到initData中的data)'],"指标id(此id与option中的id对应)":[],...}
	 * 例如:
	 * {x:[{'650000':'新疆维吾尔自治区'}], 1: ["-6412.8", "838.38"]}
	 * @param {Object} option
	 * 格式参考文件开头option
	 */
	dataNationInit: function (data, option) {
		const yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		for (let key in data) {
			const oneData = data[key];
			//如果是x，则表示横坐标单位，将key和value用-赋值添加到x中，例如'650000-新疆维吾尔自治区'
			if (key === 'x') {
				oneData.forEach((item, index) => {
					for (let xKey in item) {
						yData.x.push(item[xKey] + "-" + xKey);
					}
				});
			} else {
				//对数据进行封装，将数据结合option中的指标，封装initData数据
				const init = {
					...this.initData
				};
				if (option[key].indexOf("%") < 0) {
					init.yAxisIndex = 0;
					init.type = 'bar';
					init.color = '#03a9f4';
				} else {
					init.yAxisIndex = 1;
					init.type = 'line';
					init.color = '#03a9f4';
				}
				init.data = oneData;
				init.name = option[key];
				yData.y.push(init);
			}
		}
		return yData;
	},

	/**
	 * @param {Object} data
	 * 格式为：{x:[],y[]};
	 * @param {Object} dataItem
	 * 指标名称
	 */
	dataNationOneInit: function (data, option) {
		const yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		for (let key in data) {
			const oneData = data[key];
			//如果是x，则表示横坐标单位，将key和value用-赋值添加到x中，例如'650000-新疆维吾尔自治区'
			if (key === 'x') {
				yData.x = oneData;
			} else {
				//对数据进行封装，将数据结合option中的指标，封装initData数据
				const init = {
					...this.initData
				};
				const keyValue = option[key];
				if(keyValue === undefined){
					continue;
				}
				if (keyValue.indexOf("%") < 0) {
					init.yAxisIndex = 0;
					init.type = 'bar';
					init.color = '#03a9f4';
				} else {
					init.yAxisIndex = 1;
					init.type = 'line';
					init.color = '#03a9f4';
				}
				init.data = oneData;
				init.name = option[key];
				yData.y.push(init);
			}
		}
		return yData;
	},


	//区域分布
	//云南地图数据各个地方数据
	/**
	 * @param {Object} data
	 * {x:[],y:[]};
	 * 较为简单，直接赋值即可
	 */
	dataAreaInit: function (data) {
		const yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		const init = { ...this.initData };
		init.type = 'line';
		init.color = '#03a9f4';
		init.data = data.y;
		yData.x = data.x;
		yData.y.push(init);
		return yData;
	},

	//云南地图数据
	/**
	 * 由于地图比较特殊，直接获取echartsYunNanMapOption的echart的option配置进行设置
	 * @param {Object} data
	 * 格式为: [{cityCode:'',cityName:'',value:''}]
	 * @param {Object} suffix
	 * 数据的单位一般为%和亿元，也有为空字符串的情况
	 */
	dataAreaMapInit: function (data, suffix) {
		const option = { ...echartsYunNanMapOption }
		option.series[0].data = [];
		let min = 10000000;
		let max = -10000000;
		data.forEach((item, index) => {
			const value = parseFloat(item.value);
			if (min > value) {
				min = value;
			}
			if (max < value) {
				max = value;
			}
			//填充地图中每个市的数据
			option.series[0].data.push({
				name: item.cityName,
				value: value,
				cityCode: item.cityCode
			})
		})
		//设置鼠标放置到市上时到tooltip
		option.tooltip = {
			trigger: 'item',
			formatter: function (param, ticket, callback) {
				let value = param.value;
				const name = param.name;
				if (isNaN(value)) {
					value = "暂无数据";
				} else {
					value += suffix;
				}
				return value;
			}
		}
		//设置地图左下角筛选器的最大最小值
		option.visualMap.min = min;
		option.visualMap.max = max;
		return option;
	},

	//行业增加值增速
	/**
	 * 工业经济运行监测echart数据组装
	 * @param {Object} data
	 * 格式为{x:{"id":"行业"}, "指标id(此id与option中的id对应)":{'省份代码':['展示数据(该数据就是需要赋值到initData中的data)']},{'':[]},....}
	 * 例如:
	 * {x:{"id":"行业名称", "id":"行业名称"}, 1: {'quan_guo':["5.6", "4.8"]}}
	 */
	professionEchartDataInit: function(data, option){
		let yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		for (let key in data) {
			if(key === 'x'){
				const xData = [];
				for(let xKey in data[key]){
					xData.push(data[key][xKey]+'-'+xKey);
				}
				yData.x = xData;
			}else{
				const init = {
					...this.initData
				};
				if (option[key].indexOf("%") < 0) {
					init.yAxisIndex = 0;
					init.type = 'bar';
					init.color = '#03a9f4';
				} else {
					init.yAxisIndex = 1;
					init.type = 'line';
					init.color = '#03a9f4';
				}
				init.data = data[key];
				init.name = option[key];
				yData.y.push(init);
			}
		}
		return yData;
	},

	/**
	 * 工业经济运行监测echart数据组装
	 * @param {Object} data
	 * {x:[],y:[]};
	 * 较为简单，直接赋值即可
	 */
	professionEchartOneDataInit: function (data) {
		const yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		const init = { ...this.initData };
		init.type = 'line';
		init.color = '#03a9f4';
		for (let key in data) {
			if(key === 'x'){
				yData.x = data.x;
			}else{
				init.data = data[key];
				yData.y.push(init);
			}
		}
		return yData;
	},

	/**
	 * 行业增加值占比饼图
	 * @param {*} data 
	 * @param {*} option 
	 */
	pieInProfessionDataInit: function(data, option){
		const echartsOption = JSON.parse(JSON.stringify(pieInProfessionPercentage));
		const eData = [];
		let maxValue = 0;
		data.forEach((item, index)=>{
			let name = '';
			let dataValue = 0;
			if(item.dataItem){
				name = item.dataItem.replace('(%)', '');
				dataValue = parseFloat(item.dataValue).toFixed(2);
			}else{
				for(let key in item){
					name = key;
					dataValue = parseFloat(item[key]).toFixed(2);
				}
			}
			maxValue += parseFloat(dataValue);
			eData.push({
				name: name,
				value: dataValue,
				itemId: item.id,
			});
		});
		echartsOption.series[0].data = eData;
		echartsOption.legend.data = [];
		eData.forEach((item, index)=>{
			if(maxValue === 0){
				echartsOption.legend.data.push(item.name+maxValue+'%');
				item.industryName = item.name;
				item.name = item.name+maxValue+'%';
			}else{
				const percent = (parseFloat(item.value)/maxValue*100).toFixed(2);
				echartsOption.legend.data.push(item.name+percent+'%');
				item.industryName = item.name;
				item.name = item.name+percent+'%';
			}
			
		});
		return echartsOption;

	},

	/**
	 * 行业增加值单个行业数据图
	 * @param {Object} data
	 * {x:[],行业id:[]};
	 * 较为简单，直接赋值即可
	 */
	pieInProfessionDataOneInit: function (data) {
		const yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		const init = { ...this.initData };
		init.type = 'line';
		init.color = '#03a9f4';
		for (let key in data) {
			if(key === 'x'){
				yData.x = data.x;
			}else{
				init.data = data[key];
				yData.y.push(init);
			}
		}
		return yData;
	},

	//行业分布
	//数据结构和行业增加值增速一致
	industrialDisDataInit: function(data, option){
		let yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		for (let key in data) {
			if(key === 'x'){
				const xData = [];
				for(let xKey in data[key]){
					xData.push(data[key][xKey]+'-'+xKey);
				}
				yData.x = xData;
			}else{
				const init = {
					...this.initData
				};
				if (option[key].indexOf("%") < 0) {
					init.yAxisIndex = 0;
					init.type = 'bar';
					init.color = '#03a9f4';
				} else {
					init.yAxisIndex = 1;
					init.type = 'line';
					init.color = '#03a9f4';
				}
				init.data = data[key];
				init.name = option[key];
				yData.y.push(init);
			}
		}
		return yData;
	},

	/**
	 * 行业分布
	 * @param {Object} data
	 * {x:[],y:[]};
	 * 较为简单，直接赋值即可
	 */
	industrialDisDataOneInit: function (data) {
		const yData = {
			y: [],
			x: [],
			yAxis: [],
		};
		const init = { ...this.initData };
		init.type = 'line';
		init.color = '#03a9f4';
		for (let key in data) {
			if(key === 'x'){
				yData.x = data.x;
			}else{
				init.data = data[key];
				yData.y.push(init);
			}
		}
		return yData;
	},


}
