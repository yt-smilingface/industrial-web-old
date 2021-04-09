import Vue from 'vue';
import echarts from 'echarts';
import yunnan from "@/util/gov/province/yunnan.json";
import FactoryComponents from '../../../factory/components/FactoryComponents.js';
const root = {}
root.components = {

} //调用Echarts
export default root
//项目管理
root.name = 'situation';
root.data = {
    ifClick: false,
    //投资规模
    investment: [{
        value: '',
        label: "全部"
    }, {
        value: '0',
        label: "5000万以下"
    }, {
        value: '1',
        label: "5000万-1亿"
    }, {
        value: '2',
        label: "1亿-2亿"
    }, {
        value: '3',
        label: "2亿-5亿"
    }, {
        value: '4',
        label: "5亿-10亿"
    }, {
        value: '5',
        label: "10亿以上"
    }],
    //项目类型
    projectType: [{
        value: '',
        label: "全部"
    }, {
        value: '0',
        label: "在谈"
    }, {
        value: '1',
        label: "签约"
    }, {
        value: '2',
        label: "新开工"
    }, {
        value: '3',
        label: "续建"
    }, {
        value: '4',
        label: "竣工投产"
    }, ],
    //项目类型
    projectType2: [{
        value: '0',
        label: "在谈"
    }, {
        value: '1',
        label: "签约"
    }, {
        value: '2',
        label: "新开工"
    }, {
        value: '3',
        label: "续建"
    }, {
        value: '4',
        label: "竣工投产"
    }, ],

    //所在州市:[],
    beloneCity: [],
    selectCountry: [],
    formselectCountry: [],
    inputInfo: {
        //专项名称
        name: '',
        //企业名称
        companyName: "",
        //申报方向
        reportingDirection: "",
        //所属行业
        industryType: "",
        occupationOptions: [],
        occupationOptions2: [],
        //项目总投资
        totalInvestment: "",

        //项目开始时间
        actualStartTime: "",

        reviewStatus: "",
        limit: 10,
        currentPage: 1,
    },
    inputInfo2: {
        //专项名称
        name: '',
        //企业名称
        enterpriseName: "",
        //申报方向
        reportingDirection: "",
        //所属行业
        belongIndustry: "",
        occupationOptions: [],
        //项目总投资
        projectInvestment: "",
        //项目开始时间
        startTime: "",
        projectApprovalStatus: "",

    },
    //总数
    total: 20,
    total2: 20,
    //表单数据
    tableData: [{
        num: 1,
        name: "项目1",
        address: '类型1'
    }],
    tableData2: [{
        num: 1,
        name: "项目1",
        address: '类型1'
    }],
    limit: 10,
    currentPage: 1,
    //当前tab页
    thisTab: {},
    rules: {},
    rules: {
        projectType: [{
            required: true,
            message: '请填写正确信息',
            trigger: 'blur'
        }],

    },
    //     ownedEnterprise: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     areaCode: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     cityCode: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     industryCode: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     projectType: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     recordCertificateNo: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     referenceNumber: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     time: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     constructionContent: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     projectResults: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     projectProgress: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     linkman: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     areaCode: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     contactNumber: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     newJobs: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     remark: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     bankLoan: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     completedInvestment: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     plannedInvestment: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     expectedSalesCompletion: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     expectedTaxCompletion: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     expectedSales: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    //     expectedTax: [{
    //         required: true,
    //         message: '请填写正确信息',
    //         trigger: 'blur'
    //     }, ],
    // },
    dialogFormVisible: false,
    form: {
        "id": 1,
        "ownedEnterprise": "归属企业",
        "name": "测试项目",
        "areaCode": "530103",
        "cityCode": "530100",
        "industryCode": "10",
        "projectType": 0,
        "recordCertificateNo": "AZ000000001",
        "referenceNumber": "HP20210115000001",
        "startTime": "2021-01-13 16:01:21",
        "endTime": "2021-01-30 16:01:27",
        "constructionContent": "建设内容",
        "projectResults": "项目成效",
        "projectProgress": "项目进度",
        "linkman": "项目联系人",
        "contactNumber": "13999999999",
        "newJobs": 22,
        "remark": "项目备注",
        "proTotalInvestment": 22.5,
        "bankLoan": 12,
        "completedInvestment": 4.5,
        "plannedInvestment": 22.25,
        "expectedSalesCompletion": 29.99,
        "expectedTaxCompletion": 33.44,
        "expectedSales": 13.22,
        "expectedTax": 13.76
    },
    formLabelWidth: '100px',
    //查看
    isChecked: false,
    //修改
    isChange: false,
    //新增
    isAdd: false,
    showtText: null,

    // 项目类型
    managementTypeOption: {
        title: {
            text: '项目阶段',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        series: [{
            name: '项目阶段',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    },



    // 展开收缩搜索按钮
    isShow: false,
    advancedname: '展开搜索',
    davancedIcon: 'el-icon-arrow-down',
    managementData: {},
    managementDistributionOtptions: [],
    buildTop: 0,
    timer: null,

}

root.created = function () {
        this.getManagementDatas()
    },

    root.methods = {
        getManagementDatas() {
            // 获取项目统计数据
            this.componentsMoudel.startGet('projectManagement/getProjectManageCount', {}, false).then((res) => {
                // 获取需要统计的数据
                this.managementData = res.body.data
                this.managementData.schedule = parseInt((this.managementData.schedule).toFixed())
                this.managementData.projectTypeCount.forEach(item => {
                    if (item.projectType == 0) {
                        this.managementData.sign = item.typeCount
                    } else if (item.projectType == 4) {
                        this.managementData.put = item.typeCount
                    }
                    this.managementData.build = this.managementData.projectTypeCount[1].typeCount +
                        this.managementData.projectTypeCount[2].typeCount
                })
                let distributionoptionData = []

                // 获取周市名称
                this.componentsMoudel.startGet('projectManagement/getAreaMenu', {}, false).then((area) => {
                    this.managementData.areaDistrib.forEach(item => {
                        area.body.data.forEach(area => {
                            if (area.value == item.cityCode) {
                                switch(area.value) {
                                      case '530100':
                                          area.name =  '昆明'; break;
                                      case '530300':
                                          area.name =  '曲靖'; break;
                                      case '530400':
                                          area.name =  '玉溪'; break;
                                      case '530500':
                                          area.name =  '保山'; break;
                                      case '530600':
                                          area.name =  '昭通'; break;
                                      case '530700':
                                          area.name =  '丽江'; break;
                                      case '530800':
                                          area.name =  '普洱'; break;
                                      case '530900':
                                          area.name =  '临沧'; break;
                                      case '532300':
                                          area.name =  '楚雄';  break;
                                      case '532500':
                                          area.name =  '红河'; break;
                                      case '532600':
                                          area.name =  '文山'; break;
                                      case '532800':
                                          area.name =  '西双版纳'; break;
                                      case '532900':
                                          area.name =  '大理'; break;
                                      case '533100':
                                          area.name =  '德宏'; break;
                                      case '533300':
                                          area.name =  '怒江'; break;
                                      case '533400':
                                          area.name =  '迪庆'; break;
                                  }
                                let obj = {}
                                obj.name = area.name
                                obj.value = item.industryCount
                                distributionoptionData.push(obj)
                            }
                        })
                        this.managementDistributionOtptions = distributionoptionData
                        this.setInterValData()
                    })
                    this.getmanagementDistributionData(distributionoptionData)
                })
                // 获取项目类型数据
                let mangementTypeData = []
                this.managementData.projectTypeCount.forEach(item => {
                    if (item.projectType == 0) {
                        item.projectType = '在谈'
                    } else if (item.projectType == 1) {
                        item.projectType = '签约'
                    } else if (item.projectType == 2) {
                        item.projectType = '新开工'
                    } else if (item.projectType == 3) {
                        item.projectType = '续建'
                    } else if (item.projectType == 4) {
                        item.projectType = '竣工投产'
                    } else if (item.projectType == null) {
                        item.projectType = '其它'
                    }
                    let obj = {}
                    obj.name = item.projectType
                    obj.value = item.typeCount
                    mangementTypeData.push(obj)
                })
                this.getMangementTypeData(mangementTypeData)

                // 获取行业数据
                this.componentsMoudel.startPost('specificFund/selectCategory', {}, false).then((specRes) => {
                    let yAxisData = []
                    let seriesData = []
                    this.managementData.industrialDistrib.forEach(item => {
                        specRes.body.data.forEach(spec => {
                            if (parseInt(spec.code) == item.industryCode) {
                                seriesData.push(item.industryCount)
                                yAxisData.push(spec.category)
                            }
                        })
                    })
                    this.getIndustryDistributionData(yAxisData, seriesData)
                })
            })
        },
        

		// 定时器定时向上移动
		setInterValData() {
            this.timer = setInterval(() => {
                this.buildTop += 3
                if (this.buildTop > this.managementDistributionOtptions.length * 32 - 32 * 8) {
                    this.buildTop = 0
                }
            }, 500)
            if (this.managementDistributionOtptions.length < 8) {   
                clearInterval(this.timer)
            }
		},

		// 鼠标移入移出
		mouseOver() {
			clearInterval(this.timer)
		},
		mouseLeave() {
			this.setInterValData()
		},


        // 展开收缩搜索条件
        advancedClick() {
            this.isShow = !this.isShow
            this.isShow ? this.advancedname = '收起搜索' : this.advancedname = '展开搜索'
            this.isShow ? this.davancedIcon = 'el-icon-arrow-up' : this.davancedIcon = 'el-icon-arrow-down'
        },

        // 项目阶段
        getMangementTypeData(data) {
            var myChart = echarts.init(document.getElementById('managementType'));
            var option = {
                title: {
                    text: '项目阶段',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
                series: [{
                    name: '项目类别',
                    type: 'pie',
                    radius: '50%',
                    label: {
                        formatter: '{b} {c}个',
                    },
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            myChart.setOption(option);

        },

        // 产业项目数
        getIndustryDistributionData(yAxisData, seriesData) {
            var myChart = echarts.init(document.getElementById('industryDistribution'));
            var option = {
                title: {
                    text: '行业项目数',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['#91cc75'],
                xAxis: {
                    type: 'category',
                    data: yAxisData,
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                series: [{
                    name: '产业项目数',
                    type: 'bar',
                    barWidth: 15,
                    data: seriesData
                }]
            };
            myChart.setOption(option);
        },

        getTimeVal(val) {
            if (val == null) {
                this.inputInfo.startTime = null;
                this.inputInfo.endTime = null;
            }
        },

        // 项目分布
        getmanagementDistributionData(data) {
            var myChart = echarts.init(document.getElementById('managementDistribution'));
            echarts.registerMap('yunnan', yunnan)
            var option = {
                title: {
                    text: '项目区域分布',
                    left: 'center',
                },
                visualMap: {
                    min: 0,
                    max: 100,
                    show: true
                },
                series: [{
                    type: "map",
                    map: "yunnan",
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                    },
                    geoIndex: 0,
                    data: data
                }]
            };
            myChart.setOption(option);
        },

        getType(val) {
            let type = "";
            switch (parseInt(val / 10)) {
                case 10:
                    type = "success";
                    break;
                case 9:
                    type = "success";
                    break;
                case 8:
                    type = "warning";
                    break;
                case 7:
                    type = "warning";
                    break;
                case 6:
                    type = "warning";
                    break;
                case 5:
                    type = "exception";
                    break;
                case 4:
                    type = "exception";
                    break;
                case 3:
                    type = "exception";
                    break;
                case 2:
                    type = "exception";
                    break;
                case 1:
                    type = "exception";
                    break;
                case 0:
                    type = "exception";
                    break;
                default:
                    type = "success";
                    break;
            }
            return type;
        },
        //获取城市
        async hangeGet() {
            let res = await this.componentsMoudel.startGet('projectManagement/getAreaMenu', {}, false);
            if (res.body.status_code == 100) {
                this.beloneCity = res.body.data;
            }
            // this.beloneCity.push({
            //     name: "全部",
            //     value: null,
            //     children: []
            // });
        },
        //选择城市，获取区县
        async handleSelectCity(val) {
            let _this = this;
            this.beloneCity.forEach((item, index) => {
                if (item.value == val) {
                    console.log(item.children);
                    _this.selectCountry = item.children;
                }
            })
            _this.selectCountry.push({
                area: "全部",
                city: "全部",
                code: null,
                codeName: "--",
                gmtCreate: "2020-09-25 11:19:34",
                gmtModified: "2020-09-25 11:19:34",
                id: null,
                province: "云南省",
                version: 0,
            })
        },

        //from表单内选择城市，获取区县
        handleSelectCity2(val) {
            console.log(val);
            let _this = this;
            this.beloneCity.forEach((item, index) => {
                if (item.value == val) {
                    _this.formselectCountry = item.children;
                }
            })
            this.$set(this.form, 'areaCode', null);

        },
        handleFocus(val) {

            this.$set(this.form, 'time', [])
        },
        // dangqian 
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            // this.currentPage = 1;
            this.hanleSelectInfo();

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.hanleSelectInfo();
        },
        //tab页切换
        tabChange: function (tab, event) {
            this.thisTab = tab;
        },

        //点击了下载按钮
        clickDownload: function (data, refPlank) {

        },


        //plank右上角状态切换
        checkoutChange: function (status, data, refPlank) {

        },

        handleChangePage(page) {
            this.inputInfo.page = page;
        },

        responseInit(initData) {
            return {};
        },
        //查看
        handleClick(info) {
            console.log(info);
            this.showtText = "查看项目"
            this.isChecked = true;
            this.isAdd = false;
            this.isChange = false;
            this.dialogFormVisible = true;
            info.cityCode = info.cityCode + '';
            info.areaCode = info.areaCode + '';
            info.projectType = info.projectType + '';
            this.handleSelectCity2(info.cityCode);
            info.time = [];
            info.time.push(info.startTime, info.endTime);
            this.form = info;
        },
        //修改
        handleChangeList(info) {

            this.showtText = "修改项目"
            this.isChecked = false;
            this.isAdd = false;
            this.isChange = true;
            this.dialogFormVisible = true;
            info.cityCode = info.cityCode + '';
            info.areaCode = info.areaCode + '';
            this.handleSelectCity2(info.cityCode);


            info.projectType = info.projectType + '';
            // info.time = [];
            // info.time.push(info.startTime, info.endTime);

            this.form = info;
            this.$set(this.form, 'time', [info.startTime, info.endTime]);
        },
        //删除
        async handleDelList(id) {
            this.$confirm('该项目删除后将无法恢复，您是否确定要将其删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // this.$message({
                //   type: 'success',
                //   message: '删除成功!'
                // });
                let res = await this.componentsMoudel.startPost('projectManagement/delete/' + id, {}, false);
                if (res.body.status_code == 100) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.hanleSelectInfo();
                }
            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        //新增
        handleAdd() {
            this.showtText = "新增项目"
            this.isChecked = false;
            this.isAdd = true;
            this.isChange = false;
            this.dialogFormVisible = true;
            this.form = {};
            this.getSelectInfo();
        },
        handelCancelModel() {
            this.$confirm('是否取消', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.dialogFormVisible = false;
            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //提交信息
        async handleSubmit(formName) {
            let _this = this;
            this.ifClick = true;
            // 新增
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.isAdd) {
                        if (Array.isArray(this.form.time)) {
                            this.form.startTime = this.form.time[0]
                            this.form.endTime = this.form.time[1];
                        }
                        let res = await this.componentsMoudel.startPost('projectManagement/save', this.form, false);
                        console.log(res);
                        if (res.body.status_code == 100) {
                            this.$message('添加成功');
                            this.dialogFormVisible = false;
                            this.hanleSelectInfo();
                            this.ifClick = true;
                        }
                        //删除成功後，清空form表单
                        //修改
                    } else if (this.isChange) {
                        this.form.startTime = this.form.time[0]
                        this.form.endTime = this.form.time[1];
                        let res = await this.componentsMoudel.startPost('projectManagement/update', this.form, false);
                        if (res.body.status_code == 100) {
                            this.$message('修改成功');
                            this.dialogFormVisible = false;
                            this.hanleSelectInfo();
                            this.ifClick = false;
                        }
                    }
                } else {
                    this.$message('有必填项为空，请补充。');
                    return false;
                }
            });

            setTimeout(() => {
                _this.ifClick = false;
            }, 5000)

        },
        getSelectInfo() {
            let that = this;
            //查询行业大类（下拉框）
            that.componentsMoudel.startPost('specificFund/selectCategory', {}, false).then((res) => {
                if (!(this.isAdd || this.isChange || this.isChecked)) {
                    console.log(this.isAdd, this.isChange, this.isChecked);
                    res.body.data.unshift({
                        code: '',
                        category: '全部'
                    });
                }
                res.body.data.forEach((item, index) => {
                    item.value = item.code;
                    item.label = item.category;
                })
                this.inputInfo.occupationOptions = res.body.data;
            })

            that.componentsMoudel.startGet('projectManagement/getCodeAndIndustry', {}, false).then((res) => {

                res.body.data.forEach((item, index) => {
                    item.value = item.value;
                    item.label = item.name;
                })
                this.inputInfo.occupationOptions2 = res.body.data;
            })


        },
        //查询
        hanleSelectInfo(type = 0) {
            if (type == 1) {
                this.currentPage = 1;
            }
            let that = this;
            if (Array.isArray(this.inputInfo.time)) {
                this.inputInfo.startTime = this.inputInfo.time[0];
                this.inputInfo.endTime = this.inputInfo.time[1];
            }
            this.inputInfo.limit = this.limit;
            this.inputInfo.curPage = this.currentPage;
            this.componentsMoudel.startPost('projectManagement/list_all', this.inputInfo, false).then((res) => {
                that.tableData = res.body.data;
                that.total = res.body.cum;
            })



        },
        //清空
        handleClear() {
            this.inputInfo = {
                //专项名称
                name: '',
                //企业名称
                companyName: "",
                //申报方向
                reportingDirection: "",
                //所属行业
                industryType: "",
                occupationOptions: [],
                //项目总投资
                totalInvestment: "",
                //项目开始时间
                actualStartTime: "",
                reviewStatus: "",
            }
            this.inputInfo2 = {
                //专项名称
                programName: '',
                //企业名称
                enterpriseName: "",
                //申报方向
                reportingDirection: "",
                //所属行业
                belongIndustry: "",
                occupationOptions: [],
                //项目总投资
                projectInvestment: "",
                //项目开始时间
                startTime: "",
                projectApprovalStatus: "",
                limit: 10,
                currentPage: 1,
            }
            this.getSelectInfo();
            this.hanleSelectInfo();
        },

    }

root.mounted = function () {

    // this.hanleSelectInfo();
    // this.hanleSelectInfo2();

    //查询行业大类（下拉框）
    this.getSelectInfo();
    //获取州市
    this.hangeGet();

    console.dir(this.$route)
    if(this.$route.query.cityCode) {
        this.inputInfo.cityCode = this.$route.query.cityCode
        this.hanleSelectInfo()
    } else {
        this.hanleSelectInfo();
    }

}
FactoryComponents.initComponent(root);