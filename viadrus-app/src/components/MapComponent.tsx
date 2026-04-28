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

// Custom icon for general report pins
const generalReportIcon = L.divIcon({
  className: 'report-marker-icon',
  html: '<div class="pin pin--general"></div><div class="pulse pulse--general"></div>',
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
        {layers.voivodeships && VOIVODESHIPS.map((v, idx) => {
          const isMainRegion = v.name === 'Dolnośląskie' || v.name === 'Opolskie';
          const fillColor = isMainRegion ? '#ffb400' : '#00d2ff';

          return (
            <Polygon
              key={`v-${idx}`}
              positions={v.coords}
              pathOptions={{
                fillColor: fillColor,
                fillOpacity: isMainRegion ? 0.2 : 0.15,
                color: isMainRegion ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                weight: isMainRegion ? 2 : 1
              }}
            />
          );
        })}

        {/* Powiats Layer */}
        {layers.powiats && POWIATS_GEO.map((p, idx) => {
          const names = ['Wrocław', 'wrocławski', 'brzeski', 'opolski', 'krapkowicki', 'wołowski'];
          // Only mark as exception if name matches AND it's in the Oder region (West of 19°E)
          const isException = names.includes(p.n) && p.c[1] < 19;
          const fillColor = isException ? '#ffb400' : '#0066ff';

          return (
            <Polygon
              key={`p-${idx}`}
              positions={p.g as any}
              pathOptions={{
                fillColor: fillColor,
                fillOpacity: isException ? 0.25 : 0.1,
                color: isException ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                weight: isException ? 1.5 : 1
              }}
            />
          );
        })}

        {/* Osiedla Layer */}
        {layers.osiedla && OSIEDLA_WRO.map((o, idx) => {
          const names = ['Stare Miasto', 'Biskupin - Sępolno - Dąbie - Bartoszowice', 'Nadodrze'];
          const isMain = names.includes(o.n);
          const fillColor = isMain ? '#ffb400' : '#0066ff';

          return (
            <Polygon
              key={`o-${idx}`}
              positions={o.g as any}
              pathOptions={{
                fillColor: fillColor,
                fillOpacity: isMain ? 0.3 : 0.15,
                color: isMain ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                weight: isMain ? 2 : 1
              }}
            />
          );
        })}

        {/* Analysis Reports Pins */}
        {layers.reports && analysisReports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={report.is_general ? generalReportIcon : reportIcon}
            zIndexOffset={report.is_general ? 1000 : 500}
            eventHandlers={{
              click: () => onSelectReport(report),
              mouseover: (e) => e.target.openPopup(),
            }}
          >
            <Popup className="report-mini-popup" offset={[0, -10]}>
              <div className="popup-content">
                <div className="popup-header">
                  <span className={`popup-badge popup-badge--priority-${report.priority.toLowerCase()}`}>
                    {report.priority}
                  </span>
                </div>
                <h3 className="popup-title">{report.title}</h3>
                {report.report_file && (
                  <div className="popup-actions">
                    <a 
                      href={report.report_file} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="popup-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Report PDF
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Leak Detections Pins */}
        {layers.leaks && leakDetections.map((leak) => {
          const correspondingReport = analysisReports.find(r => `leak_${r.id}` === leak.id || r.id === leak.id.replace('leak_', ''));
          return (
            <Marker
              key={leak.id}
              position={[leak.location.lat, leak.location.lng]}
              icon={leakIcon}
              zIndexOffset={100}
              eventHandlers={{
                click: () => correspondingReport && onSelectReport(correspondingReport),
                mouseover: (e) => e.target.openPopup(),
              }}
            >
              <Popup className="report-mini-popup" offset={[0, -10]}>
                <div className="popup-content">
                  <div className="popup-header">
                    <span className="popup-badge popup-badge--leak">LEAK</span>
                  </div>
                  <h3 className="popup-title">{leak.title}</h3>
                  {correspondingReport?.report_file && (
                    <div className="popup-actions">
                      <a 
                        href={correspondingReport.report_file} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="popup-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Report PDF
                      </a>
                    </div>
                  )}
                </div>
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
