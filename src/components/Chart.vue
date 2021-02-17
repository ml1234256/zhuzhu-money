<template>
    <div class="chart-wrapper" ref="chartWrapper">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import * as echarts from 'echarts';
    import { EChartsOption, ECharts } from 'echarts';

    @Component
    export default class Chart extends Vue{
        @Prop() options?: EChartsOption;
        chart?: ECharts;

        mounted() {
            if (this.options === undefined) {
                return console.error('option 为空')
            }
            this.chart = echarts.init(this.$refs.chartWrapper as HTMLDivElement);
            this.chart.setOption(this.options);
        }

        @Watch('options')
        onOptionChange(newOption: EChartsOption) {
            this.chart?.setOption(newOption)
        }
    }
</script>

<style scoped lang="scss">
.chart-wrapper {
    height: 360px;
}
</style>