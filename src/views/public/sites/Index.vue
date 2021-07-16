<template>
  <div>
   <Splitter style="height: 300px">
	<SplitterPanel :size="20">
		Panel 1
	</SplitterPanel>
	<SplitterPanel :size="80">
		Panel 2
	</SplitterPanel>
</Splitter>
      <h1>一覧ページ</h1>
        <div class="p-d-flex items-center">
          <div v-for="site in state.sites" :key="site.id" class="card">
            <div class="p-shadow-1 p-col p-m-4">
              <h1>{{site['name']}}</h1>
              <a :href="'/admin/sites/' + site['id']">
                <img :src="site['image_url']" alt="masi" style="height: 300px; width:500px;"/>
              </a>
            <PrimeTag v-for="tag in site['tags']" :key="tag['id']" :value="tag['name']" class="p-mr-2"></PrimeTag>
            </div>
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

import PrimeTag from 'primevue/tag';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

export default defineComponent({
  name: 'IndexSite',
  components: {
    PrimeTag,
    Splitter,
    SplitterPanel
  },
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
