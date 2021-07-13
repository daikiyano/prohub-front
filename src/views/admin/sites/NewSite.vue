<template>
  <div class="flex items-center h-screen w-full bg-teal-lighter">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4">
      <h1>New Post</h1>
      <div class="card">
        <div class="p-fluid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <span class="p-float-label">
              <InputText id="name" type="text" v-model="name" />
              <label for="name">サイト名</label>
            </span>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <span class="p-float-label">
              <Textarea id="textarea" v-model="description" rows="10" />
              <label for="textarea">サイト概要</label>
            </span>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <span class="p-float-label">
              <InputText id="url" type="text" v-model="url" />
              <label for="url">公式サイトURL</label>
            </span>
          </div>
          <div class="p-field p-col-12 p-md-4">
            <span class="p-float-label">
              <InputText id="price" type="text" v-model="price" />
              <label for="price">価格</label>
            </span>
          </div>
          <div class="flex flex-col mb-4">
        <h5>サイト画像</h5>
          <input type="file" id="image" name="image" accept="image/png,image/jpeg" @change="setImage($event)" />
          <!-- <FileUpload mode="basic" name="demo[]" accept="image/png,image/jpeg" :customUpload="true" :auto="true" @uploader="setImage"/> -->
      </div>
        </div>
      </div>
     
       <div class="flex flex-col mb-4">
        <label for="price">タグ</label>
        <AutoComplete :multiple="true" v-model="selectedTags" :suggestions="filteredTags" @complete="searchTag($event)" field="name" />
{{selectedTags}}
      </div>
      <button @click='handleCreateSite()' type="submit">Create Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { createSite } from '@/api/admin/site'
import { defineComponent, reactive, toRefs,onMounted ,ref} from 'vue'
import { useRouter } from 'vue-router'
import {
  getAuthDataFromStorage
} from '@/utils/auth-data'
// import { Tag } from "/app/src/types/tag"
import  Tag  from '@/types/tag';
import axios from "@/lib/axios"

import AutoComplete from 'primevue/autocomplete';
import Textarea from 'primevue/textarea';


export default defineComponent({
  name: 'NewSite',
  components: {
    AutoComplete,
    Textarea,
  },
  setup () {
    // ルーティング定義
    const router = useRouter()

    // サイト情報変数
    const siteData = reactive({
      name: '',
      description: '',
      url: '',
      price: ''
    })

    const state = reactive({
      tags: [] as Tag[]
    })

    onMounted(async() => {
      const response = await axios.get<Tag[]>(
        '/api/v1/admin/tags',
        {
      headers: getAuthDataFromStorage()
    }
      );
      console.log(response.data)
      console.log("heyyyyyyyy")
      state.tags = response.data
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

    // サイト情報をセットするためのFormData
    const formData = new FormData();
    //画像アップロード時にformdataにセットする
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

    const handleCreateSite = async () => {
      setFormData()
      console.log(formData)
      await createSite(formData)
        .then((res) => {
          console.log(res)
          alert("サイト情報を登録しました")
          router.push('/admin/sites')
        })
    }

    return {
      ...toRefs(siteData),
      handleCreateSite,
      setImage,
      searchTag,
      filteredTags,
      selectedTags,
      state,
    }
  }
})
</script>

<style scoped></style>