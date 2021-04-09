import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents';

const root = {}
export default root
root.name = 'Notification';
root.props = {

}
root.data = {
    notificationData: [
        { type: "系统升级", title: '关于xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx的通知',date: '08-15',},
        { type: "系统升级", title: '关于xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx的通知',date: '08-05',},
        ],
    userInformation: '',   //传参值
}
root.methods = {

    //取消修改
    cancelEdit(){
        this.$router.go(-1)
    }
}

root.mounted = function() {
    this.userInformation = this.$route.query.name;
    console.log(this.userInformation)

}
FactoryComponents.initComponent(root);
