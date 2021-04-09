import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'FillAuditDetails';
root.components = {}

root.data = {
    formIndex: '',
    selectData: {
        id: '',
        reviewStatus: '',
        reviewOpinion: '',
    },
    tableData: {
        fillRelatedVo: {
            companyName: '',
            dynamicFill: [],
        },
    },
    dataDirectoryId: '',
    //选择框
    isPassOptions: [{
        value: 2,
        label: '不通过'
    }, {
        value: 3,
        label: '通过'
    }],

}
root.methods = {
    getCheckInfo() {
        let that = this;
        that.componentsMoudel.startGet('governmentfill/getCheckInfo/' + that.selectData.id, false).then(res => {
            that.tableData = res.body.data;
            that.tableData.contentJson = JSON.parse(res.body.data.contentJson);
            that.tableData.fillRelatedVo.dynamicFill = JSON.parse(res.body.data.fillRelatedVo.dynamicFill);


            if (that.formIndex === '2') {
                that.selectData.reviewStatus = res.body.data.fillRelatedVo.reviewStatus;
                that.selectData.reviewOpinion = res.body.data.fillRelatedVo.reviewOpinion;
            }

            console.log(that.tableData);

        })
    },
    //提交审核意见
    submitAuditOpinion() {
        let that = this;
        let data = that.selectData;
        that.componentsMoudel.startPost('governmentfill/checkStatus', data, false).then(res => {
            if (res.body.status_code === 100) {
                that.$message.success(res.body.msg);
                that.cancelAuditOpinion();
            } else {
                that.$message.error(res.body.msg);
            }
        })
    },
    //    取消审核
    cancelAuditOpinion() {
        this.$router.go(-1)
    }




}

root.mounted = function () {
    this.selectData.id = this.$route.query.id;
    this.formIndex = this.$route.query.indexType;
    this.getCheckInfo();

}
FactoryComponents.initComponent(root);