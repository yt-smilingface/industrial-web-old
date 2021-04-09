import Vue from 'vue';
import FactoryComponents from '../../factory/components/FactoryComponents.js';
import md5 from "js-md5";

const root = {}
export default root
root.name = 'Login';
root.data = {
    items: [
        require('../../assets/login/Department1.png'),
        require('../../assets/login/Department2.png')
    ],
    systemName: require('../../assets/login/systemName1.png'),
    copyright: require('../../assets/login/copyright.png'),
    isRememberPwd: true, //是否记住密码
    loginForm: {
        username: '', //登录名
        password: '' //密码
    },
    loading: false, //  是否登录
    rules: { // 输入框校验
        username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }],
        password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            },
            {
                min: 6,
                message: '密码最少6位字符',
                trigger: 'blur'
            }
        ]
    }
}

root.computed = {
    loginWrapper: function () { // 动态计算窗口大小、:style支持对象语法
        return {
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
        }
    },
    loginSystemName: function () {
        return {
            position: 'absolute',
            left: window.innerWidth / 8 - 183 + 'px',
            top: window.innerHeight / 2 - 160 + 'px'
        }
    },
    formStyle: function () { //计算输入框大小
        return {
            position: 'absolute',
            left: window.innerWidth / 2 - 187 + 'px',
            top: window.innerHeight / 2 - 80 + 'px'
        }
    }
}

root.methods = {
    onLogin(ref) { //登录事件
        let that = this;
        this.$refs[ref].validate((valid) => {
            if (valid) {
                document.documentElement.scrollTop = 0;
                that.loading = true;
                const data = {
                    ...this.loginForm
                };
                // this.$refs[ref]指向表单 表单的父元素指向了vue实例
                this.componentsMoudel.startPost('login', data, false).then((res) => {
                    localStorage.setItem('userInfo', JSON.stringify(res.body.data));

                    if (res.body.status_code == 100) {
                        that.$router.push({
                            path: '/home'
                        })
                    }
                    that.loading = false;
                    // 下次自动登录
                    if (that.isRememberPwd) {
                        localStorage.setItem("loginData", JSON.stringify(that.loginForm));
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
            that.loading = false;
        })
    },


}
root.mounted = function () {
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData) {
        this.loginForm.username = loginData.username;
        this.loginForm.password = loginData.password;
    }

}
FactoryComponents.initComponent(root);