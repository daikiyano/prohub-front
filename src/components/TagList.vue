<template>
  <div class="hello" style="width: 200px;">
    <span v-for="tag in tags" :key="tag.id">
      <PrimeTag :value="tag.name"></PrimeTag>

        <!-- <h2> {{ tag.name }}</h2> -->
      </span>   
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType } from 'vue';
// import Tag from '@/types/tag';
import  Tag  from "@/types/tag"
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

</style>
