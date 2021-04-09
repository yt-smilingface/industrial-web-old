import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
import editor from "@/components/Editor/Editor";

const root = {}
root.components = {
    editor
};
//编辑智能报告
export default root
root.name = 'EditingReports';
root.data = {
    cancelType: 0, //0是新增  其他是修改
    userInfo: {}, //用户信息
    fileList: [],
    queryAgencyData: [],
    tableData: {
        reportId: '',
        reportName: '',
        reportType: 1,
        responsibilityInstitutions: '',
        reportDate: '',
        reportContent: '', //富文本编辑器数据
        reportRemark: '',
        reportAttachmentUrl: '',
        reportAttachmentName: '',
        visibilityDepList: [],
        state: 0,
        id: '',
        agencyName: ''
    },
    reportTypeOption: [{
        value: 0,
        label: '一次'
    }, {
        value: 1,
        label: '月报'
    }, {
        value: 2,
        label: '季报'
    }, {
        value: 3,
        label: '年报'
    }, ],
    stateOption: [{
        value: 0,
        label: '未发布'
    }, {
        value: 1,
        label: '已发布'
    }],
    ifClick: false, //是否可点击
}

root.methods = {
    getEditerVal(data) {
        this.tableData.reportContent = data;
    },
    // 查看信息
    selectReport() {
        let that = this;
        that.componentsMoudel.startGet('intelligencereports/selectReport/' + this.cancelType, false).then((res) => {
            let tableDataTwo = res.body.data;
            that.tableData.reportId = tableDataTwo.reportId;
            that.tableData.reportName = tableDataTwo.reportName;
            that.tableData.reportType = tableDataTwo.reportType;
            that.tableData.responsibilityInstitutions = tableDataTwo.responsibilityInstitutions;
            that.tableData.agencyName = tableDataTwo.agencyName;
            that.tableData.reportDate = tableDataTwo.reportDate;
            that.tableData.reportRemark = tableDataTwo.reportRemark;
            that.tableData.reportContent = tableDataTwo.reportContent;
            that.tableData.reportAttachmentUrl = tableDataTwo.reportAttachmentUrl;
            that.tableData.reportAttachmentName = tableDataTwo.reportAttachmentName;
            that.tableData.visibilityDepList = JSON.parse(tableDataTwo.visibilityDep);
            that.tableData.state = tableDataTwo.state;
            that.tableData.id = tableDataTwo.id;
            let fileData = {
                name: tableDataTwo.reportAttachmentName,
                url: tableDataTwo.reportAttachmentUrl,
            };
            that.fileList[0] = fileData;
        })
    },
    // 新增  添加
    saveSubmit() {
        let that = this;
        that.ifClick = true;
        if (that.cancelType !== 0) {
            let data = that.tableData;
            that.componentsMoudel.startPost('intelligencereports/updateReport', data, false).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success('修改成功');
                    that.ifClick = true;
                    that.cancelSubmit();
                }
            })
        } else {
            let data = that.tableData;
            that.componentsMoudel.startPost('intelligencereports/addReport', data, false).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success('新增成功');
                    that.ifClick = true;
                    that.cancelSubmit();
                }
            })
        }
        setTimeout(() => {
            that.ifClick = false;
        }, 5000)
    },
    // 获取可见责任机构
    queryAgency() {
        let that = this;
        that.componentsMoudel.startPost('governmentfill/queryAgency', false).then((res) => {
            that.queryAgencyData = res.body.data;
        })
    },
    cancelSubmit() {
        this.$router.go(-1)
    },
    // 成功后
    handleSendFile(file) {
        console.log(file);
        if (file.status_code === 200) {
            this.tableData.reportAttachmentUrl = file.data.url;
            this.tableData.reportAttachmentName = file.data.name;

            this.fileList.splice(0, 1);
        }

    },

    initheaders() {
        const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        return {
            "Authorization": userInfo.token
        };
    },

    nowDate() {
        let aaa = (new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')).slice(0, 11);
        this.tableData.reportDate = aaa.slice(0, 11).toString();
    }

}
root.mounted = function () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.tableData.responsibilityInstitutions = this.userInfo.governmenuserInfoVo.reservedExtend;
    this.cancelType = Number(this.$route.query.id);
    if (this.cancelType !== 0) {
        this.selectReport();
        this.tableData.id = this.$route.query.id;
    }
    this.nowDate();
    this.queryAgency();


}

FactoryComponents.initComponent(root);