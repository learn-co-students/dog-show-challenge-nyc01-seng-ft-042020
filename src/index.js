document.addEventListener('DOMContentLoaded', () => {
const baseUrl = "http://localhost:3000/dogs"
const tableBody = document.getElementById('table-body')
    // get request

    function clearTable (){
        const clearRows = Array.from(tableBody.childNodes).slice(1)
        // console.log(clearRows)
        clearRows.forEach(row => {
            row.remove()
            // console.log("done")
        })
    }
    function fetchDogs(){
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
    }

    function renderDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }

    function renderDog(dog){
        const dogRow = document.createElement('tr')
        dogRow.id = dog.id
        dogRow.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button id="${dog.id}">Edit</button></td>
        `
        tableBody.append(dogRow)
    }

    fetchDogs()

    // editable dogs

    document.addEventListener('click', function(e){
        if (e.target.innerText === "Edit") {
            const button = e.target
            const number = button.id
            const dogEdit = button.parentNode.parentNode
            console.log(dogEdit.childNodes)

            const dogEditName = dogEdit.childNodes[1].innerText
            const dogEditBreed = dogEdit.childNodes[3].innerText
            const dogEditSex = dogEdit.childNodes[5].innerText

            const form = document.getElementById('dog-form')
            const editName = form.childNodes[1]
            const editBreed = form.childNodes[3]
            const editSex = form.childNodes[5]

            editName.value = dogEditName
            editBreed.value = dogEditBreed
            editSex.value = dogEditSex

            document.addEventListener('submit', function(e){
                e.preventDefault();
                const editedName = dogEdit.childNodes[1].innerText
                const editedBreed = dogEdit.childNodes[3].innerText
                const editedSex = dogEdit.childNodes[5].innerText
        
                console.log(editedName)
                const data = {
                    name: editedName,
                    breed: editedBreed,
                    sex: editedSex
                }
        
                const configObj = {
                    method: "PATCH",
                    headers: {
                        "content-type":"application/json",
                        "accept":"application/json"
                    },
                    body: JSON.stringify(data)
                }

                fetch(`${baseUrl}/${number}`, configObj)
                .then(resp => resp.json())
                .then(dog => {
                    // console.log(tableBody.childNodes)
                    clearTable()
                    fetchDogs()
                })
            })
        }
    })

    

})