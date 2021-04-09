<template>
  <el-row style="width: 94%; margin: auto">
    <el-col style="position: relative">
      <Plank
        :key="key"
        showBtn
        :slotData="slotData"
        @tabChange="tabChange"
        @clickDownload="clickDownload"
        @checkoutChange="checkoutChange"
      >
        <template v-slot:p0="{ item }">
          <div>
            <TabOne :thisTab="thisTab" :titleName="item.data"></TabOne>
          </div>
        </template>
        <template v-slot:p1="{ item }">
          <div>
            <TabTwo :thisTab="thisTab" :titleName="item.data">
              <template slot-scope="area"> </template>
            </TabTwo>
          </div>
        </template>

        <template v-slot:p2="{ item }">
          <div>
            <TabThree :thisTab="thisTab" :titleName="item.data">
              <template slot-scope="area"> </template>
            </TabThree>
          </div>
        </template>
        <template v-slot:p3="{ item }">
          <div>
            <!-- <NationwideComparedInfo openRank :thisTab="thisTab" :titleName="item.data"></NationwideComparedInfo> -->
            <TabFour>
              <template slot-scope="area"> </template>
            </TabFour>
          </div>
        </template>
      </Plank>
    </el-col>
  </el-row>
</template>

<script src="../../../js/moveMonitor/estate/EstateInfo.js" />

<style>
</style>