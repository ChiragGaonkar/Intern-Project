<template>
  <div class="q-ma-sm">

    <q-toggle v-model="visibleFilters" label="Make Filters Visible" class="q-mb-md" />
    <q-slide-transition>
      <div class="q-gutter-md row justify-center" v-show="visibleFilters">
        <TypeFilter @filterType='handleFilterType' :type="typeChoosen"></TypeFilter>
        <StatusFilter @filterStatus="handleFilterStatus" :status="statusChoosen"></StatusFilter>
        <DateFilter @filterDate="handleFilterDate" :date="{from: startDateChoosen,to: endDateChoosen}"></DateFilter>
        <SearchFilter @filterSearch="handleFilterSearch" :searchKeywords="searchKeywordChoosen"></SearchFilter>
        <div>
          <q-btn  icon-right="search" label="Apply Filters" class="filterBtns" @click="applyFilters"/>
          <q-btn  icon-right="refresh" label="Reset Filters" class="filterBtns" @click="resetFilters"/>
        </div>
      </div>
    </q-slide-transition>

    <q-table
      :title="'Table Dashboard'"
      :rows="filteredData"
      :columns="columns"
      row-key="name"
      class="gt-sm"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="CommunicationId" :props="props">{{ props.row.CommunicationId }}</q-td>
          <q-td key="Subject" :props="props">{{ props.row.Subject }}</q-td>
          <q-td key="Type" :props="props">{{ props.row.Type }}</q-td>
          <q-td key="Status" :props="props">{{ props.row.Status }}</q-td>
          <q-td key="Date" :props="props">{{ props.row.Date }}</q-td>
          <q-td key="Action"  :props="props"><q-btn color="primary" size="sm" label="View"
          @click="redirectToViewCommunicationDetail(props.row.CommunicationId)"
          /></q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="lt-md" >
      <div v-if="data.length==0" class="flex flex-center">No Results Found!</div>
      <div>
        <q-card class="q-mb-sm" v-for="(task,index) in data" :key="index">
          <q-card-section>
            <div class="text-h6">{{task.Subject}}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div v-for="(column,index) in columns" :key="index">
              <q-input v-if="column.name!='Action'" readonly v-model="task[column.name]" :label="column.label" />
              <q-btn v-if="column.name=='Action'" color="primary" class="q-mt-sm full-width " text-color="white" label="View" title="View Task" @click="redirectToViewCommunicationDetail()"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { date } from "quasar";
  import { ref } from 'vue'
  import serviceHandlerMixin from "src/components/serviceHandlerMixin"
  import dashboardData from "./DashboardData.json"
  import TypeFilter from "src/components/TypeFilter.vue";
  import StatusFilter from "../components/StatusFilter.vue";
  import SearchFilter from "src/components/SearchFilter.vue";
  import DateFilter from "../components/DateFilter.vue";
  export default {
    name: "viewConsumerCommunicationDashboard",
    data() {
        return {
            data: [],
            columns: [
                { name: "CommunicationId", align: "left", label: "Id", field: "CommunicationId" },
                { name: "Subject", label: "Subject", align: "left", field: "Subject" },
                { name: "Type", label: "Type", align: "left", field: "Type" },
                { name: "Status", label: "Status", align: "left", field: "Status" },
                { name: "Date", label: "Date", align: "left", field: "Date" },
                { name: "Action", label: "View", align: "center", field: "Action" },
            ],
            fetchedCommunications: [],
            typeChoosen: '',
            statusChoosen: '',
            searchKeywordChoosen: '',
            startDateChoosen: '',
            endDateChoosen: '',
            stringfyData: '',
            option: '',
            filteredData: [],
            tempFilteredData0: [],
            tempFilteredData1: [],
            visibleFilters: ref(false),

        };
    },
    computed: {},
    methods: {
        redirectToHome: function () {
            this.$router.push("/theHub");
        },

        formatDate(unformatedDate) {
            let formattedString = date.formatDate(unformatedDate, "DD/MMM/YYYY");
            return formattedString;
        },

        redirectToViewCommunicationDetail(communId) {
          this.$q.loading.show
          this.$router.push({name: 'viewIn', params: {CommunicationId: communId}});
          // or
          // this.$router.push({path : 'view/communId'})
        },

        handleFilterType(type){
          this.typeChoosen = type;
        },

        handleFilterStatus(status){
          this.statusChoosen = status;
        },

        handleFilterSearch(searchKeyword){
          this.searchKeywordChoosen = searchKeyword;
          this.filterBySearch();
        },

        handleFilterDate(date){
          this.startDateChoosen = Date.parse(this.formatDate(date.from));
          this.endDateChoosen = Date.parse(this.formatDate(date.to));
        },

        applyFilters(){
          this.searchKeywordChoosen = '',
          this.filterMyData();
        },

        resetFilters(){
          this.typeChoosen = '',
          this.statusChoosen = '',
          this.startDateChoosen = '',
          this.endDateChoosen = '',
          this.searchKeywordChoosen = '',
          this.filterMyData();
        },

        fetchCommunications() {
            this.data = [];
            var responseData = dashboardData;
            if (responseData.Status === "OK") {
                this.fetchedCommunications = responseData.ResponseJson.Communications;
                var self = this;
                this.fetchedCommunications.forEach(function (communication) {
                    var obj = {};
                    obj["CommunicationId"] = communication.CommunicationId;
                    obj["Subject"] = self.truncateString(communication.Detail.Subject);
                    obj["Type"] = communication.Type;
                    obj["Status"] = communication.Status;
                    obj["Date"] = self.formatDate(communication.CreatedOn);
                    obj["Action"] = "";
                    self.data.push(obj);
                });
                this.filteredData = this.data;
            }
        },

        filterMyData(){
          if(this.data.length > 0){
            if((this.typeChoosen == 'All' && this.statusChoosen == 'All' && this.startDateChoosen == '' && this.endDateChoosen == '')
            || (this.typeChoosen == 'All' && this.statusChoosen == '' && this.startDateChoosen == '' && this.endDateChoosen == '')
            || (this.typeChoosen == '' && this.statusChoosen == 'All' && this.startDateChoosen == '' && this.endDateChoosen == '')
            || (this.typeChoosen == '' && this.statusChoosen == '' && this.startDateChoosen == '' && this.endDateChoosen == '')){
              //If Type and Status filter is not choosen or choosen as All
              console.log("Output Log 1")
              this.filteredData = this.data;
            }else if((this.statusChoosen == '' || this.statusChoosen == 'All')
            &&(this.startDateChoosen == '' && this.endDateChoosen == '')){
              //If Status filter and Date Filter is not choosen or choosen as All
              console.log("Output Log 2")
              this.filteredData = this.data.filter((tempData)=>{
                return tempData.Type == this.typeChoosen
              })
            }else if((this.typeChoosen == '' || this.typeChoosen == 'All')
            &&(this.startDateChoosen == '' && this.endDateChoosen == '')){
              //If Type filter and Date filter is not choosen or choosen as All
              console.log("Output Log 3")
              this.filteredData = this.data.filter((tempData)=>{
                return tempData.Status == this.statusChoosen
              })
            }else if((this.typeChoosen == '' || this.typeChoosen == 'All')
            &&(this.statusChoosen == '' || this.statusChoosen == 'All')){
              //If Type filter and Status filter is not choosen or choosen as All
              console.log("Output Log 4")
              this.filteredData = this.data.filter((tempData)=>{
                return (Date.parse(tempData.Date) >= this.startDateChoosen && Date.parse(tempData.Date)<=this.endDateChoosen)
              })
            }else if((this.typeChoosen != '' || this.typeChoosen != "All")
            && (this.statusChoosen != '' || this.statusChoosen != "All")
            && (this.startDateChoosen == '' && this.endDateChoosen=='')){
              console.log("Output Log 6")
              this.tempFilteredData0 = this.data.filter((tempData)=>{
                return tempData.Type == this.typeChoosen
              })
              this.filteredData = this.tempFilteredData0.filter((tempData)=>{
                return tempData.Status == this.statusChoosen
              })
            }else if((this.typeChoosen != '' || this.typeChoosen != "All")
            && (this.startDateChoosen != '' && this.endDateChoosen != '')
            && (this.statusChoosen == '' || this.statusChoosen == 'All')){
              console.log("Output Log 7")
              this.tempFilteredData0 = this.data.filter((tempData)=>{
                return tempData.Type == this.typeChoosen
              })
              this.filteredData = this.tempFilteredData0.filter((tempData)=>{
                return (Date.parse(tempData.Date) >= this.startDateChoosen && Date.parse(tempData.Date)<=this.endDateChoosen)
              })
            }else if((this.statusChoosen != '' || this.statusChoosen != "All")
            && (this.startDateChoosen != '' && this.endDateChoosen != '')
            && (this.typeChoosen == '' || this.typeChoosen == 'All')){
              console.log("Output Log 8")
              this.tempFilteredData0 = this.data.filter((tempData)=>{
                return tempData.Status == this.statusChoosen
              })
              this.filteredData = this.tempFilteredData0.filter((tempData)=>{
                return (Date.parse(tempData.Date) >= this.startDateChoosen && Date.parse(tempData.Date)<=this.endDateChoosen)
              })
            }
            else{
              //Mixture of both Filters
              console.log("Output Log 5")
              this.tempFilteredData0 = this.data.filter((tempData)=>{
                return tempData.Type == this.typeChoosen
              })
              this.tempFilteredData1 = this.tempFilteredData0.filter((tempData)=>{
                return tempData.Status == this.statusChoosen
              })
              this.filteredData = this.tempFilteredData1.filter((tempData)=>{
                return (Date.parse(tempData.Date) >= this.startDateChoosen && Date.parse(tempData.Date)<=this.endDateChoosen)
              })
            }
          }
        },


        filterBySearch(){
          if(this.filteredData.length > 0){
            this.filteredData = this.filteredData.filter((tempData)=>{
              this.stringfyData = JSON.stringify(tempData);
              this.stringfyData = this.stringfyData.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""]/g," ");
              this.stringfyData = this.stringfyData.replace(/\s{2,}/g," ");
              return this.searchKeywordChoosen
              .toLocaleLowerCase()
              .split(" ")
              .every(v => this.stringfyData.toLowerCase().includes(v));
            })
          }
        },

        truncateString(string) {
            if (string !== undefined && string !== null) {
                if (string.length < 30) {
                    return string;
                }
                else {
                    return string.substring(0, 30) + "...";
                }
            }
            else {
                return "";
            }
        },
    },
    mounted() {
        this.$q.loading.hide();
        this.fetchCommunications();
    },
    mixins: [serviceHandlerMixin],
    components: { TypeFilter, StatusFilter, SearchFilter, DateFilter }
}
</script>
<style type="text/css" scoped>
  .selectStyle{
    min-width: 150px;
  }
  tr:nth-child(even) {
    background-color: #3498db10 !important;
  }
  .filterBtns{
    margin:20px;
    background: #00203f;
    color: white
  }
</style>
