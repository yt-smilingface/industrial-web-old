<template>
  <el-row>
    <el-col>
      <div class="view-reports">
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">基本信息</span>         
          </div>
           
          <div class="basic-information">
                  
            <table class="basic-information-table1">
              <tr style="margin: 0px;  padding: 0px">
                <td class="enterprise-business-table1">报告编号</td>
                <td class="enterprise-business-table2">
                  <el-input
                    v-model="tableData.reportId"
                    disabled
                    size="medium"
                    placeholder="报告编号"
                  ></el-input>
                </td>
                <td class="enterprise-business-table1">报告名称</td>
                <td class="enterprise-business-table2">
                  <el-input
                    v-model="tableData.reportName"
                    size="medium"
                    placeholder="请输入报告名称"
                  ></el-input>
                </td>
                <td class="enterprise-business-table1">报告期别</td>
                <td class="enterprise-business-table2">
                  <el-select
                    v-model="tableData.reportType"
                    size="medium"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in reportTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr style="margin: 0px;  padding: 0px">
                       
                <td class="enterprise-business-table1">责任机构</td>
                <td class="enterprise-business-table2">
                  <el-input
                    v-model="tableData.agencyName"
                    size="medium"
                    placeholder="请输入责任机构"
                    disabled
                  ></el-input>
                </td>
                <td class="enterprise-business-table1">报告日期</td>
                <td class="enterprise-business-table2">
                  <el-input
                    size="medium"
                    v-model="tableData.reportDate"
                    placeholder="请输入责任机构"
                  ></el-input>
                </td>
                        
              </tr>
              <tr style="margin: 0px;  padding: 0px">
                <td class="enterprise-business-table1">可见性部门</td>
                <td class="enterprise-business-table2" colspan="5">
                  <el-checkbox-group v-model="tableData.visibilityDepList">
                    <el-checkbox
                      v-for="(item, index) in queryAgencyData"
                      :label="item.id"
                      :key="item.id"
                      >{{ item.name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </td>
              </tr>
                     
              <tr style="margin: 0px;  padding: 0px">
                              
                <td class="enterprise-business-table1">报告说明</td>
                    
                <td class="enterprise-business-table2" colspan="5">
                  <el-input
                    type="textarea"
                    :rows="3"
                    size="medium"
                    placeholder="请输入报告说明"
                    v-model="tableData.reportRemark"
                  >
                  </el-input>
                </td>
                   
              </tr>
                
            </table>
          </div>
        </div>
      </div>
      <div class="view-reports">
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">编辑报告</span>
          </div>
          <editor
            style="margin: 30px 0"
            @get-content="getEditerVal"
            :isClear="false"
            :msg="tableData.reportContent"
          />
        </div>
      </div>
      <div class="view-reports">
        <div style="width: 100%">
          <div class="signMeg-box-head">
            <span class="signMeg-box-head-span">上传附件</span>
          </div>
          <el-upload
            v-if="cancelType === 0"
            class="upload-demo"
            drag
            :action="this.HOST + 'file/upload'"
            multiple
            :headers="initheaders()"
            :on-success="handleSendFile"
            :file-list="fileList"
            name="uploadFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip"></div>
          </el-upload>
          <el-upload
            v-if="cancelType !== 0 && fileList.length !== 0"
            class="upload-demo"
            drag
            :action="this.HOST + 'file/upload'"
            multiple
            :headers="initheaders()"
            :on-success="handleSendFile"
            :file-list="fileList"
            name="uploadFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip"></div>
          </el-upload>
        </div>
        <div class="view-reports">
          <div class="reports-buttom-one">
            <el-button type="primary" @click="saveSubmit()" :disabled="ifClick"
              >保 &nbsp;&nbsp;&nbsp; 存</el-button
            >
            <el-button @click="cancelSubmit"
              >取 &nbsp;&nbsp;&nbsp; 消</el-button
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/moveMonitor/smartReport/EditingReports.js">
</script>

<style>
.upload-demo {
  margin-top: 30px;
  width: 40%;
}
.reports-buttom-one {
  margin: auto;
  text-align: center;
}
.reports-buttom-one button {
  width: 180px;
}
</style>