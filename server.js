import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.addFruit({fruitId: 'fruit1', fruitX: 0, fruitY: 4})
game.addFruit({fruitId: 'fruit2', fruitX: 1, fruitY: 6})
game.addFruit({fruitId: 'fruit3', fruitX: 9, fruitY: 9})

console.log(game.state)

sockets.on('connection', (socket) =>{
  
  const playerId = socket.id

  game.addPlayer({playerId: playerId, playerX: 0, playerY: 1})

  console.log(`> Player connected on Server with id: ${playerId}`)

  socket.emit('setup', game.state)
})

server.listen(3000, () => {
  console.log(`Server listening on port: 3000`)
})