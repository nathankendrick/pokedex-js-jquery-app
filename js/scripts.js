var pokemonRepository = (function () {

    var modalContainer = document.querySelector('#modal-container');

    var pokemonList = [];

    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
  
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        var createList = document.querySelector('.pokedex');
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = (pokemon.name);
        button.classList.add('list-button');
        listItem.appendChild(button);
        createList.appendChild(listItem);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }
//Modal will be called up instead of console.log here
    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    function loadList() {
        $.ajax(apiUrl, {
            dataType: 'json',
            }).then(function (responseJSON) {
            $(responseJSON).each(function (item) {
                var pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            }).catch(function(err){
                console.log('Received an error:' + err.statusText);
            });
        })
        //     return fetch(apiUrl).then(function (response) {
        //     return response.json();
        // }).then(function (json) {
        //     json.results.forEach(function (item) {
        //         var pokemon = {
        //             name: item.name,
        //             detailsUrl: item.url
        //     };
        //     add(pokemon);
        //   });
        // }).catch(function (e) {
        //     console.error(e);
        // })
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.species = details.species;
            item.height = details.height/10*3.28084;
            item.types = details.types;
            item.stats = details.base_stat;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(item) {
        modalContainer.innerHTML = '';
        
        var modal = document.createElement('div');
        modal.classList.add('modal');
        
        var closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        var titleElement = document.createElement('h1');
        titleElement.innerText = item.name;

        var imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-sprite')
        imageElement.setAttribute('src', item.imageUrl);

        // var speciesElement = document.createElement('h3');
        // speciesElement.innerText = item.species;

        // var typeElement = document.createElement('h2');
        // typeElement.innerText = item.types;
        
        var contentElement = document.createElement('p');
        contentElement.innerText = item.height.toFixed(1) + (' feet tall');
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        // modal.appendChild(speciesElement);
        // modal.appendChild(typeElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
      }
      
      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }
      
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        var target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

pokemonRepository.getAll().forEach(pokemonRepository.addListItem);