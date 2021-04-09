import Vue from 'vue';
import FactoryComponents from '../../../../factory/components/FactoryComponents'

const root = {}
export default root
root.name = 'directCar';
root.components = {}

root.data = {
    newIndex: '',
    isActive: 0, //激活菜单的下标
    liArr: [ //左边菜单数据
        // {name:"企业填报",path:''},
        {
            name: "填报审核",
            path: '/makeReport/signAndHand'
        },
        {
            name: "填报进度查询",
            path: '/makeReport/signProgress'
        },
        {
            name: "填报表单",
            path: '/makeReport/signForm'
        },
        {
            name: "填报表单管理",
            path: "/makeReport/signCard"
        },
        {
            name: "企业标签管理",
            path: '/makeReport/signMeg'
        },
        {
            name: "企业直报总览",
            path: '/makeReport/directCar'
        }
    ],
    slotData: [],
    slotDataTwo: [{
        directoryName: '',
    }],
    activeName: '',
}
root.methods = {
    // 获取子集
    getMenu() {
        let that = this;
        let url = 'monitoring/getMenu/' + this.newIndex;
        this.componentsMoudel.startGet(url, {}, false).then(res => {
            that.slotDataTwo = res.body.data;
            that.slotData = res.body.data;
            for (let index = 0; index < this.slotData.length; index++) {
                let value = 'value'
                this.slotData[index][value] = this.slotData[index].directoryName;
            }
            this.activeName = String(this.slotData[0].id);
            if (this.isActive === 0) {
                this.handleActive(this.isActive, this.slotData[this.isActive].url);
            }
        })
    },
    // 
    handleActive(index, path) {
        this.isActive = index;
        this.$router.push({
            path,
            query: {
                index: this.newIndex,
                isActive: this.isActive
            }
        })
    }
}

root.mounted = function () {
    this.newIndex = this.$route.query.index;
    this.isActive = this.$route.query.isActive;
    if (this.isActive === undefined) {
        this.isActive = 0;
    }

    console.log(this.$route);
    this.getMenu();
}

root.watch = {
    $route(to, from) {
        this.liArr.map((item,index)=>{
            console.log(item.path);
            if(item.path==to.path){
                this.isActive=index;
            }
        })
    }
}
FactoryComponents.initComponent(root);