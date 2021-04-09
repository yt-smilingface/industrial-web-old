const mainOption = {

	legend: {
		right: 0,
		orient: 'vertical',
        top: '10%',
		data: []
    },
    tooltip: {
        formatter: '{b0}'
	},

	series: [{
		type: 'pie',
        center: ['150%', '50%'],
        data: [],
        animation: true,
        hoverAnimation: false,
        legendHoverLink: true,
        selectedMode: 'single',
        selectedOffset: 2,
        label: {
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 5,
            show: false
        },
        radius:['50%', '100%'],
        left: 0,
        right: '66.6667%',
        top: 0,
        bottom: 0
	},
	]
}
export default mainOption;