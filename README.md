# ordnance-survey-maps-demo

This is a demonstration of using the CityVerve API together with Ordnance Survey Maps

Click [here](https://cityverve.org.uk/what-is-cityverve/) to learn more about CityVerve.

Click [here](http://developer.cityverve.org.uk/) to go to the CityVerve Developer Portal.

Click [here](http://developer.cityverve.org.uk/showcase) to see a showcase of working CityVerve apps (including this demo).

Click [here](https://developer.ordnancesurvey.co.uk/) to go to the Ordnance Survey developer portal.

## Instructions

In order to get this demo working for yourself, you simply need to clone the repo and host the files within your web-server of choice.

Before it will work, however, you need to make **two modification**:

### CityVerve API Key

At the top of the JavaScript file, you will find the following line of code:

```javascript
const API_KEY = 'YOUR-KEY-HERE';  // cityverve api key
```

You need to replace the string **YOUR-KEY-HERE** with your own personal _CityVerve API key_. You can get a key (for free) at our [Developer Portal](http://developer.cityverve.org.uk/home). Just follow the steps in our [Getting Started](http://developer.cityverve.org.uk/get-started) guide.

### Ordnance Survey Maps API Key

Towards the middle of the JavaScript file, you will find the following line of code:

```html
L.tileLayer ('https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor%203857/{z}/{x}/{y}.png?key=YOUR-KEY-HERE').addTo (map);
```

You need to replace the string **YOUR-KEY-HERE** with your own personal _Ordnance Survey Maps API key_. You can get a key at the [Ordnance Survey Developer Portal](https://developer.ordnancesurvey.co.uk/).


_Have fun, and [please do share](https://cityverve.org.uk/contact/) any cool apps that you make with the CityVerve API._
