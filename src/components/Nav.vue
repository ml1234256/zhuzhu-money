<template>
    <nav>
      <router-link to="/labels" class="item" active-class="selected">
      <Icon icon-name="label" />
      标签
      </router-link>
       
      <router-link to="/money" class="item" active-class="selected">
      <Icon icon-name="money" />
      记账
      </router-link>
      
      <router-link to='/statistics' class="item" active-class="selected">
      <Icon icon-name="statistics" />
      统计
      </router-link>

    </nav>
</template>

<script lang="ts">
    import Icon from "@/components/Icon.vue";
    export default {
        name: 'Nav',
        components: {
            Icon
        }

    }
</script>

<style lang="scss" scoped>
nav {
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    padding: 4px 0 2px 0;
    > .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // border: 1px solid black;
        flex-grow: 1;
        line-height: 1.5;
        font-size: 14px;
    }
    .icon {
        width: 30px;
        height: 30px;
    }
    > .selected {
        color: red;
    }
}
</style>