export default function renderScreen(screen, game, requestAnimationFrame) {
  const context = screen.getContext("2d")
  const colorPlayers = 'black'
  const colorFruits = 'green'

  context.fillStyle = 'white'
  context.clearRect(0, 0, game.state.screen.width, game.state.screen.height)
  
  const countFruits = Object.keys(game.state.fruits).length

  if (countFruits === 0){
    game.addRandomFruit()
  }
  
  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = colorPlayers
    context.fillRect(player.x, player.y, 1, 1)
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId]
    context.fillStyle = colorFruits
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame)
  })
}