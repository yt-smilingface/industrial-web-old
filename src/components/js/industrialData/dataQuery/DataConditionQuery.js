import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'DataConditionQuery';
root.data = {
    areaList: [], //所属地区列表
    workList: [], //所属行业列表
    enterpriseList: [], //获取到的企业信息列表
    selectList: [{
            label: "综合",
            value: '1'
        },
        {
            label: "企业名称",
            value: 2
        },
        {
            label: "法定代表人",
            value: 3
        },
        {
            label: "股东",
            value: 4
        },
        {
            label: "董监高",
            value: 5
        },
        {
            label: "注册地址",
            value: 6
        },
        {
            label: "产权",
            value: 7
        }

    ], // 选择列表
    industrialAddedValue: '', //全局搜索框值
    dataQuerySearchInput: '', //高级查询输入框数据
    dataQuerySearch: '', //传参查询数据
    dataQuerySearchSelect: 'comprehensive', // 选着数据
    dataQuerySearchSelect1: '1', // 选着数据
    putAway: true, //   收起
    collapseFilter1: false, // 所属地区收起
    collapseFilter2: false, //  所属行业收起
    filter: {
        capital: '', //注册资本
        years: '', //成立年限
        status: '', //经营状态
        information: { //相关信息
            information1: '',
            information2: '',
            information3: '',
            information4: '',
            information5: '',
        },
        area: '', //所属地区
        industry: '', //所属行业
    },
    //企业数据
    tableDirectoryData: {
        enterpriseImg: require('../../../../assets/industrialData/dataQuery/enterpriseimg.png'),
        enterpriseIData: [{

        }]
    },
    // 分页数据
    pageSize: [10, 15, 20],
    currentPage: 1,
    cpage: 10,
    proptype: '',
    total: 0,
    //    关注
    attention: true,
}
root.methods = {
    //收起按钮
    putAwayS() {
        this.putAway = !(this.putAway);
    },
    //   高级查询地区收起
    collapseFilterButton1() {
        this.collapseFilter1 = !(this.collapseFilter1);
    },
    //  高级查询行业收起
    collapseFilterButton2() {
        this.collapseFilter2 = !(this.collapseFilter2);
    },

    //重置按钮
    resetForm() {
        this.filter = {
            capital: '', //注册资本
            years: '', //成立年限
            status: '', //经营状态
            information: { //相关信息
                information1: '',
                information2: '',
                information3: '',
                information4: '',
                information5: '',
            },
            area: '', //所属地区
            industry: '', //所属行业
        }
    },
    // 分页
    handleSizeChange(val) {

        this.cpage = val;
        this.handleSelect(1, this.currentPage, this.cpage);
    },
    handleCurrentChange(val) {
        console.log(11);
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.currentPage = val;
        this.handleSelect(1, this.currentPage, this.cpage);
    },
    //查看企业详情
    enterpriseDetails(id, info) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/enterpriseDetails',
            query: {
                Id: id,
                info
            }
        })
    },
    //条件搜索1
    //curPage：当前页limit :每页数量
    handleSelect(a = 1, curPage = 1, limit = 10) {
        let data = {
            "capitalType": this.filter.capital,
            "yearsType": this.filter.years,
            "status": this.filter.status,
            "areaId": this.filter.area,
            "industry": this.filter.industry,
            curPage,
            limit,
            "searchParam": this.dataQuerySearchInput,
            "searchType": this.dataQuerySearchSelect1
        }
        this.componentsMoudel.startPost('/dataQuery/getEnterpriseInfoByParam', data, false).then((res) => {
            this.tableDirectoryData.enterpriseIData = res.body.data;
            // console.log(this.tableDirectoryData.enterpriseIData);
            this.total = res.body.cum;
            // dataQuery/saveAttentionCompany
        });
    },

    handleClick() {
        console.log(111);
    },
    handleAttention(isAttention, bbd_qyxx_id) {
        let data = {
            isAttention,
            bbd_qyxx_id
        }
        this.componentsMoudel.startPost('dataQuery/saveAttentionCompany', data, false).then((res) => {
            if (res.code == 100) {
                this.handleSelect(1, 1, 10);
            }
        });
    }
}

root.mounted = function () {
    //获取路由Id
    this.dataQuerySearch = this.$route.query.dQS;
    this.dataQuerySearchSelect = this.$route.query.dQSS;
    this.dataQuerySearchSelect1 = this.$route.query.dQSS;
    this.dataQuerySearchInput = this.$route.query.dQS;
    this.handleSelect(1, 1, 10);
    this.dataQuerySearchSelect1 = this.dataQuerySearchSelect;
    let data = {};
    //获取所属地区列表
    this.componentsMoudel.startGet('/dataQuery/getAreaListByProvinceName', data, false).then((res) => {
        this.areaList = res.body.data;
    });

    //获取所属行业
    this.componentsMoudel.startGet('/dataQuery/getIndustryList', data, false).then((res) => {
        this.workList = res.body.data;
    });

}
FactoryComponents.initComponent(root);