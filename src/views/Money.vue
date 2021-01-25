<template>
    <div>
        <Layout>
            <Types :type.sync="record.type" />
            <Tags :data-source="currentTags" @update:dataSource="onUpdateCurrentTags" @update:value="onUpdateTags"/>
            <Remarks :value.sync="record.remarks" />
            <NumberPad @update:output="onUpdateMount" @submit="saveRecord"/>
            {{record}}
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Watch } from 'vue-property-decorator';
    import Types from '@/components/Money/Types.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Remarks from '@/components/Money/Remarks.vue';
    import NumberPad from "@/components/Money/NumberPad.vue";

    const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    console.log(recordList);
    type Record = {
        type: string;
        selectTag: string;
        remarks: string;
        amount: number; // 数据类型 object | string
        date?: Date;  // '?' 表示可以没有
    }

    @Component({
        components: {  
            Types, Tags, Remarks, NumberPad
        }
    })
    export default class Money extends Vue{
        expendTags: string[] = ['餐饮', '交通', '购物', '服饰鞋包', '学习', '租房', '话费', '医疗', '其他'];
        incomeTags: string[] = ['工资', '理财', '兼职', '补助', '其他'];
        recordList: Record[] = recordList;
        record: Record = {
            type: '-', 
            selectTag: '',
            remarks: '',
            amount: 0.00,
        }
        get currentTags() {
            if(this.record.type === '+'){
                return this.incomeTags;
            }
            return this.expendTags;
        }
        set currentTags(value) {
            this.currentTags = value;
        }

        onUpdateCurrentTags(value: string) {
            // console.log(value);
            this.currentTags.push(value);
        }

        onUpdateTags(value: string){
            this.record.selectTag = value;
        }
        onUpdateRemarks(value: string) {
            this.record.remarks = value;
        }
        onUpdateMount(amount: string) {
            this.record.amount = parseFloat(amount);
            console.log(amount)
        }
        saveRecord() {
            const recordClone: Record = JSON.parse(JSON.stringify(this.record)); // 拷贝
            if(recordClone['selectTag'] === ''){
                window.alert('请选择标签');
                return;
            }
            recordClone.date = new Date();
            this.recordList.push(recordClone); 
            this.record.remarks = '';
        }
        @Watch('recordList')
        onRecordListChanged() {
            window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
        }
    }
</script>

<style lang="scss" scoped>




</style>