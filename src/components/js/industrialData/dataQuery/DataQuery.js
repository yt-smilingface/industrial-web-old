import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'DataQuery';
root.data = {
    industrialAddedValue: '', //全局搜索框值
    dataQuerySearch: '', //数据查询
    dataQuerySearch1: '', //数据查询
    toggleButton: 0, //企业 统计切换
    enterpriseSelect: 2, // 企业选着数据
    statisticsSelect: 2, //  统计查询
    dataDirImg: [
        require('../../../../assets/industrialData/bigData/hgjjtjsj.png'),
        require('../../../../assets/industrialData/bigData/gyjjtjsj.png'),
        require('../../../../assets/industrialData/bigData/gyhytjsj.png'),
        require('../../../../assets/industrialData/bigData/ynsqysj.png')
    ],
    searchForData: {
        input1: '',
        enterpriseData: ['昆明钢铁', '红塔集团', '云南白药', '云南电网', '云南能投'],
        statisticsData: ['工业增加值', 'GDP', '营业收入', '价格指数'],
    }
}
root.methods = {
    //    企业普通查询
    generalQuery() {
        this.$router.push({
            path: '/dataConditionQuery',
            query: {
                dQS: this.dataQuerySearch,
                dQSS: this.enterpriseSelect
            }
        })
    },
    //    企业高级查询
    advancedSearch() {
        this.$router.push({
            path: '/dataConditionQuery',
            query: {
                dQS: '',
                dQSS: ''
            }
        })
    },
    // 统计数据查询
    statisticsInquire() {
        if (this.dataQuerySearch1 !== '') {
            this.$router.push({
                path: '/simpleQuery',
                query: {
                    dQS: this.dataQuerySearch1,
                }
            })
        } else {
            this.$message.error('查询条件不能为空');
        }
    },
    //统计数据高级查询
    statisticsAdvancedInquire() {
        this.$router.push({
            path: '/dataShowList',
        })
    },

    handleTo(path) {
        console.log(path);
        this.$router.push(path);
    },
    //    接收参数
    receiveParameters() {
        if (Object.keys(this.$route.query).length > 0) {
            if (this.$route.query.select === '0' || this.$route.query.select === '1') {
                this.toggleButton = 0
            } else {
                this.toggleButton = 1
            }
            this.dataQuerySearch = this.$route.query.input;
        } else {
            this.toggleButton = 0
        }
        if (this.$route.query.index === '6') {
            this.toggleButton = 0
        }

    },

    // 点击文字到输入框
    searchWord(item) {
        this.dataQuerySearch = item;
    },
    // 点击文字到输入框
    searchWord2(item) {
        this.dataQuerySearch1 = item;
    },

}

root.mounted = function () {
    this.receiveParameters();


}
FactoryComponents.initComponent(root);