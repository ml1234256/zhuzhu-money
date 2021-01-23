<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '@/components/Layout.vue';

Vue.component('Layout', Layout);

export default Vue.extend({

})
</script>
<style lang="scss">
@import "~@/assets/styles/reset.scss";
@import "~@/assets/styles/helper.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: $font-hei;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}
 
</style>
