import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
import Plank from '../../../template/moveMonitor/plank/Plank.vue';
import TabFour from '../../../template/moveMonitor/estate/EstateInfoTabFour.vue'

import TabOne from '../../../template/moveMonitor/business/BusinessInfoTabOne.vue'
import TabTwo from '../../../template/moveMonitor/business/BusinessInfoTabTwo.vue'
const root = {}
root.components = {
	Plank,
	TabOne,
	TabTwo,
	TabFour
};
//行业运行监测
export default root
root.name = 'businessInfo';

root.data = {
	key: 1,
	//plank tab页显示标题
	slotData: [{
			value: '行业运行监测',
			data: [{
					//title标题
					title: '云南省-变化趋势',
					//tab页内部业务逻辑id,该id在获取处理指标时需要用到,如果model.id为0的情况，可不填
					id: 7,
					//title加载模式
					model: {
						//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
						id: 1,
						url: 'estate/getDropDownData2',
						//是否开启时间选择器
						openTimeChoose: false,
					},
				},
				{
					//title标题
					title: '云南省主要产品产量变化趋势',
					//tab页内部业务逻辑id,该id在获取处理指标时需要用到,如果model.id为0的情况，可不填
					id: 7,
					//title加载模式
					model: {
						//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
						id: 2,
						url: 'estate/getDropDownData',
						url2: 'estate/getTargetByProduct',
						//是否开启时间选择器
						openTimeChoose: false,
					},
				},
				{
					//title标题
					title: '云南省工业投资-变化趋势',
					//tab页内部业务逻辑id,该id在获取处理指标时需要用到,如果model.id为0的情况，可不填
					id: 7,
					//title加载模式
					model: {
						//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
						id: 1,
						url: 'estate/getDropDownData2',
						//是否开启时间选择器
						openTimeChoose: false,
						pictureType: 1
					},
				}
			],
			//变化趋势接口
			url: ['changeTrend/getIndustryChangeTrend', "changeTrend/getChangeTrend"],
			fre: 1,
			area: 2,
			isAllIndex: 0,
		},
		{
			value: '行业企业分布',
			data: [{
				title: '',
				title2: '行业企业分布',
				//tab页内部业务逻辑id,该id在获取处理指标时需要用到
				id: 1,
				model: {
					//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
					id: 0,
					url: 'estate/getDropDownData',
					//是否开启时间选择器
					openTimeChoose: true,
				},
			}, {
				//title2的标题
				title: '-',
				model: {
					//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
					id: 0,
				},
			}],
			// url: ['monitoring/getAreaInfo', 'monitoring/getDataInfoByAreaCode'],
			fre: 0,
			area: 0,
		},
		{
			value: '重点企业画像',
			data: [{
				title: '全国各省市计算机、通信和其他电子设备制造业',
				//tab页内部业务逻辑id,该id在获取处理指标时需要用到
				id: 2,
				model: {
					//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
					id: 1,
					url: 'estate/getDropDownData',
					//是否开启时间选择器
					openTimeChoose: true,
				},
			}, {
				title: '计算机、通信和其他电子设备制造业',
				model: {
					//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
					id: 0,
				},
			}],
			//url: ['monitoring/getNationwideComparedInfo', 'monitoring/getOneNationwideComparedInfo'],
			fre: 0
		}
	],

	//当前tab页
	thisTab: {},
}

root.methods = {

	//tab页切换
	tabChange: function (tab, event) {
		let that = this;
		that.thisTab = tab;
	},

	//点击了下载按钮
	clickDownload: function (data, refPlank) {

	},


	//plank右上角状态切换
	checkoutChange: function (status, data, refPlank) {

	},

	getTabOne(thisTab, titleName) {
		let tabOne = Vue.component("TabOne", TabOne);
		return tabOne;
	}

}

root.watch = {
	$route(to, from) {
		++this.key;
	}
}

FactoryComponents.initComponent(root);