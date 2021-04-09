//Export2Excel.js
/* eslint-disable */
require('script-loader!file-saver');
require('./Blob.js'); //转二进制用  这边要写你的blob的实际地址
require('script-loader!xlsx/dist/xlsx.core.min');
import XLSX from 'xlsx-style'

function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({
                    s: {
                        r: R,
                        c: outRow.length
                    },
                    e: {
                        r: R + rowspan - 1,
                        c: outRow.length + colspan - 1
                    }
                });
            };

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan)
                for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {
                v: data[R][C]
            };
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({
                c: C,
                r: R
            });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id) {
    var theTable = document.getElementById(id);
    console.log('a')
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";
    console.log(data);

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    });

    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), "test.xlsx")
}

function formatJson(jsonData) {
    console.log(jsonData)
}
export function export_json_to_excel({
    title1, //标题
    title2, //标题
    title3, //标题
    multiHeader = [],
    header, //表头 格式:[[],[]]多级菜单，从下往上
    data, //格式后的数据
    filename, //表名
    merges = [], //需要合并的单元格 格式:[[],[]]
    autoWidth = true,
    bookType = 'xlsx'
} = {}) {
    /* original data */
    //判断是否有表名、没有则赋予固定表名
    filename = filename || 'excel-list'
    //获取所有数据
    data = [...data]
    //添加表头进数据最上层
    header.forEach(element => {
        data.unshift(element);
    });
    //添加标题进数据最上层  在表头之上
    data.unshift(title3);
    data.unshift(title2);
    data.unshift(title1);
    //判断multiHeader是否有值(原作为标题后修改的值)
    for (let i = multiHeader.length - 1; i > -1; i--) {
        data.unshift(multiHeader[i])
    }
    var ws_name = title1[0].substring(3);
    var wb = new Workbook(),
        //将data转化格式 用于接下来动态宽度
        ws = sheet_from_array_of_arrays(data);

    //合并单元格
    if (merges.length > 0) {
        if (!ws['!merges']) ws['!merges'] = [];
        merges.forEach(a => {
            a.forEach(item => {
                ws['!merges'].push(XLSX.utils.decode_range(item))
            })
        })
    }
    //动态设置宽度
    if (autoWidth != true) {
        /*设置worksheet每列的最大宽度*/
        const colWidth = data.map(row => row.map(val => {
            /*先判断是否为null/undefined*/
            if (val == null) {
                return {
                    'wch': 10
                };
            }
            /*再判断是否为中文*/
            else if (val.toString().charCodeAt(0) > 255) {
                return {
                    'wch': val.toString().length * 2
                };
            } else {
                return {
                    'wch': val.toString().length
                };
            }
        }))

        //判断合并单元格中是否有同行合并，有则将其长度设为0
        if (merges.length > 0) {
            if (!ws['!merges']) ws['!merges'] = [];
            merges.forEach(a => {
                a.forEach(item => {
                    let q = item.split(':')
                    console.log(q);
                    let w1 = q[0].substring(0, 1)
                    let e1 = q[0].substring(1, 2)
                    let w2 = q[1].substring(0, 1)
                    let e2 = q[1].substring(1, 2)
                    if (e1 == e2) {
                        let abc = {
                            "A": 0,
                            "B": 1,
                            "C": 2,
                            "D": 3,
                            "E": 4,
                            "F": 5,
                            "G": 6,
                            "H": 7,
                            "I": 8,
                            "J": 9,
                            "K": 10,
                            "L": 11,
                            "M": 12,
                            "N": 13,
                            "O": 14,
                            "P": 15,
                            "Q": 16,
                            "R": 17,
                            "S": 18,
                            "T": 19,
                            "U": 20,
                            "V": 21,
                            "W": 22,
                            "X": 23,
                            "Y": 24,
                            "Z": 25
                        };
                        if (abc[w1] > abc[w2]) {
                            let jh = w1
                            w1 = w2
                            w2 = jh
                        }
                        console.log(abc[w1]);
                        console.log(abc[w2]);
                        console.log(colWidth);
                        for (let i = abc[w1]; i <= abc[w2]; i++) {
                            console.log(e1 - 1);
                            console.log(i);
                            console.log(colWidth[e1 - 1][i]['wch']);
                            colWidth[e1 - 1][i]['wch'] = 0;
                        }
                    }
                })
            })
        }
        /*以第一行为初始值 判断对应每一列的最大长度*/
        let result = colWidth[0];
        for (let i = 1; i < colWidth.length; i++) {
            for (let j = 0; j < colWidth[i].length; j++) {
                if (result[j]['wch'] < colWidth[i][j]['wch']) {
                    result[j]['wch'] = colWidth[i][j]['wch'];
                }
            }
        }
        ws['!cols'] = result;
    }

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    var dataInfo = wb.Sheets[wb.SheetNames[0]];

    const borderAll = { //单元格外侧框线
        top: {
            style: 'thin'
        },
        bottom: {
            style: 'thin'
        },
        left: {
            style: 'thin'
        },
        right: {
            style: 'thin'
        }
    };
    //给所以单元格加上边框
    for (var i in dataInfo) {
        if (i == '!ref' || i == '!merges' || i == '!cols' || i == 'A1') {

        } else {
            dataInfo[i + ''].s = {
                border: borderAll,
                //居中属性
                alignment: {
                    horizontal: "center",
                    vertical: "center"
                },
            }
        }
    }

    // 去掉标题边框
    let arr = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1", "Y1", "Z1"];
    // arr.some(function (v) {
    //     // let a = merges[0].split(':')
    //     let a = merges[0][0].split(':')
    //     if (v == a[1]) {
    //         dataInfo[v].s = {}
    //         return true;
    //     } else {
    //         dataInfo[v].s = {}
    //     }
    // })

    //设置主标题样式
    dataInfo["A1"].s = {
        font: {
            name: '宋体',
            color: {
                rgb: "000000"
            },
            bold: true,
            italic: false,
            underline: false
        },
        alignment: {
            horizontal: "left",
            vertical: "letf"
        },
    };
    dataInfo["A2"].s = {
        font: {
            name: '宋体',
            color: {
                rgb: "000000"
            },
            bold: true,
            italic: false,
            underline: false
        },
        alignment: {
            horizontal: "left",
            vertical: "letf"
        },
    };
    dataInfo["A3"].s = {
        font: {
            name: '宋体',
            color: {
                rgb: "000000"
            },
            bold: true,
            italic: false,
            underline: false
        },
        alignment: {
            horizontal: "left",
            vertical: "letf"
        },
    };


    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
};