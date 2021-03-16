<template>
    <div>
        <Layout>
            <Types :type.sync="record.type" />
            <Tags :data-source="currentTagList"  @update:value="onUpdateTags"/>
            <Remarks :value.sync="record.remarks" @update:date="onUpdateDate"/>
            <NumberPad @update:output="onUpdateMount" @submit="createRecord"/>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component} from 'vue-property-decorator';
    import Types from '@/components/Money/Types.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Remarks from '@/components/Money/Remarks.vue';
    import NumberPad from "@/components/Money/NumberPad.vue";
    import dayjs from 'dayjs';

    @Component({
        components: {  
            Types, Tags, Remarks, NumberPad
        }
    })
    export default class Money extends Vue{
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
                return this.$store.getters.incomeTagList;
            }
            return this.$store.getters.expendTagList;
        }

        created(){
            this.$store.commit('fetchTags');
        }

        onUpdateTags(value: string){
            this.record.selectTag = value;
        }
        onUpdateDate(value: string) {
            this.record.date = value
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
