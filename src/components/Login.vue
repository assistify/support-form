  <template>
  <b-container class="login_page">
    <b-card align="center" header="Assistify" header-tag="header" class="mb-2">

      <b-form @submit="onLogin" @reset="onClose" >
        <div v-if="!show">
          <b-form-row align-h="center" class="my-3">
          <b-input-group
            class="mb-3"
            prepend="Server"
            size=""
          >
            <b-form-input placeholder="Enter the URL https://.." v-model="form.url"></b-form-input>
            <b-input-group-append>
              <b-button size="sm" text="Button" variant="success" @click="onConnect">Connect</b-button>
            </b-input-group-append>
          </b-input-group>
          </b-form-row>
        </div>

        <div v-if="show">
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
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { login, validateURL } from '../api/login'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        url: ''
      },
      err: false,
      show: false
    }
  },
  methods: {
    onLogin: function (event) {
      event.preventDefault()
      const config = {
        server: this.form.url,
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
        } else {
          this.$parent.doLogin(config.server, res.data.authToken, res.data.userId, res.data.me)
        }
      })
    },
    onClose: function (event) {},
    onConnect (event) {
      validateURL(this.form.url, (response, error) => {
        if (error) {
          this.$parent.makeToast({
            text: error,
            title: 'Invalid Server URL',
            variant: 'danger'
          })
        } else {
          this.show = true
        }
      })
    }
  }
}
</script>

<style scoped>
.login_page {
  max-width: 500px;
}
</style>
