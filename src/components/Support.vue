<template>
<div>
    <b-container>
      <b-card align="center" header="Assistify Support" header-tag="header" class="mb-2">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Subject:" label-for="input-3">
          <b-form-input id="input-3" v-model="form.subject" required placeholder="Enter subject"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Description:" label-for="input-4">
          <b-form-textarea
            id="input-3"
            v-model="form.description"
            required
            rows="3"
            max-rows="6"
            placeholder="Enter Description"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { postForm } from '../api/message'
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        subject: null,
        descrition: null
      },
      show: true
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      await postForm(this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
