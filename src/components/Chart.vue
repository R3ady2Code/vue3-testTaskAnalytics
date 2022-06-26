<template>
	<div>
		<div id="chartdiv" ref="chartdiv">
		</div>
	</div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
	props: ['data'],
	mounted() {
		let root = am5.Root.new(this.$refs.chartdiv);
		root.setThemes([am5themes_Animated.new(root)]);
		let chart = root.container.children.push(am5xy.XYChart.new(root, {
			panX: true,
			panY: false,
			wheelX: "panX",
			wheelY: "zoomX",
			pinchZoomX: true
		}));
		// Define data
		let data = this.data
		const xRenderer = am5xy.AxisRendererX.new(root, {});
		xRenderer.labels.template.set("minPosition", 0.01);
		xRenderer.labels.template.set("maxPosition", 0.99);
		// Create Y-axis
		let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {})
		}));
		// Create X-Axis
		let xAxis = chart.xAxes.push(am5xy.CategoryDateAxis.new(root, {
			categoryField: "date",
			baseInterval: {
				timeUnit: "day",
				count: 1
			},
			renderer: xRenderer,
			tooltip: am5.Tooltip.new(root, {})
		}));
		// Create series
		let series = chart.series.push(am5xy.LineSeries.new(root, {
			name: "Series",
			xAxis: xAxis,
			yAxis: yAxis,
			valueYField: "visits",
			categoryXField: "date"
		}));
		const tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
		tooltip.label.set("text", "{valueY}");
		series.data.setAll(data);
		xAxis.data.setAll(data);
		// Add cursor
		let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
			behavior: "none"
		}));
		cursor.lineY.set("visible", false);
		this.root = root;
		this.loading = false;
	},
	beforeUnmount() {
		if (this.root) {
			this.root.dispose();
		}
	},
}
</script>