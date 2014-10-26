var AmigoPublico = (function () {

    var longi;
    var lat;
    function ServicoPublico(id, titulo, descricao) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
    };

    var init = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        }
    };

    var setPosition = function (position) {
        longi = position.coords.longitude;
        lat = position.coords.latitude;
        createMap();
    };



    var createPOI = function (servicoPublico, longi, lat, iconSRC) {
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longi, lat], 'EPSG:4326', 'EPSG:3857')),
            id: servicoPublico.id
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
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

    var createNeighbourhood = function () {
        var layers = [];
        layers[0] = new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
        });
        layers[1] = createPOI(new ServicoPublico(1,'um','umm'), longi, lat, 'img/user.png');
        layers[2] = createPOI(new ServicoPublico(2,'dois','doiss'), longi + 0.01, lat, 'img/school.png');
        return layers;
    };

    var createMap = function () {
        var map = new ol.Map({
            target: 'map',
            layers: createNeighbourhood(),
            view: new ol.View({
                center: ol.proj.transform([longi, lat], 'EPSG:4326', 'EPSG:900913'),
                zoom: 16
            })
        });
        map.on('click', function (evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                    function (feature, layer) {
                        return feature;
                    });
            if (feature) {
                alert(feature.get('id'));
            }
        });
    };
    var app = {
        initialize: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            this.onDeviceReady(); //uncomment for testing in Chrome browser
        },
        onDeviceReady: function () {
            init();
            setTimeout(function () {
                $('#map').toggle();
            }, 2000);
        }
    };
    app.initialize();

    var alerta = function () {
        alert('teste');
    };

    return {
        alerta: alerta
    };

})();


