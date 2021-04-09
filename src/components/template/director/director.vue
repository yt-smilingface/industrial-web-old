<template>
  <div class="bbd-container bbd-director"> 
		<el-carousel class="bbd-belt" height="210px">
			<el-carousel-item v-for="(item, index) in carouselOptions" :key="index">
				<el-image @click="carouselChange(item)" :src="item.slideshow"></el-image>
				<div class="bbd-carousel-name">{{item.fileName}}</div>
			</el-carousel-item>
		</el-carousel>

		<el-card class="bbd-notice" style="height: 210px">
			<el-tabs v-model="noticeTabActive" tab-position="left" class="bbd-notice-tabs" @tab-click="noticeClick">
				<el-tab-pane label="时政要闻" name="5"></el-tab-pane>
				<el-tab-pane label="工信动态" name="2"></el-tab-pane>
				<el-tab-pane label="政策文件" name="3"></el-tab-pane>
				<!-- <el-tab-pane label="热点研报" name="6"></el-tab-pane> -->
			</el-tabs>
			<div class="bbd-notice-container">
				<!-- <el-image :src="noticeImg" fit="fill" style="float:left; margin-right:10px; width: 200px; height: 160px;"></el-image> -->
				<div class="bbd-notice-item" v-for="(item, index) in noticeOptions" :key="index" @click="noticechange(item)">
					<span style="margin-right: 10px;">{{item.gmtCreate}}</span>
					<span>{{item.fileName}}</span>
				</div>
				<div class="bbd-notice-more" @click="noticeMore">更多>></div>
				<div v-if="noticeOptions.length == 0" style="font-size: 14px;">暂无数据</div>
			</div>
		</el-card>

    <div class="bbd-title">工业经济运行监测</div>
		<el-card>
			<el-tabs class="bbd-monitor-tabs" @tab-click="monitorTabClick">
				<el-tab-pane v-for="(item, index) in monitorOptions" :key="index">
					<div slot="label" class="bbd-monitor-tabs-slot">
						<div style="font-size: 12px;text-align:center;">{{item.targetName}}</div>
						<div class="bbd-monitor-value" style="text-align:center;" 
							:class="{'bbd-monitor-value-down':  item.sort == 1,'bbd-monitor-value-inden':  item.sort == 0,}"
						>{{item.values}}</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-card>

		<div class="bbd-monitor-container">
			<el-card class="bbd-monitor-echarts">
				<div id="monitorEcharts" style="width:600px;height:450px;"></div>
				<!-- <ECharts ref="eCharts" style="width: 600px; height: 450px;" :options="echartsData.echartsTrendData"></ECharts> -->
			</el-card>
			<div class="bbd-monitor-ranking">
				<el-card class="bbd-item">
					<div class="bbd-ranking-title" dtyle="margin-bottom: 3px;">全国排名
						<div class="bbd-title-more" @click="chinaRankingMore">更多</div>
					</div>
					<el-table :data="monitorChinaData">
						<el-table-column width="130" prop="province" label="省份"> </el-table-column>
						<el-table-column v-if="isMonitorPercentage" prop="number" :label="yunnanTableNumber"></el-table-column>
						<el-table-column prop="percentage" :label="yunnanTablePercentage">	</el-table-column>
					</el-table>
				</el-card>
				<el-card class="bbd-item bbd-monitor-yunnan">
					<!-- <div class="bbd-ranking-title">云南省各区域排名
						<div v-if="isRankingReturn" class="bbd-title-more" @click="yunnanAreaReturn">返回</div>
					</div> -->
					 <el-tabs v-model="yunnanTabsActive" @tab-click="monitoyYunnanClick">
						<el-tab-pane label="云南省各区域排名" name="first">
							<el-table class="bbd-ranking-yunnan-table" 
							style="height: 200px; overflow: auto;"
							:default-sort="{prop:'sort',order:'ascending'}"
							:data="monitorYunanData">
								<el-table-column sortable prop="sort" width="80" align="left" label="排名"> </el-table-column>
								<el-table-column prop="province" width="80" align="left" label="区域"> </el-table-column>
								<el-table-column v-if="isRankingcumul" prop="cumul" align="center" label="工业增加值累计值(亿元)"> </el-table-column>
								<el-table-column v-if="isRankingNumber" prop="number" align="center" :label="yunnanTableNumber"> </el-table-column>
								<el-table-column v-if="isPercentage" prop="percentage" align="center" :label="yunnanTablePercentage">	</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="云南省各州市排名" name="second">
							<el-table class="bbd-ranking-yunnan-table" 
							style="height: 200px; overflow: auto;"
							:default-sort="{prop:'sort',order:'ascending'}"
							:data="monitorYunanAreaData">
								<el-table-column sortable prop="sort" width="80" align="left" label="排名"> </el-table-column>
								<el-table-column prop="province" width="80" align="left" label="区域"> </el-table-column>
								<el-table-column v-if="isRankingcumul" prop="cumul" align="center" label="工业增加值累计值(亿元)"> </el-table-column>
								<el-table-column v-if="isRankingNumber" prop="number" align="center" :label="yunnanTableNumber"> </el-table-column>
								<el-table-column v-if="isPercentage" prop="percentage" align="center" :label="yunnanTablePercentage">	</el-table-column>
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</div>
		</div>
		
		<div class="bbd-developmont bbd-developmont-project">
    	<div class="bbd-title">产业企业发展情况</div>
			<el-card>
				<div class="bbd-developmont-echarts" style="width: 435px;border-right: 1px solid #ddd;">
					<div class="bbd-tips">
						{{developmontTips}}<br/>
						<span style="font-size: 18px;">{{developmontValue}}</span>
					</div>
					<div id="developmentEcharts" style="width:420px;height:350px;"></div>
				</div>
				<div class="bbd-industry-echarts" style="width: calc(100% - 439px);margin-left: 0;">
					<el-select class="bbd-development-select" 
						v-model="developmentValue" value-key="id" placeholder="请选择"
						@change="devolopmentChange">
							<el-option
								v-for="item in developmentOptions"
								:key="item.id"
								:label="item.label"
								:value="item">
							</el-option>
						</el-select>
					<div id="industryEcharts" style="width:100%;height:350px;"></div>
				</div>
				<div style="margin-top: 0;border-top: 1px solid #ddd;">
					<div class="bbd-industry-title">{{monitorTitle}}规上企业 ({{monitorSumCompany}}家)</div>
					<div class="bbd-industry-table" style="width: 800px">
						<el-table class="bbd-ranking-yunnan-table" :data="distributionData" style="height: 300px; overflow: auto;">
							<el-table-column prop="companyName" align="center" label="企业名称" min-width="200" show-overflow-tooltip> </el-table-column>
							<el-table-column prop="city" align="center" label="所属州市" show-overflow-tooltip> </el-table-column>
							<el-table-column prop="industry" align="center" min-width="200" label="行业">	</el-table-column>
							<el-table-column prop="registeredCapital" width="130" align="right" label="注册资本(万元)">	</el-table-column>
						</el-table>
					</div>
					<div class="bbd-distribution-echarts" style="width: 370px;height:350px;overflow:hidden;">
						<div id="distributionEcharts" style="margin-top: -40px;margin-left: 0px;width:380px;height:	380px;"></div>
					</div>
				</div>
			</el-card>
		</div>

		<el-row :gutter="20" class="bbd-management">
			<el-col :span="24">
				<div class="bbd-title">
					项目管理
					<div class="bbd-title-more" @click="$router.push({path: '/management'})">更多>></div>
				</div>
			</el-col>
			<el-col :span="4"><div class="grid-content bg-purple">
			<el-card class="bbd-menagement-item">
				<div class="bbd-management-title">
					项目总个数
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
					投资总金额
				</div>
				<div class="bbd-management-value">{{(managementData.projectAmounts/10000).toFixed(2)}}亿元</div>
				<div class="bbd-management-container">
					
				</div>
			</el-card>
			<el-card class="bbd-menagement-item">
				<div class="bbd-management-title">
					投资总进度
				</div>
				<div class="bbd-management-value">{{managementData.schedule}}%</div>
				<div class="bbd-management-container">
					<el-progress :percentage="managementData.schedule"></el-progress>
				</div>
			</el-card>
			</div></el-col>
			<el-col :span="7"><div class="grid-content bg-purple">
				<el-card class="bbd-menagement-item">
        	<div style="width: 100%;height:320px;" id="managementType"></div>
				</el-card>
			</div></el-col>
			<el-col :span="8"><div class="grid-content bg-purple">
				<el-card class="bbd-menagement-item">
					<!-- <div class="bbd-build-title">在建项目</div> -->
        	<div id="industryDistribution" style="width: 100%; height: 320px;"></div>
				</el-card>
			</div></el-col>
			<el-col :span="5"><div class="grid-content bg-purple">
        <el-card class="bbd-area-table">
          <div
            style="height: 1000px; overflow: auto; transition: all 0.5s;cursor:pointer"
            :style="'margin-top:-' + buildTop1 + 'px'"
						@mouseover="areaMouseOver"
						@mouseleave="areaMouseLeave">
            <el-table
              :default-sort="{prop:'value',order:'descending'}"
              :data="managementDistributionOtptions"
							@row-click="distributionRowClick">
              <el-table-column type="index" align="center" width="48" label="排名"> </el-table-column>
              <el-table-column prop="name" align="center" label="区域"> </el-table-column>
              <el-table-column prop="value" sortable align="center" width="88" label="项目数">	</el-table-column>
            </el-table>
          </div>
        </el-card>
			</div></el-col>
			<!-- <el-col :span="8"><div class="grid-content bg-purple">
				<el-card class="bbd-menagement-item">
					<div class="bbd-build-title">在建项目</div>
					<div class="bbd-build-list">
						<div style="transition: all 0.5s;" 
							:style="'margin-top:-' + buildTop + 'px'"
							@mouseover="mouseOver"
							@mouseleave="mouseLeave">
							<div class="bbd-build-item" v-for="(item, index) in buildOptions" :key="index">
								{{item.name}}
							</div>
						</div>
					</div>
				</el-card>
			</div></el-col> -->
		</el-row>

  </div>  
