import Vue from 'vue';
import FactoryComponents from '../../factory/components/FactoryComponents.js';
import ECharts from 'vue-echarts';

import CenterChangeTrend from '../template/personalCenter/ChangeTrend/CenterChangeTrend';

import DataCoverUtils from '../js/moveMonitor/DataCoverUtils';

const root = {}
export default root
root.name = 'OperatingGuide';
root.components = {
    ECharts,
    CenterChangeTrend
} //位置信息

root.data = {
    //记录条数
    shownum: null,
    isShow: 1,
    //当前tab页
    thisTab: {},
    //plank tab页显示标题
    slotData: [{
        value: '变化趋势',
        data: [{
            title: '云南省、全国地区生产总值（GDP）变化趋势',
            id: 0,
            model: {
                //当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
                id: 1,
                url: 'estate/getDropDownData',
                //是否开启时间选择器
                openTimeChoose: true,
            },
        }],
        //变化趋势接口
        url: ['changeTrend/getChangeTrend'],
        fre: 0
    }],
    //变化趋势图表
    echartsData: {
        echartsTrendData: {},
    },
    myMenu: [],
    thisData: [
        [{
            area: 1,
            dataSourceInfoId: 157,
            fre: 1,
            index: "6",
            tabType: 0,
            time: "2020-10-21 00:00:00"
        }, {
            area: 1,
            dataSourceInfoId: 163,
            fre: 0,
            index: "7",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }, {
            area: 1,
            dataSourceInfoId: 169,
            fre: 0,
            index: "8",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }, {
            area: 1,
            dataSourceInfoId: 175,
            fre: 0,
            index: "10",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }],
        [{
            area: 1,
            dataSourceInfoId: 1,
            fre: 0,
            index: "22",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }, {
            area: 1,
            dataSourceInfoId: 6,
            fre: 0,
            index: "23",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }, {
            area: 1,
            dataSourceInfoId: 132,
            fre: 0,
            index: "26",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }, {
            area: 1,
            dataSourceInfoId: 136,
            fre: 0,
            index: "27",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }, {
            area: 1,
            dataSourceInfoId: 140,
            fre: 0,
            index: "28",
            tabType: 0,
            time: "2020-10-22 00:00:00",
        }]

    ],
    secondMenu: {
        工业行业运行监测: [],
        宏观经济运行监测: [],
        工业经济运行监测: []
    }, //二级菜单
    userInfo: {
        governmenuserInfoVo: {}
    },
    lastTime: '2020年8月10日  09:15:00',
    userImage: require('../../assets/login/Profile-picture.png'),
    information: require('../../assets/information@2.png'),
    Library: [
        require('../../assets/hongguandata.png'),
        require('../../assets/gongyedata.png'),
        require('../../assets/hangyedata.png'),
        require('../../assets/ctiydata.png'),
        require('../../assets/firmdata.png'),
    ],
    LibraryData: ['宏观经济库', '工业经济库', '工业行业经济库', '工业企业库', '主题数据库'],
    LibraryTo: ['/dataDirectoryQuery?LevelId=1', '/dataDirectoryQuery?LevelId=2', '/dataDirectoryQuery?LevelId=3', '/dataDirectoryQuery?LevelId=870', "#"],
    nwesNumber: 0,
    activeName: 'first',
    tabPosition: 'right',
    industry: [],
    userAuthority: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //权限

    Authority1: 1, //用户角色
    // activeIndex: JSON.parse(sessionStorage.getItem(md5('jurisdiction'))).activeIndex,
    AddOns: [],

    searchForData: { //工业经济数据库搜索数据
        input1: '',
        options: [{
                value: '0',
                label: '全部'
            },
            {
                value: '1',
                label: '企业'
            },
            {
                value: '2',
                label: '数据'
            }
        ],
        select1: '0'
    },
    //工业经济运行监测
    testData: {
        index: 2,
        industryTitle: 0,
        industryTitleTwo: 0,
        //echarts 图表数据
        echartsData: {
            option: {
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
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: ['蒸发量', '降水量', '平均温度']
                },
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                        type: 'value',
                        name: '水量',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: '温度',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [{
                        name: '蒸发量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '降水量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        name: '平均温度',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            }

        },
        //  列表数据
        listData: [
            ["地区生产总值（GDP）", "居民消费价格指数（CPI）", "工业出厂价格指数（PPI）", "固定资产投资", "社会消费零售总额", "进出口总额"],
            ["地区生产总值", "居民消费价格指数（CPI）", "工业出厂价格指数（PPI）", "固定资产投资", "社会消费零售总额", "进出口总额"],
        ],
        industryMonitorDataTwo: [{
                name: '装备制造业',
                sort: ['金属制品', '通用设备', '专用设备']
            },
            {
                name: '原材料工业',
                sort: ['黑金属矿采选业', '有色金属矿采选业', '非金属矿采选业']
            }
        ],
        listDataIndex: 0,
        listDataInput: '',
        listDataSelect: ''
    },
    //工业经济数据库
    industryData: {
        data: [{
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
        }, ],
        dataInformation: [

        ],
        dataText: ['聘宇科技有限公司', '研发投入', '信息产业', '工业增加值', '云南省', '产量', '云南立天科技有限公司', '主营业务收入', '市州工业增速', '从业人数', '规模以上'],
        dataTextTop: [9, 10, -8, 9, -10, -27, -10, 5, -4, 0, 1],
        dataTextLeft: [95, 43, 195, 29, 140, 233, 118, 31, 207, 29, 200],
        dataTextColor: [],
        dataTextBig: [],
    },
    //    政企图形数据
    industryMonitorData: {
        echartsData: [{
                tooltip: {
                    show: false,
                },
                title: {
                    text: "0%",
                    left: "center",
                    top: "40%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 17,
                        align: "center"
                    }
                },
                graphic: { //图形中间文字
                    type: "text",
                    left: "center",
                    top: "55%",
                    style: {
                        text: "企业综合填报率",
                        textAlign: "center",
                        fill: "#000000",
                        fontSize: 10
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                            value: 11,
                            name: '全部',
                            itemStyle: {
                                normal: {
                                    color: '#D8D8D8'
                                },
                                emphasis: {
                                    color: '#D8D8D8'
                                }
                            }
                        },
                        {
                            value: 0,
                            name: '企业综合填报率',
                            itemStyle: {
                                normal: {
                                    color: '#62DEFF'
                                },
                                emphasis: {
                                    color: '#62DEFF'
                                }
                            }
                        }
                    ]
                }]
            },
            {
                tooltip: {
                    show: false,
                },
                title: {
                    text: "2",
                    left: "center",
                    top: "40%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 17,
                        align: "center"
                    }
                },
                graphic: { //图形中间文字
                    type: "text",
                    left: "center",
                    top: "55%",
                    style: {
                        text: "表单发放总数",
                        textAlign: "center",
                        fill: "#000000",
                        fontSize: 10
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '表单发放总数',
                        itemStyle: {
                            normal: {
                                color: '#62DEFF'
                            },
                            emphasis: {
                                color: '#62DEFF'
                            }
                        }
                    }]
                }]
            },
            {
                tooltip: {
                    show: false,
                },
                title: {
                    text: "0%",
                    left: "center",
                    top: "40%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 17,
                        align: "center"
                    }
                },
                graphic: { //图形中间文字
                    type: "text",
                    left: "center",
                    top: "55%",
                    style: {
                        text: "本月填报率",
                        textAlign: "center",
                        fill: "#000000",
                        fontSize: 10
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                            value: 100,
                            name: '全部',
                            itemStyle: {
                                normal: {
                                    color: '#D8D8D8'
                                },
                                emphasis: {
                                    color: '#D8D8D8'
                                }
                            }
                        },
                        {
                            value: 0,
                            name: '本月填报率',
                            itemStyle: {
                                normal: {
                                    color: '#62DEFF'
                                },
                                emphasis: {
                                    color: '#62DEFF'
                                }
                            }
                        }
                    ]
                }]
            },
            {
                tooltip: {
                    show: false,
                },
                title: {
                    text: "1",
                    left: "center",
                    top: "40%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 17,
                        align: "center"
                    }
                },
                graphic: { //图形中间文字
                    type: "text",
                    left: "center",
                    top: "55%",
                    style: {
                        text: "本月发放量",
                        textAlign: "center",
                        fill: "#000000",
                        fontSize: 10
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '本月发放量',
                        itemStyle: {
                            normal: {
                                color: '#62DEFF'
                            },
                            emphasis: {
                                color: '#62DEFF'
                            }
                        }
                    }]
                }]
            },
            {
                tooltip: {
                    show: false,
                },
                title: {
                    text: "1",
                    left: "center",
                    top: "40%",
                    textStyle: {
                        color: "#000000",
                        fontSize: 17,
                        align: "center"
                    }
                },
                graphic: { //图形中间文字
                    type: "text",
                    left: "center",
                    top: "55%",
                    style: {
                        text: "本月发放企业数",
                        textAlign: "center",
                        fill: "#000000",
                        fontSize: 10
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                            value: 0,
                            name: '全部',
                            itemStyle: {
                                normal: {
                                    color: '#D8D8D8'
                                },
                                emphasis: {
                                    color: '#D8D8D8'
                                }
                            }
                        },
                        {
                            value: 82,
                            name: '本月发放企业数',
                            itemStyle: {
                                normal: {
                                    color: '#62DEFF'
                                },
                                emphasis: {
                                    color: '#62DEFF'
                                }
                            }
                        }
                    ]
                }]
            },
        ],
        pendingTasks: 0, //审核任务条数
        formSelectData: '全部',
        dateSelectData: '全部',
        formOptionData: [{
                label: '全部',
                value: '全部'
            },
            {
                label: '企业基本信息表(年报)',
                value: '企业基本信息表(年报)'
            },
            {
                label: '企业经营情况表(月报)',
                value: '企业经营情况表(月报)'
            },
            {
                label: '企业调查问卷(季报)',
                value: '企业调查问卷(季报)'
            },
        ],
        dateOptionData: [{
                label: '全部',
                value: '全部'
            },
            {
                label: '最近1期',
                value: '最近1期'
            },
        ],

    },
    userRoot: {},

    noontip: '', // 上下午提示
}

