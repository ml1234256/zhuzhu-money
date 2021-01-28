<template>
    <div>
        <Layout>
            <Types :type.sync="record.type" />
            <Tags :data-source="currentTagList"  @update:value="onUpdateTags"/>
            <Remarks :value.sync="record.remarks" />
            <NumberPad @update:output="onUpdateMount" @submit="createRecord"/>
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

    @Component({
        components: {  
            Types, Tags, Remarks, NumberPad
        }
    })
    export default class Money extends Vue{
        // expendTagDefault: string[] = ['餐饮', '交通', '购物', '服饰鞋包', '学习', '租房', '话费', '医疗'];
        // incomeTagDefault: string[] = ['工资', '理财', '兼职', '补助'];
        record: RecordItem = {
            type: '-', 
            selectTag: '',
            remarks: '',
            amount: 0.00,
        }
        get recordList() {
            return this.$store.state.recordList;
        }
        get currentTagList() {
            if(this.record.type === '+'){
                return this.$store.state.tagList;
            }
            return this.$store.state.tagList;
        }

        created(){
            this.$store.commit('fetchTags');
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
        createRecord() {
            this.$store.commit('createRecord', this.record);
        }
    }
</script>

<style lang="scss" scoped>




</style>