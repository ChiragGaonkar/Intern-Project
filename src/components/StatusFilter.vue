<template>
  <q-select v-model="status"  :options="options" label="Status" class="globalFiltersStyle" @update:model-value="handleFilterStatus"/>
</template>

<script>
  import { ref } from 'vue'

  export default {
    props: ['status'],
    data () {
      return {
        options: [
          'All',
          'NEW',
          'ASSIGNED',
          'CLOSED',
        ]
      }
    },
    methods: {
      handleFilterStatus(){
        this.$emit('filterStatus', this.status)
      }
    }
  }
  </script>
