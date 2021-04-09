import Vue from 'vue';
import FactoryComponents from '../../../../../factory/components/FactoryComponents';
import LeftMenu from "../../../../template/menu/LeftMenu.vue";
import ECharts from 'vue-echarts';

import FileSaver from "file-saver";
import XLSX from "xlsx";


const root = {}
root.components = {
    LeftMenu,
    ECharts
};
export default root
root.name = 'DataShowList';
root.data = {
    inputInfo: '', //搜索框的值
    switchButton: false,
    //左侧请求
    menuTitleId: {
        area: 0, //地区     0 -云南省  1-地州，2-分省，3-全国
        fre: 2, //时间     1-月度，2-季度，3-年度
        areaCode: '',
        timeNum: 5,
        id: 126,
    },
    //  导航指标选择
    timeNumOptions: [
        [{
            value: 3,
            label: '最近3月'
        }, {
            value: 6,
            label: '最近6月'
        }, {
            value: 12,
            label: '最近12月'
        }],
        [{
            value: 3,
            label: '最近3季度'
        }, {
            value: 6,
            label: '最近6季度'
        }, {
            value: 12,
            label: '最近12季度'
        }],
        [{
            value: 5,
            label: '最近5年'
        }, {
            value: 10,
            label: '最近10年'
        }, {
            value: 20,
            label: '最近20年'
        }],
    ],
    areaCodeOptions: [], // 全国，地区选择框数据
    chartSwitchingData: 0, //图表样式切换数据
    chartSwitching: [{ // 图表样式切换
        value: 0,
        label: '柱状图'
    }, {
        value: 1,
        label: '折线图'
    }],

    //左边菜单标签
    menuTitle: {
        data: [],
        //选中的菜单
        chooseItem: {},
        //    填报内容表单添加数据
    },

    isActive: 0, //tab选项卡的默认初始激活值
    menuInfo: ['云南省数据', '云南省各州市数据', '全国数据', '其他省市数据'], //导航菜单参数
    dataInfo: { //  echarts图表数据
        echartsData: {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#F5EED6', '#FF9F7F', '#F6DFD7', '#FB7293', '#F5D4DC', '#E062AE', '#EDC9DF', '#E7BCF3', '#9D96F5', '#96BFFF', '#9ACDE7', '#FFDB5C', ],
            legend: {
                data: [],
                bottom: 0,
                left: 'center',
                textStyle: {}
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: [],
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                splitNumber: 4,
            }, {
                type: 'value',
                // interval: 10,
                axisLabel: {
                    formatter: '{value}%'
                },
                splitNumber: 3,
            }],
            series: []
        },
        title: '数据来源结构'
    },
    tableData: [], //   表格数据
    tableDataTitle: [], //   表格title数据
    multipleSelection: [], //默认选项
    checkedList: [ //   选择列是否选中
        true, true, true, true,
    ],
    //    进入页面初始化菜单值
    initializationData: {
        gmtCreate: "2020-09-25 16:02:10",
        id: 190,
        level: 3,
        name: "按行业分国有经济能源工业固定资产投资",
        parentId: "13",
        status: 1,
    },
    //
    multipleSelection: [],
    // 下载信息
    XlsxTitle: '',
    XlsxSource: '',
    XlsxDate: '',

}

root.computed = {

}

