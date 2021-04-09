import number from 'core-js/fn/number';
import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'SignMegDetails';
root.components = {}

root.data = {
    dialogloading: false,
    userInfo: {
        governmenuserInfoVo: {}
    }, //用户信息
    loading: true,
    tableIndex: 0,
    formTndex: 0,
    tableDataJB: {
        id: '',
        labelName: '',
        labelNum: '',
        dataDirectoryId: '',
        mechanismId: '', //责任机构
        gmtCreate: '', //创建时间  
        description: '',
        enterpriseIdS: [],
    },
    //选择框
    responsibleAgency: [],


    //表格信息
    tableData: [],
    multipleSelectionTwo: [],
    multipleSelectionData: [],
    //  单个添加数据
    allEnterpriseData: [],
    allCreditCodeData: [],
    creditCodeData: [],
    creditCodeDataTwo: [],
    searchParam: '', //   查询数据
    multipleSelectionStart: [], //之前数据
    allData: [], // 全选数据

    singleAdd: {
        dialogTableVisible: false, // 单个添加弹出

        singleAddProp: ['data', 'name', 'address'],
        singleAddData: [],
        multipleSelectionStart: [], //之前数据
        multipleSelection: [] //选中数据
    },
    //批量新增
    batchAdd: {
        dialogFormVisible: false, //批量添加
        batchAddInput: '',
        fileList: '',
    },

    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
    // 获取表单数据分页
    currentPage2: 1,
    cpage2: 10,
    total2: 0,
}
root.methods = {
    // 点击不同
    addViewEdit() {
        let that = this
        that.tableIndex = Number(this.$route.query.indexType);
        that.formTndex = Number(this.$route.query.id);
        !(isNaN(that.formTndex)) ? that.tableDataJB.id = that.formTndex: that.tableDataJB.id = '';
        if (that.tableIndex === 0) { //新增
            that.addTable();
        } else if (that.tableIndex === 1) { //查看
            that.getLabelInfo()
        } else if (that.tableIndex === 2) { //修改
            that.getLabelInfo()
        }
    },
    //查看详情
    seeDetails(row) {
        let that = this;
        that.componentsMoudel.startGet('interaction/viewCompanyDetails/' + row.id, false).then((res) => {
            let enterpriseData = res.body.data;
            document.documentElement.scrollTop = 0; //跳转回到顶部
            this.$router.push({
                path: '/enterpriseDetails',
                query: {
                    Id: enterpriseData.bbdQyxxId,
                    info: enterpriseData
                }
            })
        });
    },

    // 添加
    addTable() {

    },
    // 获取表单数据
    getLabelInfo(curPage = 1, limit = 10) {
        let that = this;
        // that.cpage = 10;
        let mainData = {
            id: that.formTndex,
            curPage: curPage,
            limit: limit
        };
        that.componentsMoudel.startPost('governmentfill/getLabelInfo', mainData, false).then((res) => {
            that.tableData = res.body.data.qyxxBasicVoList;
            that.total = res.body.cum;
            that.tableDataJB.labelNum = res.body.data.labelNum;
            that.tableDataJB.labelName = res.body.data.labelName;
            that.tableDataJB.mechanismId = res.body.data.mechanismId;
            that.tableDataJB.gmtCreate = res.body.data.gmtCreate;
            that.tableDataJB.description = res.body.data.description;
        });
    },
    // 获取选中企业的统一信用码数据
    getHasEnterprise() {
        let that = this;
        this.componentsMoudel.startGet('governmentfill/getHasEnterprise/' + that.formTndex, false).then((res) => {
            that.allCreditCodeData = res.body.data;
            that.multipleSelectionData = res.body.data;
            that.allData = res.body.data;
        })
    },
    // 获取企业标签所有的企业列表
    getAllEnterprise(curPage = 1, limit = 10) {
        let that = this;
        that.loading = true;
        let data = {
            labelId: that.formTndex,
            curPage: curPage,
            limit: limit,
            searchParam: that.searchParam
        };
        that.componentsMoudel.startPost('governmentfill/getAllEnterprise', data, false).then((res) => {
            that.allEnterpriseData = res.body.data;
            that.allEnterpriseData.forEach((item, index) => {
                that.allCreditCodeData.forEach((item2, index2) => {
                    if (item.creditCode === item2) {
                        this.$refs.multipleTable.toggleRowSelection(item, true);
                        that.creditCodeDataTwo.push(item);
                    }
                });
            });
            that.total2 = res.body.cum;
            that.loading = false;
        });
        setTimeout(() => {
            that.loading = false;
        }, 8000)

    },
    //   单个添加企业数据
    toggleSelection(rows) {
        let that = this;
        that.singleAdd.dialogTableVisible = true;
        if (that.tableIndex !== 0) {
            this.getHasEnterprise();
        }
        this.getAllEnterprise();

    },
    // 单个添加企业数据选中数据
    // handleSelectionChange(val) {
    //     let that = this;
    //     if (val.length === 10) {
    //         let allDataTwo = {
    //             index: that.currentPage2,
    //             data: val
    //         }
    //         that.allData.push(allDataTwo);
    //         console.log(1);
    //     } else if (val.length === 0) {
    //         that.allData.forEach((item, index) => {
    //             if (item.index === that.currentPage2) {
    //                 item.data.forEach((item2, index2) => {
    //                     let index3 = that.allCreditCodeData.indexOf(row.creditCode);
    //                     that.allCreditCodeData.splice(index3, 1);
    //                 })
    //             }
    //         })
    //         console.log(2);
    //     } else {
    //         val.forEach((item, index) => {
    //             that.allCreditCodeData.push(item.creditCode);
    //         })
    //         that.allCreditCodeData = this.unqiue(that.allCreditCodeData);
    //         console.log(val);
    //     }
    //     // console.log(that.multipleSelectionData);
    //     // console.log(val);
    //     // // that.multipleSelectionData = val.concat(this.multipleSelectionData);
    //     console.log(that.allCreditCodeData);
    //     // that.multipleSelectionStart = val;
    // },

    handleSelectionChangeAll(row) {
        let that = this;
        console.log(row);
        console.log(that.allData);
        if (row.length > that.allData.length) {
            row.forEach((item, index) => {
                that.allCreditCodeData.push(item.creditCode);
            })
            that.allCreditCodeData = this.unqiue(that.allCreditCodeData);
        } else {
            that.allData.forEach((item) => {
                let i = 1;
                if (row.length !== 0) {
                    row.forEach((item2) => {
                        if (item !== item2.creditCode) {
                            i += 1;
                        }
                    });
                }
                console.log(item);
                console.log(i);
                if (i > row.length) {
                    let index3 = that.allCreditCodeData.indexOf(item);
                    if (index3 > -1) {
                        that.allCreditCodeData.splice(index3, 1);
                    }
                }
            });
        }
        that.allData = [];
        if (row.length !== 0) {
            row.forEach((item, index) => {
                that.allData.push(item.creditCode);
            })

        } else {
            that.allCreditCodeData = [];
        }

        console.log(that.allCreditCodeData);

    },
    // 选中行
    handleSelectionChangesss(select, row) {
        let that = this;
        console.log(row);
        let index = that.allCreditCodeData.indexOf(row.creditCode);
        if (index > -1) {
            that.allCreditCodeData.splice(index, 1);
        } else {
            that.allCreditCodeData.push(row.creditCode);
        }
        that.allCreditCodeData = this.unqiue(that.allCreditCodeData);
        console.log(that.allCreditCodeData);

    },
    // 单个添加企业数据确定提交标签
    submitHandleSelectionChange() {
        let that = this;
        that.tableDataJB.enterpriseIdS = that.allCreditCodeData;
        let data = that.tableDataJB;
        if (that.tableIndex === 0) {
            that.componentsMoudel.startPost('governmentfill/saveLabel', data, false).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success(res.body.msg);
                    that.tableDataJB = {
                        id: '',
                        labelName: '',
                        labelNum: '',
                        dataDirectoryId: '',
                        mechanismId: '', //责任机构
                        gmtCreate: '', //创建时间
                        description: '',
                        enterpriseIdS: [],
                    }
                    this.cancelSubmit();
                } else {
                    that.$message.error(res.body.msg);
                }

            });
        } else if (that.tableIndex === 2) {
            that.componentsMoudel.startPost('governmentfill/updateLabel', data, false).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success(res.body.msg);
                    that.singleAdd.dialogTableVisible = false;
                    that.getLabelInfo();
                } else {
                    that.$message.error(res.body.msg);
                    that.singleAdd.dialogTableVisible = false;
                    that.getLabelInfo();
                }

            });
        }
    },
    getRowKeys(row) {
        return row.id;
        console.log(row);
    },
    // 选中企业标签删除功能
    handleSelectionChangeTwo(val) {
        console.log(val);
        if (val.length <= 0) {

            this.multipleSelectionTwo = [];
        } else {
            val.forEach((item, index) => {
                this.multipleSelectionTwo[index] = item.creditCode;
            })
        }
        console.log(this.multipleSelectionTwo);
    },
    // 新增 修改数据提交
    saveLabel() {
        let that = this;
        let selection = [];
        that.tableData.forEach((item, index) => {
            selection[index] = item.creditCode;
        })
        console.log(selection);
        // let enterpriseIdTherr = selection.concat(this.singleAdd.multipleSelection);
        that.tableDataJB.enterpriseIdS = selection;
        that.tableDataJB.enterpriseIdS.sort();

        let data = that.tableDataJB;
        if (that.tableIndex === 0) {
            that.componentsMoudel.startPost('governmentfill/saveLabel', data, false).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success(res.body.msg);
                    that.tableDataJB = {
                        id: '',
                        labelName: '',
                        labelNum: '',
                        dataDirectoryId: '',
                        mechanismId: 1, //责任机构
                        gmtCreate: '', //创建时间
                        description: '',
                        enterpriseIdS: [],
                    }
                } else {
                    that.$message.error(res.body.msg);
                }

            });
        } else if (that.tableIndex === 2) {
            that.componentsMoudel.startPost('governmentfill/updateLabel', data, false).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success(res.body.msg);
                    that.getLabelInfo();
                } else {
                    that.$message.error(res.body.msg);
                    that.getLabelInfo();
                }

            });
        }

    },
    //   单个数据提交
    singleAddSubmit() {

    },

    // 模板下载
    templateDownload(row) {
        window.open(
            `${process.env.BASE_URL}template/企业标签模板.xlsx`,
            '_self'
        );
    },
    // 删除企业标签对应的企业
    deleteLabelEnterprise() {

        let that = this;
        let data = {
            id: that.formTndex,
            enterpriseIdS: that.multipleSelectionTwo
        }
        that.componentsMoudel.startPost('governmentfill/deleteLabelEnterprise', data, false).then((res) => {
            if (res.body.status_code === 100) {
                that.$message.success(res.body.msg);
                that.getLabelInfo();
            } else {
                that.$message.error(res.body.msg);
            }
        });
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

    //    批量新增
   async submitUpload() {
       let res = await this.$refs.upload.submit();
        this.batchAdd.fileList=""
    },
    handleSuccess(response, file, fileList) {
        console.log(response);
        if(response.data){
            this.formTndex = response.data.id
        }
        if(response.status_code==100){
            this.$message.success('上传成功');
            this.batchAdd.dialogFormVisible = false;
            this.getLabelInfo();
            this.batchAdd.fileList="";
            
        }else{
            this.$message(response.error_msg);
        }
        this.dialogloading = false;

    },
    handleFail() {
        console.log('失败');
        this.dialogloading = false;
    },
    handleChange(file, fileList) {
        this.batchAdd.fileList = file.name;
    },
    // 图片大小验证
    beforeAvatarUpload(file) {
        console.log(file);
        console.log(file.type);

        let myname = file.name.split('.');
        let length = myname.length;
        console.log(myname[length - 1]);

        if (myname[length - 1] == 'xlsx' || myname[length - 1] == 'xls') {
            this.dialogloading = true;
        } else {
            this.$message.error('文件格式不支持')
            return false;
        }
        // let isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
        // console.log(isXLSX);
        // if (!isXLSX) {
        //     this.$message.error('文件格式不支持');
        // }
        // return isXLSX;
    },
    initHeader() {
        return {
            'Authorization': this.userInfo.token,
            'data': {
                ...this.tableDataJB
            }
        };
    },


    //  去重
    unqiue(arr) {
        return Array.from(new Set(arr))
    },
    // 取消
    cancelSubmit() {
        this.$router.go(-1);
    },
    // table分页
    handleSizeChange(val) {
        let that = this;
        that.cpage = val;
        this.getLabelInfo(that.currentPage, that.cpage);
    },
    handleCurrentChange(val) {
        let that = this;
        that.currentPage = val;
        this.getLabelInfo(that.currentPage, that.cpage);
    },

    // 获取表单数据分页
    handleSizeChange2(val) {
        this.cpage2 = val;
        this.getAllEnterprise(this.currentPage2, this.cpage2);
    },
    handleCurrentChange2(val) {
        this.currentPage2 = val;
        this.getAllEnterprise(this.currentPage2, this.cpage2);
    },

}

root.mounted = function () {
    this.addViewEdit();
    this.queryAgency();


    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

    let aaa = (new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''));
    this.tableDataJB.gmtCreate = aaa.toString();
}
FactoryComponents.initComponent(root);