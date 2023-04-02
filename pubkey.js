let storedPubkey = ""


getMuhPubkey().then(pk => {
    console.log(3)
    storedPubkey = pk
})
async function getMuhPubkey() {
    if (window.nostr){
        window.nostr.getPublicKey().then(x=>{
            return x
        })
    }
    else {
        alert("Please install NIP-07 extension to interact with the Nostrocket~")
    }

}