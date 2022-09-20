<template>
  <div class="q-pa-md inputData">
    <q-input readonly style="width:100%; padding:0px 0px" class="row justify-center items-center" label="Between">
      <div style="width:100%" class="row justify-start items-center">
        {{formatMyDate(date.from)}} - {{formatMyDate(date.to)}}
      </div>
      <div class="row justify-end items-center">
        <q-btn icon="event" round color="primary" style="width:40px; height:40px">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" range @update:model-value="handleFilterDate">
              <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>
    </q-input>
  </div>
</template>

<script>
import { ref } from 'vue'
import { date } from "quasar";

export default {
  props: ['date'],
  data () {
    return{

    }
  },
  methods:{
    handleFilterDate(){
      this.$emit('filterDate', this.date)
    },
    formatMyDate(unformatedDate){
      let formattedString = date.formatDate(unformatedDate, "DD/MMM/YYYY")
      return formattedString;
    }
  }
}
</script>

<style scoped>
  .inputData{
    padding: 0px;
    width: 40%;
    margin-bottom: 20px;
  }
</style>

