import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap, ImageOverlay, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.scss';

import { VOIVODESHIPS } from '../data/voivodeships_data';
import { POWIATS_GEO } from '../data/powiats_data';
import { OSIEDLA_WRO } from '../data/osiedla_data';
import { AnalysisReport, LeakDetection } from '../data/types';

interface MapComponentProps {
  view: 'national' | 'region' | 'city';
  center: [number, number];
  zoom: number;
  layers: Record<string, boolean>;
  geoMetadata: any;
  onSelectReport: (report: AnalysisReport) => void;
}

// Custom icon for report pins
const reportIcon = L.divIcon({
  className: 'report-marker-icon',
  html: '<div class="pin"></div><div class="pulse"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Custom icon for leak pins
const leakIcon = L.divIcon({
  className: 'leak-marker-icon',
  html: '<div class="pin pin--leak"></div><div class="pulse pulse--leak"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const MapComponent: React.FC<MapComponentProps> = ({ 
  view, 
  center, 
  zoom, 
  layers, 
  geoMetadata, 
  onSelectReport
}) => {
  const API_GEO_FILES = 'http://localhost:8000/api/geo-files';
  const analysisReports: AnalysisReport[] = geoMetadata.analysis_reports || [];
  const leakDetections: LeakDetection[] = geoMetadata.leak_detections || [];

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        zoomControl={false}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Geospatial Layers from Metadata */}
        {Object.entries(geoMetadata).map(([key, info]: [string, any]) => {
          if (key === 'analysis_reports' || key === 'leak_detections') return null;
          if (!layers[key]) return null;
          
          // Only show layers that have bounds and it's not the identity/placeholder bounds
          if (!info.bounds || (info.bounds.left === 0 && info.bounds.right === info.width)) return null;

          const imageBounds: L.LatLngBoundsExpression = [
            [info.bounds.bottom, info.bounds.left],
            [info.bounds.top, info.bounds.right]
          ];

          return (
            <ImageOverlay
              key={key}
              url={`${API_GEO_FILES}/${info.filename}`}
              bounds={imageBounds}
              opacity={0.7}
              zIndex={100}
            />
          );
        })}

        {/* Voivodeships Layer */}
        {layers.voivodeships && VOIVODESHIPS.map((v, idx) => (
          <Polygon
            key={`v-${idx}`}
            positions={v.coords}
            pathOptions={{
              fillColor: v.risk === 'crit' ? '#ff4b2b' : v.risk === 'high' ? '#ffb400' : '#00d2ff',
              fillOpacity: 0.1,
              color: 'rgba(255,255,255,0.2)',
              weight: 1
            }}
          >
            <Popup>
              <strong>{v.name}</strong><br/>
              Risk: {v.risk}<br/>
              Probability: {(v.prob * 100).toFixed(0)}%
            </Popup>
          </Polygon>
        ))}

        {/* Powiats Layer */}
        {layers.powiats && POWIATS_GEO.map((p, idx) => (
          <Polygon
            key={`p-${idx}`}
            positions={p.g as any}
            pathOptions={{
              fillColor: p.r === 'crit' ? '#ff4b2b' : p.r === 'high' ? '#ffb400' : '#00d2ff',
              fillOpacity: 0.15,
              color: 'rgba(255,255,255,0.3)',
              weight: 1
            }}
          >
            <Popup>
              <strong>{p.n}</strong><br/>
              Risk: {p.r}<br/>
              Probability: {(p.p * 100).toFixed(0)}%
            </Popup>
          </Polygon>
        ))}

        {/* Osiedla Layer */}
        {layers.osiedla && OSIEDLA_WRO.map((o, idx) => (
          <Polygon
            key={`o-${idx}`}
            positions={o.g as any}
            pathOptions={{
              fillColor: o.r === 'crit' ? '#ff4b2b' : o.r === 'high' ? '#ffb400' : '#00d2ff',
              fillOpacity: 0.25,
              color: 'rgba(255,255,255,0.4)',
              weight: 1
            }}
          >
            <Popup>
              <strong>{o.n}</strong><br/>
              Risk: {o.r}<br/>
              Probability: {(o.p * 100).toFixed(0)}%
            </Popup>
          </Polygon>
        ))}

        {/* Analysis Reports Pins */}
        {layers.reports && analysisReports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={reportIcon}
            eventHandlers={{
              click: () => onSelectReport(report),
            }}
          >
            <Popup className="report-mini-popup">
              <strong>{report.title}</strong><br/>
              Priority: {report.priority}
            </Popup>
          </Marker>
        ))}

        {/* Leak Detections Pins */}
        {layers.leaks && leakDetections.map((leak) => {
          const correspondingReport = analysisReports.find(r => `leak_${r.id}` === leak.id);
          return (
            <Marker
              key={leak.id}
              position={[leak.location.lat, leak.location.lng]}
              icon={leakIcon}
              eventHandlers={{
                click: () => correspondingReport && onSelectReport(correspondingReport),
              }}
            >
              <Popup className="report-mini-popup">
                <strong>{leak.title}</strong><br/>
                Date: {leak.date}
              </Popup>
            </Marker>
          );
        })}

        <MapUpdater center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

const MapUpdater: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

export default MapComponent;
