<template>
  <div class="bbd-personal-center">
    <bbd-director v-if="userInfo.category == 1"></bbd-director>
    <bbd-commissioner v-if="userInfo.category == 2 || userInfo.category == 3"></bbd-commissioner>
    <!-- <bbd-operating-guide></bbd-operating-guide> -->

    <el-dialog
      title="更新提示 2021年4月8日"
      :visible.sync="dialogVisible"
      @close="dialogClose"
      width="50%">
      <div style="max-height:400px;overflow:auto">
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>  
</template>

<script>
import bbdDirector from './director'
import bbdCommissioner from './commissioner'
// import bbdOperatingGuide from '../OperatingGuide'
export default {
  components: {
    bbdDirector,
    bbdCommissioner,
    // bbdOperatingGuide
  },
  data() {
    return {
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
      dialogVisible: true
    }
  },

  created() {
    let isUpdate = JSON.parse(localStorage.getItem('isUpdate'))
    if(isUpdate != null) {
      this.dialogVisible = isUpdate
    }

  },

  methods: {
    // 更新确认窗口
    confirmClick() {
      localStorage.setItem('isUpdate', false)
      this.dialogVisible = false
    },

    // 窗口关闭
    // 窗口关闭时切换缓存中是否打开更新窗口的状态
    dialogClose() {
      localStorage.setItem('isUpdate', false)
      this.dialogVisible = false
    }
  }
  
}
</script>

<style scoped lang="scss">

</style>