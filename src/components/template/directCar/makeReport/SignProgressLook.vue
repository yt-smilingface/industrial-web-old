<template>
    <div>
        <div class="reportbox-right-top">
            <div style="display:flex;justify-content:space-around; width: 100%;">
            <span
                    class="reportbox-right-top-span"
            >发放企业名称：
                <input v-model="selectData.companyName" class="tableName-input"></input>
            </span>
                <span class="reportbox-right-top-span">填报状态：
                <el-select size="small" v-model="selectData.writeStatus" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
            </el-select></span>
                <span>
                <el-button type="primary" style="width:120px;margin-left:30px" @click="getProcessData()">查询</el-button>
                <el-button plain style="width:120px" @click="resetForm">重置</el-button>
            </span>
            </div>
        </div>
        <div class="reportbox-right-bottom">
            <el-table :data="tableData"  border style="width: 100%"> 
                <el-table-column type="index" label="序号" align="center"> </el-table-column>
                <el-table-column prop="fillNum"label="表单编号" align="center" width="120"> </el-table-column>
                <el-table-column prop="batchNum" label="批次编号" align="center"></el-table-column>
                <el-table-column prop="fillName"label="表名称" align="center"></el-table-column>
                <el-table-column prop="fillType" label="填报期别" align="center">
                    <template slot-scope="{ row }">
                        <div v-if="row.fillType === 0">月报</div>
                        <div v-if="row.fillType === 1">季报</div>
                        <div v-if="row.fillType === 2">年报</div>
                        <div v-if="row.fillType === 3">一次</div>
                    </template>
                </el-table-column>
                <el-table-column  prop="fillPeriod" label="本次填报期次" align="center" width="120"> </el-table-column>
                <el-table-column prop="gmtCreate" label="发放时间" align="center" width="160"> </el-table-column>
                <el-table-column prop="companyName" label="发放企业名称" align="center" width="180">  </el-table-column>
                <el-table-column prop="status" label="填报状态" align="center">
                    <template slot-scope="{ row }">
                        <div v-if="row.status === 0" class="Not-filled-in">未填报</div>
                        <div v-if="row.status === 1">已填报</div>
                    </template>
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态" align="center">
                    <template slot-scope="{ row }">
                        <div v-if="row.reviewStatus === 0">--</div>
                        <div v-if="row.reviewStatus === 1" @click="handleUrl(row.id)"  class="To-be-reviewed">待审核</div>
                        <div v-if="row.reviewStatus === 2">未通过</div>
                        <div v-if="row.reviewStatus === 3">已通过</div>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width: 100%;margin: auto; text-align: center;margin-top: 18px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pageSize"
                        :page-size="cpage"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script src="../../../js/directCar/makeReport/SignProgressLook.js">
</script>

<style>
.reportbox-right-top {
  width: 94%;
  /* height: 72px; */
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  border-radius: 5px;
  padding-top: 30px;
  padding-left: 60px;
  margin-bottom: 30px;
}
.reportbox-right-top .reportbox-right-top-span {
  margin-right: 20px;
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
.Not-filled-in {
  color: red;
}
.To-be-reviewed {
  color: #02a7f0;
}
</style>