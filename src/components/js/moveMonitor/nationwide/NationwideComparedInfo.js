import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
import TitleMonitor from '../../../template/moveMonitor/title/TitleMonitor.vue';
import ECharts from 'vue-echarts';
import DataCoverUtils from '../DataCoverUtils.js';
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
	//打开排名
	openRank: Boolean,
};
//全国对比
export default root
root.name = 'nationwideComparedInfo';
root.data = {
	callBackTime: null,
	thisName: '全国对比',

	//工业经济运行监测
	echartsData: {
		//全国对比
		echartsQgdbData: {},
		//全国对比地区gdp变化
		echartsDqGdpData: {}
	},

	//当前选择的指标
	thisMonitoringData: {},

	//当前选择的地区
	thisChooseArea: {
		thisChooseArea: '',
		code: '',
		title: {
			title: '',
			id: 0,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 0,
				url: '',
				//是否开启时间选择器
				openTimeChoose: false,
			},
		}
	},

	//排名数据
	rankData: [],

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
	}
}
root.methods = {
	//指标选择
	chooseBack: function (data) {

		this.thisMonitoringData = data;
		if (this.thisTab.itemData.value === this.thisName) {
			this.getNationwideComparedInfo(0);
		}

	},

	//排序模式
	sortClick: function (sort) {
		this.getNationwideComparedInfo(sort);
	},

	//获取全国对比数据
	getNationwideComparedInfo: async function (sort) {
		console.log(this.thisTab.itemData.url);
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[0]) {
			if (this.thisMonitoringData.optionData[0].id) {
				const date = this.thisMonitoringData.startTimeValue
				// const startDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
				// startDate.setMonth(date.getMonth() - 1);
				// startDate.setDate(1);
				// const endDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
				// endDate.setMonth(date.getMonth() + 1);
				// endDate.setDate(this.getLastDay(endDate.getFullYear(), endDate.getMonth()));
				const data = {};
				//判断是否存在两个指标，如果存在，dataSourceInfoId使用第二个指标id，productId使用第一个指标id
				if (this.thisMonitoringData.optionData[1]) {
					data.productId = this.thisMonitoringData.optionData[0].id;
					data.dataSourceInfoId = this.thisMonitoringData.optionData[1].id;
				} else {
					data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
				}
				data.index = this.$route.query.id;

				data.isAllIndex = this.thisTab.itemData.isAllIndex;
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
				data.sort = sort;
				data.tabType = this.thisMonitoringData.optionData[0].type;
				data.time = date;
				const res = await this.componentsMoudel.startPost(this.thisTab.itemData.url[0], data, false);

				let length = res.body.msg.length;
				if (length == 10) {
					this.callBackTime = res.body.msg+' 00:00:00';
				}
				if (length == 6) {
					let time = res.body.msg;
					time = time.slice(0, 4) + '-' + time.slice(4, 6) + '-01' +' 00:00:00';
					console.log(time);
					this.callBackTime = time;
				}
				if (length == 5) {
					let time = "";
					if (res.body.msg.indexOf('A') > -1) {
						time = res.body.msg.slice(0, 4) + '-03-01' +' 00:00:00';
						console.log(1);
					}
					if (res.body.msg.indexOf('B') > -1) {
						time = res.body.msg.slice(0, 4) + '-06-01' +' 00:00:00';
						console.log(2);
					}
					if (res.body.msg.indexOf('C') > -1) {
						time = res.body.msg.slice(0, 4) + '-09-01' +' 00:00:00';
						console.log(3);
					}
					if (res.body.msg.indexOf('D') > -1) {
						time = res.body.msg.slice(0, 4) + '-12-01' +' 00:00:00';
						console.log(4);

					}
					this.callBackTime = time;
				}

				if (length == 4 && (/(^[1-9]\d*$)/.test(res.body.msg))) {
					this.callBackTime = res.body.msg + '-01-01' +' 00:00:00';
				}

				if (res.body.data && res.body.data.x && res.body.data.x.length > 0) {
					//构建echarts数据
					const rankData = JSON.parse(JSON.stringify(res.body.data));
					this.dataRank(rankData);
					let option = [];
					//判断是否存在两个指标，如果存在，则echart的采用第二个指标
					if (this.thisMonitoringData.optionData[1]) {
						option = this.thisMonitoringData.optionData[1].option;
					} else {
						option = this.thisMonitoringData.optionData[0].option;
					}
					const echartsData = DataCoverUtils.dataNationInit(res.body.data, option);
					this.echartsData.echartsQgdbData = this.echartsUtils.getInitOption("3", echartsData);
					//判断当前是否选择了地区
					if (this.thisChooseArea.thisChooseArea) {
						const param = {
							name: this.thisChooseArea.thisChooseArea + "-" + this.thisChooseArea.code
						}
						this.echartsqgdb(param);
					} else {
						const param = {
							name: "云南省-530000"
						}
						this.echartsqgdb(param);
					}
				}
			}
		}

	},

	//根据指标对云南省数据在全国排名做计算
	dataRank: function (data) {
		let pos = -1;
		this.rankData = [];
		const oneData = data['x'];
		for (let i = 0; i < oneData.length; i++) {
			const oneDataValue = oneData[i];
			for (let province in oneDataValue) {
				if (oneDataValue[province] === '云南省') {
					pos = i;
					break;
				}
			}
			if (pos != -1) {
				break;
			}
		}
		for (let key in data) {
			if (key !== 'x') {
				let option = [];
				//判断是否存在两个指标，如果存在，则右边排序采用第二个指标
				if (this.thisMonitoringData.optionData[1]) {
					option = this.thisMonitoringData.optionData[1];
				} else {
					option = this.thisMonitoringData.optionData[0];
				}
				const monitorDataAll = data[key];
				if (monitorDataAll.length === 0) {
					this.rankData.push({
						name: option.option[key],
						value: "暂无数据",
						pos: sortPosition,
						showModel: 0,
					})
					continue;
				}
				const monitorData = monitorDataAll[pos];
				monitorDataAll.sort(function (a, b) {
					return b - a;
				})
				let sortPosition = -1;
				for (let sortPos = 0; sortPos < monitorDataAll.length; sortPos++) {
					if (monitorData === monitorDataAll[sortPos]) {
						sortPosition = sortPos + 1;
						break
					}
				}
				//获取指标中的单位
				let suffix = "";
				const suffixMap = option;
				//suffixMap.dataItem = suffixMap.dataItem.replace(/^\s*|\s*$/g, "");
				const suffixArray = suffixMap.option[parseInt(key)].match(/\((.+?)\)/g);
				if (suffixArray.length > 0) {
					suffix = suffixArray[suffixArray.length - 1];
					suffix = suffix.replace("(", "");
					suffix = suffix.replace(")", "");
				}
				const name = option.option[key];
				this.rankData.push({
					name: name,
					value: monitorData + suffix,
					pos: sortPosition,
					showModel: 1,
				})
			}
		}

	},

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

	//全国对比点击柱状图事件函数，获取对应数据
	echartsqgdb: async function (param) {
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[1]) {
			const date = this.thisMonitoringData.startTimeValue;
			// const startDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
			// startDate.setMonth(date.getMonth() - 1);
			// startDate.setDate(1);
			const data = {};
			if (this.thisMonitoringData.optionData[1]) {
				data.productId = this.thisMonitoringData.optionData[0].id;
				data.dataSourceInfoId = this.thisMonitoringData.optionData[1].id;
			} else {
				data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
			}
			data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
			data.time = date;
			data.areaCode = param.name.split("-")[1];
			data.isAllIndex = this.thisTab.itemData.isAllIndex;
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
			data.tabType = this.thisMonitoringData.optionData[0].type;
			data.index = this.$route.query.id;
			const res = await this.componentsMoudel.startPost(this.thisTab.itemData.url[1], data, false);
			let echartsData = null;

			if (this.thisMonitoringData.optionData.length >= 2) {
				echartsData = DataCoverUtils.dataNationOneInit(res.body.data, this.thisMonitoringData.optionData[0].option, this.thisMonitoringData.optionData[1].option);
			} else {
				echartsData = DataCoverUtils.dataNationOneInit(res.body.data, this.thisMonitoringData.optionData[0].option);
			}

			this.echartsData.echartsDqGdpData = this.echartsUtils.getInitOption2("4", echartsData);

			this.thisChooseArea.thisChooseArea = param.name.split("-")[0];
			this.thisChooseArea.code = param.name.split("-")[1];
			this.thisChooseArea.title = {
				...this.titleName[1]
			};
			this.thisChooseArea.title.title = this.thisChooseArea.thisChooseArea + this.thisChooseArea.title.title;

		}

	},

	//是否设置了自主的插件（标题）
	setTitleSlots: function () {
		if (this.$scopedSlots.title === undefined) {
			return false;
		}
		return true;
	},

}
root.mounted = function () {
	if (this.thisTab.itemData.value === this.thisName) {
		// this.getNationwideComparedInfo();
	}
}
root.watch = {
	thisTab: function (newThisTab, oldThisTab) {
		if (newThisTab.itemData.value === this.thisName) {
			// this.getNationwideComparedInfo();
		}
	}
}

FactoryComponents.initComponent(root);