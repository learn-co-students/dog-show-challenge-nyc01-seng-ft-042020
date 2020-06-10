
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

function getDog(dogId){
    return fetch(`http://localhost:3000/dogs/${dogId}`)
    .then(r => r.json())
}

function addDogsToTable(dogs){
    dogs.forEach(dog => {
        createDogTr(dog)
    })
    
}


function createDogTr(dog){
    const tableId = document.querySelector("#table-body")
    tableId.innerHTML += ""
    let dogTr = document.createElement("tr")
    dogTr.dataset.id = dog.id
    dogTr.innerHTML = ""

    let dogName = document.createElement("td")
    dogName.className = "padding center" 
    dogName.textContent = dog.name

    let dogBreed = document.createElement("td")
    dogBreed.textContent = dog.breed
    dogBreed.className = "padding center"

    let dogSex = document.createElement("td")
    dogSex.textContent = dog.sex
    dogSex.className = "padding center"

    let editDog = document.createElement("td")
    editDog.className = "padding center"
    editDog.innerHTML = `<button id="Edit Dog">Edit</button>`

    dogTr.append(dogName, dogBreed, dogSex, editDog)
    tableId.append(dogTr)

    return dogTr

}

const form = document.getElementById("dog-form")


document.addEventListener("click", function(e){
    //console.log(e.target.parentNode.parentNode)
    const dogId = e.target.parentNode.parentNode.dataset.id
    //console.log(dogId)
    if (e.target.id === "Edit Dog"){
        getDog(dogId).then(dog => {
            form.name.value = dog.name
            form.dataset.id = dog.id
            form.breed.value = dog.breed
            form.sex.value = dog.sex
        })
    }
})

document.addEventListener("submit", function(e){
    e.preventDefault()
    const form = e.target
    dogId = form.dataset.id
    let updatedDog = {
        name: form.name.value, breed: form.breed.value, sex: form.sex.value
    }

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            "content-type": `application/json`,
            accepts: 'application/json'
        },
        body: JSON.stringify(updatedDog)
    }).then(r => r.json()).then(dog => displayDogs())

})

function displayDogs() {
    const tableId = document.querySelector("#table-body")
    tableId.innerHTML = ""
    getDogs().then(dogs => addDogsToTable(dogs))
}

displayDogs()

})