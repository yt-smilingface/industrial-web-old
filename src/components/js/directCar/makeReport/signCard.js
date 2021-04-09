import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'signCard';
root.components = {}

root.data = {
    newIndex: '',
    isActive: '',

    //表格信息
    tableData: [],
    tableDataTwo: [],

    // 分页数据 表格1
    pageSize: [5, 10, 15, 20],
    currentPage: 1,
    cpage: 5,
    total: 0,

    // 分页数据 表格2
    currentPage2: 1,
    cpage2: 10,
    total2: 0,
}
root.methods = {
    //删除
    async handleDel(id) {
        this.$confirm('此操作将永久删除该表单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            let res = await this.componentsMoudel.startPost('governmentfill/deleteFill', {
                id
            }, false);
            if (res.body.status_code == 100) {
                this.$message('删除成功');
                this.getDepFillPage();
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
    },
    getDepFillPage(curPage = 1, limit = 10) {
        let that = this;
        let data = {
            curPage,
            limit
        }
        that.componentsMoudel.startPost('governmentfill/getDepFillPage', data, false).then(res => {
            that.tableDataTwo = res.body.data;
            that.total2 = res.body.cum;
        })
    },


    // 新增
    saveFill() {
        this.$router.push({
            path: '/makeReport/signCardLook',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                indexType: 0
            }
        })
    },
    // 查看
    handleClick(row) {
        this.$router.push({
            path: '/makeReport/signCardLook',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                indexType: 1,
            }
        });
        this.componentsMoudel.openLocalStorage("sCardLook");
        this.componentsMoudel.setData("signCard", row);
    },
    // 编辑
    modifyClick(row) {
        this.$router.push({
            path: '/makeReport/signCardLook',
            query: {
                index: this.newIndex,
                isActive: this.isActive,
                indexType: 2,
            }
        });
        this.componentsMoudel.openLocalStorage("sCardLook");
        this.componentsMoudel.setData("signCard", row);
    },

    // 
    updateStatus(row) {
        let that = this;
        let isDead = (row.isDead == 0 || row.isDead == 2) ? 1 : 2;
        let data = {
            id: row.id,
            isDead,
        }
        that.componentsMoudel.startPost('governmentfill/updateStatus', data, true).then((res) => {
            if (res.body.status_code === 100) {
                that.$message.success('修改成功');
                that.getDepFillPage();
            } else {
                that.$message.error("修改失败");
            }
        })
    },
    // 分页1
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cpage = val;
        // this.getDepFillPage(this.currentPage, this.cpage2);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        // this.getDepFillPage(this.currentPage2, this.cpage2);
    },
    // 分页2
    handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
        this.cpage2 = val;
        this.getDepFillPage(this.currentPage2, this.cpage2);
    },
    handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.currentPage2 = val;
        this.getDepFillPage(this.currentPage2, this.cpage2);
    },
}

root.mounted = function () {
    this.newIndex = this.$route.query.index;
    this.isActive = this.$route.query.isActive;
    this.getDepFillPage();



}
FactoryComponents.initComponent(root);