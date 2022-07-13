

let count=0
let saveEl = document.getElementById("save-el")

function increment() {
	console.log('this button is clicked')
	count = count+ 1
	document.getElementById("count-el").innerHTML = count
}

function save() {
	console.log(count)
	let saveit = count + ' - '
	saveEl.innerHTML += saveit
	count = 0
	document.getElementById("count-el").innerText = 0
}

