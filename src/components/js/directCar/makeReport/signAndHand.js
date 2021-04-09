import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'SignAndHand';
root.components = {}

root.data = {
    setId: '',
    newIndex: '',
    isActive: '',
    selectData: {
        tableName: '', //表名称
        companyName: '', //企业名称
        startTime: '', //开始时间
        endTime: '', //结束时间
        checkStatus: '0', //状态信息
        fillId: '',
        writeStatus: '',
    },
    fileTime: '',
    options: [{
        value: '0',
        label: '待审核'
    }, {
        value: '1',
        label: '已审核'
    },{
        value: '2',
        label: '全部'
    }, ],
    //表格信息
    tableData: [],

    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
}
root.methods = {
    // 获取 查询 填报审核数据
    getProcessData(curPage = 1, limit = 10) {
        let that = this;

        if (that.fileTime !== null) {
            that.selectData.startTime = that.fileTime[0];
            that.selectData.endTime = that.fileTime[1];
        }
        let data = that.selectData;
        data.curPage = curPage;
        data.limit = limit;

        this.setId ? data.id = this.setId : data.id = "";

        that.componentsMoudel.startPost('governmentfill/getProcessData', data, false).then(res => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
            that.tableData.forEach((item, index) => {
                that.tableData[index].dynamicFill = JSON.parse(item.dynamicFill);
            })

        })
    },
    //立即审核
    handleClick(row) {
        this.$router.push({
            path: '/makeReport/fillAuditDetails',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                id: row.id,
                indexType: 1,
            }
        })
    },
    // 查看
    lookClick(row) {
        this.$router.push({
            path: '/makeReport/fillAuditDetails',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                id: row.id,
                indexType: 2
            }
        })
    },

    resetForm() {
        this.selectData = {
            tableName: '', //表名称
            companyName: '', //企业名称
            startTime: '', //开始时间
            endTime: '', //结束时间
            checkStatus: '2', //状态信息
            fillId: '',
            writeStatus: '',
        }
        this.fileTime = ''
        this.currentPage=1;
        this.setId=null;
        this.getProcessData();
    },
    // 分页
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val;
        this.getProcessData(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getProcessData(this.currentPage, this.cpage);
    },
}

root.mounted = function () {
    this.newIndex = this.$route.query.index;
    this.isActive = this.$route.query.isActive;
    this.setId = this.$route.query.id;
    this.getProcessData();
}
FactoryComponents.initComponent(root);