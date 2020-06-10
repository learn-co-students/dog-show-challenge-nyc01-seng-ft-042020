document.addEventListener('DOMContentLoaded', () => {
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

        const editButton = dogInfo.getElementsByTagName('button')
        editButton.addEventListener('click', function(e){
            
        })
    }

    

    fetchData();

})