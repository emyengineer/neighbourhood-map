# Neighbourhood MAP App Project
# Nano Degree project No. Eight

## Table of Contents

* [Instructions](#instructions)
    * [Definition](#Definition)
    * [Components](#Rules)
* [Install](#Install)
* [Run the project](#Run)
* [Contributing](#contributing)
* [Backend Server](#Backend Server)
* [About](#About)

## Instructions

##  Neighbourhood MAP App Project
# Definition
_Is a project built using **React**, it has 1 main page:_
* _**main page**_ displays a google map displays places and markers for locations
       of neighbouhood at sharm El Sheikh City in Egypt.
  * the user can search by resort name
  * a list of all places are shown
  * when the user filters for a specific name the map updates, and displays only the filtertion result
  * when user clicks on a marker an info window opens and displays data about the
  place and the image of the place
    * when the user tabs through the list and presses Enter the corresponding marker location opens and pops up the Info Window

# Project Components:
* The project has 10 main components
  *  App.js
  *  Header.js
  *  Footer.js
  *  MAp.js
  *  ImageViewer.js
  *  InfowindowContent.js
  *  Location.js
  *  Map.js
  *  SearchPlaces.js
  *  CompositeGoogleMap.js
  and MapsDataAPI.js used to get data from third party API FourSquareAPI https://foursquare.com/developers/  Asynchronously
* _**App.js**_ component is the top parent component that handles all state and data processing from inside it


# Install:
download all the files contained within `neighbourhood-map` folder
with all subfolders .
cd inside the folder on the terminal and type >>: `yarn start` 

# Run the project:
* _**cd**_ to your current project directory 
    run `npm install` and then `yarn start ` and here you go :)
[neighbourhood-map](https://emyengineer.github.io/neighbourhood-map/)
 **Offline use** mode works only in production build
  We can run it in production by using the following commands
  ```npm run serve```
  And then visit localhost:50
# Contributing
This code is developed and used search for help on some
* [REACT Course](https://courses.totalreact.com/p/advanced-react-free) 
## Backend Server

# Why This Project?
_a google map displays places and markers for locations
       of neighbouhood at sharm El Sheikh City in Egypt.
  * the user can search by resort name  a list of all places are shown_
# Project Rubric
## Interface Design
**Responsiveness**
All application components render on-screen in a responsive manner.
**Usability**
All application components are usable across modern desktop, tablet, and phone browsers.
## Application Functionality
**Location Filter**
Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.
**List View**
* A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.

* Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)

* List functionality is responsive and runs error free.

**Map and Markers**
* Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
* Clicking a marker displays unique information about a location somewhere on the page (modal, separate div, inside an infoWindow).
* Any additional custom functionality provided in the app functions error-free.

**Asynchronous Data Usage**

**Asynchronous API Requests**
Application utilizes the Google Maps API or another mapping system and at least one non-Google third-party API. Refer to this documentation
All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest.

**Error Handling**
Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page that it didn’t load.

**Location Details Functionality**
* Additional Location Data
* Functionality providing additional data about a location is provided and sourced from a 3rd party API. Information can be provided either in the marker’s infoWindow, or in an HTML element in the DOM (a sidebar, the list view, a modal, etc.)
* Provide attribution for the source of additional data. For example, if using Foursquare, indicate somewhere in your UI and in your README that you are using Foursquare data.

**Error Free**

* Application runs without console errors.

**Usability**
* Functionality is presented in a usable and responsive manner.

# **Accessibility**
**Focus**

Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.

Site elements are defined semantically

Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined.

**Accessible Images**

All content-related images include appropriate alternate text that clearly describes the content of the image.
# **Offline Use**
**Service Worker**
When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.
# **Application Architecture**
**Proper Use of React**
* React code follows a reasonable component structure.
* State control is managed appropriately: event handlers are passed as props to child components, and state is managed by parent component functions when appropriate.
* There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API

# About
_**Eman Zaghloul**_ a software engineer who used to work as C# .Net developer for many year.And has passion and desire to learn and build beautiful web sites.
after graduation from **FEND Nano Degree.**  


