const echartsMacroTrendOption = {
	title: {
		text: '',
		x: 'center',
		textStyle: {
			color: '#087EBE',
			fontSize: '16px'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			crossStyle: {
				color: '#999'
			}
		},
	},
	legend: {},
	grid: {
		y2: '18%',
	},
	xAxis: [{
		type: 'category',
		data: [],
		axisPointer: {
			type: 'shadow'
		},
		axisLabel: {
			interval: 0,
			rotate: 35,
		}
	}],
	yAxis: [{
			type: 'value',
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				formatter: '{value}'
			},
			splitNumber: 4,
		},
		{
			type: 'value',
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				formatter: '{value}%'
			},
			splitNumber: 4,
		}
	],
	series: []
}
export default echartsMacroTrendOption;