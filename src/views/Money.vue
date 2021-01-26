<template>
    <div>
        <Layout>
            <Types :type.sync="record.type" />
            <Tags :data-source="currentTagList" @update:dataSource="onUpdateCurrentTagList" @update:value="onUpdateTags"/>
            <Remarks :value.sync="record.remarks" />
            <NumberPad @update:output="onUpdateMount" @submit="saveRecord"/>
        </Layout>
        支出标签：{{expendTagList}}
        收入标签：{{incomeTagList}}
         {{record}}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Watch } from 'vue-property-decorator';
    import Types from '@/components/Money/Types.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Remarks from '@/components/Money/Remarks.vue';
    import NumberPad from "@/components/Money/NumberPad.vue";
    import recordListModel from "@/models/recordListModel.ts";
    import tagListModel from "@/models/tagListModel.ts";
    console.log(111);
    const recordList = recordListModel.fetch();
    tagListModel.fetch();

    @Component({
        components: {  
            Types, Tags, Remarks, NumberPad
        }
    })
    export default class Money extends Vue{
        // expendTags: string[] = ['餐饮', '交通', '购物', '服饰鞋包', '学习', '租房', '话费', '医疗', '其他'];
        // incomeTags: string[] = ['工资', '理财', '兼职', '补助', '其他'];
        recordList: RecordItem[] = recordList;
        record: RecordItem = {
            type: '-', 
            selectTag: '',
            remarks: '',
            amount: 0.00,
        }
        expendTagList = tagListModel.dataExpend;
        incomeTagList = tagListModel.dataIncome;
        get currentTagList() {
            if(this.record.type === '+'){
                return this.incomeTagList;
            }
            return this.expendTagList;
        }
        // set currentTagList(value) {
        //     this.currentTagList = value;
        // }

        onUpdateCurrentTagList(value: string) {
            // console.log(value);
            this.currentTagList.push(value);
            tagListModel.save();
        }

        onUpdateTags(value: string){
            this.record.selectTag = value;
        }
        onUpdateRemarks(value: string) {
            this.record.remarks = value;
        }
        onUpdateMount(amount: string) {
            this.record.amount = parseFloat(amount);
        }
        saveRecord() {
            const recordClone: RecordItem = recordListModel.clone(this.record); // 拷贝
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
            recordListModel.save(this.recordList);
        }
    }
</script>

<style lang="scss" scoped>




</style>