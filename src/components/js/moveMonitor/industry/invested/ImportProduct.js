import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
import Plank from '../../../../template/moveMonitor/plank/Plank.vue';
import ChangeTrend from '../../../../template/moveMonitor/changeTrend/ChangeTrend.vue';
import AreaInfo from '../../../../template/moveMonitor/areaInfo/AreaInfo.vue';
import IndustrialDistribution from '../../../../template/moveMonitor/industrialDistribution/IndustrialDistribution.vue';
const root = {}
root.components = {
    Plank,
    ChangeTrend,
    AreaInfo,
    IndustrialDistribution
} //调用Echarts
export default root
//工业运行监测-工业投资整体情况
root.name = 'situation';
root.data = {
    inputInfo: {
        //专项名称
        name: '',
        //企业名称
        companyName: "",
        //申报方向
        reportingDirection: "",
        //所属行业
        industryType: "",
        occupationOptions: [],
        //项目总投资
        totalInvestment: "",

        //项目开始时间
        actualStartTime: "",

        reviewStatus: "",
        limit: 10,
        currentPage: 1,
    },
    inputInfo2: {
        //专项名称
        name: '',
        //企业名称
        enterpriseName: "",
        //申报方向
        reportingDirection: "",
        //所属行业
        belongIndustry: "",
        occupationOptions: [],
        //项目总投资
        projectInvestment: "",
        //项目开始时间
        starTime: "",
        projectApprovalStatus: "",
        limit: 10,
        currentPage: 1,
    },
    //总数
    total: 20,
    total2: 20,
    //表单数据
    tableData: [{
        num: 1,
        name: "项目1",
        address: '类型1'
    }],
    tableData2: [{
        num: 1,
        name: "项目1",
        address: '类型1'
    }],
    //plank tab页显示标题
    slotData: [{
            value: '专项资金',
            data: [{
                title: '云南省投资增速变化趋势',
                id: 0,
                model: {
                    //当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
                    id: 1,
                    url: 'estate/getDropDownData',
                    //是否开启时间选择器
                    openTimeChoose: true,
                },
            }],
            //变化趋势接口
            url: ['changeTrend/getChangeTrend'],
            //1-地州，2-分省，3-全国
            area: 2,
            // 1-月度，2-季度，3-年度
            fre: 2,
            //是否获取所有指标数据(0:否，1:是)
            isAllIndex: 1,
            //是否获取全国数据(0:否，1:是)
            hasQuanGuo: 0
        },
        {
            value: '投资项目',
            data: [{
                title: '云南省投资增速变化趋势',
                id: 0,
                model: {
                    //当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
                    id: 1,
                    url: 'estate/getDropDownData',
                    //是否开启时间选择器
                    openTimeChoose: true,
                },
            }],
            //变化趋势接口
            url: ['changeTrend/getChangeTrend'],
            //1-地州，2-分省，3-全国
            area: 2,
            // 1-月度，2-季度，3-年度
            fre: 2,
            //是否获取所有指标数据(0:否，1:是)
            isAllIndex: 1,
            //是否获取全国数据(0:否，1:是)
            hasQuanGuo: 0
        }, {
            value: '区域分布',
            data: [{
                title: '云南省工业重点项目区域分布',
                id: 1,
                model: {
                    //当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
                    id: 1,
                    url: 'estate/getDropDownData',
                    //是否开启时间选择器
                    openTimeChoose: false,
                },
            }],
            url: ['regionalDistribution/getAreaMap', 'regionalDistribution/projectType'],
            fre: 1,
            area: 1,
        }, {
            value: '行业分布',
            data: [{
                title: '云南省工业重点项目行业分布',
                id: 5,
                model: {
                    //当前title模式, 0:只显示标题; 1:需要加载指标; 2:加载的指标有两个
                    id: 1,
                    url: 'estate/getDropDownData',
                    //是否开启时间选择器
                    openTimeChoose: false,
                },
            }],
            url: ['industrialDistribution/industryStatistics', 'industrialDistribution/listData'],
            fre: 1,
            area: 1,
        }
    ],

    //当前tab页
    thisTab: {},
}

root.methods = {

    //tab页切换
    tabChange: function (tab, event) {
        this.thisTab = tab;
    },

    //点击了下载按钮
    clickDownload: function (data, refPlank) {

    },


    //plank右上角状态切换
    checkoutChange: function (status, data, refPlank) {

    },

    handleChangePage(page) {
        this.inputInfo.page = page;
    },

    responseInit(initData) {
        return {};
    },

    handleClick(info) {
        this.$router.push({
            path: '/industryMonitor/productInfo',
            query: {
                id: info.id
            }
        })
    },

    handleClick2(info) {
        this.$router.push({
            path: '/industryMonitor/productInfo2',
            query: {
                id: info.id
            }
        })
    },

    getSelectInfo() {
        let that = this;
        //查询行业大类（下拉框）
        that.componentsMoudel.startPost('specificFund/selectCategory', {}, false).then((res) => {
            res.body.data.forEach((item, index) => {
                item.value = item.code;
                item.label = item.category;
            })
            this.inputInfo.occupationOptions = res.body.data;
        })
    },
    //查询
    hanleSelectInfo() {
        let that = this;
        this.componentsMoudel.startPost('specificFund/queryPageData', this.inputInfo, false).then((res) => {
            that.tableData = res.body.data;
            that.total = res.body.cum;
        })
    },
    //查询2
    hanleSelectInfo2() {
        let that = this;
        this.componentsMoudel.startPost('investment/queryPageData', this.inputInfo2, false).then((res) => {
            that.tableData2 = res.body.data;
            that.total2 = res.body.cum;
        })
    },
    //清空
    handleClear() {
        this.inputInfo = {
            //专项名称
            name: '',
            //企业名称
            companyName: "",
            //申报方向
            reportingDirection: "",
            //所属行业
            industryType: "",
            occupationOptions: [],
            //项目总投资
            totalInvestment: "",
            //项目开始时间
            actualStartTime: "",
            reviewStatus: "",
        }
        this.inputInfo2 = {
            //专项名称
            programName: '',
            //企业名称
            enterpriseName: "",
            //申报方向
            reportingDirection: "",
            //所属行业
            belongIndustry: "",
            occupationOptions: [],
            //项目总投资
            projectInvestment: "",
            //项目开始时间
            starTime: "",
            projectApprovalStatus: "",
            limit: 10,
            currentPage: 1,
        }
        this.getSelectInfo();
    }

}

root.mounted = function () {

    this.hanleSelectInfo();
    this.hanleSelectInfo2();

    //查询行业大类（下拉框）
    this.getSelectInfo();
}
FactoryComponents.initComponent(root);