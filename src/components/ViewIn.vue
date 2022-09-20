<template>
  <div class="q-gutter-md row justify-center" style="margin-top:40px; padding: 20px;">
    <table class="text1 tablefromView">
      <tr>
        <td>CommunicationId</td>
        <td>{{fetchParticularDetails.CommunicationId}}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{fetchParticularDetails.Status}}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>{{fetchParticularDetails.Type}}</td>
      </tr>
      <tr>
        <td>CreatedOn</td>
        <td>{{fetchParticularDetails.CreatedOn}}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{{Detail.Description}}</td>
      </tr>
      <tr>
        <td>Project</td>
        <td>{{Detail.Project}}</td>
      </tr>
      <tr>
        <td>Subject</td>
        <td>{{Detail.Subject}}</td>
      </tr>
      <tr>
        <td>Service</td>
        <td>{{ImageDetail.Service}}</td>
      </tr>
    </table>
  </div>
  <div class="row justify-center items-center">
      <q-btn  icon-right="print" label="Print" style="background: #00203f;color:white" @click="printMyPage"/>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import dashboardData from "../nucleus/DashboardData.json"

  export default {
    data(){
      return{
        id: this.$route.params.CommunicationId,
        fetchedCommunications: '',
        fetchParticularDetails: '',
        Detail: '',
        ImageDetail: ''
      }
    },

    methods: {
      fetchCommunications(){
        var responseData = dashboardData;
        if(responseData.Status === "OK"){
          this.fetchedCommunications = responseData.ResponseJson.Communications;
          this.fetchParticularDetails = this.fetchedCommunications.find(details => details.CommunicationId == this.id);
          this.Detail = this.fetchParticularDetails.Detail;
          this.ImageDetail = this.Detail.ImageDetail[0].DocumentData;
        }
        return this.fetchParticularDetails;
      },
      printMyPage(){
        window.print();
      }
    },

    mounted(){
      this.$q.loading.hide();
      this.fetchCommunications();
    }
  }

</script>


<style scoped>
.text1{
  font-size: 1.2em;
  letter-spacing: 2px;
}
.globalFiltersStyle{
  color: #00203f;
}

.tablefromView td{
  padding: 10px 100px;
  border-collapse: collapse;
  border: 1px solid white;
  border-bottom: 1px solid #00203f;
}
tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>
