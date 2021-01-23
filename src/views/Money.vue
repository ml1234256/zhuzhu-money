<template>
    <div>
        <Layout>
            <Tags />
            <OutputBox />
            <NumberPad />
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Tags from '@/components/Money/Tags.vue';
    import OutputBox from "@/components/Money/OutputBox.vue";
    import NumberPad from "@/components/Money/NumberPad.vue";


    export default Vue.extend({
        name: "Money",
        components: {
            Tags,
            OutputBox,
            NumberPad
        }
    })
</script>

<style lang="scss" scoped>




</style>