<template>
    <nav>
      <router-link to="/detail" class="item" active-class="selected">
      <Icon name="label" />
      明细
      </router-link>
       
      <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      记账
      </router-link>
      
      <router-link to='/statistics' class="item" active-class="selected">
      <Icon name="statistics" />
      统计
      </router-link>

    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav',
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
nav {
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    padding: 5px 0 2px 0;
    > .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        line-height: 1.5;
    }
    .icon {
        width: 28px;
        height: 28px;
    }
    > .selected {
        color: $color-highlight;
    }
}
</style>