<template>
  <div class="bbd-container bbd-director"> 
		<el-card class="bbd-user">
			<el-image :src="avatarImg" fit="fill" style="width: 80px; height: 80px;border-radius: 50%;"></el-image>
			<div style="margin: 15px 0;">{{noontip}}，{{ userInfo.governmenuserInfoVo.name
              }}{{ userInfo.governmenuserInfoVo.reserved }}</div>
			<div class="bbd-examine">
				待审核任务<span class="bbd-examine-num" @click="handleTo('makeReport/signAndHand?index=13&isActive=0')">
				{{industryMonitorData}}</span>项
			</div>
		</el-card>

		<el-card class="bbd-notice" style="height: 210px">
			<el-tabs v-model="noticeTabActive" tab-position="left" class="bbd-notice-tabs" @tab-click="noticeClick">
				<el-tab-pane label="行业资讯" name="1"></el-tab-pane>
				<el-tab-pane label="政策文件" name="3"></el-tab-pane>
				<el-tab-pane label="政策解读" name="4"></el-tab-pane>
				<!-- <el-tab-pane label="热点研报" name="6"></el-tab-pane> -->
			</el-tabs>
			<div class="bbd-notice-container">
				<div class="bbd-notice-item" v-for="(item, index) in noticeOptions" :key="index" @click="noticechange(item)">
					<span style="margin-right: 10px;">{{item.gmtCreate}}</span>
					<span>{{item.fileName}}</span>
				</div>
				<div class="bbd-notice-more" @click="noticeMore">更多>></div>
				<div v-if="noticeOptions.length == 0" style="font-size: 14px;">暂无数据</div>
			</div>
		</el-card>

		<el-card class="bbd-price" style="height: 210px">
			<div class="bbd-price-title">产品价格</div>
			<div style="height: 166px;overflow: auto" @mouseover="mouseOver"
					@mouseleave="mouseLeave">
				<el-table class="bbd-price-table" :data="priceData" v-infinite-scroll="load"  
					style="transition: all 0.5s;" :style="'margin-top:-' + buildTop + 'px'"
					>
					<el-table-column prop="name" width="140" show-overflow-tooltip label="名称"> </el-table-column>
					<el-table-column prop="priceRange" width="120" label="价格范围" show-overflow-tooltip>	</el-table-column>
					<el-table-column prop="mean" align="center" label="均价">	</el-table-column>
					<el-table-column prop="upLow" align="center" label="涨跌">	</el-table-column>
					<el-table-column prop="unit" align="center" label="单位">	</el-table-column>
				</el-table>
			</div>
		</el-card>
		
    <div class="bbd-title">工业经济运行监测</div>
		<el-card>
			<operating-guides></operating-guides>
		</el-card>
		
		<div v-if="userInfo.depId == 6" class="bbd-title">
			项目管理
			<div class="bbd-title-more" @click="$router.push({path: '/management'})">更多>></div>
		</div>
		<div v-if="userInfo.depId == 6" class="bbd-management">
			<el-card class="bbd-menagement-item">
				<div class="bbd-management-title">
					项目总个数
					<!-- <el-tooltip content="项目总个数">
						<span class="el-icon-warning-outline" style="font-size: 14px;color: #999"></span>
					</el-tooltip> -->
				</div>
				<div class="bbd-management-value">{{managementData.projects}}个</div>
				<div class="bbd-management-container">
					<span class="bbd-management-sum-item">在谈<span style="color:#409eff">{{managementData.sign}}</span></span>
					<span class="bbd-management-sum-item">在建<span style="color:#409eff">{{managementData.build}}</span></span>
					<span class="bbd-management-sum-item">投产<span style="color:#409eff">{{managementData.put}}</span></span>
				</div>
			</el-card>
			<el-card class="bbd-menagement-item">
				<div class="bbd-management-title">
					项目总投资
					<!-- <el-tooltip content="项目总投资">
						<span class="el-icon-warning-outline" style="font-size: 14px;color: #999"></span>
					</el-tooltip> -->
				</div>
				<div class="bbd-management-value">{{(managementData.projectAmounts/10000).toFixed(2)}}亿元</div>
				<div class="bbd-management-container">
					
				</div>
			</el-card>
			<el-card class="bbd-menagement-item">
				<div class="bbd-management-title">
					投资总进度
					<!-- <el-tooltip content="投资总进度">
						<span class="el-icon-warning-outline" style="font-size: 14px;color: #999"></span>
					</el-tooltip> -->
				</div>
				<div class="bbd-management-value">{{managementData.schedule}}%</div>
				<div class="bbd-management-container">
					<el-progress style="width: 180px;" :percentage="managementData.schedule"></el-progress>
				</div>
			</el-card>
		</div>

		<el-card v-if="userInfo.depId == 6" class="bbd-management-table">
			<div class="bbd-distribution-echarts" style="width: 400px;height:400px;overflow:hidden;">
				<div id="distributionEcharts" style="margin-top: -30px;margin-left: 0px;width:400px;height:420px;"></div>
			</div>
			<div class="bbd-industry-table" style="width: calc(100% - 410px)">
				<div class="bbd-management-table-title">项目总投资TOP10</div>
				<el-table class="bbd-ranking-yunnan-table" :data="managementTableData">
					<el-table-column prop="name" label="项目名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="ownedEnterprise" label="归属企业" show-overflow-tooltip></el-table-column>
					<el-table-column prop="projectType" align="center" label="项目类型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="endTime" width="100" label="结束日期" show-overflow-tooltip></el-table-column>
					<el-table-column prop="proTotalInvestment" align="right" label="项目总投资(万元)" show-overflow-tooltip></el-table-column>
					<el-table-column width="120" label="投资进度">
						 <template slot-scope="scope">
							 <el-progress
              	:stroke-width="15"
								class="bbd-progress-value"
								:text-inside="true"
								status="success"
								:class="{'bbd-progress': parseInt(scope.row.investmentProgress) < 5}" 
								:percentage="parseInt(scope.row.investmentProgress)"></el-progress>
						 </template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>

		<div class="bbd-title">重点企业TOP10
			<div class="bbd-title-more" @click="industryMore">更多>></div>
		</div>
		<el-card>
			<div class="bbd-industry-table" style="width: calc(100% - 400px);">
				<el-table class="bbd-ranking-yunnan-table" highlight-current-row :data="industryTableData" 
					@cell-mouse-enter="industryRowClick"
					@cell-click="industryCellClick">
					<el-table-column type="index" width="50" label="排名"></el-table-column>
					<el-table-column prop="companyName" width="180" label="企业名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="city" label="所属州市" show-overflow-tooltip></el-table-column>
					<el-table-column prop="registeredCapital" align="right" label="注册资本(万元)"></el-table-column>
					<el-table-column prop="totalCapital" align="right" label="总资产(万元)"></el-table-column>
					<el-table-column prop="totalOperatingRevenue" align="right" width="140" label="营业总收入(万元)"></el-table-column>
					<el-table-column prop="totalProfit" align="right" label="利润总额(万元)"></el-table-column>
				</el-table>
			</div>
			<div class="bbd-distribution-echarts" style="width: 370px;height:312px;overflow:hidden;">
				<div id="enterEcharts" style="margin-top: -40px;margin-left: -10px;width:380px;height:380px;"></div>
			</div>
		</el-card>

		<div class="bbd-title">企业直报</div>
		<el-card class="bbd-report-echarts">
			<div id="reportEcharts" style="width:100%;height:160px;"></div>
		</el-card>

		<el-card class="bbd-interaction">
			<div class="bbd-interaction-tips">政府互动专区：企业遇到困难，在这里说</div>
			<div class="bbd-interaction-msg">【{{userInfo.depName}}】累计收到留言
				<span @click="handleTo('interact?index=0',null,	userRoot.hasAuthEnterpriseMessage)">{{interactionSum}}</span>
			条</div>
		</el-card>

  </div>  
