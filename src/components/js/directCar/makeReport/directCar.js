import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'
import ECharts from 'vue-echarts';



const root = {}
export default root
root.name = 'directCar';
root.components = {
    ECharts
}

root.data = {
    inputInfo: "", //搜索框的值
    getReportStatisticsData: {},
    dataInfo: { //  数据接口来源
        echartsData: {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
                text: '表单发放结构',
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 17,
                    color: '#595959',
                    fontWeight: 500
                },
            },
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    // colorLightness: [0.3, 1]
                }
            },
            color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#F5EED6', '#FF9F7F', '#F6DFD7', '#FB7293', '#F5D4DC', '#E062AE', '#EDC9DF', '#E7BCF3', '#9D96F5', '#96BFFF', '#9ACDE7', '#FFDB5C', ],
            legend: {
                left: 'center',
                bottom: 40,
                data: [],
                textStyle: {
                    color: '#000',
                    fontSize: 14
                }
            },
            grid: {
                right: '-2%',
                bottom: '3%',
                containLabel: true
            },
            series: [{
                name: '表名',
                type: 'pie',
                center: ['46%', '42%'],
                radius: '55%',
                data: [].sort(function (a, b) {
                    return a.value - b.value;
                }),
                label: {
                    color: '#000',
                    fontSize: 10
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
        title: '表单发放结构'
    },
    //数据类型结构
    typeInfo: {
        echartsData: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#fff'
                    }
                }
            },
            legend: {
                left: 'center',
                bottom: 0,
                data: ['发放量', '填报量', '填报率(%)', ],
                textStyle: {
                    fontSize: 12, //字体大小
                },
            },
            xAxis: [{
                type: 'category',
                data: ['2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 1,
                        type: "solid"
                    },
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        fontSize: '10',
                    },
                },
            }],
            yAxis: [{
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    }
                },
                {
                    type: 'value',
                    min: 0,
                    max: 100,
                    axisLabel: {
                        formatter: '{value} %',
                        interval: 0,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            fontSize: '10',
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true
                    }
                }
            ],
            series: [{
                name: '发放量',
                type: 'bar',
                data: [],
                itemStyle: {
                    normal: {
                        color: '#5B9BD5'
                    }
                },
            }, {
                name: '填报量',
                type: 'bar',
                data: [],
                itemStyle: {
                    normal: {
                        color: '#CDBFE8'
                    }
                },
            }, {
                name: '填报率(%)',
                type: 'line',
                yAxisIndex: 1,
                data: [],
                itemStyle: {
                    normal: {
                        color: '#ED7D31'
                    }
                },
            }]
        },
        title: '表单填报情况'
    },
    //数据服务走势
    serveInfo: {
        echartsData: {

        },
        title: '数据服务走势'
    },
    //  企业填报TOP10
    topTenData: [],
    //热门服务目录
    //热门服务机构

}
root.methods = {

    getReportStatistics() {
        let that = this;
        that.componentsMoudel.startGet('governmentfill/getReportStatistics', false).then(res => {
            that.getReportStatisticsData = res.body.data;
        })
    },

    getReportPercentage() {
        let that = this;
        that.componentsMoudel.startGet('governmentfill/getReportPercentage', false).then(res => {
            let echartData1 = {};
            let count = 0;
            for (let key in res.body.data) {
                echartData1[key] = res.body.data[key];
                count++;
                if (count > 6) {
                    break;
                }
            }
            echartData1.其他=0;
            for (let key in res.body.data) {
                if (count >= 6) {
                    echartData1.其他 +=res.body.data[key];
                    console.log(echartData1);
                }
            }
            

            let echartData2 = [];
            for (let key in echartData1) {
                echartData2.push({
                    value: echartData1[key],
                    name: key,
                });
                that.dataInfo.echartsData.legend.data.push(key);
            }
            that.dataInfo.echartsData.series[0].data = echartData2;
        })
    },

    getReportSituation() {
        let that = this;
        that.componentsMoudel.startGet('governmentfill/getReportSituation', false).then(res => {
            let echartData1 = res.body.data;
            that.typeInfo.echartsData.xAxis[0].data = echartData1.x;
            that.typeInfo.echartsData.series[0].data = echartData1.totalCirculation;
            that.typeInfo.echartsData.series[1].data = echartData1.totalWrite;
            that.typeInfo.echartsData.series[2].data = echartData1.fillRate;
        })
    },
    // 获取企业填报率列表
    getEnterpriseReportingRate() {
        let that = this;
        this.componentsMoudel.startGet('governmentfill/getEnterpriseReportingRate', false).then(res => {
            that.topTenData = res.body.data;
        })
    },

}

root.mounted = function () {
    this.getReportStatistics();
    this.getReportPercentage();
    this.getReportSituation();
    this.getEnterpriseReportingRate();

}
FactoryComponents.initComponent(root);