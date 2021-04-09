import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
import Plank from '../../../template/moveMonitor/plank/Plank.vue';
import TabOne from '../../../template/moveMonitor/estate/EstateInfoTabOne.vue'
import TabThree from '../../../template/moveMonitor/estate/EstateInfoTabThree.vue'
import TabTwo from '../../../template/moveMonitor/estate/EstateInfoTabTwo.vue'

import TabFour from '../../../template/moveMonitor/estate/EstateInfoTabFour.vue'
const root = {}
root.components = {
	Plank,
	TabOne,
	TabTwo,
	TabThree,
	TabFour
};
//重点产业运行监测
export default root
root.name = 'estateInfo';

root.data = {
	key: 1,
	//plank tab页显示标题
	slotData: [{
			value: '产业概况',
			data: [{
					//title标题
					title: '',
					title2: '产业工业总产值变化趋势',
					//tab页内部业务逻辑id,该id在获取处理指标时需要用到,如果model.id为0的情况，可不填
					id: 7,
					//title加载模式
					model: {
						//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
						id: 0,

					},
				}, {
					//title标题
					title: '',
					title2: '产业主营业务收入变化趋势',
					//tab页内部业务逻辑id,该id在获取处理指标时需要用到,如果model.id为0的情况，可不填
					id: 7,
					//title加载模式
					model: {
						//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
						id: 0,

					},
				},
				{
					//title标题
					title: '',
					title2: '产业从业人员变化趋势',
					//tab页内部业务逻辑id,该id在获取处理指标时需要用到,如果model.id为0的情况，可不填
					id: 7,
					//title加载模式
					model: {
						//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
						id: 0,

					},
				}
			],
			//变化趋势接口
			url: ['changeTrend/getIndustryChangeTrend'],
			fre: 1,
			area: 2,
			isAllIndex: 0,

		}, {
			value: '产业图谱',
			data: [{
				title: '',
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
				title: '固定资产投资变化趋势',
				model: {
					//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
					id: 0,
				},
			}],
			// url: ['monitoring/getAreaInfo', 'monitoring/getDataInfoByAreaCode'],
			fre: 0,
			area: 0,
		},
		//  {
		// 	value: '产业企业分布',
		// 	data: [{
		// 		title: '云南省固定资产投资区域分布',
		// 		//tab页内部业务逻辑id,该id在获取处理指标时需要用到
		// 		id: 1,
		// 		model: {
		// 			//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
		// 			id: 1,
		// 			url: 'estate/getDropDownData',
		// 			//是否开启时间选择器
		// 			openTimeChoose: true,
		// 		},
		// 	}, {
		// 		//title2的标题
		// 		title: '固定资产投资变化趋势',
		// 		model: {
		// 			//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
		// 			id: 0,
		// 		},
		// 	}],
		// 	// url: ['monitoring/getAreaInfo', 'monitoring/getDataInfoByAreaCode'],
		// 	fre: 0,
		// 	area: 0,
		// }, {
		// 	value: '重点企业画像',
		// 	data: [{
		// 		title: '全国各省市固定资产投资对比',
		// 		//tab页内部业务逻辑id,该id在获取处理指标时需要用到
		// 		id: 2,
		// 		model: {
		// 			//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
		// 			id: 1,
		// 			url: 'estate/getDropDownData',
		// 			//是否开启时间选择器
		// 			openTimeChoose: true,
		// 		},
		// 	}, {
		// 		title: '固定资产投资变化趋势',
		// 		model: {
		// 			//当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
		// 			id: 0,
		// 		},
		// 	}],
		// 	//url: ['monitoring/getNationwideComparedInfo', 'monitoring/getOneNationwideComparedInfo'],
		// 	fre: 0
		// }
	],

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
root.watch = {
	$route(to, from) {
		++this.key;
	}
}
// root.mounted = {

// 	// this.name = this.$route.query.name;
// }

FactoryComponents.initComponent(root);