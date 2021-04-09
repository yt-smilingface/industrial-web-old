<template>
  <el-row>
    <el-col>
      <div style="width: 100%">
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">基本信息</span>
        </div>
        <div class="basic-information">
          <table
            class="basic-info-table"
            style="
              border: 1px solid #cfcfcf;
              margin-top: 18px;
              width: 100%;
              margin: auto;
            "
          >
            <tr style="margin: 0px; padding: 0px">
              <td class="enterprise-business-table-Details1">标签编号</td>
              <td class="enterprise-business-table-Details2">
                <el-input
                  v-model="tableDataJB.labelNum"
                  size="medium"
                  placeholder="请输入标签编号"
                  disabled
                ></el-input>
              </td>
              <td class="enterprise-business-table-Details1">标签名称</td>
              <td class="enterprise-business-table-Details2">
                <el-input
                  maxLength = '20'
                  v-model="tableDataJB.labelName"
                  size="medium"
                  placeholder="请输入标签名称"
                  :disabled="tableIndex === 1 ? true : false"
                ></el-input>
              </td>
              <td class="enterprise-business-table-Details1">责任机构</td>
              <td class="enterprise-business-table-Details2">
                <el-select size="small" v-model="tableDataJB.mechanismId">
                  <el-option
                    v-for="item in responsibleAgency"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    size="mini"
                    :disabled="tableIndex === 1 ? true : false"
                  >
                  </el-option>
                </el-select>
              </td>
              <td class="enterprise-business-table-Details1">创建时间</td>
              <td class="enterprise-business-table-Details2">
                <el-date-picker
                  v-model="tableDataJB.gmtCreate"
                  size="mini"
                  type="datetime"
                  style="border: 0px solid #ffffff"
                  placeholder="选择日期"
                  disabled
                >
                </el-date-picker>
              </td>
            </tr>
            <tr style="margin: 0px; padding: 0px">
              <td class="enterprise-business-table-Details1">标签说明</td>
              <td class="enterprise-business-table-Details2" colspan="7">
                <el-input
                  type="textarea"
                  :rows="3"
                  size="medium"
                  maxlength="200"
                  placeholder="请输入标签说明"
                  v-model="tableDataJB.description"
                  :disabled="tableIndex === 1 ? true : false"
                >
                </el-input>
              </td>
            </tr>
          </table>
        </div>
        <div class="signMeg-box-head">
          <span class="signMeg-box-head-span">企业范围</span>
        </div>
        <div class="basic-informations">
          <div v-if="tableIndex != 1">
            <el-button plain icon="el-icon-plus" @click="toggleSelection()"
              >单个新增</el-button
            >
            <el-button
              plain
              icon="el-icon-delete"
              @click="deleteLabelEnterprise"
              >删 &nbsp;&nbsp;&nbsp; 除</el-button
            >
            <el-button
              plain
              icon="el-icon-circle-plus"
              @click="batchAdd.dialogFormVisible = true;batchAdd.fileList=''"
              >批量新增</el-button
            >
            <el-button type="primary" plain @click="templateDownload"
              >批量新增模板下载</el-button
            >
          </div>
          <el-table
            :data="tableData"
            border
            class="signMeg-tableData"
            @selection-change="handleSelectionChangeTwo"
            tooltip-effect="dark"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" width="80" label="序号">
            </el-table-column>
            <el-table-column prop="companyName" label="企业名称">
            </el-table-column>
            <el-table-column prop="creditCode" label="统一社会信用代码">
            </el-table-column>
            <el-table-column prop="frname" label="法定代表人">
            </el-table-column>
            <el-table-column prop="esdate" label="成立日期"> </el-table-column>
            <el-table-column prop="regcap" label="注册资本"> </el-table-column>
            <el-table-column label="操作" width="104">
              <template slot-scope="scope">
                <el-button
                  @click="seeDetails(scope.row)"
                  type="primary"
                  size="small"
                  >查看详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="toggleSelection-one">
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
      </div>

      <div>
        <!--            单个新增-->
        <el-dialog title="" :visible.sync="singleAdd.dialogTableVisible">
          <div style="width: 100%; margin-bottom: 18px">
            <el-input
              placeholder="请输入内容"
              v-model="searchParam"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getAllEnterprise()"
                type="primary"
                >查询</el-button
              >
            </el-input>
          </div>
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="allEnterpriseData"
            border
            @select-all="handleSelectionChangeAll"
            @select="handleSelectionChangesss"
            :row-key="getRowKeys"
          >
            <el-table-column
              type="selection"
              width="55"
              :reserve-selection="true"
            >
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column label="企业名称" prop="companyName">
            </el-table-column>
            <el-table-column prop="creditCode" label="统一社会信用代码">
            </el-table-column>
            <el-table-column
              prop="frname"
              label="法定代表人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="esdate"
              label="成立日期"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="regcap"
              label="注册资本"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <div class="toggleSelection-one">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="pageSize"
              :page-size="cpage2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2"
            >
            </el-pagination>
          </div>
          <div style="margin-top: 28px; text-align: center">
            <el-button type="primary" @click="submitHandleSelectionChange"
              >保 存</el-button
            >
            <el-button
              @click="
                (singleAdd.dialogTableVisible = false), (currentPage2 = 1)
              "
              >取 消</el-button
            >
          </div>
        </el-dialog>
      </div>
      <div>
        <!--批量新增-->
        <el-dialog
          title=""
          v-loading="dialogloading"
          :visible.sync="batchAdd.dialogFormVisible"
        >
          <div>
            <span style="color: red; font-size: 16px"
              >上传企业清单表格，表格第1列为企业名称，第2列为统一社会信用代码</span
            >
          </div>
          <div style="margin: 40px auto; width: 80%">
            <div style="display: flex">
              <div class="file-name">{{ batchAdd.fileList }}</div>
              <el-upload
                style="display: flex"
                class="upload-demo signMegDeta-upload-demo"
                ref="upload"
                :action="this.HOST+'governmentfill/importEnterprise'"
                :on-change="handleChange"
                :before-upload="beforeAvatarUpload"
                :on-success="handleSuccess"
                :on-erro="handleFail"
                :headers="initHeader()"
                :data="tableDataJB"
                :auto-upload="false"
                :show-file-list="false"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="info"
                  style="height: 45px"
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px; height: 45px"
                  size="small"
                  type="primary"
                  @click="submitUpload"
                  >上 &nbsp;&nbsp;&nbsp; 传</el-button
                >
              </el-upload>
            </div>
            <p>支持文件格式：xls/xlxs</p>
          </div>
          <div style="margin-top: 28px; text-align: center">
            <el-button @click="batchAdd.dialogFormVisible = false;batchAdd.fileList=''"
              >返回
            </el-button>
          </div>
        </el-dialog>
      </div>
      <div class="view-reports">
        <div class="reports-buttom-one">
          <!-- <el-button type="primary" @click="saveLabel" v-if="tableIndex !== 1"
            >保 &nbsp;&nbsp;&nbsp; 存</el-button
          > -->
          <el-button @click="cancelSubmit">返 &nbsp;&nbsp;&nbsp; 回</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/directCar/makeReport/SignMegDetails.js"/>

