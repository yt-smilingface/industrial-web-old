import Vue from 'vue'
import VueRouter from 'vue-router'
// import {Loading} from "element-ui";
// Vue.use(VueRouter)
import Login from '../template/Login'
import Home from '../template/Home'


// 个人中心主页
import personalCenterInfo from '../template/director/personalCenterInfo'
import newsList from '../template/director/newsList'

//  个人中心
import AccountInformation from '../template/personalCenter/AccountInformation'
import ChangePassword from '../template/personalCenter/ChangePassword'
import Notification from '../template/personalCenter/Notification'


//宏观运行监测
import MacroMonitor from '../template/moveMonitor/MacroMonitor.vue'
import GrossProduct from '../template/moveMonitor/macro/total/GrossProduct.vue'

import IndustrialBigData from '../template/industrialData/IndustrialBigData'

import ConsumptionExponent from '../template/moveMonitor/macro/exponent/ConsumptionExponent.vue'

import FactoryMonitor from '../template/moveMonitor/macro/factoryMonitor/FactoryMonitor.vue'
import Purchase from '../template/moveMonitor/macro/purchase/Purchase.vue'
import AssetInvestment from '../template/moveMonitor/macro/assetInvestment/AssetInvestment.vue'
import ExitAndEntrance from '../template/moveMonitor/macro/exitAndEntrance/ExitAndEntrance.vue'
import SocialConsumerGoods from '../template/moveMonitor/macro/socialConsumerGoods/SocialConsumerGoods.vue'
import EnergyConsumption from '../template/moveMonitor/macro/energyConsumption/EnergyConsumption.vue'
import EnergyProduce from '../template/moveMonitor/macro/energyProduce/EnergyProduce.vue'
import BalanceLoan from '../template/moveMonitor/macro/balanceLoan/BalanceLoan.vue'

//工业运行监测
import IndustryMonitor from '../template/moveMonitor/IndustryMonitor.vue'
import IndustryValueAdd from '../template/moveMonitor/industry/economicTotal/IndustryValueAdd.vue'
import IndustryValueNum from '../template/moveMonitor/industry/economicTotal/IndustryValueNum.vue'
import ProductOutput from '../template/moveMonitor/industry/product/ProductOutput.vue'
import ProductSell from '../template/moveMonitor/industry/product/ProductSell.vue'
import TotalProfit from '../template/moveMonitor/industry/benefit/TotalProfit.vue'
import OperatingIncome from '../template/moveMonitor/industry/benefit/OperatingIncome.vue'
import AssetsTotal from '../template/moveMonitor/industry/benefit/AssetsTotal.vue'
import Situation from '../template/moveMonitor/industry/invested/Situation.vue'
import Fabric from '../template/moveMonitor/industry/fabric/Fabric.vue'
import ImportProduct from '../template/moveMonitor/industry/invested/ImportProduct.vue'
import ProductInfo from '../template/moveMonitor/industry/invested/productInfo.vue'
import ProductInfo2 from '../template/moveMonitor/industry/invested/productInfo2.vue'
//工业行业运行监测
import Business from '../template/moveMonitor/Business.vue';
import BusinessInfo from '../template/moveMonitor/business/BusinessInfo.vue';

//重点产业运行监测
import Estate from '../template/moveMonitor/Estate.vue';
import EstateInfo from '../template/moveMonitor/estate/EstateInfo.vue';

// 智能报告  
import SmartReport from '../template/moveMonitor/SmartReport.vue';
import EditingReports from '../template/moveMonitor/smartReport/EditingReports.vue';
import ViewReport from '../template/moveMonitor/smartReport/ViewReport.vue';


//大数据中心
//数据目录
import DataDirectory from '../template/industrialData/bigData/DataDirectory'
import DataDirectoryQuery from '../template/industrialData/bigData/DataDirectoryQuery'
//数据查询
//  企业数据查询
import DataQuery from '../template/industrialData/dataQuery/DataQuery'
import DataConditionQuery from '../template/industrialData/dataQuery/DataConditionQuery'
import EnterpriseDetails from '../template/industrialData/dataQuery/EnterpriseDetails' //企业详情
import AnnualReport from '../template/industrialData/dataQuery/EnterpriseDetails/AnnualReport' //企业年报详情

