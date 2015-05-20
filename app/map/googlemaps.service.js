/**
   * Name: GoogleMapsService
   * Package: Map
   * Author: Matteo Lisotto
   *
   * History:
   * Version      Programmer           Changes
   * 0.0.1        Matteo Lisotto       Create file
   *
   */

angular.module('map').service('GoogleMapsService', GoogleMapsService);

/**
  * Classe singleton che implementa la comunicazione con le API di Google Maps.
  *
  * @author Matteo Lisotto
  * @version 0.1
  * @constructor
  */

function GoogleMapsService() {
  /**
   * Inizializza la mappa.
   * @function initMap
   * @memberOf GoogleMapsService
   * @instance
   * @param {String} mapId - ID della mappa nel DOM.
   * @returns {Object} map - Oggetto mappa di Google Maps.
   */
  var initMap = function(mapId){
    return new google.maps.Map( document.getElementById(mapId),{
      center: { lat: 45.279642, lng: 11.652564},
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: false,
      mapTypeControl: false
    });
  };
  /**
   * Inizializza la mappa a partire dal perimetro dato.
   * @function initMapFromPerimeter
   * @memberOf GoogleMapsService
   * @instance
   * @param {String} mapId - ID della mappa nel DOM.
   * @param {Object} ne - Oggetto che rappresenta il punto a nord-est del
   * perimetro dell'esperienza. Contiene un attributo "lat" con la latitudine
   * e un attributo "lng" con la longitudine.
   * @param {Object} sw - Oggetto che rappresenta il punto a sud-ovest del
   * perimetro dell'esperienza. Contiene un attributo "lat" con la latitudine
   * e un attributo "lng" con la longitudine.
   * @returns {Object} map - Oggetto mappa di Google Maps.
   */
  var initMapFromPerimeter = function(mapId, ne, sw){
    var perimeter = new google.maps.LatLngBounds(
        new google.maps.LatLng(ne.lat, ne.lng),
        new google.maps.LatLng(sw.lat, sw.lng));
    var map = new google.maps.Map( document.getElementById(mapId),{
      center: perimeter.getCenter(),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      streetViewControl: false,
      mapTypeControl: false
    });
    map.fitBounds(perimeter);
    return map;
  };
  /**
   * Disegna sulla mappa un rettangolo editabile per selezionare il perimetro
   * dell'esperienza.
   * @function drawPerimeter
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @returns {Object} rectangle - Rettangolo disegnato.
   */
  var drawPerimeter= function(map){
    return new google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillOpacity: 0,
      map: map,
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(45.276413, 11.650587),
        new google.maps.LatLng(45.281726, 11.655550)
      ),
      editable: true,
      draggable: true,
      geodesic: true
    });
  };
  /**
   * Finalizza il perimetro rendendolo non più modificabile.
   * @function closePerimeter
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Object} rectangle - Rettangolo da rendere non modificabile.
   * @returns {Object} recBound - Oggetto contenente le coordinate nord-est e
   * sud-ovest del perimetro. Esso è organizzato con due attributi, "ne" per il
   * punto a nord-est e "sw" per il punto a sud-ovest, entrambi oggetti che
   * contengono un attributo "lat" per la latitudine e un attributo "lng" per la
   * longitudine.
   */
  var closePerimeter = function(map, rectangle){
    // TODO Bisognerebbe pure disabilitare zoom e drag della mappa
    var recBound = rectangle.getBounds();
    map.fitBounds(recBound);
    rectangle.setOptions({
      editable: false,
      draggable: false,
      strokeColor: '#000000'
    });

    var ne = recBound.getNorthEast();
    var sw = recBound.getSouthWest();
    return {
      ne: {
        lat: ne.lat(),
        lng: ne.lng()
      },
      sw: {
        lat: sw.lat(),
        lng: sw.lng()
      }
    };
  };
  /**
   * Disegna una linea.
   * @function drawLine
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Array} path - Array di oggetti google.maps.LatLng che rappresenta
   * l'insieme dei punti che costituiscono la linea.
   * @param {String} color - Colore della linea in formato esadecimale.
   * @param {Number} opacity - Numero che rappresenta l'opacità della linea, da
   * 0.0 (trasparente) a 1.0 (nessuna opacità).
   * @param {Array} icons - Array di oggetti google.maps.IconSequence che
   * rappresenta l'insieme dei simboli con cui comporre la linea.
   * @returns {google.maps.Polyline} - Un riferimento all'oggetto che
   * rappresenta la linea disegnata.
   */
  var drawLine = function (map, path, color, opacity, icons){
    if (icons === null){
      return new google.maps.Polyline({
        path: path,
        strokeColor: color,
        strokeOpacity: opacity,
        map: map
      });
    } else {
      return new google.maps.Polyline({
        path: path,
        strokeColor: color,
        strokeOpacity: opacity,
        icons: icons,
        map: map
      });
    }
  };
  /**
   * Disegna un sentiero.
   * @function drawPath
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {String} name - Nome del sentiero.
   * @param {Array} points - Array di oggetti punti, entrambi costituiti da
   * un attributo "lat" per la latitudine, e un attributo "lng" per la
   * longitudine.
   */
  var drawPath = function(map, name, points){
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    var gmapPoints = [];
    points.forEach(function(p){
      gmapPoints.push(new google.maps.LatLng(p.lat, p.lng));
    });
    drawLine(map, gmapPoints, '#994C00', 0, [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]);
  };
  /**
   * Disegna un marker
   * @function drawMarker
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Object} position - Oggetto google.maps.LatLng che rappresenta la
   * posizione del marker
   * @param {Object} icon - Oggetto che rappresenta l'icona del marker.
   * La documentazione di Gooogle Maps API v3 specifica che esso può essere di
   * tre tipi distinti: String, google.maps.Icon oppure google.maps.Symbol.
   * @param {Boolean} draggable - Flag che indica se il marker può essere
   * spostato nella mappa oppure no.
   * @param {String} title - Nome del marker
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * marker nella mappa.
   */
  var drawMarker = function(map, position, icon, draggable, title){
    return new google.maps.Marker({
      position: position,
      icon: icon,
      title: title,
      draggable: draggable,
      map: map
    });
  };
  /**
   * Disegna un punto d'interesse
   * @function drawPOI
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Number} lat - Latitudine del punto.
   * @param {Number} lng - Longitudine del punto.
   * @param {String} name - Nome del punto d'interesse.
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * punto d'interesse nella mappa.
   */
  var drawPOI = function(map, lat, lng, name){
    return drawMarker(map, new google.maps.LatLng(lat, lng), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      strokeColor: 'red',
      strokeOpacity: 0.7,
      scale: 3
    }, false, name);
  };
  /**
   * Disegna un checkpoint di un percorso.
   * @function drawCheckpoint
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @returns {google.maps.Marker} - Riferimento all'oggetto marker che
   * costituisce un checkpoint.
   */
  var drawCheckpoint = function(map){
    return drawMarker(map, map.getCenter(), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'yellow',
      strokeColor: 'yellow',
      strokeOpacity: 0.7,
      scale: 3
    }, true);
  };
  /**
   * Disegna un checkpoint di un percorso a partire da un oggetto
   * google.maps.Marker esistente.
   * @function drawCheckpointFromObject
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {google.maps.Marker} pointObj - Oggetto marker da disegnare.
   */
  var drawCheckpointFromObject = function(map, pointObj){
    pointObj.setMap(map);
  };
  /**
   * Disegna un punto utente
   * @function drawCustomPoint
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @returns {google.maps.Marker} - Riferimento all'oggetto che rappresenta un
   * punto d'interesse nella mappa.
   */
  var drawCustomPoint = function(map){
    return drawMarker(map, map.getCenter(), {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      strokeColor: 'red',
      strokeOpacity: 0.7,
      scale: 3
    }, true);
  };
  /**
   * Ottiene la posizione di un marker generico.
   * @function getMarkerPosition
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Marker} marker - Oggetto marker di cui ottenere le
   * dimensioni.
   * @returns {Object} - Oggetto che contiene un attributo "lat" con la
   * latitudine e un attributo "lng" con la longitudine.
   */
  var getMarkerPosition = function(marker){
    var p = marker.getPosition();
    return {
      lat: p.lat(),
      lng: p.lng()
    };
  };
  /**
   * Ottiene la posizione di un checkpoint.
   * @function getCheckpointPosition
   * @memberOf GoogleMapsService
   * @instance
   * @param {google.maps.Marker} checkpoint - Oggetto marker che rappresenta il
   * checkpoint di cui ottenere la posizione.
   * @returns {Object} - Oggetto che contiene un attributo "lat" con la
   * latitudine e un attributo "lng" con la longitudine.
   */
  var getCheckpointPosition = function(checkpoint){
    return getMarkerPosition(checkpoint);
  };
  /**
   * Ottiene la posizione di un punto utente.
   * @function getCustomPointPosition
   * @memberOf GoogleMapsService
   * @instance
   * @param {google.maps.Marker} customPoint - Oggetto marker che rappresenta il
   * punto utente di cui ottenere la posizione.
   * @returns {Object} - Oggetto che contiene un attributo "lat" con la
   * latitudine e un attributo "lng" con la longitudine.
   */
  var getCustomPointPosition = function(customPoint){
    return getMarkerPosition(customPoint);
  };
  /**
   * Disegna un percorso.
   * @function drawTrack
   * @memberOf GoogleMapsService
   * @instance
   * @param {Object} map - Oggetto mappa di Google Maps.
   * @param {Object} points - Array di oggetti che contengono un attributo "lat"
   * con la latitudine e un attributo "lng" con la longitudine.
   * @returns {google.maps.Polyline} - Oggetto rappresentante il percorso
   * disegnato.
   */
  var drawTrack = function(map, points){
    var latlngs = [];
    points.forEach(function(p){
      latlngs.push(new google.maps.LatLng(p.lat, p.lng));
    });
    return drawLine(map, points, 'yellow', 0.7, null);
  };
  /**
   * Rimuove un generico componente dalla mappa.
   * @function removeComponentFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.MVCObject} component - Oggetto che rappresenta il
   * componente da rimuovere.
   */
  var removeComponentFromMap = function (component){
    component.setMap(null);
  };
  /**
   * Rimuove una linea dalla mappa.
   * @function removeLineFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Polyline} line - Oggetto che rappresenta la
   * linea da rimuovere.
   */
  var removeLineFromMap = function(line){
    removeComponentFromMap(line);
  };
  /**
   * Rimuove un percorso dalla mappa.
   * @function removeTrackFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @param {google.maps.Polyline} track - Oggetto che rappresenta il percorso
   * da rimuovere.
   */
  var removeTrackFromMap = function(track){
    removeLineFromMap(track);
  };
  /**
   * Rimuove un marker dalla mappa.
   * @function removeMarkerFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @private
   * @param {google.maps.Marker} marker - Oggetto che rappresenta il
   * marker da rimuovere.
   */
  var removeMarkerFromMap = function(marker){
    removeComponentFromMap(marker);
  };
  /**
   * Rimuove un checkpoint dalla mappa.
   * @function removeCheckpointFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @param {google.maps.Marker} point - Oggetto che rappresenta il checkpoint
   * da rimuovere.
   */
  var removeCheckpointFromMap = function(point){
    removeMarkerFromMap(point);
  };
  /**
   * Rimuove un punto d'interesse dalla mappa.
   * @function removePOIFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @param {google.maps.Marker} point - Oggetto che rappresenta il punto
   * d'interesse da rimuovere.
   */
  var removePOIFromMap = function(point){
    removeMarkerFromMap(point);
  };
  /**
   * Rimuove un punto utente dalla mappa.
   * @function removeCustomPointFromMap
   * @memberOf GoogleMapsService
   * @instance
   * @param {google.maps.Marker} point - Oggetto che rappresenta il punto
   * utente da rimuovere.
   */
  var removeCustomPointFromMap = function(point){
    removeMarkerFromMap(point);
  };

  return {
    initMap: initMap,
    initMapFromPerimeter: initMapFromPerimeter,
    drawPerimeter: drawPerimeter,
    closePerimeter: closePerimeter,
    drawPath: drawPath,
    drawPOI: drawPOI,
    drawCheckpoint: drawCheckpoint,
    drawCheckpointFromObject: drawCheckpointFromObject,
    drawCustomPoint: drawCustomPoint,
    getCheckpointPosition: getCheckpointPosition,
    getCustomPointPosition: getCustomPointPosition,
    drawTrack: drawTrack,
    removeTrackFromMap: removeTrackFromMap,
    removeCheckpointFromMap: removeCheckpointFromMap,
    removePOIFromMap: removePOIFromMap,
    removeCustomPointFromMap: removeCustomPointFromMap
  };
}
