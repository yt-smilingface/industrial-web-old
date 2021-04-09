import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
import Plank from '../../../../template/moveMonitor/plank/Plank.vue';
import ChangeTrend from '../../../../template/moveMonitor/changeTrend/ChangeTrend.vue';
import AreaInfo from '../../../../template/moveMonitor/areaInfo/AreaInfo.vue';
import NationwideComparedInfo from '../../../../template/moveMonitor/nationwide/NationwideComparedInfo.vue';
const root = {}
root.components = {
	Plank,
	ChangeTrend,
	AreaInfo,
	NationwideComparedInfo
} //调用Echarts
//宏观运行监测-进出口总额
export default root
root.name = 'exitAndEntrance';
root.data = {

	//plank tab页显示标题
	slotData: [{
		value: '变化趋势',
		data: [{
			title: '云南省进出口总额变化趋势',
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
		fre: 3,
		//是否获取所有指标数据(0:否，1:是)
		isAllIndex: 0,
		//是否获取全国数据(0:否，1:是)
		hasQuanGuo: 0
	}, {
		value: '全国对比',
		data: [{
			title: '全国各省市进出口总额变化趋势',
			id: 2,
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 1,
				url: 'estate/getDropDownData',
				//是否开启时间选择器
				openTimeChoose: true,
				//开启排序
				openSort: true,
			},
		}, {
			title: '进出口总额变化趋势',
			model: {
				//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
				id: 0,
			},
		}],
		url: ['nationwide/getNationwideComparedInfo', 'nationwide/getOneNationwideComparedInfo'],
		fre: 3,
		area: 2,
		tabType: 0,
		isAllIndex: 0,
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