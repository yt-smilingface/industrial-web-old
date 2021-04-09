<template>
  <div
    style="
      width: 80%;
      margin: auto;
      background-color: #fff;
      min-width: 800px;
      margin-top: 30px;
    "
  >
    <div class="showInteract-box">
      <div class="showInteract-box-item">
        <span>标题：</span>
        <span class="showInteract-box-cont"> {{ tableData.title }}</span>
      </div>
      <div class="showInteract-box-item">
        <span>分类：</span>
        <span class="showInteract-box-cont">
          {{ tableData.category }}
        </span>
      </div>
      <div class="showInteract-box-item">
        <span>责任机构：</span>
        <span class="showInteract-box-cont" style="margin-left: 28px">
          <span :key="index" v-for="(item, index) in tableData.department">
            {{ item }}</span
          >
        </span>
      </div>
      <div class="showInteract-box-item">
        <span>留言：</span>
        <span class="showInteract-box-cont" style="width: 80%; padding: 20px">{{
          tableData.content
        }}</span>
      </div>
      <div class="showInteract-box-item">
        <span>企业：</span>
        <span class="showInteract-box-cont">{{
          tableData.enterpriseName
        }}</span>
        <el-button
          type="primary"
          style="margin-left: 30px"
          @click="viewEnterprise(tableData.enterpriseId)"
          >查看企业信息</el-button
        >
      </div>
      <div class="showInteract-box-item">
        <span>时间：</span>
        <span class="showInteract-box-cont">{{ tableData.messageTime }}</span>
      </div>
      <div style="text-align: center; margin-top: 38px">
        <el-button @click="cancelAuditOpinion" style="width: 120px"
          >返 回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script src="../../../js/directCar/Interact/ShowInteract">
</script>

<style>
.showInteract-box {
  width: 1000px;
  height: 1000px;
  background-color: #fff;
}
.showInteract-box-item {
  margin-left: 30px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  padding-top: 30px;
}
.showInteract-box-cont {
  display: inline-block;
  width: 60%;
  border-radius: 2px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.36);
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: #333333;
  margin-left: 60px;
  line-height: 40px;
  text-indent: 2rem;
}
</style>