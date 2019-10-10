  <template>
  <b-container class="login_page">
    <b-card align="center" header="Assistify" header-tag="header" class="mb-2">
      <b-form @submit="onLogin" @reset="onClose" v-if="show">
        <b-form-row align-h="center" class="my-3">
          <b-col>
            <b-form-input
              id="input-username"
              v-model="form.username"
              :state="null"
              placeholder="Username"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row align-h="center" class="my-3">
          <b-col>
            <b-form-input
              id="input-password"
              v-model="form.password"
              :state="null"
              type="password"
              placeholder="Password"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row align="center" class="my-3">
          <b-col>
            <b-button block type="submit" variant="outline-primary">Login</b-button>
          </b-col>
        </b-form-row>
        <b-form-row align-h="center" class="my-3">
          <b-col>
            <b-button block type="reset" variant="light">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import {login} from '../api/login'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      err: false,
      show: true
    }
  },
  created () {
    this.loginStatus()
  },
  methods: {
    onLogin: function (event) {
      event.preventDefault()
      const config = {
        server: 'http://localhost:3000',
        user: this.form.username,
        password: this.form.password
      }
      login(config, (res, err) => {
        if (err) {
          this.$parent.makeToast({
            text: err.responseJSON.message,
            title: 'Login failed',
            variant: 'danger'
          })
          return
        }
        this.$cookies.set('authToken', res.data.authToken)
        this.$cookies.set('userId', res.data.userId)
        this.$router.push({ name: 'Support',
          query:
          {
            userId: res.data.userId,
            authToken: res.data.authToken
          }
        })
      })
    },
    loginStatus: function (event) {
    },
    onClose: function (event) {}
  }
}
</script>

<style scoped>
.login_page {
  max-width: 500px;
}
</style>
