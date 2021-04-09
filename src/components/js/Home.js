import Vue from 'vue';
import FactoryComponents from '../../factory/components/FactoryComponents.js';
import Breadcrumb from '../template/Breadcrumb'
import md5 from 'js-md5'

const root = {}
export default root
root.name = 'Home';
root.components = {
    Breadcrumb
}; //位置信息
root.data = {
    userInfo: {
        governmenuserInfoVo: {}
    }, //用户信息
    activeIndex: "10", //  用户登录角色
    visible: false,
    visible2: false,
    personalCenterData: {
        accountNumber: 'hongzhenghau',
        userName: '洪正华',
        userOffice: '__',
        userPosition: '党组书记、厅长',
    },
    //运行监测权限列表
    jcMenuItems: [],
    menu: [],
    officialAccountImg: require('../../assets/officialAccountImg.png'),
    url: require('../../assets/officialAccountImg.png'),
}

root.computed = {

}

root.methods = {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    personalCenter() {
        this.$router.push({
            path: '/home',
        })
    },
    //修改密码
    changePassword() {
        this.$router.push({
            path: '/changePassword',
            query: {
                name: this.userName
            }
        });
    },

    //  退出登陆
    logout() {
        window.localStorage.removeItem('userInfo')
        this.$router.push({
            path: '/',
        })
        // window.localStorage.clear()
    },

    // helpClick() {
    //     window.open(this.url)
    // }



}
root.mounted = function () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const that = this;
    this.componentsMoudel.startGet('authMenu/getAuthMenu', {}, false).then((res) => {
        this.menu = res.body.data;
        for (let key in res.body.data) {
            if (key !== '') {
                if ('智能报告' === key) {
                    continue;
                }
                let url = ''
                if ('宏观经济运行监测' === key) {
                    url = '/macroMonitor';
                }
                if ('工业经济运行监测' === key) {
                    url = '/industryMonitor';
                }
                if ('工业行业运行监测' === key) {
                    url = '/business';
                }
                if ('重点产业运行监测' === key) {
                    url = '/estate';
                }
                if ('宏观经济运行监测' === key) {
                    that.jcMenuItems.unshift({
                        name: key,
                        url: url
                    });
                } else {
                    that.jcMenuItems.push({
                        name: key,
                        url: url
                    });
                }


            }
        }
    })


}

root.watch = {
        $route: function (to, from) {
            if (to.path.indexOf("/makeReport") != -1) {
                // this.activeIndex = 3;
            }
        },
    },

    FactoryComponents.initComponent(root);