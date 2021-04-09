import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';

const root = {}
export default root
root.name = 'ChangePassword';
root.props = {

}
root.data = {
    personalCenterData: {
        accountNumber: 'hongzhenghau',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    },
    userInformation: '', //传参值
    userInfo: {}
}
root.methods = {
    // 保存修改
    saveChanges() {
        let data = {
            "oldPassword": this.personalCenterData.oldPassword,
            "password": this.personalCenterData.newPassword
        };
        this.componentsMoudel.startPost('/auth/update_user_password', data, false).then((res) => {

            if (res.status_code == 100) {
                this.$router.push({
                    path: "/login"
                })
                localStorage.removeItem('userInfo');
            }

        });
    },

    //取消修改
    cancelEdit() {
        this.$router.go(-1)
    }
}

root.mounted = function () {
    this.userInformation = this.$route.query.name;
    console.log(this.userInformation)

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
}
FactoryComponents.initComponent(root);