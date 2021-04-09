import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'DepartmentManage';
root.components = {

    },
    root.props = {

    }

root.data = {
    indexType: '',
    //表格数据
    tableData: [],
    formData: {
        account: '', //账号
        name: '', //名字
        depId: '', //机构
        reserved: '', //职位
        email: '',
        phone: '',
        userId: '',
    },
    // 机构列表
    depListData: [],
    rules: { //表单验证
        account: [{
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
        }, {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
        }],
        name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
        }, {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
        }],
        reserved: [{
            required: true,
            message: '请输入职位',
            trigger: 'blur'
        }, {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
        }],
        depId: [{
            required: true,
            message: '请选择机构',
            trigger: 'change'
        }],
    },

}
root.methods = {
    // 获取机构列表
    getDepList() {
        let that = this;
        this.componentsMoudel.startGet('manage/department/getDepList', false).then(res => {
            that.depListData = res.body.data;
        })
    },
    // 保存
    addUserByDepId(formName) {
        let that = this;
        let data = {
            ...that.formData
        }
        this.$refs[formName].validate((valid) => {
            if (valid) {
                that.componentsMoudel.startPost('manage/department/addUserByDepId', data, false).then(res => {
                    that.$message.success(res.body.msg);
                    that.cancelSubmit();
                })
            } else {
                return false;
            }
        });
    },
    // 修改
    updateUserByDepId(formName) {
        let that = this;
        let data = {
            ...that.formData
        }
        this.$refs[formName].validate((valid) => {
            if (valid) {
                that.componentsMoudel.startPost('manage/department/updateUserByDepId', data, false).then(res => {
                    that.$message.success(res.body.msg);
                    that.cancelSubmit();
                })
            } else {
                return false;
            }
        });
    },


    resetForm() {
        this.formData = {
            account: '', //账号
            name: '', //名字
            depId: '', //机构
            reserved: '', //职位
            email: '',
            phone: '',
            userId: this.tableData.id
        }
    },
    // 取消
    cancelSubmit() {
        this.$router.go(-1)
    },

}

root.mounted = function () {
    this.indexType = this.$route.query.index;
    if (this.indexType !== '0') {
        this.componentsMoudel.openLocalStorage("DepartmentManage");
        this.tableData = this.componentsMoudel.getData("manage");
        this.formData.account = this.tableData.username;
        this.formData.name = this.tableData.governmenuserInfoVo.name;
        this.formData.reserved = this.tableData.governmenuserInfoVo.reserved
        this.formData.depId = this.tableData.depId;
        this.formData.email = this.tableData.governmenuserInfoVo.email;
        this.formData.phone = this.tableData.governmenuserInfoVo.phone;
        this.formData.userId = this.tableData.id;
    } else {
        this.formData.depId = Number(this.$route.query.depId);
    }

    this.getDepList();




}
FactoryComponents.initComponent(root);