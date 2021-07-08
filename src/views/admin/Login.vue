<template>
<div>
  <div>
    <label for="email">
      Email
    </label>
    <input v-model="email" id="Email" type="text" placeholder="Email">
  </div>
  <div>
    <label for="password">
      Password
    </label>
    <input v-model="password" id="password" type="password" placeholder="******************">
    <button @click="handleLogin()">
    Sign In
  </button>
   <button @click="checkAuth()">
    認証チェック
  </button>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, toRefs } from 'vue';
import { login,checkToken } from '@/api/admin/auth';


export default defineComponent({
  name: 'Login',
  setup() {
    const formData = reactive({
      email: '',
      password: ''
    })
    // const checkAuth = () => {
    //   console.log("checkouth");
    // };
    const checkAuth = async () => {
      console.log("aaa")
      await checkToken().then((res) => {
          if (res.status === 200) {
            console.log(res)
          } else {
            alert('認証が正しくありません')
          }
          })
        .catch(() => {
          alert('ログインに失敗しました。')
        })
    }
    return {
      ...toRefs(formData),
      handleLogin: async () => {
        await login(formData.email, formData.password)
        .then((res) => {
          if (res?.status === 200) {
            console.log(res)
          } else {
            alert('メールアドレスかパスワードが間違っています。')
          }
          })
        .catch(() => {
          alert('ログインに失敗しました。')
        })
    },
    checkAuth
    }
  }
});
</script>