root.computed = {

}

root.methods = {

    testClick: function (index) {
        console.log(index);
        this.testData.listDataIndex = 0;
        this.testData.index = index;
        let that = this;
        if (index == 0) {
            let data = {
                appType: 1,
                area: 2,
                dataSourceInfoId: 1,
                fre: 2,
                hasQuanGuo: 1,
                index: "86",
                isAllIndex: 1,
                tabType: 0,
            }
            this.changeVal(data);

            this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                const option = {
                    1: "地区生产总值累计值(亿元)",
                    2: "地区生产总值指数(上年同期=100)累计值(%)",
                    3: "国内生产总值指数(上年同期=100)累计值",
                }
                console.log('sss',res)
                const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                const a = that.echartsUtils.getInitOption("1", echartsDataInit);

                a.xAxis[0].axisLabel = {
                    interval: 0,
                    rotate: 40
                }
                that.echartsData.echartsTrendData = a;
            });

        }
        if (index == 1) {
            let data = {
                area: 2,
                dataSourceInfoId: 29,
                fre: 1,
                isAllIndex: 0,
                hasQuanGuo: 1,
                appType: 2,
                index: "96",
                tabType: 0,
            }
            this.changeVal(data);

            this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                const option = {
                    29: "工业增加值同比增长(%)",
                    30: "工业增加值累计增长(%)",
                }
                const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                a.legend = {
                    bottom: "0"
                }
                a.grid = {
                    height: '60%',
                    // containLabel: true
                }
                a.xAxis[0].axisLabel = {
                    interval: 0,
                    rotate: 40
                }
                that.echartsData.echartsTrendData = a;
            });


        }
        if (index == 2) {
            let data = {
                appType: 2,
                area: 2,
                dataSourceInfoId: 192,
                fre: 1,
                index: "26",
                isAllIndex: 0,
                tabType: 7,
            }
            this.componentsMoudel.startPost('changeTrend/getIndustryChangeTrend', data, false).then((res) => {
                var option = {
                    192: "行业增加值本月增速(%)",
                    193: "行业增加值累计增速(%)",
                    194: "工业投资同比增速(%)"
                }
                console.dir('3333')
                for(var key in option) {
                    console.dir(key)
                }
                console.dir('ssasavvv',Object.keys(option))
                
                const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                // a.title.text = 'sssss'
                a.legend = {
                    bottom: "0"
                }
                a.grid = {
                    height: '60%',
                    // containLabel: true
                }
                a.xAxis[0].axisLabel = {
                    interval: 0,
                    rotate: 40
                }
                that.echartsData.echartsTrendData = a;
            });


        }
        if (index == 3) {
            let data = {
                appType: 2,
                area: 2,
                dataSourceInfoId: 192,
                fre: 1,
                index: "26",
                isAllIndex: 0,
                tabType: 7
            }
            this.componentsMoudel.startPost('changeTrend/getIndustryChangeTrend', data, false).then((res) => {
                const option = {
                    192: "行业增加值本月增速(%)",
                    193: "行业增加值累计增速(%)",
                    194: "工业投资同比增速(%)"
                }
                const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                a.legend = {
                    bottom: "0"
                }
                a.grid = {
                    height: '60%',
                    // containLabel: true
                }
                a.xAxis[0].axisLabel = {
                    interval: 0,
                    rotate: 40
                }
                that.echartsData.echartsTrendData = a;
            });
        }
    },
    testListClick: function (index, id, type) {

        this.testData.listDataIndex = index;
        let that = this;
        //宏观运行检测
        if (type == 1) {
            //地区生产总值
            if (index == 0) {

                let data = {
                    appType: 2,
                    area: 2,
                    dataSourceInfoId: 1,
                    fre: 2,
                    hasQuanGuo: 1,
                    index: "86",
                    isAllIndex: 1,
                    tabType: 0,
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        1: "地区生产总值累计值(亿元)",
                        2: "地区生产总值指数(上年同期=100)累计值(%)",
                        3: "国内生产总值指数(上年同期=100)累计值",
                    }

                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            //居民消费
            if (index == 1) {
                let data = {
                    appType: 2,
                    area: 2,
                    dataSourceInfoId: 8,
                    fre: 1,
                    hasQuanGuo: 1,
                    index: "87",
                    isAllIndex: 0,
                    tabType: 0
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {

                        8: "居民消费价格指数(上年同月=100)",
                        9: "居民消费价格指数(上年同期=100)",
                        10: "居民消费价格指数(上月=100)"
                    }
                    this.resetArr(res.body.data);
                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            ///工业 生产者
            if (index == 2) {
                let data = {
                    appType: 2,
                    area: 2,
                    dataSourceInfoId: 14,
                    fre: 1,
                    hasQuanGuo: 1,
                    index: "88",
                    isAllIndex: 0,
                    tabType: 0
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        14: "工业生产者出厂价格指数(上年同月=100)",
                        15: "工业生产者出厂价格指数(上年同期=100)",
                        16: "工业生产者出厂价格指数(上月=100)",
                    }
                    this.resetArr(res.body.data);
                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }

                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            //固定资产
            if (index == 3) {
                let data = {
                    area: 2,
                    isAllIndex: 1,
                    hasQuanGuo: 1,
                    appType: 2,
                    dataSourceInfoId: 20,
                    fre: 1,
                    index: "90",
                    tabType: 0,
                    time: "2020-06-01 00:00:00"
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        20: "国内固定资产投资额累计增长(%)",
                        21: "地区固定资产投资完成额累计增长(%)",
                    }

                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            // 社会消费品
            if (index == 4) {
                let data = {
                    isAllIndex: 0,
                    hasQuanGuo: 0,
                    area: 2,
                    dataSourceInfoId: 24,
                    fre: 2,
                    appType: 2,
                    index: "91",
                    tabType: 0,
                }

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        24: "地区社会消费品零售总额累计增长(%)"
                    }
                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }

                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            // 进出口
            if (index == 5) {
                let data = {
                    area: 2,
                    isAllIndex: 0,
                    hasQuanGuo: 0,
                    dataSourceInfoId: 27,
                    fre: 3,
                    appType: 2,
                    index: "92",
                    tabType: 0,

                }
                this.changeVal(data);
                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        27: "经营单位所在地进出口总额(千美元)"
                    }

                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
        }

        if (type == 2) {
            if (index == 0) {
                let data = {
                    area: 2,
                    dataSourceInfoId: 29,
                    fre: 1,
                    isAllIndex: 0,
                    hasQuanGuo: 1,
                    appType: 2,
                    index: "96",
                    tabType: 0,
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        29: "工业增加值同比增长(%)",
                        30: "工业增加值累计增长(%)",
                    }
                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            if (index == 1) {
                let data = {
                    appType: 0,
                    area: 2,
                    dataSourceInfoId: 35,
                    fre: 1,
                    hasQuanGuo: 0,
                    index: "97",
                    isAllIndex: 0,
                    tabType: 0
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        35: "规模以上工业企业数(个)",
                    }

                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            //分行业增加
            if (index == 2) {
                let data = {
                    area: 2,
                    dataSourceInfoId: 38,
                    fre: 1,
                    index: "98",
                    sort: 0,
                    tabType: 3,
                    time: null
                }
                this.componentsMoudel.startPost('business/getIndustryData', data, false).then((res) => {
                    const option = {
                        38: "行业增加值本月增速(%)",
                        39: "行业增加值累计增速(%)",
                    }
                    const echartsDataInit = DataCoverUtils.professionEchartDataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("3", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }

                    a.grid = [{
                        left: '10%',
                        height: '35%'
                    }]
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 90
                    }
                    a.xAxis[0].axisLabel.textStyle = {
                        fontSize: '10'
                    }
                    a.xAxis[0].axisLabel.formatter = function (value, index) {
                        const values = value.split("-");
                        return values[0];
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            // 产品销售率
            if (index == 3) {
                let data = {
                    area: 2,
                    isAllIndex: 0,
                    hasQuanGuo: 1,
                    dataSourceInfoId: 161,
                    fre: 1,
                    appType: 1,
                    index: "100",
                    tabType: 0,
                    time: "2020-06-01 00:00:00"
                }


                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        161: "产品销售率(按现价计算)当月值(%)",
                        162: "产品销售率(按现价计算)累计值(%)",
                    }

                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            //利润总额
            if (index == 4) {
                let data = {
                    appType: 1,
                    area: 2,
                    dataSourceInfoId: 165,
                    fre: 1,
                    hasQuanGuo: 1,
                    index: "101",
                    isAllIndex: 0,
                    tabType: 0,
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        165: "利润总额累计值(亿元)",
                        166: "利润总额累计增长(%)",
                    }

                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
            //营业收入
            if (index == 5) {
                let data = {
                    isAllIndex: 1,
                    hasQuanGuo: 0,
                    area: 2,
                    dataSourceInfoId: 169,
                    fre: 1,
                    appType: 1,
                    index: "102",
                    tabType: 0,
                }
                this.changeVal(data);

                this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
                    const option = {
                        169: "营业收入累计值(亿元)",
                        170: "营业收入累计增长(%)",
                    }
                    const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                    const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                    a.legend = {
                        bottom: "0"
                    }
                    a.grid = {
                        height: '60%',
                        // containLabel: true
                    }
                    a.xAxis[0].axisLabel = {
                        interval: 0,
                        rotate: 40
                    }
                    that.echartsData.echartsTrendData = a;
                });

            }
        }

        if (type == 3) {
            console.log(index);
        }
    },

    changeVal(data) {
        if (data.fre == 1) {
            data.time = new Date("06 30,2020").format("yyyy-MM-dd");
        } else {
            data.time = new Date("08 31,2020").format("yyyy-MM-dd");
        }
        return data;
    },

    //确定用户二级菜单加载
    UserAuthority() {
        let that = this
        switch (that.Authority1) {
            case 1:
                that.AddOns = [0, 1, 2, 3, 4];
                break;
            case 2:
                that.AddOns = [0, 1, 2, 3, 4];
                break;
            case 3:
                that.AddOns = [0, 1, 2, 3, 4];
                break;
            case 4:
                that.AddOns = [1, 4];
                break;
            case 5:
                that.AddOns = [1, 3, 4];
                break;
            case 6:
                that.AddOns = [2, 3, 4];
                break;
            case 7:
                that.AddOns = [2, 3, 4];
                break;
            case 8:
                that.AddOns = [2, 3, 4];
                break;
            case 9:
                that.AddOns = [2, 4];
                break;
            case 10:
                that.AddOns = [3, 4];
        }
    },
    //  数据查询
    searchFor() {
        this.$router.push({
            path: '/dataQuery',
            query: {
                input: this.searchForData.input1,
                select: this.searchForData.select1
            }
        });
    },

    //工业经济数据库样式
    industryDataText() {
        for (let i = 0; i < this.industryData.dataText.length; i++) {
            // $scope.cameraList.push($scope.cameraAll);
            // this.industryData.dataTextTop.push(Math.floor(Math.random() * (80 - 0)) + 0)
            // this.industryData.dataTextLeft.push(Math.floor(Math.random() * (100 - 0)) + 0)
            this.industryData.dataTextColor.push('rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)')
            this.industryData.dataTextBig.push(Math.floor(Math.random() * (6 - 0)) + 15)
        }
    },
    // 点击文字到输入框
    searchWord(itme) {
        this.searchForData.input1 = itme;
    },

    //工业行业点击数据切换 
    // id  此条数据的id
    industryClick(i, is, id) {
        let that = this;
        this.testData.industryTitle = i;
        this.testData.industryTitleTwo = is;


        let dataSourceInfoId = "";
        this.componentsMoudel.startPost('estate/getDropDownData', {
            dataSourceInfoId: id,
            index: id,
            tabType: 7
        }, false).then((res) => {
            dataSourceInfoId = res.body.data[0].id;
            let option = {};
            res.body.data.forEach((item, index) => {
                option[item.id] = item.dataItem;
            })

            let data = {
                appType: 2,
                area: 2,
                dataSourceInfoId,
                fre: 1,
                index: id.toString(),
                isAllIndex: 0,
                tabType: 7,
            }
            this.componentsMoudel.startPost('changeTrend/getIndustryChangeTrend', data, false).then((res2) => {
                console.log('ssss', res2.body.data)
                const echartsDataInit = DataCoverUtils.dataInit(res2.body.data, option);
                const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                a.legend = {
                    bottom: "0"
                }
                a.grid = {
                    height: '60%',
                    // containLabel: true
                }
                a.xAxis[0].axisLabel = {
                    interval: 0,
                    rotate: 40
                }
                that.echartsData.echartsTrendData = a;
            });


        });
        if (is == 4) {
            this.$router.push('business?index=10')
        }

    },


    // 待审核条数



    //  账户信息
    accountInformation() {
        this.$router.push({
            path: '/accountInformation',
            query: {
                name: this.userName
            }
        });
    },

    //    修改密码
    changePassword() {
        this.$router.push({
            path: '/changePassword',
            query: {
                name: this.userName
            }
        });
    },

    //    消息列表
    notification() {
        this.$router.push({
            path: '/notification',
            query: {
                name: this.userName
            }
        });
    },
    resetArr(res) {
        for (let key in res) {
            if (key == 'x') {
                res.x = res.x.splice(-6);
                break;
            } else {
                res[key].quan_guo = res[key].quan_guo.splice(-6);
                res[key].yun_nan = res[key].yun_nan.splice(-6);
            }
        }
    },

    //tab页切换
    tabChange: function (tab) {
        this.thisTab = tab;
    },
    // 个人中心跳转
    handleTo(path, active, bool = true) {
        if (bool) {
            document.documentElement.scrollTop = 0; //跳转回到顶部
            this.$router.push({
                path,
                query: {
                    active
                }
            });
        }
    },
    // 政企直通车跳转
    handleTo2(path, active) {
        if (this.userRoot.hasAuthReportOverview) {
            document.documentElement.scrollTop = 0; //跳转回到顶部
            this.$router.push({
                path,
                query: {
                    index: 13,
                    active
                }
            });
        }
    },

    // nihaoxianshi
    mynoontip() {
        const that = this
        const date = new Date()
        if (date.getHours() >= 0 && date.getHours() < 12) {
            that.noontip = '上午好'
        } else if (date.getHours() >= 12 && date.getHours() < 18) {
            that.noontip = '下午好'
        } else {
            that.noontip = '晚上好'
        }
    },

}
root.created = function () {
    this.mynoontip();
}
root.mounted = function () {
    this.UserAuthority();
    this.industryDataText();
    let that = this;
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let data = {}
    this.componentsMoudel.startGet('/manage/menu/getMyMenu', data, false).then((res) => {

        let myMenu = [{
                name: "宏观经济运行监测",
                titleId: 0
            },
            {
                name: "工业经济运行监测",
                titleId: 1
            },
            {
                name: "工业行业运行监测",
                titleId: 2
            },
            // {
            //     name: "重点产业运行监测",
            //     titleId: 3
            // },
            {
                name: "智能报告",
                titleId: 4
            },
        ];
        console.log('ssszcz',res.body.data)
        this.secondMenu = res.body.data;
        for (let item of myMenu) {
            for (let key in res.body.data) {
                if (key == item.name) {
                    this.industry.push(item);
                    break;
                }
            }
            this.industry.forEach((item, index) => {
                if (item.name == '宏观经济运行监测') {
                    this.testData.index = 0;
                    let data2 = {
                        appType: 2,
                        area: 2,
                        dataSourceInfoId: 1,
                        fre: 2,
                        hasQuanGuo: 1,
                        index: "86",
                        isAllIndex: 1,
                        tabType: 0
                    }
                    this.changeVal(data2);

                    this.componentsMoudel.startPost('changeTrend/getChangeTrend', data2, false).then((res) => {
                        const option = {
                            1: "地区生产总值累计值(亿元)",
                            2: "地区生产总值指数(上年同期=100)累计值(%)",
                            3: "国内生产总值指数(上年同期=100)累计值",
                        }
                        const echartsDataInit = DataCoverUtils.dataInit(res.body.data, option);
                        const a = that.echartsUtils.getInitOption("1", echartsDataInit);
                        a.legend = {
                            bottom: "0"
                        }
                        a.grid = {
                            height: '60%',
                            // containLabel: true
                        }
                        a.xAxis[0].axisLabel = {
                            interval: 0,
                            rotate: 40
                        }
                        that.echartsData.echartsTrendData = a;
                    });

                }
            })
        }
    });
    let option2 = {
        xAxis: {
            type: 'category',
            data: ['2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [-8.8, -5.9, -5.2, -7.3, -10.4, -10.9, -10.4, -8.8],
            type: 'line'
        }]
    };
    that.echartsData.echartsTrendData = option2;

    //获取政企互动条数  

    that.componentsMoudel.startPost('interaction/queryPageSide', {
        currentPage: 1,
        pageSize: 10000,
        // title: '', //标题
        category: '全部', //分类
        // startTime: '',
        // endTime: '',
        // ResponsibleDepartment: "", //责任处事

    }, false).then((res) => {
        this.shownum = res.body.cum

    })

    that.componentsMoudel.startGet('manage/menu/getInteractiveInfo', {}, false).then((res) => {
        that.userRoot = res.body.data;
    })

    //待审核条数
    that.componentsMoudel.startGet('manage/menu/getInteractiveReviewCount', {}, false).then((res) => {
        that.industryMonitorData.pendingTasks = res.body.data;
    })

    //政企直通车的数据内容

    that.componentsMoudel.startGet('governmentfill/getReportStatistics', {}, false).then((res) => {
        that.industryMonitorData.echartsData[0].series[0].data[1].value = parseFloat(res.body.data.FillRate);
        that.industryMonitorData.echartsData[0].series[0].data[0].value = 100 - parseFloat(res.body.data.FillRate);
        that.industryMonitorData.echartsData[0].title.text = res.body.data.FillRate + '%';
        that.industryMonitorData.echartsData[1].title.text = res.body.data.totalCirculation;
    })

    // manage/menu/getInteractiveInfoOverview
    that.componentsMoudel.startGet('manage/menu/getInteractiveInfoOverview', {}, false).then((res) => {
        that.industryMonitorData.echartsData[2].series[0].data[1].value = parseFloat(res.body.data.FillRate);
        that.industryMonitorData.echartsData[2].series[0].data[0].value = 100 - parseFloat(res.body.data.FillRate);
        that.industryMonitorData.echartsData[2].title.text = res.body.data.FillRate + "%";
        that.industryMonitorData.echartsData[3].title.text = res.body.data.monthIssueTotal;
        that.industryMonitorData.echartsData[4].title.text = res.body.data.monthIssueEnterprise;
    })
}
FactoryComponents.initComponent(root);