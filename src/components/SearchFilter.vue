<template>
    <q-input v-model="searchKeywords" clearable label="Search" @update:model-value="handleFilterSearch" class="globalFiltersStyle"/>
</template>

<script>
  import { ref } from 'vue'

  export default {
    props: ['searchKeywords'],
    data () {
      return {
      }
    },
    methods: {
      handleFilterSearch(){
        this.$emit('filterSearch', this.searchKeywords)
      }
    }
  }
  </script>
