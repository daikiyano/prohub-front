<template>
  <div>
    <div>
    <h1>一覧ページ</h1>
    <!-- {{state.sites}} -->
    <div class="p-d-flex">
     <div v-for="site in state.sites" :key="site.id">
    <div class="p-mr-2">Item 1

       <h1>{{site['name']}}</h1>
       <a :href="'/admin/sites/' + site['id']">
          <img :src="site['image_url']" alt="masi" style="height: 300px; width:400px;"/>
        </a>
        <div v-for="tag in site['tags']" :key="tag['id']">
          <PrimeTag :value="tag['name']"></PrimeTag>
        </div> 
      </div>  
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import {
  getAuthAdminDataFromStorage
} from '@/utils/auth-data'
import { Site } from '@/types/site';
import axios from "@/lib/axios"

import PrimeTag from 'primevue/tag';


export default defineComponent({
  name: 'IndexSite',
  components: {
    PrimeTag,
  },
  setup () {
    const state = reactive({
      sites: [] as Site[]
    })

    onMounted(async() => {
      const response = await axios.get<Site[]>(
        '/api/v1/admin/sites',
        {
      headers: getAuthAdminDataFromStorage()
    }
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