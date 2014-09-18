var AmigoPublico = (function () {

    setMe = function (longi, lat) {
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longi, lat], 'EPSG:4326', 'EPSG:3857')),
            name: 'Null Island',
            population: 4000,
            rainfall: 500
        });


        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'img/me.png'
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
    }


    getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess);
        }
    };

    geoSuccess = function (position) {
        var longi = position.coords.longitude;
        var lat = position.coords.latitude;
        var vectorLayer = setMe(longi, lat);
        var map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'osm'})
                }), vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.transform([longi, lat], 'EPSG:4326', 'EPSG:900913'),
                zoom: 16
            })
        });
    };
    getLocation();
})();