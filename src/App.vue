<template>
  <div id="app">
    <Header v-show="$route.meta.show"/>
    <Main>
      <router-view></router-view>
    </Main>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Main from './components/Main/Main.vue'
export default {
  name: 'App',
  components: {
    Header,Main
  },
  data(){
    return{

    }
  },
  methods:{
    
  }
}
</script>

<style>

</style>
