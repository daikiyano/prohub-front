<template>
  <div class="home">
    <h1>{{message}}</h1>
    
<TagList :tags='state.tags'/>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive,onMounted } from 'vue';
import TagList from '@/components/TagList.vue'; // @ is an alias to /src
import Tag from '@/types/tag';

import axios from "@/lib/axios"



interface State {
  tags: Tag[];
}

export default defineComponent({
  name: 'Home',
  components: {
    TagList,
  },
  setup() {
    const message = ref("Pro Hub");
     const state = reactive<State>({
      tags: []
    })

    onMounted(async () => {
      console.log(process.env.NODE_ENV)
      const response = await axios.get('/api/v1/public/sites')
      state.tags = response.data
      console.log("heyy")
      
      
    })
    // 通常メソッドの書き方
    // const getTag = async () => {
    //   const response = await axios.get('http://localhost:3000/api/v1/public/sites')
    //   // state.tags = response.data
    //   // console.log(state.tags)      
    // }

    return {
      message,
      state
    }
  }
});
</script>
