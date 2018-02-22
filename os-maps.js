/*
  CityVerve - Ordinance Survey Maps Demo
  https://developer.cityverve.org.uk
  https://github.com/cityverve/ordnance-survey-maps-demo

  Released under the MIT license
  https://en.wikipedia.org/wiki/MIT_License

  Copyright 2018 CityVerve  */

// --- constants

const MANCHESTER   = { center: { lat: 53.4791595, lng: -2.2462938 }, zoom: 12 };  // Town Hall is map center point and zoom
const API_ENDPOINT = 'https://api.cityverve.org.uk/v1/entity/';  // keep trailing slash
const API_KEY      = 'YOUR-KEY-HERE';  // cityverve api key

// --- a generic method for make an asyncronous call to an http endpoint

function httpGet (url, callback)
{
    var xhr = new XMLHttpRequest ();

    xhr.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)  // readyState 4 = DONE, status 200 = HTTP/OK
        {
            callback (JSON.parse (this.responseText));
        }
    };

    xhr.open ('GET', url, true);
    xhr.setRequestHeader ('Authorization', API_KEY);
    xhr.send ();

    return xhr.responseText;
}

// --- info box for blue plaques items

function infoBluePlaque (item)
{
    var location = item.entity.location ? "<b>" + item.entity.location + "</b> - " : "";  // sometimes blank

    return '<h3>' + item.entity.recipient + '</h3>' +
           "<p style='font-size: 1.1em;' >" + location + item.entity.text + '</p>' +
           "<a href='" + item.entity.reference + "'>Wikipedia</a>";
}

// --- info box for history items

function infoHistory (item)
{
    return '<h3>' + item.name + '</h3>' +
           "<img width='250' style='border: 1px solid grey; float:left; margin-right: 12px; margin-bottom: 4px;' src='" + item.entity.image + "'/>" +
           "<p style='font-size: 1.1em;' ><b>" + item.entity.date + "</b> - " + item.entity.description + '</p>';
}

// --- info box for rail stations items

function infoRailStation (item)
{
    var address = [item.entity ['main-road'], item.entity ['side-road']].join (', ');  // sometime side-road is blank

    return '<h3>' + item.name + '</h3>' +
           "<p style='font-size: 1.1em;' >" + address + '</p>' +
           "<a href='" + item.entity ['live-info'] + "'>Live Station Board</a>";
}

// --- the os maps entry point

function initialise ()
{
    var selected = null;
    var entity   = null;
    var infobox  = null;

    if (window.location.search == '?rail-station')
    {
        selected = document.getElementById ('rail-station');
        entity   = 'rail-station';
        infobox  =  infoRailStation;
    }
    else if (window.location.search == '?history')
    {
        selected = document.getElementById ('history');
        entity   = 'history';
        infobox  =  infoHistory;
    }
    else  // default to blue-plaque
    {
        selected = document.getElementById ('blue-plaque');
        entity   = 'blue-plaque';
        infobox  =  infoBluePlaque;
    }

    selected.className += ' selected';  // changes appearance of selected

    var url = API_ENDPOINT + entity;
    var map = L.map ('map').setView ([MANCHESTER.center.lat, MANCHESTER.center.lng], MANCHESTER.zoom);

    L.tileLayer ('https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor%203857/{z}/{x}/{y}.png?key=YOUR-KEY-HERE').addTo (map);

    httpGet (url, function (entities)
    {
        entities.forEach (function (entity)
        {
            httpGet (entity.uri, function (items)
            {
                var item = items [0];

                if (item.loc != null && item.loc.type == 'Point')  // we only handle geojson points
                {
                    L.marker ([item.loc.coordinates [1], item.loc.coordinates [0]])
                        .bindPopup (infobox (item))
                        .addTo (map);
                }
            });
        });
    });
}

// --- start when document is all loaded

document.onreadystatechange = function ()
{
   if (document.readyState == 'complete')
   {
       initialise ();
   }
}
