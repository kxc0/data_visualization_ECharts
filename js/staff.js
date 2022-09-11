// 基url
const baseUrl = 'http://127.0.0.1:8080/shapan/';
// 引入头部“时间”标签
$('#header').load('./time.html');
// 员工绩效分析
data01();

// 员工绩效分析
function data01() {
    let data = loadData('analysis_charts/astanly/', '1');
    // console.log(data);
    staff_data.innerHTML = `
        <li>
            <div>
                <p>当日销售额（元）</p>
                <p>${data.今日销售额}</p>
            </div>
            <div>
                <p>上周总数</p>
                <p>${data.本周销售额}</p>
                <p>上月总数</p>
                <p>${data.本月销售额}</p>
            </div>
        </li>
        <li>
            <div>
                <p>今日客单均价（元）</p>
                <p>${parseInt(data.今日销售额 / data.今日交易数)}</p>
            </div>
            <div>
                <p>上周均价</p>
                <p>${parseInt(data.本周销售额 / data.本周交易数)}</p>
                <p>上月均价</p>
                <p> ${parseInt(data.本月销售额 / data.本月交易数)}</p>
            </div>
        </li>
        <li>
            <div>
                <p>当日交易数</p>
                <p>${data.今日交易数}</p>
            </div>
            <div>
                <p>上周总数</p>
                <p>${data.本周交易数}</p>
                <p>上月总数</p>
                <p>${data.本月交易数}</p>
            </div>
        </li>
        <li>
            <div>
                <p>人均销售额（元）</p>
                <p>${parseInt(data.今日销售额 / data.今天上班员工数)}</p>
            </div>
            <div>
                <p>上周总数</p>
                <p>${parseInt(data.本周销售额 / data.本周上班员工数)}</p>
                <p>上月总数</p>
                <p>${parseInt(data.本月销售额 / data.本月上班员工数)}</p>
            </div>
        </li>
    `
}




// 导购次数/用户数/交易数趋势对比
chart01();
// 今日工作干扰行为次数排行
console.log(loadData('analysis_charts/astanly/', '6'));

chart02();
// 交易数/销售额与导购行为趋势
chart03();
chart04();
chart05();

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
    xhr.open('POST', `${baseUrl + url}`, false);
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

    option = {
        legend: {},
        tooltip: {},
        dataset: {
            source: await loadData('analysis_charts/astanly/', '2').source
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    };

    option && myChart.setOption(option);

}

async function chart02() {
    var chartDom = document.getElementById('chart02');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/astanly/', '3')
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
            data: getData(data.source, 0)
        },
        series: [
            {
                color: ['#00DDFF', '#37A2FF'],
                // name: 'Search Engine',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: getData(data.source, 1)
            }
        ]
    };

    option && myChart.setOption(option);

}

async function chart03() {
    var chartDom = document.getElementById('chart03');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/astanly/', '6')
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
            data: [data.source1[0][1], data.source1[0][2]]
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
                data: getData(data.source1, 0)
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: data.source1[0][1],
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
                data: getData(data.source1, 1)
            },
            {
                name: data.source1[0][2],
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
                data: getData(data.source1, 2)
            }
        ]
    };

    option && myChart.setOption(option);
}
async function chart04() {
    var chartDom = document.getElementById('chart04');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/astanly/', '6')
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
            data: [data.source1[0][1], data.source1[0][2]]
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
                data: getData(data.source1, 0)
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: data.source1[0][1],
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
                data: getData(data.source1, 1)
            },
            {
                name: data.source1[0][2],
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
                data: getData(data.source1, 2)
            }
        ]
    };

    option && myChart.setOption(option);
}
async function chart05() {
    var chartDom = document.getElementById('chart05');
    var myChart = echarts.init(chartDom);
    var option;
    var data = await loadData('analysis_charts/astanly/', '6')
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
            data: [data.source2[0][1], data.source2[0][2]]
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
                data: getData(data.source2, 0)
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: data.source2[0][1],
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
                data: getData(data.source2, 1)
            },
            {
                name: data.source2[0][2],
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
                data: getData(data.source2, 2)
            }
        ]
    };

    option && myChart.setOption(option);
}
