// Démarrage du module angularJS
var retroPlay = angular.module('retroPlay', ['ngRoute']);

retroPlay.run(['$rootScope', function($rootScope){
  // Ici tableau vide
  $rootScope.basket = [];

}]);
// controller de ma page d'accueil avec juste ma navbar et ma fenêtre modal (j'appelle mon json)
retroPlay.controller('homeCtrl', function($scope , $http, $rootScope){
  $http.get('products.json').then(function(response){
    $scope.products = response.data;
  });

  // au click "acheter" je récupère les info pour mettre dans mon panier
  $scope.buy = function(id){
    // je récupère du json les données qui m'interessent
    $scope.name = $scope.products[id].name;
    $scope.support = $scope.products[id].support;
    $scope.price = $scope.products[id].price;
    $scope.quantity = $scope.products[id].quantity;
    // je push dans mon tableau les info pour mon panier
    $rootScope.basket.push({name : $scope.name, support : $scope.support, price : $scope.price, quantity : $scope.quantity});
  };

  // fonction pour add ou soustraire la quantité
  $scope.addQuantity = function(index){
    $rootScope.basket[index].quantity++;
  };
  $scope.decreaseQuantity = function(index){
    // on récup la quantité de notre tableau avec $rootScope.basket[index].quantity!!!!
    if ($rootScope.basket[index].quantity > 1){
      $rootScope.basket[index].quantity--;
    } else {
      $scope.remove($rootScope.basket[index]);
    }
  };


  // fonction pour enlever des produits de mon panier
  $scope.remove = function(index) {
    // le chiffre un me permet d'enlever un produit à la fois
    $rootScope.basket.splice(index, 1);
  };


});
// Mes vues !! une page par catégorie !
retroPlay.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'view/products.html',
    controller: 'homeCtrl'

  })
  .when('/products', {
    templateUrl: 'view/products.html',
    controller: 'homeCtrl'
  })
  .when('/pad', {
    templateUrl: 'view/pad.html',
    controller: 'padCtrl'
  })
  .when('/consoles', {
    templateUrl: 'view/consoles.html',
    controller: 'consolesCtrl'
  });
});

// Mon controlleur pour la catégorie pad , je rappelle mon json
retroPlay.controller('padCtrl', function($scope , $http, $rootScope){

  $http.get('products.json').then(function(response){
    $scope.products = response.data;
  });
});

// Mon controlleur pour la catégorie consoles, je rappelle mon json
retroPlay.controller('consolesCtrl', function($scope , $http, $rootScope){

  $http.get('products.json').then(function(response){
    $scope.products = response.data;
  });
});
