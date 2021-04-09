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
	//请求数据构建
	requestDataInit: Function,
	//请求数据返回后针对echart数据构建
	responseInit: Function,
};
//行业运行监测
export default root
root.name = 'businessInfoTabOne';
root.data = {
	//tab名称
	thisName: '行业运行监测',
	callBackData: {
		dataSourceInfoId: "99",
		index: "99",
		tabType: 0
	},
	callBackData2: {
		productId: 41,
		isFirst: true,
	},
	callBackData3: {
		dataSourceInfoId: "-100",
		index: "-100",
		tabType: 0
	},
	//行业运行监测图表
	echartsData: {
		echartsTrendData: {},
		echartsTrendData2: {},
		echartsTrendData3: {},
	},
	//当前选择的指标
	thisMonitoringData: {},

}
root.methods = {

	//指标选择
	chooseBack: function (data) {
		// if (data.optionData[0].dataItem == "工业投资同比增速(%)") {
		// 	return
		// }
		// this.callBackData2 = {productId:data.optionData[0].id};
		this.thisMonitoringData = data;
		if (this.thisTab.itemData.value === this.thisName) {
			let data = {};
			const fre = this.thisTab.itemData.fre;
			const area = this.thisTab.itemData.area;

			if (this.requestDataInit) {
				data = this.requestDataInit({
					...this.thisMonitoringData,
					...this.thisTab.itemData
				}, this);
			} else {
				data = this.requestDataLocalInit({
					...this.thisMonitoringData,
					...this.thisTab.itemData
				}, this);
			}
			console.log(this.thisMonitoringData);
		}
	},

	//指标选择
	chooseBack3: function (data) {
		// this.callBackData2 = {productId:data.optionData[0].id};
		console.log(data);
		if (this.thisTab.itemData.value === this.thisName) {
			let data2 = {
				appType: 1,
				area: 2,
				dataSourceInfoId: data.optionData[0].id,
				fre: 1,
				index: this.$route.query.id.toString(),
				isAllIndex: 0,
				tabType: 7
			};
			this.getChangeTrend3(data2, data);

		}
	},

	chooseBackTwo: function (data) {
		let data2 = {
			appType: 1,
			area: 2,
			dataSourceInfoId: 4529,
			fre: 1,
			hasQuanGuo: 0,
			index: "99",
			isAllIndex: 1,
			productId: 41,
			tabType: 0
		};
		if (data) {
			data2.productId = data.optionData[0].id;
			data2.dataSourceInfoId = data.optionData[1].id;
		}
		const that = this;
		this.componentsMoudel.startPost(this.thisTab.itemData.url[1], data2, false).then((res) => {
			let option = [];
			//判断是否存在两个指标，如果存在，则echart的采用第二个指标
			if (data.optionData[1]) {
				option = data.optionData[1].option;
			} else {
				option = data.optionData[0].option;
			}

			const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option, 1);
			that.echartsData.echartsTrendData2 = that.echartsUtils.getInitOption("1", echartsDataInit);

		});

	},



	//传递主要产品产量的参数

	//获取变化趋势数据
	getChangeTrend: function (data) {
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[0]) {
			if (this.thisMonitoringData.optionData[0].id) {
				const that = this;
				this.$refs.eCharts.clear();
				this.componentsMoudel.startPost(this.thisTab.itemData.url[0], data, false).then((res) => {
					let echartsDataInit = {};
					let option = [];
					//判断是否存在两个指标，如果存在，则echart的采用第二个指标
					if (that.thisMonitoringData.optionData[1]) {
						option = that.thisMonitoringData.optionData[1].option;
					} else {
						option = that.thisMonitoringData.optionData[0].option;
					}
					if (that.responseInit) {
						echartsDataInit = that.responseInit(res.body.data, option);
						that.echartsData.echartsTrendData = that.echartsUtils.getInitOption("3", echartsDataInit);
					} else {
						echartsDataInit = DataCoverUtils.dataInit(res.body.data, option, 1);
						that.echartsData.echartsTrendData = that.echartsUtils.getInitOption("1", echartsDataInit);
					}
				});
			}
		}

	},

	getChangeTrend3: function (data, myoption) {
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[0]) {
			const that = this;
			this.$refs.eCharts2.clear();
			//判断是否存在两个指标，如果存在，则echart的采用第二个指标
			this.componentsMoudel.startPost(this.thisTab.itemData.url[0], data, false).then((res) => {
				let option = [];
				option = myoption.optionData[0].option;
				let echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
				that.echartsData.echartsTrendData3 = that.echartsUtils.getInitOption("1", echartsDataInit);
			});

		}

	},

	/**
	 * 参数构建
	 * @param {Object} monitoringData
	 * 当前界面各个选中的参数
	 */
	requestDataLocalInit: function (monitoringData, changeThrend) {
		const data = {};
		data.index = this.$route.query.id;
		if (monitoringData.fre === undefined) {
			data.fre = 1;
		} else {
			data.fre = monitoringData.fre;
		}
		if (monitoringData.area === undefined) {
			data.area = 1;
		} else {
			data.area = monitoringData.area;
		}
		//判断是否存在两个指标，如果存在，dataSourceInfoId使用第二个指标id，productId使用第一个指标id
		if (monitoringData.optionData[1]) {
			data.productId = monitoringData.optionData[0].id;
			data.dataSourceInfoId = monitoringData.optionData[1].id;
		} else {
			data.dataSourceInfoId = monitoringData.optionData[0].id;
		}
		data.appType = 1;
		data.isAllIndex = monitoringData.isAllIndex;
		data.hasQuanGuo = monitoringData.hasQuanGuo;
		data.tabType = monitoringData.optionData[0].type;
		data.time = monitoringData.startTimeValue;
		changeThrend.getChangeTrend(data);
		return data;
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
		// this.getChangeTrend();
	}
}
root.watch = {
	thisTab: function (newThisTab, oldThisTab) {
		if (newThisTab.itemData.value === this.thisName) {
			// this.getChangeTrend();
		}
	}
}

FactoryComponents.initComponent(root);