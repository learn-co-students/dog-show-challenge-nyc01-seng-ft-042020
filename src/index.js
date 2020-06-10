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
           <td><button class='edit' id=${dog.id}>Edit</button></td>
           </tr>
           `
           table.append(newDogRow)
        });
    }

    table.addEventListener('click', (e) =>{
        if (e.target.className === 'edit') {
            fetch(`${dogsUrl}/${e.target.id}`)
            .then(resp => resp.json())
            .then(dog => dogInfoForForm(dog)) 
        }

    })
    function dogInfoForForm(dog) {
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed
        dogForm.sex.value = dog.sex
    }

    dogForm.addEventListener('submit', e => {
        event.preventDefault();
        if (e.target.id === 'dog-form') {
            const dogRow = document.querySelector("#table-body > tr:nth-child(1)")
            const name = e.target.name.value
            const breed = e.target.breed.value
            const sex = e.target.sex.value
            console.log(e.target.parentNode.dataset.id) 


  
        }
    } )

    fecthDogs()
})