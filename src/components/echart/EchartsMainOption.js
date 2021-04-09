const mainOption = {
	//鼠标提示
	tooltip: {
		trigger: 'axis'
	},
	//x轴数据
	xAxis: {
		data: [],
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		}
	},
	//y轴数据
	yAxis: {
		splitLine: {
			show: true
		},
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		}

	},

	series: [{
			type: 'bar',
			data: [],
			itemStyle: {
				color: "#FFA516",
			},
			barWidth: '20%',
		},
		{
			type: 'bar',
			data: [],
			itemStyle: {
				color: "#03A9F4",
			},
			barWidth: '20%',
		},
		{
			type: 'line',
			data: [],
			lineStyle: {
				color: "#DE57F6",
			},
			itemStyle: {
				borderWidth: 1,
				color: "#DE57F6",
			}

		},
		{
			type: 'line',
			data: [],
			lineStyle: {
				color: "#3D8201",
			},
			itemStyle: {
				borderWidth: 1,
				color: "#3D8201",
			}
		
		}
	]
}
export default mainOption;