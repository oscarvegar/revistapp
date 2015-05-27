angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.exit = function(){
    ionic.Platform.exitApp();
  }
})

.controller('PlaylistsCtrl', function($scope,$rootScope,$stateParams) {
  
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.leerEjemplar = function(id){
    $rootScope.selMagazine = 'pdf/abril.pdf';

  }
})

.controller('PlaylistCtrl', function($scope, $stateParams, $timeout,$ionicLoading) {
  
  $scope.init = function(){
    $scope.url = 'pdf/abril.pdf';
    $scope.currentScale = 1;
    $scope.playlistId = $stateParams.playlistId;
      PDFJS.getDocument($scope.url).then(function getPdfHelloWorld(pdf) {
        $scope.pdf = pdf;
        $scope.currentPage = 1;
        $scope.renderPage();
      });
  }

  $scope.renderPage = function(scale){
      $ionicLoading.show({template: 'Cargando...'});
      
      $scope.pdf.getPage($scope.currentPage).then(function getPageHelloWorld(page) {
        $scope.page = page;
        var viewport = page.getViewport($scope.currentScale);

        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        //
        // Render PDF page into canvas context
        //
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext).then($ionicLoading.hide);
        
      });
    
  }

  $scope.nextPagina = function(page){
    $scope.currentScale=1
    $scope.currentPage++;
    $scope.renderPage();
  }
  $scope.prevPagina = function(page){
    if($scope.currentPage==1)return;
    $scope.currentScale=1
    $scope.currentPage--;
    $scope.renderPage();
  }

  $scope.zoomOut = function(){
    $scope.currentScale = $scope.currentScale-0.2
    $scope.renderPage();
  }

  $scope.zoomIn = function(){
    $scope.currentScale = $scope.currentScale+0.2
    $scope.renderPage();
  }
  $scope.init()
   
}).controller('FeedbackCtrl', function($scope, $stateParams, $timeout,$ionicLoading,$ionicPopup,$state,$location) {
  
  $scope.mensaje = {};
  $scope.enviarMensaje = function(){
    $ionicPopup.alert({
     title: 'Mensaje enviado',
     template: 'Gracias por tu comentario'
   }).then(function(res) { 
      $scope.mensaje.data = "";
      
   });
  }
});
