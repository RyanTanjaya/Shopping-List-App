import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-d5bcd-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const db = getDatabase(app)
const shoppingListInDB = ref(db, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    clear()
    
    push(shoppingListInDB, inputValue)
})



onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let entries = Object.entries(snapshot.val())
    
        shoppingList.innerHTML = ""
        for (let i=0; i < entries.length; i++) {
            let entry = entries[i]
            
            addItemToList(entry)
        }  
    } else {
        shoppingList.innerHTML = "No items here... yet"
    }
    
})

function clear() {
    inputFieldEl.value = ""
}

function addItemToList(item){
    let key = item[0]
    let value = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = value
    
    let exactLoc = ref(db, `shoppingList/${key}`)
    newEl.addEventListener("dblclick", function(){
        remove(exactLoc)
    })

    shoppingList.appendChild(newEl)
}