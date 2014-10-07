function AmigoPublico() {

    var createPOI = function (longi, lat, iconSRC) {
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longi, lat], 'EPSG:4326', 'EPSG:3857')),
            name: 'nome'
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: iconSRC
            }))
        });
        iconFeature.setStyle(iconStyle);
        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        return vectorLayer;
    };

    var createNeighbourhood = function (longi, lat) {
        var layers = [];
        layers[0] = new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'osm'})
                });
        layers[1] = createPOI(longi, lat, 'img/user.png');
        layers[2] = createPOI(longi + 0.01, lat, 'img/school.png');
        return layers;
    };

     var getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
    };

    var geoSuccess = function (position) {
        var longi = position.coords.longitude;
        var lat = position.coords.latitude;
        var layersN = createNeighbourhood(longi, lat);
        var map = new ol.Map({
            target: 'map',
            layers: layersN,
            view: new ol.View({
                center: ol.proj.transform([longi, lat], 'EPSG:4326', 'EPSG:900913'),
                zoom: 16
            })
        });
    };    
    getLocation();
};

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        this.onDeviceReady(); //uncomment for testing in Chrome browser
    },
    onDeviceReady: function() {
	new AmigoPublico();
    }
};
app.initialize();