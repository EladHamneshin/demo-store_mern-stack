import { useEffect, useRef } from 'react';
import { Map, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import locationSign from '../assets/icons/location-sign.svg';
import 'ol/ol.css';
import { Paper } from '@mui/material';


const locations = [
    { lon: 34.78635811677901, lat: 32.08882688424367, name: 'The super store',addres:'David Remez 23 Tel Aviv',img:'https://t.ly/qgmqT'},
    { lon: 34.78502081545531, lat: 32.0781257416219, name: 'The super store', addres:'Berkovitz 10 Tel Aviv',img:'https://t.ly/qgmqT'},
    { lon: 34.78561517159969, lat: 32.07283765572896, name: 'The super store' ,addres:'Loenardo Da Vinci 6 Tel Aviv',img:'https://t.ly/qgmqT'},
    { lon: 34.77328228161639, lat: 32.06830476724025, name: 'The super store',addres:'Yohanan Hasandlar 2 Tel Aviv',img:'https://t.ly/qgmqT' }
];



const styles = [
    new Style({
        image: new Icon({
            anchor: [0.5, -1], // Change the anchor to [0.5, -1]
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: locationSign,
            scale: [0.05, 0.05],
            color: 'blue'
        })
    })
];

const features = locations.map((location) => {
    return new Feature({
        geometry: new Point(fromLonLat([location.lon, location.lat])),
        name: location.name,
        addres:location.addres,
        imgsrc:location.img
    });
});

features.forEach(feature => feature.setStyle(styles[0]));


const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
            source: new VectorSource({
                features: features
            }),
        }),
    ],
    view: new View({
        center: fromLonLat([34.79, 32.09]),
        zoom: 12,
    }),
});

const StoreMap = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        map.setTarget(mapRef.current!);
        const featureOverlay = new Overlay({
            element: popupRef!.current as unknown as HTMLElement,
            positioning: 'bottom-center',
            stopEvent: false,
            autoPan:{
                animation:{
                    duration:1500
                }
            }
        });

        map.addOverlay(featureOverlay);
        map.on('singleclick', (event) => {
            const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
                return feature;
            });
            if (feature) {
                const featureName = feature.get('name');
                const featureAddres = feature.get('addres');
                const featureImg = feature.get('imgsrc');
                console.log(featureImg);

                const coordinate = event.coordinate;
                featureOverlay.setPosition(coordinate);
                popupRef!.current!.lastChild!.firstChild!.textContent = featureName;
                popupRef!.current!.lastChild!.lastChild!.textContent = featureAddres;
                const popupIMG = popupRef!.current!.firstChild! as unknown as HTMLImageElement;
                popupIMG.src = featureImg;
                popupRef!.current!.hidden = false;
            } else {
                popupRef!.current!.hidden = true;
            }
        });
        
        map.on('pointermove', function (e) {
            if (e.dragging) return;
            
            const pixel = map.getEventPixel(e.originalEvent);
            const hit = map.forEachFeatureAtPixel(pixel, function (_feature, _layer) {
              return true;
            });
          
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
          });
    }, []);

    return (
        <>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            <Paper ref={popupRef} elevation={10} style={{ maxWidth: 200, maxHeight: 320, overflow: 'hidden' }}>
                <img src="" alt="" style={{ width: '100%', height: '50%' }} />
                <div style={{ padding: 20, justifyContent: 'flex-start', alignItems: 'center', height: '50%' }}>
                    <h4 style={{ marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis' }}></h4>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}></p>
                </div>
            </Paper>
        </>
    );
};

export default StoreMap;
