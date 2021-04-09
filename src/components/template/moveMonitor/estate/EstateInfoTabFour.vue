<template>
  <div>
    <div>
      企业:&nbsp;&nbsp;
      <el-select v-model="bbdQyxxId" filterable size="mini" @change="changeValue">
        <el-option
          v-for="item in options"
          :key="item.bbdQyxxId"
          :label="item.companyName"
          :value="item.bbdQyxxId"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 基本信息 -->
    <div class="four-business-details">
      <div class="enterprise-details">
        <div class="enterprise-names">
          <span>{{ enterpriseData.companyName }}</span>
          <span class="enterprise-names-type">
            {{ enterpriseData.companyEnterpriseStatus }}
          </span>
        </div>
        <!-- <div class="enterprise-type">
          <p class="p1">大型企业</p>
          <p class="p2">规模以上企业</p>
          <p class="p3">重点监测企业</p>
        </div> -->
        <div class="enterprise-information-top">
          <div class="four-enterprise-information">
            <div class="enterprise-information-one">
              <span class="information-span1"
                >统一社会信用代码 :{{ enterpriseData.creditCode }}</span
              >
              <span class="information-span2"
                >法定代表人：{{ enterpriseData.frname }}</span
              >
              <span class="information-span3"
                >成立日期 :{{ enterpriseData.openfrom }}</span
              >
            </div>
            <div class="enterprise-information-one">
              <span class="information-span1"
                >企业类型 :{{ enterpriseData.companyType }}</span
              >
              <span class="information-span2"
                >注册资本 :{{ enterpriseData.regcap }}</span
              >
              <span class="information-span3"
                >企业地址 :{{ enterpriseData.address }}</span
              >
            </div>
          </div>
          <div>
            <el-button
              type="info"
              plain
              class="more-button"
              @click="moreInformation(bbdQyxxId)"
              >查看更多企业信息</el-button
            >
          </div>
        </div>
      </div>
      <div class="enterprise-logo">
        <img :src="enterpriseLogo" alt="" width="70%" height="100%" />
      </div>
    </div>
    <!-- tabs 标签切换 -->
    <div class="four-business-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="企业竞争力评价">
          <template>
            <div>
              <!-- 企业竞争力评价 -->
              <div>
                <div class="enterprise-echarts-title">企业竞争力评价</div>
                <div class="competitiveness-evaluation">
                  <div class="com-evaluation-left">
                    <ECharts
                      style="height: 240px; width: 470px; margin: auto"
                      :options="backgroundEchart"
                    >
                    </ECharts>
                    <div class="Total-score">
                      总分:{{ competitiveCompeScore }}
                    </div>
                  </div>
                  <div class="com-evaluation-right">
                    <div class="com-eval-right-left">
                      <div
                        v-for="(item, index) in competitivePower.slice(0, 3)"
                        :key="index"
                      >
                        <h5>{{ item.name }} {{ item.value }} 分</h5>
                        <ul>
                          <li
                            v-for="(item2, index2) in item.children"
                            :key="index2"
                            v-if="item2.name !== '--'"
                          >
                            <span class="com-eval-right-left-span1">{{
                              item2.name
                            }}</span>
                            <span class="com-eval-right-left-span2"
                              >{{ item2.value }} 分</span
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="com-eval-right-left">
                      <div
                        v-for="(item3, index3) in competitivePower.slice(3)"
                        :key="index3"
                      >
                        <h5>{{ item3.name }} {{ item3.value }} 分</h5>
                        <ul>
                          <li
                            v-for="(item4, index4) in item3.children"
                            :key="index4"
                            v-if="item4.name !== '--'"
                          >
                            <span class="com-eval-right-left-span1">
                              {{ item4.name }}
                            </span>
                            <span class="com-eval-right-left-span2">
                              {{ item4.value }} 分
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 云南省同行业企业对标 -->
              <div>
                <div class="enterprise-echarts-title">
                  云南省同行业企业对标
                  <span class="peer-ranking">同行业排名第 {{ rank }} 位</span>
                </div>
                <div class="enterprise-benchmarking">
                  <el-table :data="yunNanTopTenData" border style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="序号"
                      width="80"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="companyName"
                      label="企业名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="areaName"
                      label="地区"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industryName"
                      label="所属行业"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="ipoTag"
                      label="是否上市"
                      align="center"
                    >
                      <template slot-scope="{ row }">
                        <div v-if="row.ipoTag === 0">未上市</div>
                        <div v-if="row.ipoTag === 1">已上市</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="compeScore"
                      label="企业竞争力综合得分"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click="moreInformation(scope.row.bbdQyxxId)"
                          type="text"
                          size="small"
                          >企业详情</el-button
                        >
                        <el-button
                          @click="benchmarkingClick(scope.row)"
                          type="text"
                          size="small"
                          >对标详情</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 全国同行业上市企业对标 -->
              <div>
                <div class="enterprise-echarts-title">
                  全国同行业上市企业对标
                </div>
                <div class="enterprise-benchmarking">
                  <el-table
                    :data="nationwideTopTenData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="id"
                      label="序号"
                      width="80"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="companyName"
                      label="企业名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="areaName"
                      label="地区"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industryName"
                      label="所属行业"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="ipoTag"
                      label="是否上市"
                      align="center"
                    >
                      <template slot-scope="{ row }">
                        <div v-if="row.ipoTag === 0">未上市</div>
                        <div v-if="row.ipoTag === 1">已上市</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="compeScore"
                      label="企业竞争力综合得分"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <!-- <el-button
                          @click="moreInformation(scope.row.bbdQyxxId)"
                          type="text"
                          size="small"
                          >企业详情</el-button
                        > -->
                        <el-button
                          @click="benchmarkingClick(scope.row)"
                          type="text"
                          size="small"
                          >对标详情</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 企业对标详情 -->
              <el-dialog
                title="企业对标详情"
                :visible.sync="benchmarkingDetails"
                center
              >
                <div class="benchmarking-details">
                  <div class="our-company">
                    <h4 class="our-comparison-company">
                      {{ competitivePowerName }}
                    </h4>
                    <div
                      class="our-company-title"
                      v-for="(item, index) in competitivePower"
                      :key="index"
                    >
                      <h5>{{ item.name }} {{ item.value }} 分</h5>
                      <ul>
                        <li
                          v-for="(item4, index4) in item.children"
                          :key="index4"
                          v-if="item4.name !== '--'"
                        >
                          <span class="com-eval-right-left-span1">
                            {{ item4.name }}
                          </span>
                          <span class="com-eval-right-left-span2">
                            {{ item4.value }}分
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="company-VS">
                    <div class="company-VS-VS">VS</div>
                  </div>
                  <div class="comparison-company">
                    <h4 class="our-comparison-company">
                      {{ contrastData.companyName }}
                    </h4>
                    <div
                      class="our-company-title"
                      v-for="(item, index) in contrastData.listData"
                      :key="index"
                    >
                      <h5>{{ item.name }} {{ item.value }} 分</h5>
                      <ul>
                        <li
                          v-for="(item4, index4) in item.children"
                          :key="index4"
                          v-if="item4.name !== '--'"
                        >
                          <span class="com-eval-right-left-span1">
                            {{ item4.name }}
                          </span>
                          <span class="com-eval-right-left-span2">
                            {{ item4.value }}分
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-dialog>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="企业经营分析">
          <template>
            <div style="">
              <div class="enterprise-assets">
                <div class="assets-information">
                  <div class="assets-specific-information">
                    <p>{{ eightSetsdata.r5_C4 }}万元</p>
                    <p class="assets-specific-information-p2">
                      企业营业收入({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                  <div class="assets-specific-information">
                    <p>{{ eightSetsdata.r6_C4 }} 万元</p>
                    <p class="assets-specific-information-p2">
                      主营业务收入({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                  <div class="assets-specific-information">
                    <p>{{ eightSetsdata.r7_C4 }} 万元</p>
                    <p class="assets-specific-information-p2">
                      工业总产值({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                  <div class="assets-specific-information-specific">
                    <p>{{ eightSetsdata.r8_C4 }} 万元</p>
                    <p class="assets-specific-information-p2">
                      利润总额({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                </div>
                <div class="assets-information">
                  <div class="assets-specific-information">
                    <p>{{ eightSetsdata.r9_C4 }} 万元</p>
                    <p class="assets-specific-information-p2">
                      税金总额({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                  <div class="assets-specific-information">
                    <p>{{ eightSetsdata.r12_C4 }} 吨标煤</p>
                    <p class="assets-specific-information-p2">
                      企业综合能耗({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                  <div class="assets-specific-information">
                    <p>{{ eightSetsdata.r27_C4 }} 万元</p>
                    <p class="assets-specific-information-p2">
                      研发经费投入({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                  <div class="assets-specific-information-specific">
                    <p>{{ eightSetsdata.r18_C4 }} 人</p>
                    <p class="assets-specific-information-p2">
                      期末从业人员数({{ eightSetsdata.startTime }})
                    </p>
                  </div>
                </div>
              </div>
              <!-- 图 -->
              <div class="cont-info cont-info-tablefour">
                <div class="cont-info-box">
                  <div class="cont-info-box-head">企业营业收入情况</div>
                  <div class="enterprise-echarts-echarts">
                    <ECharts
                      v-if="productionEchart.series[0].data.length > 0"
                      class="enterprise-echarts-echarts-Two"
                      :options="productionEchart"
                    >
                    </ECharts>
                  </div>
                </div>
                <div class="cont-info-box">
                  <div class="cont-info-box-head">主营业务收入情况</div>
                  <div class="enterprise-echarts-echarts">
                    <ECharts
                      v-if="productEchart.series[0].data.length > 0"
                      class="enterprise-echarts-echarts-Two"
                      :options="productEchart"
                    >
                    </ECharts>
                  </div>
                </div>
                <div class="cont-info-box">
                  <div class="cont-info-box-head">工业总产值情况</div>
                  <div class="enterprise-echarts-echarts">
                    <ECharts
                      v-if="benefitEchart.series[0].data.length > 0"
                      class="enterprise-echarts-echarts-Two"
                      :options="benefitEchart"
                    >
                    </ECharts>
                  </div>
                </div>
              </div>
              <div class="cont-info cont-info-tablefour">
                <div class="cont-info-box">
                  <div class="cont-info-box-head">利润总额情况</div>
                  <div class="enterprise-echarts-echarts">
                    <ECharts
                      v-if="totalProfitEchart.series[0].data.length > 0"
                      class="enterprise-echarts-echarts-Two"
                      :options="totalProfitEchart"
                    >
                    </ECharts>
                  </div>
                </div>
                <div class="cont-info-box">
                  <div class="cont-info-box-head">税金总额情况</div>
                  <div class="enterprise-echarts-echarts">
                    <ECharts
                      v-if="totalTaxEchart.series[0].data.length > 0"
                      class="enterprise-echarts-echarts-Two"
                      :options="totalTaxEchart"
                    >
                    </ECharts>
                  </div>
                </div>
                <div class="cont-info-box">
                  <div class="cont-info-box-head">企业综合能耗情况</div>
                  <div class="enterprise-echarts-echarts">
                    <ECharts
                      v-if="consumptionEchart.series[0].data.length > 0"
                      class="enterprise-echarts-echarts-Two"
                      :options="consumptionEchart"
                    >
                    </ECharts>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/estate/EstateInfoTabFour.js" >
</script>

<style>
.four-business-details {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 6px 1px rgba(0.16, 0.16, 0.16, 0.16);
  padding: 10px 16px;
  display: flex;
  margin: 18px auto;
  width: 96.2%;
  min-height: 98px;
}

.enterprise-details {
  width: 88%;
}
.enterprise-names {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
.enterprise-names-type {
  border: solid 1px #000;
  color: #0091ff;
  font-size: 10px;
  font-weight: 400;
  padding: 2px 4px;
  margin-left: 16px;
}
.enterprise-type {
  display: flex;
  margin-left: 5px;
}
.enterprise-type p {
  height: 18px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  padding: 2px;
  margin-right: 8px;
}
.enterprise-type .p1 {
  background: #0091ff;
}
.enterprise-type .p2 {
  background: #0bdcb1;
}
.enterprise-type .p3 {
  background: #ff9810;
}
.enterprise-information-top {
  display: flex;
}
.four-enterprise-information {
  font-size: 10px;
}
.enterprise-information-one {
  display: flex;
}
.four-enterprise-information .information-span1 {
  min-width: 256px;
  display: block;
}
.four-enterprise-information .information-span2 {
  min-width: 220px;
  display: block;
}
.four-enterprise-information .information-span3 {
  min-width: 296px;
  display: block;
}
.more-button {
  padding: 3px !important;
}
.enterprise-logo {
  width: 12%;
  text-align: right;
  float: right;
}
/* 选项卡 */
.four-business-tabs {
  width: 99%;
  margin: 18px auto;
}
.enterprise-assets {
  min-width: 100%;
  margin-top: 28px;
}
.assets-information {
  display: flex;
  margin-bottom: 28px;
  text-align: center;
}
.assets-specific-information {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  width: 20%;
  height: 130px;
  margin: auto;
}
.assets-specific-information-specific {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  width: 20%;
  height: 130px;
  margin: auto;
}
.assets-specific-information-p2 {
  margin-top: 18px;
  font-size: 14px;
}
/*  */
.enterprise-echarts {
  width: 100%;
  margin: auto;
}
.enterprise-echarts-two {
  width: 100%;
}
.cont-info-tablefour {
  width: 100% !important;
}
.enterprise-echarts-title {
  height: 28px;
  width: 97.2%;
  background: #0265ba;
  color: #ffffff;
  padding-left: 16px;
  font-size: 18px;
  line-height: 28px;
  margin: 18px auto;
}
.enterprise-echarts-echarts {
  width: 100%;
  margin: auto;
  height: 360px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.16);
}
.enterprise-echarts-echarts-Two {
  height: 360px;
  width: 300px !important;
  /* max-width: 1340px; */
  margin: auto;
}

/* 企业竞争力评价 */
.competitiveness-evaluation {
  width: 98.2%;
  margin: auto;
  min-height: 250px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.16);
  display: flex;
}
.com-evaluation-left {
  width: 45%;
  height: 100%;
}
.Total-score {
  font-size: 18px;
  font-weight: 600;
  color: red;
  text-align: center;
}
.com-evaluation-right {
  width: 55%;
  height: 100%;
  display: flex;
}
.com-eval-right-left {
  width: 50%;
}
.com-eval-right-left h5 {
  background: url("../../../../assets/evaluate.png") no-repeat;
  background-position: 0% 50%;
  padding-left: 18px;
  margin: 4px 0px;
}
.com-eval-right-left ul {
  padding-left: 22px;
  margin: 0px;
  width: 85%;
}
.com-eval-right-left ul li {
  font-size: 11px;
  width: 100%;
}
.com-eval-right-left ul li span {
  display: inline-block;
}
.com-eval-right-left-span1 {
  width: 75%;
}
.com-eval-right-left-span2 {
  width: 25%;
  color: #0265ba;
}

/*  */
.peer-ranking {
  margin-left: 18px;
  font-size: 14px;
  color: #fff;
  /* line-height: 26px; */
  /* text-decoration: underline; */
}
.enterprise-benchmarking {
  width: 98.2%;
  margin: auto;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.16);
}

/*  */
.benchmarking-details {
  width: 98.2%;
  /* min-height: 300px; */
  margin: auto;
  background: #ffffff;
  /* box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.16); */
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
.our-company {
  margin: 0px auto;
  width: 30%;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.16);
  background: #ffffff;
  border-radius: 5px;
  margin-left: 16%;
}
.our-comparison-company {
  text-align: center;
}
.our-company-title {
  width: 90%;
  margin: auto;
}
.our-company-title h5 {
  background: url("../../../../assets/evaluate.png") no-repeat;
  background-position: 0% 50%;
  padding-left: 18px;
  margin: 4px 0px;
}
.our-company-title ul {
  padding-left: 22px;
  margin: 0px;
  width: 85%;
}
.our-company-title ul li {
  font-size: 12px;
  width: 100%;
}
.our-company-title ul li span {
  display: inline-block;
}

.company-VS {
  margin: auto;
  width: 8%;
  text-align: center;
}
.company-VS-VS {
  margin: auto;
  font-size: 48px;
  color: #000;
}
.comparison-company {
  margin: 0px auto;
  width: 30%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.16);
  margin-right: 16%;
}

/*  */
.estateInfoTabFour-pagination {
  width: 95%;
  margin: auto;
  text-align: center;
}
</style>