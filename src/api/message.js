import $ from 'jquery'
const usageLogger = null

function getParentRoomMembers (client, callback) {
  let url
  if (client.channelType === 'p') {
    url = client.server + '/api/v1/groups.members'
  } else {
    url = client.server + '/api/v1/channels.members'
  }

  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    data: {
      roomId: client.channelId
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}

function createNewDiscussion (client, discussion, callback) {
  $.ajax({
    url: client.server.concat('/api/v1/rooms.createDiscussion'),
    dataType: 'json',
    method: 'POST',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    data: {
      prid: discussion.parentId,
      t_name: discussion.name,
      users: discussion.members
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}

function createDiscussion (client, form, callback) {
  // Get the room in which the form will posted.
  getParentRoomMembers(client, function (response, error) {
    if (error) {
      callback(null, error)
    } else {
      const members = response.members.map(function (member) {
        return member.username
      })
      const discussion = {
        parentId: client.channelId,
        name: form.subject,
        members: members || []
      }
      // Create a new channel
      createNewDiscussion(client, discussion, function (response, error) {
        if (error) {
          callback(null, error)
        } else {
          callback(response)
        }
      })
    }
  })
}

export function postForm (client, form, callback) {
  createDiscussion(client, form, function (response, error) {
    if (error) {
      callback(null, error)
    } else {
      const url = client.server + '/api/v1/chat.postMessage'
      const discussion = response.discussion.name
      $.ajax({
        url: url,
        dataType: 'json',
        method: 'POST',
        headers: {
          'X-Auth-Token': client.authToken,
          'X-User-Id': client.userId
        },
        data: {
          'roomId': response.discussion._id,
          'channel': '#' + discussion,
          'text': form.description
        }
      }).done(function (response) {
        if (usageLogger) {
          sendToLog(client.server.replace(/.*\/\/([^.]+).*/, '$1'), client.userId, response.message.rid)
        }
        callback(response)
      }).fail(function (error) {
        callback(null, error)
      })
    }
  })

  function sendToLog (env, userId, parent) {
    const img = document.createElement('img')
    img.src = usageLogger
    document.body.appendChild(img)
  }
}

export function getChannelKeywords (channels = []) {
  return channels
    .filter((room) => room.hasOwnProperty('customFields') && room.customFields.keywords)
    .map((room) => {
      return {
        id: room._id,
        name: room.fname,
        type: room.t,
        keywords: room.customFields.keywords
      }
    })
}

export function setChannelKeywords (client, channel, callback) {
  const url = channel.type === 'p'
    ? client.server.concat('/api/v1/groups.setCustomFields')
    : client.server.concat('/api/v1/channels.setCustomFields')
  $.ajax({
    url,
    dataType: 'json',
    method: 'POST',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    data: {
      roomId: channel.id,
      customFields: {
        keywords: channel.keywords
      }
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}

export function getJoinedChannels (client) {
  const channelsApi = client.server + '/api/v1/channels.list.joined'
  const groupsApi = client.server + '/api/v1/groups.list'

  const channels = $.ajax({
    url: channelsApi,
    dataType: 'json',
    method: 'GET',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    async: false
  })

  const groups = $.ajax({
    url: groupsApi,
    dataType: 'json',
    method: 'GET',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    async: false
  })

  const rooms = groups.responseJSON.groups.concat(channels.responseJSON.channels)
  return rooms.sort((first, second) => first.name.localeCompare(second.name))
}
