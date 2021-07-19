<template>
  <div class="flex items-center h-screen w-full bg-teal-lighter">
    <div class="w-full bg-white rounded shadow-lg p-8 m-4">
      <div class="card">
        <h1>会員登録</h1>
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
              <i class="pi pi-envelope" />
              <InputText id="username" v-model="v$.username.$model" :class="{'p-invalid':v$.username.$invalid && submitted}"/>
              <label for="username" :class="{'p-error':v$.username.$invalid && submitted}">ユーザー名*</label>
              <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error">{{v$.username.required.$message.replace('Value', 'username')}}</small>
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
            <div class="p-float-label p-input-icon-right">
              <Password id="confirm_password" toggleMask v-model="v$.confirm_password.$model" :class="{'p-invalid':v$.confirm_password.$invalid && submitted}"/>
              <label for="confirm_password" :class="{'p-error':v$.confirm_password.$invalid && submitted}">パスワード(確認用)</label>
              <small v-if="(v$.confirm_password.sameAsPassword.$invalid && submitted) || v$.confirm_password.sameAsPassword.$pending.$response" class="p-error">{{v$.confirm_password.sameAsPassword.$message.replace('Value', 'Confirm Password')}}</small>
            </div>
          </div>
          <div class="p-field">
            <Button type="submit" label="会員登録" class="p-button-raised p-button-secondary" />
          </div>
        </form>
          <div class="p-field">
            <Button type="submit" @click="checkAuth()" label="認証チェック" class="p-button-success" />
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, toRefs, ref, computed } from 'vue';
import { login,judgeAdminAuthToken } from '@/api/admin/auth';

// Vue Prime
import Button from 'primevue/button';
import Password from 'primevue/password';

// Vuelidate
import useVuelidate from '@vuelidate/core'
import { required, email,sameAs } from "@vuelidate/validators";

export default defineComponent({
  name: 'Signup',
  components: {
    Button,
    Password
  },
  setup() {
    const formData = reactive({
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    })
    const passwordRef = computed(() => formData.password);
    const rules = {
      email: { required, email },
      username: { required },
      password: { required },
      confirm_password: { sameAsPassword: sameAs(passwordRef)},
    };

    const submitted = ref(false);
    const v$ = useVuelidate(rules, formData);

    const checkAuth = async () => {
      console.log("aassa")
      const data = await judgeAdminAuthToken().catch(() => alert('ログインに失敗しました。'));
    }
    return {
      ...toRefs(formData),
      handleLogin: async (isFormValid: any) => {
        submitted.value = true;
        console.log("got itaa")
          if (!isFormValid) {
            return;
          }
          console.log("got it")
        // await login(formData.email, formData.password)
        // .then((res) => {
        //   if (res?.status === 200) {
        //     console.log(res)
        //   } else {
        //     alert('メールアドレスかパスワードが間違っています。')
        //   }
        //   })
        // .catch(() => {
        //   alert('ログインに失敗しました。')
        // })
    },
    checkAuth,
    v$,
    submitted
    }
  }
});
</script>
