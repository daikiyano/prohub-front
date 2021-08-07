<template>
  <div>

      <h1>一覧ページ</h1>
        <div class="p-d-flex items-center">
          <div v-for="article in state.articles" :key="article.id">
            <Card style="margin: 0 auto; margin-top: 50px; width: 30em;" class="p-mr-5">
              <template #header>
              <h1>{{article['title']}}{{article['thumbnail']}}</h1>
              </template>
               <template #title>
              <!-- <a :href="'/sites/' + site['id']">
                <img :src="site['image_url']" alt="masi" style="height: 270px; width:100%;"/>
              </a> -->
              <template v-for="article in article['tags']" :key="article['name']">
              <a :href="`/tags/${article['name']}`"><PrimeTag :value="article['name']" class="p-mr-2 p-text-left"></PrimeTag></a>
              </template>
              </template>
             </Card>
          </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import axios from "@/lib/axios"
import Card from 'primevue/card';


import PrimeTag from 'primevue/tag';


export default defineComponent({
  name: 'Index',
  components: {
    PrimeTag,
    Card
  },
  setup () {
    const state = reactive({
      articles: [] 
    })

    onMounted(async() => {
      const response = await axios.get(
        '/api/v1/public/articles'
      );
      state.articles = response.data
    })

    return {
      state
    }
  }
})
</script>

<style scoped></style>
