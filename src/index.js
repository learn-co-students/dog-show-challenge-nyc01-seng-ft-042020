
document.addEventListener('DOMContentLoaded', () => {

//load all dogs into the table with a edit button
//table id = table-body

//edit button populates the topform with existing dog info

//on submit, patch request done to update dog info


//fetch


function getDogs(){
    return fetch(`http://localhost:3000/dogs`)
    .then(r => r.json())
}


function addDogToTable(dog){
    const tableId = document.querySelector("#table-body")
    //console.log(tableId)
    tableId.innerHTML = " "
    const tableRow = document.createElement("tr")
    const name = document.createElement("td")
    name.textContent = dog.name
    const breed = document.createElement("td")
    breed.textContent = dog.breed
    const sex = document.createElement("td")
    sex.textContent = dog.sex
    const edit = document.createElement("td")
    edit.innerHTML = `<button>Edit</button>`

    tableId.append(tableRow.append(name, breed, sex, edit))

}


//getDogs().then(dogs => addDogsToTable(dogs))
getDogs().then(dogs => dogs.forEach(dog => addDogToTable(dog)))





})