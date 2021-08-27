<template>
    <div class="flex items-center h-screen w-full bg-teal-lighter">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4">
    <div class="card">
      <h1>編集フォーム</h1>
      <form @submit.prevent="handleUpdateSite(!v$.$invalid)" class="p-fluid">
        <div class="p-field">
          <span class="p-float-label">
            <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">サイト名(必須)</label>
            <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
          </span>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <Textarea id="textarea" v-model="v$.description.$model" :class="{'p-invalid':v$.description.$invalid && submitted}" rows="15" />
            <label for="textarea" :class="{'p-error':v$.description.$invalid && submitted}">サイト概要*</label>
            <small v-if="(v$.description.$invalid && submitted) || v$.description.$pending.$response" class="p-error">{{v$.description.required.$message.replace('Value', 'Description')}}</small>
          </span>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <InputText id="url" type="text" v-model="v$.url.$model" :class="{'p-invalid':v$.url.$invalid && submitted}" />
            <label for="url" :class="{'p-error':v$.url.$invalid && submitted}">公式サイトURL</label>
            <small v-if="(v$.url.$invalid && submitted) || v$.url.$pending.$response" class="p-error">{{v$.url.required.$message.replace('Value', 'URL')}}</small>
          </span>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <InputText id="price" type="text" v-model="v$.price.$model" :class="{'p-invalid':v$.price.$invalid && submitted}" />
            <label for="price" :class="{'p-error':v$.price.$invalid && submitted}">価格</label>
            <small v-if="(v$.price.$invalid && submitted) || v$.price.$pending.$response" class="p-error">{{v$.price.required.$message.replace('Value', '価格')}}</small>
          </span>
        </div>
        <div class="p-field">
          <span class="p-float-label">
            <AutoComplete :multiple="true" v-model="selectedTags" :suggestions="filteredTags" @complete="searchTag($event)" field="name" />
            <label for="selectedTags">タグ</label>
          </span>
        </div>
        <div class="p-field">
          <label for="price">画像</label>
          <input type="file" id="image" name="image" accept="image/png,image/jpeg" @change="setImage($event)" />
        </div>
        <Button type="submit" label="Submit" class="p-button-raised p-button-secondary" />
        </form>
      </div>
      </div>
      </div>
</template>

<script lang="ts">
import { defineComponent,onMounted, reactive, ref } from 'vue'
import { updateSite } from '@/api/admin/site'

import {
  getAuthAdminDataFromStorage
} from '@/utils/auth-data'
import { useRoute,useRouter } from 'vue-router'

// 型定義
import {Site} from '@/types/site';
import  {Tag } from '@/types/tag';
import axios from "@/lib/axios"

// Vue Prime
import AutoComplete from 'primevue/autocomplete';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

// Vuelidate
import useVuelidate from '@vuelidate/core'
import { required } from "@vuelidate/validators";



export default defineComponent({
  name: 'Edit',
  components: {
    AutoComplete,
    Textarea,
    Button
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    // サイト関連
    const siteData = reactive({
      name: '',
      description: '',
      url: '',
      price: '',
      image_url: '',
    })

    const rules = {
      name: { required },
      description: { required },
      url: { required },
      price: { required },
    };

    const submitted = ref(false);
    const v$ = useVuelidate(rules, siteData);

    const handleUpdateSite = async (isFormValid: any) => {
            submitted.value = true;
            console.log("heyy")
            if (!isFormValid) {
                return;
            }
            setFormData()
      console.log(formData)
      await updateSite(formData,route.params.id)
        .then((res) => {
          console.log(res)
          alert("サイト情報を登録しました")
          router.push(`/admin/sites/${route.params.id}`)
        })
        }


    
    onMounted(async() => {
      const response = await axios.get<any>(
        `/api/v1/admin/sites/${route.params.id}`,
        {
      headers: getAuthAdminDataFromStorage()
    }
      );
      console.log(response.data)
      siteData.name = response.data['name']
      siteData.description = response.data['description']
      siteData.url = response.data['url']
      siteData.price = response.data['price']
      siteData.image_url = response.data['image_url']
      selectedTags.value = response.data['tags']
    })


    //タグ関連
    const state = reactive({
      tags: [] as Tag[]
    })
    const filteredTags = ref();
    const selectedTags = ref([] as any);
    const searchTag = (event: any) => {
      setTimeout(() => {
        if (!event.query.trim().length) {
          filteredTags.value = [...state.tags];
        } else {
          filteredTags.value = state.tags.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
        }, 250);
      };
    onMounted(async() => {
      const response = await axios.get<Tag[]>(
        '/api/v1/admin/tags',
        {
      headers: getAuthAdminDataFromStorage()
    }
      );
      console.log(response.data)
      console.log("heyyyyyyyy")
      state.tags = response.data
    })
    // サイト情報をセットするためのFormData
    const formData = new FormData();

    //画像アップロード時にformdataにセットする
    const setImage = (e: Event): void => {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement && e.target.files) {
        formData.append('site[image]',e.target.files[0])
      }
    }

    const setFormData = (): void => {
      formData.append('site[name]',siteData.name)
      formData.append('site[description]',siteData.description)
      formData.append('site[url]',siteData.url)
      formData.append('site[price]',siteData.price)
      formData.append('tag[tags]',JSON.stringify(selectedTags.value))
    }

    return {
      siteData,
      state,
      searchTag,
      filteredTags,
      selectedTags,
      handleUpdateSite,
      setImage,
      v$,
      submitted
    }
  }
 
  
})
</script>

<style scoped>
/* .form-demo { */
    .card {
        min-width: 450px;  
    }
    .p-field {
            margin-bottom: 1.5rem;
        }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
    }
/* } */

</style>
