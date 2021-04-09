import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

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
    userInfo: {
        governmenuserInfoVo: {}
    }, //用户信息
    tableIndex: 0, //0新增 1查看 2修改
    tableData: {
        fillNumber: '',
        id: '', //  获取标签ID参数
        mechanismId: '',
        fillName: '',
        fillType: '',
        fillScope: '',
        description: '',
        cronTime: '',
        startTime: '',
        endTime: '',
        labelIds: [],
        contentDateReqs: []
    },
    responsibleAgency: [], //责任机构
    reportTypeOption: [{ ///填报期别
            value: 0,
            label: '月报'
        }, {
            value: 1,
            label: '季报'
        }, {
            value: 2,
            label: '年报'
        },
        {

            value: 3,
            label: '一次'
        },

    ],
    //填报内容
    //左边菜单标签
    menuTitle: {
        data: [],
        //选中的菜单
        chooseItem: {},
        //    填报内容表单添加数据
        addFormData: [],
        selected2: 0, //  选中状态
    },

    //填报范围
    rangeLiArr: [], //左边菜单数据
    rangeIsActive: [], //激活菜单的下标
    reportEnterprise: [], //填报企业数据

}
root.methods = {
    addViewEdit() {
        let that = this;
        this.tableIndex = Number(this.$route.query.indexType);
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        that.tableData.mechanismId = that.userInfo.depId;
        this.componentsMoudel.openLocalStorage("sCardLook");
        let row = this.componentsMoudel.getData("signCard");
        if (that.tableIndex === 0) { //新增
            that.addTable();
        } else if (that.tableIndex === 1) { //查看
            that.getupdateFill(row);
        } else if (that.tableIndex === 2) { //修改
            that.getupdateFill(row);
        }
    },
    // 新增填报表单  编辑表单
    saveFill() {
        let that = this;
        let data = that.tableData;
        if (that.tableIndex === 0) {
            this.componentsMoudel.startPost('governmentfill/saveFill', data, false).then(res => {
                if (res.body.status_code === 100) {
                    that.$message.success(res.body.msg);
                    this.$router.go(-1);
                } else {
                    that.$message.error(res.body.msg);
                }
            })
        } else if (that.tableIndex === 2) {
            this.componentsMoudel.startPost('governmentfill/updateFill', data, false).then(res => {
                if (res.body.status_code === 100) {
                    that.$message.success(res.body.msg);
                    this.$router.go(-1);
                } else {
                    that.$message.error(res.body.msg);
                }
            })
        }
    },
    // 查看和编辑获取数据
    getupdateFill(row) {
        let that = this;
        that.tableData.fillNumber = row.fillNum;
        that.tableData.id = row.id;
        that.tableData.fillName = row.fillName;
        that.tableData.fillType = row.fillType;
        that.tableData.fillScope = row.fillScope;
        that.tableData.description = row.description;
        that.tableData.cronTime = row.cronTime;
        that.tableData.startTime = row.startTime;
        that.tableData.endTime = row.endTime;
        that.tableData.labelIds = JSON.parse(row.labelIds);
        that.tableData.contentDateReqs = JSON.parse(row.contentJson);
        that.rangeIsActive = that.tableData.labelIds

    },
    //路由跳转
    handleTo() {
        this.$router.push('signMeg?index=13&isActive=4');
    },
    // 添加
    addTable() {

    },
    // 
    // 
    //打开左侧关闭菜单
    changeMenuStatus: function (item, x) {
        this.menuTitle.selected2 = x;
        if (item.url) {
            if (item.url !== this.$route.path) {
                this.$router.push({
                    path: item.url,
                    query: {
                        id: item.id,
                        monitorType: this.index,
                    }
                });
            }
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
        if (this.menuTitle.selected2 !== undefined) {
            if (this.menuTitle.selected2 !== 1) {
                //  选中
                this.addFormActive(item)
            } else {
                //  取消选中
                this.cancelReportFrom(item)
            }
        }
    },

    // 获取填报表单数据目录
    getMenu: function (newIndex) {
        const that = this;
        this.componentsMoudel.startPost('governmentfill/getContentDataList', null, false).then(res => {
            let directoryName = '数据目录';
            that.menuTitle.data.push({
                id: 0,
                directoryName: directoryName,
                gmtCreate: "2020-09-30 17:24:38",
                parenId: 0,
                type: 0,
                childMenu: res.body.data
            })
            that.$set(this.menuTitle.data[0], "status", 1);

            that.selectMenu();
        });
    },
    // 获取选中菜单项
    selectMenu() {
        let that = this;
        that.tableData.contentDateReqs.forEach((items, indexs) => {
            that.menuTitle.data[0].childMenu.forEach((item, index) => {
                item.childrenList.forEach((item2, index2) => {
                    if (item2.id === items.id) {
                        that.menuTitle.data[0].childMenu[index].childrenList[index2].status = 1
                    }
                })
            })
        });

    },


    //  添加填报表单
    addFormActive(row) {
        let that = this;
        let adse = 0
        that.tableData.contentDateReqs.forEach((item, index) => {
            if (item.id === row.id) {
                adse++;
            }
        });
        if (adse <= 0) {
            that.tableData.contentDateReqs.push(row);
        }
    },
    // 取消填报表单
    cancelReportFrom(row) {
        console.log(row);
        let that = this;
        this.deleteArrayElements(row, this.menuTitle.addFormData)
        that.tableData.contentDateReqs.forEach((item, index) => {
            if (item.id === row.id) {
                that.tableData.contentDateReqs.splice(index, 1);
            }
        });
        this.menuTitle.data[0].childMenu.forEach((item, index) => {
            item.childrenList.forEach((item2, index2) => {
                if (item2.id === row.id) {
                    this.menuTitle.data[0].childMenu[index].childrenList[index2].status = 0
                }
            })
        })
    },

    // 
    // 
    // 获取企业标签基本信息(拥有多少企业)
    getLabelBasic() {
        let that = this;
        let data = {
            ids: []
        };
        this.componentsMoudel.startPost('governmentfill/getLabelBasic', data, false).then(res => {
            that.rangeLiArr = res.body.data;
            that.tableData.labelIds.sort(function (a, b) {
                return a - b
            });
            that.tableData.labelIds.forEach((item, index) => {
                that.rangeLiArr.forEach((item2, index2) => {
                    if (item === item2.id) {
                        that.reportEnterprise.push(that.rangeLiArr[index2]);
                    }
                })

            });
        });


    },

    // 添加填报范围表单
    handleActive(row) {
        let that = this;
        if (that.rangeIsActive.indexOf(row.id) !== -1) {
            // 取消选中
            let isIndex = that.rangeIsActive.indexOf(row.id);
            that.rangeIsActive.splice(isIndex, 1)
            that.reportEnterprise.forEach((item, index) => {
                if (item.id === row.id) {
                    that.reportEnterprise.splice(index, 1);
                }
            });
        } else {
            that.rangeIsActive.push(row.id);
            let adse = 0
            that.reportEnterprise.forEach((item, index) => {
                if (item.id === row.id) {
                    adse++;
                }
            });
            if (adse <= 0) {
                that.reportEnterprise.push(row);
            }
            that.rangeIsActive = this.unqiue(that.rangeIsActive);
        }
        that.tableData.labelIds.push(row.id);
        that.tableData.labelIds.sort(function (a, b) {
            return a - b
        });
        that.tableData.labelIds = this.unqiue(that.tableData.labelIds);

    },
    //   取消填报范围表单
    cancelReportingEnterprise(row) {
        let that = this
        let isIndex = that.rangeIsActive.indexOf(row.id);
        that.rangeIsActive.splice(isIndex, 1)
        that.reportEnterprise.forEach((item, index) => {
            if (item.id === row.id) {
                that.reportEnterprise.splice(index, 1);
            }
            if (row.id === that.tableData.labelIds[index]) {
                that.tableData.labelIds.splice(index, 1);
            }
        });
    },

    //  去重
    unqiue(arr) {
        return Array.from(new Set(arr))
    },
    //    删除数组元素
    deleteArrayElements(str, arr) {
        var index = arr.indexOf(str);
        arr.splice(index, 1);
    },


    // 获取责任机构
    queryAgency() {
        let that = this;
        let data = {
            "ids": []
        }
        this.componentsMoudel.startPost('governmentfill/queryAgency', data, false).then((res) => {
            that.responsibleAgency = res.body.data;
        });
    },

    cancelSubmit() {
        this.$router.go(-1)
    },


}
root.watch = {
    index: function (newIndex, oldIndex) {
        this.getMenu();
    }
}

root.mounted = function () {
    this.addViewEdit();
    this.getMenu(); //获取填报内容

    this.queryAgency(); //获取责任机构
    this.getLabelBasic(); //获取企业标签




}
FactoryComponents.initComponent(root);