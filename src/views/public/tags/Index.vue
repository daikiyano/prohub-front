<template>
  <div class="p-d-flex items-center">
    <Card style="margin: 0 auto; margin-top: 50px; width: 95%;" class="p-mr-5">
      <template #content>
         <h1>タグ一覧</h1>
          <TagList :tags='state.tags'/>
          <div v-for="site in state.sites" :key="site.id" class="p-d-flex items-center">
            <Card style="margin: 0 auto; margin-top: 50px;" class="p-mr-5">
<template #header>
<h1>{{site['name']}}</h1>
   </template>
    <template #title>
        <a :href="'/sites/' + site['id']">
                <img :src="site['image_url']" alt="masi" style="height: 270px; width:70%;"/>
              </a><br>
              <span v-for="tag in site['tags']" :key="tag['name']">
              <a :href="`/tags/${tag['name']}`"><PrimeTag :value="tag['name']" class="p-mr-2 p-text-left"></PrimeTag></a>
              </span>
              </template>
              </Card>
               </div>
       </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive,onMounted} from 'vue';
import TagList from '@/components/TagList.vue'; // @ is an alias to /src
import { Tag } from '@/types/tag';
import Card from 'primevue/card';
import { Site } from '@/types/site';


import PrimeTag from 'primevue/tag';


import axios from "@/lib/axios"
export default defineComponent({
  name: 'Index',
 components: {
    TagList,
    Card,
    PrimeTag
  },
  
  setup() {
     const state = reactive({
      tags: [] as Tag[],
      sites: [] as Site[]
    })
  
    onMounted(async () => {
      const tags = await axios.get('/api/v1/public/tags')
      const sites = await axios.get<Site[]>(
        '/api/v1/public/sites'
      );
      state.tags = tags.data
      state.sites = sites.data
    })

    return {
      state
    }
  }

});
</script>

<style scoped>

</style>
