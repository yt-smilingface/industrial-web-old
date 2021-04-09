<template>
  <el-row>
    <el-col>
      <div class="DepartmentDetails-sssss">
        <div class="DepartmentDetails-box-head">
          <span class="DepartmentDetails-box-head-span">基本信息</span>
        </div>
        <div class="DepartmentDetails-information">
          <el-form label-width="100px" :inline="true" :model="formData" class="demo-form-inline" size="small">
            <el-form-item label="机构类别：">
              <el-select :disabled="typeIndex === '1'?true:false" v-model="formData.category" placeholder="请选择">
                    <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
                    </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构名称：">
              <input :disabled="typeIndex === '1'?true:false"  maxlength="20" v-model="formData.name" class="tableName-input"></input>
            </el-form-item>
            
            <el-form-item label="分管领导：">
                <el-select :disabled="typeIndex === '1'?true:false"  
                v-model="formData.leaderId" placeholder="请选择" >
                   <el-option
                    v-for="item in leaderNameList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!--          菜单权限配置      -->
        <div class="DepartmentDetails-box-head">
          <span class="DepartmentDetails-box-head-span">菜单权限配置</span>
        </div>
        <div class="DepartmentDetails-information DepartmentDetails-double2">
            <el-tree
                :data="data"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
                @check="handleNodeClick"
                :default-checked-keys="defaultCheckedKeys">
            </el-tree>
        </div>
       
        <div class="view-reports">
          <div class="reports-buttom-one">
            <el-button
            v-if="typeIndex === '0'"
              type="primary"
              @click="saveNew()"
              :disabled="isClick"
              >保存新增</el-button
            >
            <el-button
            v-if="typeIndex === '2'"
              type="primary"
              @click="saveChanges"
              :disabled="isClick"
              >保存修改</el-button
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

<script src="../../js/systemManagement/DepartmentDetails.js"/>

<style >
.DepartmentDetails-sssss {
  width: 1280px;
  margin: auto;
}
.DepartmentDetails-box-head {
  width: 100%;
  background: linear-gradient(
    90deg,
    #0265ba 1%,
    rgba(255, 255, 255, 0.12) 103%
  );
  height: 50px;
  justify-content: space-between;
  position: relative;
}
.DepartmentDetails-box-head-span {
  line-height: 50px;
  font-weight: 600;
  margin-left: 30px;
  color: aliceblue;
  font-size: 18px;
}
.DepartmentDetails-information {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  margin-top: 27px;
  margin-bottom: 22px;
  padding: 8px 30px;
}
.DepartmentDetails-double2 {
  height: 260px;
  overflow: auto;
}
</style>