let reload = false


function updateAccountDetails() {
    form = document.createElement("div")
    form.appendChild(usernameAndBioForm())
    form.appendChild(bioButtons(function () {
        if (document.getElementById( 'name input' ).valueOf().readOnly) {
            setBio( "", document.getElementById( 'about input' ).value, storedPubkey )
            //location.reload()
        } else {
            validateUnique(document.getElementById( 'name input' ).value).then(res => {
                if (res) {
                    setBio( document.getElementById( 'name input' ).value, document.getElementById( 'about input' ).value, storedPubkey )
                    //location.reload()
                } else {
                    console.log()
                    alert(document.getElementById( 'name input' ).value + " has been taken, please try another username")
                }
            })
        }

    }))
    return form
}

async function validateUnique(name) {
    p = new Promise((resolve, reject) => {
        identities().forEach(function (v) {
            if (v.Name === name) {
                resolve(false)
            }
        })
        resolve(true)
    })
    return p
}

function bioButtons(onclick) {
    submit = document.createElement("button")
    submit.onclick = onclick
    submit.className = "button is-link"
    submit.innerText = "Submit"
    cancel = document.createElement("button")
    cancel.onclick = function () {
        document.getElementById('name input').value = '';document.getElementById('about input').value = '';
    }
    cancel.className = "button is-link is-light"
    cancel.innerText = "Clear"

    buttons = document.createElement("div")
    buttons.className = "field is-grouped"

    control = document.createElement("div")
    control.className = "control"

    control.appendChild(submit)
    control.appendChild(spacer())
    control.appendChild(spacer())
    control.appendChild(cancel)
    buttons.appendChild(control)
    return buttons
}

function usernameAndBioForm() {
    div = document.createElement("div")
    let username = ""
    let about = ""
    let haveExistingKind0 = false
    if (kind0Objects.get(storedPubkey) !== undefined) {
        if (kind0Objects.get(storedPubkey).name.length > 0) {
            username = kind0Objects.get(storedPubkey).name
            haveExistingKind0 = true
        }
        if (kind0Objects.get(storedPubkey).about.length > 0) {
            about = kind0Objects.get(storedPubkey).about
            haveExistingKind0 = true
        }
    }
       identities().forEach(x => {
           console.log(78)
           if (x.Account === storedPubkey) {
               console.log(80)
               about = x.About
               username = x.Name
           }
       })
    div.appendChild(makeH3("Create or modify your Nostrocket profile"))
    div.appendChild(makeParagraph("* Nostrocket usernames **cannot** be changed once set for your Pubkey   \n* Nostrocket usernames **must** be unique   \n* Protocol: [Non-fungible Identity](superprotocolo://b66541b20c8a05260966393938e2af296c1a39ca5aba8e21bd86fcce2db72715)"))
    if (haveExistingKind0) {
        div.appendChild(makeParagraph("Submit this form to claim _**" + kind0Objects.get(storedPubkey).name + "**_ now."))
    }
    div.appendChild(makeTextInput("Username", "Name or Pseudonym", "name input", 20, username))

    div.appendChild(makeTextField("About Me", "Introduce yourself to the community", "about input", 560, about))
    return div
}

const classMap = {
    h1: 'title is-1',
    h2: 'title is-2',
    h3: 'title is-3',
    h4: 'title is-4',
    h6: 'subtitle'
}

const bindings = Object.keys(classMap)
    .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}(.*)>`, 'g'),
        replace: `<${key} class="${classMap[key]}" $1>`
    }));


function makeParagraph(markdown) {
    d = document.createElement("div")
    md = new showdown.Converter({
        extensions: [...bindings]
    })
    ht = md.makeHtml(markdown)
    mdht = document.createElement("div")
    mdht.innerHTML = ht
    d.appendChild(mdht)
    d.appendChild(document.createElement("br"))
    return d
}

function makeLink(url, text) {
    a = document.createElement("a")
    a.href = url
    a.innerText = text
    return a
}

function makeH3(title) {
    h3 = document.createElement("h3")
    h3.className = "is-3"
    h3.innerText = title
    return h3
}

function makeTextField(label, placeholder, id, maxlength, existing) {
    input = document.createElement("textarea")
    input.className = "textarea"
    if (existing.length > 0) {
        input.value = existing
    }
    input.placeholder = placeholder
    input.id = id
    input.maxLength = maxlength
    return makeFormField(label, input)
}

function makeTextInput(label, placeholder, id, maxlength, existing) {
    d = document.createElement("div")
    textInput = document.createElement("input")
    d.appendChild(textInput)
    textInput.className = "input"
    textInput.type = "text"
    if (existing.length > 0) {
        textInput.value = existing
    }
    textInput.placeholder = placeholder
    textInput.id = id
    textInput.maxLength = maxlength

    if (label === "Username") {
        var userameIsAlreadySet = false
        identities().forEach(function (v) {
            if (v.Account === storedPubkey) {
                if (v.Name.length > 0) {
                    textInput.value = v.Name
                    textInput.readOnly = true
                    userameIsAlreadySet = true
                }
            }
        })
        if (!userameIsAlreadySet) {
            warn = document.createElement("p")
            warn.style.display = "none"
            identities().forEach(function (v) {
                if (v.Name === existing) {
                    warn.style.display = "block"
                }
            })
            warn.innerText = "username is taken!"
            if (existing.length < 1) {
                warn.innerText = "username is too short!"
            }
            warn.style.color = "#FF9900"

            textInput.onkeyup = function () {
                warn.style.display = "none"
                if (textInput.value.length < 1) {
                    warn.innerText = "username is too short!"
                    warn.style.display = "block"
                }
                identities().forEach(function (v) {
                    if ((v.Name === textInput.value)&&(textInput.value.length > 0)) {
                        warn.innerText = "username is taken!"
                        warn.style.display = "block"
                    }
                })
            }
            d.appendChild(warn)
        }
    }

    if (label === "Amount") {
        warn = document.createElement("p")
        warn.style.display = "none"
        textInput.type = "number"
        textInput.onkeyup = function () {
            warn.style.display = "none"
            int = parseInt(textInput.value, 10)
            if (!int) {
                warn.style.color = "#FF9900"
                warn.innerText = "must be a number!"
                warn.style.display = "block"
            } else {
                if (USD) {
                    usdAmount = ((int/100000000)*USD).toFixed(2)
                    warn.innerText = "Approximate amount in Cuckbucks:  $" + usdAmount
                    warn.style.color = "#35be33"
                    warn.style.display = "block"
                } else {
                    console.log("could not get USD")
                }
            }
        }
        d.appendChild(warn)
    }
    return makeFormField(label, d)
}

function makeFormField(label, input) {
    if (label === "About") {
        //todo populate from existing data if exists
    }
    field = document.createElement("div")
    field.className = "field"
    field.appendChild(makeLabel(label))
    control = document.createElement("div")
    control.className = "control"
    control.appendChild(input)
    field.appendChild(control)
    return field
}

function makeLabel(name) {
    label = document.createElement("label")
    label.className = "label"
    label.innerText = name
    return label
}


function setBio(name, about, pubkey) {
    if ((name.length > 0) || (about.length > 0)) {

        content = JSON.stringify({name: name, about: about})
        console.log(content)
        tags = [["r", currentStateId, "", "reply"]]
        sendEventToRocket(content, tags, 640400, pubkey).then(x =>{
            // location.reload()
            console.log(x,'undefined?')
            if (reload) {location.reload()}

        })
    } else {
        console.log("username and bio can't both be empty")
    }
}

function spacer() {
    s = document.createElement("span")
    s.innerText = " "
    return s
}