const serviceHandlerMixin = {
    data () {
      return {}
    },
    methods: {
      displayMsg: function(msgType, errorMsg) {
        switch(msgType)
        {
          case "error":
              this.$q.notify({
                message: errorMsg,
                icon: 'alarm_add',
                timeout: 2500,
                color: 'red-4',
              })
              break;
          case "warning":
              this.$q.notify({
                message: errorMsg,
                icon: 'warning',
                timeout: 2500,
                color: 'warning',
                textColor: "black"
              })
              break;
          case "info":
              this.$q.notify({
                message: errorMsg,
                icon: 'info',
                timeout: 2500,
                color: 'info'
              })
              break;
          case "network":
              this.$q.notify({
                message: 'Error in Network. Please try again!',
                icon: 'wifi_off',
                timeout: 2500,
                color: 'red-4',
                bgColor: 'white'
              })
              break;
          case "success":
              this.$q.notify({
                message: errorMsg,
                icon: 'done_all',
                timeout: 2500,
                color: 'green-4',
              })
              break;
          default:
              this.$q.notify({
                message: errorMsg,
                icon: 'alarm_add',
                timeout: 2500,
                color: 'red-4'
              })
        }
      },
      handleError: function(errorCode, errorMsg) {
        if(errorCode > 80000){
          this.displayMsg("warning", errorMsg);
          return;
        }
        switch(errorCode)
        {
          case 50120:
            this.$store.dispatch('logout')
            this.$router.push('/')
            this.displayMsg("error", errorMsg);
            break;
          case 50110:
            this.$store.dispatch('logout')
            this.$router.push('/');
            this.displayMsg("error", errorMsg);
            break;
          default:
            this.displayMsg("error", errorMsg);
        }
      },
    }
  }
  
  export default serviceHandlerMixin
  