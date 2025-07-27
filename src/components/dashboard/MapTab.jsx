import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Globe, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '0.75rem',
};

const defaultCenter = {
  lat: 20,
  lng: 0
};

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
];

const markerIcons = {
  solar: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  wind: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  hydro: 'https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
  green_hydrogen: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  default: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
};

export default function MapTab({ projects }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const navigate = useNavigate();

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };
  
  const handleViewProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Global Interactive Map</h2>
      
      <div className="bg-card p-4 sm:p-6 rounded-xl border">
        <div className="relative">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={2}
            options={{ 
              styles: mapStyles,
              disableDefaultUI: true,
              zoomControl: true,
              backgroundColor: '#f5f5f5',
            }}
          >
            {projects && projects.filter(p => p.latitude && p.longitude).map((project) => (
              <Marker
                key={project.id}
                position={{ lat: project.latitude, lng: project.longitude }}
                title={project.digital_asset_name}
                icon={{
                  url: markerIcons[project.type] || markerIcons.default,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => handleMarkerClick(project)}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                onCloseClick={handleInfoWindowClose}
              >
                <div className="p-2 rounded-lg shadow-lg max-w-xs w-64 text-foreground">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-bold text-primary">{selectedMarker.digital_asset_name}</h3>
                     <button onClick={handleInfoWindowClose} className="p-1 rounded-full hover:bg-muted transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Type:</strong> <span className="capitalize">{selectedMarker.type.replace('_', ' ')}</span></p>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Capacity:</strong> {selectedMarker.capacity} MW</p>
                  <p className="text-sm text-muted-foreground mb-3"><strong>ROI:</strong> {selectedMarker.roi}%</p>
                  <Button 
                    onClick={() => handleViewProjectClick(selectedMarker.id)}
                    className="w-full"
                    size="sm"
                  >
                    View Project
                  </Button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <p className="text-muted-foreground text-sm font-semibold">Legend:</p>
          <div className="flex items-center space-x-2">
            <img src={markerIcons.solar} alt="Solar" className="w-5 h-5" />
            <span className="text-muted-foreground text-sm">Solar</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src={markerIcons.wind} alt="Wind" className="w-5 h-5" />
            <span className="text-muted-foreground text-sm">Wind</span>
          </div>
           <div className="flex items-center space-x-2">
            <img src={markerIcons.hydro} alt="Hydro" className="w-5 h-5" />
            <span className="text-muted-foreground text-sm">Hydro</span>
          </div>
           <div className="flex items-center space-x-2">
            <img src={markerIcons.green_hydrogen} alt="Green Hydrogen" className="w-5 h-5" />
            <span className="text-muted-foreground text-sm">Green Hydrogen</span>
          </div>
          <div className="flex items-center space-x-2">
             <img src={markerIcons.default} alt="Other" className="w-5 h-5" />
            <span className="text-muted-foreground text-sm">Other</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}