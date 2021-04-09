<template>
  <div class="bbd-update-log">
    <el-timeline>
      <el-timeline-item timestamp="2021-04-08" placement="top">
        <h3>常规修改</h3>
        <p>1、修改各个处室咨询内容显示无的bug</p>
        <p>2、重点企业画像下拉框添加搜索</p>
        <p>3、厅长项目管理州市排名列表点击之后跳转到项目管理对应的州市列表</p>
        <p>4、轮播图数据更新</p>
        <p>5、更新了行业研报，截止2021年4月2日</p>
        <p>6、新增了宏观研报，截止2021年4月7日</p>
        <p>7、更新了工信动态、时政新闻、政策文件、政策解读，截止2021年4月1日</p>
        <h3>新功能</h3>
        <p>1、个人中心新增更新提示(每次更新时自动弹出显示)</p>
        <p>2、新增更新日志</p>
        <p>3、新增知识库-行业研报</p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  // name: 'updateLog',
  data(){
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style scoped lang="scss">
.bbd-update-log {
  width: 1260px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
}
</style>