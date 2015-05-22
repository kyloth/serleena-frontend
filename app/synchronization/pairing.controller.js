/**
   * Name: PairingController
   * Package: Synchronization
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   * 0.0.2        Antonio Cavestro     Implementa controller
   *
   */

angular.module('synchronization').controller('PairingController', PairingController);

/**
  * Classe che gestisce la procedura di pairing.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @memberOf Synchronization
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  * @param {Service} PairingService - Servizio che gestisce la comunicazione con
  * il backend relativa alla gestione dell'accoppiamento con serleena.
  * @param {Provider} $route - Provider di AngularJS per agire sulla route
  * corrente.
  */

function PairingController($scope, PairingService, $route) {
  /**
   * Token temporaneo
   *
   * @name tempToken
   * @type String
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.tempToken = "";
  /**
   * Flag che indica se la View deve visualizzare un messaggio di successo.
   *
   * @name showSuccess
   * @type Boolean
   * @default false
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.showSuccess = false;
  /**
   * Flag che indica se la View deve visualizzare un messaggio di errore.
   *
   * @name showError
   * @type Boolean
   * @default false
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.showError = false;
  /**
   * Variabile utilizzata dalla View per stabilire il testo del messaggio
   * di errore da visualizzare.
   *
   * @name errorMsg
   * @type String
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.errorMsg = "";
  /**
   * Metodo invocato dalla vista per eseguire l'accoppiamento.
   *
   * @function pairDevice
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.pairDevice = function(){
    PairingService.pairDevice($scope.tempToken, function(ok, data){
      if(ok){
        $scope.showSuccess = true;
      } else {
        $scope.showError = true;
        $scope.errorMsg = "Errore durante la procedura di accoppiamento :(";
      }
    });
  };
  /**
   * Metodo invocato dalla vista per ricominciare la procedura di accoppiamento.
   *
   * @function retry
   * @memberOf Synchronization.PairingController
   * @instance
   */
  $scope.retry = function(){
    $route.reload();
  };
}
