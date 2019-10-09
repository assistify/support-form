import $ from 'jquery'
var usageLogger = null

function getParentRoomMembers (config, callback) {
  var url
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

function createDiscussion (config, mail, callback) {
  // Get the room in which the mail will posted.
  getParentRoomMembers(config, function (response, error) {
    if (error) {
      callback(null, error)
    } else {
      var members = response.members.map(function (member) {
        return member.username
      })
      var discussion = {
        parentId: config.channelId,
        name: mail.Subject,
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

export async function postForm (config, form, callback) {
  createDiscussion(config, form, function (response, error) {
    if (error) {
      callback(error)
    } else {
      var url = config.server + '/api/v1/chat.postMessage'
      var discussion = response.discussion.name
      $.ajax({
        url: url,
        dataType: 'json',
        method: 'POST',
        headers: {
          'X-Auth-Token': config.authToken,
          'X-User-Id': config.userId
        },
        data: {
          'roomId': response.discussion._id,
          'channel': '#' + discussion,
          'text': form
        }
      }).done(function (response) {
        if (usageLogger) {
          sendToLog(config.server.replace(/.*\/\/([^.]+).*/, '$1'), config.userId, response.message.rid)
        }
        callback(response)
      }).fail(function (error) {
        callback(null, error)
      })
    }
  })

  function sendToLog (env, userId, parent) {
    var img = document.createElement('img')
    img.src = usageLogger
    document.body.appendChild(img)
  }
}

export function getChannelKeywords (client) {

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
