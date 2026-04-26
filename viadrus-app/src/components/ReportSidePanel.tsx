import React from 'react';
import './ReportSidePanel.scss';
import { AnalysisReport } from '../data/types';
import LeakChart from './LeakChart';

interface ReportSidePanelProps {
  report: AnalysisReport | null;
  onClose: () => void;
}

const ReportSidePanel: React.FC<ReportSidePanelProps> = ({ report, onClose }) => {
  if (!report) return null;

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'priority-critical';
      case 'HIGH': return 'priority-high';
      case 'MEDIUM': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  return (
    <div className={`report-side-panel glass-panel glass-panel--inner-glow ${report ? 'report-side-panel--open' : ''}`}>
      <div className="report-side-panel__header">
        <button className="report-side-panel__close" onClick={onClose}>&times;</button>
        <div className="report-side-panel__badges">
          <div className={`report-side-panel__badge report-side-panel__badge--${getPriorityClass(report.priority)}`}>
            {report.priority}
          </div>
          {report.predictability && (
            <div className="report-side-panel__badge report-side-panel__badge--prediction">
              PREDICTION: {report.predictability}
            </div>
          )}
        </div>
        <h2 className="report-side-panel__title">{report.title}</h2>
        <p className="report-side-panel__date">{report.date}</p>
      </div>

      <div className="report-side-panel__content">
        <section className="report-side-panel__section">
          <h3 className="report-side-panel__section-title">Interpretation</h3>
          <p className="report-side-panel__description">{report.description}</p>
        </section>

        {report.leak_data && (
          <section className="report-side-panel__section">
            <h3 className="report-side-panel__section-title">Soil Moisture & S1 Anomaly Analysis</h3>
            <div className="report-side-panel__chart-container" style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <LeakChart sources={report.leak_data.sources} />
            </div>
          </section>
        )}

        <section className="report-side-panel__section">
          <h3 className="report-side-panel__section-title">Anomaly Indices</h3>
          <div className="report-side-panel__indices">
            {Object.entries(report.indices).map(([key, value]) => (
              <div key={key} className="report-side-panel__index-item">
                <span className="report-side-panel__index-label">{key}</span>
                <span className="report-side-panel__index-value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="report-side-panel__actions">
          <a 
            href={report.report_file.startsWith('http') ? report.report_file : `/src/data/${report.report_file}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="report-side-panel__link"
          >
            Open full PDF report
          </a>
        </section>
        
        <div className="report-side-panel__footer">
          <p>Location: {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}</p>
          <p>ID: {report.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportSidePanel;
