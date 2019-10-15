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
      const text = this.form.subject + ' ' + this.form.description
      const channelMatched = this.keywords.find((channel) => channel.keywords.some((kw) => text.includes(kw)))
      const client = Object.assign({
        channelId: (channelMatched && channelMatched.id) || 'GENERAL',
        channelType: (channelMatched && channelMatched.type) || 'p'
      }, this.$parent.config)
      postForm(client, this.form, (res, err) => {
        const modalConfig = {
          size: 'sm',
          buttonSize: 'sm',
          headerClass: 'p-2 border-bottom-0',
          centered: true,
          footerClass: 'p-2',
          hideHeaderClose: false
        }
        let messageURL
        if (err) {
          Object.assign(modalConfig, {
            title: 'Failed',
            okVariant: 'error',
            okTitle: 'Ok',
            text: 'Discussion cannot be created in Assistify. Please re-try later.\nDetails: ' + err.responseJSON.error
          })
        } else {
          Object.assign(modalConfig, {
            title: 'Success',
            okVariant: 'success',
            okTitle: 'YES',
            cancelTitle: 'NO',
            text: 'Discussion was created in Assistify. Would you like to view the discussion?'
          })
          messageURL = `${this.$parent.config.server}/group/${res.channel.substring(1)}?msg=${res.message._id}`
        }
        this.$bvModal.msgBoxConfirm(modalConfig.text, modalConfig)
          .then(value => {
            if (value && messageURL) {
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
