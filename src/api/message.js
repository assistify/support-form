import $ from 'jquery'
const usageLogger = null

function getParentRoomMembers (config, callback) {
  let url
  if (config.channelType === 'p') {
    url = config.server + '/api/v1/groups.members'
  } else {
    url = config.server + '/api/v1/channels.members'
  }

  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    headers: {
      'X-Auth-Token': config.authToken,
      'X-User-Id': config.userId
    },
    data: {
      roomId: config.channelId
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}

function createNewDiscussion (config, discussion, callback) {
  $.ajax({
    url: config.server.concat('/api/v1/rooms.createDiscussion'),
    dataType: 'json',
    method: 'POST',
    headers: {
      'X-Auth-Token': config.authToken,
      'X-User-Id': config.userId
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

function createDiscussion (config, form, callback) {
  // Get the room in which the mail will posted.
  getParentRoomMembers(config, function (response, error) {
    if (error) {
      callback(null, error)
    } else {
      const members = response.members.map(function (member) {
        return member.username
      })
      const discussion = {
        parentId: config.channelId,
        name: form.subject,
        members: members || []
      }
      // Create a new channel
      createNewDiscussion(config, discussion, function (response, error) {
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
      callback(error)
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
          'text': form
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

export function getChannelKeywords (client, callback) {
  $.ajax({
    url: client.server.concat('/api/v1/channels.list'),
    dataType: 'json',
    method: 'GET',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}

export function setChannelKeywords (client, channel, callback) {
  $.ajax({
    url: client.server.concat('/api/v1/channels.setCustomFields'),
    dataType: 'json',
    method: 'POST',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    data: {
      roomId: channel._id
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}
