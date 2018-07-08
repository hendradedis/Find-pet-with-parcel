import  fetchJsonp from 'fetch-jsonp'
import {isValidZip} from './validate'

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimal)

function fetchAnimal(e) {
    e.preventDefault();

    // Get user Input
    const animal = document.querySelector('#animal').value;
    const zipcode =document.querySelector('#zip').value;

    // validate zip code
    if(!isValidZip(zip)) {
        alert('Please insert Zip code')
    }

    // Fetch Api
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=34ac2bf4534018c28ad23f9815149f1a&animal=${animal}&location=${zip}&callback=callback`, {
         jsonCallbackFunction: 'callback'
         }
        )

         .then(res => res.json())
         .then(data => showAnimals(data.petfinder.pets.pet))
         .catch(err => console.log(err))
}

    // Callback

    function callback(data) {
        console.log(data)
    }

    //show all pets
    function showAnimals(pets) {
        const result = document.querySelector('#result')

        result.innerHTML = '',
        pets.forEach((pet) => {
                const div = document.createElement('div');
                div.classList.add('card', 'card-body', 'mb-3');
                div.innerHTML = `
                <div class="row">
                    <div class="cols-sm-6">
                        <h4>${pet.name.$t} (${pet.age.$t}</h4>
                        <p class="text-secondary">${pet.breads.bread.$t}</p>
                        <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${pet.contact.state.$t} ${pet.contact.zip.$t}</p>
                            <ul class="list-group">
                                <li class="list-group-item"> phone: ${pet.contact.phone.$t}</li>
                                <li class="list-group-item"> Shelter ID ${pet.shelterId.$t}</li>
                            </ul>
                    </div>
                    <div class="cols-md-6">
                        <img class="img-fluid" round-circle src="${pet.media.photos.photo[3].$t}"/>
                    </div>
                </div>
                `;
        });

    }