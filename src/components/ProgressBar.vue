<template>
    <div class="bar-wrapper">
        <div class="up" :style={width:this.percent} ></div>
        <div class="down"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class ProgressBar extends Vue{
        @Prop({default: 0.5}) readonly percent!: number;
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.bar-wrapper{
    width: 100%;
    position: relative;
    >.up {
        height: 2px;
        background-color: $color-background;
        z-index: 10;
        position: absolute;
    }
    >.down {
        height: 2px;
        width: 100%;
        background-color: rgba(0, 122, 204, 0.2);
        z-index: 1;
        position: absolute;
    }
}


</style>