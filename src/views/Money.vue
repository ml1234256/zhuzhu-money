<template>
    <div>
        <Layout>
            <Tags :data-source.sync="tags"/>
            <NumberPad />
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import Tags from '@/components/Money/Tags.vue';
    import NumberPad from "@/components/Money/NumberPad.vue";

    @Component({
        components: {            
            Tags,
            NumberPad
            }
    })
    export default class MOney extends Vue{
        tags: string[] = ['餐饮', '交通', '购物', '服饰鞋包', '学习', '租房', '话费', '医疗', '其他'];

    }
</script>

<style lang="scss" scoped>




</style>