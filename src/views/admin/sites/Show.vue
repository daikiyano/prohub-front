<template>
  <div>
    <div>
    <h1>{{state.sites['name']}}
      <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary" @click="redirectToSiteEdit()" />
      <Button icon="pi pi-times" class="p-button-rounded p-button-danger" @click="clickDeleteSite()" />
    </h1>
    <img :src="state.sites['image_url']" alt="masi" style="height: 300px; width:400px;"/>
     {{state.sites['description']}}
     {{state.sites['price']}}
     <div v-for="tag in state.sites['tags']" :key="tag['id']">
          <PrimeTag :value="tag['name']"></PrimeTag>
        </div> 
    </div>
  </div>
  <!-- http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--49cb18282d82e5b2b5af77897ec62e344b476cc6/katie-harp-QqAkoMIN5Jk-unsplash.jpg -->
</template>

<script lang="ts">
import { defineComponent,onMounted, reactive } from 'vue'
import { deleteSite } from '@/api/admin/site'
import {
  getAuthAdminDataFromStorage
} from '@/utils/auth-data'
import { useRoute,useRouter } from 'vue-router'
import {Site} from '@/types/site';
import axios from "@/lib/axios"
import PrimeTag from 'primevue/tag';
import Button from 'primevue/button';



export default defineComponent({
  name: 'ShowSite',
  components: {
    PrimeTag,
    Button
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      sites: [] as Site[]
    })
    onMounted(async() => {
      const response = await axios.get<Site[]>(
        `/api/v1/admin/sites/${route.params.id}`,
        {
      headers: getAuthAdminDataFromStorage()
    }
      );
      console.log(response.data)
      state.sites = response.data
    })
    const redirectToSiteEdit = () => {
      router.push(`/admin/sites/${route.params.id}/edit`)
    }

    const clickDeleteSite = async () => {
      await deleteSite(route.params.id)
        .then((res) => {
          console.log(res)
          alert("サイト情報を削除しました")
          router.push('/admin/sites')
        })
    }
    return {
      state,
      redirectToSiteEdit,
      clickDeleteSite
    }
  }
})
</script>

<style scoped></style>