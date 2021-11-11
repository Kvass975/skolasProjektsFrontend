// Mainigie
const form = document.querySelector("#input-form")
const name = document.querySelector("#name")
const surname = document.querySelector("#surname")
const table = document.querySelector("#table")
const error = document.querySelector(".error-msg")
const error1 = document.querySelector(".error-msg1")
let deleteBtn = document.querySelectorAll(".delete-btn")
let num = 0

// Form submit
form.addEventListener("submit", async function(e){
    e.preventDefault()
    error.style.display = 'none'
    error1.style.display = "none"
    if(name.value == "" && surname.value == ""){
        num = 1
        error.style.display = "inline"
    }
    const userData = await getData()
    userData.forEach(user=>{
        if(user.name == name.value && user.surname == surname.value){
            num = 1
            error1.style.display = 'inline'
        }
    })

    if(num==0){
        error1.style.display = 'none'
        error1.style.display = "none"
        fetch(`https://skolasprojektsbackend.herokuapp.com/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',                                                              
            body: JSON.stringify( { name: name.value, surname: surname.value } )  
        }).then(()=>{
            resetFunc()
        })
    }else{
        num = 0
    }
})
// Iegust datus
const getData = async function(){
    const rawData = await fetch('https://skolasprojektsbackend.herokuapp.com/')
    const parsedData = await rawData.json()
    return parsedData
}

// Izveido tabulu
const makeTable = async function(data){
    const dataArr = await data
    table.insertAdjacentHTML("beforeend",`
        <tr>
            <th>Vārds</th>
            <th>Uzvārds</th>
            <th>Delete</th>
        </tr>
    `)
    dataArr.forEach(user=>{
        table.insertAdjacentHTML("beforeend", `
        <tr>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td><input id="${user._id}" type="button" class="delete-btn" value="dzēst"></td>
        </tr>`)
    })
    deleteBtn = document.querySelectorAll(".delete-btn")
    deleteFunction(dataArr)
}
makeTable(getData())


// Pārtaisa tabulu
const resetFunc = async function(){
    name.value = ""
    surname.value = ""
    table.innerHTML = ""
    makeTable(getData())
}

// Izdzēš lietotaju
const deleteFunction = async function(array){
    deleteBtn.forEach(button=>{
        button.addEventListener("click", function(){
            fetch(`https://skolasprojektsbackend.herokuapp.com/${button.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }).then(()=>{
                resetFunc()
            })
        })
    })
}