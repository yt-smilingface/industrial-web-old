<template>
  <div>
    <div class="top-info">
      <div class="top-info-box">
        <div class="Direct-report-top-seize-seat"></div>
        <div class="Direct-report-top-text">
          {{ getReportStatisticsData.totalCirculation }}
        </div>
        <div style="text-align: center">发放总量（份）</div>
      </div>
      <div class="top-info-box">
        <div class="Direct-report-top-seize-seat"></div>
        <div class="Direct-report-top-text">
          {{ getReportStatisticsData.totalWrite }}
        </div>
        <div style="text-align: center">总填报量（份）</div>
      </div>
      <div class="top-info-box">
        <div class="Direct-report-top-seize-seat"></div>
        <div class="Direct-report-top-text">
          {{ getReportStatisticsData.FillRate }}%
        </div>
        <div style="text-align: center">综合填报率</div>
      </div>
      <div class="top-info-box">
        <div class="Direct-report-top-seize-seat"></div>
        <div class="Direct-report-top-text">
          {{ getReportStatisticsData.totalEnterprise }}
        </div>
        <div style="text-align: center">发放企业个数（个）</div>
      </div>
    </div>
    <div class="cont-info">
      <div class="cont-info-box">
        <div class="cont-info-box-head">
          {{ dataInfo.title }}

          <!-- <span class="directCar-more">更多</span> -->
        </div>
        <ECharts
          style="width: 100%; margin: auto"
          :options="dataInfo.echartsData"
        >
        </ECharts>
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">
          {{ typeInfo.title }}
          <!-- <span class="directCar-more">更多</span> -->
        </div>
        <div style="width: 100%">
          <ECharts
            style="width: 100%; height: 350px"
            :options="typeInfo.echartsData"
          >
          </ECharts>
        </div>
      </div>
      <div class="cont-info-box">
        <div class="cont-info-box-head">企业填报TOP10</div>
        <div class="boxall boxall-exp clearfix ToptenData">
          <div class="allnav">
            <el-table
              :data="topTenData"
              border
              style="width: 100%"
              height="350px"
              border
            >
              <el-table-column
                type="index"
                label="序号"
                width="50"
                align="center"
                fixed
              >
              </el-table-column>
              <el-table-column
                prop="companyName"
                show-overflow-tooltip
                label="企业名称"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="province" label="企业地区" align="center">
              </el-table-column>
              <el-table-column
                prop="fillRate"
                label="填报率"
                width="65"
                align="center"
              >
                <template slot-scope="{ row }">
                  <div>{{ row.fillRate }}%</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="boxfoot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.common {
  width: 90%;
  margin: auto;
}
.brade-box {
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}
.Direct-report-top-seize-seat {
  text-align: right;
  margin-right: 30px;
}
.Direct-report-top-text {
  color: #0265ba;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  font-weight: 800;
}
.input-with-select {
  width: 250px;
  height: 30px;
}
.input-with-select .el-input__inner {
  width: 250px;
  height: 30px;
}
.top-info {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.top-info-box {
  width: 20%;
  height: 193px;
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 3px 4px 3px #ccc;
}

.cont-info {
  width: 90%;
  margin: auto;
  margin-top: 50px;
  border: 1px solid transparent;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cont-info-box {
  width: 30%;
  height: 380px;
  padding-bottom: 30px;
  border-radius: 6px;
  margin-bottom: 60px;
  border: 1px solid #44aeff;
}

.cont-info-box-head {
  width: 100%;
  height: 48px;
  color: #fff;
  line-height: 48px;
  font-size: 20px;
  font-weight: 600;
  text-indent: 2rem;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    to bottom,
    #3ab3e8,
    #239bd0,
    #2ba6dc,
    #7bd1ff,
    #7bd1ff
  );
}
.allnav table td {
  width: 100%;
  border: 1px solid #000;
  height: 100%;
  overflow: hidden;
}

.clearfix table {
  border-collapse: collapse;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
}
.directCar-more {
  text-decoration: underline;
  text-align: right;
  margin-right: 30px;
}
/* .ToptenData {
  width: 90%;
  margin: auto;
  height: 92%;
  overflow: scroll;
} */
</style>

<script src="../../../js/directCar/makeReport/directCar.js"/>
