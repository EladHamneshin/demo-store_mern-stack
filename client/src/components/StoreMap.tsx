import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import locationSign from '../assets/icons/location-sign.svg'
import 'ol/ol.css'

const locations = [
    { lon: 34.78635811677901, lat: 32.08882688424367 },
    { lon: 34.78502081545531, lat: 32.0781257416219 },
    { lon: 34.78561517159969, lat: 32.07283765572896 },
    { lon: 34.77328228161639, lat: 32.06830476724025 }
];

const styles = [
    new Style({
        image: new Icon({
            src: locationSign,
            // width: 42,
            // height: 42,
            anchor: [0, 0],
            scale: 2
        }),
    })
];

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
            source: new VectorSource({
                features: locations.map((location) => {
                    return new Feature({
                        geometry: new Point(fromLonLat([location.lon, location.lat])),
                        style: styles,
                    });
                }),
            }),
        }),
    ],
    view: new View({
        center: fromLonLat([34.79, 32.09]),
        zoom: 14,
    }),
});

const StoreMap = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        map.setTarget(mapRef.current!);
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};

export default StoreMap;
