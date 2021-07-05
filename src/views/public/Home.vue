<template>
  <div class="home">
    <h1>{{message}}</h1>
    <h1 @click="getTag()">テスト</h1>
    <li v-for="tag in state.tags" :key="tag.id">
        <h2> {{ tag.name }}</h2>
      </li>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Tag from '@/types/Tag';
import axios from 'axios'


interface State {
  tags: Tag[];
}

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const message = ref("Hello Worlds");
     const state = reactive<State>({
      tags: []
    })

    const getTag = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/public/sites')
      state.tags = response.data
      console.log(state.tags)
      
    }

    return {
      message,
      getTag,
      state
    }
  }
});
</script>
