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
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
 
</style>
