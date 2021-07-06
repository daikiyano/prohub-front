<template>
  <div class="hello">
    <li v-for="tag in tags" :key="tag.id">
        <h2> {{ tag.name }}</h2>
      </li>   
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType } from 'vue';
import Tag from '@/types/tag';

export default defineComponent({
  name: 'TagList',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
