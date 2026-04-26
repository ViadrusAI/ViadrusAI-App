import { useState, useEffect } from 'react';
import GlobeIntro from './components/GlobeIntro';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import ReportSidePanel from './components/ReportSidePanel';
import AboutUs from './components/AboutUs';
import { fetchGeospatialMetadata } from './utils/api';
import { AnalysisReport, LeakDetection } from './data/types';
import settings from './data/settings.json';
import localMetadata from './data/geospatial_metadata.json';
import './styles/main.scss';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [geoMetadata, setGeoMetadata] = useState<any>(localMetadata);
  const [selectedReport, setSelectedReport] = useState<AnalysisReport | null>(null);

  const [layers, setLayers] = useState<Record<string, boolean>>({
    voivodeships: true,
    powiats: false,
    osiedla: false,
    reports: true,
    leaks: settings.leaksRendering
  });

  useEffect(() => {
    if (settings.useLocalMetadataOnly) {
      console.log("Using local metadata only as per settings.");
      return;
    }

    // Try to fetch from API
    fetchGeospatialMetadata().then(data => {
      if (data && Object.keys(data).length > 0) {
        console.log("Metadata received from API:", data);
        const metadata = data.metadata || data;
        setGeoMetadata(metadata);
      }
    }).catch(err => console.error("Error fetching metadata from API, using local:", err));
  }, []);

  // Update layers when geoMetadata changes
  useEffect(() => {
    if (geoMetadata) {
      const dynamicLayers: Record<string, boolean> = {};
      Object.keys(geoMetadata).forEach(key => {
        if (key !== 'analysis_reports' && key !== 'leak_detections') {
          dynamicLayers[key] = false;
        }
      });
      setLayers(prev => ({ 
        ...prev, 
        ...dynamicLayers, 
        reports: true,
        leaks: settings.leaksRendering 
      }));
    }
  }, [geoMetadata]);

  const [mapConfig, setMapConfig] = useState<{
    center: [number, number];
    zoom: number;
    view: 'national' | 'region' | 'city';
  }>({
    center: [51.1079, 17.0385],
    zoom: 9,
    view: 'national'
  });

  const toggleLayer = (layer: string) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <main className="app-container">
      {showIntro && <GlobeIntro onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <>
          <MapComponent 
            view={mapConfig.view}
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            layers={layers}
            geoMetadata={geoMetadata}
            onSelectReport={setSelectedReport}
          />
          <Sidebar 
            layers={layers} 
            onToggle={toggleLayer} 
          />
          <ReportSidePanel 
            report={selectedReport} 
            onClose={() => setSelectedReport(null)} 
          />
          
          <header className="app-header">
            <div className="app-header__content">
              <div className="logo">VIADRUS AI</div>
              <button className="about-button" onClick={() => setShowAbout(true)}>
                ABOUT US
              </button>
            </div>
          </header>

          {showAbout && <AboutUs onClose={() => setShowAbout(false)} />}
          {/* <Timeline /> */} 
        </>
      )}
    </main>
  );
}

export default App;
