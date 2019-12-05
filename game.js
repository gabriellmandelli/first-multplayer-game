import createGenerator from './generator.js'

export default function createGame() {
  
  const generate = createGenerator()

  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  }

  function addPlayer(command) {
    const playerId = command.playerId
    const playerX = command.playerX
    const playerY = command.playerY

    state.players[playerId] = {
      x: playerX,
      y: playerY
    }
  }

  function removePlayer(command) {
    const playerId = command.playerId

    delete state.players[playerId]
  }


  function addFruit(command) {
    const fruitId = command.fruitId
    const fruitX = command.fruitX
    const fruitY = command.fruitY

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY
    }
  }

  function addRandomFruit() {
    const fruitId = generate.generateUUID()
    const fruitX = Math.floor(Math.random() * (9 - 0 + 1) + 0)
    const fruitY = Math.floor(Math.random() * (9 - 0 + 1) + 0)

    addFruit({ fruitId, fruitX, fruitY })
  }

  function removeFruit(command) {
    const fruitId = command.fruitId

    delete state.fruits[fruitId]
  }

  function movePlayer(command) {

    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y--
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.height) {
          player.y++
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < state.screen.width) {
          player.x++
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x--
        }
      },
    }

    const keyPressed = command.keyPressed
    const playerId = command.playerId
    const player = state.players[command.playerId]
    const moveFunction = acceptedMoves[keyPressed]

    if (player && moveFunction) {
      moveFunction(player)
      checkForFruitCollision(playerId)
    }
  }

  function checkForFruitCollision(playerId) {
    const player = state.players[playerId]

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]

      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId: fruitId })
      }
    }
  }

  return {
    addPlayer,
    removePlayer,
    addFruit,
    addRandomFruit,
    removeFruit,
    movePlayer,
    state,
  }
}