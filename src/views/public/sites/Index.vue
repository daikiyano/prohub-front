<template>
  <div>
      <h1>一覧ページ</h1>
        <div class="p-d-flex items-center">
          <div v-for="site in state.sites" :key="site.id" class="card">
            <div class="p-shadow-1 p-col p-m-4">
              <h1>{{site['name']}}</h1>
              <a :href="'/sites/' + site['id']">
                <img :src="site['image_url']" alt="masi" style="height: 300px; width:500px;"/>
              </a>
            <PrimeTag v-for="tag in site['tags']" :key="tag['id']" :value="tag['name']" class="p-mr-2"></PrimeTag>
            </div>
            <star-rating
             v-bind:increment="0.1"
             v-bind:star-size="20"
             :show-rating="false"
             :read-only="true"
            ></star-rating>
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
    PrimeTag
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
