<template>
  <div>
    <div>
      <Card style="width: 80%; margin: 0 auto; margin-top: 50px;">
        <template #header>
          <h1>{{state.sites['name']}}</h1>
        </template>
        <template #title>
          <img :src="state.sites['image_url']" alt="masi" style="height: 400px; max-width: 70%;"/>
        </template>
        <template #subtitle>
          <div class="p-text-left">
          <PrimeTag v-for="tag in state.sites['tags']" :key="tag['id']" :value="tag['name']" class="p-m-1"></PrimeTag>
        </div>
        </template>
        <template #content>
          <div class="p-text-left">
          <h2>概要</h2>
          <p class="p-mb-3 p-text-bold">{{state.sites['description']}}</p>
          <h2>価格</h2>
          <p class="p-mb-3 p-text-bold">{{state.sites['price']}}</p>
          <h2>公式URL</h2>
          {{state.sites['url']}}
          <h2>このサイトをレビュー</h2>
          <div>
          <h3>総合評価</h3>
          <form @submit.prevent="handleCreateSiteComment(!v$.$invalid)" class="p-fluid">
              <star-rating   
                  v-model="v$.review.$model"
                  v-bind:increment="0.5"
                  v-bind:star-size="40"
                  :show-rating="false"
                  :read-only="false"
              ></star-rating>
              <h3>レビューを追加</h3>
              <div style="width: 90%; margin: 0 auto;">
                <span class="p-float-label">
                <Textarea id="textarea" rows="10" v-model="v$.comment.$model" style="width: 100%;" :class="{'p-invalid':v$.comment.$invalid && submitted}" />
                  <small v-if="(v$.comment.$invalid && submitted) || v$.comment.$pending.$response" class="p-error">{{v$.comment.required.$message.replace('Value', 'Comment')}}</small>
                </span>
                </div>
                <Button type="submit" label="Submit" class="p-button-raised p-button-secondary" />

                </form>
            </div>
           </div>
      </template>
     </Card>

       
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import {Site} from '@/types/site';
import axios from "@/lib/axios"
import Card from 'primevue/card';

import PrimeTag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';


// Vuelidate
import useVuelidate from '@vuelidate/core'
import { required } from "@vuelidate/validators";




export default defineComponent({
  name: 'ShowSite',
  components: {
    PrimeTag,
    Card,
    Textarea,
    Button
  },
  setup() {
    const route = useRoute()

    const state = reactive({
      sites: [] as Site[]
    })
    const commentData = reactive({
      review: '',
      comment: ''
    })

    const rules = {
      review: { required },
      comment: { required }
    };

    const submitted = ref(false);
    const v$ = useVuelidate(rules, commentData);


    onMounted(async() => {
      const response = await axios.get<Site[]>(
        `/api/v1/public/sites/${route.params.id}`
      );
      console.log(response.data)
      state.sites = response.data
    })

    const handleCreateSiteComment = async (isFormValid: any) => {
      submitted.value = true;
      console.log("hey")
      if (!isFormValid) {
        return;
      }
      console.log("go")
    }
  
    return {
      state,
      v$,
      submitted,
      handleCreateSiteComment
      
    }
  }
})
</script>

<style scoped></style>