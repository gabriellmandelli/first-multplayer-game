export default function createKeyboardListener(document) {

	const state = {
		observers: []
	}

	function subscribe(observerFunction) {
		state.observers.push(observerFunction)
	}

	function notifyALL(command) {
		for (const observerFunction of state.observers) {
			observerFunction(command)
		}
	}

	document.addEventListener('keydown', handleKeyDown)
	
	function handleKeyDown(event) {

		const command = {
			playerId: 'player1',
			keyPressed: event.key
		}

		notifyALL(command)
	}

	return {
		subscribe
	}
}
