<template>
  <div style="width: 1300px; margin: auto" class="bbd-management">
    <div class="bbd-static">
      <el-card class="bbd-menagement-item" style="height: 66px">
        <div class="bbd-management-title">
          项目总个数
          <!-- <el-tooltip content="项目总个数">
            <span
              class="el-icon-warning-outline"
              style="font-size: 14px; color: #999"
            ></span>
          </el-tooltip> -->
        </div>
        <div class="bbd-management-value">{{managementData.projects}}个</div>
        <div class="bbd-management-container">
          <span class="bbd-management-sum-item"
            >在谈<span style="color: #409eff">{{managementData.sign}}</span></span
          >
          <span class="bbd-management-sum-item"
            >在建<span style="color: #409eff">{{managementData.build}}</span></span
          >
          <span class="bbd-management-sum-item"
            >投产<span style="color: #409eff">{{managementData.put}}</span></span
          >
        </div>
      </el-card>
      <el-card class="bbd-menagement-item" style="height: 66px">
        <div class="bbd-management-title">
          项目总投资
          <!-- <el-tooltip content="项目总投资">
            <span
              class="el-icon-warning-outline"
              style="font-size: 14px; color: #999"
            ></span>
          </el-tooltip> -->
        </div>
        <div class="bbd-management-value">{{(managementData.projectAmounts/10000).toFixed(2)}}亿元</div>
        <div class="bbd-management-container"></div>
      </el-card>
      <el-card class="bbd-menagement-item" style="height: 66px">
        <div class="bbd-management-title">
          投资总进度
          <!-- <el-tooltip content="投资总进度">
            <span
              class="el-icon-warning-outline"
              style="font-size: 14px; color: #999"
            ></span>
          </el-tooltip> -->
        </div>
        <div class="bbd-management-value">{{managementData.schedule}}%</div>
        <div class="bbd-management-container">
          <el-progress style="width: 180px" :percentage="managementData.schedule"></el-progress>
        </div>
      </el-card>
      <el-card class="bbd-menagement-item" style="width:calc(30% - 22px)">
        <div class="bbd-management-echarts" id="managementType"></div>
      </el-card>
      <el-card class="bbd-menagement-item" style="width:calc(45% - 22px)">
        <div class="bbd-management-echarts" id="industryDistribution"></div>
      </el-card>
      <!-- <el-card class="bbd-menagement-item" style="width:calc(45% - 22px)">
        <div class="bbd-management-echarts" id="industryDistributions"></div>
      </el-card> -->
      <el-card class="bbd-menagement-item" style="height: 340px;width:calc(25% - 22px)">
        <div class="bbd-area-table" style="height: 300px; overflow: hidden; ">
          <div
            style="height: 1000px; overflow: auto; transition: all 0.5s;"
            :style="'margin-top:-' + buildTop + 'px'"
						@mouseover="mouseOver"
						@mouseleave="mouseLeave">
            <el-table
              :default-sort="{prop:'value',order:'descending'}"
              :data="managementDistributionOtptions">
              <el-table-column type="index" align="center" width="48" label="排名"> </el-table-column>
              <el-table-column prop="name" align="center" label="区域"> </el-table-column>
              <el-table-column prop="value" sortable align="center" width="88" label="项目数">	</el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>

    <div class="titleForm">
      <el-form :inline="true" :model="inputInfo" class="demo-form-inline">
        <el-form-item label="项目名称:">
          <el-input v-model="inputInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="归属企业:">
          <el-input v-model="inputInfo.ownedEnterprise"></el-input>
        </el-form-item>
        <el-form-item v-if="isShow" label="所在州市:">
          <el-select v-model="inputInfo.cityCode"  filterable @change="handleSelectCity">
            <el-option
              v-for="item in beloneCity"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isShow" label="所在区县:">
          <el-select v-model="inputInfo.areaCode"  filterable>
            <el-option
              v-for="item in selectCountry"
              :key="item.code"
              :label="item.area"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isShow" label="所属行业:">
          <el-select v-model="inputInfo.industryCode" filterable>
            <el-option
              v-for="item in inputInfo.occupationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isShow" label="投资规模:">
          <el-select v-model="inputInfo.investmentScaleType">
            <el-option
              v-for="item in investment"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="isShow" label="时间:">
          <el-date-picker
            @change="getTimeVal"
            v-model="inputInfo.time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="isShow" label="项目类型:">
          <!-- projectType -->
          <el-select v-model="inputInfo.projectType">
            <el-option
              v-for="item in projectType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hanleSelectInfo(1)">查询</el-button>
          <el-button @click="handleClear">重置</el-button>
          <el-button type="warning" @click="handleAdd">新增</el-button>
        </el-form-item>
        <span class="bbd-advanced-search" @click="advancedClick">
          {{ advancedname }}
          <span :class="davancedIcon"></span>
        </span>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="项目名称">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content" style="width: 400px;">
                <div style="font-size: 16px;">{{scope.row.name}}</div> <br />
                {{scope.row.constructionContent}}
              </div>
              <span>{{scope.row.name}}</span>
          </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="ownedEnterprise"
          label="归属企业"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="cityName" label="所在州市" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="areaName" label="所在区县" show-overflow-tooltip> </el-table-column> -->
        <el-table-column
          prop="industryName"
          label="所属行业"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="startTime" label="起止时间" width="180">
          <template slot-scope="scope" v-if="scope.row.startTime">
            {{
              scope.row.startTime.split(" ")[0] +
              "--" +
              scope.row.endTime.split(" ")[0]
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="proTotalInvestment"
          label="总投资(万元)"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="investmentProgress" label="投资进度" width="120">
          <template slot-scope="scope" v-if="scope.row.investmentProgress">
            <el-progress
              class="bbd-progress-value"
              v-if="isNaN(scope.row.investmentProgress)"
              :text-inside="true"
              :stroke-width="15"
              :percentage="0"
              status="success"
            ></el-progress>
            <el-progress
              class="bbd-progress-value"
              :class="{'bbd-progress': parseInt(scope.row.investmentProgress) < 5}"
              v-else
              :text-inside="true"
              :stroke-width="15"
              :percentage="parseInt(scope.row.investmentProgress)"
              :status="getType(parseInt(scope.row.investmentProgress))"
            ></el-progress>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="progress" label="时间进度" width="120">
          <template slot-scope="scope">
            <el-progress
              v-if="isNaN(scope.row.progress)"
              :text-inside="true"
              :stroke-width="15"
              :percentage="0"
              status="success"
            ></el-progress>
            <el-progress
              v-else
              :text-inside="true"
              :stroke-width="15"
              :percentage="parseInt(scope.row.progress)"
              :status="getType(parseInt(scope.row.progress))"
            ></el-progress>
          </template>
        </el-table-column> -->
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-link @click="handleClick(scope.row)" type="primary" size="small"
              >查看</el-link
            >
            <el-link
              style="margin-left: 6px"
              @click="handleChangeList(scope.row)"
              type="warning"
              size="small"
              >修改</el-link
            >
            <el-link
              style="margin-left: 6px"
              @click="handleDelList(scope.row.id)"
              type="danger"
              size="small"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; background-color: #fff">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog
      :title="showtText"
      :visible.sync="dialogFormVisible"
      :rules="rules"
      width="80%"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        :inline="true"
        :label-width="formLabelWidth"
        class="bbd-dialog-form"
      >
        <div class="formTitle">基本信息</div>
        <el-form-item label="项目类型" prop="projectType">
          <el-select :disabled="isChecked" v-model="form.projectType">
            <el-option
              v-for="item in projectType2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input
            :maxlength="20"
            :disabled="isChecked"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="国民经济行业分类代码"
          label-width="200px"
          prop="industryCode"
        >
          <el-select :disabled="isChecked" v-model="form.codeAndName">
            <el-option
              v-for="item in inputInfo.occupationOptions2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业" prop="industryCode">
          <el-select :disabled="isChecked" v-model="form.industryCode">
            <el-option
              v-for="item in inputInfo.occupationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在州市" prop="cityCode">
          <el-select
            v-model="form.cityCode"
            :disabled="isChecked"
            @change="handleSelectCity2"
          >
            <el-option
              v-for="item in beloneCity"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在区县" prop="areaCode">
          <el-select v-model="form.areaCode" :disabled="isChecked">
            <el-option
              v-for="item in formselectCountry"
              :key="item.code"
              :label="item.area"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 项目建设地（园区）： -->
        <el-form-item
          label="项目建设地(园区)"
          label-width="200px"
          prop="buildingLocation"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.buildingLocation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="起止时间" prop="time">
          <el-date-picker
            :disabled="isChecked"
            v-model="form.time"
            @focus="handleFocus"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="recordCertificateNo" label="备案证编号">
          <el-input
            :disabled="isChecked"
            v-model="form.recordCertificateNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="referenceNumber"
          label="环评批复文件名称及文号"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.referenceNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle" style="margin-top: 40px">企业信息</div>
        <el-form-item label="企业名称" prop="ownedEnterprise">
          <el-input
            :maxLength="20"
            :disabled="isChecked"
            v-model="form.ownedEnterprise"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 是否为上市公司或拟培育上市公司: -->
        <el-form-item
          label="是否为上市公司或拟培育上市公司"
          label-width="230px"
          prop="isGoPublic"
        >
          <el-select
            :disabled="isChecked"
            v-model="form.isGoPublic"
            placeholder="请选择"
          >
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
          </el-select>
        </el-form-item>

        <!-- 企业所有制性质： -->
        <el-form-item
          label="企业所有制性质:"
          prop="ownershipNature"
          label-width="140px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.ownershipNature"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle" style="margin-top: 40px">招商及投资信息</div>

        <!-- 拟招商单位（甲方）： -->
        <el-form-item
          prop="proposedInviteUnit"
          label="拟招商单位(甲方)"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.proposedInviteUnit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="proposedInvestmentUnit"
          label="拟招商单位(乙方)"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.proposedInvestmentUnit"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="planInvestmentStartTime"
          label="投资预计启动时间"
          label-width="220px"
        >
          <el-date-picker
            :disabled="isChecked"
            v-model="form.planInvestmentStartTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="inviteInvestmentUnit" label="招商单位">
          <el-input
            :disabled="isChecked"
            v-model="form.inviteInvestmentUnit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="investmentUnit"
          label="投资单位"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.investmentUnit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 项目总投资 -->
        <el-form-item
          prop="proTotalInvestment"
          label="总投资(万元)"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.proTotalInvestment"
            autocomplete="off"
            :min="0"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="bankLoan"
          label="银行贷款(万元)"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.bankLoan"
            autocomplete="off"
            :min="0"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="planTotalInvestment"
          label="计划总投资(万元)"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            :min="0"
            v-model="form.planTotalInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="yearPlanInvestment"
          label="本年度计划投资(万元)"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.yearPlanInvestment"
            autocomplete="off"
            :min="0"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <!-- 项目固定资产计划总投资（万元）： -->
        <el-form-item
          prop="proPlanFixedAssetsInvestment"
          label="项目固定资产计划总投资(万元)"
          label-width="240px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.proPlanFixedAssetsInvestment"
            autocomplete="off"
            :min="0"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="planFixedAssetsInvestment"
          label="2020年固定资产计划投资(万元)"
          label-width="260px"
        >
          <el-input
            :disabled="isChecked"
            :min="0"
            v-model="form.planFixedAssetsInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="completedInvestment"
          label="截止2019年底固定资产累计完成投资(万元)"
          label-width="340px"
        >
          <el-input
            :disabled="isChecked"
            :min="0"
            v-model="form.completedInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="grandTotalInvestment"
          label="2020年累计完成投资(万元)"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            :min="0"
            v-model="form.grandTotalInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <div class="formTitle" style="margin-top: 40px">建设内容及成效</div>
        <el-form-item
          prop="constructionContent"
          label="主要建设内容"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.constructionContent"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="expectedSalesCompletion"
          label="项目达产后预计销售收入(万元)"
          label-width="240px"
        >
          <el-input
            :disabled="isChecked"
            :min="0"
            v-model="form.expectedSalesCompletion"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="expectedTaxCompletion"
          label="项目达产后预计利税(万元)"
          label-width="220px"
        >
          <el-input
            :min="0"
            :disabled="isChecked"
            v-model="form.expectedTaxCompletion"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item prop="newJobs" label="就业人数(人)" label-width="220px">
          <el-input-number
            v-model="form.newJobs"
            :disabled="isChecked"
            :min="0"
            :max="10000000000"
            label="描述文字"
          >
          </el-input-number>
        </el-form-item>

        <el-form-item
          prop="expectedSales"
          label="项目2020年预计销售收入(万元)"
          label-width="240px"
        >
          <el-input
            :min="0"
            :disabled="isChecked"
            v-model="form.expectedSales"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="expectedTax"
          label="2020年预计利税(万元)"
          label-width="220px"
        >
          <el-input
            :min="0"
            :disabled="isChecked"
            v-model="form.expectedTax"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <div class="formTitle" style="margin-top: 40px">项目进度</div>
        <el-form-item
          prop="projectProgress"
          label="项目进展情况"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.projectProgress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle" style="margin-top: 40px">主要问题</div>
        <el-form-item
          prop="enterpriseInternalResolved"
          label="企业内部需解决的问题"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.enterpriseInternalResolved"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="provincialDepResolved"
          label="需协调省级部门解决的问题"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.provincialDepResolved"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="cityDepResolved"
          label="需协调州市部门解决的问题"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.cityDepResolved"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle">联系人信息</div>
        <el-form-item label="项目联系人" prop="linkman">
          <el-input
            :disabled="isChecked"
            v-model="form.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系人手机"
          prop="contactNumber"
          :rules="[
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;

                if (value === '') {
                  callback('请输入正确信息');
                } else {
                  let bool = reg.test(value);
                  if (bool) {
                    callback();
                  } else {
                    callback('请输入正确格式的手机号');
                  }
                }
              },
            },
          ]"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.contactNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handelCancelModel()">取 消</el-button>
        <el-button
          type="primary"
          v-if="!isChecked"
          :disabled="ifClick"
          @click="handleSubmit('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- dialog根据项目类型隐藏 -->
    <!-- <el-dialog
      :title="showtText"
      :visible.sync="dialogFormVisible"
      :rules="rules"
      width="80%"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        :inline="true"
        :label-width="formLabelWidth"
      >
        <div class="formTitle">基本信息</div>
        <el-form-item label="项目类型:" prop="projectType">
          <el-select :disabled="isChecked" v-model="form.projectType">
            <el-option
              v-for="item in projectType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        {{ form.projectType }}
        <el-form-item label="项目名称:" prop="name">
          <el-input
            :disabled="isChecked"
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="所在州市:" prop="cityCode">
          <el-select
            v-model="form.cityCode"
            size="small"
            :disabled="isChecked"
            @change="handleSelectCity2"
          >
            <el-option
              v-for="item in beloneCity"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在区县:" prop="areaCode">
          <el-select v-model="form.areaCode" :disabled="isChecked" size="small">
            <el-option
              v-for="item in formselectCountry"
              :key="item.code"
              :label="item.area"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属行业:" prop="industryCode">
          <el-select :disabled="isChecked" v-model="form.industryCode">
            <el-option
              v-for="item in inputInfo.occupationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目建设地（园区）:"
          label-width="200px"
          prop="buildingLocation"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.buildingLocation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="起止时间:"
          prop="time"
          v-if="form.projectType != 0"
        >
          <el-date-picker
            :disabled="isChecked"
            v-model="form.time"
            @focus="handleFocus"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="recordCertificateNo"
          label="备案证编号:"
          v-if="form.projectType != 0 || form.projectType != 1"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.recordCertificateNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="referenceNumber"
          label="环评批复文件名称及文号:"
          label-width="200px"
          v-if="form.projectType != 0 || form.projectType != 4"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.referenceNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle" style="margin-top: 40px">企业信息</div>
        <el-form-item label="企业名称:" prop="ownedEnterprise">
          <el-input
            :disabled="isChecked"
            v-model="form.ownedEnterprise"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否为上市公司或拟培育上市公司:"
          label-width="230px"
          prop="isGoPublic"
        >
          <el-select v-model="form.isGoPublic" placeholder="请选择">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="企业所有制性质:"
          prop="ownershipNature"
          label-width="140px"
          v-if="form.projectType != 0"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.ownershipNature"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle" style="margin-top: 40px">招商及投资信息</div>

        <el-form-item
          v-if="form.projectType == 0"
          prop="businessInvitation"
          label="拟招商单位（甲方）："
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.businessInvitation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.projectType == 0"
          prop="beBusinessInvitation"
          label="拟招商单位（乙方）："
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.businessInvitation"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="form.projectType == 0"
          prop="planStartTime"
          label="投资预计启动时间（年月）:"
          label-width="220px"
        >
          <el-date-picker
            v-model="form.planStartTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          v-if="form.projectType == 1"
          prop="merchantsDepartment"
          label="招商单位:"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.merchantsDepartment"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.projectType == 1"
          prop="investmentManagement"
          label="投资单位:"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.investmentManagement"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.projectType == 1"
          prop="proTotalInvestment"
          label="总投资（万元）："
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.proTotalInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          prop="bankLoan"
          label="银行贷款（万元）:"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.bankLoan"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.projectType == 0"
          prop="plannedInvestment"
          label="计划总投资（万元）:"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.plannedInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.projectType == 1"
          prop="yearPlannedInvestment"
          label="本年度计划投资（万元）:"
          label-width="200px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.yearPlannedInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="fixedAssetsInvestment"
          label="项目固定资产计划总投资（万元）:"
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          label-width="240px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.fixedAssetsInvestment"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          prop="expectedSalesCompletion"
          label="2020年固定资产计划投资（万元）:"
          label-width="260px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedSalesCompletion"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.projectType == 3 || form.projectType == 4"
          prop="expectedTaxCompletion"
          label="截止2019年底固定资产累计完成投资（万元）:"
          label-width="340px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedTaxCompletion"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          prop="expectedSales"
          label="2020年累计完成投资（万元）:"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedSales"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <div class="formTitle" style="margin-top: 40px">建设内容及成效</div>
        <el-form-item
          prop="constructionContent"
          label="主要建设内容:"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.constructionContent"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          prop="expectedSales"
          label="项目达产后预计销售收入（万元）:"
          label-width="240px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedSales"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          prop="expectedSales"
          label="项目达产后预计利税（万元）:"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedSales"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="
            form.projectType == 2 ||
            form.projectType == 3 ||
            form.projectType == 4
          "
          prop="newJobs"
          label="就业人数（人）:"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.newJobs"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="expectedSales"
          label="项目2020年预计销售收入（万元）:"
          v-if="form.projectType == 4"
          label-width="240px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedSales"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="expectedSales"
          v-if="form.projectType == 4"
          label="2020年预计利税（万元）:"
          label-width="220px"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.expectedSales"
            autocomplete="off"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            type="number"
          ></el-input>
        </el-form-item>

        <div class="formTitle" style="margin-top: 40px">项目进度</div>
        <el-form-item
          prop="projectProgress"
          label="项目进展情况:"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.projectProgress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle" style="margin-top: 40px">主要问题</div>
        <el-form-item
          prop="projectProgress"
          label="企业内部需解决的问题:"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.projectProgress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="projectProgress"
          label="需协调省级部门解决的问题:"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.projectProgress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="projectProgress"
          label="需协调州市部门解决的问题:"
          label-width="180px"
          style="width: 100%"
          class="blcokItem"
        >
          <el-input
            :disabled="isChecked"
            type="textarea"
            :rows="8"
            v-model="form.projectProgress"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="formTitle">联系人信息</div>
        <el-form-item label="项目联系人:" prop="linkman">
          <el-input
            :disabled="isChecked"
            v-model="form.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系人手机:"
          prop="contactNumber"
          :rules="[
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;

                if (value === '') {
                  callback('请输入正确信息');
                } else {
                  let bool = reg.test(value);
                  if (bool) {
                    callback();
                  } else {
                    callback('请输入正确格式的手机号');
                  }
                }
              },
            },
          ]"
        >
          <el-input
            :disabled="isChecked"
            v-model="form.contactNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script src="@/components/js/projectManagement/Management.js">
