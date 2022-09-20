<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat class="tabColor">
      <q-toolbar justify-between style="min-height: 60px;">
        <q-btn icon="img:statics/icons/Hub_36x36.png" class="" outline style="color: #fff;" label="Utility Hub" @click="redirect()"/>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <footer-bar></footer-bar>
    </q-footer>
  </q-layout>
</template>

<script>
  import FooterBar from './FooterBar'
export default {
  name: 'BasicLayout',
  components: {
    FooterBar
  },
  data () {
    return {}
  },
  methods: {
    redirect: function () {
      this.$router.push('/').catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    }
  }
}
</script>
