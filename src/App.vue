<template>
  <div id="nav">
    <AdminHeader v-if="isAdmin" />
    <Header v-if="!isAdmin" />
    <div class="p-lg-2 p-col-0" style="height: 100%; background-color: red;">
      aaaaa
    </div>
  <div class="p-lg-10 p-col-12">
  <router-view/>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminHeader from '@/components/AdminHeader.vue'; // @ is an alias to /src
import Header from '@/components/Header.vue'; // @ is an alias to /src


export default defineComponent({
  name: 'App',
  components: {
    AdminHeader,
    Header,
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
