<template>
  <el-row>
    <el-col>
      <div style="width: 1280px; margin: auto; margin-top: 50px">
        <div style="width: 100%; float: left; margin-bottom: 20px">
          <div
            :class="
              index % 2 === 0 ? 'data-directory-left' : 'data-directory-right'
            "
            v-for="(itme, index) in DataType"
            :key="index"
          >
            <div class="hgjjtjsj-divs">
              <img
                :class="'hgjjtjsj-image' + index"
                :src="dataDirImg[index]"
                width="74"
                height="78"
                style="margin-top: 20%"
              />
              <div style="text-align: center; margin-top: 40px">
                <span class="tjsj-span" style="">{{ itme.name }}</span>
              </div>
            </div>
            <div style="width: 47%; background: white; padding: 26px 23px">
              <button
                v-for="(itmes, index) in itme.childrens.slice(0, 8)"
                :class="
                  index % 2
                    ? 'el-data-button'
                    : 'el-data-button el-data-button-left'
                "
                @click="dataDirectoryQuery(itme.id, itmes.id)"
              >
                {{ itmes.name.slice(0, 8) }}
              </button>
              <el-button
                v-if="DataType[index].childrens.length >= 8"
                type="primary"
                class="el-data-button-More"
                icon="el-icon-circle-plus"
                @click="dataDirectoryQuery(itme.id)"
                >查看更多</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../../components/js/industrialData/bigData/DataDirectory.js"/>

<style scoped>
/deep/ .el-input__inner {
  height: 30px;
}
.data-directory-left {
  width: 49%;
  margin-right: 2%;
  margin-top: 28px;
  display: flex;
  float: left;
  height: 330px;
}
.data-directory-right {
  width: 49%;
  display: flex;
  margin-top: 28px;
  float: left;
  height: 330px;
}
.hgjjtjsj-divs {
  background: #f3f6f9;
  text-align: center;
  width: 45%;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}

.tjsj-span {
  color: #000000;
  font-size: 20px;
  font-weight: 600;
}
.hgjjtjsj-divs:hover {
  background: #3ca7db;
}
.hgjjtjsj-divs:hover .hgjjtjsj-image0 {
  content: url("../../../../assets/industrialData/bigData/hgjjtjsjb.png");
}
.hgjjtjsj-divs:hover .hgjjtjsj-image1 {
  content: url("../../../../assets/industrialData/bigData/gyjjtjsjb.png");
}
.hgjjtjsj-divs:hover .hgjjtjsj-image2 {
  content: url("../../../../assets/industrialData/bigData/gyhytjsjb.png");
}
.hgjjtjsj-divs:hover .hgjjtjsj-image3 {
  content: url("../../../../assets/industrialData/bigData/ynsqysjb.png");
}

.hgjjtjsj-divs:hover .tjsj-span {
  color: #ffffff;
}

.el-data-button {
  width: 142px;
  min-height: 28px;
  font-size: 15px;
  font-weight: 500;
  color: #0265ba;
  background: #ffffff;
  margin-bottom: 8px;
  border: #0265ba solid 2px;
  border-radius: 5px;
  overflow: hidden;
}
.el-data-button-left {
  margin-right: 5px;
}
.el-data-button:focus {
  outline: -webkit-focus-ring-color auto 0px;
}
.el-data-button:hover {
  background: #1296db;
  color: #ffffff;
  border: #0265ba solid 0px;
}
.el-data-button-More {
  width: 100%;
  margin-top: 40px;
}
</style>