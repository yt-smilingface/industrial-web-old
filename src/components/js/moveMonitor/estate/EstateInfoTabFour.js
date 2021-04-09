import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
import ECharts from 'vue-echarts';
const root = {}
root.components = {
    ECharts,
}

//区域分布
export default root
root.name = 'EstateInfoTabFour';
root.data = {
    index: '',
    options: [],
    bbdQyxxId: '',
    enterpriseData: {},
    enterpriseLogo: require('../../../../assets/industrialData/dataQuery/enterpriseimg.png'),
    eightSetsdata: {},
    productionEchart: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '16%',
        },
        toolbox: {
            feature: {}
        },
        legend: {
            data: ['企业营业收入']
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
                show: true,
                splitNumber: 15,
                textStyle: {
                    fontSize: '10',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: '单位/万元',
            // min: 0,
            // max: 250,
            // interval: 100,
            axisLabel: {
                formatter: '{value}',
                interval: 0,
                rotate: 40
            },
        }],
        series: [{
            name: '企业营业收入',
            type: 'bar',
            data: [],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: '#4ad2ff'
                }
            }
        }]
    },
    productEchart: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '16%',
        },
        toolbox: {
            feature: {}
        },
        legend: {
            data: ['主营业务收入']
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
                show: true,
                splitNumber: 15,
                textStyle: {
                    fontSize: '10',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: '单位/万元',
            axisLabel: {
                formatter: '{value}',
                interval: 0,
                rotate: 40
            },
        }],
        series: [{
            name: '主营业务收入',
            type: 'bar',
            data: [],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: '#4ad2ff'
                }
            }
        }]
    },
    benefitEchart: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
        },
        grid: {
            left: '16%',
        },
        toolbox: {
            feature: {}
        },
        legend: {
            data: ['工业总产值']
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
                show: true,
                splitNumber: 15,
                textStyle: {
                    fontSize: '10',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: '单位/万元',
            axisLabel: {
                formatter: '{value}',
                interval: 0,
                rotate: 40
            },
        }],
        series: [{
            name: '工业总产值',
            type: 'bar',
            data: [],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: '#4ad2ff'
                }
            }
        }]
    },
    totalProfitEchart: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
        },
        grid: {
            left: '16%',
        },
        toolbox: {
            feature: {}
        },
        legend: {
            data: ['利润总额']
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
                show: true,
                splitNumber: 15,
                textStyle: {
                    fontSize: '10',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: '单位/万元',
            axisLabel: {
                formatter: '{value}',
                interval: 0,
                rotate: 40
            },
        }],
        series: [{
            name: '利润总额',
            type: 'bar',
            data: [],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: '#4ad2ff'
                }
            }
        }, ]
    },
    totalTaxEchart: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
        },
        grid: {
            left: '16%',
        },
        toolbox: {
            feature: {}
        },
        legend: {
            data: ['税金总额']
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
                show: true,
                splitNumber: 15,
                textStyle: {
                    fontSize: '10',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: '单位/万元',
            axisLabel: {
                formatter: '{value}',
                interval: 0,
                rotate: 40
            },
        }],
        series: [{
            name: '税金总额',
            type: 'bar',
            data: [],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: '#4ad2ff'
                }
            }
        }, ]
    },
    consumptionEchart: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
        },
        grid: {
            left: '16%',
        },
        toolbox: {
            feature: {

            }
        },
        legend: {
            data: ['企业综合能耗']
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
                show: true,
                splitNumber: 15,
                textStyle: {
                    fontSize: '10',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: '单位/万元',
            axisLabel: {
                formatter: '{value}',
                interval: 0,
                rotate: 40
            },
        }],
        series: [{
            name: '企业综合能耗',
            type: 'bar',
            data: [],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: '#4ad2ff'
                }
            }
        }, ]
    },


    // tab 页2
    backgroundEchart: {
        tooltip: {},
        legend: {
            data: ['']
        },
        radar: {
            name: {
                textStyle: {
                    color: '#ccc',
                    fontSize: '13',
                    borderRadius: 1,
                }
            },
            indicator: [],
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                }
            },
        },
        series: [{
            name: '企业得分',
            type: 'radar',
            data: [{
                value: [],
                name: '企业得分'
            }]
        }]
    },
    // 竞争力
    competitiveCompeScore: '', //总分
    competitivePower: [],
    competitivePowerName: '',
    benchmarkingDetails: false,
    contrastData: [], //企业对标详情
    // 云南省同行业企业对标
    yunNanTopTenData: [],
    rank: '',
    // 全国同行业上市企业对标
    nationwideTopTenData: [],
}
root.methods = {
    // 获取行业对应企业
    getKeyEnterprisesNameByParam() {
        let that = this;
        let data = {
            index: that.index,
            curPage: 1,
            limit: 999
        }
        this.componentsMoudel.startPost('distribution/getKeyEnterprisesNameByParam', data, false).then((res) => {
            that.options = res.body.data;
            this.bbdQyxxId = res.body.data[0].bbdQyxxId;
            this.changeValue();
            // 
            this.getEightGroupsFrameData();
            this.getBusinessIncomeData();
            this.getMainBusinessIncomeData();
            this.getIndustrialOutputData();
            this.getTotalProfitData();
            this.getTotalTaxData();
            this.getComprehensiveEnergyConsumptionData();

            // 
            // this.yunNanTopTen();
            // this.nationwideTopTen();
            // this.nationwideByParam();
        })
    },

    // 获取变化值
    changeValue() {
        let that = this;
        this.componentsMoudel.startGet('dataQuery/getQyxxBasicInfoByBbdQyxxId?bbd_qyxx_id=' + that.bbdQyxxId, false).then((res) => {
            that.enterpriseData = {
                ...res.body.data
            }
        });

        this.getEightGroupsFrameData();
        this.getBusinessIncomeData();
        this.getMainBusinessIncomeData();
        this.getIndustrialOutputData();
        this.getTotalProfitData();
        this.getTotalTaxData();
        this.getComprehensiveEnergyConsumptionData();
        // 
        this.yunNanTopTen();
        this.nationwideTopTen();
        this.nationwideByParam();
    },

    // 经营分析上方八组数据
    getEightGroupsFrameData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getEightGroupsFrameData/' + that.bbdQyxxId, false).then((res) => {
            that.eightSetsdata = res.body.data;
        })
    },

    // 企业营业收入数据
    getBusinessIncomeData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getBusinessIncomeData/' + that.bbdQyxxId, false).then((res) => {
            that.productionEchart.xAxis[0].data = res.body.data.x;
            that.productionEchart.series[0].data = res.body.data.y;
        })
    },

    // 主营业务收入情况
    getMainBusinessIncomeData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getMainBusinessIncomeData/' + that.bbdQyxxId, false).then((res) => {
            that.productEchart.xAxis[0].data = res.body.data.x;
            that.productEchart.series[0].data = res.body.data.y;
        })
    },

    // 工业总产值情况
    getIndustrialOutputData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getIndustrialOutputData/' + that.bbdQyxxId, false).then((res) => {
            that.benefitEchart.xAxis[0].data = res.body.data.x;
            that.benefitEchart.series[0].data = res.body.data.y;
        })
    },

    // 利润总额情况
    getTotalProfitData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getTotalProfitData/' + that.bbdQyxxId, false).then((res) => {
            that.totalProfitEchart.xAxis[0].data = res.body.data.x;
            that.totalProfitEchart.series[0].data = res.body.data.y;
        })
    },

    // 税金总额情况
    getTotalTaxData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getTotalTaxData/' + that.bbdQyxxId, false).then((res) => {
            that.totalTaxEchart.xAxis[0].data = res.body.data.x;
            that.totalTaxEchart.series[0].data = res.body.data.y;
        })
    },

    // 企业综合能耗情况
    getComprehensiveEnergyConsumptionData() {
        let that = this;
        this.componentsMoudel.startGet('distribution/getComprehensiveEnergyConsumptionData/' + that.bbdQyxxId, false).then((res) => {
            that.consumptionEchart.xAxis[0].data = res.body.data.x;
            that.consumptionEchart.series[0].data = res.body.data.y;
        })
    },


    // 云南省竞争力Top10
    yunNanTopTen() {
        let that = this;
        let data = {
            index: that.index,
            bbdQyxxId: that.bbdQyxxId
        }
        this.componentsMoudel.startPost('distribution/getTop10CompetitivenessInProvinceByParam', data, false).then((res) => {
            that.yunNanTopTenData = res.body.data.TopList;
            that.rank = res.body.data.rank;
        })
    },
    nationwideTopTen() {
        let that = this;
        let data = {
            index: that.index,
        }
        this.componentsMoudel.startPost('distribution/getTop10CompetitivenessInNationwideByParam', data, false).then((res) => {
            that.nationwideTopTenData = res.body.data.TopList;
        })
    },

    // 竞争力评价数据
    nationwideByParam() {
        let that = this;
        let data = {
            index: that.index,
            bbdQyxxId: that.bbdQyxxId
        }
        this.componentsMoudel.startPost('distribution/getCompetitivenessInNationwideByParam', data, false).then((res) => {
            if (res.body.data.TopList.length > 0) {
                that.competitiveCompeScore = res.body.data.TopList[0].compeScore
                that.competitivePower = res.body.data.TopList[0].listData;
                that.competitivePowerName = res.body.data.TopList[0].companyName;
                let indicatorData = [];
                let valueData = [];
                that.competitivePower.forEach((item, index) => {
                    indicatorData.push({
                        name: item.name,
                        max: 100,
                        axisLabel: {
                            show: false
                        }
                    });
                    valueData.push(item.value);
                });

                that.backgroundEchart.radar.indicator = indicatorData;
                that.backgroundEchart.series[0].data[0].value = valueData;
            }
        })
    },
    // 获取企业对标详情
    benchmarkingClick(row) {
        let that = this;
        that.benchmarkingDetails = true;
        console.log(that.benchmarkingDetails);
        let data = {
            index: that.index,
            bbdQyxxId: row.bbdQyxxId
        }
        this.componentsMoudel.startPost('distribution/getCompetitivenessInNationwideByParam', data, false).then((res) => {
            if (res.body.data.TopList.length > 0) {
                that.contrastData = res.body.data.TopList[0];
            }
        });
        // that.benchmarkingDetails = false;
    },



    // 查看更多企业信息
    moreInformation(bbdQyxxId) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/enterpriseDetails',
            query: {
                Id: bbdQyxxId,
            }
        })

    },


}
root.mounted = function () {

    this.index = this.$route.query.id;

    this.getKeyEnterprisesNameByParam();


}
root.watch = {

}

FactoryComponents.initComponent(root);