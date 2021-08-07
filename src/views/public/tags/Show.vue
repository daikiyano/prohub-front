<template>
  <div>
    <!-- <div class="w-full bg-white rounded shadow-lg p-8 m-4"> -->
      <Card style="width: 85%; margin: 0 auto; height: 100%;">
        <template #content>
        <h1>{{keyword}}の検索結果</h1>
        <div class="p-d-flex p-flex-column p-flex-md-row items-center">
          <div v-for="site in state.sites" :key="site.id">
            <Card style="margin: 0 auto; margin-top: 50px;" class="p-mr-5">
              <template #header>
              <h1>{{site['name']}}</h1>
              </template>
               <template #title>
              <a :href="'/sites/' + site['id']">
                <img :src="site['image_url']" :alt="site['name']" style="height: 270px; max-width: 100%;"/>
              </a><br>
              <PrimeTag v-for="tag in site['tags']" :key="tag['id']" :value="tag['name']" class="p-mr-2 p-text-left"></PrimeTag>
              </template>
             </Card>
          </div>
        </div>
         <h1>{{keyword}}のQiita最新記事</h1>
          <Accordion :multiple="true">
            <AccordionTab v-for="detail in state.qiita" :key="detail.url">
              <template #header>
                <span><img :src="detail['profile_image_url']" :alt="detail['title']" style="height: 50px; width:50px;"/>{{ detail['title'] }}</span>
              </template>
            </AccordionTab>
          </Accordion>
         <h1>{{keyword}}のConnpass最新イベント</h1>
         <Accordion :multiple="true">
            <AccordionTab v-for="connpassEvent in state.connpassEvents" :key="connpassEvent.url">
              <template #header>
              <span>{{connpassEvent['title']}}<PrimeTag v-if="connpassEvent['address']==='オンライン'" :value="connpassEvent['address']" class="p-mr-2 p-text-left"></PrimeTag></span>
            </template>
            <p v-html="connpassEvent['description']" style="font-size: 15px; text-align: left;"></p>
            </AccordionTab>
          </Accordion>
        </template>
      </Card>
    </div>
</template>1

<script lang="ts">
import { defineComponent,reactive,onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { Site } from '@/types/site';
import { Qiita } from '@/types/qiita';
import { Connpass } from '@/types/connpass';
import { TagShowForRequest } from '@/types/tag';


import axios from "@/lib/axios"

// primevue
import PrimeTag from 'primevue/tag';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default defineComponent({
  name: 'Show',
  components: {
    PrimeTag,
    Card,
    Accordion,
    AccordionTab
  },
  setup() {
    const route = useRoute()
    const keyword = route.params.id
    console.log(route.params.id)

    const state = reactive({
      sites: [] as Site[],
      qiita: [] as Qiita[],
      connpassEvents: [] as Connpass[]
    })

    onMounted(async() => {
      const response = await axios.get(
        `/api/v1/public/tags/${route.params.id}`
      );
      console.log(response.data)
      console.log("heyyyyyyyyyy")
      state.sites = response.data.sites
      state.qiita = response.data.qiita
      state.connpassEvents = response.data.connpass
      console.log(response.data.connpass)
    })
    return {
      state,
      keyword
    }
  }

});
</script>

<style scoped>

.p-accordion-header {
  background-color: red;
  color: white;
}
</style>