<style>
.basic-informations {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  margin-top: 27px;
  margin-bottom: 22px;
  padding: 17px 30px;
}

.enterprise-business-table-Details1 {
  width: 10%;
  background: #f5f8ff;
  border: 1px solid #cfcfcf;
}
.enterprise-business-table-Details2 {
  width: 15%;
  text-align: left;
  padding-left: 20px;
  border: 1px solid #cfcfcf;
}

/*基本信息*/
.enterprise-business-info {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 15px;
}
.basic-info-table table {
  border-spacing: 0px;
}
.basic-info-table table td {
  height: 38px;
  border: 1px solid #cfcfcf;
  text-align: center;
  font-size: 12px;
}
.enterprise-business-table1 {
  width: 15.3%;
  /*background: #f5f8ff;*/
}
.enterprise-business-table2 {
  width: 18%;
  text-align: left;
  padding-left: 20px;
}
.enterprise-business-table3 {
  width: 35.3%;
  background: #ffffff;
  text-align: left;
  padding-left: 20px;
}
.enterprise-business-table4 {
  width: 18%;
  text-align: left;
  padding-left: 20px;
}
.signMeg-box-cont {
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  padding: 10px 30px;
}
.el-dialog {
  width: 62%;
}
.file-name {
  width: 550px;
  height: 50px;
  line-height: 50px;
  color: #0265ba;
  font-size: 16px;
  text-align: center;
  margin-right: 28px;
  background: #ffffff;
  border: 1px solid #0265ba;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.toggleSelection-one {
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 18px;
}
.signMeg-tableData {
  width: 100%;
  height: 300px;
  overflow: auto;
}
.signMegDeta-upload-demo {
  margin-top: 8px !important;
}

/*  */
.signMeg-tableData .el-table--border::after,
.el-table--group::after,
.el-table::before {
  z-index: 0;
}
.signMeg-tableData .clearfix table {
  margin-top: 0px;
}

.merge-table-warehouse .el-table__header-wrapper {
  th:first-child {
    .cell {
      width: 60px;
      .el-checkbox {
        display: none;
      }
      &:after {
        content: "操作";
      }
    }
  }
}
</style>