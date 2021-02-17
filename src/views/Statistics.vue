<template>
    <div class="item">
        <Layout>
             <Types :type.sync='type'/>
             <Chart :options='chartOptions' />
             {{recordList.map(item => item.date)}}
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
    import clone from '@/lib/clone';
    import _ from 'lodash';

    @Component({
        components: {Types, Chart}
    })
    export default class Statistics extends Vue{
        type = '-';

        created() {
            this.$store.commit('fetchRecords')
        }

        get recordList() {
            return this.$store.state.recordList;
        }
        get groupedList() {
            return this.$store.getters.groupedList;
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

</style>