<template>
    <div>
            <ul class="numPad">

                    <li class="num-left">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>del</li>

                    <li class="num-left">4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>+</li>

                    <li class="num-left">7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>-</li>

                    <li class="num-left zero">0</li>
                    <li>.</li>
                    <li class="ok">确认</li>


            </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        
    })
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.numPad {
    // @extend %clearFix;
    font-size:24px;
    display: flex;
    flex-wrap: wrap;
    
    li {
        border-left: 1px solid $color-border;
        border-top: 1px solid $color-border;
        width: 25%;
        height: 56px;
        line-height: 56px;

        &.ok {
            background-color: #666;
            color: #fff;
        }
        &.zero {
            width: 50%;
        }
        &.num-left {
            border-left: none;
        }
    
    }
}
</style>