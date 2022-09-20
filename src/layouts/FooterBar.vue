<template>
  <div class="row justify-end bg-white shadow-5 group text-secondary print-hide">
    <div class="vertical-middle text-right q-pt-xs">
      <span>Powered By </span>
      <a href="http://freethink.co.in" target="_blank" class="">
        <span v-if="$q.screen.gt.md" >freethink </span>
        <img class="smallImage" src="~assets/freethinkLogo.png"/>
      </a>
      | <span class="text-black q-mr-xs">v2022.08.04</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'footerBar',
  data () {
    return {
      aboutUs: false
    }
  }
}
</script>


<style scoped>

a{
  text-decoration: none;
  color: black;
}

.smallImage {
  width: 14px;
  height: 14px;
}

</style>