</template>

<script>
import echarts from 'echarts';
import yunnan from "@/util/gov/province/yunnan.json";
import {govChange,govStringChange} from '@/util/utils.js'
export default {
	data() {
		return {
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
			noticeTabActive: '5',
			noticeImg: require('../../../assets/login/beijing.png'),
			noticeOptions: [],

			// 轮播图
			carouselOptions: [],

			monitorOptions: [],

			// 云南省区域排名
			monitorChinaData: [],
			isMonitorPercentage: false,
			isRankingcumul: false,
			
			monitorTabActive: '0',
			monitorYunanData: [],
			isRankingReturn: false,

			// 全国排名
			monitorYunanDataAll: [],
			monitorYunanAreaData: [],
			yunnanTableNumber: '地区生产总值累计值（亿元）',
			yunnanTablePercentage: '同比增长（%）',

			isRankingNumber: false,
			isPercentage: false,

			distributionData: [],
			distributionTotal: 0,
			distributionCurrentPage: 1,
			distributionOwnedEnterprise: '',

			developmontTips: '',
			developmontValue: '',

			timer: null,
			buildTop: 0,
			buildOptions: [],

			managementData: {},
			monitorTitle: '',
			monitorSumCompany: '',
			managementDistributionOtptions: [], //项目州市排名数据
			buildTop1: 0,
			timers: null,

			// 工业运行监测图表数据
			monitorDataOptions: {
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
					saveAsImage: {show: true}
				}
			},
			legend: {
					data: []
			},
			xAxis: [
					{
							type: 'category',
							data: [],
							axisPointer: {
									type: 'shadow'
							},
							axisLabel: {  
								interval:0,  
								rotate:40  
							}
					}
			],
				yAxis: [],
				series: []
			},

			// 产业行业发展情况图表数据
			industryEchartsOption:{
					title: {
						text: '',
						textStyle: {
							color: "#409EFF"
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
			color: ['#409EFF', '#67C23A', '#E6A23C', '#EE6666', '#F56C6C', '#09399'],
			toolbox: {
					feature: {
							saveAsImage: {show: true}
					}
			},
			legend: {
					top: 30,
					x: 'center',
					data: []
			},
			xAxis: [
					{
							type: 'category',
							data: [],
							axisPointer: {
									type: 'shadow'
							},
							axisLabel: {  
								interval:0,  
								rotate:40  
							}
					}
			],
			yAxis: [
					// {
					// 		type: 'value',
					// 		axisLabel: {
					// 				formatter: '{value}'
					// 		}
					// }
			],
			series: []
			},

			developmentOptions: [],
			developmentValue: '',

			yunnanTabsActive: 'first',
			monitorYunanAreaData: [],

			componentsAreaCode: '',
			componentsIndustryCode: ''

		}
	},
	created() {
		this.getManagementData()

		this.getNoticeData(this.noticeTabActive)
		this.getMonitorOneData()
	},
	mounted() {
		this.getOutputData()
		this.getBuildData()
		this.getMonitorListData()
		this.getCarouselOptions()
	},
	methods: {
		carouselChange(item) {
			window.open(item.path)
		},	

		// 获取轮播图
		getCarouselOptions() {
			this.componentsMoudel.startGet('tbbdfileinfo/list_all?isSlideshow=true', {}, false).then((res) => {
				this.carouselOptions = res.body.data
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

				// 项目州市排名
				this.managementData.areaDistrib.forEach(item => {
					item.name = govChange(item.cityCode)
					let obj = {}
					obj.name = item.name
					obj.value = item.industryCount
					obj.cityCode = item.cityCode
					this.managementDistributionOtptions.push(obj)
				})
				
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

			// 获取工业运行经济云南省各区域排名数据
			this.componentsMoudel.startGet('regiondata/list_all?areaType=01&parentId=0', {}, false).then((res) => {
				this.monitorYunanDataAll = res.body.data 
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: parseInt(item.cumulativeValueOfGdpRank),
						province: item.areaName,
						number: item.cumulativeValueOfGdp,
						percentage: Number(item.gdpGrowthRate*100).toFixed(2) + '%',
						id: item.id
					}
				})
				this.monitorTrend()
			})

		},

		// 项目管理州市排名列表点击
		distributionRowClick(row) {
			this.$router.push({
				path: 'Management',
				query: {
					cityCode: row.cityCode
				}
			})
		},

		// 项目州市排名鼠标移入移除
		// 定时器
		areaSetInterValData() {
			this.timers = setInterval(() => {
				this.buildTop1 += 3
				if(this.buildTop1 > this.managementDistributionOtptions.length * 32 - 32 * 8) {
					this.buildTop1 = 0
				}
			}, 500)
			if(this.buildOptions.length < 8) {
				clearInterval(this.timers)
			}
		},
		areaMouseOver() {
			clearInterval(this.timers)
		},
		areaMouseLeave() {
			this.areaSetInterValData()
		},

		// 获取项目阶段图表数据
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

		// 云南省各地区排名表格点击
		monitoyYunnanClick(data) {
			this.componentsMoudel.startGet('regiondata/list_all?areaType=02&limit=999&curPage=1', {}, false).then((res) => {
				this.monitorYunanAreaData = res.body.data
				if(data.index == '1') {
					this.isRankingcumul = false
					this.monitorYunanAreaData = this.monitorYunanAreaData.map(item => {
						if(this.monitorTabActive == '0') {
							return {
								sort: parseInt(item.cumulativeValueOfGdpRank),
								province: item.areaName,
								number: item.cumulativeValueOfGdp,
								percentage: Number(item.gdpGrowthRate*100).toFixed(2) + '%',
								id: item.id
							}
						} else if(this.monitorTabActive == '1') {
							this.isRankingcumul = true
							return {
								sort: parseInt(item.inVadsRank),
								cumul: item.inVads,
								province: item.areaName,
								percentage: Number(item.industrialAddedValueScale*100).toFixed(2) + '%',
								id: item.id
							}
						} else if(this.monitorTabActive == '2') {
							return {
								sort: parseInt(item.cumulativeGrowthOfInvestmentInFixedAssetsRank),
								province: item.areaName,
								percentage: Number(item.cumulativeGrowthOfInvestmentInFixedAssets*100).toFixed(2) + '%',
								id: item.id
							}
						} else if(this.monitorTabActive == '3') {
							return {
								sort: parseInt(item.totalRetailSalesRank),
								province: item.areaName,
								percentage: Number(item.totalRetailSales*100).toFixed(2) + '%',
								id: item.id	
							}
						} else if(this.monitorTabActive == '4') {
							return {
								sort: parseInt(item.profitTotalRank),
								province: item.areaName,
								number: item.profitTotal,
								percentage: Number(item.profitTotalScale*100).toFixed(2) + '%',
								id: item.id
							}
						} else if(this.monitorTabActive == '5') {
							return {
								sort: parseInt(item.revenueFromBusinessOperationsRank),
								province: item.areaName,
								number: item.revenueFromBusinessOperations,
								percentage: Number(item.revenueFromBusinessOperationsScale*100).toFixed(2) + '%',
								id: item.id
							}
						} else if(this.monitorTabActive == '6') {
							return {
								sort: parseInt(item.assetsTotalRank),
								province: item.areaName,
								number: item.assetsTotal,
								percentage: Number(item.assetsTotalScale*100).toFixed(2) + '%',
								id: item.id
							}
						}
					})
				}
				this.monitorTrend()
			})
			this.isRankingReturn=  true
		},

		monitorTrend() {
			this.monitorYunanData.forEach(item => {
				if(item.number == undefined) {
					this.isRankingNumber = false
				} else {
					this.isRankingNumber = true
				}
				if(item.percentage == null && item.percentage == undefined ) {
					this.isPercentage = false
				} else {
					this.isPercentage = true
					if(item.percentage.slice(0,1) == '-') {
						item.trend = 0
					} else {
						item.trend = 1
					}
				}
 			})

		},

		// 获取咨询数据
		getNoticeData(type) {
			//  + '&officeCode=' + this.userInfo.depId
			this.componentsMoudel.startGet('tbbdfileinfo/list_all?type=' + type, {}, false).then((res) => {
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

		// 更多咨询`
		noticeMore() {
			let noticeName = ''
			if(this.noticeTabActive == '5') {
				noticeName = '时政要闻'
			} else if(this.noticeTabActive == '2') {
				noticeName = '工信动态'
			}  else if(this.noticeTabActive == '3') {
				noticeName = '政策文件'
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

		// 全国排名更多
		chinaRankingMore() {
			this.$router.push({
				path: '/macroMonitor',
				query: {
					index: 8,
				}
			})
		},

		// 获取工业运行监测列表
		getMonitorListData() {
			this.componentsMoudel.startGet('nationwide/getVariousIndicatorsData', {}, false).then((res) => {
				this.monitorOptions = res.body.data
				let value1 = ''
				let rabk1 = ''
				this.monitorOptions.forEach((item, index) => {
					if(index == 0) {
						item.sort = 0
						item.targetName = '地区生产总值(季)'
					} else if (index == 1) {
						value1 = item.value
						rabk1 = item.rank
						item.sort = 2
						item.targetName = '工业增加值累计增长(月)'
						item.value = this.monitorOptions[3].value
						item.rank = this.monitorOptions[3].rank
					} else if (index == 2) {
						item.sort = 1
						item.targetName = '固定资产投资完成额累计增长(月)'
					} else if (index == 3) {
						item.value = value1
						// item.rank = rabk1
						item.rank = 15
						item.sort = 0
						item.targetName = '社会消费品零售总额累计增长(季)'
					} else if (index == 4) {
						item.sort = 2
						item.targetName = '利润总额累计值(月)'
					} else if (index == 5) {
						item.sort = 0
						item.targetName = '营业收入累计值(月)'
					} else if (index == 6) {
						item.sort = 0
						item.targetName = '资产总计(月)'
					}
 					if(parseInt(item.value) <= 100) {
						item.values = item.value + '%/' + item.rank + '位'
					} else {
						item.values = item.value + '亿元/' + item.rank + '位'
					}
				})
			})
		},

		// 获取在建项目  --  真实数据 新工厂
		getBuildData() {
			const parms = {
				actualStartTime: "",
				companyName: "",
				curPage: 1,
				currentPage: 1,
				industryCode: "39",
				industryType: "",
				investmentScaleType: "",
				limit: 9999,
				projectType: '2'
			}
			this.componentsMoudel.startPost('projectManagement/list_all', parms, false).then((res) => {
				this.buildOptions = res.body.data;
				this.setInterValData()
			})
		},

		// 定时器定时向上移动
		setInterValData() {
			this.timer = setInterval(() => {
				this.buildTop += 3
				if(this.buildTop > this.buildOptions.length * 30 - 30 * 10) {
					this.buildTop = 0
				}
			}, 500)
			if(this.buildOptions.length < 10) {
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

		// 获取产业重点企业
		getCrojectManagementData(code) {
			this.componentsMoudel.startGet('tbbdcompanyshow/list_all?limit=999999&curPage=1&industryCode=' + code +
			'&areaCode=' + this.componentsAreaCode, {}, false).then((res) => {
				
				var arr = [];//用来存放合并列数
				var companyArr = []; 
				var companyCodeArr = []; 
				res.body.data.forEach(item => {
					if(item.totalOperatingRevenue == null || item.totalOperatingRevenue == '' || item.totalOperatingRevenue == '0') {
						item.totalOperatingRevenue = '-'
					}
					if(item.totalCapital == null || item.totalCapital == '' || item.totalCapital == '0') {
						item.totalCapital = '-'
					}
					// 通过州市代码将代码转为州市名称 govChange
					companyArr.push(govChange(item.areaCode))
					companyCodeArr.push(item.areaCode)
				})

				// 获取各地区企业分布数据
				companyArr.sort();//注意，一定要排序，不排序，会重复判断，从而错误
				companyCodeArr.sort();//注意，一定要排序，不排序，会重复判断，从而错误
				for (var i = 0; i < companyArr.length;) {//按照属性判断属性合并列数
					var count = 0;
					for (var j = i; j < companyArr.length; j++) {
							if(companyArr[i]== companyArr[j]){
								count++;
							}
					}
					arr.push({
						name:companyArr[i],
						value: count,
						areaCode: govStringChange(companyArr[i])
					})
					i+=count;
				}
				this.getDistributionData(arr)

				this.distributionData = res.body.data
				this.distributionData.forEach(item => {
					if(item.registeredCapital == '0') {
						item.registeredCapital = '-'
					}
				})
				this.monitorSumCompany = this.distributionData.length
			})
		},

		// 获取产业重点企业
		getCrojectManagementMapData(code) {
			this.componentsMoudel.startGet('tbbdcompanyshow/list_all?limit=999999&curPage=1&industryCode=' + code +
			'&areaCode=' + this.componentsAreaCode, {}, false).then((res) => {
				
				var arr = [];//用来存放合并列数
				// var companyArr = []; 
				// var companyCodeArr = []; 
				res.body.data.forEach(item => {
					if(item.totalOperatingRevenue == null || item.totalOperatingRevenue == '' || item.totalOperatingRevenue == '0') {
						item.totalOperatingRevenue = '-'
					}
					if(item.totalCapital == null || item.totalCapital == '' || item.totalCapital == '0') {
						item.totalCapital = '-'
					}
					// 通过州市代码将代码转为州市名称 govChange
					// companyArr.push(govChange(item.areaCode))
					// companyCodeArr.push(item.areaCode)
				})

				// // 获取各地区企业分布数据
				// companyArr.sort();//注意，一定要排序，不排序，会重复判断，从而错误
				// companyCodeArr.sort();//注意，一定要排序，不排序，会重复判断，从而错误
				// for (var i = 0; i < companyArr.length;) {//按照属性判断属性合并列数
				// 	var count = 0;
				// 	for (var j = i; j < companyArr.length; j++) {
				// 			if(companyArr[i]== companyArr[j]){
				// 				count++;
				// 			}
				// 	}
				// 	arr.push({
				// 		name:companyArr[i],
				// 		value: count,
				// 		areaCode: govStringChange(companyArr[i])
				// 	})
				// 	i+=count;
				// }
				// this.getDistributionData(arr)

				this.distributionData = res.body.data
				this.distributionData.forEach(item => {
					if(item.registeredCapital == '0') {
						item.registeredCapital = '-'
					}
				})
				this.monitorSumCompany = this.distributionData.length
			})
		},

		// 工业经济运行监测
		monitorTabClick(tab, event) {
			this.yunnanTabsActive = 'first'
			this.monitorTabActive = tab.index
			this.isRankingcumul = false
			if(tab.index == '0') { //地区生产总值
				this.yunnanTableNumber = '地区生产总值累计值（亿元）'
				this.yunnanTablePercentage = '同比增长（%）'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: item.cumulativeValueOfGdpRank,
						province: item.areaName,
						number: item.cumulativeValueOfGdp,
						percentage: Number(item.gdpGrowthRate*100).toFixed(2) + '%',
						id: item.id
					}
				})
				this.getMonitorOneData()
			} else if(tab.index == '1') { //工业增加值累计增长
				this.isRankingcumul = true
				this.yunnanTablePercentage = '工业增加值累计增长(%)'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: parseInt(item.inVadsRank),
						cumul: item.inVads,
						province: item.areaName,
						percentage: Number(item.industrialAddedValueScale*100).toFixed(2) + '%',
						id: item.id
					}
				})
				
				let params = {
					appType: 1,
					area: 2,
					dataSourceInfoId: 30,
					fre: 1,
					hasQuanGuo: 1,
					index: "96",
					isAllIndex: 0,
					tabType: 0
				}
				this.componentsMoudel.startPost('changeTrend/getChangeTrend', params, false).then((res) => {
					this.monitorDataOptions.legend.data = ['全国工业增加值同比增长(%)','云南工业增加值同比增长(%)']
					this.monitorDataOptions.xAxis[0].data = res.body.data.x
					this.monitorDataOptions.series[0] = {
						name: '全国工业增加值同比增长(%)',
						type: 'line',
						itemStyle: {normal: {color: "#409eff"}},
						data: res.body.data[30].quan_guo
					}
					this.monitorDataOptions.series[1] = {
						name: '云南工业增加值同比增长(%)',
						type: 'line',
						itemStyle: {normal: {color: "#e6a23c"}},
						data: res.body.data[30].yun_nan
					}
					this.monitorDataOptions.series[2] = {
						name: '全国工业增加值同比增长(%)',
						type: 'line',
						itemStyle: {
							normal: {
								color: "#409eff",
								lineStyle: {
									width: 2, 
									type:'dotted'
								}
							}
						},
					data: res.body.data.forecast_30.quan_guo
					}
					this.monitorDataOptions.series[3] = {
						name: '云南工业增加值同比增长(%)',
						type: 'line',
						itemStyle: {
							normal: {
								color: "#e6a23c",
								lineStyle: {
									width: 2, 
									type:'dotted'
								}
							}
						},
						data: res.body.data.forecast_30.yun_nan
					}
					
					this.monitorDataOptions.yAxis[0] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} %'
						}
					}
					if ( res.body.data.x.length > 12) {
						res.body.data.x[res.body.data.x.length - 3] = res.body.data.x[res.body.data.x.length - 3] + '(预测)';
						res.body.data.x[res.body.data.x.length - 2] = res.body.data.x[res.body.data.x.length - 2] + '(预测)';
						res.body.data.x[res.body.data.x.length - 1] = res.body.data.x[res.body.data.x.length - 1] + '(预测)';
					}
					this.getMonitorData()
				})

				// 全国排名
				let chinaParams = {
					area: 2,
					dataSourceInfoId: 34,
					fre: 1,
					index: "96",
					isAllIndex: 0,
					sort: 0,
					tabType: 2
				}
				this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
					this.chinaSort(res.body.data, 34)
				})

			} else if(tab.index == '2') { //固定资产投资
				this.yunnanTablePercentage = '固定资产投资(不含农户)累计同比增长（%）'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: item.cumulativeGrowthOfInvestmentInFixedAssetsRank,
						province: item.areaName,
						percentage: Number(item.cumulativeGrowthOfInvestmentInFixedAssets*100).toFixed(2) + '%',
						id: item.id
					}
				})
				let params = {
					appType: 1,
					area: 2,
					dataSourceInfoId: 20,
					fre: 1,
					hasQuanGuo: 1,
					index: "90",
					isAllIndex: 1,
					tabType: 0
				}
				this.componentsMoudel.startPost('changeTrend/getChangeTrend', params, false).then((res) => {
					this.monitorDataOptions.legend.data = ['国内固定资产投资额累计增长(%)','地区固定资产投资额累计增长(%)']
					this.monitorDataOptions.xAxis[0].data = res.body.data.x
					this.monitorDataOptions.series[0] = {
						name: '国内固定资产投资额累计增长(%)',
						type: 'line',
							itemStyle: {normal: {color: "#409eff"}
						},
						data: res.body.data[20].quan_guo
					}
					this.monitorDataOptions.series[1] = {
						name: '地区固定资产投资额累计增长(%)',
						type: 'line',
							itemStyle: {normal: {color: "#e6a23c"}
						},
						data: res.body.data[21].yun_nan
					}
					// 预测值
					this.monitorDataOptions.series[2] = {
						name: '地区固定资产投资额累计增长(%)',
						type: 'line',
							itemStyle: {normal: {color: "#e6a23c"}
						},
						 itemStyle:{
                normal:{
                    lineStyle:{
                        width:2,
                        type:'dotted'  //'dotted'虚线 'solid'实线
                    }
                },
						 },
						data: res.body.data.forecast_21.yun_nan
					}
					this.monitorDataOptions.yAxis[0] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} %'
						}
					}
					
					if ( res.body.data.x.length > 12) {
						res.body.data.x[res.body.data.x.length - 3] = res.body.data.x[res.body.data.x.length - 3] + '(预测)';
						res.body.data.x[res.body.data.x.length - 2] = res.body.data.x[res.body.data.x.length - 2] + '(预测)';
						res.body.data.x[res.body.data.x.length - 1] = res.body.data.x[res.body.data.x.length - 1] + '(预测)';
					}
					this.getMonitorData()
				})
			
				// 全国排名
				let chinaParams = {
					area: 2,
					dataSourceInfoId: 23,
					fre: 1,
					index: "90",
					isAllIndex: 0,
					sort: 0,
					tabType: 2
				}
				this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
					this.chinaSort(res.body.data, 23)
				})

			} else if(tab.index == '3') { //社会消费品零售总额累计增长
					this.yunnanTablePercentage = '社会消费品零售总额累计同比增长（%）'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: item.totalRetailSalesRank,
						province: item.areaName,
						percentage: Number(item.totalRetailSales*100).toFixed(2) + '%',
						id: item.id
					}
				})
				let params = {
					appType: 1,
					area: 2,
					dataSourceInfoId: 24,
					fre: 2,
					hasQuanGuo: 0,
					index: "91",
					isAllIndex: 0,
					tabType: 0
				}
				this.componentsMoudel.startPost('changeTrend/getChangeTrend', params, false).then((res) => {
					this.monitorDataOptions.legend.data = ['社会消费品零售总额累计增长(%)']
					this.monitorDataOptions.xAxis[0].data = res.body.data.x
					this.monitorDataOptions.series[0] = {
						name: '社会消费品零售总额累计增长(%)',
						type: 'line',
							itemStyle: {normal: {color: "#409eff"}
						},
						data: res.body.data[24].yun_nan
					}
					this.monitorDataOptions.yAxis[0] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} %'
						}
					}
					this.getMonitorData()
				})

				// 全国排名
				let chinaParams = {
					area: 2,
					dataSourceInfoId: 26,
					fre: 2,
					index: "91",
					isAllIndex: 1,
					sort: 0,
					tabType: 2
				}
				this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
					this.chinaSort(res.body.data, 26)
				})

			} else if(tab.index == '4') {  //利润总额
				this.yunnanTableNumber = '利润总额(亿元)'
				this.yunnanTablePercentage = '利润总额环比增长率(%)'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: item.profitTotalRank,
						province: item.areaName,
						number: item.profitTotal,
						percentage: Number(item.profitTotalScale*100).toFixed(2) + '%',
						id: item.id
					}
				})
				let params = {
					appType: 1,
					area: 2,
					dataSourceInfoId: 165,
					fre: 1,
					hasQuanGuo: 0,
					index: "101",
					isAllIndex: 1,
					tabType: 0
				}
				this.componentsMoudel.startPost('changeTrend/getChangeTrend', params, false).then((res) => {
					this.monitorDataOptions.legend.data = ['云南利润总额累计值(亿元)','云南利润总额累计增长(%)']
					this.monitorDataOptions.series[0] = {
						name: '云南利润总额累计值(亿元)',
						type: 'bar',
						barWidth: 15,
						itemStyle: {normal: {color: "#409eff"}},
						data: res.body.data[165].yun_nan
					}
					this.monitorDataOptions.series[1] = {
						name: '云南利润总额累计增长(%)',
						yAxisIndex: 1,
						itemStyle: {normal: {color: "#e6a23c"}},
						type: 'line',
						data: res.body.data[166].yun_nan
					}
					this.monitorDataOptions.yAxis[0] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value}'
						}
					}
					this.monitorDataOptions.yAxis[1] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} %'
						}
					}
					this.monitorDataOptions.xAxis[0].data = res.body.data.x
					this.getMonitorData()
				})
				
				// 全国排名
				let chinaParams = {
					area: 2,
					dataSourceInfoId: 167,
					fre: 1,
					index: "101",
					isAllIndex: 1,
					sort: 0,
					tabType: 2
				}
				this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
					this.chinaSort(res.body.data, 167)
				})

			} else if(tab.index == '5') { //营业收入
				this.yunnanTableNumber = '营业收入(亿元)'
				this.yunnanTablePercentage = '营业收入环比增长率(%)'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: item.revenueFromBusinessOperationsRank,
						province: item.areaName,
						number: item.revenueFromBusinessOperations,
						percentage: Number(item.revenueFromBusinessOperationsScale*100).toFixed(2) + '%',
						id: item.id
					}
				})
				
				let params = {
					appType: 1,
					area: 2,
					dataSourceInfoId: 169,
					fre: 1,
					hasQuanGuo: 0,
					index: "102",
					isAllIndex: 1,
					tabType: 0
				}
				this.componentsMoudel.startPost('changeTrend/getChangeTrend', params, false).then((res) => {
					this.monitorDataOptions.legend.data = ['云南营业收入累计值(亿元)','云南营业收入累计增长(%)']
					this.monitorDataOptions.series[0] = {
						name: '云南营业收入累计值(亿元)',
						type: 'bar',
						barWidth: 15,
						itemStyle: {normal: {color: "#409eff"}},
						data: res.body.data[169].yun_nan
					}
					this.monitorDataOptions.series[1] = {
						name: '云南营业收入累计增长(%)',
						yAxisIndex: 1,
						itemStyle: {normal: {color: "#e6a23c"}},
						type: 'line',
						data: res.body.data[170].yun_nan
					}
					this.monitorDataOptions.yAxis[0] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value}'
						}
					}
					this.monitorDataOptions.yAxis[1] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} %'
						}
					}
					this.monitorDataOptions.xAxis[0].data = res.body.data.x
					this.getMonitorData()
				})
				
				// 全国排名
				let chinaParams = {
					area: 2,
					dataSourceInfoId: 171,
					fre: 1,
					index: "102",
					isAllIndex: 1,
					sort: 0,
					tabType: 2
				}
				this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
					this.chinaSort(res.body.data, 171)
				})

			} else if(tab.index == '6') {  //资产总计
				this.yunnanTableNumber = '资产合计(亿元)'
				this.yunnanTablePercentage = '资产合计环比增长率(%)'
				this.monitorYunanData = this.monitorYunanDataAll.map(item => {
					return {
						sort: item.assetsTotalRank,
						province: item.areaName,
						number: item.assetsTotal,
						percentage: Number(item.assetsTotalScale*100).toFixed(2) + '%',
						id: item.id
					}
				})
				let params = {
					appType: 1,
					area: 2,
					dataSourceInfoId: 173,
					fre: 1,
					hasQuanGuo: 0,
					index: "103",
					isAllIndex: 1,
					tabType: 0
				}
				this.componentsMoudel.startPost('changeTrend/getChangeTrend', params, false).then((res) => {
					this.monitorDataOptions.legend.data = ['云南资产总计本月末(亿元)','云南资产总计增速(%)']
					this.monitorDataOptions.series[0] = {
						name: '云南资产总计本月末(亿元)',
						type: 'bar',
						barWidth: 15,
						itemStyle: {normal: {color: "#409eff"}},
						data: res.body.data[173].yun_nan
					}
					this.monitorDataOptions.series[1] = {
						name: '云南资产总计增速(%)',
						yAxisIndex: 1,
						itemStyle: {normal: {color: "#e6a23c"}},
						type: 'line',
						data: res.body.data[174].yun_nan
					}
					this.monitorDataOptions.yAxis[0] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value}'
						}
					}
					this.monitorDataOptions.yAxis[1] = {
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} %'
						}
					}
					this.monitorDataOptions.xAxis[0].data = res.body.data.x
					this.getMonitorData()
				})
				
				// 全国排名
				let chinaParams = {
					area: 2,
					dataSourceInfoId: 175,
					fre: 1,
					index: "103",
					isAllIndex: 1,
					sort: 0,
					tabType: 2
				}
				this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
					this.chinaSort(res.body.data, 175)
				})
			}
			
			this.monitorDataOptions.series = []
			this.monitorDataOptions.yAxis = []	
			this.monitorDataOptions.legend.data = []

			this.monitorYunanData.forEach(item => {
				if(item.number == undefined) {
					this.isRankingNumber = false
				} else {
					this.isRankingNumber = true
				}
				if(item.percentage.slice(6,7) == '-') {
					item.trend = 0
				} else {
					item.trend = 1
				}
			})
			this.monitorTrend()

		},

		// 获取工业经济运行监测 - 地区生产总值
		getMonitorOneData() {
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
			this.componentsMoudel.startPost('changeTrend/getChangeTrend', data, false).then((res) => {
				let datas = res.body.data
				this.monitorDataOptions.series[0] = {
					name: '云南地区生产总值累计值(亿)',
					type: 'bar',
					barWidth: 15,
						itemStyle: {
								normal: {
									color: "#409eff"
							}
					},
					data: datas[1].yun_nan
				}
				this.monitorDataOptions.series[1] = {
					name: '云南省地区生产总值指数(上年同期=100)累计值(%)',
					type: 'line',
					itemStyle: {
							normal: {
									color: "#e6a23c"
							}
					}, 
					yAxisIndex: 1,
					data: datas[2].yun_nan
				}
				if(datas[3]) {
					this.monitorDataOptions.series[2] = {
						name: '国内地区生产总值指数(上年同期=100)累计值(%)',
						type: 'line',
						itemStyle: {
								normal: {
										color: "#f56c6c"
								}
						},
						yAxisIndex: 1,
						data: datas[3].quan_guo
					}
				}
				this.monitorDataOptions.yAxis[0] = {
					type: 'value',
					scale: true,
					axisLabel: {
						formatter: '{value}'
					}
				}
				this.monitorDataOptions.yAxis[1] = {
					type: 'value',
					scale: true,
					axisLabel: {
						formatter: '{value} %'
					}
				}
				this.monitorDataOptions.xAxis[0].data = datas.x
				this.monitorDataOptions.legend.data = ['云南地区生产总值累计值(亿)', '云南省地区生产总值指数(上年同期=100)累计值(%)', '国内地区生产总值指数(上年同期=100)累计值(%)']
				this.getMonitorData()
			});

			// 全国排名
			let chinaParams = {
				area: 2,
				dataSourceInfoId: 6,
				fre: 2,
				index: "86",
				isAllIndex: 1,
				sort: 0,
				tabType: 2,
			}
			this.componentsMoudel.startPost('nationwide/getNationwideComparedInfo', chinaParams, false).then((res) => {
				this.chinaSort(res.body.data, 6)
			})
		},

		chinaSort(result, dataSourceInfoId) {
			let arr = []
			let monitorChinaData = []
			result.x.forEach(item => {
				let obj = {}
				obj.province = item
				arr.push(obj)
			})

			if(dataSourceInfoId == 6 || dataSourceInfoId == 167 || 
				dataSourceInfoId == 171 || dataSourceInfoId == 175) {
				this.isMonitorPercentage = true
				result[dataSourceInfoId].forEach((item, index) => {
					arr[index].number = item
				})
				// 地区生产总值累计值
				let a1 = []
				a1 = arr.sort(this.dortData('number'))
				a1.forEach((item, index) => {
					if(item.province[530000] == '云南省') {
						monitorChinaData[0] = {}
						monitorChinaData[0].province = '云南省'
						monitorChinaData[0].number = item.number + ' / ' + (index + 1) + '位'
					} else if(item.province[520000] == "贵州省") {
						monitorChinaData[1] = {}
						monitorChinaData[1].province = "贵州省"
						monitorChinaData[1].number = item.number + ' / ' + (index + 1) + '位'
					} else if(item.province[510000] == '四川省') {
						monitorChinaData[2] = {}
						monitorChinaData[2].province = '四川省'
						monitorChinaData[2].number = item.number +' / ' + (index + 1) + '位'
					}
				})
				
				result[dataSourceInfoId + 1].forEach((item, index) => {
					arr[index].percentage = parseFloat(item).toFixed(1)
				}) 	
				let a2 = []
				a2 = arr.sort(this.dortData('percentage'))
				a2.forEach((item, index) => {
					if(item.province[530000] == '云南省') {
						monitorChinaData[0].percentage = item.percentage +'% / ' + (index + 1) + '位'
					} else if(item.province[520000] == '贵州省') {
						monitorChinaData[1].percentage = item.percentage +'% / ' + (index + 1) + '位'
					} else if(item.province[510000] == '四川省') {
						monitorChinaData[2].percentage = item.percentage +'% / ' + (index + 1) + '位'
					}
				})
			} else {
				// 地区生产总值累计值指数 %
					this.isMonitorPercentage = false
					result[dataSourceInfoId].forEach((item, index) => {
						arr[index].percentage = parseFloat(item).toFixed(1)
					}) 	
					let a2 = []
					a2 = arr.sort(this.dortData('percentage'))
					a2.forEach((item, index) => {
					if(item.province[530000] == '云南省') {
						monitorChinaData[0] = {}
						monitorChinaData[0].province = '云南省'
						monitorChinaData[0].percentage = item.percentage +'% / ' + (index + 1) + '位'
					} else if(item.province[520000] == "贵州省") {
						monitorChinaData[1] = {}
						monitorChinaData[1].province = "贵州省"
						monitorChinaData[1].percentage = item.percentage +'% / ' + (index + 1) + '位'
					} else if(item.province[510000] == '四川省') {
						monitorChinaData[2] = {}
						monitorChinaData[2].province = '四川省'
						monitorChinaData[2].percentage = item.percentage +'% / ' + (index + 1) + '位'
					}
					})
			}
			this.monitorChinaData = monitorChinaData
		},

		dortData(property) {
			return function(a,b){
				var value1 = a[property];
				var value2 = b[property];
				return value2 - value1;
			}
		},
		
		// 获取监测图表数据
		getMonitorData() {
			var myChart = echarts.init(document.getElementById('monitorEcharts'));
			var	option = this.monitorDataOptions
			myChart.setOption(option, true);
		},

		// 各行业点击
		devolopmentChange(item) {
			this.devolopmentEcharts(item)
		},

		// 选择产业行业相对变化
		devolopmentEcharts(item) {
			let params = {
				appType: 1,
				area: 2,
				dataSourceInfoId: item.dataSourceInfoId,
				fre: 1,
				index: item.index,
				isAllIndex: 0,
				tabType: 7
			}
			this.componentsMoudel.startPost('changeTrend/getIndustryChangeTrend', params, false).then((res) => {
				this.industryEchartsOption.xAxis[0].data = res.body.data.x
				this.industryEchartsOption.legend.data = ['行业增加值累计增速']
				this.industryEchartsOption.series[0] = {
					name: '行业增加值累计增速',
					type: 'line',
					itemStyle: {normal: {color: "#9dd3e8"}},
					data: res.body.data[item.dataSourceInfoId].yun_nan
				}
				
				this.industryEchartsOption.yAxis[0] = {
					type: 'value',
					axisLabel: {
						formatter: '{value} %'
					}
				}
				this.getIndustryData()
			})
		},

		// 获取各产业总产值占比
		getOutputData() {
			var myChart = echarts.init(document.getElementById('developmentEcharts'));
			var datas = [
					{value: 174.41, name: '电子信息',industryCode:[39]},
					{value: 385.65, name: '石化化工',industryCode:[7,25,26]},
					{value: 352.44, name: '食品',industryCode:[13,14,15]},
					{value: 1246.33, name: '能源',industryCode:[6,7,25,44,45]},
					{value: 1176.18, name: '原材料',industryCode:[6,8,9,10,31,32,30]},
					{value: 1413.85, name: '烟草',industryCode:[16]},
					{value: 21.63, name: '交通物流',industryCode:[37]},
					{value: 36.95, name: '资源综合利用',industryCode:[42,46,12]},
					{value: 97.40, name: '装备制造',industryCode:[33,34,35,36,37,38,40,41,43]},
					{value: 122.34, name: '生物医药',industryCode:[27]},
					{value: 153.66, name: '消费品',industryCode:[17,18,19,20,21,22,23,24,28,29]},
				]
			var	option = {
					title: {
						text: '2020年1-12月工业增加值累计值占比',
						left: 0,
						top: 0,
						textStyle: {
							color: "#409EFF"
						}
					},
					tooltip: {
							trigger: 'item'
					},
					legend:{
							left: '-10px',
							top: 50,
							orient:'vertical',
							tooltip:{
								show:true,
							},
							selectedMode: false,
							data: ['电子信息','石化化工','食品','能源','原材料','烟草','交通物流','资源综合利用','装备制造','生物医药','消费品']
					},
					color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
					series: [
							{
									name: '',
									type: 'pie',
									center: ["62%", "54%"], 
									radius: ['55%', '70%'],
									avoidLabelOverlap: false,
									itemStyle: {
											borderRadius: 10,
											borderColor: '#fff',
											borderWidth: 2
									},
									label: {
											show: false,
											position: 'center'
									},
									emphasis: {
											label: {
													show: false,
													fontSize: '14',
													fontWeight: 'bold'
											}
									},
									labelLine: {
											show: false
									},
									data: datas
							}
					]
			};
			myChart.setOption(option);
			let index = 0
			let that = this
			let datasSum = 0
			datas.forEach(item => {
				datasSum = datasSum + item.value
			})

			// 阻止图例点击事件
			// myChart.on('legendselectchanged', (params) => {
			// 	// 处理自己的自定义事件
			// 	// 阻止默认事件（原理就是将点击的图例重新选中）
			// 	myChart.dispatchAction({
			// 				type: 'legendSelect',
			// 				name: params.name
			// 		});
			// });

			//设置默认选中高亮部分
			myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 4});
			this.developmontTips = datas[4].name
			this.monitorTitle = datas[4].name
			this.developmontValue = datas[4].value + '亿元/' + 
				((datas[4].value / datasSum)*100).toFixed(2) + '%'
			// 移入的时候显示移入的数据
			// myChart.on('mouseover', function(e) {
			// 	if(e.dataIndex != index){
			// 		that.developmontTips = e.data.name
			// 		that.developmontValue = e.data.value + '亿元/' + ((e.data.value / datasSum)*100).toFixed(2) + '%'
			// 		myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
					
			// 	}
			// })
			// // 移出的时候显示移出时候的数据	
			// myChart.on('mouseout',function(e){
			// 		index = e.dataIndex;
			// 		that.developmontTips = e.data.name
			// 		that.developmontValue = e.data.value + '亿元/' + ((e.data.value / datasSum)*100).toFixed(2) + '%'
			// 		myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
			// });
			
			// 默认原材料
			this.developmentValue = datas[4].name
			this.industryEchartsOption.title.text = datas[4].name + '产业下各行业增加值累计增速'
			this.developmentOptions = [
				{label: '煤炭开采和洗选业', id: '1',dataSourceInfoId: 193,index: '26',code: 6},
				{label: '黑色金属矿采选业', id: '2',dataSourceInfoId: 199,index: '28',code: 8},
				{label: '有色金属矿采选业', id: '3',dataSourceInfoId: 202,index: '29',code: 9},
				{label: '非金属矿采选业', id: '4',dataSourceInfoId: 205,index: '30',code: 10},
				{label: '黑色金属冶炼和压延加工业', id: '5',dataSourceInfoId: 267,index: '52',code: 31},
				{label: '有色金属冶炼和压延加工业', id: '6',dataSourceInfoId: 270,index: '53',code: 32},
				{label: '非金属矿物制品业', id: '7',dataSourceInfoId: 204,index: '30',code: 30},
			]
			
			let Industryparams = {
				appType: 1,
				area: 2,
				dataSourceInfoId: 216,
				fre: 1,
				index: "34",
				isAllIndex: 0,
				tabType: 7
			}
			this.devolopmentEcharts(Industryparams)

			// 重点企业默认原材料
			this.componentsIndustryCode = datas[4].industryCode.toString()
			this.getCrojectManagementData(datas[4].industryCode.toString())

			// 移出的时候显示移出时候的数据
			myChart.on('click',function(e){
				that.monitorTitle = e.name
				
				// 点击环形图时突出显示当前选中
				myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index  });
				index = e.dataIndex;
				that.developmontTips = e.data.name
				that.developmontValue = e.data.value + '亿元/' + ((e.data.value / datasSum)*100).toFixed(2) + '%'
				myChart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});

				if(e.name == '电子信息') {
					that.developmentOptions = [
						{label: '计算机、通信和其他电子设备制造业', id: '1',dataSourceInfoId: 293,index: '60',code: 39},
					]
				} else if(e.name == '生物医药') {
					that.developmentOptions = [
						{label: '医药制造业', id: '2',dataSourceInfoId: 190,index: '48',code: 27},
					]
				} else if(e.name == '石化化工') {
					that.developmentOptions = [
						{label: '石油和天然气开采业', id: '3',dataSourceInfoId: 196,index: '27',code: 7},
						{label: '石油、煤炭及其他燃料加工业', id: '4',dataSourceInfoId: 254,index: '46',code: 25},
						{label: '化学原料和化学制品制造业', id: '5',dataSourceInfoId: 257,index: '47',code: 26},
					]
				} else if(e.name == '食品') {
					that.developmentOptions = [
						{label: '农副食品加工业', id: '3',dataSourceInfoId: 217,index: '34',code: 13},
						{label: '食品制造业', id: '4',dataSourceInfoId: 220,index: '35',code: 14},
						{label: '酒、饮料和精制茶制造业', id: '5',dataSourceInfoId: 223,index: '36',code: 15},
					]
				} else if(e.name == '消费品') {
					that.developmentOptions = [
						{label: '纺织业', id: '3',dataSourceInfoId: 230,index: '38',code: 17},
						{label: '纺织服装、服饰业', id: '4',dataSourceInfoId: 233,index: '39',code: 18},	
						{label: '皮革、毛皮、羽毛及其制品和制鞋业', id: '5',dataSourceInfoId: 234,index: '40',code: 19},
						{label: '木材加工和木、竹、藤、棕、草制品业', id: '6',dataSourceInfoId: 237,index: '41',code: 20},
						{label: '家具制造业', id: '7',dataSourceInfoId: 240,index: '42',code: 21},
						{label: '造纸和纸制品业', id: '8',dataSourceInfoId: 243,index: '43',code: 22},
						{label: '印刷和记录媒介复制业', id: '9',dataSourceInfoId: 246,index: '44',code: 23},
						{label: '文教、工美、体育和娱乐用品制造业', id: '10',dataSourceInfoId: 249,index: '45',code: 24},
						{label: '化学纤维制造业', id: '11',dataSourceInfoId: 258,index: '49',code: 28},
						{label: '橡胶和塑料制品业', id: '12',dataSourceInfoId: 261,index: '50',code: 29},
					]
				} else if(e.name == '烟草') {
					that.developmentOptions = [
						{label: '烟草制品业', id: '3',dataSourceInfoId: 226,index: '37',code: 16},
					]
				} else if(e.name == '原材料') {
					that.developmentOptions = [
						{label: '煤炭开采和洗选业', id: '1',dataSourceInfoId: 193,index: '26',code: 6},
						{label: '黑色金属矿采选业', id: '2',dataSourceInfoId: 199,index: '28',code: 8},
						{label: '有色金属矿采选业', id: '3',dataSourceInfoId: 202,index: '29',code: 9},
						{label: '非金属矿采选业', id: '4',dataSourceInfoId: 205,index: '30',code: 10},
						{label: '黑色金属冶炼和压延加工业', id: '5',dataSourceInfoId: 267,index: '52',code: 31},
						{label: '有色金属冶炼和压延加工业', id: '6',dataSourceInfoId: 270,index: '53',code: 32},
						{label: '非金属矿物制品业', id: '7',dataSourceInfoId: 204,index: '30',code: 30},
					]
				} else if(e.name == '装备制造') {
					that.developmentOptions = [
						{label: '金属制品业', id: '1',dataSourceInfoId: 274,index: '54',code: 33},
						{label: '通用设备制造业', id: '2',dataSourceInfoId: 277,index: '55',code: 34},
						{label: '专用设备制造业', id: '3',dataSourceInfoId: 281,index: '56',code: 35},
						{label: '汽车制造业', id: '4',dataSourceInfoId: 284,index: '57',code: 36},
						{label: '铁路、船舶、航空航天和其他运输设备制造业', id: '5',dataSourceInfoId: 287,index: '50',code: 37},
						{label: '电气机械和器材制造业', id: '6',dataSourceInfoId: 290,index: '59',code: 38},
						{label: '仪器仪表制造业', id: '7',dataSourceInfoId: 296,index: '61',code: 40},
						{label: '其他制造业', id: '8',dataSourceInfoId: 299,index: '62',code: 41},
						{label: '金属制品、机械和设备修理业', id: '9',dataSourceInfoId: 305,index: '64',code: 43},
					]
				} else if(e.name == '资源综合利用') {
					that.developmentOptions = [
						{label: '废弃资源综合利用业', id: '1',dataSourceInfoId: 302,index: '63',code: 42},
						{label: '水的生产和供应业', id: '2',dataSourceInfoId: 317,index: '68',code: 46},
						{label: '其他采矿业', id: '3',dataSourceInfoId: 211,index: '32',code: 12},
					]
				} else if(e.name == '交通物流') {
					that.developmentOptions = [
						{label: '汽车制造业', id: '3',dataSourceInfoId: 284,index: '57',code: 32},
						{label: '铁路、船舶、航空航天和其他运输设备制造业', id: '4',dataSourceInfoId: 287,index: '58',code: 37},
					]
				} else if(e.name == '能源') {
					that.developmentOptions = [
						{label: '煤炭开采和洗选业', id: '1',dataSourceInfoId: 193,index: '26',code: 6},
						{label: '石油和天然气开采业', id: '3',dataSourceInfoId: 196,index: '27',code: 7},
						{label: '石油、煤炭及其他燃料加工业', id: '4',dataSourceInfoId: 252,index: '46',code: 25},
						{label: '电力、热力生产和供应业', id: '5',dataSourceInfoId: 311,index: '66',code: 44},
						{label: '燃气生产和供应业', id: '6',dataSourceInfoId: 314,index: '67',code: 45},
					]
				}

				that.industryEchartsOption.title.text = e.name + '产业下各行业增加值累计增速'
				that.developmentValue = that.developmentOptions[0].label
				that.devolopmentEcharts(that.developmentOptions[0])

				that.componentsIndustryCode = e.data.industryCode.toString()
				that.componentsAreaCode = ''
				that.getCrojectManagementData(e.data.industryCode.toString())

			});
		},


		// 获取监测图表数据
		getIndustryData() {
			var myChart = echarts.init(document.getElementById('industryEcharts'));
			var	option = this.industryEchartsOption
			myChart.setOption(option, true);
		},

		// 获取企业分布地图数据
		getDistributionData(data) {
			let myChart = echarts.init(document.getElementById("distributionEcharts"));
			echarts.registerMap('yunnan', yunnan)
			// 点击之前先关闭！！解决重复点击
			myChart.off('click')
			let option = {
				title: {
					text: '规上企业数量热力分布图',
					bottom: 0,
					right: 10,
					textStyle: {
						fontSize: 12,
						color: '#999'
					}
				},
				visualMap: {
					min: 1,
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
							label: {
								normal: {
									formatter: function(e) {
										if(!e.value) {
											return e.name + '0'
										} else {
											return e.name + e.value
										}
									},
								}
							},
							zoom:1.1,
							itemStyle: {
								normal: { label: { show: true } },
								emphasis: { label: { show: true } },
							},
							geoIndex: 0,
							data: data
					}
				]
			}
			myChart.setOption(option);
			let that = this
			myChart.on('click', function(e) {
				if(e.data.areaCode) {
					that.componentsAreaCode = e.data.areaCode.toString()
				}
				that.getCrojectManagementMapData(that.componentsIndustryCode)
			})

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

	}
    
}
</script>

