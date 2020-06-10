document.addEventListener('DOMContentLoaded', () => {
  renderDogs();
});

const renderDogs = () => {
  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => {
      //   console.log(dogs);
      dogs.forEach(dog => {
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button class="dog-edit" data-id="${dog.id}">Edit</button></td>`;
        tbody.append(tr);
      });
    });
};
document.addEventListener('click', e => {
  const obj = e.target;
  if (obj.className === 'dog-edit') {
    fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
      .then(resp => resp.json())
      .then(dog => {
        const form = document.querySelector('form');
        let formId = document.querySelector('input[name="dogId"]');
        if (!formId) {
          formId = document.createElement('input');
          formId.setAttribute('type', 'hidden');
          formId.setAttribute('name', 'dogId');
        }
        formId.setAttribute('value', dog.id);
        form.name.value = dog.name;
        form.breed.value = dog.breed;
        form.sex.value = dog.sex;
        form.append(formId);
      });
  } else if (obj.type === 'submit') {
    e.preventDefault();
    const form = document.querySelector('form');
    fetch(`http://localhost:3000/dogs/${form.dogId.value}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name.vaule,
        breed: form.breed.value,
        sex: form.sex.value,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        const tbody = document.querySelector('tbody');
        Array.from(tbody.children).forEach(element => {
          element.remove();
        });
        renderDogs();
      });
  }
});
