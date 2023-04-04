function newsubrocket() {
    let div = document.createElement("div")
    div.appendChild(makeTextInput("Name", "Subrocket Name", "name input", 20, ""))
    let b = document.createElement("button")
    b.innerText = "Do it!"
    b.onclick = function () {
        newSubrocketCapTable(document.getElementById( 'name input' ).value).then(x => {
            console.log(x)
        })
    }
    div.appendChild(b)
    return div
}


async function newSubrocketCapTable(name) {
    if (name.length > 0) {
        content = JSON.stringify({rocket_id: name})
        tags = makeTags(pubkey, "shares")
        await sendEventToRocket(content, tags, 640208, pubkey).then(x =>{
            return x
        })
    } else {
        console.log("username and bio can't both be empty")
    }
}