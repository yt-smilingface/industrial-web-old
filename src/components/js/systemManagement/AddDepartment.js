import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents'


const root = {}
export default root
root.name = 'Department';
root.components = {}

root.data = {
    formData: {
        name: '',
        number: '',
        category: '', //分类
        leader: '',
    },
    options: [{
        value: '2',
        label: '全部'
    }, {
        value: '0',
        label: '未审核'
    }, {
        value: '1',
        label: '已审核'
    }],

}
root.methods = {
    // 添加
    departmentSave(){
        let that = this;
        let data = that.formData;
        this.componentsMoudel.startPost('manage/department/save', data, false).then((res) => {
            if (res.body.status_code === 100) {
                that.$message.success('新增处室成功');
                setTimeout(() => {
                    document.documentElement.scrollTop = 0;
                    that.cancelAuditOpinion();
                }, 5000);
            }
        });
    },
    //    取消
    cancelAuditOpinion() {
        this.$router.go(-1)
    },

    resetForm() {
        this.formData = {
            name: '',
            number: '',
            category: '', //分类
            leader: '',
        }
    },

}

root.mounted = function () {


}
FactoryComponents.initComponent(root);