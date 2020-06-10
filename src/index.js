const DOG_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    const tableID = document.querySelector('#table-body')
    
    const getDogs = () => {
        fetch(DOG_URL)
        .then(resp => resp.json())
        .then(renderDogs)
    }

    function renderDogs = dogs => {
        dogs.forEach(dog => {
        console.log(dog)
        // let newRow = tableID.insertRow(-1)
        // newRow.dataset.id = dog.id
        // let name = newRow.insertCell()
        //     name.innerText = `${dog.name}`
        // let breed = newRow.insertCell()
        //     breed.innerText = `${dog.breed}`
        // let sex = newRow.insertCell()
        //     sex.innerText = `${dog.sex}`
        // let edit = newRow.insertCell()
        //     edit.innerHTML = '<input type = "button" value = "Edit Dog">'
        })
    }

    document.addEventListener('click', function(e){
        if (e.target.value === 'Edit Dog') {
            const form = document.querySelector('#dog-form')
            let row = e.target.parentNode.parentNode
            let cell = row.getElementsByTagName('td')
            form.name.value = cell[0].textContent
            form.breed.value = cell[1].textContent
            form.sex.value = cell[2].textContent
            form.dataset.id = row.dataset.id
        }
        
    })

    document.addEventListener('submit', e => {
        e.preventDefault()
        const form = e.target

            const id = form.dataset.id
            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value

        fetch(`${DOG_URL}/${id}` , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, breed, sex })
        })
        .then(resp => resp.json())
            .then(console.log)
    })

    
})