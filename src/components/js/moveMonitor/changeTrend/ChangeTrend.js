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
//变化趋势
export default root
root.name = 'changeTrend';
root.data = {
	//tab名称
	thisName: '变化趋势',

	//变化趋势图表
	echartsData: {
		echartsTrendData: {},
	},
	//当前选择的指标
	thisMonitoringData: {},

}
root.methods = {
	//指标选择
	chooseBack: function (data) {

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
		}
	},

	//获取变化趋势数据
	getChangeTrend: function (data) {
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[0]) {
			if (this.thisMonitoringData.optionData[0].id) {
				const that = this;
				this.$refs.eCharts.clear();
				// console.log(data)
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
						that.echartsData.echartsTrendData = that.echartsUtils.getInitOption("1", echartsDataInit);
					} else {
						echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);

						let a = that.echartsUtils.getInitOption("1", echartsDataInit);
						a.tooltip.formatter = function (params, ticket, callback) {
							var htmlStr = '';
							var valMap = {};
							for (var i = 0; i < params.length; i++) {
								var param = params[i];
								var xName = param.name; //x轴的名称  
								var seriesName = param.seriesName; //图例名称  
								var value = param.value; //y轴值  
								var color = param.color; //图例颜色  

								//过滤无效值
								if (value == '') {
									continue;
								}

								//过滤重叠值
								if (valMap[seriesName] == value) {
									continue;
								}

								if (i === 0) {
									htmlStr += xName + '<br/>'; //x轴的名称  
								}
								htmlStr += '<div>';
								//为了保证和原来的效果一样，这里自己实现了一个点的效果  
								htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';

								//圆点后面显示的文本  
								htmlStr += seriesName + '：' + value;

								htmlStr += '</div>';
								valMap[seriesName] = value;
							}
							return htmlStr;
						}

						that.echartsData.echartsTrendData = a;

					}

				});

			}
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
		data.time = new Date(monitoringData.startTimeValue + " 00:00:00").format("yyyy-MM-dd hh:mm:ss");
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