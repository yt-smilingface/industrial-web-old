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
};
//行业增加值占比
export default root
root.name = 'professionPercentage';
root.data = {
	callBackTime: null,
	thisName: '行业增加值占比',

	//工业经济运行监测
	echartsData: {
		//行业增加值占比
		echartsQgdbData: {},
		//行业增加值占比
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

	//获取行业增加值占比
	getNationwideComparedInfo: async function (sort) {
		if (this.thisMonitoringData.optionData[0].id) {
			const date = this.thisMonitoringData.startTimeValue;

			const data = {};
			//判断是否存在两个指标，如果存在，dataSourceInfoId使用第二个指标id，productId使用第一个指标id
			if (this.thisMonitoringData.optionData[1]) {
				data.productId = this.thisMonitoringData.optionData[0].id;
				data.dataSourceInfoId = this.thisMonitoringData.optionData[1].id;
			} else {
				data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
			}
			data.index = this.$route.query.id;

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

			if (res.body.data) {
				let option = [];
				//判断是否存在两个指标，如果存在，则echart的采用第二个指标
				if (this.thisMonitoringData.optionData[1]) {
					option = this.thisMonitoringData.optionData[1].option;
				} else {
					option = this.thisMonitoringData.optionData[0].option;
				}
				const echartsData = DataCoverUtils.pieInProfessionDataInit(res.body.data, option);
				console.log(echartsData);
				echartsData.series[0].center = ['70%', '50%'];
				this.echartsData.echartsQgdbData = echartsData;
				//判断当前是否选择了地区
				if (this.thisChooseArea.thisChooseArea) {
					const param = {
						data: {
							itemId: "this.thisChooseArea.code",
							industryName: this.thisChooseArea.thisChooseArea,
						}
					}
					this.echartsqgdb(param);
				} else {
					const param = {
						data: {
							industryName: "采矿业",
							itemId: 63,
							name: "采矿业3.87%",
							value: "7.73"
						}
					}
					this.echartsqgdb(param);

				}
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

	//获取行业规上工业增加值增速点击柱状图事件函数，获取对应行业规上工业增加值增速变化趋势
	echartsqgdb: async function (param) {
		const date = this.thisMonitoringData.startTimeValue;
		const data = {};
		data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
		data.time = date;

		data.productId = param.data.itemId || -1;

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

		const echartsData = DataCoverUtils.pieInProfessionDataOneInit(res.body.data, this.thisMonitoringData.optionData[0].option);
		this.echartsData.echartsDqGdpData = this.echartsUtils.getInitOption2("4", echartsData);

		this.thisChooseArea.thisChooseArea = param.data.industryName;
		this.thisChooseArea.code = param.data.itemId;
		this.thisChooseArea.title = {
			...this.titleName[1]
		};
		this.thisChooseArea.title.title = "云南省" + this.thisChooseArea.thisChooseArea + this.thisChooseArea.title.title;

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