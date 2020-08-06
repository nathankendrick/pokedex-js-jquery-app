// IIFE
var pokemonRepository = (function () {

    var modalContainer = document.querySelector('#modal-container');

    var pokemonList = [];

    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=155&offset=494';
  
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList;
    }

    // Pulling data from API
    function loadList() {
        return $.ajax(apiUrl, 
            {dataType: 'json'})
            .then(function(responseJSON) {
            responseJSON.results.forEach(function (item) {
                var pokemon = {
                    name: item.name,
                    detailsURL: item.url,
                };
                add(pokemon);
            });
        }).catch(function (e) {
                console.error(e);
            });
        }

    // Creating the list from the API
    function addListItem(pokemon) {
        var listItem = $('#pokemon-list');

        var button = $('<button class="btn btn-dark btn-block btn-lg" role="button" aria-pressed="false" data-toggle="modal" data-target="#pokemonInfo">' + pokemon.name + '</button>');
        listItem.append(button);

        button.on('click', function () {
            showDetails(pokemon)
          })
    }

    // Collecting specific data for each Pokemon
    function loadDetails(item) {
        var url = item.detailsURL;

        return $.ajax(url,
			{dataType: 'json'})
			.then(function(responseJSON) {
				return responseJSON;
        }).then(function (details) {
            item.id = details.id;
            item.imageUrl = details.sprites.front_default;
            item.imageUrl2 = details.sprites.back_default;
            item.height = details.height/10*3.28084;
            item.abilities = details.abilities.map(function(object) {
                return ' ' + object.ability.name;
            });
            item.types = details.types.map(function(object) {
                return ' ' + object.type.name;
            });

        }).catch(function (e) {
            console.error(e);
        });
    }

    // Function to cue the modal
    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }

    // Creating modal to display Pokemon info when clicked
    function showModal(item) {
        var modalTitle = $('.modal-title');
        var modalBody = $('.modal-body');
        var modalFooter = $('modal-footer');
        modalTitle.empty();
        modalBody.empty();
        modalFooter.empty();

        //modal content (Pokemon Data)
        var pokemonName = $('<h1>' + ' #' + item.id + ': ' + item.name + '</h1>');
        var pokemonSprite = $('<div class="sprite-container"><img src="' + item.imageUrl2 + '" class="pokemon-sprite"><img src="' + item.imageUrl + '" class="pokemon-sprite"></div>');
        var pokemonHeight = $('<p class="info-text">' + 'Height: ' + item.height.toFixed(1) + ' Ft</p>');
        var pokemonTypes = $('<p class="info-text">Type(s): ' + item.types + '</p>');
        var pokemonAbilities = $('<p class="info-text">Abilities: ' +item.abilities + '</p>');

        modalTitle.append(pokemonName);
        modalBody.append(pokemonSprite);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
        modalBody.append(pokemonAbilities);
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
        loadList: loadList,
        apiUrl: apiUrl,
    };
})();

// Create the list
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

// "Back To Top" Button
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }