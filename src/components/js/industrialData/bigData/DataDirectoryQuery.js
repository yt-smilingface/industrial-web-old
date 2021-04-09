import {
    push
} from 'core-js/fn/array';
import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'DataDirectoryQuery';
root.data = {
    industrialAddedValue: '', //全局搜索框值
    dataDirectoryId: '', //传参值
    //搜索框值
    basicDatabase: {
        basicDatabaseValue: {
            directoryOne: 0,
            twoId: '',
            threeId: '',
            fourId: '',
            dataItemName: '',
            dataType: 0,
            dataSource: '全部',
            fre: 0,
            area: 0,
            limit: 10,
            curPage: 1
        },
        basicDatabaseValueCopy: '',
        //第二批选择数据
        basicOption: [
            [{
                value: 0,
                label: '基础数据'
            }, ],
            [{
                id: 0,
                name: '全部'
            }],
            [],
            [],
            [{
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '数值型'
            }, ], //六级
            [{
                value: '全部',
                label: '全部'
            }],
            [{
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '月度'
            }, {
                value: 2,
                label: '季度'
            }, {
                value: 3,
                label: '年度'
            }],
            [{
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '地州'
            }, {
                value: 2,
                label: '分省'
            }, {
                value: 3,
                label: '全国'
            }],
        ],
        basicOptionThreeId: 0,
    },
    //表格数据
    tableDirectoryData: [],
    // 分页数据
    pageSize: [10, 15, 20],
    currentPage: 1,
    cpage: 10,
    proptype: '',
    total: 0

}
root.methods = {
    dataDirectoryGetNextDirectoryInfo(data, id) {

    },
    // 联动
    selectNative(data, id) {
        console.log(id);
        const that = this;
        this.basicDatabase.basicDatabaseValue.twoId = Number(this.$route.query.LevelId);
        if (this.$route.query.childId === undefined) {
            this.basicDatabase.basicDatabaseValue.threeId = '';
        } else {
            this.basicDatabase.basicDatabaseValue.threeId = Number(this.$route.query.childId);
        }
        if (Number(that.$route.query.LevelId) === 870) {
            that.basicDatabase.basicOptionThreeId = 3
        } else {
            that.basicDatabase.basicOptionThreeId = that.$route.query.LevelId - 1;
        }
        this.componentsMoudel.startGet('/dataDirectory/getDirectoryInfo', data, false).then((res) => {
            res.body.data.forEach((item, index) => {
                that.basicDatabase.basicOption[id].push(item);
                that.basicDatabase.basicOption[2].push(item.childrens);
            })
        });
    },
    //根据二级目录获取三级目录2
    selectNativeThree(id) {
        const that = this;
        if (id > 0) {
            that.basicDatabase.basicOptionThreeId = id - 1;
        }
        if (id === 870) {
            that.basicDatabase.basicOptionThreeId = 3
        }
        if (id) {
            that.basicDatabase.basicDatabaseValue.threeId = that.basicDatabase.basicOption[2][that.basicDatabase.basicOptionThreeId].id
        }
        if (id === 0) {
            console.log(that.basicDatabase.basicOption[2][that.basicDatabase.basicOptionThreeId]);
            that.basicDatabase.basicDatabaseValue.threeId = that.basicDatabase.basicOption[2][that.basicDatabase.basicOptionThreeId].id
            that.basicDatabase.basicOptionThreeId = -1
        }
        that.basicDatabase.basicDatabaseValue.fourId = '';
    },
    // 根据三级目录选择四级目录
    selectNativeFour(id) {
        let that = this;
        that.basicDatabase.basicDatabaseValue.fourId = '';
        that.componentsMoudel.startGet('dataDirectory/getNextDirectoryInfo/' + id, false).then((res) => {
            that.$set(that.basicDatabase.basicOption, 3, res.body.data);
        });
    },
    // 获取数据来源
    getDataSource() {
        let that = this;
        that.componentsMoudel.startGet('dataDirectory/getDataSource', false).then((res) => {
            res.body.data.forEach((item, index) => {
                let dataSourceS = {
                    label: item,
                    value: item,
                }
                that.basicDatabase.basicOption[5].push(dataSourceS)
            })
        });
    },

    //重置
    resetForm() {
        this.basicDatabase.basicDatabaseValue = {
            directoryOne: 0,
            twoId: '',
            threeId: '',
            fourId: '',
            dataItemName: '',
            dataType: 0,
            dataSource: '全部',
            fre: 0,
            area: 0,
        }
    },

    // 分页
    handleSizeChange(val) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.cpage = val
        this.handleSelect(1, this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.currentPage = val;
        this.handleSelect(1, this.currentPage, this.cpage);
    },
    //curPage：当前页limit :每页数量   获取指标数据
    handleSelect(a = 1, curPage = 1, limit = 10) {
        const that = this
        let data = {
            'directoryOne': this.basicDatabase.basicDatabaseValue.directoryOne,
            'twoId': this.basicDatabase.basicDatabaseValue.twoId,
            'threeId': this.basicDatabase.basicDatabaseValue.threeId,
            'fourId': this.basicDatabase.basicDatabaseValue.fourId,
            'dataItemName': this.basicDatabase.basicDatabaseValue.dataItemName,
            'dataType': this.basicDatabase.basicDatabaseValue.dataType,
            'dataSource': this.basicDatabase.basicDatabaseValue.dataSource,
            'fre': this.basicDatabase.basicDatabaseValue.fre,
            'area': this.basicDatabase.basicDatabaseValue.area,
            limit,
            curPage
        }
        this.componentsMoudel.startPost('/dataDirectory/getDetailData', data, false).then((res) => {
            that.tableDirectoryData = res.body.data;
            that.total = res.body.cum;

        });
    },


}

root.mounted = function () {
    this.selectNative(this.basicDatabase.basicDatabaseValue.directoryOne, 1);
    // this.selectNative(this.basicDatabase.basicDatabaseValue.twoId,2);
    this.handleSelect(1, 1, 10);
    this.getDataSource();

}
FactoryComponents.initComponent(root);