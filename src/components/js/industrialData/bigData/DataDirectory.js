import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'
import IndustrialBigData from "../../industrialData/IndustrialBigData"

const root = {}
export default root
root.name = 'DataDirectory';
root.data = {
    input2: '',
    dataDirImg: [
        require('../../../../assets/industrialData/bigData/hgjjtjsj.png'),
        require('../../../../assets/industrialData/bigData/gyjjtjsj.png'),
        require('../../../../assets/industrialData/bigData/gyhytjsj.png'),
        require('../../../../assets/industrialData/bigData/ynsqysj.png')
    ],
    // 数据类型
    DataType: [
    ],

    industrialEconomy: {},
    industryTwo: {},
    CorporateInformation: {},
}
root.methods = {
    getDirectoryInfo(){
        this.componentsMoudel.startGet('/dataDirectory/getDirectoryInfo',false).then((res) => {
            this.DataType = res.body.data;
        });
    },



    dataDirectoryQuery(LevelId,childId) {
        document.documentElement.scrollTop = 0; //跳转回到顶部
        this.$router.push({
            path: '/dataDirectoryQuery',
            query: {
                LevelId: LevelId,
                childId: childId
            }
        })
        console.log(LevelId)

    }
}

root.mounted = function () {
    this.getDirectoryInfo()

}
FactoryComponents.initComponent(root);