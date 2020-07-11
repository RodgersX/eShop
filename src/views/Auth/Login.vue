<template>
  <div>
    <v-layout column justify-center align-center class="" style="height:100vh!important">
         <v-card dark flat class="transparent red--text error-messages" width="550">
                  <span v-for="(error, i) in errors" :key="i">{{ error.message }}</span>
              </v-card>
      <form @submit.prevent="Login">
         <v-layout column align-center justify-center >
        <v-text-field rounded solo v-model="email" label="E-mail" :rules="emailRules" style="width:350px!important" required>
        </v-text-field>
        <v-text-field rounded solo v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'" :rules="passwordRules" @click:append="show1 = !show1" label="Password"
           style="width:350px!important" required>
        </v-text-field>
        <!-- <v-btn small text color="grey" class="mb-2">FORGOT YOUR PASSWORD</v-btn> -->
        <v-layout column justify-center align-center>
          <v-btn text to="/register" small color="" class=" subtitle mb-4 mt-3 text-capitalize">
            <span>Are you new? Create Account</span>
          </v-btn>
        </v-layout>

        <v-layout row wrap justify-center align-center>
          <v-btn :loading="showLoader"
      :disabled="showLoader" color="uzared" dark depressed type="submit" width="200" height="50">
            Login
          </v-btn>
        </v-layout>
         </v-layout>
          <!-- <div class="d-flex justify-center align-center mt-12">
          <v-progress-circular color="grey ligthen-3" v-show="showLoader"  indeterminate
          ></v-progress-circular>
        </div> -->
      </form>
    </v-layout>
  </div>
</template>

<script>
// @group Auth
export default {
  data () {
    return {
      valid: true,
      show1: false,
      email: '',
      // This is the users password
      password: '',
      errors: [],
      error: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 6) || 'Name must be less than 6 characters'
      ]
    }
  },
  computed: {
    showLoader () {
      return this.$store.state.showLoader
    }
  },
  methods: {
  /**
   * @vuese
   * This method is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="blank"> Promise</a> base and used to login the user. The store dispatches the logout action
   * @arg Please refer to action.js
   */
    Login: function () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.error = true
          this.errors.push(err)
        })
    }
  }
}

</script>
