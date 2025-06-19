# Apache ECharts for React Router v7

[Apache Echarts Examples](https://echarts.apache.org/examples/en/index.html)

Install ECharts with npm:

```https://www.npmjs.com/package/echarts```

Highly recommend this library as it is very versatile and can render different types of charts just by changing the passed options.

## Setting Up A Reusable Component Chart Renderer
```tsx
import { useRef, useEffect } from 'react'
import { init } from "echarts";

export function EChartsRender(props: any){
    console.log("initializing chart...")
    console.log("props.options: ", props.options) // chart options are accessed through props.options

    const chartRef = useRef(null);
    let chartInstance: any = null;
    
    useEffect(() => {
        if(chartRef.current) {
            chartInstance = init(chartRef.current);
            chartInstance.setOption(props.options)
        }

        return () => {
            if(chartInstance){
                chartInstance.dispose();
            }
        };
    }, [props.options]); // Re-render if options change

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}
```

Now it can be used anywhere to render various types of charts.

```tsx
// Render a candlestick chart based on this example:
// https://echarts.apache.org/examples/en/editor.html?c=candlestick-simple&lang=ts
import { EChartsRender } from "./echarts-render";

export function EChartsCandleStick() {
    const chartOptions = {
        xAxis: {
            data: [
                '2017-10-24',
                '2017-10-25',
                '2017-10-26',
                '2017-10-27',
                '2017-10-28',
            ]
        },
        yAxis: {},
        series: [
            {
                type: 'candlestick',
                data: [
                    [20, 34, 10, 38],
                    [40, 35, 30, 50],
                    [31, 38, 33, 44],
                    [38, 15, 5, 42],
                    [27, 26, 45, 56],
                ]
            }
        ]
    }
  return (
    <div>
        <EChartsRender options={chartOptions} />
    </div>
  );
}
```

