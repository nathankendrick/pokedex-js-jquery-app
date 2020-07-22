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
        var listItem = $('<li></li>');
        $('ul.pokedex').append(listItem);

        var button = $('<button class="list-button">' + pokemon.name + '</button>');
        listItem.append(button);

        button.on('click', function () {
            showDetails(pokemon)
          })

        // button.click(function() {
        //     showDetails(pokemon);
        // })

        // var createList = document.querySelector('.pokedex');
        // var listItem = document.createElement('li');
        // var button = document.createElement('button');
        // button.innerText = (pokemon.name);
        // button.classList.add('list-button');
        // listItem.appendChild(button);
        // createList.appendChild(listItem);
        // button.addEventListener('click', function (event) {
        //     showDetails(pokemon);
        // });
    }
//Modal will be called up instead of console.log here
    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    function loadList() {
        return $.ajax(apiUrl, 
            {dataType: 'json'})
            .then(function(responseJSON) {
            responseJSON.results.forEach(function (item) {
                var pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
                console.error(e);
            });
        }

    function loadDetails(item) {
        var url = item.detailsUrl;

        return $.ajax(url,
			{dataType: 'json'})
			.then(function(responseJSON) {
				return responseJSON;
        // return fetch(url).then(function (response) {
        //     return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.species = details.species;
            item.height = details.height/10*3.28084;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(item) {
        var modalContainer = $('#modal-container');
        modalContainer.addClass('is-visible');
        modalContainer.html('');

        var modal = $('<div class="modal"></div>');
        modalContainer.append(modal);

        //To create an 'X' button that closes modal
        var modalClose = $('<button class="modal-close">X</button>');
        modal.append(modalClose);
        modalClose.on('click', function() {
            hideModal();
        })

        //modal content (Pokemon Data)
        var pokemonName = $('<h1>' + item.name + '</h1>');
        var pokemonSprite = $('<p><img src="' + item.imageUrl + '" class="pokemon-sprite"></p>');
        var pokemonHeight = $('<p>' + item.height + ' feet tall</p>');

        modal.append(pokemonName);
        modal.append(pokemonSprite);
        modal.append(pokemonHeight);

        //OLD below for reference until I'm finished getting it all working

        // modalContainer.innerHTML = '';
        
        // var modal = document.createElement('div');
        // modal.classList.add('modal');
        
        // var closeButtonElement = document.createElement('button');
        // closeButtonElement.classList.add('modal-close');
        // closeButtonElement.innerText = 'Close';
        // closeButtonElement.addEventListener('click', hideModal);
        
        // var titleElement = document.createElement('h1');
        // titleElement.innerText = item.name;

        // var imageElement = document.createElement('img');
        // imageElement.classList.add('pokemon-sprite')
        // imageElement.setAttribute('src', item.imageUrl);

        // // var speciesElement = document.createElement('h3');
        // // speciesElement.innerText = item.species;

        // // var typeElement = document.createElement('h2');
        // // typeElement.innerText = item.types;
        
        // var contentElement = document.createElement('p');
        // contentElement.innerText = item.height.toFixed(1) + (' feet tall');
        
        // modal.appendChild(closeButtonElement);
        // modal.appendChild(titleElement);
        // modal.appendChild(imageElement);
        // // modal.appendChild(speciesElement);
        // // modal.appendChild(typeElement);
        // modal.appendChild(contentElement);
        // modalContainer.appendChild(modal);
        
        // modalContainer.classList.add('is-visible');
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