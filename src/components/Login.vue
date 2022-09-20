<template>
  <div>
    <div v-if="$route.query.redirect" class="notification center-align bg-negative text-white full-width text-center">
      <q-icon name="error_outline"/>You need to login first !!!
    </div>
    <form @submit.prevent.stop="login">

    <div class="q-page background q-ma-sm">
      <div class="row justify-center" >
        <q-card class="col-md-3 col-sm-6 col-xs-11 col-auto absolute-center q-pa-lg shadow-24 LoginDiv rounded-borders"  >
          <q-card-section align="center" >
            <q-img
              src="statics/icons/Hub_100x100.png"
              spinner-color="white"
              style="height: 100px; max-width: 100px"
              class="rounded-borders"
            />
            <div class="text-h5 text-bold q-pt-sm">LOGIN</div>
          </q-card-section>

          <q-card-section class="">
            <q-input v-model="username" ref="username" stack-label label="Username"
            type="text" @keyup.enter="login" class="full-width q-pb-lg"
            :rules="[ val=> checkValidation(val,'required', 'Username') || 'Please Enter Username']"/>
            <q-input v-model="password" ref="password" stack-label :type="isPassword ? 'password' : 'text'" label="Password" @keyup.enter="login" class="full-width q-pb-lg"
            :rules="[ val=> checkValidation(val,'required', 'Password') || 'Please Enter Password']">
              <template v-slot:append>
                <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions vertical align="center" class="">
            <q-btn outline type="submit" color="secondary" style="margin-left:0px" class="q-px-lg ">Login</q-btn>
             <div class="q-pa-lg q-gutter-sm">
               <router-link to="" style="text-decoration:none; color:black"> Forgot Username?</router-link>
               <router-link to="" style="text-decoration:none; color:black"> Forgot Password?</router-link>
             </div>
             <q-separator color="grey" inset></q-separator>
          <div class="q-pa-md">
            Don't have an account?&nbsp; <router-link to="" style="text-decoration:none; color:#fc7668;">SignUp</router-link>
          </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
import serviceHandlerMixin from "./serviceHandlerMixin"
import validatorMixin from "./validatorMixin"
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      isPassword:true,
    }
  },
  methods: {
    login (e) {
      this.$refs.username.validate()
      this.$refs.password.validate()

      if (this.$refs.username.hasError || this.$refs.password.hasError) {
        this.formHasError = true
        return
      }
      if (this.username == this.$store.state.username && this.password == this.$store.state.password) {
        this.$store.dispatch('login')
        this.redirectToLandingPage()
      } else {
        this.displayMsg("error","Authentication Failed.");
      }
    },
    redirectToLandingPage: function () {
      this.$router.push({path:'theHub'})
    },
  },
  mounted(){},
  mixins: [serviceHandlerMixin, validatorMixin]
}
</script>

<style scoped>

.notification {
  line-height: 36px
}
/* Change background Image */
.background{
  min-height: 88.5vh;
  background: require("statics/PWDBackground.png") repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.LoginDiv {
  min-width: 280px;
}
.cardActions{
  justify-items: center;
  align-items: start;
}
</style>
