var map = null;
var markers = [];
var fire_markers = [];
var pollution_markers = [];
var coal_markers = [];
var shop_markers = [];


function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function getIconSize(zoom) {
    var pixel_size;
    if (zoom < 8) {
        pixel_size = 20;
    }
    if (zoom >= 8 && zoom < 16) {
        pixel_size = 4 * zoom;
    }
    if (zoom >= 16 && zoom < 22) {
        pixel_size = 6 * zoom;
    }
    if (zoom >= 22) {
        pixel_size = 70;
    }
    return pixel_size;
}

function createFireMarkers(data){
    for (i = 0; i < data.fires.length; i++) {
        var fmarker = new google.maps.Marker({
                position: new google.maps.LatLng(data.fires[i][0], data.fires[i][1]),
                icon: "http://res.cloudinary.com/kohinoor/image/upload/w_0.2,c_scale/v1502868343/fire.png",
                zIndex: 1
            });
        google.maps.event.addListener(fmarker, 'click', function(){
            $('#popup-2').slickModals({
                // Popup type
                    popupType: 'delayed',
                    delayTime: 0,
                    scrollTopDistance: 400,
                // Auto closing
                    autoClose: false,
                    autoCloseDelay: 3000,
                // Statistics
                    enableStats: false,
                    fileLocation: 'slickStats/collect.php',
                    modalName: 'My awesome modal 1',
                    modalSummary: 'Lorem ipsum dolor sit amet',
                    callToAction: 'cta',
                // Popup cookies
                    setCookie: false,
                    cookieDays: 30,
                    cookieTriggerClass: 'setCookie-1',
                    cookieName: 'slickModal-1',
                    cookieScope: 'domain',
                // Overlay styling
                    overlayVisible: true,
                    overlayClosesModal: true,
                    overlayColor: 'rgba(0, 0, 0, 0.2)',
                    overlayAnimationDuration: '0.3',
                    overlayAnimationEffect: 'fadeIn',
                // Background effects
                    pageAnimationDuration: '0.4',
                    pageAnimationEffect: 'blur',
                    pageBlurRadius: '2px',
                    pageScaleValue: '0.9',
                    pageMoveDistance: '30%',
                // Popup styling
                    popupWidth: '520px',
                    popupHeight: 'auto',
                    popupLocation: 'bottomCenter',
                    popupAnimationDuration: '0.4',
                    popupAnimationEffect: 'slideBottom',
                    popupBoxShadow: 'none',
                    popupBackground: '#fff',
                    popupRadius: '0',
                    popupMargin: '20px',
                    popupPadding: '30px',
                // Mobile rules
                    showOnMobile: true,
                    responsive: true,
                    mobileBreakPoint: '520px',
                    mobileLocation: 'bottomCenter',
                    mobileWidth: '100%',
                    mobileHeight: 'auto',
                    mobileRadius: '0',
                    mobileMargin: '0',
                    mobilePadding: '20px',
                // Animate content
                    contentAnimation: true,
                    contentAnimationEffect: 'slideBottom',
                    contentAnimationDuration: '0.4',
                    contentAnimationDelay: '0.4',
                // Youtube videos
                    videoSupport: false,
                    videoAutoPlay: true,
                    videoStopOnClose: true,
                // Close and reopen button
                    addCloseButton: true,
                    buttonStyle: 'icon',
                    enableESC: true,
                    reopenClass: 'openSlickModal-1',
                // Additional events
                    onSlickLoad: function() {

                    },
                    onSlickClose: function() {
                        // Your code goes here
                    }
                });            
        });
        fire_markers.push(fmarker);
    }
}

