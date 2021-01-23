<template>
            <div class="outputBox">
                <div class="date">日期</div>
                <input type="text" name="remark" placeholder="输入备注..."/>
                <div class="output">0.00</div>
            </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'OutputBox',
    })
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.outputBox {
    border-top: 1px solid $color-border;
    padding: 0 5px;
    display: flex;
    align-items: center;
    > .date {
        padding:0 5px;
        margin-right: 5px;
    }
    input {
        flex-grow: 1;
        height: 54px;
        border: none;
    }
    > .output {
        padding: 0 10px;
        font-size: 24px;
    }
}
</style>