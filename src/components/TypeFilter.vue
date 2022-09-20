<template>
  <q-select v-model="type" :options="options" label="Type" class="globalFiltersStyle" @update:model-value="handleFilterType"/>
</template>

<script>
  import { ref } from 'vue'

  export default {
    props: ['type'],
    data () {
      return {
        options: [
          'All','Road Defects', 'Water Quality', 'Road Signs', 'Sewage Issues', 'Water Pipeline', 'Other'
        ]
      }
    },
    methods: {
      handleFilterType(){
        this.$emit('filterType', this.type)
      },
    },
  }
  </script>

  <style>
    .globalFiltersStyle{
      color: #00203f;
      width: 40%;
      margin-bottom: 20px;
    }
  </style>