function createPollutionMarkers(data){
    for (i = 0; i < data.pollutions.length; i++) {
        var pomarker = new google.maps.Marker({
                position: new google.maps.LatLng(data.pollutions[i][0], data.pollutions[i][1]),
                zIndex: data.pollutions[i][2],
                icon: {
                    url: "http://res.cloudinary.com/kohinoor/image/upload/w_0.3,c_scale/v1502868343/" + data.pollutions[i][2] + ".png",
                    scaledSize: new google.maps.Size(getIconSize(map.getZoom()), getIconSize(map.getZoom())), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(parseInt(getIconSize(map.getZoom()) / 2), parseInt(getIconSize(map.getZoom()) / 2)) // anchor
                }
            });
        google.maps.event.addListener(pomarker, 'click', function(){
            var _self = this;
            $('#popup-5').slickModals({
                // Popup type
                    popupType: 'delayed',
                    delayTime: 0,
                    scrollTopDistance: 400,
                // Auto closing
                    autoClose: false,
                    autoCloseDelay: 3000,
                // Statistics
                    enableStats: false,
                    fileLocation: 'slickStats/collect.php',
                    modalName: 'My awesome modal 1',
                    modalSummary: 'Lorem ipsum dolor sit amet',
                    callToAction: 'cta',
                // Popup cookies
                    setCookie: false,
                    cookieDays: 30,
                    cookieTriggerClass: 'setCookie-1',
                    cookieName: 'slickModal-1',
                    cookieScope: 'domain',
                // Overlay styling
                    overlayVisible: true,
                    overlayClosesModal: true,
                    overlayColor: 'rgba(0, 0, 0, 0.2)',
                    overlayAnimationDuration: '0.3',
                    overlayAnimationEffect: 'fadeIn',
                // Background effects
                    pageAnimationDuration: '0.4',
                    pageAnimationEffect: 'blur',
                    pageBlurRadius: '2px',
                    pageScaleValue: '0.9',
                    pageMoveDistance: '30%',
                // Popup styling
                    popupWidth: '520px',
                    popupHeight: 'auto',
                    popupLocation: 'bottomCenter',
                    popupAnimationDuration: '0.4',
                    popupAnimationEffect: 'slideBottom',
                    popupBoxShadow: 'none',
                    popupBackground: '#fff',
                    popupRadius: '0',
                    popupMargin: '20px',
                    popupPadding: '30px',
                // Mobile rules
                    showOnMobile: true,
                    responsive: true,
                    mobileBreakPoint: '520px',
                    mobileLocation: 'bottomCenter',
                    mobileWidth: '100%',
                    mobileHeight: 'auto',
                    mobileRadius: '0',
                    mobileMargin: '0',
                    mobilePadding: '20px',
                // Animate content
                    contentAnimation: true,
                    contentAnimationEffect: 'slideBottom',
                    contentAnimationDuration: '0.4',
                    contentAnimationDelay: '0.4',
                // Youtube videos
                    videoSupport: false,
                    videoAutoPlay: true,
                    videoStopOnClose: true,
                // Close and reopen button
                    addCloseButton: true,
                    buttonStyle: 'icon',
                    enableESC: true,
                    reopenClass: 'openSlickModal-1',
                // Additional events
                    onSlickLoad: function() {
                        $("#popup-5").find(".pollution-callout-pic").attr('src', _self.icon.url);
                    },
                    onSlickClose: function() {
                        // Your code goes here
                    }
                });        	
        });
        pollution_markers.push(pomarker);
    }
}
function createCoalMarkers(data){
    for (i = 0; i < data.data.length; i++) {
        var cmarker = new google.maps.Marker({
                position: new google.maps.LatLng(data.data[i][0], data.data[i][1]),
                zIndex: 3,
                icon: {
                    url: data.emoji,
                    scaledSize: new google.maps.Size(48, 48), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0,0) // anchor
                }                
            });
        google.maps.event.addListener(cmarker, 'click', function(){
            $('#popup-4').slickModals({
                // Popup type
                    popupType: 'delayed',
                    delayTime: 0,
                    scrollTopDistance: 400,
                // Auto closing
                    autoClose: false,
                    autoCloseDelay: 3000,
                // Statistics
                    enableStats: false,
                    fileLocation: 'slickStats/collect.php',
                    modalName: 'My awesome modal 1',
                    modalSummary: 'Lorem ipsum dolor sit amet',
                    callToAction: 'cta',
                // Popup cookies
                    setCookie: false,
                    cookieDays: 30,
                    cookieTriggerClass: 'setCookie-1',
                    cookieName: 'slickModal-1',
                    cookieScope: 'domain',
                // Overlay styling
                    overlayVisible: true,
                    overlayClosesModal: true,
                    overlayColor: 'rgba(0, 0, 0, 0.2)',
                    overlayAnimationDuration: '0.3',
                    overlayAnimationEffect: 'fadeIn',
                // Background effects
                    pageAnimationDuration: '0.4',
                    pageAnimationEffect: 'blur',
                    pageBlurRadius: '2px',
                    pageScaleValue: '0.9',
                    pageMoveDistance: '30%',
                // Popup styling
                    popupWidth: '520px',
                    popupHeight: 'auto',
                    popupLocation: 'bottomCenter',
                    popupAnimationDuration: '0.4',
                    popupAnimationEffect: 'slideBottom',
                    popupBoxShadow: 'none',
                    popupBackground: '#fff',
                    popupRadius: '0',
                    popupMargin: '20px',
                    popupPadding: '30px',
                // Mobile rules
                    showOnMobile: true,
                    responsive: true,
                    mobileBreakPoint: '520px',
                    mobileLocation: 'bottomCenter',
                    mobileWidth: '100%',
                    mobileHeight: 'auto',
                    mobileRadius: '0',
                    mobileMargin: '0',
                    mobilePadding: '20px',
                // Animate content
                    contentAnimation: true,
                    contentAnimationEffect: 'slideBottom',
                    contentAnimationDuration: '0.4',
                    contentAnimationDelay: '0.4',
                // Youtube videos
                    videoSupport: false,
                    videoAutoPlay: true,
                    videoStopOnClose: true,
                // Close and reopen button
                    addCloseButton: true,
                    buttonStyle: 'icon',
                    enableESC: true,
                    reopenClass: 'openSlickModal-1',
                // Additional events
                    onSlickLoad: function() {

                    },
                    onSlickClose: function() {
                        // Your code goes here
                    }
                });            
        });
        coal_markers.push(cmarker);
    }
    console.log(coal_markers);    
}
function createShopMarkers(data){
    for (i = 0; i < data.data.length; i++) {
        var smarker = new google.maps.Marker({
                position: new google.maps.LatLng(data.data[i][0], data.data[i][1]),            
                zIndex: 4,
                attributes: data.data[i],
                icon: {
                    url: data.emoji,
                    scaledSize: new google.maps.Size(48,48), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0,0) // anchor
                }                 
            });

        google.maps.event.addListener(smarker, 'click', function(){
            $('#popup-3').slickModals({
                // Popup type
                    popupType: 'delayed',
                    delayTime: 0,
                    scrollTopDistance: 400,
                // Auto closing
                    autoClose: false,
                    autoCloseDelay: 3000,
                // Statistics
                    enableStats: false,
                    fileLocation: 'slickStats/collect.php',
                    modalName: 'My awesome modal 1',
                    modalSummary: 'Lorem ipsum dolor sit amet',
                    callToAction: 'cta',
                // Popup cookies
                    setCookie: false,
                    cookieDays: 30,
                    cookieTriggerClass: 'setCookie-1',
                    cookieName: 'slickModal-1',
                    cookieScope: 'domain',
                // Overlay styling
                    overlayVisible: true,
                    overlayClosesModal: true,
                    overlayColor: 'rgba(0, 0, 0, 0.2)',
                    overlayAnimationDuration: '0.3',
                    overlayAnimationEffect: 'fadeIn',
                // Background effects
                    pageAnimationDuration: '0.4',
                    pageAnimationEffect: 'blur',
                    pageBlurRadius: '2px',
                    pageScaleValue: '0.9',
                    pageMoveDistance: '30%',
                // Popup styling
                    popupWidth: '520px',
                    popupHeight: 'auto',
                    popupLocation: 'bottomCenter',
                    popupAnimationDuration: '0.4',
                    popupAnimationEffect: 'slideBottom',
                    popupBoxShadow: 'none',
                    popupBackground: '#fff',
                    popupRadius: '0',
                    popupMargin: '20px',
                    popupPadding: '30px',
                // Mobile rules
                    showOnMobile: true,
                    responsive: true,
                    mobileBreakPoint: '520px',
                    mobileLocation: 'bottomCenter',
                    mobileWidth: '100%',
                    mobileHeight: 'auto',
                    mobileRadius: '0',
                    mobileMargin: '0',
                    mobilePadding: '20px',
                // Animate content
                    contentAnimation: true,
                    contentAnimationEffect: 'slideBottom',
                    contentAnimationDuration: '0.4',
                    contentAnimationDelay: '0.4',
                // Youtube videos
                    videoSupport: false,
                    videoAutoPlay: true,
                    videoStopOnClose: true,
                // Close and reopen button
                    addCloseButton: true,
                    buttonStyle: 'icon',
                    enableESC: true,
                    reopenClass: 'openSlickModal-1',
                // Additional events
                    onSlickLoad: function() {
                    	console.log(smarker.attributes);
                    	$('#popup-3').find('.title').html(smarker.attributes[2]);
                    	$('#popup-3').find('.cta').attr('href', smarker.attributes[6]);
                    	$('#popup-3').find('.description').html(smarker.attributes[5]);
                    },
                    onSlickClose: function() {
                        // Your code goes here
                    }
                });            
        });

        shop_markers.push(smarker);
    }   
}
function initMap() {

    var params = getSearchParameters();

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.589937, lng: -90.187753},
        zoom: 7,
        zoomControl: true,
        fullscreenControl: false, /* Make TRUE, but positioning */
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "all",
                "stylers": [
                    {
                        "saturation": 0
                    },
                    {
                        "hue": "#e7ecf0"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "saturation": -70
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": -60
                    }
                ]
            }]
    });

    map.setOptions({
        minZoom: 1, 
        maxZoom: 22
    });
    

    if(params.hasOwnProperty('lat') && params.hasOwnProperty('lng')){
        map.setCenter(new google.maps.LatLng(parseFloat(params.lat), parseFloat(params.lng)));        
    }
    if( typeof(params.maptype) == 'string' && params.maptype.length){
        if( ['hybrid', 'roadmap', 'satellite', 'terrain'].indexOf(params.maptype.toLowerCase()) >-1 ){
            map.setMapTypeId(params.maptype);
        }        
    }
    if( params.hasOwnProperty('zoom') ){
        map.setZoom(parseInt(params.zoom));
    }
    else
    {
        map.setZoom(9);
    }

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);    

    var left_bottom_pane = document.getElementById('left-bottom-pane');
    left_bottom_pane.index = 0;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(left_bottom_pane);

    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        
        console.log(places);

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });        

    google.maps.event.addListenerOnce(map, 'idle', function(){
        /*This event only happens once, when the map has fully loaded*/
        /*Now it is time to do stuff*/

        if( !Modernizr.touch ){
            /*Detect mobile vs PC*/
            /*if false then AJAX in f.json else if true then AJAX in f_empty.json*/
            $.when(
              $.ajax({'url': 'js/f.json','type': 'GET'}),
              $.ajax({'url': 'js/p.json','type': 'GET'}),
              $.ajax({'url': 'js/coal.json','type': 'GET'}),
              $.ajax({'url': 'js/shop.json','type': 'GET'})
            )
            .done(function(fires, pollutions, coal, shop){
                console.log([fires[0], pollutions[0], coal[0], shop[0]]);
                createPollutionMarkers(pollutions[0]);
                createFireMarkers(fires[0]);
                createCoalMarkers(coal[0]);
                createShopMarkers(shop[0]);
                

                google.maps.event.addListener(map, 'idle', function(){
                    
                    console.log({'zoom': map.getZoom(), 'mapType': map.getMapTypeId(), 'lat': map.getCenter().lat(), 'lng': map.getCenter().lng()});
                    
                    const regex = /^([^?]+)/gm;
                    var urlpf = regex.exec(window.location.href)[0];
                    var newurl = urlpf + '?' + 'zoom=' + map.getZoom() + '&maptype=' + map.getMapTypeId() + '&lat=' + map.getCenter().lat() + '&lng=' + map.getCenter().lng();

                    history.pushState({}, '', newurl);

                    addthis_share = {
                       url: newurl,
                       title: "AirAirAir.org",
                       description: "The Only Air Pollution Map You'll Ever Need"
                    };                 

                    var bounds = map.getBounds();
                    var icon_size = getIconSize(map.getZoom());
                    var currentZoomLevel = map.getZoom();

                    switch(true){
                        case (currentZoomLevel <= 5):
                            for(i=0;i<fire_markers.length;i++){
                                if(bounds.contains( fire_markers[i].getPosition() )){
                                    fire_markers[i].setOptions({'map': map, 'icon': 'http://res.cloudinary.com/kohinoor/image/upload/w_0.1,c_scale/v1502867966/fire.png'});
                                }
                                else
                                {
                                    fire_markers[i].setMap(null);
                                }
                            }                        
                        break;
                        case (currentZoomLevel > 5):
                            for(i=0;i<fire_markers.length;i++){
                                if(bounds.contains( fire_markers[i].getPosition() )){
                                    fire_markers[i].setOptions({'map': map, 'icon': 'http://res.cloudinary.com/kohinoor/image/upload/w_0.2,c_scale/v1502867966/fire.png'});
                                }
                                else
                                {
                                    fire_markers[i].setMap(null);
                                }
                            }                        
                        break;
                    }

                    switch(true){
                        case (currentZoomLevel >= 9):
                            //Show coal emojis
                            for(i=0;i<coal_markers.length;i++){
                                if(bounds.contains( coal_markers[i].getPosition() )){
                                    coal_markers[i].setOptions({'map': map});
                                }
                                else
                                {
                                    coal_markers[i].setMap(null);
                                }
                            } 
                            for(i=0;i<shop_markers.length;i++){
                                if(bounds.contains( shop_markers[i].getPosition() )){                                    
                                    shop_markers[i].setOptions({'map': map});
                                }
                                else
                                {
                                    shop_markers[i].setMap(null);
                                }
                            }                                                         
                        break;
                        default:
                            for(i=0;i<coal_markers.length;i++){
                                coal_markers[i].setMap(null);
                            } 
                            for(i=0;i<shop_markers.length;i++){
                                shop_markers[i].setMap(null);
                            }                        	
                    }

                    for(i=0;i<pollution_markers.length;i++){
                        if(bounds.contains( pollution_markers[i].getPosition() )){
                            pollution_markers[i].setMap(map);
                            var image = new google.maps.MarkerImage(
                                pollution_markers[i].getIcon().url,
                                null,
                                new google.maps.Point(0, 0),
                                new google.maps.Point(parseInt(icon_size / 2), parseInt(icon_size / 2)),
                                new google.maps.Size(icon_size, icon_size)
                            );  
                            pollution_markers[i].setIcon(image);                            
                        }
                        else
                        {
                            pollution_markers[i].setMap(null);
                        }
                    }                    
                });
                google.maps.event.trigger(map, 'idle');
            });
        }
        else
        {
            /*This is what happens when you are on mobile*/    
            $.when(
              $.ajax({'url': 'js/f_empty.json','type': 'GET'}),
              $.ajax({'url': 'js/p.json','type': 'GET'})
            )
            .done(function(fires, pollutions){
                console.log([fires[0], pollutions[0]]);
                createPollutionMarkers(pollutions[0]);
                for(i=0;i<pollution_markers.length;i++){
                    pollution_markers[i].setMap(map);
                }                               
            });          
        }        
    });
}
