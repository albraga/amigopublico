var AmigoPublico = (function() {


getLocation = function() {
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess);
    } 
};

geoSuccess = function(position) {
        var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.MapQuest({layer: 'osm'})
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:900913'),
            zoom: 16
        })
    });
};
getLocation();
})();