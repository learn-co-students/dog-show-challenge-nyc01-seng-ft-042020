document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    const table = document.querySelector("#table-body")
    const dogRow = document.querySelector("#dog-form")
    

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
            e.preventDefault();
            fetch(`${dogsUrl}/${e.target.id}`)
            .then(resp => resp.json())
            .then(dog => dogInfoForForm(dog)) 
        }

    })
    function dogInfoForForm(dog) {
        dogRow.name.value = dog.name
        dogRow.breed.value = dog.breed
        dogRow.sex.value = dog.sex
        dogRow.dataset.id = dog.id
    }

    dogRow.addEventListener('submit', e => {
        e.preventDefault();
        if (e.target.id === 'dog-form') {  
            editDog(e)
        }})

        function editDog(e) {
            const name = e.target.name.value
            const breed = e.target.breed.value
            const sex = e.target.sex.value

            fetch(`${dogsUrl}/${e.target.dataset.id}`, {
                method: "PATCH",
                headers: {
            "content-type": "application/json",
            "accept": "application/json"
             },
            body: JSON.stringify({     
                name: name,
                breed: breed,
                sex: sex
            })
             }).then(response => response.json())
                .then(upDog => freshDog(upDog))

            function freshDog(upDog) {
                const trDog = document.querySelector(`#table-body > tr:nth-child(${upDog.id})`)
                trDog.innerHTML = `
                <tr>
                <td>${upDog.name}</td><td>${upDog.breed}</td> <td>${upDog.sex}</td> 
                <td><button class='edit' id=${upDog.id}>Edit</button></td>
                </tr>`
            }
        }

    fecthDogs()
})
