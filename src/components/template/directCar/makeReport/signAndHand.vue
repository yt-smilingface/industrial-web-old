<template>
  <div>
    <div class="reportbox-right-top">
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >表名称：
          <el-input
            class="tableName-input"
            v-model="selectData.tableName"
            type="text"
            style="display: inline-block;width:160px;"
          />
        </span>
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >上报企业名称：
          <el-input
            class="tableName-input"
            v-model="selectData.companyName"
            type="text"
            style="display: inline-block;width:160px;"
          />
        </span>
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >上报时间：
          <el-date-picker
            v-model="fileTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 360px;"
          >
          </el-date-picker>
        </span>
        <span class="reportbox-right-top-span reportbox-right-top-span2"
          >状 &nbsp;&nbsp;态：
          <el-select
            v-model="selectData.checkStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
        <div class="Sian-And-Hand-button reportbox-right-top-span2" style="display: inline-block;vertical-align: top">
          <el-button type="primary" style="width: 100px" @click="getProcessData()"
            >查询</el-button
          >
          <el-button plain style="width: 100px" @click="resetForm()"
            >重置</el-button
          >
        </div>
      </div>
    <div class="reportbox-right-bottom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="60" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="fillNum" label="表单编号" align="center">
        </el-table-column>
        <el-table-column
          prop="fillName"
          label="表单名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="companyName" label="上报企业名称" align="center">
        </el-table-column>
        <el-table-column prop="fillType" label="填报期别" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.fillType === 0">月报</div>
            <div v-if="row.fillType === 1">季报</div>
            <div v-if="row.fillType === 2">年报</div>
            <div v-if="row.fillType === 3">一次</div>
          </template>
        </el-table-column>
        <el-table-column prop="fillPeriod" label="本次填报期次" align="center">
        </el-table-column>
        <el-table-column prop="submitTime" label="企业提交时间" align="center">
        </el-table-column>
        <el-table-column prop="reviewStatus" label="审核状态" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.reviewStatus === 0">未提交</div>
            <div v-if="row.reviewStatus === 1">待审核</div>
            <div v-if="row.reviewStatus === 2">(未通过)审核</div>
            <div v-if="row.reviewStatus === 3">(已通过)审核</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="104" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              v-if="scope.row.reviewStatus === 1"
              >立即审核</el-button
            >
            <el-button
              @click="lookClick(scope.row)"
              type="text"
              size="small"
              v-if="
                scope.row.reviewStatus === 2 || scope.row.reviewStatus === 3
              "
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="Sian-And-Hand-fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSize"
          :page-size="cpage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!--        审核详情-->
  </div>
</template>

<script src="../../../js/directCar/makeReport/signAndHand"/>

<style >
.reportbox-right-top {
  min-height: 40px !important;
  width: calc(94% + 20px) !important;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  border-radius: 5px;
  padding: 10px 20px !important;
  margin-bottom: 20px !important;
  margin-right: 0 !important;
}
.reportbox-right-top .reportbox-right-top-span {
  margin-right: 20px;
}
.reportbox-right-top-span2 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  vertical-align: top;
}
.tableName-input {
  display: inline;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 30px;
}
.reportbox-right-bottom {
  width: 94%;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  padding: 10px 30px;
}
.Sian-And-Hand-button {
  /* width: 100%; */
  /* margin-top: 30px; */
  text-align: center;
}
.Sian-And-Hand-fenye {
  width: 100%;
  margin: auto;
  text-align: center !important;
  margin-top: 18px;
}
</style>