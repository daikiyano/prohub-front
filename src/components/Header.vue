<template>
  <div>
    <Menubar :model="items">
      <template #start>
        ProHub{{uid}}
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
  removeAuthUserDataFromStorage
} from '@/utils/user-data'
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
    
    const uid = localStorage.getItem('uid')
    const items = ref([
            {
                label:'サイト',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'一覧',
                        icon:'pi pi-fw pi-pencil',
                        to: "/",
                        command: () => {
                          router.push('/')
                        }
                       
                    },
                 
               ]
            },
            {
               label: uid ? "Log out" : "Log in",
               icon:'pi pi-fw pi-power-off',
               command: () => {
                if (uid) {
                  removeAuthUserDataFromStorage()
                  router.push('/')
                }
                  router.push('/login')
                },
            }
        ]);
    return { items,uid }
  }
});
</script>
<style scoped>
.p-menubar {
  background-color: rgba(2, 184, 117, 1);
  color: white;
}

.p-menubar-root-list	{
  color: white;
}
</style>
