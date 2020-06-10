document.addEventListener('DOMContentLoaded', () => {
    // * fetch data
    // * const url
    // * identify table 
    // * render each dog individually in the table

    const baseUrl = "http://localhost:3000/dogs"
    const tables = document.querySelectorAll('.margin')
    const dogTable = tables[4]

    const fetchData = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
    };

    const renderDogs = dogs => {
        dogs.forEach(dog => {
            renderDog(dog)
        })
    };

    const renderDog = dog => {
        const dogInfo = document.createElement('tr')
        dogInfo.dataset.id = dog.id
        dogInfo.innerHTML = `
        <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit" id=${dog.id}>Edit</button></td>
        `
        dogTable.appendChild(dogInfo)
    }

    // *event listener 'click' for edit
    // *should populate submit form with dog info
    // *event listener on 'submit' should submit form\
    // *patch request
    // *update all info via new get request 

    document.addEventListener('click', function(e){
        if (e.target.innerText === "Edit"){
            const button = e.target
            const id = button.id
            const tr = button.parentNode.parentNode
            const td = Array.from(tr.children)
            const dogName = td[0].outerText
            const dogBreed = td[1].outerText
            const dogSex = td[2].outerText

            const dogForm = document.querySelector('#dog-form')
            const dogFormInput = Array.from(dogForm.getElementsByTagName('input'))
            
            let dogFormName = dogFormInput[0]
            let dogFormBreed = dogFormInput[1]
            let dogFormSex = dogFormInput[2]
            
            dogFormName.value = dogName
            dogFormBreed.value = dogBreed
            dogFormSex.value = dogSex

            document.addEventListener('submit', function(e){
                e.preventDefault()
                const submitButton = dogFormInput[3]
                const newDogForm = document.querySelector('form')
                const name = newDogForm.name.value
                const breed = newDogForm.breed.value
                const sex = newDogForm.sex.value

                const dogObj = {
                    name: name,
                    breed: breed,
                    sex: sex
                }

                fetch(`${baseUrl}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(dogObj)
                })
                .then(resp => resp.json())
                .then(json => {
                    const dogId = json.id 
                    const dogTr = document.getElementById(dogId).parentNode.parentNode
                    dogTr.innerHTML =`
                    <td>${json.name}</td> <td>${json.breed}</td> <td>${json.sex}</td> <td><button class="edit" id=${json.id}>Edit</button></td>
                    `
                })

            })
            
            // fetchData()
            
        }
    })

    fetchData();

})