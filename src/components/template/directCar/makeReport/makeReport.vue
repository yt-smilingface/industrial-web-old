<template>
  <div class="report-box clearfix">
    <div class="reportbox-left">
      <ul class="reportbox-ul">
        <div class="ul-title">企业直报</div>
        <li
          @click="handleActive(index, item.url)"
          v-for="(item, index) in slotData"
          :class="isActive == index ? 'active' : ''"
        >
          {{ item.directoryName }}
        </li>
      </ul>
    </div>
    <div class="reportbox-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script src="../../../js/directCar/makeReport/makeReport"/>


<style scoped>
.report-box {
  margin-top: 30px;
}
.reportbox-left {
  float: left;
  width: 20%;
  position: relative;
}
.reportbox-right {
  float: left;
  width: 80%;
}
.reportbox-ul {
  width: 80%;
  margin-left: 40px;
  background-color: #fff;
  box-shadow: 3px 3px 3px 3px #eee;
  border-radius: 10px 10px 10px 10px;
  padding-left: 0px !important;
  padding-bottom: 10px;
}
.ul-title {
  height: 40px;
  /* background: linear-gradient(
    180deg,
    #3ab3e8,
    #239bd0 50%,
    #2ba6dc 50%,
    #7bd1ff 94%,
    #7bd1ff
  ); */
  background-color: #0265ba;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-weight: 500;
}

.reportbox-ul li {
  list-style: none;
  text-align: center;
  line-height: 40px;
  margin: 15px 0;
}
.reportbox-ul li.active {
  background: linear-gradient(90deg, #0265ba 38%, rgba(255, 255, 255, 0.28));
  color: #fff;
}

.reportbox-ul li:hover {
  cursor: pointer;
}

.reportbox-right {
  margin-top: 20px;
  width: 80%;
  float: left;
}

.clearfix:after {
  content: ""; /*内容设置为空！！！*/
  display: block; /*显示为块级元素！！！*/
  height: 0;
  visibility: hidden;
  clear: both; /*清除浮动！！！*/
}
</style>