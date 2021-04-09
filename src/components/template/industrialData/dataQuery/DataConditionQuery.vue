<template>
  <el-row>
    <el-col v-if="dataQuerySearch === '' && dataQuerySearchSelect === ''">
      <div style="width: 1280px; margin: 50px auto 10px">
        <div style="display: flex; margin-bottom: 5px">
          <div class="data-query-search" style="width: 75%; display: flex">
            <el-input
              placeholder="请输入企业名称关键字"
              v-model="dataQuerySearchInput"
              class="input-with-select"
            >
              <el-select
                v-model="dataQuerySearchSelect1"
                slot="prepend"
                placeholder="综合"
                style="width: 128px"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                  v-for="(item, index) in selectList"
                ></el-option>
              </el-select>
              <el-button
                class="search-button"
                slot="append"
                icon="el-icon-search"
                @click="handleSelect"
              ></el-button>
            </el-input>
            <button class="buttom-sq" @click="putAwayS">
              <span v-if="putAway">收起筛选</span>
              <span v-else>展开筛选</span>
              <i
                :class="putAway ? 'el-icon-arrow-up' : 'el-icon-arrow-right'"
              ></i>
            </button>
          </div>
        </div>
        <div v-if="putAway" style="background: #ffffff">
          <el-form ref="form" :model="filter" label-width="80px">
            <el-form-item label="注册资本">
              <el-radio-group v-model="filter.capital">
                <el-radio :label="1">0万-100万</el-radio>
                <el-radio :label="2">100万-200万</el-radio>
                <el-radio :label="3">200万-500万</el-radio>
                <el-radio :label="4">500万-1000万</el-radio>
                <el-radio :label="5">1000万以上</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="成立年限">
              <el-radio-group v-model="filter.years">
                <el-radio :label="1">成立1年内</el-radio>
                <el-radio :label="2">成立1 - 5年</el-radio>
                <el-radio :label="3">成立5 - 10年</el-radio>
                <el-radio :label="4">成立10 - 15年</el-radio>
                <el-radio :label="5">成立15年以上</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="经营状态">
              <el-radio-group v-model="filter.status">
                <el-radio :label="1">存续/在营</el-radio>
                <el-radio :label="2">吊销/撤销</el-radio>
                <el-radio :label="3">其他/不明</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="相关信息">
              <el-select
                v-model="filter.information.information1"
                placeholder="全部"
                size="small"
                style="width: 16%; margin-right: 10px"
              >
                <el-option label="有专利" value="1"></el-option>
                <el-option label="无专利" value="0"></el-option>
              </el-select>
              <el-select
                v-model="filter.information.information2"
                placeholder="全部"
                size="small"
                style="width: 16%; margin-right: 10px"
              >
                <el-option label="有失信记录" value="1"></el-option>
                <el-option label="无失信记录" value="0"></el-option>
              </el-select>
              <el-select
                v-model="filter.information.information3"
                placeholder="全部"
                size="small"
                style="width: 16%; margin-right: 10px"
              >
                <el-option label="有商标" value="1"></el-option>
                <el-option label="无商标" value="0"></el-option>
              </el-select>
              <el-select
                v-model="filter.information.information4"
                placeholder="全部"
                size="small"
                style="width: 16%; margin-right: 10px"
              >
                <el-option label="有诉讼" value="1"></el-option>
                <el-option label="无诉讼" value="0"></el-option>
              </el-select>
              <el-select
                v-model="filter.information.information5"
                placeholder="全部"
                size="small"
                style="width: 16%; margin-right: 10px"
              >
                <el-option label="有作品著作权" value="shanghai"></el-option>
                <el-option label="无作品著作权" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <button class="buttom-sq button-sq2" @click="collapseFilterButton1">
              <span v-if="collapseFilter1">收起筛选</span>
              <span v-else>展开筛选</span>
              <i
                :class="
                  collapseFilter1 ? 'el-icon-arrow-up' : 'el-icon-arrow-right'
                "
              ></i>
            </button>
            <el-form-item label="所属地区" style="width: 92%">
              <el-radio-group v-model="filter.area">
                <div>
                  <el-radio
                    :label="item.id"
                    v-for="(item, index) in areaList.slice(0, 10)"
                    :key="index"
                  >
                    {{ item.city }}</el-radio
                  >
                </div>
                <div v-if="collapseFilter1">
                  <el-radio
                    :label="item.id"
                    v-for="(item, index) in areaList.slice(10)"
                    :key="index"
                  >
                    {{ item.city }}</el-radio
                  >
                </div>
              </el-radio-group>
            </el-form-item>
            <button class="buttom-sq button-sq2" @click="collapseFilterButton2">
              <span v-if="collapseFilter2">收起筛选</span>
              <span v-else>展开筛选</span>
              <i
                :class="
                  collapseFilter2 ? 'el-icon-arrow-up' : 'el-icon-arrow-right'
                "
              ></i>
            </button>
            <el-form-item label="所属行业" style="width: 92%">
              <el-radio-group v-model="filter.industry">
                <div>
                  <el-radio
                    :label="item.code"
                    v-for="(item, index) in workList.slice(0, 7)"
                    :key="item.code"
                    >{{ item.category }}</el-radio
                  >
                </div>
                <div v-if="collapseFilter2">
                  <el-radio
                    :label="item.code"
                    v-for="(item, index) in workList.slice(7)"
                    :key="item.code"
                    >{{ item.category }}</el-radio
                  >
                </div>
              </el-radio-group>
            </el-form-item>

            <el-form-item style="text-align: center; padding-bottom: 28px">
              <el-button size="medium" type="primary" @click="handleSelect"
                >查 &nbsp;&nbsp; 询</el-button
              >
              <el-button size="medium" @click="resetForm()"
                >重 &nbsp;&nbsp; 置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
    <el-col v-if="tableDirectoryData.enterpriseIData.length > 0">
      <div style="width: 1280px; margin: auto">
        <div class="enterprise-head">
          <div
            class="enterprise-head-div"
            style="width: 46%; padding-left: 60px"
          >
            名称
          </div>
          <div
            class="enterprise-head-div"
            style="width: 15%; text-align: center"
          >
            注册资本
          </div>
          <div
            class="enterprise-head-div"
            style="width: 22%; text-align: center"
          >
            注册时间
          </div>
          <div
            class="enterprise-head-div"
            style="width: 9%; text-align: center"
          >
            关注
          </div>
        </div>
        <div class="enterprise-information">
          <div
            class="enterprise-informationS"
            @click="enterpriseDetails(itme.bbdQyxxId, itme)"
            v-for="(itme, index) in tableDirectoryData.enterpriseIData"
            :key="index"
          >
            <div style="width: 9%; margin-left: 21px">
              <img
                :src="tableDirectoryData.enterpriseImg"
                style="height: 100px; width: 100px"
              />
            </div>
            <div class="enterprise-data">
              <div class="enterprise-data-name">
                {{ itme.companyName }}
                <div class="enterprise-status">
                  {{ itme.companyEnterpriseStatus }}
                </div>
              </div>
              <div class="enterprise-data-infor">
                <p>
                  统一社会信用代码：<span>{{ itme.creditCode }}</span>
                </p>
                <p>
                  法定代表人:<span>{{ itme.frname }}</span>
                </p>
                <p>
                  地址：<span>{{ itme.address }}</span>
                </p>
              </div>
            </div>
            <div style="width: 19%; text-align: center">
              {{ itme.regcap }}
            </div>
            <!--        注册时间      -->
            <div style="width: 16%; text-align: center">
              {{ itme.esdate }}
            </div>
            <div style="width: 14%; text-align: center">
              <el-button
                v-if="itme.isAttention == 0"
                @click="handleAttention(1, itme.bbdQyxxId)"
                @click.stop
                type="info"
                icon="el-icon-star-off"
                >关注</el-button
              >
              <el-button
                v-else
                @click="handleAttention(0, itme.bbdQyxxId)"
                @click.stop
                type="primary"
                icon="el-icon-star-off"
                >已关注</el-button
              >
            </div>
          </div>
        </div>
        <!--  分页-->
        <div style="width: 95%; margin: auto; text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSize"
            :page-size="cpage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-col>
    <el-col
      v-if="tableDirectoryData.enterpriseIData.length <= 0"
      style="width: 100%"
    >
      <img
        src="../../../../assets/no-info.png"
        style="width: 100%"
        alt=""
        srcset=""
      />
    </el-col>
  </el-row>
