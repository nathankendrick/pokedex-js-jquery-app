<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pokédex | Simple JS App</title>
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Quantico:wght@700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">

      <div class="row">
        <div class="col">
          <img src="img/pokedex-header.jpg" class="header-image">
        </div>
      </div>
      
      <!-- will add links to display each generation of Pokemon from here -->
      <nav class="navbar navbar-toggler navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" role="link" id="kanto" href="#">Kanto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="johto" href="#"">Johto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" role="link" id="hoenn" href="#">Hoenn</a>
            </li>
            <li class="nav-item"> 
              <a class="nav-link" role="link" id="sinnoh" href="#">Sinnoh</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" role="link" id="unova" href="#">Unova</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" role="link" id="kalos" href="#">Kalos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" role="link" id="alola" href="#">Alola</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="row">
        <div class="col">
          <div id="modal-container">
                <!-- Bootstrap Modal-->
            <div class="modal fade" id="pokemonInfo" tabindex="-1" role="dialog" aria-labelledby="ShowPokemonInfo" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-title" id="pokemonInfo">Pokemon Info</div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body"></div>
                </div>
              </div>
            </div>

          </div>
    
          <div class="col pokedex">
            <div class="list-group" id="pokemon-list"></div>
          </div>

          <script
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
          <script src="js/scripts.js"></script>
        </div>
      </div>

      <div class="row">
        <div class="col text-center"><p><h5>This Pokédex app was created by <a href="http://nathankendrick.com">Nathan Kendrick</h5></a></p></div>
      </div>

    </div>
  </body>
</html>
