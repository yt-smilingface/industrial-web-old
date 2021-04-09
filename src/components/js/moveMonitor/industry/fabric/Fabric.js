import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
import Plank from '../../../../template/moveMonitor/plank/Plank.vue';
import ProfessionAddValue from '../../../../template/moveMonitor/professionAddValue/ProfessionAddValue.vue';
import ProfessionPercentage from '../../../../template/moveMonitor/professionPercentage/ProfessionPercentage.vue';
const root = {}
root.components = {
	Plank,
	ProfessionAddValue,
	ProfessionPercentage
} //调用Echarts
export default root
//工业运行监测-分行业增加值
root.name = 'situation';
root.data = {

	//plank tab页显示标题
	slotData: [{
		value: '行业增加值增速',
		data: [{
			title: '云南省分行业规上工业增加值增速',
			id: 3,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 1,
				url: 'estate/getDropDownData',
				//是否开启时间选择器
				openTimeChoose: true,
			},
		}, {
			title: '行业规上工业增加值增速变化趋势',
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 0
			},
		}],
		//行业增加值增速
		url: ['business/getIndustryData', 'business/getOneIndustryData'],
		fre: 1,
		area: 2
	}, {
		value: '行业增加值占比',
		data: [{
			title: '云南省分行业规上工业增加值占比',
			id: 4,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 1,
				url: 'estate/getDropDownData',
				//是否开启时间选择器
				openTimeChoose: false,
			},
		}, {
			title: '行业规上工业增加值占比变化趋势',
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 0
			},
		}],
		//行业增加值占比
		url: ['business/getPercentageData', 'business/getOnePercentage'],
		fre: 1,
		area: 2,
	}],

	//当前tab页
	thisTab: {},
}

root.methods = {

	//tab页切换
	tabChange: function (tab, event) {
		this.thisTab = tab;
	},

	//点击了下载按钮
	clickDownload: function (data, refPlank) {

	},


	//plank右上角状态切换
	checkoutChange: function (status, data, refPlank) {

	},

}
FactoryComponents.initComponent(root);