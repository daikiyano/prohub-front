<template>
  <div class="flex items-center h-screen w-full bg-teal-lighter">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4">
      <div class="card">
        <h1>ログイン</h1>
        <form @submit.prevent="handleLogin(!v$.$invalid)" class="p-fluid">
          <div class="p-field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}"/>
              <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
              <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
            </div>
          </div>
          <div class="p-field">
            <div class="p-float-label p-input-icon-right">
              <Password id="password" toggleMask v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}"/>
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">パスワード</label>
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
            </div>
          </div>
          <div class="p-field">
            <Button type="submit" label="ログイン" class="p-button-raised p-button-secondary" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, toRefs, ref } from 'vue';
import { userLogin } from '@/api/public/user/auth';
import { useRouter } from 'vue-router'


// Vue Prime
import Button from 'primevue/button';
import Password from 'primevue/password';

// Vuelidate
import useVuelidate from '@vuelidate/core'
import { required, email } from "@vuelidate/validators";

export default defineComponent({
  name: 'Login',
  components: {
    Button,
    Password
  },
  setup() {
     // ルーティング定義
    const router = useRouter()
    
    const formData = reactive({
      email: '',
      password: ''
    })

    const rules = {
      email: { required, email },
      password: { required },
    };

    const submitted = ref(false);
    const v$ = useVuelidate(rules, formData);

   
    return {
      ...toRefs(formData),
      handleLogin: async (isFormValid: any) => {
        submitted.value = true;
          if (!isFormValid) {
            return;
          }
        await userLogin(formData.email, formData.password)
        .then((res) => {
          if (res?.status === 200) {
            console.log(res)
            router.push('/')
          } else {
            alert('メールアドレスかパスワードが間違っています。')
          }
          })
        .catch(() => {
          alert('ログインに失敗しました。')
        })
    },
    v$,
    submitted
    }
  }
});
</script>
