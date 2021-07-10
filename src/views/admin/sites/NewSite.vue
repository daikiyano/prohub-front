<template>
  <div class="flex items-center h-screen w-full bg-teal-lighter">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4">
      <h1>New Post</h1>
      <div class="flex flex-col mb-4">
        <label for="name">Name</label>
        <input v-model='name' type="text" name="first_name" id="first_name">
      </div>
      <div class="flex flex-col mb-4">
        <label for="description">Description</label>
        <textarea v-model='description' name="body" id="body"></textarea>
      </div>
      <div class="flex flex-col mb-4">
        <label for="url">公式URL</label>
        <textarea v-model='url' name="body" id="body"></textarea>
      </div>
      <div class="flex flex-col mb-4">
        <label for="price">価格</label>
        <textarea v-model='price' name="body" id="body"></textarea>
      </div>
      <div class="flex flex-col mb-4">
        <label for="price">image</label>
              <input type="file" id="image" name="image" accept="image/png,image/jpeg" @change="setImage($event)" />

      </div>
      <button @click='handleCreateSite()' type="submit">Create Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { createSite } from '@/api/admin/site'
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'NewSite',
  setup () {
    // ルーティング定義
    const router = useRouter()
    // const route = useRoute()

    // サイト情報変数
    const siteData = reactive({
      name: '',
      description: '',
      url: '',
      price: ''
    })

    // サイト情報をセットするためのFormData
    const formData = new FormData();
    //画像アップロード時にformdataにセットする
    const setImage = (e: Event): void => {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement && e.target.files) {
        formData.append('image',e.target.files[0])
      }
    }

    const setFormData = (): void => {
      formData.append('name',siteData.name)
      formData.append('description',siteData.description)
      formData.append('url',siteData.url)
      formData.append('price',siteData.price)
    }

    const handleCreateSite = async () => {
      setFormData()
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
      setImage
    }
  }
})
</script>

<style scoped></style>