let addToy = false;
​
​
​
​
document.addEventListener("DOMContentLoaded", () => {
​
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
​
  let toy = document.getElementById("toy-collection")
​
  function createToyLi(data){
    const toyLi = document.createElement('div')
    toyLi.className = "card"
    toyLi.id = `${data["id"]}`
    toyLi.innerHTML = `
​
    <h2>${data["name"]}</h2>
    <img src="${data["image"]}" class="toy-avatar" /> 
    <p><span>${data["likes"]}</span> Likes</p>
    <button class="like-btn">Like <3</button>
    `
    toy.append(toyLi)
  }
​
  //////
  fetch('http://localhost:3000/toys/').then(function(response){
    return response.json();
  }).then(function(json){
    json.forEach(element => {
      createToyLi(element)
    });
  })
/////////////////
​
​
const toyForm = document.querySelector('.add-toy-form')
​
//const button = document.getElementsByClassName("Submit")
​
toyForm.addEventListener("submit", function(e){
 // if e.target.id === "new-toy-btn"
  e.preventDefault()
  form = e.target
  //const data = {name: form.name.value, image: form.image.value}
  const toyName = form.name.value
  const toyImg = form.image.value
  const toyLikes = 0
​
  fetch('http://localhost:3000/toys', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({"name": toyName, "image": toyImg, "likes": toyLikes }),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
​
})
​
//const likes = querySelector('.toy-avatar p')
document.addEventListener('click', function(e){
  if (e.target.className === 'like-btn'){
    const parent = e.target.parentNode
    console.log(parent.id)
    const toyId = e.target.parentNode.id
​
    const likeTally = parent.querySelector('span')
    likeTally.textContent = parseInt(likeTally.textContent, 10) + 1
    fetch(`http://localhost:3000/toys/${parent.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"likes": likeTally.textContent }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
​
  }
})
​
});
