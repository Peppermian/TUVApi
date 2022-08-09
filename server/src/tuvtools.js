//will parse adress field for product certificates
function parseProdCertContact(dom){

    const addressElement = dom.window.document.querySelector("address")
    if(!addressElement) return null

    const arr = addressElement.innerHTML.split('<br>').slice(2).map(str => str.trim()) //clean up html code
    
    if(arr[arr.length-1].split(' ')[0].match(/(e-?mail)/gi) != null) arr.pop() //remove Email-Field

    while(arr.length <= 2){ arr.push("") } //return empty string on missing entry
    
    return arr;
}

//will parse company name field for product certificates
function parseProdCertName(dom){
    const ownerElement = dom.window.document.getElementsByClassName("tuv-list__item")
    if(!ownerElement) return null
    
    return ownerElement[1].querySelector('p').textContent
}

//will parse all contact and scope info for system certificates
function parseSystemCertInfo(dom){

    const CertHolderAddrElem = dom.window.document.getElementsByClassName("certificate-holder-address");
    if(!CertHolderAddrElem) return ["", "", ""]

    var address = CertHolderAddrElem[0].innerHTML.split('<br>').map(str => str.trim())
    address[0] = address[0].replace(/<\/?strong>/g, "")
    address[1] = address[1].replace(/<\/?strong>/g, "")

    var scope = CertHolderAddrElem[1].textContent.trim()

    return { "values" : address, "scope" : scope}

}

//will return corresponding certificate type for id 
function certIdToType(id){

    return /^[0-9]*$/.test(id) ? "product" : "system"

}

module.exports = { 
    parseProdCertContact,
    parseProdCertName,
    parseSystemCertInfo,
    certIdToType
}