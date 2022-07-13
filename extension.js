
let myleads = []
let mylinks = []
let listitems = ''
let listlinks = ''

const inputbtn = document.getElementById("input-btn")
const tabbtn = document.getElementById("tab-btn")
const delbtn = document.getElementById("del-btn")
const deletebtn = document.getElementById("delete-btn")
const inputel = document.getElementById("input-el")
const delel = document.getElementById("del-el")
const ulel = document.getElementById("ul-el")
const leadsfromlocalstorage = JSON.parse( localStorage.getItem("leads") )
const linksfromlocalstorage = JSON.parse( localStorage.getItem("links") )

function render(array,link) {
    ulel.innerHTML = array + link
}

function renderitem(array) {
    listitems = ''
    for (let i = 0; i< array.length; i++){
        listitems += "<li>" + array[i] + "</li>"
    }
    render(listitems,listlinks)
}

function renderlink(link) {
    listlinks = ''
    for (let i=0; i<link.length; i++){
        listlinks += "<li><a href =" + link[i] + 'target="_blank">' + link[i] + "</a></li>"
    }
    render(listitems,listlinks)
}

if (leadsfromlocalstorage) {
    myleads = leadsfromlocalstorage
    renderitem(myleads)
}

if (linksfromlocalstorage) {
    mylinks = linksfromlocalstorage
    renderlink(mylinks)
}

inputel.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault()
        inputbtn.click()
    }
})

inputbtn.addEventListener("click", function() {
    myleads.push(inputel.value)
    renderitem(myleads)
    inputel.value = ""

    localStorage.setItem("leads",JSON.stringify(myleads))
    console.log( localStorage.getItem("leads"))
})

tabbtn.addEventListener("click",function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let currentURL = tabs[0].url
        mylinks.push(currentURL) 
    })
    renderlink(mylinks)

    localStorage.setItem("links",JSON.stringify(mylinks))
    console.log( localStorage.getItem("links"))
})

delbtn.addEventListener("click",function() {
    let index = delel.value - 1
    let index_2 = index - myleads.length
    if (-1 < index && index < myleads.length) {
        myleads.splice(index, 1) // 2nd parameter means remove one item only
        localStorage.setItem("leads",JSON.stringify(myleads))
        console.log(localStorage.getItem("leads"))
        renderitem(myleads)
    } else if (-1 < index_2 && index_2 < mylinks.length) {
        console.log(index_2)
        mylinks.splice(index_2, 1)
        localStorage.setItem("links",JSON.stringify(mylinks))
        console.log(localStorage.getItem("links"))
        renderlink(mylinks)
    } else {
        window.alert("item not in bounds")
    }

    delel.value = ""
})

delel.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault()
        delbtn.click()
    }
})

deletebtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myleads =[]
    mylinks = []
    renderitem(myleads)
    renderlink(mylinks)
})

