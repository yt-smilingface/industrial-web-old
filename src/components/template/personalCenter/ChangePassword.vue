<template>
    <el-row>
        <el-col>
            <div class="user-inform">
                <div class="inform-title">
                    <span>修改密码</span>
                </div>
                <div class="inform-uesrInform">
                    <div style="width: 100%;padding: 22px 31px">
                        <p>
                            账号<span class="uesrInform-span">*</span>  ：
                            <span class="uesrInform-span2">{{ userInfo.username }}</span>
                        </p>
                        <p> 原密码<span class="uesrInform-span">*</span>  ：
                            <el-input class="uesrInform-input2" v-model="personalCenterData.oldPassword" ></el-input>
                        </p>
                        <p> 新密码<span class="uesrInform-span">*</span>  ：
                            <el-input class="uesrInform-input2" v-model="personalCenterData.newPassword" ></el-input>
                        </p>
                        <p> 确认密码<span class="uesrInform-span">*</span>  ：
                            <el-input class="uesrInform-input1" v-model="personalCenterData.confirmPassword" ></el-input>
                        </p>
                    </div>
                    <div style="width: 100%; text-align: center;">
                        <el-button type="primary" @click="saveChanges">保存修改</el-button>
                        <el-button @click="$router.go(-1)">取 &nbsp;&nbsp; 消</el-button>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>

</template>

<script src="../../js/personalCenter/ChangePassword.js" />

<style scoped>
    .user-inform{
        margin: auto;
        width: 1080px;
        /*padding-left: 180px;*/
    }

    .inform-title{
        margin: auto;
        width: 90%;
        margin-top: 98px;
        border-left: 7px solid #0265ba;
        padding-left: 8px;
    }
    .inform-title span{
        font-size: 20px;
        font-weight: 600;
        color: #0265ba;
    }

    .inform-uesrInform{
        margin: auto;
        width: 90%;
        margin-top: 30px;
        min-height: 345px;
        background: #ffffff;
        margin-bottom: 20px;
    }
    .uesrInform-span{
        color: red;
    }
    .uesrInform-span2{
        margin-left: 50px;
    }
    .uesrInform-input1{
        width: 40%;
        margin-left: 21px;
    }
    .uesrInform-input2{
        width: 40%;
        margin-left: 37px;
    }
</style>