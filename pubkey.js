let storedPubkey = ""


getMuhPubkey().then(pk => {
    console.log(3)
    storedPubkey = pk
})
async function getMuhPubkey() {
    window.nostr.getPublicKey().then(x=>{
        return x
    })
}