import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
import TitleMonitor from '../../../template/moveMonitor/title/TitleMonitor.vue';
import ECharts from 'vue-echarts';
import DataCoverUtils from '../DataCoverUtils.js';
import 'echarts/map/js/province/yunnan.js';
const root = {}
root.components = {
	ECharts,
	TitleMonitor,
}
root.props = {
	//当前标题
	titleName: Array,
	//当前tab页
	thisTab: Object,
	//地图数据构建
	responseInit: Function,
	//自定义点击回调
	clickSet: Function,
};
//区域分布
export default root
root.name = 'areaInfo';
root.data = {
	//回调时间
	callBackTime: '',
	thisName: '区域分布',
	// data: '',
	//工业经济运行监测
	echartsData: {
		//区域分布图表
		echartsYunNanMapData: {},
		//区域分布投资变化增速
		echartsAreaData: {},
	},

	//当前选择的指标
	thisMonitoringData: {},

	//areaEnClick
	thisChooseArea: {
		title: '',
		id: 0,
		model: {
			//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
			id: 0,
			url: '',
			//是否开启时间选择器
			openTimeChoose: false,
		},
	},

	//插件数据
	slotsData: {},

	//每个月份的天数用于计算时间
	monthDate: {
		0: 31,
		1: 28,
		2: 31,
		3: 30,
		4: 31,
		5: 30,
		6: 31,
		7: 31,
		8: 30,
		9: 31,
		10: 30,
		11: 31
	},
	tableData: [],
}
root.methods = {
	//指标选择变化
	chooseBack: function (data) {

		this.thisMonitoringData = data;
		if (this.thisTab.itemData.value === this.thisName) {
			this.scopedSlotsParameter();
			this.getAreaInfo();
		}

	},

	//获取区域分布数据
	getAreaInfo: async function () {
		let that = this;
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[0]) {
			if (this.thisMonitoringData.optionData[0].id) {
				this.scopedSlotsParameter();
				const data = {
					...this.slotsData.data
				};
				const res = await this.componentsMoudel.startPost(this.thisTab.itemData.url[0], data, false);
				let length = res.body.msg.length;
				if (length == 10) {
					this.callBackTime = res.body.msg + ' 00:00:00';
				}
				if (length == 6) {
					let time = res.body.msg;
					time = time.slice(0, 4) + '-' + time.slice(4, 6) + '-01' + ' 00:00:00';
					console.log(time);
					this.callBackTime = time;
				}
				if (length == 5) {
					let time = "";
					if (res.body.msg.indexOf('A') > -1) {
						time = res.body.msg.slice(0, 4) + '-03-01' + ' 00:00:00';
						console.log(1);
					}
					if (res.body.msg.indexOf('B') > -1) {
						time = res.body.msg.slice(0, 4) + '-06-01' + ' 00:00:00';
						console.log(2);
					}
					if (res.body.msg.indexOf('C') > -1) {
						time = res.body.msg.slice(0, 4) + '-09-01' + ' 00:00:00';
						console.log(3);
					}
					if (res.body.msg.indexOf('D') > -1) {
						time = res.body.msg.slice(0, 4) + '-12-01' + ' 00:00:00';
						console.log(4);

					}
					this.callBackTime = time;
				}

				if (length == 4 && (/(^[1-9]\d*$)/.test(res.body.msg))) {
					this.callBackTime = res.body.msg + '-01-01' + ' 00:00:00';
				}
				let suffix = "";
				let option = [];
				//判断是否存在两个指标，如果存在，则echart的采用第二个指标
				if (this.thisMonitoringData.optionData[1]) {
					option = this.thisMonitoringData.optionData[1];
				} else {
					option = this.thisMonitoringData.optionData[0];
				}

				const suffixMap = option;
				suffixMap.dataItem = suffixMap.dataItem.replace(/^\s*|\s*$/g, "");
				let suffixArray = suffixMap.dataItem.match(/\((.+?)\)/g) ? suffixMap.dataItem.match(/\((.+?)\)/g) : suffixMap.dataItem;
				if (suffixArray.length > 0) {
					suffix = suffixArray[suffixArray.length - 1];
					suffix = suffix.replace("(", "");
					suffix = suffix.replace(")", "");
				}
				if (this.responseInit) {
					const echartsData = this.responseInit(res.body.data, suffix);
					this.echartsData.echartsYunNanMapData = echartsData;
				} else {
					let echartsData = null;
					if (suffix == '金' || suffix == "目") {
						// console.log(res.body.data);
						echartsData = DataCoverUtils.dataAreaMapInit2(res.body.data, "个");
					} else {
						// console.log(res.body.data);
						echartsData = DataCoverUtils.dataAreaMapInit(res.body.data, suffix);
					}
					this.echartsData.echartsYunNanMapData = echartsData;
				}

				this.slotsData = {
					...this.slotsData,
					echartsData: res.body.data
				};

				that.areaEnClick({
					data: {
						cityCode: "530100",
						name: "昆明市",
						value: 3275.74,
					}
				})
			}
		}
	},

	//是否设置了自主的插件
	setScopedSlots: function () {
		if (this.$scopedSlots.area === undefined) {
			return false;
		}
		return true;
	},

	//是否设置了自主的插件（标题）
	setTitleSlots: function () {
		if (this.$scopedSlots.title === undefined) {
			return false;
		}
		return true;
	},

	//插件数据构建
	scopedSlotsParameter: function (areaCode) {
		const data = {};
		if (this.thisMonitoringData.startTimeValue) {
			const date = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
			const startDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
			startDate.setMonth(date.getMonth() - 1);
			startDate.setDate(1);
			const endDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
			endDate.setMonth(date.getMonth() + 1);
			data.time = this.thisMonitoringData.startTimeValue;
			endDate.setDate(this.getLastDay(endDate.getFullYear(), endDate.getMonth()));
			// if (data.time !== null && data.time !== undefined) { //初始化data时不对time进行初始化操作
			// 	data.time = date.format("yyyy-MM-dd hh:mm:ss");
			// } else {
			// 	data.time = null
			// }

		}

		//判断是否存在两个指标，如果存在，dataSourceInfoId使用第二个指标id，productId使用第一个指标id
		if (this.thisMonitoringData.optionData[1]) {
			data.productId = this.thisMonitoringData.optionData[0].id;
			data.dataSourceInfoId = this.thisMonitoringData.optionData[1].id;
		} else {
			data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
		}

		if (this.thisTab.itemData.fre === undefined) {
			data.fre = 1;
		} else {
			data.fre = this.thisTab.itemData.fre;
		}
		if (this.thisTab.itemData.area === undefined) {
			data.area = 1;
		} else {
			data.area = this.thisTab.itemData.area;
		}
		data.index = this.$route.query.id;
		data.tabType = this.thisMonitoringData.optionData[0].type;
		this.slotsData = {
			data: data,
			thisMonitoringData: this.thisMonitoringData,
			areaCode: areaCode ? areaCode : '530100',
			name: 'asdjbkahjds',
			tableData: this.tableData
		};

	},

	//获取一个月的天数
	getLastDay: function (year, month) {
		let day = this.monthDate[month];
		if (month === 1) {
			if (year % 4 == 0 && year % 100 !== 0 || year % 400 == 0) {
				return 29;
			} else {
				return 28;
			}
		}
		return day;
	},

	//区域分布获取点击地图对应市获取对应数据
	areaEnClick: async function (chooseArea) {
		let data = {};
		data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
		data.isAllIndex = 1;
		data.areaCode = chooseArea.data.cityCode;
		if (data.time !== null && data.time !== undefined) { //初始化data时不对time进行初始化操作
			data.time = startDate.format("yyyy-MM-dd hh:mm:ss");
		} else {
			data.time = null
		}

		if (this.thisTab.itemData.fre === undefined) {
			data.fre = 1;
		} else {
			data.fre = this.thisTab.itemData.fre;
		}
		if (this.thisTab.itemData.area === undefined) {
			data.area = 1;
		} else {
			data.area = this.thisTab.itemData.area;
		}
		data.index = this.$route.query.id;
		data.tabType = this.thisMonitoringData.optionData[0].type;

		if (Object.keys(chooseArea.data).length > 0) {
			if (this.setScopedSlots()) {
				if (this.thisTab.itemData.data[0].title === '云南省工业重点项目区域分布') { //重点行业区域分布
					const res = await this.componentsMoudel.startPost(this.thisTab.itemData.url[1], data, false);
					this.tableData = res.body.data;
				}
				this.scopedSlotsParameter(chooseArea.data.cityCode);
				if (this.clickSet) {
					this.clickSet(this.slotsData);
				}
			} else {
				if (this.thisTab.itemData.url && this.thisTab.itemData.url[1]) {
					const startDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
					const res = await this.componentsMoudel.startPost(this.thisTab.itemData.url[1], data, false);
					if (this.thisTab.itemData.data[0].title === '云南省工业重点项目区域分布') {
						this.tableData = res.body.data;
						this.scopedSlotsParameter(chooseArea.data.cityCode);
					} else if (this.thisTab.itemData.data[0].title === '云南省工业投资整体情况区域分布') {
						let suffix = "";
						let option = [];
						//判断是否存在两个指标，如果存在，则echart的采用第二个指标
						option = this.thisMonitoringData.optionData[0];
						const suffixMap = option;
						suffixMap.dataItem = suffixMap.dataItem.replace(/^\s*|\s*$/g, "");
						let suffixArray = suffixMap.dataItem.match(/\((.+?)\)/g) ? suffixMap.dataItem.match(/\((.+?)\)/g) : suffixMap.dataItem;
						if (suffixArray.length > 0) {
							suffix = suffixArray[suffixArray.length - 1];
							suffix = suffix.replace("(", "");
							suffix = suffix.replace(")", "");
						}
						const echartsData = DataCoverUtils.dataNationOneInit(res.body.data, option.option);
						this.echartsData.echartsAreaData = this.echartsUtils.getInitOption2("4", echartsData);

						this.thisChooseArea = {
							...this.titleName[1]
						};
						this.thisChooseArea.title = chooseArea.data.name + this.thisChooseArea.title;
					} else {
						let suffix = "";
						let option = [];
						//判断是否存在两个指标，如果存在，则echart的采用第二个指标
						option = this.thisMonitoringData.optionData[0];
						const suffixMap = option;
						suffixMap.dataItem = suffixMap.dataItem.replace(/^\s*|\s*$/g, "");
						let suffixArray = suffixMap.dataItem.match(/\((.+?)\)/g) ? suffixMap.dataItem.match(/\((.+?)\)/g) : suffixMap.dataItem;
						if (suffixArray.length > 0) {
							suffix = suffixArray[suffixArray.length - 1];
							suffix = suffix.replace("(", "");
							suffix = suffix.replace(")", "");
						}
						const echartsData = DataCoverUtils.dataAreaInit(res.body.data, suffix);
						this.echartsData.echartsAreaData = this.echartsUtils.getInitOption2("2", echartsData);
						this.thisChooseArea = {
							...this.titleName[1]
						};
						this.thisChooseArea.title = chooseArea.data.name + this.thisChooseArea.title;
					}
				}
			}
		}
	}

}
root.mounted = function () {
	if (this.thisTab.itemData.value === this.thisName) {
		// this.getAreaInfo();
	}
}
root.watch = {
	thisTab: function (newThisTab, oldThisTab) {
		if (newThisTab.itemData.value === this.thisName) {
			// this.getAreaInfo();
		}
	}
}

FactoryComponents.initComponent(root);