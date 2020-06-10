document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    const table = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form")


    function fecthDogs() {
        fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs => dogListing(dogs))
    }

    function dogListing(dogs) {
        
        dogs.forEach(dog => {
           const newDogRow = document.createElement('TR') 
           newDogRow.innerHTML = `
           <tr>
           <td>${dog.name}</td><td>${dog.breed}</td> <td>${dog.sex}</td> 
           <td><button class='submit' id=${dog.id}>Edit</button></td>
           </tr>
           `
           table.append(newDogRow)
        });
    }

    table.addEventListener('click', (e) =>{
        if (e.target.className === 'submit') {
            fetch(`dogsUrl/e.target.id`)
            .then(resp => resp.json())
            .then(book => dogInfoForForm(book)) 
        }

    })


    function name(params) {
        
    }

    fecthDogs()
})