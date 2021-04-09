import number from 'core-js/fn/number';
import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'


const root = {}
export default root
root.name = 'Interact';


root.data = {
    userInfo: {
        governmenuserInfoVo: {}
    }, //用户信息
    formData: {
        title: '', //标题
        category: '全部', //分类
        startTime: '',
        endTime: '',
        ResponsibleDepartment: "", //责任处事
        fileTime: '',
    },

    typeOption: [],
    queryAgencyDatas: '',
    interactiveMessage: [], //查询数据
    responsibleAgency: [],

    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 5,
    total: 0,
}
root.methods = {
    // 获取责任机构
    queryAgency() {
        let that = this;
        let data = {};
        this.componentsMoudel.startPost('governmentfill/queryAgency', data, false).then((res) => {
            that.responsibleAgency = res.body.data;
            that.queryAgencyData();
        });

    },

    queryAgencyData() {
        let that = this;
        that.responsibleAgency.forEach((item, index) => {
            if (that.formData.ResponsibleDepartment === item.id) {
                that.queryAgencyDatas = item.name;
            }
        })
    },
    // 分类
    listCategory() {
        let that = this;
        this.componentsMoudel.startGet('interaction/listCategory', false).then((res) => {
            res.body.data.forEach((item, index) => {
                let options = {
                    label: item,
                    value: item
                }
                that.typeOption.push(options);
            })
        })
    },

    // 查询
    submitForm(currentPage = 1, pageSize = 5) {
        let that = this;
        if (that.formData.fileTime !== null && that.formData.fileTime.length !== 0) {
            that.formData.startTime = that.formData.fileTime[0];
            that.formData.endTime = that.formData.fileTime[1];
        }
        let data = that.formData;
        data.currentPage = currentPage;
        data.pageSize = pageSize;
        that.componentsMoudel.startPost('interaction/queryPageSide', data, false).then((res) => {
            that.interactiveMessage = res.body.data;
            that.total = res.body.cum;
            that.interactiveMessage.forEach((item, index) => {
                let department2 = item.department.split(',');
                let departmentData = [];
                department2.forEach((item2, index2) => {
                    that.responsibleAgency.forEach((item3, index3) => {
                        if (Number(item2) === item3.id) {
                            departmentData.push(item3.name);
                        }
                    })
                });
                that.interactiveMessage[index].department = departmentData;
            });
        })
    },



    resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.formData = {
            title: '', //标题
            category: '全部', //分类
            startTime: '',
            endTime: '',
            ResponsibleDepartment: this.userInfo.depId, //责任处事
            fileTime: '',
        }
    },



    // 分页1
    handleSizeChange(val) {
        this.cpage = val;
        this.submitForm(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.submitForm(this.currentPage, this.cpage);
    },
    // 跳转到详情页面
    handleTo(row) {
        // this.$router.push({
        //     path: '/showInteract',
        //     query: {
        //         id: row.id,
        //     }
        // })
        
        this.$router.push({
            name: 'interactList',
            params: {
                row: row,
            }
        })
        
        this.componentsMoudel.openLocalStorage("showInteract");
        this.componentsMoudel.setData("showInteract", row);
    }
}

root.mounted = function () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.formData.ResponsibleDepartment = this.userInfo.depId;

    this.queryAgency(); //获取责任机构

    this.listCategory(); //
    this.submitForm();

}
FactoryComponents.initComponent(root);