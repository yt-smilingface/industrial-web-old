<template>
  <div style="width:80%;margin:auto">
      <div class="reportbox-right-top" style="height:100%;margin:auto;margin-top:30px">
<!--          搜索栏-->
        <div>
          <el-form label-width="100px" label-position="left" :model="formData" class="demo-form-inline">
            <el-form-item label="处室名称：">
              <input  size="small" v-model="formData.name" class="tableName-input"></input>
            </el-form-item>
            <el-form-item label="处室编号：">
              <input  size="small" v-model="formData.number" class="tableName-input"></input>
            </el-form-item>
            <el-form-item label="处室类别：">
              <el-select size="small" v-model="formData.category" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处室领导：">
                <el-select size="small" v-model="formData.leader" placeholder="请选择" >
                   <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small"  @click="departmentSave">提  交</el-button>
                <el-button @click="resetForm" size="small" >重  置</el-button>
                <el-button @click="cancelAuditOpinion" size="small" >取  消</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

 <script src='../../../components/js/systemManagement/AddDepartment.js' >
</script>

<style>
.reportbox-right-top-span .el-select {
  width: 120px;
}
.reportbox-right-top-span .el-range-editor--small.el-input__inner {
  width: 280px;
}
.interact-cont {
  margin: auto;
  margin-top: 30px;
}
.interact-cont-item {
  background-color: #fff;
  min-height: 180px;
  margin: auto;
  width: 100%;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 3px #eee;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-bottom: 20px;
}
.interact-cont-item-title {
  /* margin-top: 20px; */
  margin-left: 30px;
}
.interact-cont-item-tag {
  margin-left: 30px;
}
.interact-cont-item-tag .el-tag {
  height: 26px;
  padding: 0 10px;
  line-height: 22px;
}
.interact-cont-item-cont {
  margin-left: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  margin-bottom: 30px;
  text-indent: 2rem;
  margin-right: 20px;
}
.interact-cont-item-bottom {
  margin-left: 30px;
  margin-bottom: 20px;
  font-size: 13px;
  font-family: PingFang SC, PingFang SC-Light;
  font-weight: 300;
  text-align: left;
  color: #8a8a8a;
}
.Interact-fenye {
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 18px;
}
</style>