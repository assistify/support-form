<template>
  <b-container fluid>
    <b-table bordered striped hover :items="mappings" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="edit(row.item, row.index, $event.target)" class="mr-1">Edit</b-button>
      </template>
    </b-table>
    <b-modal centered class="mt-3" :id="editModal.id" :title="editModal.title" hide-footer>
      <b-form ref="saveKeyword" @submit.stop.prevent="handleSave">
        <b-form-textarea id="keyword-textarea" rows="4" no-resize v-model="editModal.content"></b-form-textarea>
      </b-form>

      <div class="mt-2 float-right">
        <b-button class="mt-2" size="sm" variant="success" @click="save">Save</b-button>
        <b-button
          class="mt-2"
          size="sm"
          variant="danger"
          @click="$bvModal.hide(editModal.id)"
        >Cancel</b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { getJoinedChannels, setChannelKeywords } from '../api/message'
export default {
  data () {
    return {
      selectMode: 'single',
      fields: [
        { key: 'channel', label: 'Channel' },
        { key: 'keywords', label: 'Keywords' },
        { key: 'actions', label: 'Actions' }
      ],
      editModal: {
        id: 'modal-edit-keywords',
        title: '',
        channelId: '',
        content: ''
      }
    }
  },
  created () {
    const channels = getJoinedChannels(this.$parent.config)
    this.mappings = channels
      .filter(channel => !channel.prid)
      .map(channel => {
        return {
          id: channel._id,
          channel: channel.name,
          type: channel.t,
          keywords:
            (channel.customFields && channel.customFields.hasOwnProperty('keywords') &&
              channel.customFields.keywords.join(',')) || null
        }
      })
  },
  methods: {
    edit (item, index, button) {
      this.editModal.title = `Update keywords for channel: ${item.channel}`
      this.editModal.channelId = item.id
      this.editModal.type = item.type
      this.editModal.content = item.keywords
      this.$bvModal.show(this.editModal.id)
    },
    save (item, index, button) {
      this.$bvModal.hide(this.editModal.id)
      const channel = {
        id: this.editModal.channelId,
        type: this.editModal.type,
        keywords: this.editModal.content.split(',')
      }
      this.handleSave(channel)
    },
    handleSave (channel) {
      const mappings = this.mappings
      setChannelKeywords(this.$parent.config, channel, (res, err) => {
        if (err) {
          alert(JSON.string(err))
        } else {
          const roomId = (res.channel && res.channel._id) || (res.group && res.group._id)
          const index = mappings.findIndex(map => map.id === roomId)
          const keywords = (res.channel && res.channel.customFields.keywords.join(',')) ||
                          (res.group && res.group.customFields.keywords.join(','))
          mappings[index].keywords = keywords
        }
      })
    }
  }
}
</script>
