import React, {Component} from 'react'
/*global google*/
import InfoWindowContent from './InfoWindowContent.js'
import { compose, withProps, withState, lifecycle, withStateHandlers, withHandlers} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
const FaAnchor = require("react-icons/lib/fa/anchor")

const GoogleMapExample = compose(
    withProps({ 	
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfB8UMdS7E9dAIHPW3HzKTkkjsMHg2i0I",
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{height: '500px', width: '100%'}} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withState('center', 'onCenterChange', {lat: 27.9158175, lng: 34.3299505}),
    withState('zoom', 'onZoomChange', 15),
    withHandlers(() => {
            const refs = {
              map: undefined,
            }
            return {
              onMapMounted: () => ref => {
                refs.map = ref
                console.log("Zoom to markers");
                const bounds = new window.google.maps.LatLngBounds();
                ref.props.children.forEach((child) => {
                    console.log('iterating over map children')
                    if (child.type === Marker) {
                        console.log('extending bounds for ', child.props.position.lat, child.props.position.lng)
                        bounds.extend(new window.google.maps.LatLng(child.props.position.lat, child.props.position.lng));
                    }
                })
                ref.fitBounds(bounds);
              }
            }
  }),
    lifecycle({
        componentDidMount() {
        
        },
    }),
   
    withScriptjs,
    withGoogleMap
)(props =>
{
     let iconDefault = {
        url: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png' //'http://maps.gstatic.com/mapfiles/markers2/marker.png'//'http://maps.google.com/mapfiles/ms/icons/POI.shadow.png' //google.maps.SymbolPath.CIRCLE, //FORWARD_CLOSED_ARROW
    }
    return (
    <GoogleMap 
    	//ref ={props.zoomToMarkers}
        //defaultCenter = {{ lat: 27.9158175, lng: 34.3299505 }}
    	zoom = { props.zoom} 
    	center = {props.appCenter}
        mapTypeId = 'roadmap'//terrain 'satellite' roadmap hybrid
        ref = {props.onMapMounted}
        onZoomChanged = {props.onZoomChanged}
        onCenterChanged = {props.onCenterChanged}
    >
    {  
        props.markers.map((marker, index) => (
		<Marker key={index}   
                icon = {props.showInfoIndex === index?  props.markerIcon : iconDefault}
                position = {{lat: marker.lat, lng: marker.lng}} 
		        title = {marker.title} 
                onClick = {(event) => {
                props.onMarkerClicked(event, {lat: marker.lat, lng: marker.lng}, {index})}}
                animation = {props.showInfoIndex === index? google.maps.Animation.BOUNCE : google.maps.Animation.DROP } //CUSTOM_FADE BOUNCE
        > 
			{(props.showInfoIndex == index) && 
                <InfoWindow  onCloseClick = {(event) => {
                    props.onToggleOpen(event, {lat: marker.lat, lng: marker.lng})}}>
				   <InfoWindowContent title = {marker.title} 
                    latlng = {{lat: marker.lat, lng: marker.lng}}
                    venueId = {marker.venueId}
                    />
			    </InfoWindow>}
		</Marker>
	))}
    </GoogleMap>
    )
}
);

export default GoogleMapExample