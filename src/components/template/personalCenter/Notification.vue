<template>
    <el-row>
        <el-col>
            <div class="user-inform">
                <div class="inform-title">
                    <span>消息通知</span>
                </div>
                <div class="inform-uesrInform">
                    <p class="inform-uesrInform-p" v-for="(itme,index) in notificationData" :key="index">
                        <span style="color: red;">●</span>
                        <span>【{{itme.type}}】{{itme.title}}</span>
                        <span style="float: right;">{{itme.date}}</span>
                    </p>
                </div>
            </div>
        </el-col>
    </el-row>

</template>

<script src="../../js/personalCenter/Notification.js" />

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
        padding: 17px 31px;
        min-height: 345px;
        background: #ffffff;
        margin-bottom: 20px;
    }
    .inform-uesrInform-p{
        font-size: 20px;
        font-weight: 500;
    }
</style>
<!--<template>-->
<!--    -->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Notification"-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->