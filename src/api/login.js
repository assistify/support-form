
import $ from 'jquery'

// Invoke the login api call.
export function login (client, callback) {
  $.ajax({
    url: client.server.concat('/api/v1/login'),
    method: 'POST',
    data: {
      user: client.user,
      password: client.password
    }
  }).done(function (response) {
    callback(response)
  }).fail(function (error) {
    callback(null, error)
  })
}

export function logout (client, callback) {
  $.ajax({
    url: client.server.concat('/api/v1/logout'),
    method: 'POST',
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
export function checkMySession (client, callback) {
  return $.ajax({
    url: client.server.concat('/api/v1/me'),
    method: 'GET',
    headers: {
      'X-Auth-Token': client.authToken,
      'X-User-Id': client.userId
    },
    async: false
  }).responseJSON
}

export function validateURL (url, callback) {
  $.ajax({
    url: url + '/api/v1/info',
    timeout: 2000
  }).done((response) => {
    callback(response)
  }).fail((error) => {
    callback(null, error)
  })
}
