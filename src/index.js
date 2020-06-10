document.addEventListener('DOMContentLoaded', () => {

    //Fetch and render dogs
    const BASE_URL = "http://localhost:3000/dogs"
    const registeredDogs = document.querySelector("#table-body")

    function fetchDogs() {
        fetch(BASE_URL)
        .then(resp => resp.json())
        .then(json => renderDogs(json))
    }

    function renderDogs(dogs) {
        dogs.forEach(dog => renderDog(dog))
    }

    function renderDog(dog) {
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit Dog</button></td>`
        registeredDogs.append(tr)
    }

    fetchDogs()

    //Render dog form
    const dogForm = document.querySelector("#dog-form")

    function renderForm(dog) {
        dogForm.innerHTML = `
        <input type="text" name="name" placeholder="dog's name" value="${dog.name}" data-id=${dog.id}>
        <input type="text" name="breed" placeholder="dog's breed" value="${dog.breed}">
        <input type="text" name="sex" placeholder="dog's sex" value="${dog.sex}">
        <input type="submit" name="submit" value="Submit">
        `
    }

    document.addEventListener("click", (e) => {
        if (e.target.textContent === "Edit Dog") {
            const dogId = e.target.dataset.id

            fetch(`${BASE_URL}/${dogId}`)
            .then(resp => resp.json())
            .then(json => renderForm(json))
        }
    })

    //Edit dog
    function reFetchDogs(){
        fetch(BASE_URL)
        .then(resp => resp.json())
        .then(json => reRenderDogs(json))
    }

    function reRenderDogs(dogs){
        registeredDogs.innerHTML = ``
        renderDogs(dogs)
    }
    
    document.addEventListener("submit", (e) => {
        e.preventDefault()

        if (e.target === dogForm) {
            const id = parseInt(e.target.name.dataset.id)
            const name = e.target.name.value
            const breed = e.target.breed.value
            const sex = e.target.sex.value

            const dog = {
                id: id,
                name: name,
                breed: breed,
                sex: sex
            }

            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dog)
            }

            fetch(`${BASE_URL}/${id}`, configObj)
            .then(resp => resp.json())
            .then(reFetchDogs)
        }

    })

})