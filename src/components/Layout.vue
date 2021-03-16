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
    @media (min-width: 500px) {
        width: 375px;
        height: 667px;
        border: 1px solid #d9d9d9;
        margin: 20px auto;
    } 
    > .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
    }
  }
</style>
