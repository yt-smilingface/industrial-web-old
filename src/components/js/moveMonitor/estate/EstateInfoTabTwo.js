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
};
//区域分布
export default root
root.name = 'estateInfoTabTwo';
root.data = {

	thisName: '产业图谱',

	//工业经济运行监测
	echartsData: {
		//区域分布图表
		echartsYunNanMapData: {},
		//区域分布投资变化增速
		echartsAreaData: {},
	},

	//当前选择的指标
	thisMonitoringData: {},

	//当前选择的地区
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
	}
}
root.methods = {
	//指标选择变化
	chooseBack: function (data) {
		if (data.startTimeValue) {
			this.thisMonitoringData = data;
			if (this.thisTab.itemData.value === this.thisName) {
				this.scopedSlotsParameter();
				this.getAreaInfo();
			}
		}
	},

	//获取区域分布数据
	getAreaInfo: async function () {
		const echartsData = DataCoverUtils.dataAreaMapInit([], '亿元');
		this.echartsData.echartsYunNanMapData = echartsData;

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
		const date = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
		const startDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
		startDate.setMonth(date.getMonth() - 1);
		startDate.setDate(1);
		const endDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
		endDate.setMonth(date.getMonth() + 1);
		endDate.setDate(this.getLastDay(endDate.getFullYear(), endDate.getMonth()));
		const data = {};
		//判断是否存在两个指标，如果存在，dataSourceInfoId使用第二个指标id，productId使用第一个指标id
		if (this.thisMonitoringData.optionData[1]) {
			data.productId = this.thisMonitoringData.optionData[0].id;
			data.dataSourceInfoId = this.thisMonitoringData.optionData[1].id;
		} else {
			data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
		}
		data.startTime = startDate.format("yyyy-MM-dd hh:mm:ss");
		data.endTime = endDate.format("yyyy-MM-dd hh:mm:ss");

		data.time = date.format("yyyy-MM-dd hh:mm:ss");
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
			areaCode: areaCode ? areaCode : '530100'
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
		if (chooseArea.data) {
			if (this.setScopedSlots()) {
				this.scopedSlotsParameter(chooseArea.data.cityCode);
			} else {
				if (this.thisTab.itemData.url && this.thisTab.itemData.url[1]) {
					const startDate = new Date(this.thisMonitoringData.startTimeValue + " 00:00:00");
					const data = {};
					data.dataSourceInfoId = this.thisMonitoringData.optionData[0].id;
					data.areaCode = chooseArea.data.cityCode;
					data.time = startDate.format("yyyy-MM-dd hh:mm:ss");

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
					const res = await this.componentsMoudel.startPost(this.thisTab.itemData.url[1], data, false);

					const echartsData = DataCoverUtils.dataAreaInit(res.body.data);
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
root.mounted = function () {
	if (this.thisTab.itemData.value === this.thisName) {
		this.getAreaInfo();
	}
	console.log(this.$route.query.name);
}
root.watch = {
	thisTab: function (newThisTab, oldThisTab) {
		if (newThisTab.itemData.value === this.thisName) {
			// this.getAreaInfo();
		}
	}
}

FactoryComponents.initComponent(root);