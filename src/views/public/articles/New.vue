<template>
    <div class="flex items-center h-screen w-full bg-teal-lighter">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4">
      <div class="card">
      <h1>共有したい勉強方法</h1>
        <form @submit.prevent="handleCreateArticle(!v$.$invalid)" class="p-fluid">
          <div class="p-field">
            <span class="p-float-label">
              <InputText id="title" type="text" v-model="v$.title.$model" :class="{'p-invalid':v$.title.$invalid && submitted}" />
              <label for="title" :class="{'p-error':v$.title.$invalid && submitted}">記事のタイトル</label>
              <small v-if="(v$.title.$invalid && submitted) || v$.title.$pending.$response" class="p-error">{{v$.title.required.$message.replace('Value', 'タイトル')}}</small>
            </span>
          </div>
           <div class="p-field">
            <span class="p-float-label">
            <AutoComplete :multiple="true" v-model="v$.selectedTags.$model" :suggestions="filteredTags" @complete="searchTag($event)" field="name" />
            <label for="textarea" :class="{'p-error':v$.selectedTags.$invalid && submitted}">記事の技術タグ</label>
              <small v-if="(v$.selectedTags.$invalid && submitted) || v$.selectedTags.$pending.$response" class="p-error">{{v$.selectedTags.required.$message.replace('Value', 'タグ')}}</small>
              </span>
          </div>
          <div class="p-field">
            <span class="p-float-label">
              <Editor v-model="v$.body.$model" editorStyle="height: 320px" :class="{'p-invalid':v$.body.$invalid && submitted}"/>
              <!-- <Textarea id="textarea" v-model="v$.body.$model" :class="{'p-invalid':v$.body.$invalid && submitted}" rows="15" /> -->
              <label for="textarea" :class="{'p-error':v$.body.$invalid && submitted}">サイト概要*</label>
              <small v-if="(v$.body.$invalid && submitted) || v$.body.$pending.$response" class="p-error">{{v$.body.required.$message.replace('Value', '本文')}}</small>
            </span>
          </div>
          <div class="p-field">
            <label for="emoji">サムネイル画像</label>
            <Picker :data="emojiData.emojiIndex" set="twitter" @select="showEmoji" style="margin: 0 auto;" />
            <label for="textarea" :class="{'p-error':v$.emojisOutput.$invalid && submitted}">サムネイル画像</label>
              <small v-if="(v$.emojisOutput.$invalid && submitted) || v$.emojisOutput.$pending.$response" class="p-error">{{v$.emojisOutput.required.$message.replace('Value', 'サムネイル')}}</small>
            <h1 style="font-size:5rem;width:100%;text-align:center;">{{ v$.emojisOutput.$model }}</h1>
          </div>
          <Button type="submit" label="Submit" class="p-button-raised p-button-secondary" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,ref ,toRefs, onMounted} from 'vue'

// Vue Prime
import AutoComplete from 'primevue/autocomplete';
// import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Editor from 'primevue/editor';

// Vuelidate
import useVuelidate from '@vuelidate/core'
import { required } from "@vuelidate/validators";

// 型定義
import  {Tag}  from '@/types/tag';
import axios from "@/lib/axios"

import data from "emoji-mart-vue-fast/data/all.json";
// Note: component needs to be imported from /src subfolder:
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { createArticle } from '@/api/public/article'


let emojiIndex = new EmojiIndex(data);


export default defineComponent({
  name: 'New',
  components: {
    // Textarea,
    Button,
    AutoComplete,
    Editor,
    Picker
  },
  setup () {


    const emojiData = reactive({
      emojiIndex: emojiIndex,
      // emojisOutput: ""
    })

    const showEmoji = (emoji: any) => {
      articleData.emojisOutput = articleData.emojisOutput + emoji.native;
    }
    // 記事情報変数
    const articleData = reactive({
      title: '',
      body: '利用したサイトやツール、書籍などを共有しましょう',
      selectedTags: [],
      emojisOutput: ''
    })

    const rules = {
      title: { required },
      body: { required },
      selectedTags:  { required },
      emojisOutput: { required }
    };

    const state = reactive({
      tags: [] as Tag[]
    })

    onMounted(async() => {
      const response = await axios.get<Tag[]>(
        '/api/v1/public/tags',
    
      );
      console.log(response.data)
      state.tags = response.data
    })

    const submitted = ref(false);
    const v$ = useVuelidate(rules, articleData);
    const filteredTags = ref();
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

    const setFormData = (): void => {
      formData.append('article[title]',articleData.title)
      formData.append('article[body]',articleData.body)
      formData.append('tag[tags]',JSON.stringify(articleData.selectedTags))
      formData.append('article[thumbnail]',articleData.emojisOutput)
    }
    const handleCreateArticle = async (isFormValid: any) => {
      submitted.value = true;
      if (!isFormValid) {
        return;
      }
      setFormData()
      await createArticle(formData)
        .then((res) => {
          console.log(res)
          alert("サイト情報を登録しました")
          // router.push('/admin/sites')
        })
      
    }

return {
      ...toRefs(articleData),
      v$,
      submitted,
      handleCreateArticle,
      searchTag,
      filteredTags,
      emojiData,
      showEmoji
    }
  }
  
 

   
})
</script>

<style scoped>
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


</style>