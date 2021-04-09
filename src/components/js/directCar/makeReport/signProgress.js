import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'signProgress';
root.components = {}

root.data = {
    selectData: {
        tableName: '', //表名称
        fillType: '',
        startTime: '', //开始时间
        endTime: '', //结束时间
    },
    fileTime: '',

    reportTypeOption: [{ ///填报期别
        value: 0,
        label: '月报'
    }, {
        value: 1,
        label: '季报'
    }, {
        value: 2,
        label: '年报'
    }, {
        value: 3,
        label: '一次'
    },{
        value: null,
        label: "全部"
    } ],
    //表格信息
    tableData: [],
    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    total: 0,
}
root.methods = {
    // 获取 查询 填报数据
    getProcessData(curPage = 1, limit = 10) {
        let that = this;
        that.selectData.startTime = that.fileTime[0];
        that.selectData.endTime = that.fileTime[1];
        let data = that.selectData;
        data.curPage = curPage;
        data.limit = limit;
        that.componentsMoudel.startPost('governmentfill/getFillInfo', data, false).then(res => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
            // that.tableData.forEach((item, index) => {
            //     that.tableData[index].contentJson = JSON.parse(item.contentJson);
            // })

        })
    },
    //  查看填报进度
    handleClick(row) {
        this.$router.push({
            path: '/makeReport/signProgressLook',
            query: {
                id: row.id,
                relatedGmtCreate:row.relatedGmtCreate
            }
        })
        console.log(row);
    },

    table_index(index){
        return (this.currentPage-1)*this.cpage +index +1;
    },
    resetForm() {
        this.selectData = {
            tableName: '', //表名称
            fillType: '',
            startTime: '', //开始时间
            endTime: '', //结束时间
        }
        this.fileTime = ''
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
    this.getProcessData();

}
FactoryComponents.initComponent(root);