</template>

<script src="../../../js/industrialData/dataQuery/DataConditionQuery.js"/>

<style scoped>
/*   去除原点  */
/deep/.el-radio__input {
  display: none;
}
/deep/ .el-form-item {
  margin-bottom: 0px;
}
/deep/ .el-radio-button__inner,
.el-radio-group {
  line-height: inherit;
  padding-top: 4px;
}
.buttom-sq {
  width: 100px;
  border: 0px;
  background: rgba(255, 255, 255, 0);
  margin-left: 10px;
  color: #8f8f8f;
}
.buttom-sq:focus {
  outline: -webkit-focus-ring-color auto 0px;
}
.button-sq2 {
  position: relative;
  left: 90%;
  top: 27px;
}
/*企业列表*/
.enterprise-head {
  height: 35px;
  display: flex;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  margin-bottom: 3px;
}
.enterprise-head-div {
  color: #686868;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  line-height: 35px;
}
.enterprise-information {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.enterprise-informationS {
  height: 120px;
  display: flex;
  padding-top: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid #c4c4c4;
}
.enterprise-data {
  margin-left: 20px;
  width: 38%;
}
.enterprise-data-name {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  color: #000000;
  display: flex;
}
.enterprise-status {
  width: 37px;
  height: 19px;
  background: #ffffff;
  border: 2px solid #0265ba;
  border-radius: 3px;
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 600;
  text-align: center;
  color: #0265ba;
  margin-left: 32px;
  line-height: 19px;
}
.enterprise-data-infor {
  margin-top: 14px;
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 500;
  text-align: left;
  color: #686868;
}
.enterprise-data-infor p {
  margin: 5px;
}
</style>