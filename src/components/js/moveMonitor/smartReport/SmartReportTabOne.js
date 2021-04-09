import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents';
const root = {}
root.components = {

};
//重点产业运行监测
export default root
root.name = 'SmartReportTabOne';

root.data = {
    userInfo: {}, //用户信息
    basicDatabaseValue: {
        reportName: '',
        reportType: 1,
        responsibilityInstitutions: '',
    },
    responsibilityInstitutionsTwo: 0,
    basicOption0: [{
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
    }],
    organListOption: [],
    tableData: [],
}

root.methods = {
    // 查询数据
    queryClick() {
        let that = this;
        let data = that.basicDatabaseValue;
        that.componentsMoudel.startPost('intelligencereports/queryPageDataView', data, false).then((res) => {
            this.tableData = res.body.data
        })
    },
    getOrganList() {
        let that = this;
        that.componentsMoudel.startGet('intelligencereports/getOrganList', false).then((res) => {
            that.organListOption = res.body.data;
            // that.basicDatabaseValue.responsibilityInstitutions = res.body.data[0].id;
            // that.responsibilityInstitutionsTwo = res.body.data[0].id;
        })
    },
    handleClick(row) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/viewReport',
            query: {
                id: row.id,
            }
        })
    },
    // xiazai 
    attachmentDownload(row) {
        console.log(row);
        window.open(
            row.reportAttachmentUrl + '',
            '_self'
        );
    },
    resetForm() {
        this.basicDatabaseValue = {
            reportName: '',
            reportType: 1,
            responsibilityInstitutions: '',
        }
    }
}
root.mounted = function () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.tableData.responsibilityInstitutions = this.userInfo.governmenuserInfoVo.reservedExtend
    this.getOrganList();
    this.queryClick();

}

FactoryComponents.initComponent(root);