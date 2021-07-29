<template>
  <div>

      <h1>一覧ページ</h1>
        <div class="p-d-flex items-center">
          <div v-for="site in state.sites" :key="site.id">
            <Card style="margin: 0 auto; margin-top: 50px; width: 30em;" class="p-mr-5">
              <template #header>
              <h1>{{site['name']}}</h1>
              </template>
               <template #title>
              <a :href="'/sites/' + site['id']">
                <img :src="site['image_url']" alt="masi" style="height: 270px; width:100%;"/>
              </a>
              <template v-for="tag in site['tags']" :key="tag['name']">
              <a :href="`/tags/${tag['name']}`"><PrimeTag :value="tag['name']" class="p-mr-2 p-text-left"></PrimeTag></a>
              </template>
              </template>
             </Card>
          </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import { Site } from '@/types/site';
import axios from "@/lib/axios"
import Card from 'primevue/card';


import PrimeTag from 'primevue/tag';


export default defineComponent({
  name: 'IndexSite',
  components: {
    PrimeTag,
    Card
  },
  setup () {
    const state = reactive({
      sites: [] as Site[]
    })

    onMounted(async() => {
      const response = await axios.get<Site[]>(
        '/api/v1/public/sites'
      );
      state.sites = response.data
    })

    return {
      state
    }
  }
})
</script>

<style scoped></style>
