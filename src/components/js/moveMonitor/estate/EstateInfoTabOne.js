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
	name: '',
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
root.name = 'estateInfoTabOne';
root.data = {
	nameTwo: '',
	productionEchart: {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		toolbox: {
			feature: {}
		},
		legend: {
			data: ['工业总产值累计值（千元）', '工业总产值同比增速（%）', ]
		},
		xAxis: [{
			type: 'category',
			data: ['2019-10', '2019-11', '2019-12', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10'],
			axisPointer: {
				type: 'shadow'
			}
		}],
		yAxis: [{
				type: 'value',
				// name: '单位/万元',
				// min: 0,
				// max: 250,
				// interval: 100,
				axisLabel: {
					formatter: '{value}'
				}
			},
			{
				type: 'value',
				// name: '单位/件',
				// min: 0,
				// max: 25,
				// interval: 100,
				axisLabel: {
					formatter: '{value}'
				}
			}
		],
		series: [{
				name: '工业总产值累计值（千元）',
				type: 'bar',
				data: [31328730,
					35709799,
					41597063,
					6488337,
					10364197,
					12646347,
					16664878,
					16267311,
					24966731,
					28312039,
					35003238,
					42166446,
				],
				barWidth: 25,
				itemStyle: {
					normal: {
						color: '#4ad2ff'
					}
				}
			},
			{
				name: '工业总产值同比增速（%）',
				type: 'line',
				yAxisIndex: 1,
				data: [46.28,
					46.50,
					44.25,
					22.75,
					31.46,
					28.44,
					44.78,
					7.71,
					30.06,
					25.75,
					42.19,
					43.71
				],
				barWidth: 5,
				itemStyle: {
					normal: {
						color: '#DF9B68'
					}
				}
			},
		]
	},
	productionEchart2: {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		toolbox: {
			feature: {}
		},
		legend: {
			data: ['主营业务收入累计值（千元）', '主营业务收入同比增速（%）', ]
		},
		xAxis: [{
			type: 'category',
			data: ['2019-10', '2019-11', '2019-12', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10'],
			axisPointer: {
				type: 'shadow'
			}
		}],
		yAxis: [{
				type: 'value',
				// name: '单位/万元',
				// min: 0,
				// max: 250,
				interval: 100,
				axisLabel: {
					formatter: '{value}'
				}
			},
			{
				type: 'value',
				// name: '单位/件',
				// min: 0,
				// max: 25,
				// interval: 100,
				axisLabel: {
					formatter: '{value}'
				}
			}
		],
		series: [{
				name: '主营业务收入累计值（千元）',
				type: 'bar',
				data: [32809506,
					37529562,
					43100359,
					6701507,
					11091377,
					14799049,
					18877181,
					21782703,
					27580923,
					32211438,
					40290152,
					45249051,

				],
				barWidth: 25,
				itemStyle: {
					normal: {
						color: '#4ad2ff'
					}
				}
			},
			{
				name: '主营业务收入同比增速（%）',
				type: 'line',
				yAxisIndex: 1,
				data: [45.99,
					47.05,
					45.06,
					33.79,
					21.72,
					29.30,
					30.62,
					32.00,
					34.48,
					34.92,
					37.51,
					46.39

				],
				barWidth: 5,
				itemStyle: {
					normal: {
						color: '#DF9B68'
					}
				}
			},
		]
	},
	productionEchart3: {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		toolbox: {
			feature: {}
		},
		legend: {
			data: ['从业人员期末人数（人）', '从业人员期末人数同比增长（%）', ]
		},
		xAxis: [{
			type: 'category',
			data: ['2019-10', '2019-11', '2019-12', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10'],
			axisPointer: {
				type: 'shadow'
			}
		}],
		yAxis: [{
				type: 'value',
				// name: '单位/万元',
				// min: 0,
				// max: 250,
				// interval: 100,
				axisLabel: {
					formatter: '{value}'
				}
			},
			{
				type: 'value',
				// name: '单位/件',
				// min: 0,
				// max: 25,
				// interval: 100,
				axisLabel: {
					formatter: '{value}'
				}
			}
		],
		series: [{
				name: '从业人员期末人数（人）',
				type: 'bar',
				data: [27050,
					28494,
					29064,
					29419,
					29922,
					30334,
					28322,
					31169,
					30944,
					31492,
					28449,
					28461

				],
				barWidth: 25,
				itemStyle: {
					normal: {
						color: '#4ad2ff'
					}
				}
			},
			{
				name: '从业人员期末人数同比增长（%）',
				type: 'line',
				yAxisIndex: 1,
				data: [17.41,
					19.79,
					10.65,
					22.66,
					32.76,
					25.57,
					15.08,
					18.23,
					15.90,
					12.46,
					15.15,
					24.58

				],
				barWidth: 20,
				itemStyle: {
					normal: {
						color: '#DF9B68'
					}
				}
			},
		]
	},
	//tab名称
	thisName: '产业概况',

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
		if (data.startTimeValue) {
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
		}
	},

	//获取变化趋势数据
	getChangeTrend: function (data) {
		if (this.thisTab.itemData.url && this.thisTab.itemData.url[0]) {
			if (this.thisMonitoringData.optionData[0].id) {
				const that = this;
				this.$refs.eCharts.clear();
				console.log(data)
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
	this.nameTwo = this.$route.query.name;
	if (this.thisTab.itemData.value === this.thisName) {
		this.getChangeTrend();
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