<style scoped lang="scss">
/* 公用样式 */
@import '../../css/director.css';

// 轮播图
.bbd-belt {
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	width: 350px;
	height: 210px;
	border-radius: 3px;
	box-shadow: 0 2px 12px 0 #b9b5b5;
	.bbd-carousel-name {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 5px;
		width: calc(100% - 10px);
		background-color: rgba(0,0,0,.3);
		font-size: 12px;
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

/* 右侧消息通知 */
.bbd-notice {
	margin-left: 20px;
	display: inline-block;
	vertical-align: top;
	width: calc( 100% - 392px);
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

/* 监测数据 */
.bbd-monitor-tabs {
	background-color: #fff;
	border-radius: 6px;
}
.bbd-monitor-tabs-slot {
	padding: 0 2px;
}
.bbd-monitor-value {
	font-size: 14px;
	color: #f56c6c;
}
.bbd-monitor-value-down {
	color: #67c23a;
}
.bbd-monitor-value-inden {
	color: #333;
}

.bbd-monitor-container {
	margin-top: 20px;
	.bbd-monitor-echarts {
		display: inline-block;
		vertical-align: top;
		width: 640px;
	}
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
		margin-top: 7px;
		.bbd-ranking-title {
			margin-bottom: 10px;
			// display: inline-block;
			// vertical-align: top;
			// width: 30px;
		}
		.bbd-ranking-yunnan-table {
			margin-left: 10px;
			display: inline-block;
			vertical-align: top;
			width: calc( 100% - 40px );
		}
	}
}

// 行业企业发展情况
.bbd-developmont {
	.bbd-developmont-echarts {
		position: relative;
		display: inline-block;
		vertical-align: top;
		.bbd-tips {
			position: absolute;
			top: 160px;
			left: 170px;
			width: 180px;
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
	.bbd-industry-table {
		margin-right:14px;
		margin-top: 14px;
		display: inline-block;
		vertical-align: top;
	}
	.bbd-industry-title {
		padding-top: 20px;
		padding-right: 380px;
		text-align: right;
		font-weight: bolder;
		color: #409eff;
	}
	.bbd-distribution-echarts {
		margin-top: 14px;
		display: inline-block;
		vertical-align: top;
	}
}

// 项目管理
.bbd-management {
	.bbd-menagement-item {
		margin-bottom: 10px;
	}
	.bbd-management-value {
		margin: 6px 0;
		font-size: 22px;
		font-weight: bolder;
		color: #555;
	}
	.bbd-management-sum-item {
		font-size: 12px;
		margin-right: 10px;
	}
	.bbd-build-list {
		height: 300px;
		overflow: hidden;
	}
	.bbd-build-item {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 30px;
		font-size: 14px;
		color:#666;
	}
}

.bbd-development-select {
	position: absolute;
	top: -7px;
	right: 44px; 
	z-index: 9999999;
}


/* 项目分布数量 */
.bbd-area-table {
	height: 360px; 
	overflow: hidden; 
	background-color:#fff;
  .el-table .cell {
    padding: 0;
  }
  .el-table td,
  .el-table th {
    padding: 4px 0;
  }
}

</style>

<style lang="scss">
.bbd-monitor-tabs {
	.el-tabs__item {
		padding: 0 20px;
		height: 24px;
		line-height: 24px;
	}
	.el-tabs__nav {
		height: 50px;
	}
	.is-top {
		// height: auto;
	}
	.el-tabs__item.is-active {
    color: #333;
	}
	.el-tabs__item:hover {
    color: #333;
	}
	.el-tabs__nav-wrap::after {
		display: none;
	}
	.el-tabs__header {
		margin: 0;
	}
}

.bbd-monitor-yunnan {
	td {
		padding: 4px 0;
	}
	th {
		padding: 7px 0;
	}
	.el-tabs__header {
		margin-bottom: 0;
	}
}

.bbd-ranking-yunnan-table {
	td {
		padding: 6px 0;
	}
}

.bbd-monitor-ranking {
	.el-table td {
		padding: 4px 0 !important;
	}
	.bbd-monitor-yunnan td {
		padding: 1px 0 !important;
	}
}

// 走马灯
.bbd-belt {
	.el-carousel__indicators--horizontal {
		display: none;
	}
}


</style>