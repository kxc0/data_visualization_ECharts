// 基url
const baseUrl = 'http://127.0.0.1:8080/shapan/';
// 引入头部“时间”标签
$('#header').load('./time.html');
// 年销售额贡献最高商品
chart01();
chart02();
chart03();
// 第二列的表格
table01();
table02();
table03();
// 中间的白色大字
text();
// 白色打字下面的趋势图表
chart04();
// 中间最下面的两个表格
// console.log(loadData('analysis_charts/comanly/', '8'));
table04();
table05();
// 右边的红色排名表
chart05();
// 最右边的两个table
table06();
table07();

// 封装请求数据的函数
function loadData(url, num) {
    var result = '';
    // 发送ajax，请求相应后台数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = xhr.responseText;
            res = JSON.parse(res);
            result = res;
        };
    }
    xhr.open('POST', `${baseUrl + url} `, false);
    xhr.setRequestHeader('Content-Type', 'application/json'); // 设置请求头，post请求必须的
    var obj = {                     // ajax：post请求参数
        chart_num: num
    }
    xhr.send(JSON.stringify(obj));  // 必须将参数转换为JSON字符串
    return result;                  // 抛出数据
}
// 提取数组数据
function getData(array, num) {
    // console.log(array);
    let arr = [];
    for (let i = 1; i < array.length; i++) {
        arr.push(array[i][num]);
    }
    return arr;
}
async function chart01() {
    var chartDom = document.getElementById('chart01');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/comanly/', '1')
    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: getData(data.source1, 1),
                type: 'line',
                areaStyle: {}
            }
        ]
    };

    option && myChart.setOption(option);

}
async function chart02() {
    var chartDom = document.getElementById('chart02');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/comanly/', '1')
    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [1, 2, 3, 4, 5]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: getData(data.source2, 1),
                type: 'line',
                areaStyle: {}
            }
        ]
    };

    option && myChart.setOption(option);

}
async function chart03() {
    var chartDom = document.getElementById('chart03');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/comanly/', '1')
    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: getData(data.source3, 1),
                type: 'line',
                areaStyle: {}
            }
        ]
    };

    option && myChart.setOption(option);

}
async function table01() {
    var data = await loadData('analysis_charts/comanly/', '2');
    var htmlstr = '';
    for (let i = 1; i <= 5; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][1].item_price}</td>
        <td>${data[i][2].item_total}</td>
        <td>${data[i][3].amount}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .com ul li:first table tbody').html(htmlstr);
}
async function table02() {
    var data = await loadData('analysis_charts/comanly/', '3');
    var htmlstr = '';
    for (let i = 1; i <= 5; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][1].item_price}</td>
        <td>${data[i][2].item_total}</td>
        <td>${data[i][3].amount}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .com ul li:nth-child(2) table tbody').html(htmlstr);
}
async function table03() {
    var data = await loadData('analysis_charts/comanly/', '4');
    var htmlstr = '';
    for (let i = 1; i <= 3; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][1].item_price}</td>
        <td>${data[i][3].amount}</td>
        <td>${data[i][2].item_total}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .com ul li:nth-child(3) table tbody').html(htmlstr);
}
async function text() {
    var data = await loadData('analysis_charts/comanly/', '5');
    $('.body .centre ul li:nth-child(1) div:nth-child(1) p:nth-child(3)').html(data.销售额);
    $('.body .centre ul li:nth-child(1) div:nth-child(2) p:nth-child(3)').html(data.销售数量);
    $('.body .centre ul li:nth-child(1) div:nth-child(3) p:nth-child(3)').html(data.客单价);
}
async function chart04() {
    var chartDom = document.getElementById('chart04');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/comanly/', '6')
    option = {
        color: ['#20ff0e', '#0efff9'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: [data.source[0][1], data.source[0][2]]
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: getData(data.source, 0)
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: data.source[0][1],
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#20ff0e'
                        },
                        {
                            offset: 1,
                            color: 'rgba(32, 255, 13,0.2)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: getData(data.source, 1)
            },
            {
                name: data.source[0][2],
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#0efff9'
                        },
                        {
                            offset: 1,
                            color: 'rgba(32, 255, 13,0.2)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: getData(data.source, 2)
            }
        ]
    };

    option && myChart.setOption(option);
}
async function table04() {
    var data = await loadData('analysis_charts/comanly/', '7');
    var htmlstr = '';
    for (let i = 1; i <= 5; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][2].item_total}</td>
        <td>${data[i][3].amount}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .centre ul li:nth-child(3) div:nth-child(1) table tbody').html(htmlstr);
}
async function table05() {
    var data = await loadData('analysis_charts/comanly/', '8');
    var htmlstr = '';
    for (let i = 1; i <= 5; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][2].item_total}</td>
        <td>${data[i][3].amount}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .centre ul li:nth-child(3) div:nth-child(2) table tbody').html(htmlstr);
}
function chart05() {
    var chartDom = document.getElementById('chart05');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['苹果', '橘子', '梨', '香蕉', '榴莲', '芒果', '橙子', '蛇果', '波罗蜜', '千禧']
        },
        series: [
            {
                color: ['#7e3d61'],
                // name: 'Search Engine',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [1234, 1244, 1222, 1233, 1344, 1254, 1643, 1543, 1123, 1423]
            }
        ]
    };

    option && myChart.setOption(option);

}
async function table06() { // table01
    var data = await loadData('analysis_charts/comanly/', '2');
    var htmlstr = '';
    for (let i = 1; i <= 5; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][1].item_price}</td>
        <td>${data[i][2].item_total}</td>
        <td>${data[i][3].amount}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .right ul li:nth-child(1) div table tbody').html(htmlstr);
}
async function table07() { // table05
    var data = await loadData('analysis_charts/comanly/', '8');
    var htmlstr = '';
    for (let i = 1; i <= 5; i++) {
        htmlstr += `
        <tr>
        <td>${i}</td>
        <td>${data[i][0].item_name.slice(0, 3)}</td >
        <td>${data[i][2].item_total}</td>
        <td>${data[i][3].amount}</td>
        <td>25%</td>
        </tr >
            `;
    }
    $('body .right ul li:nth-child(2) div table tbody').html(htmlstr);
}