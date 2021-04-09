const echartsAeraOption = {
	title: {
		text: '',
		x: 'center',
		textStyle: {
			color: '#087EBE',
			fontSize: 16,
		}
	},
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
		feature: { // 右上角功能按钮

		}
	},
	xAxis: [{
		type: 'category',
		data: [],
		axisPointer: {
			type: 'shadow'
		},
		axisLabel: {
			interval: 0,
			rotate: 40
		}
	}],
	yAxis: [{
		type: 'value',
	}],
	series: [{
		name: '',
		type: 'line',
		color: '#FFA516',
		data: []
	}]
}
export default echartsAeraOption;
