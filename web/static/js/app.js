import "phoenix_html"

/*
import {Socket, Presence} from "phoenix"

// Socket
let user = document.getElementById("User").innerText
let socket = new Socket("/socket", {params: {user: user}})
socket.connect()

// Presence
let presences = {}

let formatTimestamp = (timestamp) => {
  let date = new Date(timestamp)
  return date.toLocaleTimeString()
}
let listBy = (user, {metas: metas}) => {
  return {
    user: user,
    onlineAt: formatTimestamp(metas[0].online_at)
  }
}

let userList = document.getElementById("userList")
let render = (presences) => {
  userList.innerHTML = Presence.list(presences, listBy)
    .map(presence => `
      <li>
        <b>${presence.user}</b>
        <br><small>online since ${presence.onlineAt}</small>
      </li>
    `)
    .join("")
}

// Channels
let room = socket.channel("room:Tweeter", {})
room.on("presence_state", state => {
  presences = Presence.syncState(presences, state)
  render(presences)
})

room.on("presence_diff", diff => {
  presences = Presence.syncDiff(presences, diff)
  render(presences)
})

room.join()

// Chat
let messageInput = document.getElementById("NewMessage")
messageInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13 && messageInput.value != "") {
    room.push("message:new", messageInput.value)
    messageInput.value = ""
  }
})

let messageList = document.getElementById("MessageList")
let renderMessage = (message) => {
  let messageElement = document.createElement("li")
  messageElement.innerHTML = `
    <b>${message.user}</b>
    <i>${formatTimestamp(message.timestamp)}</i>
    <p>${message.body}</p>
  `
  messageList.appendChild(messageElement)
  messageList.scrollTop = messageList.scrollHeight;
}

room.on("message:new", message => renderMessage(message))

*/
export var App = {
  run: function(){
    // display user mentions and hashtags as links
    var mentionPattern = /\B@(\w+)/;
    var tagPattern = /\S*#(?:\[[^\]]+\]|[a-zA-Z0-9]+)/;
    Array.from(document.getElementsByClassName("text"), function(elem) {
      console.log(typeof(elem.innerHTML));
      var map = Array.prototype.map;
      elem.innerHTML = map.call(elem.innerText.split(" "), function(word) {
        console.log((elem.innerHTML));        
        var mentionMatch = mentionPattern.exec(word);
        var tagMatch = tagPattern.exec(word);
        if (mentionMatch) {
          var mention = mentionMatch[0];
          return word.replace(mention, "<a href=\"/login/" + mention.substring(1) + "\">" + mention + "</a>");
        } else if (tagMatch) {
          var tag = tagMatch[0];
          return word.replace(tag, "<a href=\"/hashtag/" + tag.substring(1) + "\">" + tag + "</a>");
        } else
          return word;
      }).join(" ");
    });
  }
}
