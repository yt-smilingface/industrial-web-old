<template>
  <div>

    <div class="signMeg-box-head">
      <span class="signMeg-box-head-span">基本信息</span>
    </div>
    <el-row style="margin: 30px;">
      <el-col :span="8" class="box">
        <div class="name">专项名称</div>
        <div class="info">{{ baseInfo.name }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">企业名称</div>
        <div class="info">{{ baseInfo.companyName }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">企业所在地</div>
        <div class="info" style="border-right:  1px solid #797979;">{{ baseInfo.projectAddress }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">申报方向</div>
        <div class="info">{{ baseInfo.reportingDirection }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">企业统一信用代码</div>
        <div class="info">{{ baseInfo.orgCreditCode }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">所属行业</div>
        <div class="info" style="border-right:  1px solid #797979;">{{ baseInfo.industryType }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2">审核状态</div>
        <div class="info info2">{{ baseInfo.reviewStatus }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2">项目总投资</div>
        <div class="info info2" style="border-right:  1px solid #797979;">{{ baseInfo.totalInvestment }}</div>
      </el-col>
    </el-row>
    <div class="signMeg-box-head">
      <span class="signMeg-box-head-span">项目详情</span>
    </div>

    <el-row style="margin: 30px">
      <el-col :span="8" class="box">
        <div class="name">专项名称</div>
        <div class="info">{{ baseInfo.name }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">申报方向</div>
        <div class="info">{{ baseInfo.reportingDirection }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name name2">审核状态</div>
        <div class="info info2" style="border-right:  1px solid #797979;">{{ baseInfo.reviewStatus }}</div>
      </el-col>

     <el-col :span="8" class="box">
        <div class="name">企业名称</div>
        <div class="info">{{ baseInfo.companyName }}</div>
      </el-col>
 
      <el-col :span="8" class="box">
        <div class="name">企业统一信用代码</div>
        <div class="info">{{ baseInfo.orgCreditCode }}</div>
      </el-col>
      
      <el-col :span="8" class="box">
        <div class="name">企业所在地</div>
        <div class="info" style="border-right:  1px solid #797979;">{{ baseInfo.projectAddress }}</div>
      </el-col>

        <el-col :span="8" class="box">
        <div class="name">公司类型</div>
        <div class="info">{{ baseInfo.industryType }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">企业规模</div>
        <div class="info">{{ baseInfo.industryType }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">所属行业</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.industryType }}</div>
      </el-col>

      <el-col :span="12" class="box">
        <div class="name name2">法人联系方式</div>
        <div class="info info2 setnewInfo" style="border-right:none;">{{ baseInfo.frnameContact }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2" >联系人</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.contacts }} </div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2" >是否列入全国疫情防控重点保障企业名单</div>
        <div class="info info2" style="border-right:none;">{{ baseInfo.qgyqProtected }}</div>
      </el-col>
       <el-col :span="12" class="box">
        <div class="name name2" style="border-right:none;">是否列入省工信厅疫情防控物资重点保供企业名单</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.sgxtProtected }}</div>
      </el-col>
       <el-col :span="12" class="box">
        <div class="name name2">是否在疫情防控期间捐赠物资或现金</div>
        <div class="info info2">{{ baseInfo.isDonate }}</div>
      </el-col>
       </el-col>
       <el-col :span="12" class="box">
        <div class="name name2" >捐赠金额</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.donationAmount }}</div>
      </el-col>
       <el-col :span="12" class="box">
        <div class="name name2">近三年项目业主是否发生过安全、污染、质量事故</div>
        <div class="info info2">{{ baseInfo.isAccident }}</div>
      </el-col>
        <el-col :span="12" class="box">
        <div class="name name2">情况说明</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.description }}</div>
      </el-col>

      <el-col :span="8" class="box">
        <div class="name">项目名称</div>
        <div class="info" style="font-size:14px;line-height:20px">
          <span class="info-span"> {{ baseInfo.projectName }}
            </span></div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">项目所在地</div>
        <div class="info">{{ baseInfo.projectAddress }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" >所在园区</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.parkLocation }}</div>
      </el-col>


      <el-col :span="8" class="box">
        <div class="name">核准/备案号</div>
        <div class="info">{{ baseInfo.recordNum }}</div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">土地批复号</div>
        <div class="info">{{ baseInfo.landReplyNum }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">环评批复号</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.eiaNum }}</div>
      </el-col>

      <el-col :span="12" class="box">
        <div class="name name2">是否列入省工信厅100项复工项目</div>
        <div class="info info2">{{ baseInfo.isHundredProject }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2">用地面积（亩）</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.areaCovered}}</div>
      </el-col>


      <el-col :span="8" class="box">
        <div class="name">实际开工日期</div>
        <div class="info">{{ baseInfo.actualStartTime }}</div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">计划竣工日期</div>
        <div class="info">{{ baseInfo.plannedCompletionTime
 }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">项目形象进度（%）</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.projectSchedule }}</div>
      </el-col>

       <el-col :span="8" class="box">
        <div class="name">预计投资回收期（年）</div>
        <div class="info">{{ baseInfo.paybackPeriod }}</div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">项目总投资</div>
        <div class="info">{{ baseInfo.totalInvestment }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">项目类型</div>
        <div class="info" style=" border-right: 1px solid #797979 !important;">{{ baseInfo.projectType }}</div>
      </el-col>

       <el-col :span="8" class="box">
        <div class="name">自筹资金</div>
        <div class="info">{{ baseInfo.selfFinancing }}</div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">银行贷款</div>
        <div class="info">{{ baseInfo.bankLoan }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" >已到位资金</div>
        <div class="info" style=" border-right: 1px solid #797979 !important;">{{ baseInfo.funds }}</div>
      </el-col>

       <el-col :span="8" class="box">
        <div class="name">累计完成投资</div>
        <div class="info">{{ baseInfo.endInvestment }}</div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">年度计划投资</div>
        <div class="info">{{ baseInfo.yearInvestment }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">年度累计投资</div>
        <div class="info" style=" border-right: 1px solid #797979 !important;">{{ baseInfo.yearTotalInvestment }}</div>
      </el-col>

      <el-col :span="12" class="box">
        <div class="name name2">新增产值</div>
        <div class="info info2">{{ baseInfo.addProductive }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2">新增销售收入</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.saleProceeds }}</div>
      </el-col>

      <el-col :span="8" class="box">
        <div class="name">新增利润</div>
        <div class="info">{{ baseInfo.addProfit }}</div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">新增税收</div>
        <div class="info">{{ baseInfo.addTaxes }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">新增就业人数</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.addEmployment }}</div>
      </el-col>

       <el-col :span="12" class="box">
        <div class="name name2">申请补助金额（万元）</div>
        <div class="info info2">{{ baseInfo.grants }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2">占总投资比例</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.percentage }}</div>
      </el-col>
      <div class="setbox-info">
      <el-col :span="8" class="box" style="border-right: 1px solid #797979 !important;">
  
        <div class="name3" style="height:800px;overflow-y: scroll;border-right:  1px solid #797979;">申报项目简介</div>
        <div class="info3" style="height:800px;overflow-y: scroll;">{{ baseInfo.briefing }}</div>
      </el-col>
     
        <el-col :span="8" class="box">
        <div class="name3" style="height:800px;overflow-y: scroll;border-right:  1px solid #797979;">经济效益</div>
        <div class="info3" style="height:800px;overflow-y: scroll;
        display: flex;align-items: center;border-right:  1px solid #797979;">{{ baseInfo.environmental }}</div>
      </el-col>
       <el-col :span="8" class="box" style="height:100%;">
        <div class="name3" style="height:800px;overflow-y: scroll;border-right:  1px solid #797979;">环境效益</div>
        <div class="info3" style="height:800px;
        display: flex;align-items: center;border-right:none;
        overflow-y: scroll;">{{ baseInfo.economy }}</div>
      </el-col>
</div>
    </el-row>
  </div>
</template>

<script src="../../../../js/moveMonitor/industry/invested/productInfo.js">
</script>

<style>
.box {
  display: flex;
  background: #fff;
}

.box:nth-child(1) .info,
.box:nth-child(1) .name,
.box:nth-child(2) .info,
.box:nth-child(2) .name,
.box:nth-child(3) .info,
.box:nth-child(3) .name {
  border-top: 1px solid #797979;
}
.name {
  min-height: 67px;
  width: 40%;
  text-align: center;
  line-height: 67px;
  border: 1px solid #797979;
  border-right: none;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.name3 {
  min-height: 67px;
  width: 40%;
  text-align: center;
  line-height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name2 {
  line-height: 30px !important;

  width: 26.6% !important;
}
.info2 {
  border-right: 1px solid #797979;
  width: 73.4% !important;
}
.info {
  min-height: 67px;
  width: 60%;
  line-height: 30px;
  text-align: center;
  border: 1px solid #797979;
  border-right: none;
  border-top: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info3 {
  min-height: 67px;
  width: 60%;
  line-height: 30px;
  text-align: center;
}

.info-span {
  text-indent: 2rem;
}

.setbox-info {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #797979;
  border-top: 0;
  display: flex;
  align-items: center;
}

.myline {
  height: 200px;
  width: 10px;
  background-color: #797979;
}
</style>