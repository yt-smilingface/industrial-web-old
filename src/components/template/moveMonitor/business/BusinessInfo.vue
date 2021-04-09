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
            <!-- {{ getTabOne(thisTab, item.data) }} -->
          </div>
        </template>
        <template v-slot:p1="{ item }">
          <div>
            <TabTwo :thisTab="thisTab" :titleName="item.data">
              <template v-slot:area="{ areaItem }">
                <div>
                  <!-- {{
                      areaItem.data.cityName
                    }}计算机、通信和其他电子设备制造业共{{
                      areaItem.data.value
                    }}家 ,其中规模以上企业共{{
                      areaItem.data.value2
                    }}家，-->
                  <!-- {{ areaItem.data.length }} -->
                  <span style="font-size: 13px; margin-top: 10px">
                    <!-- 企业名单如下: -->
                    {{ areaItem.areaName }} {{ $route.query.name }}企业共
                    {{ areaItem.data.length }}
                    个，部分企业名单如下：
                  </span>
                  <el-table
                    :data="areaItem.data"
                    height="250"
                    border
                    style="width: 100%"
                  >
                    <el-table-column prop="companyName" label="企业名称">
                    </el-table-column>
                    <el-table-column prop="creditCode" label="统一社会信用代码">
                    </el-table-column>
                    <el-table-column prop="frname" label="法定代表人">
                    </el-table-column>
                    <el-table-column prop="realcapAmount" label="注册资本">
                    </el-table-column>
                    <el-table-column prop="esdate" label="注册时间">
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </TabTwo>
          </div>
        </template>
        <template v-slot:p2="{ item }">
          <div>
            <TabFour />
          </div>
        </template>
      </Plank>
    </el-col>
  </el-row>
</template>

<script src="../../../js/moveMonitor/business/BusinessInfo.js" />

<style>
</style>