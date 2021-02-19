<template>
    <div>
        <Layout>
            <div class="total">
                <!-- <ul class="date">
                    <li>2021年</li>
                    <li>1月</li>
                </ul> -->
                <ul class="income">
                    <li>收入</li>
                    <li>{{totalIncome}}</li>
                </ul>
                <ul class="expend">
                    <li>支出</li>
                    <li>{{totalExpend}}</li>
                </ul>
                <ul class="balance">
                    <li>结余</li>
                    <li>{{balance}}</li>
                </ul>
            </div>
            <ul class="recordList">
                <li v-for="(group, index) in groupedList" :key="index">
                    <div class="title">
                        <span>{{beautifyDate(group.title)}}</span>
                        <span class="total-amount">{{beautifyTotal(group.totalExpend,group.totalIncome)}}</span>
                    </div>
                    <ul>
                        <li v-for="(item, index) in group.items" :key="index" class="record">
                            <div class="content">
                                <span>{{item.selectTag}}</span>
                                <span class="remark">{{item.remarks}}</span>
                            </div>
                            <div class="amount">{{item.type + item.amount}}</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </Layout>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import dayjs from 'dayjs';

    @Component
    export default class Detail extends Vue{
        beforeCreate(){
            this.$store.commit('fetchRecords');
        }
        get recordList() {
            return this.$store.state.recordList;
        }
        get groupedList() {
            const groupedList = this.$store.getters.groupedList;
            const result = [];
            const today = new Date();
            for(let i=0; i<groupedList.length; i++){
                const day = new Date(groupedList[i].title);
                if(today.valueOf() - day.valueOf() > 86400000 * 31){
                    break;
                }
                result.push(groupedList[i]);
            }
            return result;
        }
        get totalExpend() {
            let totalExpend = 0;
            for(let i=0; i<this.groupedList.length; i++){
                totalExpend += this.groupedList[i].totalExpend;
            }
            return totalExpend;
        }
        get totalIncome() {
            let totalIncome = 0;
            for(let i=0; i<this.groupedList.length; i++){
                totalIncome += this.groupedList[i].totalIncome;
             }
            return totalIncome;
        }
        get balance() {
            return this.totalIncome - this.totalExpend;
        }
        beautifyDate(date: string) {
            const day = dayjs(date);
            const now = dayjs();
            const week = {'0':'周日', '1':'周一', '2':'周二', '3': '周三', '4': '周四', '5': '周五', '6': '周六'};
            let result = '';
            if (day.isSame(now, 'year')) {
                result =  day.format('M月D日')
            } else (
                result = day.format('YYYY年M月D日')
            )
            if(day.isSame(now, 'day')) {
                result += ' 今天';
            } else {
                result += ' ' + week[day.day()]; 
            }
            return result;
        }
        beautifyTotal(expend: number, income: number) {
            let string = '';
            if (income !== 0) {
                string = string + '收入：' + income.toString();
            }
            if (expend !== 0) {
                string = string +' 支出：' + expend.toString();
            }
          
            return string;
        }
        // beautifyAmount(amount: number, type:string) {

        //     return type + amount;
        // }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.total{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $color-background;
    color: #fff;
    font-size: 18px;
    padding: 24px 16px 8px 16px;
    >ul{
        padding: 0 12px;
    }
    >.date {
        margin-right: 12px;
        // justify-self:flex-start;
    }
}

.title {
        display: flex;
        justify-content: space-between;
        padding: 6px 12px;
        background-color: rgb(236, 236, 236);
        font-size: 14px;
        color: #000;
        >.total-amount {
            color: #333;
        }
}
.record{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $color-border;
        padding: 4px 12px 2px 12px;
        height: 50px;
        >.content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 16px;
            padding-bottom: 2px;
            >.remark {
            text-align: left;
            color: #ccc;
            font-size: 12px;
            }
        }
        >.amount {
            display: flex;
            align-items: center;
        }
}   
</style>
