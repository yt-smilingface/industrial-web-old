const echartsJuxtaposeOption = {
    title: {
        text: '',
        x: 'center',
        textStyle: {
            color: '#087EBE',
            fontSize: 18
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
    legend: {},
    grid: {
        // height: '60%',
        y2: '40%'
    },
    xAxis: [{
        type: 'category',
        data: [],
        axisPointer: {
            type: 'shadow'
        },
        axisLabel: {
            interval: 0,
            rotate: 40,
            formatter: function (value, index) {
                const values = value.split("-");
                return values[0];
            },
            show: true,
            textStyle: {
                fontSize: '10'
            }

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
            }
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
            }
        }
    ],
    series: []
}
export default echartsJuxtaposeOption;