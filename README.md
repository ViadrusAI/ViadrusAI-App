# ViadrusAI

## Abstract
ViadrusAI is a water anomaly detection platform designed to protect urban infrastructure and ecosystems. By utilizing satellite imagery and space data (Sentinel-1 SAR and Sentinel-2 optical) from the Copernicus program, the system identifies invisible pipe failures beneath city streets and tracks rising flood threats along river catchments. ViadrusAI shifts the paradigm from reactive crisis management to proactive prevention, providing actionable alerts for water managers and emergency services.

## Detailed Explanation
The application addresses critical challenges in water management by turning raw orbital data into high-resolution insights. It focuses on the detection of water anomalies through multi-spectral analysis and temporal z-score tracking.

### Key Features:
- **Satellite Data Integration:** Uses Sentinel-2 (optical) and Sentinel-1 (radar) to monitor soil moisture, water turbidity, and vegetation health.
- **Spectral Indices:** Implements various indices such as:
  - **MNDWI & NDWI:** For mapping water surface extent.
  - **NDMI:** For soil moisture and vegetation water stress.
  - **NDTI & NDCI:** For water quality (turbidity and chlorophyll).
  - **NDVI:** For vegetation health, where anomalous growth can indicate underground leaks.
- **Temporal Analysis:** Employs a z-score method per pixel across time series (45+ dates) to flag significant deviations from the norm.
- **Interactive Dashboard:** A React-based frontend using Leaflet for geospatial mapping and Three.js for immersive global context.
- **Scalability:** While initially focused on Wrocław and the Nysa Kłodzka catchment, the solution is designed to be scalable to any mid-sized European city.

### Beneficiaries:
- **City Infrastructure (MPWiK):** Early detection of pipe bursts.
- **Emergency Services:** Better preparation for flood events.
- **Local Governments & Farmers:** Monitoring water levels and irrigation needs.
- **Developers:** Assessing flood risk for new urban projects.

## How to run the app

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Navigate to the application directory:
   ```bash
   cd viadrus-app
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Development
To start the application in development mode with hot-reloading:
```bash
npm run dev
```
The app will typically be available at `http://localhost:5173`.

### Production Build
To create an optimized production build:
```bash
npm run build
```