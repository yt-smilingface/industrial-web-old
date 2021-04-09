<template>
  <div>
    <div class="signMeg-box-head">
      <span class="signMeg-box-head-span">基本信息</span>
    </div>
    <el-row style="margin: 30px;">
      <el-col :span="8" class="box">
        <div class="name">项目名称</div>
        <div class="info">{{ baseInfo.projectName }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">企业名称</div>
        <div class="info">{{ baseInfo.enterpriseName }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">企业所在地</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.city }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目类型</div>
        <div class="info">{{ baseInfo.projectType }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目所属行业</div>
        <div class="info">{{ baseInfo.belongIndustry }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目性质</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.projectNature }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目开始时间</div>
        <div class="info" >{{ baseInfo.startTime }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目总投资</div>
        <div class="info" >{{ baseInfo.projectInvestment }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">审核状态</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.projectApprovalstatus }}</div>
      </el-col>
    </el-row>
    <div class="signMeg-box-head">
      <span class="signMeg-box-head-span">项目详情</span>
    </div>
   <el-row style="margin: 30px">
      <el-col :span="8" class="box">
        <div class="name">项目进展填报单位</div>
        <div class="info">{{ baseInfo.fillUnit }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">本月进展填报情况</div>
        <div class="info">{{ baseInfo.progressSituation }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">最新进展填报时间</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.progressTime }}</div>
      </el-col>

     <el-col :span="8" class="box">
        <div class="name">企业名称</div>
        <div class="info">{{ baseInfo.enterpriseName }}</div>
      </el-col>
 
      <el-col :span="8" class="box">
        <div class="name">企业所有制性质</div>
        <div class="info">{{ baseInfo.enterpriseNature }}</div>
      </el-col>
      
      <el-col :span="8" class="box">
        <div class="name">是否为上市公司</div>
        <div class="info" style="border-right:  1px solid #797979;">{{ baseInfo.listed==0?'否':'是' }}</div>
      </el-col>

        <el-col :span="8" class="box">
        <div class="name">项目类型</div>
        <div class="info">{{ baseInfo.projectType }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">项目名称</div>
        <div class="info">{{ baseInfo.projectName }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目开始时间</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.startTime }}</div>
      </el-col>


      <el-col :span="8" class="box">
        <div class="name">招商单位</div>
        <div class="info">{{ baseInfo.merchantsUnit }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">投资单位</div>
        <div class="info">{{ baseInfo.investmentUnit }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目结束时间</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.endTime }}</div>
      </el-col>

        <el-col :span="8" class="box">
        <div class="name">项目所属行业</div>
        <div class="info">{{ baseInfo.belongIndustry }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">项目性质</div>
        <div class="info">{{ baseInfo.projectNature }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目基本信息</div>
        <div class="info4" style="border-right:  1px solid #797979 !important;overflow-y: scroll;height:67px;">{{ baseInfo.projectInfo }}</div>
      </el-col>

      <el-col :span="8" class="box">
        <div class="name">项目所在州市</div>
        <div class="info">{{ baseInfo.city }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">项目所在县区</div>
        <div class="info">{{ baseInfo.county }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">项目所在园区</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.park }}</div>
      </el-col>

      <el-col :span="8" class="box">
        <div class="name">项目总投资</div>
        <div class="info">{{ baseInfo.projectInvestment }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">银行贷款</div>
        <div class="info">{{ baseInfo.bankLoan }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">已完成投资</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.completeInvestment }}</div>
      </el-col>

        <el-col :span="8" class="box">
        <div class="name">增加销售收入</div>
        <div class="info">{{ baseInfo.increaseSalesRevenue }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">增加税收</div>
        <div class="info">{{ baseInfo.increaseTax }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">增加就业</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.increaseEmployment }}</div>
      </el-col>

      <el-col :span="12" class="box">
        <div class="name name2">本年度投资计划</div>
        <div class="info info2 setnewInfo" style="border-right:none;">{{ baseInfo.investmentPlan }}</div>
      </el-col>
      <el-col :span="12" class="box">
        <div class="name name2" >本年度已完成投资</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.annualCompleteInvestment }} </div>
      </el-col>

       <el-col :span="8" class="box">
        <div class="name">增加销售收入</div>
        <div class="info">{{ baseInfo.increaseSalesRevenue }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name">增加税收</div>
        <div class="info">{{ baseInfo.increaseTax }}</div>
      </el-col>
      <el-col :span="8" class="box">
        <div class="name">增加就业</div>
        <div class="info" style="border-right:  1px solid #797979 !important;">{{ baseInfo.increaseEmployment }}</div>
      </el-col>
      
      <el-col :span="12" class="box">
        <div class="name name2" >本年度新增销售收入</div>
        <div class="info info2" style="border-right:none;">{{ baseInfo.salesIncome }}</div>
      </el-col>
       <el-col :span="12" class="box">
        <div class="name name2" style="border-right:none;">本年度增加税收</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.yearIncreaseTax }}</div>
      </el-col>


      <el-col :span="8" class="box" style="height:200px;">
        <div class="name">项目核准备案信息</div>
        <div class="info" style="font-size:14px;line-height:20px">
          <span class="info-span"> {{ baseInfo.recordInfo }}
            </span></div>
      </el-col>
        <el-col :span="8" class="box" style="height:200px;">
        <div class="name" >环评批复信息</div>
        <div class="info">{{ baseInfo.replyInfo }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" >项目进展</div>
        <div class="info" style="height:200px;
        display: flex;align-items: center;border-right:none;
        overflow-y: scroll;border-right:1px solid #797979">{{ baseInfo.projectProgress }}</div>
      </el-col>
      

      <el-col :span="8" class="box">
        <div class="name">项目存在的主要问题</div>
        <div class="info">
          <span class="info-span"> {{ baseInfo.projectProblem }}
            </span></div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name" style="font-size:14px">需协调州市部门解决的问题</div>
        <div class="info">{{ baseInfo.citySolveProblem }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" style="font-size:14px">需协调省级部门解决的问题</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.provinceSolveProblem }}</div>
      </el-col>
      

      <el-col :span="8" class="box">
        <div class="name">项目联系人</div>
        <div class="info">
          <span class="info-span"> {{ baseInfo.projectContact }}
            </span></div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">项目联系人电话</div>
        <div class="info">{{ baseInfo.projectPhone }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" >项目联系人手机</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.projectContactTel }}</div>
      </el-col>

       <el-col :span="12" class="box">
        <div class="name name2">责任厅领导</div>
        <div class="info info2">{{ baseInfo.dutyLeadership }}</div>
      </el-col>
       </el-col>
       <el-col :span="12" class="box">
        <div class="name name2" >省工信厅责任处室</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.provinceDutyoffice }}</div>
      </el-col>
       <el-col :span="12" class="box">
        <div class="name name2">省工信厅联系人</div>
        <div class="info info2">{{ baseInfo.provinceContact }}</div>
      </el-col>
        <el-col :span="12" class="box">
        <div class="name name2">省工信厅联系电话</div>
        <div class="info info2" style="border-right: 1px solid #797979 !important;">{{ baseInfo.provincePhone }}</div>
      </el-col>

      <el-col :span="8" class="box">
        <div class="name">州市工信部门责任科室</div>
        <div class="info">
          <span class="info-span"> {{ baseInfo.cityDutydepartment }}
            </span></div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">州市工信部门联系人</div>
        <div class="info">{{ baseInfo.cityContact }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" >州市工信部门联系电话</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.cityPhone }}</div>
      </el-col>

      <el-col :span="8" class="box">
        <div class="name">县区工信部门责任科室</div>
        <div class="info" style="font-size:14px;line-height:20px">
          <span class="info-span"> {{ baseInfo.countyDutydepartment }}
            </span></div>
      </el-col>
        <el-col :span="8" class="box">
        <div class="name">县区工信部门联系人</div>
        <div class="info">{{ baseInfo.countyContact }}</div>
      </el-col>
       <el-col :span="8" class="box">
        <div class="name" >县区工信部门联系电话</div>
        <div class="info" style="border-right: 1px solid #797979 !important;">{{ baseInfo.countyPhone }}</div>
      </el-col>
    </el-row>
   
  </div>
</template>

<script src="../../../../js/moveMonitor/industry/invested/productInfo2.js">
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
.info4 {
  min-height: 67px;
  width: 60%;
  line-height: 30px;
  text-align: center;
  border: 1px solid #797979;
  border-right: none;
  border-top: none;
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