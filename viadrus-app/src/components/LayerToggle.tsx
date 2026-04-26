import React, { useState } from 'react';
import './LayerToggle.scss';

interface LayerToggleProps {
  layers: Record<string, boolean>;
  onToggle: (layer: string) => void;
}

const LayerToggle: React.FC<LayerToggleProps> = ({ layers, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fixedLayers = ['voivodeships', 'powiats', 'osiedla', 'reports'];
  
  // Sort: Fixed territorial ones first, then alphabetical
  const allLayerKeys = Object.keys(layers)
    .filter(key => key !== 'leaks') // Ensure leaks is never shown in the list
    .sort((a, b) => {
      const aFixed = fixedLayers.indexOf(a);
      const bFixed = fixedLayers.indexOf(b);
      if (aFixed !== -1 && bFixed !== -1) return aFixed - bFixed;
      if (aFixed !== -1) return -1;
      if (bFixed !== -1) return 1;
      return a.localeCompare(b);
    });

  const getLabel = (key: string) => {
    const labels: Record<string, string> = {
      voivodeships: 'VOIVODESHIPS',
      powiats: 'COUNTIES',
      osiedla: 'NEIGHBORHOODS',
      reports: 'REPORTS'
    };

    if (labels[key]) return labels[key];
    
    const parts = key.split('.');
    const baseName = parts[0].replace(/_/g, ' ').toUpperCase();
    const extension = parts.length > 1 ? parts.pop()?.toUpperCase() : '';
    
    // Check for duplicates with the same base name
    const duplicates = Object.keys(layers).filter(l => l.split('.')[0] === parts[0]);
    
    if (duplicates.length > 1 && extension) {
      return `${baseName} (${extension})`;
    }
    return baseName;
  };

  return (
    <div className={`layer-toggle glass-panel glass-panel--inner-glow ${isCollapsed ? 'layer-toggle--collapsed' : ''}`}>
      <div className="layer-toggle__header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="layer-toggle__title">LAYERS & DATA</div>
        <div className={`layer-toggle__icon ${isCollapsed ? 'layer-toggle__icon--collapsed' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="layer-toggle__items">
          {allLayerKeys.map(layer => {
            const isTiff = layer.toLowerCase().endsWith('.tif') || layer.toLowerCase().endsWith('.geotiff');
            return (
              <label key={layer} className="layer-toggle__item" title={isTiff ? "Note: Browsers cannot display TIFF files directly" : ""}>
                <input 
                  className="layer-toggle__input"
                  type="checkbox" 
                  checked={layers[layer] || false} 
                  onChange={() => onToggle(layer)} 
                />
                <span className="layer-toggle__slider"></span>
                <span className="layer-toggle__label" style={{ opacity: isTiff ? 0.6 : 1 }}>
                  {getLabel(layer)}
                  {isTiff && " ⚠️"}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LayerToggle;
