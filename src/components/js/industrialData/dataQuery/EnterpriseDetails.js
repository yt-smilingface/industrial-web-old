import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'
import ECharts from 'vue-echarts';
import it from "element-ui/src/locale/lang/it";

const root = {}
root.components = {
    ECharts,
}
export default root
root.name = 'EnterpriseDetails';
root.data = {
    industrialAddedValue: '', //全局搜索框值
    enterpriseId: '', //企业Id

    // 分页数据 (分支机构)
    pageSize: [10, 12, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,

    // 分页数据 (海外投资机构)
    currentPage2: 1,
    cpage2: 10,
    total2: 0,

    //招标
    currentPage3: 1,
    cpage3: 10,
    total3: 0,
    //中标
    currentPage4: 1,
    cpage4: 10,
    total4: 0,

    //经营异常
    currentPage5: 1,
    cpage5: 10,
    total5: 0,
    //行政处罚
    currentPage6: 1,
    cpage6: 10,
    total6: 0,
    //欠税信息
    currentPage7: 1,
    cpage7: 10,
    total7: 0,
    //股权冻结
    currentPage8: 1,
    cpage8: 10,
    total8: 0,
    //股权质押
    currentPage9: 1,
    cpage9: 10,
    total9: 0,
    //动产抵押
    currentPage10: 1,
    cpage10: 10,
    total10: 0,
    //招聘表格信息
    currentPageRecruitment: 1,
    cpageRecruitment: 10,
    totalRecruitment: 0,


    //失信被执行人
    currentPage11: 1,
    cpage11: 10,
    total11: 0,
    //被执行人
    currentPage12: 1,
    cpage12: 10,
    total12: 0,
    //裁判文书
    currentPage13: 1,
    cpage13: 10,
    total13: 0,
    //开庭公告
    currentPage14: 1,
    cpage14: 10,
    total14: 0,
    //法院公告
    currentPage15: 1,
    cpage15: 10,
    total15: 0,
    //司法拍卖
    currentPage16: 1,
    cpage16: 10,
    total16: 0,
    //专利
    currentPage17: 1,
    cpage17: 10,
    total17: 0,
    //软件著作权
    currentPage18: 1,
    cpage18: 10,
    total18: 0,
    //商标
    currentPage19: 1,
    cpage19: 10,
    total19: 0,
    //作品著作权
    currentPage20: 1,
    cpage20: 10,
    total20: 0,
    //域名备案
    currentPage21: 1,
    cpage21: 10,
    total21: 0,

    // 对外投资
    currentPage22: 1,
    cpage22: 10,
    total22: 0,
    // 主要人员
    currentPage23: 1,
    cpage23: 10,
    total23: 0,

    //招聘薪资分布
    currentPage24: 1,
    cpage24: 10,
    total24: 0,

    proptype: '',
    leftMenu: {
        creditCode: '',
        businessMessage: {
            esdate: '',
            approvalDate: '',
            openfrom: '',
            opento: '',
        },
    },
    //获取信息
    setinfo: {},
    dataLength: 0, //  数据数目
    //企业数据
    enterpriseData: {
        browseNumber: '',
        enterpriseImage: require('../../../../assets/industrialData/dataQuery/enterpriseimg.png'),
    },
    risEvent: { //  风险事件
        echartsData: {
            tooltip: {
                show: true
            },
            xAxis: [{
                type: 'category',
                data: ["失信被执行人", "被执行人", "裁判文书", "开庭公告", "司法拍卖", "法院公告", "行政处罚", "税务处罚", "经营异常", "清算信息", "股权冻结"],
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                },
                axisTick: {
                    alignWithLabel: true
                },

            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                },
            }],
            series: [{
                "name": "风险事件",
                "type": "bar",
                barWidth: '40%',
                data: [],
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 14
                            }
                        },
                        color: '#F36B5C'
                    }
                },
            }],

        }
    },
    loading: false,
    //    股东
    shareholder: [],
    //对外投资
    foreignInvestment: [],
    //  主要人员
    mainStaff: [],
    //工商变更
    businessChange: [],
    //分支机构
    branchMechanism: [],
    //海外投资机构
    overseasInvestment: [],
    //年报信息
    annualReport: [],
    //招标
    bidding: [],
    //中标
    winTheBid: [],
    //  经营异常
    businessException: [],
    // 行政处罚
    administrativePenalties: [],
    // 欠税信息
    taxDebtInformation: [],
    // 股权冻结
    equityFreeze: [],
    //  股权质押
    equityPledge: [],
    //  动产抵押
    chattelMortgage: [],
    //招聘
    recruitmentData: {
        recruitmentEcharts: {
            title: {
                text: '招聘行业类别分布',
                subtext: '最近12个月',
                left: 'left',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                top: 60,
                data: []
            },
            series: [{
                name: '招聘行业类别分布', //鼠标放上去样式
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    formatter: '{b}',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        b: {
                            fontSize: 16,
                            lineHeight: 40
                        },
                    }
                },
                data: [],
                // itemStyle: {
                //     normal: {
                //         color: function(params) {
                //             //自定义颜色
                //             var colorList = [
                //                 '#FE8463', 'red', 'green'
                //             ];
                //             return colorList[params.dataIndex]
                //         }
                //     }
                // }
            }]
        },
        salaryEcharts: {
            title: {
                text: '招聘薪资分布',
                subtext: '最近12个月',
                left: 'left',
            },
            tooltip: {
                show: true,
                trigger: 'axis',
            },
            xAxis: [{
                type: 'category',
                data: ["2K一下", "2K-5K", "5K-10K", "10K-20K", "20K-30K", "30K以上", "其他"],
                axisTick: {
                    alignWithLabel: true
                },
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    show: true
                },

            }],
            series: [{
                "name": "薪资",
                "type": "bar",
                barWidth: '32%',
                "data": [1, 2, 101, 29, 0, 0, 0, 0, 0, 0, 0],
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 14
                            }
                        },
                        color: '#3C53B4'
                    }
                },
            }]
        },
        recruitmentTableData: []
    },

    //失信被执行人
    dishonestPerson: [],
    //被执行人
    executedPerson: [],
    //裁判文书
    judgement: [],
    //   开庭公告
    openCourtAnnouncement: [],
    // 法院公告
    courtAnnouncement: [],
    //司法拍卖
    judicialAuction: [],
    //  专利
    patent: [],
    //   软件著作权
    softwareCopyright: [],
    //  商标
    trademarkData: [],
    // 作品著作权
    workCopyright: [],
    //域名备案
    domainRegistration: [],

    changeColor: [],

}
root.methods = {
    //企业详情左边统计记录   股东详情
    getLeftDirectory() {
        let that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId
        };
        this.componentsMoudel.startGet('dataQuery/getLeftDirectoryStatistics?bbd_qyxx_id=' + this.enterpriseId, data, false).then((res) => {
            this.leftMenu = res.body.data;
            that.shareholder = res.body.data.shareholder;
            that.risEvent.echartsData.series[0].data = [that.leftMenu.司法信息.失信被执行人, that.leftMenu.司法信息.被执行人,
                that.leftMenu.司法信息.裁判文书, that.leftMenu.司法信息.开庭公告, that.leftMenu.司法信息.司法拍卖,
                that.leftMenu.司法信息.法院公告, that.leftMenu.经营信息.行政处罚, that.leftMenu.经营信息.欠税信息,
                that.leftMenu.经营信息.经营异常, that.leftMenu.经营信息.清算信息, that.leftMenu.经营信息.股权冻结,
            ]
        });
    },
    //对外投资
    foreignInvestmentFun(curPage, limit) {
        const that = this;
        let mainData = {
            bbd_qyxx_id: this.enterpriseId,
            curPage: curPage,
            limit: limit
        };
        that.componentsMoudel.startPost('dataQuery/getOverseasInvestmentByParam', mainData, false).then((res) => {
            that.foreignInvestment = res.body.data;
            that.total22 = res.body.cum;
            that.bidding.forEach((item, index) => {
                if (that.foreignInvestment.lenght !== 0) {
                    if (that.foreignInvestment[index].createTime === undefined) {
                        that.foreignInvestment[index].createTime = item.createTime
                    } else {
                        that.foreignInvestment[index].createTime = item.createTime.slice(0, 11)
                    }
                }


            })
        });
    },
    // 企业主要人员信息
    mainStaffFun(curPage, limit) {
        const that = this;
        let mainData = {
            // bbd_qyxx_id: '8b68b532f0be4260994c9b0d2b30e8f2',
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getMainStaffByParam', mainData, false).then((res) => {
            that.mainStaff = res.body.data;
            this.total23 = res.body.cum;
        });
    },
    // 企业变更信息
    businessChangeFun() {
        const that = this;
        let data = {
            // bbd_qyxx_id: '217f9c70685149be83a5d4daf7f3bd04', //后期需要修改
            bbd_qyxx_id: this.enterpriseId,
        };
        that.componentsMoudel.startPost('dataQuery/getChangeInformationByParam', data, false).then((res) => {
            that.businessChange = res.body.data;
        });
        // for (let i = 0; i < that.businessChange.length; i++){
        //     that.changeColor[0].afterChangeVo = that.businessChange[i].afterChangeVo.indexOf(that.businessChange[i].beforeChangeVo[i])
        // }
    },
    //分支机构信息
    branchMechanismFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getBranchByParam', data, false).then((res) => {
            that.branchMechanism = res.body.data;
            that.total = res.body.cum;
        });
    },
    //海外投资机构
    overseasInvestmentFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getOverseasInvestmentByParam', data, false).then((res) => {
            that.overseasInvestment = res.body.data;
            that.total2 = res.body.cum;
        });
    },
    //年报信息
    annualReportFun(curPage = 1, limit = 5) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getAnnualReportByParam', data, false).then((res) => {
            that.annualReport = res.body.data;
        });
    },
    //招标信息
    biddingFun(curPage, limit) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getBiddingByParam', data, false).then((res) => {
            that.bidding = res.body.data;
            that.total3 = res.body.cum;
            that.bidding.forEach((item, index) => {
                if (that.bidding[index].pubdate === undefined) {
                    that.bidding[index].pubdate = that.bidding[index].pubdate
                } else {
                    that.bidding[index].pubdate = that.bidding[index].pubdate.slice(0, 11)
                }

            })
        });
    },
    //中标信息
    winTheBidFun(curPage, limit) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getWinningBidByParam', data, false).then((res) => {
            that.winTheBid = res.body.data;
            that.total4 = res.body.cum;
            that.winTheBid.forEach((item, index) => {
                if (that.winTheBid[index].pubdate === undefined) {
                    that.winTheBid[index].pubdate = that.winTheBid[index].pubdate
                } else {
                    that.winTheBid[index].pubdate = that.winTheBid[index].pubdate.slice(0, 11)
                }

            })
        });
    },
    //经营异常信息
    businessExceptionFun(curPage, limit) {
        const that = this;
        let data = {
            // bbd_qyxx_id: '3fb74830dc7a43fc9569d928ba9d9c39', //后期需要修改
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getBusinessAbnormalityByParam', data, false).then((res) => {
            that.businessException = res.body.data;
            that.total5 = res.body.cum;
        });
    },
    //行政处罚信息
    administrativePenaltiesFun(curPage, limit) {
        const that = this;
        let data = {
            // bbd_qyxx_id: 'a43a070d87a140df812538396480e2a2', //后期需要修改
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getRiskPunishmentParam', data, false).then((res) => {
            that.administrativePenalties = res.body.data;
            that.total6 = res.body.cum;

        });
    },
    //欠税信息
    taxDebtInformationFun(curPage, limit) {
        const that = this;
        let data = {
            // bbd_qyxx_id: '3fb74830dc7a43fc9569d928ba9d9c39', //后期需要修改
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getOwedTaxesByParam', data, false).then((res) => {
            that.taxDebtInformation = res.body.data;
            that.total7 = res.body.cum;

        });
    },
    //股权冻结信息
    equityFreezeFun(curPage, limit) {
        const that = this;
        let data = {
            // bbd_qyxx_id: '217f9c70685149be83a5d4daf7f3bd04', //后期需要修改    冻结金额没有
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getEquityFreezeByParam', data, false).then((res) => {
            that.equityFreeze = res.body.data;
            that.total8 = res.body.cum;

        });
    },
    //股权质押信息  limit=5
    equityPledgeFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            // bbd_qyxx_id: '5e4da7fc627446d9ad9a570298be647e', //后期需要修改    冻结金额没有
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getEquityPledgeByParam', data, false).then((res) => {
            that.equityPledge = res.body.data;
            that.total9 = res.body.cum;

        });
    },
    //动产抵押 limit=5
    chattelMortgageFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getChattelMortgageByParam', data, false).then((res) => {
            that.chattelMortgage = res.body.data;
            that.total10 = res.body.cum;
        });
    },
    //    招聘行业分布
    recruitmentEchartsFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, // 执行标准
            curPage,
            limit,
            monthCount: 36
        };
        that.componentsMoudel.startPost('dataQuery/getRecruitmentClassificationByParam', data, false).then((res) => {
            res.body.data.forEach((item, index) => {
                that.recruitmentData.recruitmentEcharts.legend.data.push(item.industryName);
                that.recruitmentData.recruitmentEcharts.series[0].data.push({
                    value: item.totalCount,
                    name: item.industryName
                })
            });

        });
    },
    //    招聘资薪分布
    salaryEchartsFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, // 执行标准
            curPage,
            limit,
            monthCount: 36
        };
        that.componentsMoudel.startPost('dataQuery/getRecruitmentPageByParam', data, false).then((res) => {

        });
    },
    //    招聘信息
    recruitmentFun(curPage, limit) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, // 执行标准
            curPage,
            limit,
            monthCount: 36
        };
        that.componentsMoudel.startPost('dataQuery/getRecruitmentPageByParam', data, false).then((res) => {
            that.recruitmentData.recruitmentTableData = res.body.data;
            that.totalRecruitment = res.body.cum;
            that.dishonestPerson.forEach((item, index) => {
                if (that.recruitmentData.recruitmentTableData[index].pubdate === undefined) {
                    that.recruitmentData.recruitmentTableData[index].pubdate = that.recruitmentData.recruitmentTableData[index].pubdate
                } else {
                    that.recruitmentData.recruitmentTableData[index].pubdate = that.recruitmentData.recruitmentTableData[index].pubdate.slice(0, 11)
                }
            })
        });
    },


    //  失信被执行人
    dishonestPersonFun(curPage = 1, limit = 5) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, // 执行标准
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getDishonestPersonByParam', data, false).then((res) => {
            that.dishonestPerson = res.body.data;
            that.total11 = res.body.cum;
            that.dishonestPerson.forEach((item, index) => {
                if (that.dishonestPerson[index].pubdate === undefined) {
                    that.dishonestPerson[index].pubdate = that.dishonestPerson[index].pubdate
                } else {
                    that.dishonestPerson[index].pubdate = that.dishonestPerson[index].pubdate.slice(0, 11)
                }
            })
        });
    },
    //  被执行人
    executedPersonFun(curPage = 1, limit = 5) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, // 执行标准
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getPersonsSubjectByParam', data, false).then((res) => {
            that.executedPerson = res.body.data;
            that.total12 = res.body.cum;
            that.executedPerson.forEach((item, index) => {
                if (that.executedPerson[index].registerDate === undefined) {
                    that.executedPerson[index].registerDate = that.executedPerson[index].registerDate
                } else {
                    that.executedPerson[index].registerDate = that.executedPerson[index].registerDate.slice(0, 11)
                }
            })
        });
    },
    //  裁判文书
    judgementFun(curPage = 1, limit = 5) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getJudgementByParam', data, false).then((res) => {
            that.judgement = res.body.data;
            that.total13 = res.body.cum;
            that.judgement.forEach((item, index) => {
                if (that.judgement[index].sentenceDate === undefined) {
                    that.judgement[index].sentenceDate = that.judgement[index].sentenceDate
                } else {
                    that.judgement[index].sentenceDate = that.judgement[index].sentenceDate.slice(0, 11)
                }
            })
        });
    },
    //  开庭公告
    openCourtAnnouncementFun(curPage = 1, limit = 5) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getCourtAnnouncementByParam', data, false).then((res) => {
            that.openCourtAnnouncement = res.body.data;
            that.total14 = res.body.cum;
            that.openCourtAnnouncement.forEach((item, index) => {
                if (that.openCourtAnnouncement[index].trialDate === undefined) {
                    that.openCourtAnnouncement[index].trialDate = that.openCourtAnnouncement[index].trialDate
                } else {
                    that.openCourtAnnouncement[index].trialDate = that.openCourtAnnouncement[index].trialDate.slice(0, 11)
                }
            })
        });
    },
    // 法院公告
    courtAnnouncementFun(curPage = 1, limit = 5) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId,
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getLegalCourtByParam', data, false).then((res) => {
            that.courtAnnouncement = res.body.data;
            that.total15 = res.body.cum;
            that.courtAnnouncement.forEach((item, index) => {
                if (that.courtAnnouncement[index].noticeTime === undefined) {
                    that.courtAnnouncement[index].noticeTime = that.courtAnnouncement[index].noticeTime
                } else {
                    that.courtAnnouncement[index].noticeTime = that.courtAnnouncement[index].noticeTime.slice(0, 11)
                }
            })
        });
    },
    //司法拍卖
    judicialAuctionFun(curPage, limit) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, //后期需要修改    冻结金额没有
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getJudicialAuctionParam', data, false).then((res) => {
            that.judicialAuction = res.body.data; //无数据
            that.total16 = res.body.cum;
            // that.judicialAuction.forEach((item, index) => {
            //     if (that.judicialAuction[index].publidate === undefined){
            //         that.judicialAuction[index].publidate = that.judicialAuction[index].publidate
            //     }else {
            //         that.judicialAuction[index].publidate = that.judicialAuction[index].publidate.slice(0,11)
            //     }
            // })
        });
    },

    //专利
    patentFun(curPage = 1, limit = 10) {
        const that = this;
        let data = {
            bbd_qyxx_id: that.enterpriseId, //后期需要修改    冻结金额没有
            curPage,
            limit
        };
        that.componentsMoudel.startPost('dataQuery/getPatentByParam', data, false).then((res) => {
            that.patent = res.body.data;
            that.total17 = res.body.cum;
            that.patent.forEach((item, index) => {
                if (that.patent[index].publidate === undefined) {
                    that.patent[index].publidate = that.patent[index].publidate
                } else {
                    that.patent[index].publidate = that.patent[index].publidate.slice(0, 11)
                }
            })
        });
    },
    // 软件著作
    softwareCopyrightFun(curPage, limit) {
        const that = this;
        let data = {
            // bbd_qyxx_id: 'cda8f6bc01f44374a3468e0a2a9de246', //后期需要修改    冻结金额没有
            bbd_qyxx_id: this.enterpriseId,
            curPage: curPage,
            limit: limit
        };
        that.componentsMoudel.startPost('dataQuery/getSoftwareWorksByParam', data, false).then((res) => {
            that.softwareCopyright = res.body.data;
            that.total18 = res.body.cum;
            that.softwareCopyright.forEach((item, index) => {
                if (that.softwareCopyright[index].regdate === undefined) {
                    that.softwareCopyright[index].regdate = that.softwareCopyright[index].regdate
                } else {
                    that.softwareCopyright[index].regdate = that.softwareCopyright[index].regdate.slice(0, 11)
                }
            })
        });
    },
    // 商标
    trademarkDataFun(curPage, limit) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            // bbd_qyxx_id: 'bbb349dfefba4873bfde944662c0dc5e', //后期需要修改    冻结金额没有
            curPage: curPage,
            limit: limit
        };
        that.componentsMoudel.startPost('dataQuery/getTrademarkByParam', data, false).then((res) => {
            that.trademarkData = res.body.data;
            that.total19 = res.body.cum;
            that.trademarkData.forEach((item, index) => {
                if (that.trademarkData[index].applicationDate === undefined) {
                    that.trademarkData[index].applicationDate = that.trademarkData[index].applicationDate
                } else {
                    that.trademarkData[index].applicationDate = that.trademarkData[index].applicationDate.slice(0, 11)
                }
            })
        });
    },
    // 作品著作
    workCopyrightFun(curPage, limit) {
        const that = this;
        let data = {
            bbd_qyxx_id: this.enterpriseId,
            // bbd_qyxx_id: '5e4da7fc627446d9ad9a570298be647e', //后期需要修改    冻结金额没有
            curPage: curPage,
            limit: limit
        };
        that.componentsMoudel.startPost('dataQuery/getZhuoPingByParam', data, false).then((res) => {
            that.workCopyright = res.body.data;
            that.total20 = res.body.cum;

            that.workCopyright.forEach((item, index) => {
                if (that.workCopyright[index].creationCompletionDate === undefined) {
                    that.workCopyright[index].creationCompletionDate = that.workCopyright[index].creationCompletionDate
                } else {
                    that.workCopyright[index].creationCompletionDate = that.workCopyright[index].creationCompletionDate.slice(0, 11)
                }
                if (that.workCopyright[index].regdate === undefined) {
                    that.workCopyright[index].regdate = that.workCopyright[index].regdate
                } else {
                    that.workCopyright[index].regdate = that.workCopyright[index].regdate.slice(0, 11)
                }
            })
        });
    },
    //域名备案
    domainRegistrationFun(curPage, limit) {
        const that = this;
        let data = {
            // bbd_qyxx_id: '5e4da7fc627446d9ad9a570298be647e', //后期需要修改    冻结金额没有
            bbd_qyxx_id: this.enterpriseId,
            curPage: curPage,
            limit: limit
        };
        that.componentsMoudel.startPost('dataQuery/getPropDomainWebsiteByParam', data, false).then((res) => {
            that.domainRegistration = res.body.data;
            that.total21 = res.body.cum;
            that.domainRegistration.forEach((item, index) => {
                if (that.domainRegistration[index].approvalTime === undefined) {
                    that.domainRegistration[index].approvalTime = that.domainRegistration[index].approvalTime
                } else {
                    that.domainRegistration[index].approvalTime = that.domainRegistration[index].approvalTime.slice(0, 11)
                }
            })
        });
    },



    // 分页（分支机构）
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val;
        this.branchMechanismFun(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.branchMechanismFun(this.currentPage, this.cpage);
    },

    // 分页2（海外投资机构）
    handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
        this.cpage2 = val;
        this.branchMechanismFun(this.currentPage2, this.cpage2);
    },
    handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.currentPage2 = val;
        this.branchMechanismFun(this.currentPage2, this.cpage2);
    },

    // 分页3（招标）
    handleSizeChange3(val) {
        console.log(`每页 ${val} 条`);
        this.cpage3 = val;
        this.biddingFun(this.currentPage3, this.cpage3);
    },
    handleCurrentChange3(val) {
        console.log(`当前页: ${val}`);
        this.currentPage3 = val;
        this.biddingFun(this.currentPage3, this.cpage3);
    },
    // 分页4（中标）
    handleSizeChange4(val) {
        console.log(`每页 ${val} 条`);
        this.cpage4 = val;
        this.winTheBidFun(this.currentPage4, this.cpage4);
    },
    handleCurrentChange4(val) {
        console.log(`当前页: ${val}`);
        this.currentPage4 = val;
        this.winTheBidFun(this.currentPage4, this.cpage4);
    },

    // 分页5（经营异常信息）
    handleSizeChange5(val) {
        console.log(`每页 ${val} 条`);
        this.cpage5 = val;
        this.businessExceptionFun(this.currentPage5, this.cpage5);
    },
    handleCurrentChange5(val) {
        console.log(`当前页: ${val}`);
        this.currentPage5 = val;
        this.businessExceptionFun(this.currentPage5, this.cpage5);
    },
    // 分页6（行政处罚信息）
    handleSizeChange6(val) {
        console.log(`每页 ${val} 条`);
        this.cpage6 = val;
        this.administrativePenaltiesFun(this.currentPage6, this.cpage6);
    },
    handleCurrentChange6(val) {
        console.log(`当前页: ${val}`);
        this.currentPage6 = val;
        this.administrativePenaltiesFun(this.currentPage6, this.cpage6);

    },
    // 分页7（欠税信息）
    handleSizeChange7(val) {
        console.log(`每页 ${val} 条`);
        this.cpage7 = val;
        this.taxDebtInformationFun(this.currentPage7, this.cpage7);
    },
    handleCurrentChange7(val) {
        console.log(`当前页: ${val}`);
        this.currentPage7 = val;
        this.taxDebtInformationFun(this.currentPage7, this.cpage7);

    },
    //分页8（股权冻结信息）
    handleSizeChange8(val) {
        console.log(`每页 ${val} 条`);
        this.cpage8 = val;
        this.equityFreezeFun(this.currentPage8, this.cpage8);
    },
    handleCurrentChange8(val) {
        console.log(`当前页: ${val}`);
        this.currentPage8 = val;
        this.equityFreezeFun(this.currentPage8, this.cpage8);
    },
    //分页9（股权质押）
    handleSizeChange9(val) {
        console.log(`每页 ${val} 条`);
        this.cpage9 = val;
        this.equityPledgeFun(this.currentPage9, this.cpage9);
    },
    handleCurrentChange9(val) {
        console.log(`当前页: ${val}`);
        this.currentPage9 = val;
        this.equityPledgeFun(this.currentPage9, this.cpage9);
    },
    //分页10（动产抵押）
    handleSizeChange10(val) {
        console.log(`每页 ${val} 条`);
        this.cpage10 = val;
        this.chattelMortgageFun(this.currentPage10, this.cpage10);
    },
    handleCurrentChange10(val) {
        console.log(`当前页: ${val}`);
        this.currentPage10 = val;
        this.chattelMortgageFun(this.currentPage10, this.cpage10);
    },
    //分页（招聘表格信息）
    handleSizeChangeRecruitment(val) {
        console.log(`每页 ${val} 条`);
        this.cpage10 = val;
        this.recruitmentFun(this.currentPageRecruitment, this.cpageRecruitment);
    },
    handleCurrentChangeRecruitment(val) {
        console.log(`当前页: ${val}`);
        this.currentPageRecruitment = val;
        this.recruitmentFun(this.currentPageRecruitment, this.cpageRecruitment);
    },

    //分页11（失信息被执行人）
    handleSizeChange11(val) {
        console.log(`每页 ${val} 条`);
        this.cpage11 = val;
        // this.chattelMortgageFun(this.currentPage11, this.cpage11);
    },
    handleCurrentChange11(val) {
        console.log(`当前页: ${val}`);
        this.currentPage11 = val;
        // this.chattelMortgageFun(this.currentPage11, this.cpage11);
    },
    //分页12（被执行人）
    handleSizeChange12(val) {
        console.log(`每页 ${val} 条`);
        this.cpage12 = val;
        // this.chattelMortgageFun(this.currentPage12, this.cpage12);
    },
    handleCurrentChange12(val) {
        console.log(`当前页: ${val}`);
        this.currentPage12 = val;
        // this.chattelMortgageFun(this.currentPage12, this.cpage12);
    },
    //分页13（裁判文书）
    handleSizeChange13(val) {
        console.log(`每页 ${val} 条`);
        this.cpage13 = val;
        // this.chattelMortgageFun(this.currentPage13, this.cpage13);
    },
    handleCurrentChange13(val) {
        console.log(`当前页: ${val}`);
        this.currentPage13 = val;
        // this.chattelMortgageFun(this.currentPage13, this.cpage13);
    },
    //分页14（开庭公告）
    handleSizeChange14(val) {
        console.log(`每页 ${val} 条`);
        this.cpage14 = val;
        // this.chattelMortgageFun(this.currentPage14, this.cpage14);
    },
    handleCurrentChange14(val) {
        console.log(`当前页: ${val}`);
        this.currentPage14 = val;
        // this.chattelMortgageFun(this.currentPage14, this.cpage14);
    },
    //分页15（法院公告）
    handleSizeChange15(val) {
        console.log(`每页 ${val} 条`);
        this.cpage15 = val;
        // this.chattelMortgageFun(this.currentPage15, this.cpage15);
    },
    handleCurrentChange15(val) {
        console.log(`当前页: ${val}`);
        this.currentPage15 = val;
        // this.chattelMortgageFun(this.currentPage15, this.cpage15);
    },
    //分页16（司法拍卖）
    handleSizeChange16(val) {
        console.log(`每页 ${val} 条`);
        this.cpage16 = val;
        // this.chattelMortgageFun(this.currentPage16, this.cpage16);
    },
    handleCurrentChange16(val) {
        console.log(`当前页: ${val}`);
        this.currentPage16 = val;
        // this.chattelMortgageFun(this.currentPage16, this.cpage16);
    },
    //分页17（专利）
    handleSizeChange17(val) {
        console.log(`每页 ${val} 条`);
        this.cpage17 = val;
        // this.chattelMortgageFun(this.currentPage17, this.cpage17);
    },
    handleCurrentChange17(val) {
        console.log(`当前页: ${val}`);
        this.currentPage17 = val;
        // this.chattelMortgageFun(this.currentPage17, this.cpage17);
    },

    //分页18（软件著作权）
    handleSizeChange18(val) {
        console.log(`每页 ${val} 条`);
        this.cpage18 = val;
        this.softwareCopyrightFun(this.currentPage18, this.cpage18);
    },
    handleCurrentChange18(val) {
        console.log(`当前页: ${val}`);
        this.currentPage18 = val;
        this.softwareCopyrightFun(this.currentPage18, this.cpage18);
    },
    //分页19（商标）
    handleSizeChange19(val) {
        console.log(`每页 ${val} 条`);
        this.cpage19 = val;
        this.trademarkDataFun(this.currentPage19, this.cpage19);
    },
    handleCurrentChange19(val) {
        console.log(`当前页: ${val}`);
        this.currentPage19 = val;
        this.trademarkDataFun(this.currentPage19, this.cpage19);
    },
    //分页20（作品著作权）
    handleSizeChange20(val) {
        console.log(`每页 ${val} 条`);
        this.cpage20 = val;
        this.workCopyrightFun(this.currentPage20, this.cpage20);
    },
    handleCurrentChange20(val) {
        console.log(`当前页: ${val}`);
        this.currentPage20 = val;
        this.workCopyrightFun(this.currentPage20, this.cpage20);
    },
    //分页21（域名备案）
    handleSizeChange21(val) {
        console.log(`每页 ${val} 条`);
        this.cpage21 = val;
        this.domainRegistrationFun(this.currentPage21, this.cpage21);
    },
    handleCurrentChange21(val) {
        console.log(`当前页: ${val}`);
        this.currentPage21 = val;
        this.domainRegistrationFun(this.currentPage21, this.cpage21);
    },
    // 
    //分页22（）
    // foreignInvestmentFun
    handleSizeChange22(val) {
        console.log(`每页 ${val} 条`);
        this.cpage22 = val;
        this.foreignInvestmentFun(this.currentPage22, this.cpage22);
    },
    handleCurrentChange22(val) {
        console.log(`当前页: ${val}`);
        this.currentPage22 = val;
        this.foreignInvestmentFun(this.currentPage22, this.cpage22);
    },

    //分页23(主要人员)
    // mainStaffFun
    handleSizeChange23(val) {
        console.log(`每页 ${val} 条`);
        this.cpage23 = val;
        this.mainStaffFun(this.currentPage23, this.cpage23);
    },
    handleCurrentChange23(val) {
        console.log(`当前页: ${val}`);
        this.currentPage23 = val;
        this.mainStaffFun(this.currentPage23, this.cpage23);
    },
    // 锚点跳转
    returnTop(urlId) {
        document.querySelector("#" + urlId).scrollIntoView(true);
    },
    //年报详情
    annualReportDetails(row) {
        let routeUrl = this.$router.resolve({
            path: "/annualReport",

        });
        this.componentsMoudel.openLocalStorage("anReport");
        this.componentsMoudel.setData("annualReport", row);
        window.open(routeUrl.href, '_blank');
    },
}

