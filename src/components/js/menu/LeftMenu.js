import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';

const root = {}
export default root
root.name = 'LeftMenu';
root.props = {
	//当前菜单目录id
	index: Number
}
root.data = {
	//左边菜单标签
	menuTitle: {
		data: [],
		//选中的菜单
		chooseItem: {},
	},
	menuIndex: ''
}
root.methods = {
	//打开关闭菜单
	changeMenuStatus: function (item) {
		if (item.url) {
			if (item.url !== this.$route.path || item.id + '' !== this.$route.query.id) {
				console.dir(item)
				this.$router.push({
					path: item.url,
					query: {
						id: item.id,
						monitorType: this.menuIndex,
						name: item.directoryName,
					}
				});
			}
			if (!item.status) {
				this.$set(item, "status", 0);
			}
			if (item.status === undefined || item.status === 0) {
				if (this.menuTitle.chooseItem[0]) {
					this.menuTitle.chooseItem[0].status = 0;
				}
				this.menuTitle.chooseItem[0] = item;
				this.menuTitle.chooseItem[0].status = 1;
				this.$emit('openMenu', item)
			}
		} else {
			if (item.status === 1) {
				item.status = 0;
			} else {
				if (item.status) {
					item.status = 1;
				} else {
					this.$set(item, "status", 1);
				}

			}

		}
	},

	getMenu: function (newIndex = 8) {
		if (this.$route.query.index) {
			localStorage.setItem('index', this.$route.query.index);
		}
		if (this.$route.query.index) {
			newIndex = this.$route.query.index;
		} else {
			// console.log(localStorage.getItem('index'));
			newIndex = localStorage.getItem('index');
		}
		let url = 'monitoring/getMenu/' + newIndex;
		if (newIndex == '2') {
			url = 'industry/getLeftInfo/2'
		}
		if (newIndex == '3') {
			url = 'industry/getLeftInfo/3'
		}
		const that = this;
		this.componentsMoudel.startGet(url, {}, false).then(res => {
			let directoryName = '';
			if (that.index == 0) {
				directoryName = "宏观运行监测";
			}
			if (that.index == 1) {
				directoryName = "工业运行监测";
			}
			if (that.index == 2) {
				directoryName = "工业行业监测";
			}
			if (that.index == 3) {
				directoryName = "重点产业监测";
			}

			// if(newIndex == 8) {
			// 	let data = res.body.data
			// 	let arr = []
			// 	data.forEach(item => {
			// 		arr = arr.concat(item.childMenu)
			// 	});
			// 	that.menuTitle.data.push({
			// 		id: 0,
			// 		directoryName: directoryName,
			// 		gmtCreate: "2020-09-30 17:24:38",
			// 		parenId: 0,
			// 		type: 0,
			// 		childMenu: arr
			// 	})
			// } else {
			// 	that.menuTitle.data.push({
			// 		id: 0,
			// 		directoryName: directoryName,
			// 		gmtCreate: "2020-09-30 17:24:38",
			// 		parenId: 0,
			// 		type: 0,
			// 		childMenu: res.body.data
			// 	})
			// }

			that.menuTitle.data.push({
				id: 0,
				directoryName: directoryName,
				gmtCreate: "2020-09-30 17:24:38",
				parenId: 0,
				type: 0,
				childMenu: res.body.data
			})

			that.$set(that.menuTitle.data[0], "status", 1);
		});
	}

}
root.watch = {
	menuIndex: function (newIndex, oldIndex) {
		this.getMenu(newIndex);
	}
}
root.mounted = function () {

	this.menuIndex = this.$route.query.index;
	// this.getMenu(this.index);
	// console.log(this.menuTitle.data)
}
FactoryComponents.initComponent(root);