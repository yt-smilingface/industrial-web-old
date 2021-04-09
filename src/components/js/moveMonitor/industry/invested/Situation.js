import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
import Plank from '../../../../template/moveMonitor/plank/Plank.vue';
import ChangeTrend from '../../../../template/moveMonitor/changeTrend/ChangeTrend.vue';
import AreaInfo from '../../../../template/moveMonitor/areaInfo/AreaInfo.vue';
import IndustrialDistribution from '../../../../template/moveMonitor/industrialDistribution/IndustrialDistribution.vue';

import ProfessionAddValue from '../../../../template/moveMonitor/professionAddValue/ProfessionAddValue.vue';
import ProfessionPercentage from '../../../../template/moveMonitor/professionPercentage/ProfessionPercentage.vue';
const root = {}
root.components = {
	Plank,
	ChangeTrend,
	AreaInfo,
	IndustrialDistribution,
	ProfessionAddValue,
	ProfessionPercentage

} //调用Echarts
export default root
//工业运行监测-工业投资整体情况
root.name = 'situation';
root.data = {

	//plank tab页显示标题
	slotData: [{
		value: '变化趋势',
		data: [{
			title: '云南省投资增速变化趋势',
			id: 0,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 1,
				url: 'estate/getDropDownData',
				//是否开启时间选择器
				openTimeChoose: false,
			},
		}],
		//变化趋势接口
		url: ['changeTrend/getChangeTrend'],
		//1-地州，2-分省，3-全国
		area: 2,
		// 1-月度，2-季度，3-年度
		fre: 1,
		//是否获取所有指标数据(0:否，1:是)
		isAllIndex: 1,
		//是否获取全国数据(0:否，1:是)
		hasQuanGuo: 0
	}, {
		value: '区域分布',
		data: [{
			title: '云南省工业投资整体情况区域分布',
			id: 1,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 1,
				url: 'estate/getDropDownData',
				//是否开启时间选择器
				openTimeChoose: true,
			},
		}, {
			title: '投资增速变化趋势',
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 0
			},
		}],
		url: ['regional/getAllRegionalInfo', 'regional/getAllIndexDataInfoByAreaCode'],
		fre: 1,
		isAllIndex: 1,
		area: 1,
	}, {
		value: '行业分布',
		data: [{
			title: '云南省投资增速行业分布',
			id: 5,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 1,
				url: 'estate/getDropDownData',
				//是否开启时间选择器
				openTimeChoose: true,
				openSort: true,
			},
		}, {
			title: '行业投资增速变化趋势',
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 0,
			},
		}],
		url: ['business/getIndustryData', 'business/getOneIndustryData'],
		fre: 1,
		area: 2
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