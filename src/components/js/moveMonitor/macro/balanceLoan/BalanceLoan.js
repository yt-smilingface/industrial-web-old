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
//宏观运行监测-余额贷款
export default root
root.name = 'balanceLoan';
root.data = {

	//plank tab页显示标题
	slotData: [{
		value: '变化趋势',
		data: [{
			title: '云南省金融机构人民币贷款余额变化趋势',
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
		isAllIndex: 0,
		//是否获取全国数据(0:否，1:是)
		hasQuanGuo: 0
	}],

	//当前tab页
	thisTab: {},
}

root.methods = {
	//tab页切换
	tabChange: function(tab, event) {
		this.thisTab = tab;
	},

	//点击了下载按钮
	clickDownload: function(data, refPlank) {

	},


	//plank右上角状态切换
	checkoutChange: function(status, data, refPlank) {
		
	},

}

FactoryComponents.initComponent(root);
