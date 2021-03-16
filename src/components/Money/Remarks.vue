<template>
            <div class="remarkWrapper">
                <input  type="date" class="date" @change="onChange">          
                <input  type="text" :value="value" @input="onInput" placeholder="备注..."/>
            </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Remarks extends Vue{
        @Prop(String) value: string | undefined;
        mounted() {
            (document.querySelector('.date') as HTMLInputElement).valueAsDate = new Date();
        }
        onInput(event: Event){
            this.$emit('update:value', (event.target as HTMLTextAreaElement).value);
        }
        onChange(event: Event){
            this.$emit('update:date',(event.target as HTMLTextAreaElement).value);
        }

    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.remarkWrapper {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;
    padding: 0 5px;
    display: flex;
    align-items: center;
        > input {
                border: 1px solid $color-border;
            }
    input {
        flex-grow: 1;
        height: 48px;
        border: none;
    }
}

</style>