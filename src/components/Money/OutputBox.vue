<template>
            <div class="outputBox">
                <input  type="date" class="date" name="date">               
                <input type="text" name="remark" placeholder="输入备注..."/>
                <div class="output">{{output}}</div>
            </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class OutputBox extends Vue{
        @Prop(String) output: string | undefined;
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.outputBox {
    border-top: 1px solid $color-border;
    padding: 0 5px;
    display: flex;
    align-items: center;
    > .date {
        // display: block;
        // padding: 4px;
        // margin-left: 4px;
        margin-right: 8px;
        border: 1px solid $color-border;
        border-radius: 4px;
    }
    input {
        flex-grow: 1;
        height: 52px;
        border: none;
    }
    > .output {
        padding: 0 16px;
        font-size: 24px;
    }
}
</style>