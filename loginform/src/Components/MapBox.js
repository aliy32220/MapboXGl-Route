import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Box } from '@chakra-ui/core';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { render } from 'react-dom';
import {
  Button,
} from '@chakra-ui/core';

/* See https://github.com/mapbox/mapbox-react-examples/ for full example */

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
export default function App({address}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0); 
    const [zoom, setZoom] = useState(9);
    const [newLatLong, setNewLatLong] = useState([0,0])
    const [newLatLong2, setNewLatLong2] = useState([0,0])
    const [counter, setcounter] = useState(0)
    const [lng2, setLng2] = useState(0);
    const [lat2, setLat2] = useState(0); 
    console.log(address[0]);  
    console.log(address[1]);
    useEffect(() => {
      if(address[0][0] != 0 && address[0][1] != 0)
      {
        setLat(Number(address[0][0]));
        setLng(Number(address[0][1]));
      }
      if(address[1][0] != 0 && address[1][1] != 0)
      {
        setLat2(Number(address[1][0]));
        setLng2(Number(address[1][1]));
      }
      
      if (map.current) return; // initialize map only once
      else{
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center:{
          lat: 0,
          lng: 0
        },
        zoom: zoom,
        minZoom: 3,
        maxZoom: 10,
        });
      }  
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    });

    useEffect(() => {
      if(address[0][0] != 0 && address[0][1] != 0)
      {
        setNewLatLong(address[0])
      }
    }, [address[0]]);

    useEffect(() => {
      if(address[1][0] != 0 && address[1][1] != 0)
      {
        setNewLatLong2(address[1])
        console.log(`newLatLong2 changed`, newLatLong2)
      }
    }, [address[1]]);

    useEffect(() => {
      if(address[0][0] != 0 && address[0][1] != 0)
      {
        setLat(Number(newLatLong[0]));
        setLng(Number(newLatLong[1]));
        map.current.center = {
          lat: lat,
          lng: lng
        }
        map.current.fitBounds([
          [lng, lat], // southwestern corner of the bounds
          [lng, lat] // northeastern corner of the bounds
          ]);
        console.log(map.current.center);
        map.current.zoom = 9;
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
        
      }
    }, [newLatLong]);

    useEffect(() => {
      if(address[1][0] != 0 && address[1][1] != 0)
      {
        setLat2(Number(address[1][0]));
        setLng2(Number(address[1][1]));
        map.current.center = {
          lat: lat2,
          lng: lng2
        }
        map.current.fitBounds([
          [lng2, lat2], // southwestern corner of the bounds
          [lng2, lat2] // northeastern corner of the bounds
          ]);
        console.log(map.current.center);
        map.current.zoom = 9;
        new mapboxgl.Marker().setLngLat([lng2, lat2]).addTo(map.current);
      }
    }, [newLatLong2]);

    //adding route on locations
    async function AddRoute(){
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${lng},${lat};${lng2},${lat2}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      console.log(route)
      const geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates:route
          }
      };
      var routestring = 'route'+counter;
      console.log(routestring);
      map.current.addSource(String(routestring), {
      'type': 'geojson',
      'data': geojson
      });
      map.current.addLayer({
      'id': String(routestring),
      'type': 'line',
      'source': String(routestring),
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#888',
      'line-width': 8
      }
      });
      setcounter(counter+1);
    }
  return (
    <div>
    <div>
      <p>Lat: {lat} Lng: {lng}</p>
    </div>
    <div ref={mapContainer} className="map-container" />
    <Box>
      <Button onClick={AddRoute} background={'White'} color={'Blue'} variant='outline' borderWidth={1} borderRadius={20} boxShadow="lg">Add Route</Button>
    </Box>
    </div>
    );
  }
