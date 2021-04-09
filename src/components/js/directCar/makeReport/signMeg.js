import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'signMeg';
root.components = {}

root.data = {
    newIndex: '',
    isActive: '',

    //表格信息
    tableData: [],
    // 分页数据
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 10,
    proptype: '',
    total: 0,
}
root.methods = {
    // 获取表格数据
    getInfoTable(curPage = 1, limit = 10) {
        let that = this;
        let data = {
            curPage,
            limit
        };
        that.componentsMoudel.startPost('/governmentfill/queryPageData', data, false).then((res) => {
            that.tableData = res.body.data;
            this.total = res.body.cum;
        });
    },
    // 新增标签
    newLabel() {
        this.$router.push({
            path: '/makeReport/signMegDetails',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                indexType: 0
            }
        });
    },
    // 查看标签
    handleClick(row) {
        this.$router.push({
            path: '/makeReport/signMegDetails',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                indexType: 1,
                id: row.id
            }
        });
    },
    // 编辑标签
    editLabel(row) {
        this.$router.push({
            path: '/makeReport/signMegDetails',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                indexType: 2,
                id: row.id
            }
        });
    },
    // 修改状态
    updateLabelStatus2(row) {
        let that = this;
        let data = {
            id: row.id,
            isDead:( row.isDead == 0 || row.isDead ==2) ? 1 : 2
        };
        that.componentsMoudel.startPost('governmentfill/updateLabelStatus', data, false).then((res) => {
            if (res.body.status_code === 100) {
                that.$message.success('修改成功');
                that.getInfoTable(this.currentPage, this.cpage);
            } else {
                that.$message.error("修改失败");
                that.getInfoTable(this.currentPage, this.cpage);
            }

        });
    },
    // 删除
    updateLabelStatus(row) {
        this.$confirm('删除后不可恢复，确认删除该标签?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let that = this;
            let data = {
                id: row.id,
                isDel: (row.isDead === 0 ||row.isDead === 2)? 1 : 0
            };
            that.componentsMoudel.startPost('governmentfill/updateLabelStatus', data, true).then((res) => {
                if (res.body.status_code === 100) {
                    that.$message.success('删除成功');
                    that.getInfoTable(this.currentPage, this.cpage);
                } else {
                    that.$message.error("删除失败");
                    that.getInfoTable(this.currentPage, this.cpage);
                }

            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });

    },

    // 分页1
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val;
        this.getInfoTable(this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getInfoTable(this.currentPage, this.cpage);
    },
}

root.mounted = function () {
    this.newIndex = this.$route.query.index;
    this.isActive = this.$route.query.isActive;
    this.getInfoTable();
}
FactoryComponents.initComponent(root);