//  统计数据查询
import SimpleQuery from '../template/industrialData/dataQuery/statisticsInquire/SimpleQuery'
import DataShowList from '../template/industrialData/dataQuery/statisticsInquire/DataShowList'
//  数据总览
import Consideration from '../template/industrialData/dataConsideration/consideration.vue'

//政企直通车
import DirectCar from '../template/directCar/makeReport/directCar'
import MakeReport from '../template/directCar/makeReport/makeReport'
import SignAndHand from '../template/directCar/makeReport/signAndHand'
import FillAuditDetails from '../template/directCar/makeReport/FillAuditDetails' //审核详情
import SignMeg from '../template/directCar/makeReport/signMeg'
import SignMegDetails from '../template/directCar/makeReport/SignMegDetails'
import SignCard from '../template/directCar/makeReport/signCard'
import SignCardLook from '../template/directCar/makeReport/SignCardLook'
import SignProgress from '../template/directCar/makeReport/signProgress'
import SignProgressLook from '../template/directCar/makeReport/SignProgressLook'
import SignForm from '../template/directCar/makeReport/signForm'
import ShowForm from '../template/directCar/makeReport/ShowForm'
import Interact from '../template/directCar/Interact/Interact'
import ShowInteract from '../template/directCar/Interact/ShowInteract'

// 系统管理
import Department from "../template/systemManagement/Department.vue"
import UserManagement from '../template/systemManagement/UserManagement.vue'
import AddDepartment from '../template/systemManagement/AddDepartment.vue'
import DepartmentDetails from '../template/systemManagement/DepartmentDetails.vue'
import LeadershipManagement from '../template/systemManagement/LeadershipManagement.vue'
import DepartmentManage from '../template/systemManagement/DepartmentManage.vue'

import Management from '../template/projectManagement/Management'

// 政企互动
import interactList from '../template/directCar/Interact/interactList'

// 热点研报
import researchReport from '../template/director/researchReport'

// 更新日志
import updateLog from '../template/director/updateLog'


const config = []
export default config
config.push({
    path: '/',
    component: Login
})

