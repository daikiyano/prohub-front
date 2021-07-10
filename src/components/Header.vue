<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <div v-if="!isAdmin">aa</div>
        <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="p-mr-2">
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import {
  removeAuthDataFromStorage
} from '@/utils/auth-data'
import { useRouter } from 'vue-router'

//Prime Vue
import Menubar from 'primevue/menubar';
// import { useToast } from "primevue/usetoast";



export default defineComponent({
  name: 'Header',
  components: {
    Menubar
  },
 
  setup(){
    // ルーティング定義
    const router = useRouter()
   // Prime vue
    
    const isAdmin = localStorage.getItem('admin')
    const items = ref([
            {
                label:'サイト',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'一覧',
                        icon:'pi pi-fw pi-pencil',
                        to: "/admin/sites",
                        command: () => {
                          router.push('/admin/sites')
                        }
                       
                    },
                 
               ]
            },
            {
               label: isAdmin ? "Log out" : "Log in",
               icon:'pi pi-fw pi-power-off',
               command: () => {
                if (isAdmin) {
                  removeAuthDataFromStorage()
                  router.push('/admin/login')
                }
                  router.push('/admin/login')
                },
            }
        ]);
    return {items,isAdmin}
  }
});
</script>
<style scoped>

</style>
