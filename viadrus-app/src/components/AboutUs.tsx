import React from 'react';
import './AboutUs.scss';

interface Contributor {
  name: string;
  roles: string[];
  contact?: {
    linkedin?: string;
  };
}

const CONTRIBUTORS: Contributor[] = [
  {
    name: "Adrian Kulik",
    roles: ["Frontend", "UX/UI", "Hydrology", "Backend", "DevOps"],
    contact: {
      linkedin: "https://www.linkedin.com/in/adrian-kulik"
    }
  },
  {
    name: "Michał Krupka",
    roles: ["Product Owner", "Frontend", "Backend"],
    contact: {
      linkedin: "https://www.linkedin.com/in/michal-krupka-1659313/"
    }
  },
  {
    name: "Leszek Michalak",
    roles: ["Data Engineering", "ML", "Satellite Data", "Crowdsourcing"],
    contact: {
      linkedin: "https://www.linkedin.com/in/leszek-michalak-422745b6/"
    }
  },
  {
    name: "Maks Krawczak",
    roles: ["Business Analyst", "Scientific Research"],
    contact: {
      linkedin: "https://www.linkedin.com/in/maksymilian-krawczak/"
    }
  },
  {
    name: "Bartosz Tyński",
    roles: ["Data Eng", "ML/AI", "Python", "Data Ops"],
    contact: {
      linkedin: "https://www.linkedin.com/in/bt96/"
    }
  },
  {
    name: "Katarzyna Kapusta",
    roles: ["Python", "Front & Backend"],
    contact: {
      linkedin: "https://www.linkedin.com/in/katarzyna-kapusta-073bb3292/"
    }
  },
  {
    name: "Marcin Derewońko",
    roles: ["Project/Change Manager", "SAP FICO Consultant", "AI/ML in Finance", "Geovisualization"],
    contact: {
      linkedin: "https://www.linkedin.com/in/marcin-derewońko-413904b7/"
    }
  }
];

interface AboutUsProps {
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
  return (
    <div className="about-us-overlay" onClick={onClose}>
      <div className="about-us-modal glass-panel" onClick={e => e.stopPropagation()}>
        <header className="about-us-header">
          <h2>CONTRIBUTORS</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </header>
        
        <div className="about-us-content">
          <div className="contributors-grid">
            {CONTRIBUTORS.map((c, i) => (
              <div key={i} className="contributor-card glass-panel glass-panel--inner-glow">
                <h3>{c.name}</h3>
                <ul className="roles">
                  {c.roles.map((role, ri) => <li key={ri}>{role}</li>)}
                </ul>
                
                <div className="contributor-contact">
                  {c.contact?.linkedin && (
                    <a href={c.contact.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
