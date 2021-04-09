<template>
  <div class="bbd-new-list">
    <div class="bbd-new-item" v-for="(item, index) in newOptions" :key="index">
      <span @click="noticechange(item)" style="margin-right: 10px;">{{item.gmtCreate}}</span>
      <span @click="noticechange(item)" class="bbd-name" :title="item.name">{{item.fileName}}</span>
    </div>
    <!-- <el-pagination
      v-if="newOptions.length > 10"
      style="margin-top: 20px;text-align:center;"
      layout="prev, pager, next"
      :total="newOptions.length">
    </el-pagination> -->
  </div>
</template>

<script>
export default {
  // name: 'newList',
  data(){
    return {
      type: '',
      newOptions: [],
    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.$route.meta.CName = this.$route.query.noticeName
    this.getNoticeData(this.type)
  },
  methods: {
		// 获取咨询数据
		getNoticeData(type) {
			this.componentsMoudel.startGet('tbbdfileinfo/list_all?type=' + type, {}, false).then((res) => {
				this.newOptions = res.body.data
				this.newOptions.forEach(item => {
					if(type == '6') {
						if(/^([0-9-]+)$/.test(item.fileName.substring(0,10))) {
							item.fileName = item.fileName.substring(10)
						}
					}
					item.gmtCreate = item.gmtCreate.substring(0, 10)
				})
    	})
		},
		// 点击咨询列表
		noticechange(item) {
			window.open(item.path)
		},
  }
}
</script>

<style scoped lang="scss">
.bbd-new-list {
  width: 1260px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
}
.bbd-new-item {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.bbd-name {
  // display: inline-block;
  // vertical-align: top;
  // max-width: calc( 100% - 84px);
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}
.bbd-btn {
  margin-left: 10px;
}

</style>