<template>
  <el-row style="width: 94%; margin: auto">
    <el-col style="position: relative">
      <Plank
        showBtn
        :slotData="slotData"
        @tabChange="tabChange"
        @clickDownload="clickDownload"
        @checkoutChange="checkoutChange"
      >
        <template v-slot:p0="{ item }">
          <div>
            <el-form :inline="true" :model="inputInfo" class="demo-form-inline">
              <el-form-item label="专项名称:">
                <el-input v-model="inputInfo.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="企业名称:">
                <el-input
                  size="small"
                  v-model="inputInfo.companyName"
                ></el-input>
              </el-form-item>
              <el-form-item label="申报方向:">
                <el-input
                  size="small"
                  v-model="inputInfo.reportingDirection"
                ></el-input>
              </el-form-item>
              <el-form-item label="所属行业:">
                <el-select v-model="inputInfo.industryType" size="small">
                  <el-option
                    v-for="item in inputInfo.occupationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目总投资:">
                <el-input
                  size="small"
                  v-model="inputInfo.totalInvestment"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目开始时间:">
                <el-date-picker
                  v-model="inputInfo.actualStartTime"
                  size="small"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="项目审核状态:">
                <el-input
                  size="small"
                  v-model="inputInfo.reviewStatus"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="hanleSelectInfo"
                  >查询</el-button
                >
                <el-button @click="handleClear">重置</el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="name" label="专项名称">
                </el-table-column>
                <el-table-column prop="companyName" label="企业名称">
                </el-table-column>
                <el-table-column prop="orgCreditCode" label="企业统一信用代码">
                </el-table-column>
                <el-table-column prop="reportingDirection" label="申报方向">
                </el-table-column>
                <el-table-column prop="totalInvestment" label="项目总投资">
                </el-table-column>
                <el-table-column prop="projectAddress" label="项目所在地">
                </el-table-column>
                <el-table-column prop="industryType" label="所属行业">
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick(scope.row)"
                      type="text"
                      size="small"
                      >查看详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: center">
                <el-pagination
                  @current-change="handleChangePage"
                  layout="prev, pager, next"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:p1="{ item }">
          <div>
            <el-form
              :inline="true"
              :model="inputInfo2"
              class="demo-form-inline"
            >
              <el-form-item label="专项名称:">
                <el-input
                  v-model="inputInfo2.programName"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业名称:">
                <el-input
                  size="small"
                  v-model="inputInfo2.enterpriseName"
                ></el-input>
              </el-form-item>
              <el-form-item label="申报方向:">
                <el-input
                  size="small"
                  v-model="inputInfo2.reportingDirection"
                ></el-input>
              </el-form-item>
              <el-form-item label="所属行业:">
                <el-select v-model="inputInfo2.belongIndustry" size="small">
                  <el-option
                    v-for="item in inputInfo.occupationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目总投资:">
                <el-input
                  size="small"
                  v-model="inputInfo2.projectInvestment"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目开始时间:">
                <el-date-picker
                  v-model="inputInfo2.starTime"
                  size="small"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="项目审核状态:">
                <el-input
                  size="small"
                  v-model="inputInfo2.projectApprovalStatus"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="hanleSelectInfo2"
                  >查询</el-button
                >
                <el-button @click="handleClear">重置</el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-table :data="tableData2" style="width: 100%">
                <el-table-column prop="id" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称">
                </el-table-column>
                <el-table-column prop="projectType" label="项目类型">
                </el-table-column>
                <el-table-column prop="enterpriseName" label="企业名称">
                </el-table-column>
                <el-table-column prop="city" label="项目所在州市">
                </el-table-column>
                <el-table-column prop="belongIndustry" label="项目所在行业">
                </el-table-column>
                <el-table-column prop="projectNature" label="项目性质">
                </el-table-column>
                <el-table-column prop="startTime" label="项目开始时间">
                </el-table-column>
                <el-table-column prop="projectInvestment" label="项目总投资">
                </el-table-column>
                <el-table-column
                  prop="projectApprovalstatus"
                  label="项目审核状态"
                >
                </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick2(scope.row)"
                      type="text"
                      size="small"
                      >查看详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div style="text-align: center">
                <el-pagination
                  @current-change="handleChangePage"
                  layout="prev, pager, next"
                  :total="total2"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:p2="{ item }">
          <div>
            <AreaInfo :thisTab="thisTab" :titleName="item.data" >
              <template v-slot:area="{ areaItem }">
                <el-table :data="areaItem.tableData" style="width: 100%">
                <el-table-column prop="id" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="name" label="专项名称">
                </el-table-column>
                <el-table-column prop="companyName" label="企业名称">
                </el-table-column>
                <el-table-column prop="orgCreditCode" label="企业统一信用代码">
                </el-table-column>
                <el-table-column prop="reportingDirection" label="申报方向">
                </el-table-column>
                <el-table-column prop="totalInvestment" label="项目总投资">
                </el-table-column>
                <el-table-column prop="projectAddress" label="企业所在地">
                </el-table-column>
                <el-table-column prop="industryType" label="所属行业">
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态">
                </el-table-column>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick2(scope.row)"
                      type="text"
                      size="small"
                      >查看详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              </template>
            </AreaInfo>
          </div>
        </template>
        <template v-slot:p3="{ item }">
          <div>
            <IndustrialDistribution
              :thisTab="thisTab"
              :titleName="item.data"
            >
           <template v-slot:area="{ areaItem2 }">
                <el-table :data="areaItem2.tableData" style="width: 100%;margin-top: 20px;">
                <el-table-column prop="id" label="序号" width="60">
                </el-table-column>
                <el-table-column prop="name" label="专项名称">
                </el-table-column>
                <el-table-column prop="companyName" label="企业名称">
                </el-table-column>
                <el-table-column prop="orgCreditCode" label="企业统一信用代码" width="200">
                </el-table-column>
                <el-table-column prop="reportingDirection" label="申报方向">
                </el-table-column>
                <el-table-column prop="totalInvestment" label="项目总投资">
                </el-table-column>
                <el-table-column prop="projectAddress" label="企业所在地">
                </el-table-column>
                <el-table-column prop="industryType" label="所属行业">
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态">
                </el-table-column>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick2(scope.row)"
                      type="text"
                      size="small"
                      >查看详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              </template>
              </IndustrialDistribution>
          </div>
        </template>
      </Plank>
    </el-col>
  </el-row>
</template>

<script src="../../../../js/moveMonitor/industry/invested/ImportProduct.js" />

<style scoped>
.Industry-distribution-table {
}
</style>
