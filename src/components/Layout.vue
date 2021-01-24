<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    import Nav from '@/components/Nav.vue';

    export default{
        name: 'Layout',
        components: {
            Nav
        }
    }
</script>
<style lang="scss" scoped>
 .nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    border: 1px solid black;
    > .content {
        // border: 1px solid blue;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
    }
  }
</style>
