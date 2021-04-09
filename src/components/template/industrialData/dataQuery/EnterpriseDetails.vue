<template >
  <el-row style="background: #ffffff">
    <el-col>
      <div style="width: 1380px; margin: auto; margin-top: 20px; display: flex">
        <div class="enterprise-list">
          <!--         目录           -->
          <div class="enterprise-platform">目录</div>
          <ul style="padding-left: 26px; margin-top: 8px">
            <li>
              <div
                class="enterprise-platform-two jbxx-image"
                @click="returnTop('essential')"
              >
                基本信息
              </div>
              <ul class="enterprise-li-ul">
                <li
                  v-for="(item, key, index) in leftMenu.基本信息"
                  :class="item === 0 ? 'text-color1' : 'text-color2'"
                >
                  {{ key }} &nbsp;&nbsp;<span>{{ item }}</span>
                </li>
              </ul>
            </li>
            <li>
              <div
                class="enterprise-platform-two jbxx-image"
                @click="returnTop('business')"
              >
                经营信息
              </div>
              <ul class="enterprise-li-ul">
                <li
                  v-for="(item, key, index) in leftMenu.经营信息"
                  :class="item === 0 ? 'text-color1' : 'text-color2'"
                >
                  {{ key }} &nbsp;&nbsp;<span>{{ item }}</span>
                </li>
              </ul>
            </li>
            <li>
              <div
                class="enterprise-platform-two jbxx-image"
                @click="returnTop('judicial')"
              >
                司法信息
              </div>
              <ul class="enterprise-li-ul">
                <li
                  v-for="(item, key, index) in leftMenu.司法信息"
                  :class="item === 0 ? 'text-color1' : 'text-color2'"
                >
                  {{ key }} &nbsp;&nbsp;<span>{{ item }}</span>
                </li>
              </ul>
            </li>
            <li>
              <div
                class="enterprise-platform-two jbxx-image"
                @click="returnTop('propertyRight')"
              >
                产权信息
              </div>
              <ul class="enterprise-li-ul">
                <li
                  v-for="(item, key, index) in leftMenu.产权信息"
                  :class="item === 0 ? 'text-color1' : 'text-color2'"
                >
                  {{ key }} &nbsp;&nbsp;<span>{{ item }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="enterprise-info">
          <div class="browse-number">
            <i class="el-icon-view"></i>被浏览{{ enterpriseData.browseNumber }}
          </div>
          <!-- 企业基本信息 -->
          <div class="enterprise-name">
            <div class="enterprise-image">
              <img
                :src="enterpriseData.enterpriseImage"
                style="width: 110px; margin-top: 20px"
              />
            </div>
            <div class="enterprise-names">
              <div class="enterprise-top-name">{{ setinfo.companyName }}</div>
              <div class="enterprise-type">
                <p class="p1">大型企业</p>
                <!--                <p class="p1">上市企业</p>-->
                <p class="p2">黑色金属采矿选业</p>
                <!--                <p class="p2">生物医药和大健康</p>-->
                <p class="p3">规模以上企业</p>
                <p class="p3">重点监测企业</p>
              </div>
              <div style="display: flex">
                <p class="enterprise-injection">
                  {{ setinfo.companyEnterpriseStatus }}
                </p>
                <p class="enterprise-industry">{{ setinfo.industryName }}</p>
              </div>
            </div>
          </div>
          <div class="enterprise-related">
            <div id="essential">
              <div class="enterprise-related-titles">基本信息</div>
              <div>
                <!--工商信息-->
                <div class="enterprise-related-title2">工商信息</div>
                <div
                  class="enterprise-business-info"
                  v-if="leftMenu.businessMessage"
                >
                  <table class="enterprise-business-gsxx">
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">
                        统一社会信用代码
                      </td>
                      <td class="enterprise-business-table2">
                        {{ leftMenu.businessMessage.creditCode }}
                      </td>
                      <td class="enterprise-business-table3">登记状态</td>
                      <td class="enterprise-business-table4">
                        {{ leftMenu.businessMessage.companyEnterpriseStatus }}
                      </td>
                    </tr>
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">法定代表人</td>
                      <td class="enterprise-business-table2">
                        {{ leftMenu.businessMessage.frname }}
                        <!-- <el-button
                          @click=""
                          type="primary"
                          icon="el-icon-search"
                          size="mini"
                          >对外投资任职</el-button
                        > -->
                      </td>
                      <td class="enterprise-business-table3">成立日期</td>
                      <td class="enterprise-business-table4">
                        {{ leftMenu.businessMessage.esdate.substring(0, 11) }}
                      </td>
                    </tr>
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">企业类型</td>
                      <td class="enterprise-business-table2">
                        {{ leftMenu.businessMessage.companyType }}
                      </td>
                      <td class="enterprise-business-table3">核准日期</td>
                      <td class="enterprise-business-table4">
                        {{
                          leftMenu.businessMessage.approvalDate.substring(0, 11)
                        }}
                      </td>
                    </tr>
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">注册资本</td>
                      <td class="enterprise-business-table2">
                        {{ leftMenu.businessMessage.regcap }}
                      </td>
                      <td class="enterprise-business-table3">营业期限自</td>
                      <td class="enterprise-business-table4">
                        {{ leftMenu.businessMessage.openfrom.substring(0, 11) }}
                      </td>
                    </tr>
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">登记机关</td>
                      <td class="enterprise-business-table2">
                        {{ leftMenu.businessMessage.regorg }}
                      </td>
                      <td class="enterprise-business-table3">营业期限至</td>
                      <td class="enterprise-business-table4">
                        {{ leftMenu.businessMessage.opento.substring(0, 11) }}
                      </td>
                    </tr>
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">企业地址</td>
                      <td
                        class="enterprise-business-table2"
                        colspan="3"
                        style="width: 76%"
                      >
                        {{ leftMenu.businessMessage.address }}
                      </td>
                    </tr>
                    <tr style="margin: 0px; padding: 0px">
                      <td class="enterprise-business-table1">经营范围</td>
                      <td
                        class="enterprise-business-table2"
                        colspan="3"
                        style="width: 76%"
                      >
                        {{ leftMenu.businessMessage.operateScope }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <!--风险事件-->
              <div v-if="risEvent.echartsData.series[0].data.lenght > 0">
                <div class="enterprise-related-title2">风险事件</div>
                <div class="enterprise-business-info">
                  <ECharts
                    style="width: 100%; height: 250px"
                    :options="risEvent.echartsData"
                  >
                  </ECharts>
                </div>
              </div>
              <!--股东-->
              <div v-if="shareholder.lenght > 0">
                <div class="enterprise-related-title2">股东</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="shareholder"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="shareholderName"
                      label="姓名"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="paidContribution"
                      label="认缴出资金额"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="fundedRatio"
                      label="认缴出资比例"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="typeOfInvestment"
                      label="认缴出资方式"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!--对外投资-->
              <div v-if="foreignInvestment.length !== 0">
                <div class="enterprise-related-title2">对外投资</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="foreignInvestment"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="foreignInvestEnterprises"
                      label="公司名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="createTime"
                      label="投资日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange22"
                      @current-change="handleCurrentChange22"
                      :current-page="currentPage22"
                      :page-sizes="pageSize"
                      :page-size="cpage22"
                      layout="prev, pager, next, jumper"
                      :total="total22"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--主要人员-->
              <div v-if="mainStaff.length !== 0">
                <div class="enterprise-related-title2">主要人员</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="mainStaff"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column prop="name" label="姓名" align="center">
                      <template slot-scope="scope">
                        <span style="margin-right: 35px">{{
                          scope.row.name
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="position"
                      label="职务"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange23"
                      @current-change="handleCurrentChange23"
                      :current-page="currentPage23"
                      :page-sizes="pageSize"
                      :page-size="cpage23"
                      layout="prev, pager, next, jumper"
                      :total="total23"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--工商变更-->
              <div v-if="businessChange.length !== 0">
                <div class="enterprise-related-title2">工商变更</div>
                <div class="enterprise-business-info business-change-dropDown">
                  <div class="block" style="width: 95%">
                    <el-timeline>
                      <el-timeline-item
                        v-for="(item, index) in businessChange"
                        :timestamp="item.changeItems"
                        placement="top"
                        :key="index"
                        icon="el-icon-time"
                      >
                        <el-card>
                          <p v-if="index !== 0">
                            变更事项：<span>{{
                              businessChange[index].changes
                            }}</span>
                          </p>
                          <p>
                            变更前：
                            <span
                              v-for="(item1, i) in item.beforeChangeVo"
                              :key="i"
                              style="margin-right: 20px"
                            >
                              {{ item1.name }}
                            </span>
                          </p>
                          <p>
                            变更后：<span
                              v-for="(item2, j) in item.afterChangeVo"
                              :key="j"
                              style="margin-right: 15px"
                              >{{ item2.name }}</span
                            >
                          </p>
                        </el-card>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>
              </div>
              <!--分支机构-->
              <div v-if="branchMechanism.length !== 0">
                <div class="enterprise-related-title2">分支机构</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="branchMechanism"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="name"
                      label="公司名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="frname"
                      label="负责人"
                      align="center"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="address" label="地址" align="center">
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="pageSize"
                      :page-size="cpage"
                      layout="prev, pager, next, jumper"
                      :total="total"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div v-if="overseasInvestment.length !== 0">
                <!--海外投资机构-->
                <div class="enterprise-related-title2">海外投资机构</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="overseasInvestment"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="domesticInvestSubject"
                      label="公司名称"
                      width="240px"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="operateScope"
                      label="经营范围"
                      align="center"
                    >
                      <template slot-scope="{ row }">
                        {{ row.operateScope || "--" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="countryRegion"
                      label="国家/地区"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="createTime"
                      label="审核日期"
                      align="center"
                    >
                      <template slot-scope="{ row }">
                        {{ row.createTime || "--" }}
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange2"
                      @current-change="handleCurrentChange2"
                      :current-page="currentPage2"
                      :page-sizes="pageSize"
                      :page-size="cpage2"
                      layout="prev, pager, next, jumper"
                      :total="total2"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--年报-->
              <div v-if="annualReport.length !== 0">
                <div class="enterprise-related-title2">年报</div>
                <div class="enterprise-business-info" style="display: flex">
                  <div
                    v-for="(item, index) in annualReport"
                    :key="index"
                    @click="annualReportDetails(item)"
                    class="annual-Report"
                  >
                    <div class="annual-Report-div">
                      <p class="annual-Report-div-p1" style="">
                        <i class="el-icon-s-data"></i>企业年报
                      </p>
                      <p class="annual-Report-div-p2">
                        {{ item.year }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="business">
              <!--经营信息-->
              <div class="enterprise-related-titles">经营信息</div>
              <!--招标-->
              <div v-if="bidding.length !== 0">
                <div class="enterprise-related-title2">招标</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="bidding"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="title"
                      label="项目名称"
                      width="240px"
                      align="center"
                    >
                      <template slot-scope="{ row }">
                        {{ row.title || "--" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="industry"
                      label="所属行业"
                      align="center"
                    ></el-table-column>
                    <el-table-column prop="city" label="地区" align="center">
                      <template slot-scope="{ row }">
                        {{ row.city || "--" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="pubdate"
                      label="发布日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange3"
                      @current-change="handleCurrentChange3"
                      :current-page="currentPage3"
                      :page-sizes="pageSize"
                      :page-size="cpage3"
                      layout="prev, pager, next, jumper"
                      :total="total3"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--中标-->
              <div v-if="winTheBid.length !== 0">
                <div class="enterprise-related-title2">中标</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="winTheBid"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="projectName"
                      label="项目名称"
                      width="240px"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industry"
                      label="所属行业"
                      align="center"
                    ></el-table-column>
                    <el-table-column prop="city" label="地区" align="center">
                      <template slot-scope="{ row }">
                        {{ row.city || "--" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="pubdate"
                      label="发布日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange4"
                      @current-change="handleCurrentChange4"
                      :current-page="currentPage4"
                      :page-sizes="pageSize"
                      :page-size="cpage4"
                      layout="prev, pager, next, jumper"
                      :total="total4"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--经营异常-->
              <div v-if="businessException.length !== 0">
                <div class="enterprise-related-title2">经营异常</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="businessException"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="busexcepList"
                      label="列入经营异常目录原因"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="rankDate"
                      label="列入日期"
                      align="center"
                      width="120"
                    ></el-table-column>
                    <el-table-column
                      prop="punishOrg"
                      label="作出决定机关"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="punishOrgout"
                      label="移除经营异常目录原因"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="removeDate"
                      label="移除日期"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="restoreOrg"
                      label="作出决定机关"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange5"
                      @current-change="handleCurrentChange5"
                      :current-page="currentPage5"
                      :page-sizes="pageSize"
                      :page-size="cpage5"
                      layout="prev, pager, next, jumper"
                      :total="total5"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--行政处罚-->
              <div v-if="administrativePenalties.length !== 0">
                <div class="enterprise-related-title2">行政处罚</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="administrativePenalties"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="punishCode"
                      label="文书号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="punishFact"
                      label="列入行政处罚目录原因"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="punishBasis"
                      label="处罚依据"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="punishOrg"
                      label="处罚机关"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="punishDate"
                      label="发布日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange6"
                      @current-change="handleCurrentChange6"
                      :current-page="currentPage6"
                      :page-sizes="pageSize"
                      :page-size="cpage6"
                      layout="prev, pager, next, jumper"
                      :total="total6"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--欠税信息-->
              <div v-if="taxDebtInformation.length !== 0">
                <div class="enterprise-related-title2">欠税信息</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="taxDebtInformation"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="taxType"
                      label="欠税税种"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="taxMoney"
                      label="欠税金额"
                      align="center"
                      width="120"
                    ></el-table-column>
                    <el-table-column
                      prop="taxAuthorities"
                      label="税务机关"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="newTaxArrears"
                      label="当前状态"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="announceTime"
                      label="列入日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange7"
                      @current-change="handleCurrentChange7"
                      :current-page="currentPage7"
                      :page-sizes="pageSize"
                      :page-size="cpage7"
                      layout="prev, pager, next, jumper"
                      :total="total7"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--股权冻结-->
              <div v-if="equityFreeze.length !== 0">
                <div class="enterprise-related-title2">股权冻结</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="equityFreeze"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="frodocno"
                      label="冻结文号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="froauth"
                      label="冻结机关"
                      align="center"
                      width="120"
                    ></el-table-column>
                    <el-table-column
                      prop="matter"
                      label="冻结金额"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="froam"
                      label="冻结起始日"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="thaworg"
                      label="解冻机关"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="thawPeriod"
                      label="解冻日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange8"
                      @current-change="handleCurrentChange8"
                      :current-page="currentPage8"
                      :page-sizes="pageSize"
                      :page-size="cpage8"
                      layout="prev, pager, next, jumper"
                      :total="total8"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--股权质押-->
              <div v-if="equityPledge.length !== 0">
                <div class="enterprise-related-title2">股权质押</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="equityPledge"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="morregcno"
                      label="登记编号"
                      align="center"
                      width="170"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="imporg"
                      label="出质人"
                      align="center"
                      width="120"
                    ></el-table-column>
                    <el-table-column
                      prop="pledgee"
                      label="质权人"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="impam"
                      label="出质股权数额"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="impstate"
                      label="状态"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="publicDate"
                      label="发布日期"
                      align="center"
                      width="160"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange9"
                      @current-change="handleCurrentChange9"
                      :current-page="currentPage9"
                      :page-sizes="pageSize"
                      :page-size="cpage9"
                      layout="prev, pager, next, jumper"
                      :total="total9"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--动产抵押-->
              <div v-if="chattelMortgage.length !== 0">
                <div class="enterprise-related-title2">动产抵押</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="chattelMortgage"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="morregcno"
                      label="登记编号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="more"
                      label="抵押权人"
                      align="center"
                      width="120"
                    ></el-table-column>
                    <el-table-column
                      prop="priclasecam"
                      label="被担保主债权金额"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="priclaseckind"
                      label="被担保主债权种类"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="regorg"
                      label="登记机关"
                      align="center"
                    ></el-table-column>
                    <el-table-column prop="mortype" label="状态" align="center">
                    </el-table-column>
                    <el-table-column
                      prop="publicDate"
                      label="发布日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange10"
                      @current-change="handleCurrentChange10"
                      :current-page="currentPage10"
                      :page-sizes="pageSize"
                      :page-size="cpage10"
                      layout="prev, pager, next, jumper"
                      :total="total10"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--招聘-->
              <div>
                <div class="enterprise-related-title2">招聘</div>
                <div
                  class="enterprise-business-info"
                  v-if="
                    recruitmentData.recruitmentEcharts.series[0].data.length > 0
                  "
                >
                  <ECharts
                    style="width: 100%; height: 350px"
                    :options="recruitmentData.recruitmentEcharts"
                  >
                  </ECharts>
                </div>
                <div
                  class="enterprise-business-info"
                  v-if="recruitmentData.salaryEcharts.series[0].data.length > 0"
                >
                  <ECharts
                    style="width: 100%; height: 350px"
                    :options="recruitmentData.salaryEcharts"
                  >
                  </ECharts>
                </div>
                <div
                  class="enterprise-business-info"
                  v-if="recruitmentData.recruitmentTableData.length !== 0"
                >
                  <el-table
                    :data="recruitmentData.recruitmentTableData"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      type="index"
                      label="序号"
                      width="70px"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="jobTitle"
                      label="职位"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="salary" label="薪资" align="center">
                      <template slot-scope="{ row }">
                        {{ row.salary || "--" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="serviceYear"
                      label="工作经验"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="educationRequired"
                      label="学历"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="recruitNumbers"
                      label="招聘人数"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="location"
                      label="工作地点"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="pubdate"
                      label="发布时间"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChangeRecruitment"
                      @current-change="handleCurrentChangeRecruitment"
                      :current-page="currentPageRecruitment"
                      :page-sizes="pageSize"
                      :page-size="cpageRecruitment"
                      layout="prev, pager, next, jumper"
                      :total="totalRecruitment"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>

            <div id="judicial">
              <!--司法信息-->
              <div class="enterprise-related-titles">司法信息</div>
              <!--失信被执行人-->
              <div v-if="dishonestPerson.length !== 0">
                <div class="enterprise-related-title2">失信被执行人</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="dishonestPerson"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="caseCode"
                      label="案号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="dishonestSituation"
                      label="失信被执行人行为具体情形"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="execCourtName"
                      label="执行法院 "
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="pubdate"
                      label="发布日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange11"
                      @current-change="handleCurrentChange11"
                      :current-page="currentPage11"
                      :page-sizes="pageSize"
                      :page-size="cpage11"
                      layout="prev, pager, next, jumper"
                      :total="total11"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--被执行人-->
              <div v-if="executedPerson.length !== 0">
                <div class="enterprise-related-title2">被执行人</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="executedPerson"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="caseCode"
                      label="案号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="executiveStandard"
                      label="执行标准"
                      align="center"
                    >
                      <template slot-scope="{ row }">
                        {{ row.regionS || "--" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="execCourtName"
                      label="执行法院"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="caseState"
                      label="状态"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="registerDate"
                      label="立案日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange12"
                      @current-change="handleCurrentChange12"
                      :current-page="currentPage12"
                      :page-sizes="pageSize"
                      :page-size="cpage12"
                      layout="prev, pager, next, jumper"
                      :total="total12"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--裁判文书-->
              <div v-if="judgement.length !== 0">
                <div class="enterprise-related-title2">裁判文书</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="judgement"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="caseCode"
                      label="案号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="caseType"
                      label="目标公司在案件中的当事人类型"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="title"
                      label="案件标题"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="actionCause"
                      label="案由"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="accuser"
                      label="对方当事人"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="caseResults"
                      label="案件结果"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="sentenceDate"
                      label="判决日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange13"
                      @current-change="handleCurrentChange13"
                      :current-page="currentPage13"
                      :page-sizes="pageSize"
                      :page-size="cpage13"
                      layout="prev, pager, next, jumper"
                      :total="total13"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--开庭公告-->
              <div v-if="openCourtAnnouncement.length !== 0">
                <div class="enterprise-related-title2">开庭公告</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="openCourtAnnouncement"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="caseCode"
                      label="案号"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="litigant"
                      label="当事人"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="actionCause"
                      label="案由"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="court"
                      label="审查法院"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="trialDate"
                      label="开庭日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange14"
                      @current-change="handleCurrentChange14"
                      :current-page="currentPage14"
                      :page-sizes="pageSize"
                      :page-size="cpage14"
                      layout="prev, pager, next, jumper"
                      :total="total14"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--法院公告-->
              <div v-if="courtAnnouncement.length !== 0">
                <!--法院公告-->
                <div class="enterprise-related-title2">法院公告</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="courtAnnouncement"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="noticeContent"
                      label="公告内容"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="noticeType"
                      label="公告类型"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="noticePeople"
                      label="公告人"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="noticeTime"
                      label="公告日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange15"
                      @current-change="handleCurrentChange15"
                      :current-page="currentPage15"
                      :page-sizes="pageSize"
                      :page-size="cpage15"
                      layout="prev, pager, next, jumper"
                      :total="total15"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--司法拍卖-->
              <div v-if="judicialAuction.length !== 0">
                <div class="enterprise-related-title2">司法拍卖</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="judicialAuction"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="id"
                      label="序号"
                      width="70"
                    ></el-table-column>
                    <el-table-column prop="title" label="标题" align="center">
                    </el-table-column>
                    <el-table-column
                      prop="startPrice"
                      label="起拍价"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="auctionCourt"
                      label="拍卖法院"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="disposalBasis"
                      label="处罚依据"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="auctionDate"
                      label="拍卖日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange16"
                      @current-change="handleCurrentChange16"
                      :current-page="currentPage16"
                      :page-sizes="pageSize"
                      :page-size="cpage16"
                      layout="prev, pager, next, jumper"
                      :total="total16"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>

            <div id="propertyRight">
              <!--产权信息-->
              <div class="enterprise-related-titles">产权信息</div>
              <!--专利-->
              <div v-if="patent.length !== 0">
                <div class="enterprise-related-title2">专利</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="patent"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column prop="title" label="名称" align="center">
                    </el-table-column>
                    <el-table-column
                      prop="publicCode"
                      label="公开号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="patentType"
                      label="专利类型 "
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="inventor"
                      label="发明人"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="publidate"
                      label="公告日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange17"
                      @current-change="handleCurrentChange17"
                      :current-page="currentPage17"
                      :page-sizes="pageSize"
                      :page-size="cpage17"
                      layout="prev, pager, next, jumper"
                      :total="total17"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--软件著作权-->
              <div v-if="softwareCopyright.length !== 0">
                <div class="enterprise-related-title2">软件著作权</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="softwareCopyright"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="softFullName"
                      label="名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="regnum"
                      label="登记号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="classCode"
                      label="分类号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="versionNum"
                      label="版本号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="regdate"
                      label="登记日期"
                      align="center"
                    >
                    </el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange18"
                      @current-change="handleCurrentChange18"
                      :current-page="currentPage18"
                      :page-sizes="pageSize"
                      :page-size="cpage18"
                      layout="prev, pager, next, jumper"
                      :total="total18"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--商标-->
              <div v-if="trademarkData.length !== 0">
                <div class="enterprise-related-title2">商标</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="trademarkData"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="brandImage"
                      label="商标"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <img
                          :src="'data:image/jpg;base64,' + scope.row.brandImage"
                          width="95%"
                          height="40"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="brandName"
                      label="名称"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="applicationNo"
                      label="注册号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="classNo"
                      label="类别"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="applicationDate"
                      label="申请日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange19"
                      @current-change="handleCurrentChange19"
                      :current-page="currentPage19"
                      :page-sizes="pageSize"
                      :page-size="cpage19"
                      layout="prev, pager, next, jumper"
                      :total="total19"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--作品著作权-->
              <div v-if="workCopyright.length !== 0">
                <div class="enterprise-related-title2">作品著作权</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="workCopyright"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="productionName"
                      label="名称"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="regnum"
                      label="登记号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="productionCategory"
                      label="类别"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="creationCompletionDate"
                      label="创作完成日期"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="regdate"
                      label="登记日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange20"
                      @current-change="handleCurrentChange20"
                      :current-page="currentPage20"
                      :page-sizes="pageSize"
                      :page-size="cpage20"
                      layout="prev, pager, next, jumper"
                      :total="total20"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--域名备案-->
              <div v-if="domainRegistration.length !== 0">
                <div class="enterprise-related-title2">域名备案</div>
                <div class="enterprise-business-info">
                  <el-table
                    :data="domainRegistration"
                    style="width: 95%; margin: auto"
                    border
                  >
                    <el-table-column
                      prop="homepageUrl"
                      label="网址"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="websiteName"
                      label="网站名称"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="siteCertificateNo"
                      label="网站备案/许可证号"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="approvalTime"
                      label="登记日期"
                      align="center"
                    ></el-table-column>
                  </el-table>
                  <div style="width: 95%; margin: auto; text-align: right">
                    <el-pagination
                      @size-change="handleSizeChange21"
                      @current-change="handleCurrentChange21"
                      :current-page="currentPage21"
                      :page-sizes="pageSize"
                      :page-size="cpage21"
                      layout="prev, pager, next, jumper"
                      :total="total21"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script src="../../../js/industrialData/dataQuery/EnterpriseDetails.js" >
</script>

<style scoped>
* {
  font-family: PingFang SC, PingFang SC-Regular;
}
/*目录*/
li {
  list-style: none;
}
.enterprise-list {
  width: 22%;
  height: 100%;
  max-height: 530px;
  overflow: auto;
  margin-right: 2%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  padding-top: 12px;
}
.enterprise-platform {
  border-left: 4px solid #0265ba;
  font-size: 17px;
  font-weight: 600;
  padding-left: 20px;
  color: #000000;
}
.enterprise-platform-two {
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
.jbxx-image {
  background-image: url("../../../../assets/industrialData/dataQuery/jibenxq.png");
  background-repeat: no-repeat;
  padding-left: 23px;
  background-position: 0% center;
}
.jyxx-image {
  background-image: url("../../../../assets/industrialData/dataQuery/jingyingxx.png");
  background-repeat: no-repeat;
  padding-left: 23px;
}
.sfxx-image {
  background-image: url("../../../../assets/industrialData/dataQuery/sfxx.png");
  background-repeat: no-repeat;
  padding-left: 23px;
}
.cqxx-image {
  background-image: url("../../../../assets/industrialData/dataQuery/cqxx.png");
  background-size: 8% 90%;
  background-repeat: no-repeat;
  padding-left: 23px;
}
.enterprise-li-ul {
  padding-left: 24px;
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  color: #000000;
}
.enterprise-li-ul li {
  margin-top: 6px;
}
.enterprise-li-ul li span {
  font-size: 14px;
  font-weight: 400;
}
.dataLength {
  color: #a1a1a1;
}
/*信息*/
.enterprise-info {
  width: 70%;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
}
.enterprise-name {
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 14px;
  min-height: 160px;
  display: flex;
}
.browse-number {
  margin-left: 20px;
  min-height: 40px;
  font-size: 18px;
  color: #b8c1cc;
  border-bottom: 1px solid #f6f7fa;
}
.enterprise-image {
  height: 100%;
  margin-left: 18px;
  margin-right: 20px;
  text-align: center;
}
.enterprise-names {
  height: 110px;
  margin-top: 20px;
}
.enterprise-top-name {
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  color: #000000;
}
.enterprise-type {
  display: flex;
}
.enterprise-type p {
  height: 18px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  padding: 3px;
  margin-right: 8px;
}
.enterprise-type .p1 {
  background: #0091ff;
}
.enterprise-type .p2 {
  background: #0bdcb1;
}
.enterprise-type .p3 {
  background: #ff9810;
}
.enterprise-injection {
  background-image: url("../../../../assets/industrialData/dataQuery/zhuangtai.png");
  background-repeat: no-repeat;
  padding-left: 23px;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #0265ba;
  margin-right: 15px;
  padding-left: 20px;
}
.enterprise-industry {
  background-image: url("../../../../assets/industrialData/dataQuery/hytype.png");
  background-repeat: no-repeat;
  padding-left: 23px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #000000;
  padding-left: 20px;
}
/*信息bottom*/
.enterprise-related {
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  margin-bottom: 100px;
}
/*工商信息*/
.enterprise-related-title2 {
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: #000000;
  line-height: 26px;
  border-left: 3px solid #0265ba;
  padding-left: 24px;
  margin-top: 20px;
}
.enterprise-business-info {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 15px;
}
table {
  border-spacing: 0px;
}
table td {
  height: 38px;
  border: 1px solid #cfcfcf;
  text-align: center;
  font-size: 12px;
}
.enterprise-business-table1 {
  width: 24%;
  background: #f5f8ff;
}
.enterprise-business-table2 {
  width: 36%;
  text-align: left;
  padding-left: 20px;
}
.enterprise-business-table3 {
  width: 20%;
  background: #f5f8ff;
}
.enterprise-business-table4 {
  width: 20%;
  text-align: left;
  padding-left: 20px;
}

.el-card__body {
  padding: 0px 20px;
}
.el-timeline-item__timestamp {
  color: #4f71bb;
  line-height: 1;
  font-size: 26px;
}

.business-change-dropDown {
  height: 550px;
  overflow: auto;
}
.block .el-timeline-item__timestamp {
  font-size: 18px !important;
}
.enterprise-related-titles {
  font-weight: 600;
  color: #000000;
  margin-top: 28px;
  margin-left: 26px;
}
.enterprise-business-gsxx {
  border: 1px solid #cfcfcf;
  margin-top: 18px;
  width: 93%;
  margin: auto;
}
.text-color1 {
  color: #dddccc;
}
.text-color2 {
  color: #000000;
}
/* 年报 */
.annual-Report {
  margin-left: 15px;
  margin-right: 10px;
  background: #527bb1;
  width: 160px;
  height: 100px;
}
.annual-Report-div {
  height: 84%;
  margin-left: 10px;
  border-left: 3px solid #7e9cc4;
  padding-top: 10%;
}
.annual-Report-div-p1 {
  margin: 0px 10px 0px;
  color: #ffffff;
}
.annual-Report-div-p2 {
  color: #ffffff;
  font-size: 22px;
  margin-left: 40px;
  border-bottom: 2px solid #7e9cc4;
}
</style>