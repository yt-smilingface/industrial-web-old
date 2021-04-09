<template>
  <div class="bbd-interact-list">
    <!-- <el-button type="primary" @click="$router.push({path: '/interact'})">我要反馈</el-button> -->
    <div class="bbd-interact-item">
      <div class="bbd-name">{{interactInfo.info.title}}</div>
      <div class="bbd-type">{{interactInfo.info.category}}</div>
      <div class="bbd-type">{{interactInfo.commissioner}}</div>
      <div style="font-size: 12px;margin-top:6px; color: #aaa;">{{interactInfo.info.messageTime}}</div>
      <div class="bbd-comment">
        {{interactInfo.info.content}}
        <el-link v-if="interactInfo.isContentLink" type="primary" @click="contentLinkClick">{{interactInfo.contentBtnText}}</el-link>
        <el-link v-if="interactInfo.messageList.length == 0" type="primary" @click="replyTextareaClick">回复</el-link>
      </div>
      <div class="bbd-reply" v-for="(item, index) in interactInfo.messageList" :key="index">
        <span style="margin-right: 10px;">{{item.name}}:</span>
        <span style="margin-right: 10px;">{{item.context}}</span>
        <el-link v-if="item.isContentLink" type="primary" @click="replyContetntLinkClick(item)">{{item.contentBtnText}}</el-link>
        <el-link v-if="item.isReplyLink" type="primary" @click="replyTextareaClick">回复</el-link>
      </div>
      <div v-show="isReplyTextarea">
        <el-input type="textarea" :rows="4" placeholder="请输入内容，最多输入500字" 
          style="margin: 20px 0;" show-word-limit
          :maxlength="500" v-model="textareaReply"></el-input>
        <el-button type="primary" @click="saveClick">发表</el-button>
        <el-button @click="replyTextareaClick">取消</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      interactInfo: {
        isContentLink: false,
        contentBtnText: '展开',
        contentAll: '',
        commissioner: '',
        info: {},
        messageList: []
      },
      isReplyTextarea: false,
      textareaReply: ''
    }
  },
  mounted() {
    this.interactInfo.info = this.$route.params.row

    console.dir(this.interactInfo)
    this.getInteractData()
  },
  methods: {
    // 获取通信信息
    getInteractData() {
      // 获取路由传过来的信息
      this.interactInfo.info.department.forEach(item => {
        if(this.userInfo.depName == item) {
          this.interactInfo.commissioner = item
        }
      })
      
      this.interactInfo.contentAll = this.interactInfo.info.content
      if(this.interactInfo.info.content.length > 250) {
        this.interactInfo.info.content = this.interactInfo.contentAll.slice(0, 250) + '......'
        this.interactInfo.isContentLink = true
      }

      // messageId=139
      this.componentsMoudel.startGet('messagereply/list_all?messageId=' + this.interactInfo.info.id, {}, false).then((res) => {
        this.interactInfo.messageList = res.body.data
        this.interactInfo.messageList.forEach(reply => {
          Vue.set(reply, 'isContentLink', false)
          Vue.set(reply, 'isReplyLink', false)
          Vue.set(reply, 'contentBtnText', '展开')
          if(reply.source == '01') {
            reply.name = this.interactInfo.commissioner
          } else {
            reply.name = reply.enterpriseName
          }

          // 回复消息字数超过50个时截取
          reply.contentAll = reply.context
          if(reply.context.length > 50) {
            reply.context = reply.context.slice(0, 50) + '......'
            reply.isContentLink = true
          }
          // 如果最后一个回复是他人回复，显示回复按钮
          // if(reply[this.interactInfo.messageList.length - 1].type == '01') {
          //   this.interactInfo.messageList[this.interactInfo.messageList.length - 1].isReplyLink = true
          // }
          console.dir(this.interactInfo.messageList[this.interactInfo.messageList.length - 1])
          this.interactInfo.messageList[this.interactInfo.messageList.length - 1].isReplyLink = true
        })
      });
    },

    // 展开收缩内容
    contentLinkClick() {
      let interactInfo = this.interactInfo
      if(interactInfo.contentBtnText == '展开') {
        interactInfo.contentBtnText = '收起'
        interactInfo.info.content = interactInfo.contentAll
      } else {
        interactInfo.contentBtnText = '展开'
        interactInfo.info.content = interactInfo.contentAll.slice(0, 250) + '......'
      }
    },

    // 展开收缩回复
    replyTextareaClick() {
      this.isReplyTextarea = !this.isReplyTextarea
    },

    // 展开收缩相互回复消息
    replyContetntLinkClick(reply) {
      if(reply.contentBtnText == '展开') {
        reply.contentBtnText = '收起'
        reply.content = reply.contentAll
      } else {
        reply.contentBtnText = '展开'
        reply.content = reply.content.slice(0, 50)
      }
    },

    // 发表
    saveClick() {  
      let params = {
        userId: this.userInfo.depId,
        messageId: this.interactInfo.info.id,
        context: this.textareaReply,
        source: '01'
      }
      this.componentsMoudel.startPost('messagereply/save', params, false).then((res) => {
        if(res.body.status_code == 100) {
          this.$message({
            message: '发表成功',
            type: 'success'
          });
          this.$router.go(-1)
        }
      });

    }


  }
}
</script>

<style scoped>
.bbd-interact-list {
  margin: 0 auto;
  width: 1300px;
  padding: 20px;
  background-color: #fff;
}
.bbd-interact-item {
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.bbd-interact-item:nth-last-child(1) {
  border-bottom: none;
}
.bbd-name {
  font-size: 18px;
  font-weight: bolder;
}
.bbd-type {
  margin-top: 10px;
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  font-size: 14px;
  color: #409eff;
}
.bbd-comment {
  margin-top: 10px;
  text-indent: 2rem;
  color: #666;
}
.bbd-comment .el-link {
  text-indent: 0;
}
.bbd-reply {
  margin-top: 6px;
}
.el-link {
  margin-left: 20px;
}

</style>