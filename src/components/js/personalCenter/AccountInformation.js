import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';

const root = {}
export default root
root.name = 'AccountInformation';
root.props = {

}
root.data = {
    userInfo: {
        governmenuserInfoVo: {}
    },
    personalCenterData: {
        accountNumber: 'hongzhenghau',
        userName: '洪正华',
        userPosition: '党组书记、厅长',
        telephone: 'dddd',
        mailbox: 'dddd'
    },
    userInformation: '', //传参值
}
root.methods = {
    // 保存修改
    saveChanges() {

        let data = {
            phone: this.userInfo.governmenuserInfoVo.phone,
            email: this.userInfo.governmenuserInfoVo.email
        }
        //发请求
        this.componentsMoudel.startPost('/auth/update_user_info_from_government', data, false).then((res) => {
            console.log(res);
            //修改之后把新的用户信息存进数据库
            if (res.code == 100) {
                this.$message({
                    message: '恭喜你，修改成功',
                    type: 'success'
                });
                localStorage.setItem('userInfo', JSON.stringify(res.body.data))
            } else {
                this.$message({
                    message: res.body.msg,
                    type: 'success'
                });
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
    console.log(this.userInformation);
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

}
FactoryComponents.initComponent(root);