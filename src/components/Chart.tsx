import React, { useState, useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartData } from '../api/models';

am4core.useTheme(am4themes_animated);


const TestChart: React.FC<{data: ChartData[]}> = (props) => {

    const { data } = props;
    const chartRef = useRef(null);
    const [stat, setStat] = useState('stat1');

    useLayoutEffect(() => {
        let chart = am4core.create('testChart', am4charts.XYChart);
        chart.data = data;

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "name";
        series.dataFields.valueX = stat;
        series.showTooltipOn = 'hover';
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";

        categoryAxis.sortBySeries = series;

        chartRef.current = chart;
        return () => {
            chart.dispose();
        };

    });

    return (
        <>
            <div id="testChart" style={{ width: "100%", height: "800px" }}></div>

            <p>Select stat:</p>

            <div>
                <input type="radio" id="stat1" name="stat" value="stat1" defaultChecked onChange={() => setStat('stat1')} />
                <label htmlFor="stat1">Stat 1</label>
            </div>

            <div>
                <input type="radio" id="stat2" name="stat" value="stat2" onChange={() => setStat('stat2')} />
                <label htmlFor="stat2">Stat 2</label>
            </div>
        </>
    );
}

export default TestChart;