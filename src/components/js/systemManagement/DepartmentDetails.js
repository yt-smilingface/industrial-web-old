import {
    forEach
} from 'core-js/fn/array';
import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents'


const root = {}
export default root
root.name = 'DepartmentDetails';
root.components = {

    },

    root.props = {
        //当前菜单目录id
        index: String
    }

root.data = {
    typeId: '',
    typeIndex: '',

    formData: {
        name: '',
        category: '',
        id: '', //被修改部门的id
        leaderId: '', //分管领导id
    },
    // 分管领导
    leaderNameList: [],
    // 机构分类菜单列表
    categoryList: [],

    data: [], //所有选择项
    defaultProps: {
        children: 'childMenu',
        label: 'directoryName'
    },

    defaultCheckedKeys: [], // 默认选中项
    defaultData: [], //用户又有选中项
    // 用户选着项
    menuList: [],
    isClick: false, //防止连续点击


}
root.methods = {
    getTypeIndex() {
        let that = this;
        that.typeIndex = that.$route.query.index; //0 新增， 1查看 2修改
        if (that.typeIndex !== '0') {
            this.componentsMoudel.openLocalStorage("departmentDetails");
            let row = this.componentsMoudel.getData("department");
            that.formData.leaderId = row.leaderId;
            that.formData.category = row.category;
            that.formData.id = row.id;
            that.formData.name = row.name;
        }
    },

    // 获取分管领导列表
    getLeaderNameList() {
        let that = this;
        that.componentsMoudel.startGet('manage/department/getLeaderNameList', false).then(res => {
            that.leaderNameList = res.body.data;
        })
    },
    // 获取机构分类菜单列表
    getCategoryList() {
        let that = this;
        that.componentsMoudel.startGet('manage/department/getCategoryList', false).then(res => {
            that.categoryList = res.body.data;
        })
    },
    // 获取所有权限列表树形结构
    getAllMenuList() {
        let that = this;
        this.componentsMoudel.startGet('manage/department/getAllMenuList', false).then(res => {
            this.data = res.body.data;
            if (that.typeIndex !== '0') {
                that.typeId = that.$route.query.id;
                that.getDepHasAuthMenuList();
            }
        })
    },
    // 获取部门对应的所有权限列表
    getDepHasAuthMenuList() {
        let that = this;
        this.componentsMoudel.startGet('manage/department/getDepHasAuthMenuList/' + that.typeId, false).then(res => {
            that.defaultData = res.body.data;
            that.defaultData.sort(function (a, b) {
                return a - b
            });
            this.ergodicTree(that.data);
            that.menuList = that.defaultData;
        })
    },
    // 递归判断默认值
    ergodicTree(data) {
        let that = this;
        for (var i in data) {
            // console.log(data[i].childMenu.length > 0);
            if (data[i].childMenu.length > 0) {
                that.ergodicTree(data[i].childMenu);
            } else {
                if (that.defaultData.indexOf(data[i].id) > -1) {
                    that.defaultCheckedKeys.push(data[i].id);
                    that.defaultCheckedKeys = this.unqiue(that.defaultCheckedKeys);
                }
            }
        }
    },
    // 去重
    unqiue(arr) {
        return Array.from(new Set(arr))
    },
    // 选着值变化
    handleNodeClick(data) {
        this.menuList = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
        this.menuList.sort(function (a, b) {
            return a - b
        });
    },
    // 保存新增
    saveNew() {
        let that = this;
        that.isClick = true;
        let data = that.formData;
        data.menuList = that.menuList;
        this.componentsMoudel.startPost('manage/department/addDepAuthMenu', data, false).then(res => {
            if (res.body.status_code === 100) {
                that.isClick = false;
                that.$message.success(res.body.msg);
                this.cancelSubmit();
            } else {
                that.$message.error(res.body.msg);
            }
        });
        setTimeout(() => {
            that.isClick = false;
        }, 4000)
    },
    // 保存修改
    saveChanges() {
        let that = this;
        that.isClick = true;
        let data = that.formData;
        data.menuList = that.menuList;
        this.componentsMoudel.startPost('manage/department/updateAuthMenu', data, false).then(res => {
            if (res.body.status_code === 100) {
                that.isClick = false;
                that.$message.success("处室管理配置已生效");
                setTimeout(() => {
                    this.$router.push({
                        path: '/department',
                        query: {
                            index: 107
                        }
                    });
                    window.location.reload();
                }, 2000)

            } else {
                that.$message.error(res.body.msg);
            }
        })
        setTimeout(() => {
            that.isClick = false;
        }, 4000)
    },

    // 取消
    cancelSubmit() {
        this.$router.go(-1)
    },


}


root.mounted = function () {
    this.getLeaderNameList();
    this.getCategoryList();





    this.getTypeIndex();
    this.getAllMenuList();






}
FactoryComponents.initComponent(root);