<template>
  <div>
    <div>
    <h1>一覧ページ</h1>
     <div v-for="site in state.sites" :key="site.id">
       <a :href="'/sites/' + site.id">
          <img :src="site.image_url" alt="masi" style="height: 300px; width:400px;"/>
          {{site}}
        </a>
      </div>  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue'
import {
  getAuthDataFromStorage
} from '@/utils/auth-data'
import { Site } from '@/types/site';
import axios from "@/lib/axios"

export default defineComponent({
  name: 'IndexSite',
  setup () {
    const state = reactive({
      sites: [] as Site[]
    })

    onMounted(async() => {
      const response = await axios.get<Site[]>(
        '/api/v1/admin/sites',
        {
      headers: getAuthDataFromStorage()
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