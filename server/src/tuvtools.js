function parseContact(dom){

    const addressElement = dom.window.document.querySelector("address")
    if(!addressElement) return ["-", "-", "-"]

    const arr = addressElement.innerHTML.split('<br>').slice(2).map(str => str.trim()) //clean up html code
    
    if(arr[arr.length-1].split(' ')[0].match(/(e-?mail)/gi) != null) arr.pop() //remove Email-Field

    while(arr.length <= 2){ arr.push("") } //return empty string on missing entry

    return arr;
}

function parseCompanyName(dom){
    const owner = dom.window.document.getElementsByClassName("tuv-list__item")
    if(!owner) return "-"
    
    return owner[1].querySelector("p").textContent
}

function parseCertHolderAddr(dom){

    const CertHolderAddrElem = dom.window.document.getElementsByClassName("certificate-holder-address");
    if(!CertHolderAddrElem) return ["-", "-", "-"]

    var arr = CertHolderAddrElem[0].innerHTML.split('<br>').map(str => str.trim())
    arr[0] = arr[0].replace(/<\/?strong>/g, "")
    arr[1] = arr[1].replace(/<\/?strong>/g, "")


    console.log(arr)

    return { "values" : arr}

}

module.exports = { 
    parseContact,
    parseCompanyName,
    parseCertHolderAddr
}