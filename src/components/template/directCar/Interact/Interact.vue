<template>
  <div style="width:80%;margin:auto">
      <div class="reportbox-right-top" style="height:100%;margin:auto;margin-top:30px">
<!--          搜索栏-->
        <div>
          <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
            <el-form-item label="标题：">
              <input  size="small" v-model="formData.title" class="tableName-input"></input>
            </el-form-item>
            <el-form-item label="分类：">
              <el-select size="small" v-model="formData.category" placeholder="请选择">
                    <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="责任处室：">
                <el-select size="small" v-model="formData.ResponsibleDepartment" placeholder="请选择" disabled>
                              <el-option
                    v-for="item in responsibleAgency"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间：">
                <el-date-picker
                    size="small"
                    v-model="formData.fileTime"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    value-format = "yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small"  @click="submitForm()">查   询</el-button>
                <el-button @click="resetForm('formData')" size="small" >重  置</el-button>
            </el-form-item>
          </el-form>
        </div>
     </div>
     <div class="interact-cont">
         <div class="interact-cont-item" @click="handleTo(item)" v-for="(item,index) in interactiveMessage">
             <div class="interact-cont-item-title">{{item.title}}</div>
             <div class="interact-cont-item-tag">
                 <el-tag type="" effect="dark" v-if="item.type !== '' "> {{item.category}} </el-tag>
                <!-- <el-tag style="margin-left:10px" type="warning" effect="dark" :key="index2" v-for="(item2,index2) in item.department"> 
                  {{item2}} </el-tag> -->
                  <el-tag style="margin-left:10px" type="warning" effect="dark" :key="index2" v-for="(item2,index2) in responsibleAgency" v-if="item2.id === formData.ResponsibleDepartment"> 
                  {{item2.name}} </el-tag>
             </div>
             <div class="interact-cont-item-cont"> {{item.content}} </div>
             <div class="interact-cont-item-bottom">
                 <span> {{item.enterpriseName}} </span>
                 <span style="margin-left:30px"> {{item.messageTime}} </span>
             </div>
         </div>
     </div>

      <div class="Interact-fenye">
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
</template>

<script src="../../../js/directCar/Interact/Interact">
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