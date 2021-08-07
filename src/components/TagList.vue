<template>
  <div class="hello">
    <template v-for="tag in tags" :key="tag.id">
      <a :href="`/tags/${tag['name']}`">
        <PrimeTag :value="tag.name" class="p-mr-2 p-mt-2"></PrimeTag>
      </a>
    </template>   
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType } from 'vue';
// import Tag from '@/types/tag';
import  {Tag}  from "@/types/tag"
import PrimeTag from 'primevue/tag';


export default defineComponent({
  name: 'TagList',
  components: {
    PrimeTag,
  },
  props: {
    tags: {
      required: true,
      type: Array as PropType<Tag[]>
    }
  },
  setup(props){
    return {props}
  }
});
</script>
<style scoped>

.p-tag	{
  background-color: rgba(0,0,0,0.8);
  color: white;
}
</style>
