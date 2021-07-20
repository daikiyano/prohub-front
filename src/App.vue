<template>
  <div id="nav">
    <AdminHeader v-if="isAdmin" />
    <Header v-if="!isAdmin" />
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminHeader from '@/components/AdminHeader.vue'; // @ is an alias to /src
import Header from '@/components/Header.vue'; // @ is an alias to /src


export default defineComponent({
  name: 'App',
  components: {
    AdminHeader,
    Header
  },
  setup() {
    const isAdmin = localStorage.getItem('admin')
    return {isAdmin}
  }
 
});
</script>


<style>

body {
  background-color: #FAFAFA;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
