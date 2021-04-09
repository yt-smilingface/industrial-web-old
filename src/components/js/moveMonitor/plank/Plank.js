import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
const root = {}
root.props = {
	//slot数据
	slotData: Array,
	//默认界面
	defItem: Number,
	//是否显示右上角按钮
	showBtn: Boolean,
};
export default root
root.name = 'plank';
root.data = {
	//绑定的slot数据
	showSlotData: [],
	//显示默认的界面
	showDefItem: '0',
	//当前界面
	index: 0,

	//按钮状态,true显示，false隐藏
	btnStatus: {
		//下载按钮状态
		down: false,
		//图表与表格切换
		status: true,
	},
	monitoringData: [],

}
root.watch = {
	slotData: function (newSlotData, oldSlotData) {
		console.log(this.showSlotData);
		if (newSlotData) {
			newSlotData.forEach((item, index) => {
				this.showSlotData.push({
					...item,
					id: index,
					slot: 'p' + index
				})
			})
		}
	},
}
root.methods = {

		//tab页面选择
		tabChange: function (tab, event) {
			const index = parseInt(tab.index);
			this.index = index;
			const data = {
				index: index,
				itemData: this.showSlotData[index]
			}
			this.$emit('tabChange', data)
		},

		//点击下载按钮
		clickDownload: function () {
			const data = {
				index: this.index,
				itemData: this.showSlotData[this.index]
			}
			this.$emit('clickDownload', data, this)
		},

		//隐藏下载按钮
		hiddenDowload: function () {
			this.btnStatus.down = false;
		},

		//显示下载按钮
		showDowload: function () {
			this.btnStatus.down = true;
		},

		//切换到表格
		checkoutTg: function () {
			this.btnStatus.status = false;
		},
		//切换到图表
		checkoutTb: function () {
			this.btnStatus.status = true;
		},

		//切换状态按钮
		checkoutChange: function (status) {
			if (status) {
				this.hiddenDowload();
			} else {
				this.showDowload();
			}
			this.btnStatus.status = status;
			const data = {
				index: this.index,
				itemData: this.showSlotData[this.index]
			}
			this.$emit('checkoutChange', status, data, this)
		},

	},
	root.mounted = function () {
		if (this.slotData) {
			this.slotData.forEach((item, index) => {
				this.showSlotData.push({
					...item,
					id: index,
					slot: 'p' + index
				})
			})
			if (this.defItem) {
				this.showDefItem = this.defItem + '';
				this.index = this.defItem;
			}
		}
		const data = {
			index: 0,
			itemData: this.showSlotData[0]
		}
		this.$emit('tabChange', data)
	}

FactoryComponents.initComponent(root);