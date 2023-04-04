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
    let  shares = Object.keys(currentState.shares);
    shares.forEach(subrocket => {
        // console.log(currentState.identity[account])
        // i.push(currentState.identity[account])
        div.appendChild(makeSubRocket(subrocket))
    })
    
    return div
}
function makeSubRocket(subrocketName){
    let s = document.createElement("div")
    s.className = "subrocket"
    s.id = subrocketName
    let subrocketInfo = currentState.shares[subrocketName]
    // console.log(subrocketInfo)
    s.appendChild(makeH3(subrocketName))
    
    for (let account in subrocketInfo) {
        let cap = subrocketInfo[account] 
        s.appendChild(makeItem("Name",getIdentityByAccount(account).Name))
        s.appendChild(makeItem("Last Lt Change", cap.LastLtChange))
        s.appendChild(makeItem("Lead Time", cap.LeadTime))
        s.appendChild(makeItem("Lead Time Locked Shares", cap.LeadTimeLockedShares))
        s.appendChild(makeItem("Lead Time Unlocked Shares", cap.LeadTimeUnlockedShares))
        s.appendChild(makeItem("OP Return Addresses", cap.OpReturnAddresses))
    }

    return s
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