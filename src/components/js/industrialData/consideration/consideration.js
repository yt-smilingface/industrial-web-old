import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'
import ECharts from 'vue-echarts';


const root = {}
export default root
root.name = 'Consideration';
root.components = {
    ECharts
}

root.data = {
    inputInfo: "", //搜索框的值
    dataInfo: { //  数据接口来源
        echartsData: [{
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 100,
                    inRange: {}
                },
                color: ['#FFCFA8', '#E9B6B9', '#CDBFE8', '#70D9DA', '#8EC9F4'],

                legend: {
                    left: 20,
                    bottom: 40,
                    data: ['国家统计局,158', '第三方数据,172', '政务交换数据,88.5'],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                },
                series: [{
                    name: '数据源结构',
                    type: 'pie',
                    center: ['50%', '42%'],
                    radius: '55%',
                    data: [{
                            value: 158,
                            name: '国家统计局,158',
                        },
                        {
                            value: 172,
                            name: '第三方数据,172',
                        },
                        {
                            value: 88.5,
                            name: '政务交换数据,88.5',
                        }
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    label: {
                        color: '#000',
                        fontSize: 14
                    },

                    labelLine: {
                        lineStyle: {
                            color: '#ccc'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }]
            },
            {
                visualMap: {
                    show: false,
                    min: 0,
                    max: 100,
                    inRange: {}
                },
                color: ['#FFCFA8', '#E9B6B9', '#CDBFE8', '#70D9DA', '#8EC9F4'],

                legend: {
                    left: 20,
                    bottom: 40,
                    data: ['成立1年内,131696', '成立1-5年,397341', '成立5-10年,188983', '成立10-15年,62389', '成立15年以上,50521'],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                },
                series: [{
                    type: 'pie',
                    center: ['46%', '42%'],
                    radius: '55%',

                    data: [{
                            value: 131696,
                            name: '成立1年内,131696',
                        },
                        {
                            value: 397341,
                            name: '成立1-5年,397341',
                        },
                        {
                            value: 185232,
                            name: '成立5-10年,185232',
                        },
                        {
                            value: 62389,
                            name: '成立10-15年,62389',
                        },
                        {
                            value: 50521,
                            name: '成立15年以上,50521',

                        },
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    label: {
                        color: '#000',
                        fontSize: 14
                    },

                    labelLine: {
                        lineStyle: {
                            color: '#ccc'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }]
            },
            {
                title: {
                    text: '数据实时动态',
                    x: 'center',
                    y: 'top',
                    textAlign: 'left',
                },
                dataset: {
                    source: [
                        [102, '网站关停'],
                        [226, '异常任务'],
                        [750, '正常运行'],
                        [907, '采集'],
                        [4058, '数据源'],

                    ]
                },
                grid: {
                    containLabel: true
                },
                xAxis: {
                    name: '',
                    axisLabel: {
                        formatter: '{value}',
                        interval: 0,
                        show: true,
                        splitNumber: 20,
                        textStyle: {
                            color: "#000",
                            fontSize: '14',
                        },
                    },
                    axisLine: {
                        show: true,
                    },
                    splitLine: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLabel: {
                        formatter: '{value}',
                        interval: 0,
                        show: true,
                        splitNumber: 5,
                        textStyle: {
                            color: "#ccc",
                            fontSize: '16',
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: '',
                        // Map the "product" column to Y axis
                        y: ''
                    },
                    barWidth: 25,
                    itemStyle: {
                        normal: {
                            color: '#4ba7e1'
                        },
                    },
                    label: {
                        show: true, //开启显示
                        position: 'right', //在上方显示
                        textStyle: { //数值样式
                            color: '#000',
                            fontSize: 16
                        }
                    }
                }]
            },
            {
                title: {
                    text: '数据服务走势',
                    x: 'center',
                    y: 'top',
                    textAlign: 'left',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#5B9BD5'
                        }
                    }
                },
                legend: {
                    left: '45%',
                    bottom: 10,
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    },
                    data: ['日服务量']
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['12-6', '12-7', '12-8', '12-9', '12-10', '12-11', '12-12',
                        '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'
                    ],
                    axisLabel: {
                        interval: 0,
                        rotate: 35,
                    },
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '日服务量',
                    type: 'line',
                    stack: '日服务量',
                    data: [22, 8, 13, 22, 32, 24, 19, 25, 22, 31, 22, 32, 20, 19, 30],
                    label: {
                        show: true, //开启显示
                        position: 'bottom', //在上方显示
                        textStyle: { //数值样式
                            color: '#000',
                            fontSize: 14
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#5B9BD5' //改变区域颜色
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#5B9BD5', //改变折线点的颜色
                            lineStyle: {
                                color: '#5B9BD5' //改变折线颜色
                            }
                        }
                    },
                }, ]
            },
            {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    color: '#000',
                    left: "center",
                    data: ['工商信息,92', 'GDP,69', '工业增加值,48', '固定资产投资,37', '采矿业36', '其他,59'],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    },
                    bottom: 0
                },
                series: [{
                    name: '热门服务数据',
                    type: 'pie',
                    radius: ['45%', '58%'],
                    data: [{
                            value: 92,
                            name: '工商信息,92'
                        },
                        {
                            value: 69,
                            name: 'GDP,69'
                        },
                        {
                            value: 48,
                            name: '工业增加值,48'
                        },
                        {
                            value: 36,
                            name: '采矿业,36'
                        },
                        {
                            value: 59,
                            name: '其他,59'
                        },
                        {
                            value: 37,
                            name: '固定资产投资,37'
                        },
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    label: {
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: 14
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }]
            },
            {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    left: 'center',
                    data: ['发展规划处', '经济运行处', '原材料工业处', '装备工业处', '消费品工业处',
                        '食品药品工业处', '信息化推进处', '石化产业处', '其他'
                    ],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    },
                    bottom: 0
                },
                radar: [{
                    indicator: [{
                            text: '发展规划处',
                            max: 350
                        },
                        {
                            text: '经济运行处',
                            max: 350
                        },
                        {
                            text: '原材料工业处',
                            max: 350
                        },
                        {
                            text: '装备工业处',
                            max: 350
                        },
                        {
                            text: '消费品工业处',
                            max: 350
                        },
                        {
                            text: '食品药品工业处',
                            max: 350
                        },
                        {
                            text: '信息化推进处',
                            max: 350
                        },
                        {
                            text: '石化产业处',
                            max: 350
                        },
                        {
                            text: '其他',
                            max: 341
                        },
                    ],
                    center: ['50%', '50%'],
                    radius: 130,
                    name: {
                        textStyle: {
                            color: '#000',
                            fontSize: 14
                        }
                    },
                }],
                series: [{
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    areaStyle: {},
                    data: [{
                        value: [0, 0, 0, 0, 0, 0, 0, 0, 341, ],
                        name: '其他'
                    }]
                }]
            },
        ],
        title: '数据来源结构'
    },

    //数据频度结构
    //数据服务走势
    serveInfo: {
        echartsData: {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['云南省固定投资增速', '全国省固定投资增速'],
                textStyle: {
                    fontSize: 16, //字体大小
                    color: '#000' //字体颜色
                },
            },
            grid: {
                left: '3%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12'],
                axisLabel: {
                    formatter: '{value}',
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "#000",
                        fontSize: '16',
                    },
                },

            },
            yAxis: {
                type: 'value',
                name: '%',
                min: -16,
                max: 16,
                interval: 4,
                axisLabel: {
                    formatter: '{value}',
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "#000",
                        fontSize: '16',
                    },
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                    name: '云南省固定投资增速',
                    type: 'line',
                    data: [2, 2, 10, 12, 0, -1, -3, 9, 8, 7, 4, 1],
                    itemStyle: {
                        normal: {
                            color: '#3FD1FD'
                        }
                    },
                }

            ]
        },
        title: '数据服务走势'
    }
    //热门服务目录
    //热门服务机构

}
root.methods = {


}

root.mounted = function () {

}
FactoryComponents.initComponent(root);