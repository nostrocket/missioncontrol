let stateReady = false
let currentState

function waitForStateReady(callback) {
    var interval = setInterval(function() {
        if (stateReady) {
            clearInterval(interval);
            callback();
        }
    }, 200);
}

function enMapState(e) {
    state = JSON.parse(e.content)
    currentState = state
    stateReady = true
}

function identities() {
    let i = []
    if (stateReady) {
        let idents = Object.keys(currentState.identity);
        idents.forEach(account => {
            console.log(currentState.identity[account])
            i.push(currentState.identity[account])
        })
    }
    return i
}

