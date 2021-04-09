<template>
  <div style="width: 100%">
    <div style="display: flex">
      <span class="textTitle" :style="{ fontSize: showFontSize }">{{
        showTitle
      }}</span>
    </div>
    <div style="display: flex; margin: 10px" v-if="this.titleData.model.id > 0">
      <div style="margin: auto auto; display: flex">
        <div style="display: flex">
          <span class="chooseTitle">指标：</span>
          <div>
            <el-select
              v-model="titleConfig[0].couponSelected"
              @change="
                (data) => {
                  chooseChange(data, 0);
                }
              "
              size="mini"
            >
              <el-option
                v-for="item of titleConfig[0].showOption"
                :key="item.id"
                :label="item.dataItem"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div style="display: flex" v-if="this.titleData.model.id > 1">
          <span class="chooseTitle">指标：</span>
          <div>
            <el-select
              v-model="titleConfig[1].couponSelected"
              @change="
                (data) => {
                  chooseChange(data, 1);
                }
              "
              size="mini"
            >
              <el-option
                v-for="item of titleConfig[1].showOption"
                :key="item.id"
                :label="item.dataItem"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div v-if="titleData.model.openTimeChoose">
          <span class="chooseTitle">&nbsp&nbsp时间：</span>
          <el-date-picker
            v-model="startValue"
            size="mini"
            type="month"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="timeChoose"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div v-if="titleData.model.openSort" style="display: flex">
          <img
            @click="sortClick(1)"
            style="width: 12px; height: 16px; margin: auto 0px auto 10px"
            src="../../../../assets/moveMonitor/ascendingSort.png"
          />
          <img
            @click="sortClick(2)"
            style="width: 12px; height: 16px; margin: auto 0px auto 10px"
            src="../../../../assets/moveMonitor/reverseSort.png"
          />
          <img
            @click="sortClick(0)"
            style="width: 16px; height: 16px; margin: auto 0px auto 10px"
            src="../../../../assets/moveMonitor/resetSort.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../../js/moveMonitor/title/TitleMonitor.js" />

<style>
.textTitle {
  font-family: PingFang SC, PingFang SC-Semibold;
  text-align: left;
  color: #087ebe;
  margin: auto auto;
  font-weight: 600;
}
.chooseTitle {
  font-family: PingFang SC, PingFang SC-Light;
  text-align: left;
  color: #000000;
  font-size: 0.5rem;
  margin: auto 0px auto 0px;
}
</style>
