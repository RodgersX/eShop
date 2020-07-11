<template>
  <div>
    <v-layout column justify-center align-center class="secondaryDark" style="height:100vh!important">
      <v-card dark flat class="transparent red--text error-messages" width="550">
        <span v-for="(error, i) in errors" :key="i">{{ error.message }}</span>
      </v-card>

      <form @submit.prevent="register">
        <v-layout column align-center justify-center>
          <v-row>
            <v-text-field rounded solo v-model="email" label="E-mail" :rules="emailRules" style="width:350px!important"
              required>
            </v-text-field>
          </v-row>
          <v-row>
            <v-text-field rounded solo v-model="password" label="Create Password" :rules="passwordRules"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
              @click:append="show = !show" style="width:350px!important" required>
            </v-text-field>
          </v-row>
          <v-row>
            <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
              @click:append="showe = !showe" rounded solo v-model="password_confirmation" label="Confirm Password"
              style="width:350px!important" required>
            </v-text-field>
          </v-row>
          <!-- <v-btn small text color="grey" class="mb-2">FORGOT YOUR PASSWORD</v-btn> -->
          <v-layout column justify-center align-center>
            <v-btn text to="/login" small color="white" class=" subtitle mb-4 text-capitalize">
              <span>Have an account? Login</span>
            </v-btn>
          </v-layout>

          <v-layout row wrap justify-center align-center>
            <v-layout class="overlay" v-if="showLoader">
              <v-progress-circular indeterminate color="uzared"></v-progress-circular>
            </v-layout>
            <v-btn v-else color="uzared" dark depressed type="submit" height="50" width="200">
              REGISTER
            </v-btn>
          </v-layout>
        </v-layout>
      </form>
    </v-layout>
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <v-card
        color="white"
      >
        <v-card-text>
          <v-layout column justify-center align-center>
          <span class="title text-center ma-3"> Your account was successfully created<br />
          <v-icon size="90" class="pa-3">mdi-emoticon-excited-outline</v-icon><br /></span>
          Please wait...
          <v-progress-linear
            indeterminate
            color="secondaryDark"
            class="mb-0"
          ></v-progress-linear>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @group Auth
export default {
  components: {
    //
  },
  data () {
    return {
      valid: true,
      show: false,
      showe: false,
      email: '',
      // This is the users password
      password: '',
      dialog: false,
      password_confirmation: '',
      role: 'Admin',
      errors: [],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 6) || 'Name must be more than 6 characters'
      ]
    }
  },

  watch: {
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 5000)
    }
  },
  computed: {
    showLoader () {
      return this.$store.state.showLoader
    },
    notSamePasswords () {
      if (this.passwordsFilled) {
        return (this.user.password !== this.password_confirmation)
      } else {
        return false
      }
    },
    passwordsFilled () {
      return (this.user.password !== '' && this.password_confirmation !== '')
    }
  },
  methods: {
    /**
   * @vuese
   * This method is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="blank"> Promise</a> base and used to register the user. The store dispatches the logout action
   * @arg Please refer to action.js
   */
    register: function () {
      this.$store
        .dispatch('register', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.dialog = true
          this.$router.push('/login')
          this.errors = []
        })
        .catch(err => {
          this.errors.push(err)
        })
    }
  }
}

</script>

<style scoped>
  .login {
    background: #fff;
    width: 100vw;
    height: 100vh
  }

  .box {
    width: 240px !important;
  }

</style>