root.methods = {
    //点击获取左侧菜单
    getLeftDataBySelect(area, fre) {
        const that = this;
        this.menuTitleId.area = area;
        this.menuTitleId.fre = fre + 1;
        let data = {
            'area': this.menuTitleId.area,
            'fre': this.menuTitleId.fre,
        }
        this.componentsMoudel.startPost('dataQuery/getLeftDataBySelect', data, false).then(res => {

            let directoryName = '';
            that.menuTitle.data = [];
            that.menuTitle.data.push({
                id: 0,
                directoryName: directoryName,
                gmtCreate: "2020-09-30 17:24:38",
                parenId: 0,
                type: 0,
                childMenu: res.body.data
            })
            that.$set(this.menuTitle.data[0], "status", 1);
        })
        //选择时间
        switch (fre) {
            case 2:
                this.menuTitleId.timeNum = 5;
                break;
            case 1:
                this.menuTitleId.timeNum = 3;
                break;
            case 0:
                this.menuTitleId.timeNum = 3;
                break;
            default:
                this.menuTitleId.timeNum = '';
        }

        if (that.menuTitleId.area === 1) { //云南省洲市数据
            that.componentsMoudel.startGet('/dataQuery/getAreaListByProvinceName', false).then(res => {
                that.areaCodeOptions = res.body.data;
                that.menuTitleId.areaCode = '530100';

            })
        } else if (that.menuTitleId.area === 3) { //  全国省份数据
            that.componentsMoudel.startGet('/dataQuery/getProvince', false).then(res => {
                that.areaCodeOptions = res.body.data;
                that.menuTitleId.areaCode = '110000';

            })
        }
    },

    //打开关闭菜单  获取table数据
    changeMenuStatus: function (item, index) {
        const that = this
        that.chartSwitchingData = 0;
        let area = 2;
        switch (that.menuTitleId.area) {
            case 0:
                area = 2, that.XlsxSource = '云南省数据';
                break;
            case 1:
                area = 1, that.XlsxSource = '云南省各州市数据';
                break;
            case 2:
                area = 3, that.XlsxSource = '全国数据';
                break;
            case 3:
                area = 2, that.XlsxSource = '其他省市数据';
                break;
        }
        that.menuTitleId.id = item.id
        let obj = {};
        that.tableData = [];
        if (index === 4) {
            that.XlsxTitle = item.name;
            //0-云南，1-地州，2-全国,3.其它省份
            let data = {
                "fre": that.menuTitleId.fre,
                "area": area,
                "timeNum": Number(that.menuTitleId.timeNum),
                "areaCode": that.menuTitleId.areaCode,
                "index": that.menuTitleId.id,
                "menuType": that.menuTitleId.area
            }
            this.componentsMoudel.startPost('dataQuery/getDataBySelect', data, false).then(res => {
                that.tableDataTitle = Object.keys(res.body.data);
                that.dataInfo.echartsData.xAxis[0].data = res.body.data['时间'];
                if (that.tableDataTitle.length !== 0) {
                    let adders = that.tableDataTitle.indexOf('时间');
                    let dataOne = that.tableDataTitle[adders];
                    that.tableDataTitle[adders] = that.tableDataTitle[0];
                    that.tableDataTitle[0] = dataOne;
                }
                if (res.body.data[that.tableDataTitle[0]] !== '') {
                    if (that.tableDataTitle.length !== 0) {
                        for (let i = 0; i < res.body.data[that.tableDataTitle[0]].length; i++) {
                            obj = {};
                            for (let j = 0; j < that.tableDataTitle.length; j++) {
                                obj[that.tableDataTitle[j]] = res.body.data[that.tableDataTitle[j]][i];
                            }
                            that.tableData.push(obj);
                        }
                    }
                }
                this.toggleSelection(that.tableData);
            })
            if (!item.status) {
                that.$set(item, "status", 0);
            }
            if (item.status === undefined || item.status === 0) {
                if (that.menuTitle.chooseItem[0]) {
                    that.menuTitle.chooseItem[0].status = 0;
                }
                that.menuTitle.chooseItem[0] = item;
                that.menuTitle.chooseItem[0].status = 1;
                that.$emit('openMenu', item)
            }
        } else { //   判断是否为选中，取消其他的样式
            if (item.status === 1) {
                item.status = 0;
            } else {
                if (item.status) {
                    item.status = 1;
                } else {
                    if (item.status === undefined) {}
                    that.$set(item, "status", 1);
                }
            }
        }
    },
    // 默认选择项
    toggleSelection(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
    },

    //指标选择转换
    datequotaFun() {
        const that = this
        let obj = {};
        that.tableData = [];
        //0-云南，1-地州，2-全国,3.其它省份
        let area = 2;
        switch (that.menuTitleId.area) {
            case 0:
                area = 2, that.XlsxSource = '云南省数据';
                break;
            case 1:
                area = 1, that.XlsxSource = '云南省各州市数据';
                break;
            case 2:
                area = 3, that.XlsxSource = '全国数据';
                break;
            case 3:
                area = 2, that.XlsxSource = '其他省市数据';
                break;
        }
        let data = {
            "fre": this.menuTitleId.fre,
            "area": area,
            "timeNum": Number(this.menuTitleId.timeNum),
            "areaCode": this.menuTitleId.areaCode,
            "index": that.menuTitleId.id,
            "menuType": this.menuTitleId.area
        }
        this.componentsMoudel.startPost('dataQuery/getDataBySelect', data, false).then(res => {
            that.tableDataTitle = Object.keys(res.body.data);
            that.dataInfo.echartsData.xAxis[0].data = res.body.data['时间'];
            if (that.tableDataTitle.length !== 0) {
                let adders = that.tableDataTitle.indexOf('时间');
                let dataOne = that.tableDataTitle[adders];
                that.tableDataTitle[adders] = that.tableDataTitle[0];
                that.tableDataTitle[0] = dataOne;
            }
            if (res.body.data[this.tableDataTitle[0]] !== '') {
                if (that.tableDataTitle.length !== 0) {
                    for (let i = 0; i < res.body.data[this.tableDataTitle[0]].length; i++) {
                        obj = {};
                        for (let j = 0; j < that.tableDataTitle.length; j++) {
                            obj[that.tableDataTitle[j]] = res.body.data[that.tableDataTitle[j]][i];
                        }
                        that.tableData.push(obj);
                    }
                }
            }

            this.toggleSelection(that.tableData);
        })
    },


    toggleRowSelection(row) {
        console.log(row);
    },
    //   获取行选择数据图表展示
    handleSelectionChange(val) {
        let that = this;
        that.multipleSelection = val;
        const map = {};
        this.dataInfo.echartsData.series = [];
        this.dataInfo.echartsData.legend.data = [];
        if (val !== '') {
            for (let i = 0; i < val.length; i++) { //选中行数据      //   表格title数据
                const item = val[i];
                for (let key in item) {
                    if (map[key]) {
                        if (key === '时间') {
                            // map[key].data.push(item[key]);
                        } else {
                            map[key].data.push(parseFloat(item[key]));
                        }
                    } else {
                        map[key] = {
                            data: []
                        };
                        if (key === '时间') {
                            // map[key].data.push(item[key]);
                        } else {
                            map[key].data.push(parseFloat(item[key]));
                        }
                    }
                }
            }

            const items = [];
            const items2 = [];
            let K = 0;
            for (let key in map) {
                if (that.checkedList[K] === true) {
                    if (key !== '时间') {
                        if (key.indexOf("%") != -1) {
                            items.push({
                                name: key,
                                type: 'line',
                                yAxisIndex: 1,
                                data: map[key].data
                            })
                        } else {
                            if (that.chartSwitchingData === 0) {
                                items.push({
                                    name: key,
                                    type: 'bar',
                                    barWidth: '5%',
                                    data: map[key].data
                                })
                            } else {
                                items.push({
                                    name: key,
                                    type: 'line',
                                    data: map[key].data
                                })
                            }

                        }
                        items2.push(key)
                    }
                }
                K++;
            }
            const newData = {
                ...this.dataInfo.echartsData,
                series: items
            };
            newData.series = items;
            this.dataInfo.echartsData = newData;
            this.dataInfo.echartsData.legend.data = items2;

        } else {
            const items = [];
            const items2 = [];
            const newData = {
                ...this.dataInfo.echartsData,
                series: items
            };
            newData.series = items;
            this.dataInfo.echartsData = newData;
            this.dataInfo.echartsData.legend.data = items2;
        }

    },

    //  柱状图 折线图 饼状图切换
    chartSwitchingClike() {
        let that = this;
        if (that.chartSwitchingData === 0) {
            let seriesData = [];
            that.dataInfo.echartsData.series.forEach((item, index) => {
                item.type = 'bar';
                seriesData.push(item);
            })
            that.dataInfo.echartsData.series = seriesData;
        } else if (that.chartSwitchingData === 1) {
            let seriesData = [];
            that.dataInfo.echartsData.series.forEach((item, index) => {
                item.type = 'line';
                seriesData.push(item);
            })
            that.dataInfo.echartsData.series = seriesData;
        }
    },


    //导航栏点击事件
    handleActive(val) {
        this.isActive = val
    },

    //    柱状图隐藏按钮数据切换
    hideChart() {
        this.switchButton = !(this.switchButton);
    },


    //定义导出Excel表格事件
    // exportExcel() {
    //     let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
    //     // wb.Sheets.Sheet1.A1.v = "标题";
    //     // wb.Sheets.Sheet1.A2.v = "标题";
    //     // wb.Sheets.Sheet1.A3.v = "标题";
    //     var wbout = XLSX.write(wb, {
    //         bookType: 'xlsx',
    //         bookSST: true,
    //         type: 'array'
    //     })
    //     try {
    //         FileSaver.saveAs(
    //             new Blob([wbout], {
    //                 type: 'application/octet-stream;charset=utf-8'
    //             }),
    //             '统计数据.xlsx'
    //         )
    //     } catch (e) {
    //         if (typeof console !== 'undefined') console.log(e, wbout)
    //     }
    //     return wbout
    // },
    exportExcel() {
        let that = this;
        require.ensure([], () => {
            let {
                export_json_to_excel
            } = require('../excel/Export2Excel'); //注意这个Export2Excel路径
            let tHeader = [];
            const tHeaderTeo = [];
            const filterVal = [];
            const title1 = [];
            const title2 = [];
            const title3 = [];
            let XlsxData = [];

            that.tableDataTitle.forEach((item, index) => {
                let XlsxDataTwo = {};
                if (that.checkedList[index]) {
                    tHeaderTeo.push(item);
                    filterVal.push(item);
                    title1[index] = '';
                    title2[index] = '';
                    title3[index] = '';
                    that.multipleSelection.forEach((item2, index2) => {
                        XlsxDataTwo[item] = item2[item];
                    })
                    XlsxData.push(XlsxDataTwo);
                }
            });
            tHeader[0] = tHeaderTeo;
            that.timeNumOptions[that.menuTitleId.fre - 1].forEach((item, index) => {
                if (item.value === that.menuTitleId.timeNum) {
                    that.XlsxDate = item.label;
                }
            });
            title1[0] = '指标:' + that.XlsxTitle;
            title2[0] = '数据来源:' + that.XlsxSource;
            title3[0] = '时间:' + that.XlsxDate;
            // 上面设置Excel的表格第一行的标题 格式为[[],[]]单行就输入[[]]

            const list = this.multipleSelection; //把要导出的数据tableData存到list
            const data = this.formatJson(filterVal, list);
            data.map(item => {
                item.map((i, index) => {
                    if (!i) {
                        item[index] = ''
                    }
                })
            })
            const merges = [

            ] //合并单元格 格式[[],[]]
            export_json_to_excel({
                title1: title1,
                title2: title2,
                title3: title3,
                header: tHeader,
                data,
                merges,
                filename: '数据统计',
                autoWidth: true,
                bookType: 'xlsx'
            });
        })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },

}



root.mounted = function () {
    this.getLeftDataBySelect(this.menuTitleId.area, this.menuTitleId.fre);
    // this.changeMenuStatus(this.menuTitleId, 4);
    this.changeMenuStatus(this.initializationData, 4);


}
FactoryComponents.initComponent(root);