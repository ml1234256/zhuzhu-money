<template>
    <div>
            <div class="outputBox">
                <span class="output">{{output}}</span>
            </div>
            <ul class="numPad">
                    <li class="num-left" @click="inputContent">1</li>
                    <li @click="inputContent">2</li>
                    <li @click="inputContent">3</li>
                    <li @click="deleteNum">del</li>

                    <li class="num-left" @click="inputContent">4</li>
                    <li @click="inputContent">5</li>
                    <li @click="inputContent">6</li>
                    <li @click="clearNum">AC</li>

                    <li class="num-left" @click="inputContent">7</li>
                    <li @click="inputContent">8</li>
                    <li @click="inputContent">9</li>
                    <li class="ok" @click="saveNum">确认</li>

                    <li class="num-left zero" @click="inputContent">0</li>
                    <li @click="inputContent">.</li>
                    
            </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import Remarks from '@/components/Money/Remarks.vue';

    @Component({
        components: {Remarks}
    })
    export default class NumberPad extends Vue{
        output = "0.00";
        inputContent(event: MouseEvent){
            const button = (event.target as HTMLButtonElement);
            const input = (button.textContent as string);

            const indexOfPoint = this.output.indexOf('.');
            if(this.output.length >= 12){
                return;
            }

            if(this.output === '0.00' || this.output === '0') {
                if('123456789'.indexOf(input) >= 0) {
                    this.output = input;
                } else if (input === '.') {
                    this.output = "0." ;
                } else {
                    return
                }
            } else {
                if (indexOfPoint >= 0){
                    if(this.output.substring(indexOfPoint).length >= 3 || indexOfPoint >= 0 && input === '.'){
                        return;
                    }
                }
                this.output += input;
            }
        }
        deleteNum() {
            if (this.output.length === 1) {
                if(this.output !== '0') {
                    this.output = '0.00';
                } else {
                    return;
                }  
            } else {
                this.output = this.output.slice(0, -1);
            }
        }
        clearNum() {
            this.output = '0.00';
        }
        saveNum() {
            this.$emit('update:output', this.output);
            this.$emit('submit', this.output);
            this.output = '0.00';
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.outputBox{
    @extend %clearFix;
    height: 48px;
    line-height: 48px;
    >.output {
            padding: 0 16px;
            font-size: 24px;
            float: right;
    }
}
.numPad {
    @extend %clearFix;
    li {
        border-left: 1px solid $color-border;
        border-top: 1px solid $color-border;
        width: 25%;
        height: $height-number;
        line-height: 56px;
        font-size:24px;
        float: left;

        &.ok {
            height: $height-number*2;
            line-height: $height-number*2;
            background-color: #666;
            color: #fff;
            float: right;
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