</script>

<style lang="scss">

// 顶部项目统计
.titleForm {
  width: calc(100% - 40px);
  padding: 20px;
  font-size: 12px;
  margin-bottom: 30px;
  background-color: #fff;
  .el-form-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.formTitle {
  font-weight: 800;
  color: blue;
  font-size: 16px;
  line-height: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  text-indent: 22px;
}
.blcokItem .el-form-item__content {
  width: 80%;
}

.bbd-dialog-form .el-form-item {
  display: inline-block;
  vertical-align: top;
  width: 440px;
}
.bbd-dialog-form .el-form-item__label {
  margin-top: 12px;
  width: 150px !important;
  line-height: 20px;
}
.bbd-dialog-form .el-form-item__content {
  width: calc(100% - 150px);
}
.bbd-dialog-form .el-select {
  width: 100%;
}
.bbd-dialog-form .el-range-editor.el-input__inner {
  width: 100%;
}
.bbd-dialog-form .el-date-editor.el-input {
  width: 100%;
}

.bbd-area-title {
  font-size: 16px;
  font-weight: bolder;
  color: #000;
}

// 顶部数据统计
.bbd-management {
  .bbd-static {
    // 项目管理
    margin-left: -10px;
    margin-right: -10px;
    .bbd-menagement-item {
      margin: 0 10px;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 14px;
      width: calc(33.33% - 22px);
    }
    .bbd-management-value {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
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

  .bbd-management-echarts {
    width: 100%;
    height: 300px;
  }
  .bbd-advanced-search {
    display: inline-block;
    vertical-align: -26px;
    margin-left: 20px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }

  .bbd-area-item {
    line-height: 36px;
    font-size: 14px;
    .bbd-area-label {
      display: inline-block;
      vertical-align: top;
      width: 70%;
    }
    .bbd-area-value {
      display: inline-block;
      vertical-align: top;
      width: 30%;
    }

  }
}
</style>

<style lang="scss">
/* 项目分布数量 */
.bbd-area-table {
  .el-table .cell {
    padding: 0;
  }
  .el-table td,
  .el-table th {
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

.bbd-management {
  .el-input.is-disabled .el-input__inner,
  .el-range-editor.is-disabled,
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: transparent;
    // border-color: #fff;
    color: #333;
  }
  .el-input.is-disabled .el-input__icon {
    display: none;
  }
  .el-range-editor.is-disabled input {
    background-color: transparent;
    color: #333;
  }
  .el-input-number.is-disabled .el-input-number__decrease, 
  .el-input-number.is-disabled .el-input-number__increase {
    display: none;
  }
}

</style>