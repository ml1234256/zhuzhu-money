<template>
    <div class="item">
        <Layout>
             <Types :type.sync='type'/>
             <div class="chart-wrapper" ref="chartWrapper">
                 <Chart :options='chartOptions' class="chart"/>
             </div>
             <ul class="leader-board">
                     <li>
                        <div class="total-mount">总{{type === '-' ? "支出":"收入"}}：{{totalMount}}</div>
                     </li>
                     <li v-for="(items, index) in leaderList" :key="index">
                         <div class="bord-list">                       
                            <span class="tag"> {{items.tag}} </span>
                            <span class="percent"> {{(Math.round((items.total / totalMount) * 1000) / 10) + '%'}} </span>
                            <span class="total">{{items.total}} </span>
                         </div>
                         <ProgressBar :percent="(items.total / totalMount * 100) + '%'" class="bar"/>
                     </li>
             </ul>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Types from '@/components/Money/Types.vue';
    import Chart from '@/components/Chart.vue';
    import ProgressBar from '@/components/ProgressBar.vue';
    import day from 'dayjs';
    import dayjs from 'dayjs';
    import _ from 'lodash';

    @Component({
        components: {Types, Chart, ProgressBar}
    })
    export default class Statistics extends Vue{
        type = '-';

        created() {
            this.$store.commit('fetchRecords');
            this.$store.commit('fetchTags');
        }

        mounted() {
            const div = this.$refs.chartWrapper as HTMLDivElement;
            div.scrollLeft = div.scrollWidth;
        }

        get recordList() {
            return this.$store.state.recordList;
        }
        get groupedList() {
            return this.$store.getters.groupedList;
        }
        get leaderList() {
            const tags: Tag[] = this.type === '-' ? this.$store.getters.expendTagList : this.$store.getters.incomeTagList;
            const recordList= this.recordList.filter((item: RecordItem) => item.type === this.type);
            let array = [];
            for (let i = 0; i<tags.length; i++) {
                array.push({tag: tags[i].name, total: 0, percent: '0'})
            }
            const today = new Date();
            for(let i = 0; i< recordList.length; i++) {
                const day = new Date(recordList[i].date);
                if (today.valueOf() - day.valueOf() < 86400000 * 31) {
                    for (let j = 0; j<array.length; j++){
                        if(recordList[i].selectTag === array[j].tag){
                        array[j].total += recordList[i].amount;
                        }
                    }
                }
            }
            array = array.sort((a, b) => b.total - a.total);
            return array;
        }
        get totalMount() {
            let mount = 0;
            for (let i = 0; i< this.leaderList.length; i++) {
                mount += this.leaderList[i].total;
            }
            return mount
        }
        get keyValueList(){
            const today = new Date();
            const array = [];
            for(let i = 0; i< 31; i++) {
                const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD');
                const found = _.find(this.groupedList, {
                    title: dateString
                });
                if (found) {
                    array.push({
                        key: dateString, value: this.type === '-' ? found.totalExpend : found.totalIncome
                    });
                } else {
                    array.push({
                        key: dateString, value: 0
                    })
                }
            }
            array.sort((a, b) => {
                if (a.key >= b.key) {
                    return 1;
                }else {
                    return -1;
                }
            })
            return array;
        }
        get chartOptions() {
            const keys = this.keyValueList.map(item => item.key);
            const values = this.keyValueList.map(item => item.value); 
            return {
                grid: {
                    left: 0,
                    right: 0,
                    bottom: 36,
                },
                xAxis: {
                    data: keys,
                    axisTick: {alignWithLabel: true},
                    axisLabel: {
                        formatter: function (value: string) {
                        return value.substr(5);
                    }
          }
                },
                yAxis: {
                    type:'value',
                    show:false,
                },
                series: [{
                    type: 'line',
                    data: values,
                    symbolSize: 10,
                }],
                tooltip: {
                    show:true,
                    triggerOn: 'click',
                    position: 'top',
                    formatter: '{c}',
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.chart {
    min-height: 280px;
    width: 300%;
    &-wrapper{
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
.leader-board {
    li{
        @extend %clearFix;  
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-bottom: 1px solid $color-border; 
        >.total-mount {
        margin-top: 12px;
        width: 90%;
        text-align: left;
        font-size:14px;
        font-weight: 600;
        }
        >.bord-list {
            width: 90%;
            font-size: 16px;
            >.tag {
                float: left;
            }
            >.percent {
                float: left;
                margin-left: 10px;
                font-size: 12px;
                color: #aaa;
            }
            >.total{
                float: right;
            }
        }

        >.bar {
            width:90%;
        }
    }
}


</style>