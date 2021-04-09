<template>
  <div class="bbd-new-list">
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple">
        <el-menu
          :default-active="menuActive"
          class="el-menu-vertical-demo"
          @select="menuSelect"
          style="height:700px;overflow:auto;">
          <el-menu-item index="0">
            <i class="el-icon-s-operation"></i>
            <span slot="title">所有</span>
          </el-menu-item>
          <el-menu-item index="111">
            <i class="el-icon-picture-outline-round"></i>
            <span slot="title">宏观研报</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>行业经济研报</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(item, index) in typeOptions" :key="index" 
                :index="item.value"
                @click="menuClick(item)"
                >{{item.label}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>政策文件</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(item, index) in getDepList" :key="index" 
                :index="item.id"
                @click="menuDepClick(item)"
                >{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="6">
            <i class="el-icon-star-off"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-share"></i>
            <span slot="title">我的分享</span>
          </el-menu-item> -->
        </el-menu>
      </div></el-col>
      <el-col :span="20"><div class="grid-content bg-purple">
        <div class="bbd-form" style="margin-bottom: 40px;">
          <el-input v-model="formData.fileName" style="width: 250px;margin-right:20px;" placeholder="请输入热点研报名称"></el-input>
          <el-select v-model="formData.files" style="margin-right:20px;" placeholder="请选择行业类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-select v-model="formData.files" style="margin-right:20px;" placeholder="请选择来源">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <el-button type="primary" @click="searchInput">搜索</el-button>
          <el-button @click="cancelClick">重置</el-button>
        </div>
        <div class="bbd-new-item" v-for="(item, index) in newOptions" :key="index">
          <span @click="noticechange(item)" style="margin-right: 10px;">{{item.gmtCreate}}</span>
          <span @click="noticechange(item)" class="bbd-name" :title="item.name">
            {{item.fileName}}
            <span v-if="menuActive == '0'" style="padding: 1px 6px;background-color:#409EFF;color:#fff;border-radiusL2px;">{{item.files}}</span>
          </span>
          <!-- <span><i class="el-icon-star-off" style="font-size:18px;margin-right:10px;"></i></span> -->
          <!-- <span><i class="el-icon-paperclip" style="font-size:18px;"></i></span> -->
          <span v-if="type != 3" class="bbd-source">来源：{{item.sorce ? item.sorce : '无'}}</span>
          <span v-if="type == 3" class="bbd-source">工信部({{item.files}})</span>
        </div>  
        <div v-if="newOptions.length == 0" style="text-align:center;color: #ccc;">
          <i class="el-icon-document-copy" style="margin-bottom: 10px;font-size: 60px;"></i><br>
          暂无数据</div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // name: 'newList',
  data(){
    return {
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
      newOptions: [],

      menuActive: '0',
      // 搜索项
      formData: {
        fileName: '',
        files: '',
        depId: 0
      },
      type: 6,

      currentPage: 1, //当前页数
      total: 0,  //总条数
 
      typeOptions: [],

      // 左侧树形结构列表
      getDepList: [
        {
          id: '40',
          name: '交通与物流处'
        },
        {
          id: '44',
          name: '节约能源处'
        },
        {
          id: '5',
          name: '经济运行处'
        },
        {
          id: '20',
          name: '石化产业处'
        },
        {
          id: '19',
          name: '食品药品工业处'
        },
        {
          id: '18',
          name: '消费品工业处'
        },
        {
          id: '6',
          name: '信息化和信息产业处'
        },
        {
          id: '16',
          name: '原材料工业处'
        },
        {
          id: '17',
          name: '装备工业处'
        },
        {
          id: '45',
          name: '资源综合利用处'
        },
      ]


    }
  },
  mounted() {
    // this.type = this.$route.query.type
    // this.$route.meta.CName = this.$route.query.noticeName
    this.getNoticeData()
    this.getTreeData()
  },
  methods: {
		// 获取咨询数据
		getNoticeData() {
			this.componentsMoudel.startGet('tbbdfileinfo/list_all?type=' + this.type + 
        '&limit=10' + 
        '&curPage=' + this.currentPage + 
        '&files=' +  this.formData.files +
        '&officeCode=' + this.formData.depId +
        '&fileName=' + this.formData.fileName, {}, false).then((res) => {
				this.newOptions = res.body.data
        this.total = res.body.cum

        // 截取标题前十位有无时间，如果有时间，则去除时间
        // if(this.menuActive == 3) {
				//   this.newOptions.forEach(item => {
        //     console.dir(item)
        //     item.sorce == '工信部' + item.files
        //   })
        // }
				this.newOptions.forEach(item => {
          // 截取时间格式。精确到天
          item.gmtCreate = item.gmtCreate.substring(0, 10)
          if(/^([0-9-]+)$/.test(item.fileName.substring(0,10))) {
            item.fileName = item.fileName.substring(10)
          }
          // if(this.menuActive != '0') {
          //   item.files = ''
          // }
          //   console.dir(item)
				})
    	})
		},

    // 获取左侧菜单行业经济研报下拉列表 
    // 获取左侧菜单政策文件下拉列表
    getTreeData() {
      this.componentsMoudel.startGet('/tbbdfileinfo/getfiles').then(res => {
        this.typeOptions = res.body.data.map(item => {
          return {
            value: item,
            label: item
          }
        })
      })
      // this.componentsMoudel.startGet('/manage/department/getDepList').then(res => {
      //   this.getDepList = res.body.data
      // })
    },

    // 左侧菜单列表点击
    menuSelect(index) {
      this.currentPage = 1
      this.formData.files = ''
      this.formData.fileName = ''
      this.formData.depId = 0
     
      this.type = '6'
      this.menuActive = index
      if(index == 0) {  // 所有
        this.getNoticeData() 
      } else if(index == 111) {  //宏观研报
        this.type = '7'
        this.formData.files = '宏观研报'
        this.getNoticeData() 
      }
    },

    // 行业经济研报下拉列表点击
    menuClick(item){
      this.formData.files = item.value
      this.getNoticeData()
    },

    // 政策文件下拉列表点击
    menuDepClick(item) {
      // if(item.category == 1) {
      //   this.formData.depId = 0
      // } else {
      //   this.formData.depId = item.id
      // }
      this.formData.depId = item.id
      this.type = '3'
      this.getNoticeData()
    },

    // 点击分页
    handleCurrentChange(index) {
      this.currentPage = index
      this.getNoticeData()
    },


		// 点击咨询列表
		noticechange(item) {
			window.open(item.path)
		},

    // 点击搜索
    searchInput() {
      this.getNoticeData()
    },

    // 重置
    cancelClick() {
      this.formData.fileName = ''
      this.formData.files = ''
      this.getNoticeData()
    }
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
  span {
    display: inline-block;
    vertical-align: top;
  }
}
.bbd-name {
  width: calc(100% - 360px);
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}
.bbd-btn {
  margin-left: 10px;
}

.bbd-source {
  width: 190px;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  text-align: right;
}

</style>