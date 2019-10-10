<template>
  <form id="login" v-on:submit.prevent="login" class="login_form">
    <div class="fields">
      <span v-if="err">error</span>
      <div class="input">
        <label class="label" for="username">
          <div class="input_wrapper">
            <input
              v-model="input.username"
              class="input_elem"
              id="user"
              type="text"
              autocapitalize="off"
              autocorrect="off"
              placeholder="Nutzername"
            />
          </div>
        </label>
      </div>

      <div class="input">
        <label class="label" for="password">
          <div class="input_wrapper">
            <input
              v-model="input.password"
              class="input_elem"
              id="pass"
              type="password"
              autocapitalize="off"
              autocorrect="off"
              placeholder="Passwort"
            />
          </div>
        </label>
      </div>
      <button class="button">Anmelden</button>
    </div>
  </form>
</template>

<script>
import {login} from '../api/login'
export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      },
      err: false
    }
  },
  created () {
    this.loginStatus()
  },
  methods: {
    login: async function (event) {
      const config = {
        server: 'http://localhost:3000',
        user: this.input.username,
        password: this.input.password
      }
      await login(config, (res, err) => {
        if (err) {
          this.err = true
        }
        document.cookie = res
        this.$router.push({name: 'Support'})
      })
    },
    loginStatus: function (event) {
    }
  }
}
</script>

<style scoped>
.login_form {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(47, 52, 61, 0.08),
    0 0 12px 0 rgba(47, 52, 61, 0.12);
  background-color: #fff;
  color: #444;
}

.input {
  position: relative;
  width: 100%;
}

.label {
  display: block;
  cursor: pointer;
}

.input_elem {
  width: 100%;
  height: 2.5rem;
  text-align: start;
  text-overflow: ellipsis;
  color: #414852;
  border-width: 2px;
  border-color: #e1e5e8;
  border-radius: 3px;
  background-color: transparent;
  font-size: 0.875rem;
  line-height: normal;
  border-style: solid;
}

.input_wrapper {
  position: relative;
  padding: 0.5rem 0;
}

.button {
  margin: 0 5px;
  display: flex;
  height: 40px;
}
</style>
