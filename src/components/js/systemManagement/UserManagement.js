import Vue from 'vue';
import FactoryComponents from '../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'SignCardLook';
root.components = {

    },
    root.props = {
        //当前菜单目录id
        index: String
    }

root.data = {

    depId: 1,
    //表格数据
    tableData: [],
    userType: 1,
    //左边菜单标签
    menuTitle: {
        data: [],
        //选中的菜单
        chooseItem: {},
        //    填报内容表单添加数据
        addFormData: [],
        selected2: 0, //  选中状态
    },
    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,

}
root.methods = {

    //打开左侧关闭菜单 点击事件 
    changeMenuStatus: function (item, x) {
        if (x === 1) {
            this.depId = item.id;
            this.userType = item.userType;
            this.getDepUserListByDepId();
            if (!item.status) {
                this.$set(item, "status", 0);
            }
            if (item.status === undefined || item.status === 0) {
                if (this.menuTitle.chooseItem[0]) {
                    this.menuTitle.chooseItem[0].status = 0;
                }
                this.menuTitle.chooseItem[0] = item;
                this.menuTitle.chooseItem[0].status = 1;
                this.$emit('openMenu', item)
            }
        } else {
            if (item.status === 1) {
                item.status = 0;
            } else {
                if (item.status) {
                    item.status = 1;
                } else {
                    if (item.status === undefined) {}
                    this.$set(item, "status", 1);
                }
            }
        }
    },

    // 获取填报表单数据目录
    getMenu: function (newIndex) {
        const that = this;
        this.componentsMoudel.startGet('manage/department/getClassifyDepMenu', false).then(res => {
            let directoryName = '菜单权限';
            let depMenuData = res.body.data;
            let childMenuTwo = [];
            let userTypeTwo = 1;
            for (let key in depMenuData) {
                let childMenu = {
                    name: key,
                    childMenu: []
                };
                depMenuData[key].forEach((item, index) => {
                    childMenu.childMenu.push(item);
                    childMenu.childMenu[index].userType = userTypeTwo;
                });
                childMenuTwo.push(childMenu);
                userTypeTwo++;
            }
            that.menuTitle.data.push({
                id: 0,
                directoryName: directoryName,
                gmtCreate: "2020-09-30 17:24:38",
                parenId: 0,
                type: 0,
                childMenu: childMenuTwo
            })
            that.$set(this.menuTitle.data[0], "status", 1);
            this.changeMenuStatus(this.menuTitle.data[0].childMenu[0]);
            this.changeMenuStatus(this.menuTitle.data[0].childMenu[0].childMenu[0], 1);
        });
    },

    // 获取对应部门的成员人员信息
    getDepUserListByDepId() {
        let that = this;
        this.componentsMoudel.startGet('manage/department/getDepUserListByDepId/' + that.depId, false).then(res => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
        })
        that.tableData = [];
    },

    // 领导查看 1，修改 2，添加 0
    leadershipManagement(row, index) {
        let that = this;
        if (index === 0) {
            this.$router.push({
                path: '/leadershipManagement',
                query: {
                    index,
                    depId: that.depId
                }
            })
        } else if (index === 1 || index === 2) {
            this.$router.push({
                path: '/leadershipManagement',
                query: {
                    index
                }
            })
            this.componentsMoudel.openLocalStorage("leadershipManagement");
            this.componentsMoudel.setData("management", row);
        }

    },

    // 领导删除
    dangerDelete(row) {
        let that = this;
        let data = {
            id: row.id,
            depId: row.depId,
            departmentInfoId: row.governmenuserInfoVo.id
        };
        this.$confirm("删除后不可恢复，确认删除用户" + row.governmenuserInfoVo.name + "?", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.componentsMoudel.startPost('manage/department/delUserByDepId', data, false).then(res => {
                that.$message.success(res.body.msg);
                this.getDepUserListByDepId();
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    // 重置密码
    resetPassword(row) {
        let that = this;
        this.componentsMoudel.startGet('manage/department/resetUserPassword/' + row.id, false).then(res => {
            that.$message.success("密码已重置为123456");
            this.getDepUserListByDepId();

        })
    },

    // 处室查看 1，修改 2，添加 0
    departmentManage(row, index) {
        let that = this;
        if (index === 0) {
            this.$router.push({
                path: '/departmentManage',
                query: {
                    index,
                    depId: that.depId
                }
            })
        } else if (index === 1 || index === 2) {
            this.$router.push({
                path: '/departmentManage',
                query: {
                    index
                }
            })
            this.componentsMoudel.openLocalStorage("DepartmentManage");
            this.componentsMoudel.setData("manage", row);
        }
    },
    // 处室删除
    dangerDeleteTwo(row) {
        let that = this;
        let data = {
            id: row.id,
            depId: row.depId,
            departmentInfoId: row.governmenuserInfoVo.id
        };
        this.$confirm("删除后不可恢复，确认删除用户" + row.governmenuserInfoVo.name + "?", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.componentsMoudel.startPost('manage/department/delUserByDepId', data, false).then(res => {
                that.$message.success(res.body.msg);
                this.getDepUserListByDepId();
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });





    },
    // 分页
    handleSizeChange(val) {
        this.cpage = val;
        this.getDepUserListByDepId(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.getDepUserListByDepId(this.currentPage, this.cpage);
    },

}

root.mounted = function () {

    this.getMenu(); //获取填报内容
    this.getDepUserListByDepId();




}
FactoryComponents.initComponent(root);