</template>

<script>
import router from 'vue-router';
import echarts from 'echarts';
import yunnan from "@/util/gov/province/yunnan.json";
import operatingGuides from './OperatingGuides'
export default {
	components: {
		operatingGuides,
	},
	data() {
		return {
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
			avatarImg: require('../../../assets/login/Profile-picture.png'),
			noontip: '早上好',
			noticeTabActive: '1',
			noticeImg: require('../../../assets/login/beijing.png'),

			priceData: [],
			noticeOptions: [],
			buildTop: 0,
			timer: null,

			// 项目管理
			managementData: {},
			managementTableData: [],

			// 重点企业
			industryTableData: [],
			enterEchartsTitle: '云南胜立硅业有限公司(80分)',
			enterEchartsData: [],
			enterEchartsIndicator: [
				{ text: '企业实力', max: 100 },  //企业实力得分
				{ text: '社会贡献', max: 100 },  //社会贡献得分
				{ text: '科技创新', max: 100 }, //科研创新得分
				{ text: '企业风险', max: 100 },  //利润总得分
				{ text: '企业经营', max: 100 }, //企业经营得分
			],

			monitorChinaData: [
				{province: '云南省', number: 200, percentage: '50%'},
				{province: '云南省', number: 200, percentage: '50%'},
				{province: '云南省', number: 200, percentage: '50%'}
			],

			monitorYunanData: [
				{province: '云南省', number: 200, percentage: '50%'},
				{province: '云南省', number: 200, percentage: '50%'},
				{province: '云南省', number: 200, percentage: '50%'},
				{province: '云南省', number: 200, percentage: '50%'},
				{province: '云南省', number: 200, percentage: '50%'}
			],

			developmontTips: '',
			developmontValue: '',

			userRoot: {},
			industryMonitorData: 0,
			reportFillData: {},
			interactionSum: 0,

			distributionoption: {
				title: {
					text: '项目区域分布',
					bottom: 30,
					right: 30,
					textStyle: {
						fontSize: 12,
						color: '#999'
					}
				},
				visualMap: {
					min: 0,
					max: 100,
					show: true,
					itemWidth: 10,
					itemHeight:100
				},
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
				series: [
						{
							type: "map",
							map: "yunnan",
							roam: false,
							aspectScale:1,
							zoom:1.1,
							itemStyle: {
								normal: { label: { show: true } },
								emphasis: { label: { show: true } },
							},
							geoIndex: 0,
							data: []
					}
				]
			}

		}
	},
	created() {
		// setInterval(this.buildScroll,1000)
		this.getManagementData()
		this.getNoticeData(this.noticeTabActive)
		this.getPriceData()
	},
	mounted() {
		if(this.userInfo.depId == 6) {
			this.getDistributionData()
		}
		this.mynoontip()
		this.getEnterData() // 重点企业图标数据

		this.getInteractiveInfo()
		this.getReport()

		this.getIndustryCompany()

		this.getInteractionData()
	},
	methods: {
		load() {

		},
    mynoontip() {
        let date = new Date()
        if (date.getHours() >= 0 && date.getHours() < 12) {
            this.noontip = '上午好'
        } else if (date.getHours() >= 12 && date.getHours() < 18) {
            this.noontip = '下午好'
        } else {
            this.noontip = '晚上好'
        }
		},

		// 获取咨询数据
		getNoticeData(type) {
			this.componentsMoudel.startGet('tbbdfileinfo/list_all?type=' + type + '&officeCode=' + this.userInfo.depId, {}, false).then((res) => {
				this.noticeOptions = res.body.data.splice(0,5)
				this.noticeOptions.forEach(item => {
					if(type == '6') {
						if(/^([0-9-]+)$/.test(item.fileName.substring(0,10))) {
							item.fileName = item.fileName.substring(10)
						}
					}
					item.gmtCreate = item.gmtCreate.substring(0, 10)
				})
    	})
		},
		
		// 咨询选项卡点击
		noticeClick(tab) {
			this.getNoticeData(tab.name)
		},

		// 点击咨询列表
		noticechange(item) {
			window.open(item.path)
		},

		// 更多咨询
		noticeMore() {
			let noticeName = ''
			if(this.noticeTabActive == '1') {
				noticeName = '行业资讯'
			} else if(this.noticeTabActive == '3') {
				noticeName = '政策文件'
			}  else if(this.noticeTabActive == '4') {
				noticeName = '政策解读'
			}  else if(this.noticeTabActive == '6') {
				noticeName = '热点研报'
			} 
			this.$router.push({
				path: '/newsList',
				query: {
					type: this.noticeTabActive,
					noticeName: noticeName
				}
			})
		},

		// 获取重点企业TOP10
		getIndustryCompany() {
			this.componentsMoudel.startGet('manage/department/getDepartmentIndustry?departmentId=' + this.userInfo.depId, {}, false).then((res) => {
				// let arr = res.body.data.map(item =>{
				// 	return item.industryCode
				// })
				let arr = ''
				if(this.userInfo.depId == 5) {
					arr = '16'
				} else if(this.userInfo.depId == 6) {
					arr = '39'
				} else if(this.userInfo.depId == 15) {
					arr = '27,39'
				} else if(this.userInfo.depId == 16) {
					arr = '10,30,8,31,6,9,32'
				} else if(this.userInfo.depId == 17) {
					arr = '38,43,33,41,36,37,34,40,35'
				} else if(this.userInfo.depId == 18) {
					arr = '18,17,28,21,20,19,24,29,23,22'
				} else if(this.userInfo.depId == 19) {
					arr = '15,13,14,27'
				} else if(this.userInfo.depId == 20) {
					arr = '26,25,7'
				}

				this.componentsMoudel.startGet('tbbdcompanyshow/list_all?industryCode=' + arr, {}, false).then((res) => {
					res.body.data.forEach(item => {
						if(item.registeredCapital == null || item.registeredCapital == '0' ||  item.registeredCapital == 0) {
							item.registeredCapital = '--'
						}
						if(item.totalCapital == null || item.totalCapital == '0' ||  item.totalCapital == 0) {
							item.totalCapital = '--'
						} 
						if(item.totalOperatingRevenue == null || item.totalOperatingRevenue == '0' ||  item.totalOperatingRevenue == 0) {
							item.totalOperatingRevenue = '--'
						}
						if(item.totalProfit == null || item.totalProfit == '0' ||  item.totalProfit == 0) {
							item.totalProfit = '--'
						}
					})
					this.industryTableData = res.body.data.splice(0,10)
					this.enterEchartsTitle = this.industryTableData[0].companyName + '(' + parseInt(this.industryTableData[0].score) + '分)'
					this.enterEchartsData.push(this.industryTableData[0].enterpriseStrengthScore)
					this.enterEchartsData.push(this.industryTableData[0].socialContributionScore)
					this.enterEchartsData.push(this.industryTableData[0].technologicalInnovationScore)
					this.enterEchartsData.push(this.industryTableData[0].enterpriseRiskScore)
					this.enterEchartsData.push(this.industryTableData[0].businessOperationScore)

					this.enterEchartsIndicator[0].text = 
						this.enterEchartsIndicator[0].text + '(' + 
						parseFloat(this.industryTableData[0].enterpriseStrengthScore).toFixed(0) + ')'

					this.enterEchartsIndicator[1].text = 
						this.enterEchartsIndicator[1].text + '(' + 
						parseFloat(this.industryTableData[0].socialContributionScore).toFixed(0) + ')'

					this.enterEchartsIndicator[2].text = 
						this.enterEchartsIndicator[2].text + '(' + 
						parseFloat(this.industryTableData[0].technologicalInnovationScore).toFixed(0) + ')'

					this.enterEchartsIndicator[3].text = 
					this.enterEchartsIndicator[3].text + '(' + 
					parseFloat(this.industryTableData[0].enterpriseRiskScore).toFixed(0) + ')'

					this.enterEchartsIndicator[4].text = 
						this.enterEchartsIndicator[4].text + '(' + 
						parseFloat(this.industryTableData[0].businessOperationScore).toFixed(0) + ')'
					this.getEnterData()
				})

			})
		},
		
		// 重点企业表格项移入
		industryRowClick(row) {
			this.enterEchartsData = []
			this.enterEchartsTitle = row.companyName + '(' + parseInt(row.score) + '分)'
			this.enterEchartsData.push(row.enterpriseStrengthScore)
			this.enterEchartsData.push(row.socialContributionScore)
			this.enterEchartsData.push(row.technologicalInnovationScore)
			this.enterEchartsData.push(row.enterpriseRiskScore)
			this.enterEchartsData.push(row.businessOperationScore)	
			
			this.enterEchartsIndicator[0].text = '企业实力(' + parseFloat(row.enterpriseStrengthScore).toFixed(0) + ')'
			this.enterEchartsIndicator[1].text = '社会贡献(' + parseFloat(row.socialContributionScore).toFixed(0) + ')'
			this.enterEchartsIndicator[2].text = '科技创新(' + parseFloat(row.technologicalInnovationScore).toFixed(0) + ')'
			this.enterEchartsIndicator[3].text = '企业风险(' + parseFloat(row.enterpriseRiskScore).toFixed(0) + ')'
			this.enterEchartsIndicator[4].text = '企业经营(' + parseFloat(row.businessOperationScore).toFixed(0) + ')'
			this.getEnterData()
		},

		// 点击企业名称单元格
		industryCellClick() {
			// this.$router.push({
			// 	path: '/estate',
			// 	queryy: {
			// 		index: 11
			// 	}
			// })
		},

		// 重点企业显示更多
		industryMore() {
			this.$router.push({
				path: '/business',
				query: {
					index: 10
				}
			})
		},

		// 获取项目数据
		getManagementData() {
			this.componentsMoudel.startGet('projectManagement/getProjectManageCount', {}, false).then((res) => {
				this.managementData = res.body.data
				this.managementData.schedule = parseInt((this.managementData.schedule).toFixed())
				this.managementData.projectTypeCount.forEach(item => {
					if(item.projectType == 0) {
						this.managementData.sign = item.typeCount
					} else if(item.projectType == 4) {
						this.managementData.put = item.typeCount
					}
					this.managementData.build = this.managementData.projectTypeCount[1].typeCount + 
																			this.managementData.projectTypeCount[2].typeCount
				})
				let distributionoptionData = []
				this.componentsMoudel.startGet('projectManagement/getAreaMenu', {}, false).then((area) => {
					this.managementData.areaDistrib.forEach(item => {
						area.body.data.forEach(area => {
							if(area.value == item.cityCode) {
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
					})
					this.distributionoption.series[0].data = distributionoptionData
					this.getDistributionData()
				})
    	})

			// 项目管理列表数据
			this.componentsMoudel.startPost('projectManagement/list_all', {}, false).then((res) => {
					res.body.data.forEach(item => {
						item.endTime = item.endTime.substring(0, 10)
						if(item.projectType == 0) {
							item.projectType = '在谈'
						} else if(item.projectType == 1) {
							item.projectType = '签约'
						}  else if(item.projectType == 2) {
							item.projectType = '新工厂'
						}  else if(item.projectType == 3) {
							item.projectType = '续建'
						} else if(item.projectType == 4) {
							item.projectType = '竣工投产'
						} 
					})
					this.managementTableData = res.body.data.splice(0, 10)
			})

		},

		// 获取企业分布地图数据
		getDistributionData() {
			let myChart = echarts.init(document.getElementById("distributionEcharts"));
			echarts.registerMap('yunnan', yunnan)
			let option = this.distributionoption
			myChart.setOption(option);
		},

		// 重点企业
		getEnterData() {
			var myChart = echarts.init(document.getElementById('enterEcharts'));
			var	option = {
						title: {
								text: this.enterEchartsTitle,
								bottom: 30,
								x: 'center',
								textStyle: {
									color: '#409eff'
								}
						},
						legend: {
								data: ['张三']
						},
						radar: [
							{
								indicator: this.enterEchartsIndicator,
								center: ['55%', '50%'],
								radius: 75,
								 name:{
										textStyle:{color:'#333'}
									}
							}
						],
						series: [
							{
								name: '成绩单',
								type: 'radar',
								data: [
										{
												value: this.enterEchartsData,
												name: '张三',
												label: {
														// show: true,
														formatter: function(params) {
																return params.value;
														}
												}
										}
								]
						}
					]
			};
			myChart.setOption(option);
		},
		
		// 获取企业直报图表数据
		getReport() {
			this.componentsMoudel.startGet('governmentfill/getReportStatistics', {}, false).then((res) => {
				this.reportFillData = res.body.data
				if(this.reportFillData.FillRate == null) {
					this.reportFillData.FillRate = '0%'
				}
				this.componentsMoudel.startGet('manage/menu/getInteractiveInfoOverview', {}, false).then((res) => {
					this.reportFillData.monthIssueTotal = res.body.data.monthIssueTotal
					this.reportFillData.monthIssueEnterprise = res.body.data.monthIssueEnterprise
					this.getReportData()
				})
    	})
		},

		// 获取价格数据u
		getPriceData() {
			let param = {
				limit: 999999,
				curPage: 1
			}
			this.componentsMoudel.startPost('prodPrice/list_all', param, false).then((res) => {
				this.priceData = res.body.data
				this.setInterValData()
    	})
		},
		
		// 定时器定时向上移动
		setInterValData() {
			this.timer = setInterval(() => {
				this.buildTop += 5
				if(this.buildTop > this.priceData.length * 30 - 30 * 12) {
					this.buildTop = 0	
				}
			}, 500)
			if(this.buildOptions.length < 12) {
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


		// 企业直报
		getReportData() {
			var myChart = echarts.init(document.getElementById('reportEcharts'));
			var placeHolderStyle = {
					normal: {
							label: {
									show: false
							},
							labelLine: {
									show: false
							},
							color: "rgba(0,0,0,0)",
							borderWidth: 0
					},
					emphasis: {
							color: "rgba(0,0,0,0)",
							borderWidth: 0
					}
			};

			var dataStyle = {
					normal: {
							formatter: '{c}%',
							position: 'center',
							show: true,
							textStyle: {
									fontSize: '26',
									fontWeight: 'normal',
									color: '#34374E'
							}
					}
			};
			var dataStyle1 = {
					normal: {
							formatter: '{c}',
							position: 'center',
							show: true,
							textStyle: {
									fontSize: '26',
									fontWeight: 'normal',
									color: '#34374E'
							}
					}
			};
			var	option = {
					title: [{
						text: '填报率',
						left: '19%',
						top: '60%',
						textAlign: 'center',
						textStyle: {
								fontWeight: 'normal',
								fontSize: '15',
								color: '#AAAFC8',
								textAlign: 'center',
						},
				}, {
						text: '本月发放量',
						left: '49%',
						top: '60%',
						textAlign: 'center',
						textStyle: {
								color: '#AAAFC8',
								fontWeight: 'normal',
								fontSize: '15',
								textAlign: 'center',
						},
				}, {
						text: '本月发放企业数',
						left: '79%',
						top: '60%',
						textAlign: 'center',
						textStyle: {
								color: '#AAAFC8',
								fontWeight: 'normal',
								fontSize: '15',
								textAlign: 'center',
						},
				}],

				//第一个图表
				series: [
					{
								type: 'pie',
								hoverAnimation: false, //鼠标经过的特效
								radius: ['80%', '85%'],
								center: ['20%', '50%'],
								startAngle: 225,
								labelLine: {
										normal: {
												show: false
										}
								},
								label: {
										normal: {
												position: 'center'
										}
								},
								data: [{
												value: 100,
												itemStyle: {
														normal: {
																color: '#E1E8EE'
														}
												},
										}, {
												value: 35,
												itemStyle: placeHolderStyle,
										},

								]
						},
						//上层环形配置
						{
								type: 'pie',
								hoverAnimation: false, //鼠标经过的特效
								radius: ['80%', '85%'],
								center: ['20%', '50%'],
								startAngle: 225,
								labelLine: {
										normal: {
												show: false
										}
								},
								label: {
										normal: {
												position: 'center'
										}
								},
								data: [{
												value: parseFloat(this.reportFillData.FillRate),
												itemStyle: {
														normal: {
																color: '#6F78CC'
														}
												},
												label: dataStyle,
										}, {
												value: 100 - this.reportFillData.FillRate,
												itemStyle: placeHolderStyle,
										},

								]
						},


						//第二个图表
						{
								type: 'pie',
								hoverAnimation: false,
								radius: ['80%', '85%'],
								center: ['50%', '50%'],
								startAngle: 225,
								labelLine: {
										normal: {
												show: false
										}
								},
								label: {
										normal: {
												position: 'center'
										}
								},
								data: [{
												value: 100,
												itemStyle: {
														normal: {
																color: '#E1E8EE'


														}
												},

										}, {
												value: 35,
												itemStyle: placeHolderStyle,
										},

								]
						},

						//上层环形配置
						{
								type: 'pie',
								hoverAnimation: false,
								radius: ['80%', '85%'],
								center: ['50%', '50%'],
								startAngle: 225,
								labelLine: {
										normal: {
												show: false
										}
								},
								label: {
										normal: {
												position: 'center'
										}
								},
								data: [{
												value: this.reportFillData.monthIssueTotal,
												itemStyle: {
														normal: {
																color: '#91cc75'
														}
												},
												label: dataStyle1,
										}, {
												value: 55,
												itemStyle: placeHolderStyle,
										},

								]
						},

						
						//第三个图表
						{
								type: 'pie',
								hoverAnimation: false,
								radius: ['80%', '85%'],
								center: ['80%', '50%'],
								startAngle: 225,
								labelLine: {
										normal: {
												show: false
										}
								},
								label: {
										normal: {
												position: 'center'
										}
								},
								data: [{
												value: 100,
												itemStyle: {
														normal: {
																color: '#E1E8EE'


														}
												},

										}, {
												value: 35,
												itemStyle: placeHolderStyle,
										},

								]
						},

						//上层环形配置
						{
								type: 'pie',
								hoverAnimation: false,
								radius: ['80%', '85%'],
								center: ['80%', '50%'],
								startAngle: 225,
								labelLine: {
										normal: {
												show: false
										}
								},
								label: {
										normal: {
												position: 'center'
										}
								},
								data: [{
												value: this.reportFillData.monthIssueEnterprise,
												itemStyle: {
														normal: {
																color: '#fc8452'
														}
												},
												label: dataStyle1,
										}, {
												value: 55,
												itemStyle: placeHolderStyle,
										},

								]
						},
				]
			}
			myChart.setOption(option);

		},

		getInteractiveInfo() {
			// 经济运行处累计收到留言
			this.componentsMoudel.startGet('manage/menu/getInteractiveInfo', {}, false).then((res) => {
					this.userRoot = res.body.data;
			})
			// 待审核任务
			this.componentsMoudel.startGet('manage/menu/getInteractiveReviewCount', {}, false).then((res) => {
					this.industryMonitorData = res.body.data;
			})
		},

		// 政府直通车跳转
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

		getInteractionData() {
			let params = {
				ResponsibleDepartment: 5,
				category: "全部",
				currentPage: 1,
				endTime: "",
				fileTime: "",
				pageSize: 5,
				startTime: "",
				title: ""
			}
			this.componentsMoudel.startPost('interaction/queryPageSide', params, false).then((res) => {
				this.interactionSum = res.body.cum
			})

		}
	}
    
}
</script>

<style scoped lang="scss">
/* 公用样式 */
@import '../../css/director.css';

/* 右侧消息通知 */
.bbd-notice {
	margin-left: 20px;
	display: inline-block;
	vertical-align: top;
	width: calc( 100% - 694px);
}

/* 新闻通知 */
.bbd-notice-tabs {
	display: inline-block;
	vertical-align: top;
	width: 110px;
	height: 160px;
}
.bbd-notice .el-tab-pane {
	width: 0;
}
.bbd-notice-container {
	display: inline-block;
	vertical-align: top;
	width: calc(100% - 110px);
}

.bbd-notice-item {
	padding: 5px 0;
	font-size: 14px;
	color: #666;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.bbd-notice-item:hover {
	color: #409eff;
}
.bbd-notice-more {
	float: right;
	font-size: 14px;
	color: #888;
	cursor: pointer;
}
.bbd-notice-more:hover {
	color: #409eff;
}

.bbd-price {
	margin-left: 14px;
	display: inline-block;
	vertical-align: top;
	width: 450px;
}

.bbd-monitor-echarts {
	display: inline-block;
	vertical-align: top;
	width: 1000px;
}

.bbd-monitor-container {
	margin-top: 20px;
	.bbd-monitor-ranking {
		margin-left: 18px;
		display: inline-block;
		vertical-align: top;
		width: calc( 100% - 660px);
	}
	.bbd-ranking-title {
		text-align: center;
		font-weight: bolder;
		color: #409eff;
	}
	.bbd-monitor-yunnan {
		margin-top: 14px;
		.bbd-ranking-title {
			margin-top: 8px;
			display: inline-block;
			vertical-align: top;
			width: 30px;
		}
		.bbd-ranking-yunnan-table {
			margin-left: 10px;
			display: inline-block;
			vertical-align: top;
			width: calc( 100% - 40px );
		}
	}
}

.bbd-econ-tabs {
	display: inline-block;
	vertical-align: top;
	width: 200px;
	height: 380px;
}

// 行业企业发展情况
.bbd-developmont {
	display: inline-block;
	vertical-align: top;
	.bbd-developmont-echarts {
		position: relative;
		display: inline-block;
		vertical-align: top;
		.bbd-tips {
			position: absolute;
			top: 150px;
			left: 110px;
			width: 150px;
			height: 80px;
			z-index: 9;
			text-align: center;
			font-size: 16px;
			color: #409eff;
		}
	}	
	.bbd-industry-echarts {
		margin-left: 14px;
		position: relative;
		display: inline-block;
		vertical-align: top;
	}
}

	
	.bbd-industry-table {
		display: inline-block;
		vertical-align: top;
	}
	.bbd-industry-title {
		padding-bottom: 20px;
		text-align: center;
		font-weight: bolder;
		color: #409eff;
	}
	.bbd-distribution-echarts {
		margin-top: 14px;
		display: inline-block;
		vertical-align: top;
	}

// 项目管理
.bbd-management {
	margin-left: -10px;
	margin-right: -10px;
	.bbd-menagement-item {
		margin: 0 10px;
		display: inline-block;
		vertical-align: top;
		margin-bottom: 14px;
		width: calc(33.33% - 22px);
		height: 66px;
	}
	.bbd-management-value {
		display: inline-block;
		vertical-align: middle;
		margin-right: 20px;
		font-size: 22px;
		font-weight: bolder;
		color: #555;
	}
	.bbd-management-sum-item {
		font-size: 12px;
		margin-right: 10px;
	}
	.bbd-management-title {
		display: inline-block;
		vertical-align: middle;
		margin-right: 20px;
	}
	.bbd-management-container {
		display: inline-block;
		vertical-align: middle;
	}
}

.bbd-price-title {
	text-align: center;
	font-size: 14px;
	font-weight: bolder;
	color: #409eff;
}

#reportEcharts {
	display: inline-block;
	vertical-align: top;
}

.bbd-examine {
	// width: calc(100% - 540px);
	// margin-top: 80px;
	display: inline-block;
	vertical-align: top;
	text-align: center;
	font-size: 14px;
	color: #666;
}
.bbd-examine-num {
	margin: 0 10px;
	font-size: 20px;
	font-weight: bolder;
	color: #409eff;
	cursor: pointer;
}

// 互动专区
.bbd-interaction {
	display: inline-block;
	vertical-align: top;
	width: 500px;
	height: 200px;
	.bbd-interaction-tips {
		margin-top: 40px;
		margin-bottom: 30px;
		margin-left: 20px;
		font-size: 22px;
		color: #333;
	}
	.bbd-interaction-msg {
		margin-right: 20px;
		text-align: right;
		font-size: 18px;
		color: #666;
		span {
			margin:0 10px;
			font-size: 30px;
			font-weight: bolder;
			color: #409eff;
			cursor: pointer;
		}
	}
}

// 企业直报
.bbd-report-echarts {
	display: inline-block;
	vertical-align: top;
	margin-right: 14px;
	width: calc( 100% - 520px);
}

.bbd-management-table-title {
	text-align: center;
	font-size: 16px;
	font-weight: bolder;
	color: #409eff;
}

</style>

<style lang="scss">
.bbd-monitor-yunnan {
	td {
		padding: 1px 0;
	}
}


.bbd-econ-tabs {
	.el-tabs__item {
		width: 200px;
    line-height: 20px;
    height: auto;
    padding: 10px 20px;
    white-space: break-spaces;
	}
}

// .bbd-ranking-yunnan-table {
// 	td {
// 		padding: 6px 0;
// 	}
// }

.bbd-price-table {
	height: 1000000px;
	overflow: auto;
	td {
		padding: 4px 0;
	}
}

.bbd-progress {
  .el-progress-bar__innerText {
    color: #333;
  }
}
.bbd-progress-value {
	.el-progress-bar__inner {
		max-width: 100% !important;
	}
}

</style>