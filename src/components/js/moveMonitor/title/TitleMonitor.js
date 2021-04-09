import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
const root = {}
root.props = {
	//标题
	titleData: Object,
	//字体大小
	fontSize: String,
	//当前tab页的相关数据
	thisTabData: Object,
	//获取数据的时间
	callBackTime: String,
	//h获取主要产品产量的参数
	callBackData: Object,
	callBackData2: Object,


};
export default root
root.name = 'titleMonitor';
root.data = {

		//标题
		showTitle: '标题',
		//标题字体大小
		showFontSize: '15px',
		//标题配置
		titleConfig: [{
			//指标选择框
			showOption: [],
			//指标数据的map对象
			optionMap: {},
			//默认选中内容
			couponSelected: 0,
		}, {
			//指标选择框
			showOption: [],
			//指标数据的map对象
			optionMap: {},
			//默认选中内容
			couponSelected: 0,
		}],
		//时间选择器开始时间
		startValue: '',
	},
	root.methods = {

		//选择框改变时回调
		chooseChange: function (data, pos) {

			this.issuedData(pos);
			this.callBackData2.isFirst = false;
		},

		//排序模式
		sortClick: function (code) {
			this.$emit('sortClick', code)
		},

		//时间选择回调
		timeChoose: function (data) {
			this.issuedData(1);
		},

		//获取指标
		getMonitoringOne: async function (url, pictureType = 0) {
			const that = this;
			let data = {};
			console.log(this.thisTabData);

			if (this.callBackData) {
				data = {
					...this.callBackData
				}
			} else {
				data.index = this.$route.query.id;
				data.tabType = this.titleData.id;
				data.dataSourceInfoId = this.$route.query.id;
				data.pictureType = pictureType;
			}
			const res = await this.componentsMoudel.startPost(url, data, false);
			this.titleConfig[0].showOption = res.body.data;
			if (this.openTimeChoose) {
				this.startValue = new Date("06 30,2020").format("yyyy-MM-dd");
			}
			if (this.titleConfig[0].showOption && this.titleConfig[0].showOption.length > 0) {
				//设置默认选择中项
				const defalutIndex = this.titleData.model.defalutIndex ? this.titleData.model.defalutIndex : 0

				this.titleConfig[0].couponSelected = this.titleConfig[0].showOption[defalutIndex].id;

				if (this.titleData.model.id === 1) {
					this.issuedData(this.titleConfig[0].couponSelected, 0);
				}
			} else {
				this.titleConfig[0].couponSelected = "暂无数据";
			}
		},

		//获取指标2
		getMonitoringTwo: async function (url, productId) {
			if ("暂无数据" === productId) {
				this.titleConfig[1].couponSelected = "暂无数据";
			} else {
				let data = {}
				if (this.callBackData2 && this.callBackData2.isFirst) {
					data = this.callBackData2;
				} else {
					data = {
						productId: productId
					}
				}
				const res = await this.componentsMoudel.startPost(url, data, false);
				this.titleConfig[1].showOption = res.body.data;
				if (this.titleConfig[1].showOption && this.titleConfig[1].showOption.length > 0) {
					this.titleConfig[1].couponSelected = this.titleConfig[1].showOption[0].id;
					this.issuedData(1);
				} else {
					this.titleConfig[1].couponSelected = "暂无数据";
				}
			}


		},


		typeData: async function () {
			if (this.titleData.model.id === 1) {
				if (this.titleData.model.url) {
					this.getMonitoringOne(this.titleData.model.url, this.titleData.model.pictureType);
				}
			}
			if (this.titleData.model.id === 2) {
				if (this.titleData.model.url) {
					await this.getMonitoringOne(this.titleData.model.url, this.titleData.model.pictureType);
				}
				if (this.titleData.model.url2) {
					await this.getMonitoringTwo(this.titleData.model.url2, this.titleConfig[0].couponSelected);
				}

			}
		},

		/**
		 * 向tab页下发数据
		 * @param {*} pos 
		 * 0:第一种指标选项
		 * 1:第二种指标选项
		 */
		issuedData: function (pos) {
			if (this.titleData.model.id === 1) {
				const option = this.titleConfig[0].showOption;
				if (option && option.length > 0) {
					//将指标数据转换成对应的map数据格式
					option.forEach((item, index) => {
						this.titleConfig[0].optionMap[item.id + ""] = item.dataItem;
					});
					//将数据发送给各个tab页面
					const chooseData = {
						optionData: [{
							id: this.titleConfig[0].couponSelected,
							dataItem: this.titleConfig[0].optionMap[this.titleConfig[0].couponSelected],
							option: this.titleConfig[0].optionMap,
							type: this.titleData.id,
						}],
						startTimeValue: this.startValue ? this.startValue : '',

					}
					this.$emit('chooseBack', chooseData)
				}
			}
			if (this.titleData.model.id === 2) {
				if (pos === 0) {
					this.getMonitoringTwo(this.titleData.model.url2, this.titleConfig[0].couponSelected);
				}
				if (pos === 1) {
					const option = this.titleConfig[0].showOption;
					const option2 = this.titleConfig[1].showOption;
					if (option && option.length > 0 && option2 && option2.length > 0) {
						//将指标数据转换成对应的map数据格式
						option.forEach((item, index) => {
							this.titleConfig[0].optionMap[item.id + ""] = item.dataItem;
						});
						//将指标数据转换成对应的map数据格式
						option2.forEach((item, index) => {
							this.titleConfig[1].optionMap[item.id + ""] = item.dataItem;
						});
						//将数据发送给各个tab页面
						const chooseData2 = {
							optionData: [{
								id: this.titleConfig[0].couponSelected,
								dataItem: this.titleConfig[0].optionMap[this.titleConfig[0].couponSelected],
								option: this.titleConfig[0].optionMap,
								type: this.titleData.id,
							}, {
								id: this.titleConfig[1].couponSelected,
								dataItem: this.titleConfig[1].optionMap[this.titleConfig[1].couponSelected],
								option: this.titleConfig[1].optionMap,
								type: this.titleData.id,
							}],
							startTimeValue: this.startValue,
						}
						this.$emit('chooseBack', chooseData2)
					}

				}
			}
		}
	},
	root.watch = {
		titleData: function (newTitle, oldTitle) {
			if (newTitle) {
				this.showTitle = newTitle.title;
				if (this.showTitle.indexOf('-') > 0) {
					this.showTitle = this.showTitle.replace('-', this.$route.query.name)
				}
			}
		},
		fontSize: function (newOption, oldOption) {
			this.showFontSize = newOption;
		},
		callBackTime: function () {
			this.startValue = this.callBackTime + '00:00:00';
		}
	},
	root.mounted = function () {

		console.log(this.thisTabData);


		if (this.titleData) {
			this.showTitle = this.titleData.title;
			if (this.showTitle.indexOf('-') > 0) {
				this.showTitle = this.showTitle.replace('-', this.$route.query.name)
			}
		}
		if (this.fontSize) {
			this.showFontSize = this.fontSize;
		}
		if (this.titleData.model.id != 0) {
			// if (this.thisTabData.itemData.fre === 2) {
			// 	this.startValue = new Date("06 30,2020").format("yyyy-MM-dd");
			// } else {
			// 	this.startValue = new Date("08 31,2020").format("yyyy-MM-dd");
			// }
			this.startValue = null;
			if (this.thisTabData.itemData.time) {
				this.startValue = new Date(this.thisTabData.itemData.time).format("yyyy-MM-dd HH-mm-ss");
			}
		}
		this.typeData();
	},

	FactoryComponents.initComponent(root);