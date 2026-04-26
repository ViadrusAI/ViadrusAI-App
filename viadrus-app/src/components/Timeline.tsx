import React, { useState, useEffect } from 'react';
import './Timeline.scss';

interface TimelineProps {}

const Timeline: React.FC<TimelineProps> = ({}) => {
  const [val, setVal] = useState(72);
  const [playing, setPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let timer: any;
    if (playing) {
      timer = setInterval(() => {
        setVal(v => (v >= 84 ? 0 : v + 1));
      }, 200);
    }
    return () => clearInterval(timer);
  }, [playing]);

  const formatTime = (v: number) => {
    const delta = v - 72;
    if (delta === 0) return 'T-00h · NOW';
    if (delta < 0) return `T${delta}h`;
    return `T+${String(delta).padStart(2, '0')}h · FORECAST`;
  };

  return (
    <footer className={`timeline glass-panel ${collapsed ? 'timeline--collapsed' : ''}`}>
      <button 
        className="timeline__collapse-btn" 
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? "▲" : "▼"}
      </button>

      {!collapsed && (
        <>
          <div className="timeline__controls">
            <button 
              className="timeline__play-btn"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? '||' : '▶'}
            </button>
            <div className="timeline__current">
              <span className="timeline__time">{formatTime(val)}</span>
              <span className="timeline__status">LIVE FEED</span>
            </div>
          </div>
          
          <div className="timeline__slider-wrap">
            <div className="timeline__ticks">
              {[...Array(15)].map((_, i) => (
                <div key={i} className={`timeline__tick ${i === 12 ? 'timeline__tick--major' : ''}`} />
              ))}
            </div>
            <input 
              type="range" 
              min="0" 
              max="84" 
              value={val} 
              onChange={(e) => setVal(parseInt(e.target.value))}
              className="timeline__slider"
            />
            <div className="timeline__fill" style={{ width: `${(val / 84) * 100}%` }} />
          </div>
        </>
      )}
    </footer>
  );
};

export default Timeline;
