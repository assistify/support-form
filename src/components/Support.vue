<template>
  <div>
    <b-container>
      <b-card align="center" header="Ask for Support" header-tag="header" class="mb-2">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

          <b-button type="submit" variant="outline-primary">Submit</b-button>
          <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import {postForm, getChannelKeywords, getJoinedChannels} from '../api/message'

export default {
  name: 'Support',
  data () {
    return {
      form: {
        subject: null,
        description: null
      },
      show: true
    }
  },
  created: function () {
    // Read document cookie
    if (this.$parent.config.server && this.$parent.config.userId && this.$parent.config.authToken) {
      this.keywords = getChannelKeywords(getJoinedChannels(this.$parent.config))
    } else {
      this.$router.push({name: 'Login'})
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const text = this.form.subject
      const channelMatched = this.keywords.find((channel) => {
        const found = channel.keywords.some((kw) => text.includes(kw))
        if (found) {
          return channel.id
        }
      })
      const client = Object.assign({
        channelId: (channelMatched && channelMatched.id) || 'GENERAL'
      }, this.$parent.config)
      postForm(client, this.form, (res, err) => {
        const modalConfig = {
          size: 'sm',
          buttonSize: 'sm',
          headerClass: 'p-2 border-bottom-0',
          centered: true,
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false
        }
        const messageURL = `${this.$parent.config.server}/group/${res.channel.substring(1)}?msg=${res.message._id}`
        if (err) {
          Object.assign(modalConfig, {
            title: 'Failed',
            okVariant: 'error',
            text: 'Discussion cannot be created in Assistify. Please re-try later.'
          })
        } else {
          Object.assign(modalConfig, {
            title: 'Success',
            okVariant: 'success',
            text: 'Discussion was created in Assistify. Would you like to view the discussion?'
          })
        }
        this.$bvModal.msgBoxConfirm(modalConfig.text, modalConfig)
          .then(value => {
            if (value) {
              window.open(messageURL, '_blank')
            }
          })
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.subject = ''
      this.form.description = ''
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
