<template>
    <div class="item">
        <Layout>
             <Types :type.sync='type'/>
             <Chart :options='chartOptions' class="chart"/>
             <div class="leader-board">
                 <ul>
                     <li v-for="(items, index) in leaderList" :key="index">
                         <span>{{items.tag}} </span>
                         <span>{{items.total}} </span>
                     </li>
                 </ul>
             </div>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Types from '@/components/Money/Types.vue';
    import Chart from '@/components/Chart.vue';
    import day from 'dayjs';
    import dayjs from 'dayjs';
    import _ from 'lodash';

    @Component({
        components: {Types, Chart}
    })
    export default class Statistics extends Vue{
        type = '-';

        created() {
            this.$store.commit('fetchRecords');
            this.$store.commit('fetchTags');
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
                array.push({tag: tags[i].name, total: 0})
            }
            const today = new Date();
            for(let i = 0; i< recordList.length; i++) {
                const day = new Date(recordList[i].date);
                if (today.valueOf() - day.valueOf() < 86400000 * 30) {
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
        get keyValueList(){
            const today = new Date();
            const array = [];
            for(let i = 0; i<= 29; i++) {
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
                xAxis: {
                    data: keys
                },
                yAxis: {
                    type:'value'
                },
                series: [{
                    type: 'line',
                    data: values
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
.chart {
    border-bottom: 1px solid black;
    min-height: 300px;
}
</style>