import React from 'react';
import './Sidebar.scss';
import LayerToggle from './LayerToggle';

interface SidebarProps {
  layers: Record<string, boolean>;
  onToggle: (layer: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  layers, 
  onToggle
}) => {
  return (
    <aside className="sidebar">
      <LayerToggle layers={layers} onToggle={onToggle} />
    </aside>
  );
};

export default Sidebar;