root.mounted = function () {
    //获取路由Id
    let {
        Id,
        info
    } = this.$route.query;
    this.enterpriseId = Id;

    if (info) {
        this.setinfo = info;
    }

    this.componentsMoudel.startGet('dataQuery/getQyxxBasicInfoByBbdQyxxId?bbd_qyxx_id=' + Id, false).then((res) => {
        this.setinfo = res.body.data;
    });

    this.componentsMoudel.startGet('dataQuery/getViewedTotal?bbd_qyxx_id=' + Id, false).then((res) => {
        this.enterpriseData.browseNumber = res.body.data;
    })

    //企业详情左边统计记录
    this.getLeftDirectory();
    // 对外投资
    this.foreignInvestmentFun(1, 10);
    // 企业主要人员信息
    this.mainStaffFun(1, 10);
    // 企业变更信息
    this.businessChangeFun();
    //分支机构信息
    this.branchMechanismFun();
    //海外投资机构
    this.annualReportFun();
    //年报信息

    this.overseasInvestmentFun();
    //招标信息
    this.biddingFun();
    //中标信息
    this.winTheBidFun();
    //经营异常信息
    this.businessExceptionFun();
    //行政处罚信息
    this.administrativePenaltiesFun();
    //行政处罚信息
    this.taxDebtInformationFun();
    //股权冻结信息
    this.equityFreezeFun();
    //股权质押信息
    this.equityPledgeFun();
    // 动产抵押
    this.chattelMortgageFun();
    //    招聘行业分布
    this.recruitmentEchartsFun()
    //    招聘资薪分布
    this.salaryEchartsFun()
    //    招聘信息
    this.recruitmentFun(1, 10)

    //  失信被执行人
    this.dishonestPersonFun(1, 10)
    //  被执行人
    this.executedPersonFun(1, 10)
    //  裁判文书
    this.judgementFun(1, 10)
    //  开庭公告
    this.openCourtAnnouncementFun(1, 10)
    // 法院公告
    this.courtAnnouncementFun(1, 10)
    //司法拍卖
    this.judicialAuctionFun(1, 10)

    //专利
    this.patentFun(1, 10);
    // 软件著作
    this.softwareCopyrightFun(1, 10)
    // 商标
    this.trademarkDataFun(1, 10)
    // 作品著作
    this.workCopyrightFun(1, 10)
    //域名备案
    this.domainRegistrationFun(1, 10)





}
FactoryComponents.initComponent(root);