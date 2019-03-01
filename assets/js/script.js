// Démarrage du module angularJS
var retroPlay = angular.module('appEcommerce', ['ngRoute']);

retroPlay.run(['$rootScope', function($rootScope){
  // Ici tableau vide
  $rootScope.array = [];

}]);
// controller de ma page d'accueil avec juste ma navbar et ma fenêtre modal (j'appelle mon json)
retroPlay.controller('homeCtrl', function($scope , $http, $rootScope){
  $http.get('products.json').then(function(response){
    $scope.products = response.data;
  });

  // au click "acheter" je récupère les info pour mettre dans mon panier
  $rootScope.buy = function(id){
    // je récupère du json les données qui m'interessent
    $scope.name = $scope.products[id].name;
    $scope.support = $scope.products[id].support;
    $scope.price = $scope.products[id].price;
    $scope.quantity = $scope.products[id].quantity;
    // je push dans mon tableau les info pour mon panier
    $rootScope.array.push({name : $scope.name, support : $scope.support, price : $scope.price, quantity : $scope.quantity});
  };

  // fonction pour add ou soustraire la quantité
  $scope.addQuantity = function(index){
    $rootScope.array[index].quantity++;
  };
  $scope.decreaseQuantity = function(index){
    // on récup la quantité de notre tableau avec $rootScope.array[index].quantity!!!!
    if ($rootScope.array[index].quantity > 1){
      $rootScope.array[index].quantity--;
    } else {
      $scope.remove($rootScope.array[index]);
    }
  };


  // fonction pour enlever des produits de mon panier
  $scope.remove = function(index) {
    // le chiffre un me permet d'enlever un produit à la fois
    $rootScope.array.splice(index, 1);
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
  .when('/manette', {
    templateUrl: 'view/manette.html',
    controller: 'manetteCtrl'
  })
  .when('/console', {
    templateUrl: 'view/console.html',
    controller: 'consolesCtrl'
  });
});

// Mon controlleur pour la catégorie manette , je rappelle mon json
retroPlay.controller('manetteCtrl', function($scope , $http, $rootScope){

  $http.get('products.json').then(function(response){
    $scope.products = response.data;
  });
});

// Mon controlleur pour la catégorie console, je rappelle mon json
retroPlay.controller('consolesCtrl', function($scope , $http, $rootScope){

  $http.get('products.json').then(function(response){
    $scope.products = response.data;
  });
});
