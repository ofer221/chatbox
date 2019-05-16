import io from 'socket.io-client'

export const handleConnection =(loginData,updateUsersCb,setUserCb,handleMessageCb)=>{

  const socket = io(window.location.origin)
 // const socket = io("http://localhost:5000")
  setUserCb(socket)

  socket.on('users', (data) => {
    let users = JSON.parse(data)
    updateUsersCb(users)
  })
  socket.on('new_message', (data) => {
    let message = JSON.parse(data)

    let messages = JSON.parse(localStorage.getItem(message.from))
    if (messages) {

      messages.push(message)
    } else {
      messages = [message]

    }
    localStorage.setItem(message.from, JSON.stringify(messages))
    handleMessageCb(message.from)
  })
  socket.emit('logged_in', {username: loginData.username})
  updateUsersCb(loginData.users)
  localStorage.setItem('username', loginData.username)
}