config.push({ //
    path: '/home',
    component: Home,
    meta: {
        CName: '首页'
    },
    children: [
        {
            path: '',
            name: 'personalCenterInfo',
            component: personalCenterInfo,
            meta: {
                CName: '个人中心'
            }
        },
        {
            path: '/interactList',
            name: 'interactList',
            component: interactList,
            meta: {
                CName: '政企互动'
            }
        },
        {
            path: '/newsList',
            name: 'newsList',
            component: newsList,
            meta: {
                CName: '咨询'
            }
        },

    {
            path: '/accountInformation',
            name: 'AccountInformation',
            component: AccountInformation,
            meta: {
                CName: '个人中心>账户信息'
            }
        }, {
            path: '/changePassword',
            name: 'ChangePassword',
            component: ChangePassword,
            meta: {
                CName: '个人中心>修改密码'
            }
        }, {
            path: '/notification',
            name: 'Notification',
            component: Notification,
            meta: {
                CName: '个人中心>消息列表'
            }
        }, {
            path: '/macroMonitor',
            name: 'MacroMonitor',
            component: MacroMonitor,
            meta: {
                CName: '宏观运行监测'
            },
            children: [{
                    path: 'grossProduct',
                    component: GrossProduct,
                    meta: {
                        CName: '地区生产总值'
                    }
                },
                {
                    path: 'consumptionExponent',
                    component: ConsumptionExponent,
                    meta: {
                        CName: '居民消费价格指数'
                    }
                },
                {
                    path: 'factoryMonitor',
                    component: FactoryMonitor,
                    meta: {
                        CName: '工业生产者出厂价格指数'
                    }
                },
                {
                    path: 'purchase',
                    component: Purchase,
                    meta: {
                        CName: '采购经理人指数'
                    }
                },
                {
                    path: 'assetInvestment',
                    component: AssetInvestment,
                    meta: {
                        CName: '固定资产投资'
                    }
                },
                {
                    path: 'socialConsumerGoods',
                    component: SocialConsumerGoods,
                    meta: {
                        CName: '社会消费品零售总额'
                    }
                },
                {
                    path: 'exitAndEntrance',
                    component: ExitAndEntrance,
                    meta: {
                        CName: '进出口总额'
                    }
                },
                {
                    path: 'energyConsumption',
                    component: EnergyConsumption,
                    meta: {
                        CName: '能源消费'
                    }
                },
                {
                    path: 'energyProduce',
                    component: EnergyProduce,
                    meta: {
                        CName: '能源生产'
                    }
                },
                {
                    path: 'balanceLoan',
                    component: BalanceLoan,
                    meta: {
                        CName: '余额贷款'
                    }
                },
            ]
        },
        {
            path: '/industryMonitor',
            name: 'IndustryMonitor',
            component: IndustryMonitor,
            meta: {
                CName: '工业经济运行监测'
            },
            children: [{
                    path: 'industryValueAdd',
                    component: IndustryValueAdd,
                    meta: {
                        CName: '规模以上工业增加值'
                    }
                },
                {
                    path: 'industryValueNum',
                    component: IndustryValueNum,
                    meta: {
                        CName: '规模以上工业企业数'
                    }
                },
                {
                    path: 'fabric',
                    component: Fabric,
                    meta: {
                        CName: '分行业增加值'
                    }
                },
                {
                    path: 'productOutput',
                    component: ProductOutput,
                    meta: {
                        CName: '主要产品产量'
                    }
                },
                {
                    path: 'productSell',
                    component: ProductSell,
                    meta: {
                        CName: '产品销售率'
                    }
                },
                {
                    path: 'totalProfit',
                    component: TotalProfit,
                    meta: {
                        CName: '利润总额'
                    }
                },
                {
                    path: 'operatingIncome',
                    component: OperatingIncome,
                    meta: {
                        CName: '营业收入'
                    }
                },
                {
                    path: 'assetsTotal',
                    component: AssetsTotal,
                    meta: {
                        CName: '资产总计'
                    }
                },
                {
                    path: 'situation',
                    component: Situation,
                    meta: {
                        CName: '工业投资整体情况'
                    }
                },
                {
                    path: 'importProduct',
                    component: ImportProduct,
                    meta: {
                        CName: '工业重点项目'
                    }
                }, {
                    path: 'productInfo',
                    component: ProductInfo,
                    meta: {
                        CName: '专项资金项目详情'
                    }
                }, {
                    path: 'productInfo2',
                    component: ProductInfo2,
                    meta: {
                        CName: '投资项目详情'
                    }

                }
            ]
        },
        {
            path: '/business',
            name: 'Business',
            component: Business,
            meta: {
                CName: '工业行业运行监测'
            },
            children: [{
                path: 'businessInfo',
                component: BusinessInfo,
                meta: {
                    CName: '工业行业运行监测详情'
                }
            }]

        }, {
            path: '/estate',
            name: 'Estate',
            component: Estate,
            meta: {
                CName: '重点产业运行监测'
            },
            children: [{
                path: 'estateInfo',
                component: EstateInfo,
                meta: {
                    CName: '重点产业运行监测详情'
                }
            }]

        }, {
            path: '/smartReport',
            name: 'SmartReport',
            component: SmartReport,
            meta: {
                CName: '智能报告'
            },
        }, {
            path: '/editingReports',
            name: 'EditingReports',
            component: EditingReports,
            meta: {
                CName: '编辑智能报告'
            },
        }, {
            path: '/viewReport',
            name: 'ViewReport',
            component: ViewReport,
            meta: {
                CName: '查看智能报告'
            },
        },
        // 
        {
            path: '/dataDirectory',
            name: 'DataDirectory',
            component: DataDirectory,
            meta: {
                CName: '工业经济大数据中心>数据目录>基础数据库'
            },

        },
        {
            path: '/dataDirectoryQuery',
            component: DataDirectoryQuery,
            meta: {
                CName: '工业经济大数据中心>数据目录>基础数据库查询'
            }
        },
        {
            path: '/dataQuery',
            component: DataQuery,
            meta: {
                CName: '工业经济大数据中心>数据查询'
            }
        },
        {
            path: '/dataConditionQuery',
            component: DataConditionQuery,
            meta: {
                CName: '工业经济大数据中心>数据查询'
            }
        },
        {
            path: '/consideration',
            component: Consideration,
            meta: {
                CName: '工业经济大数据中心>数据资产总览'
            }
        }, {
            path: '/enterpriseDetails',
            component: EnterpriseDetails,
            meta: {
                CName: '工业经济大数据中心>数据查询>企业详细信息'
            }
        }, {
            path: '/annualReport',
            component: AnnualReport,
            meta: {
                CName: '工业经济大数据中心>数据查询>企业年报详情'
            }
        }, {
            path: '/simpleQuery',
            component: SimpleQuery,
            meta: {
                CName: '工业经济大数据中心>统计数据查询'
            }
        }, {
            path: '/dataShowList',
            component: DataShowList,
            meta: {
                CName: '工业经济大数据中心>统计数据高级查询'
            }
        },
        //   政企直通车》填报管理
        {
            path: '/makeReport',
            component: MakeReport,
            meta: {
                CName: '企业直报'
            },
            children: [{
                path: '/makeReport/signAndHand',
                component: SignAndHand,
                meta: {
                    CName: '填报审核'
                }
            }, {
                path: '/makeReport/fillAuditDetails',
                component: FillAuditDetails,
                meta: {
                    CName: '填报审核详情'
                }
            }, {
                path: '/makeReport/signMeg',
                component: SignMeg,
                meta: {
                    CName: '企业标签管理'
                },
            }, {
                path: '/makeReport/signMegDetails',
                component: SignMegDetails,
                meta: {
                    CName: '企业标签详情'
                },
            }, {
                path: 'signCard',
                component: SignCard,
                meta: {
                    CName: '填报表单管理'
                },
            }, {
                path: 'signCardLook',
                component: SignCardLook,
                meta: {
                    CName: '填报表单管理详情'
                },
            }, {
                path: '/makeReport/signProgress',
                component: SignProgress,
                meta: {
                    CName: '填报进度查询'
                },
            }, {
                path: '/makeReport/signProgressLook',
                component: SignProgressLook,
                meta: {
                    CName: '填报进度查询查看'
                },
            }, {
                path: '/makeReport/signForm',
                component: SignForm,
                meta: {
                    CName: '填报表单'
                }
            }, {
                path: '/makeReport/ShowForm',
                component: ShowForm,
                meta: {
                    CName: '填报表单详情'
                }
            }, {
                path: '/makeReport/directCar',
                component: DirectCar,
                meta: {
                    CName: '政企直通车>企业直报总览'
                }
            }]
        },
        //政企直通车》政企互动
        {
            path: '/interact',
            component: Interact,
            meta: {
                CName: '政企直通车>政企互动'
            },
        }, {
            path: '/showInteract',
            component: ShowInteract,
            meta: {
                CName: '政企直通车>政企互动'
            },
        },
        //系统管理  
        {
            path: '/department',
            component: Department,
            meta: {
                CName: '系统管理>部门管理'
            },
        }, {
            path: '/addDepartment',
            component: AddDepartment,
            meta: {
                CName: '系统管理>新增部门'
            },
        }, {
            path: '/departmentDetails',
            component: DepartmentDetails,
            meta: {
                CName: '系统管理>部门权限管理'
            },
        }, {
            path: '/userManagement',
            component: UserManagement,
            meta: {
                CName: '系统管理>用户管理'
            },
        }, {
            path: '/leadershipManagement',
            component: LeadershipManagement,
            meta: {
                CName: '系统管理>用户管理>领导管理'
            }
        }, {
            path: '/departmentManage',
            component: DepartmentManage,
            meta: {
                CName: '系统管理>用户管理>处室管理'
            }
        },
        //项目管理
        {
            path: '/management',
            component: Management,
            meta: {
                CName: '项目管理'
            }
        },
        //热点研报
        {
            path: '/researchReport',
            component: researchReport,
            meta: {
                CName: '热点研报'
            }
        },
        //更新日志
        {
            path: '/updateLog',
            component: updateLog,
            meta: {
                CName: '更新日志'
            }
        }

    ]
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}