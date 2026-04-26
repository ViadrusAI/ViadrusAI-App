import { OSIEDLA_WRO } from '../data/osiedla_data';
import { POWIATS_GEO } from '../data/powiats_data';
import { VOIVODESHIPS } from '../data/voivodeships_data';

const API_BASE = 'http://localhost:8000/api';

export const fetchOsiedla = async () => {
  return OSIEDLA_WRO || [];
};

export const fetchPowiats = async () => {
  return POWIATS_GEO || [];
};

export const fetchVoivodeships = async () => {
  return VOIVODESHIPS || [];
};

export const fetchGeospatialMetadata = async () => {
  try {
    const response = await fetch(`${API_BASE}/geospatial-metadata`);
    if (!response.ok) throw new Error('Failed to fetch geospatial metadata');
    return await response.json();
  } catch (error) {
    console.error('Error fetching geospatial metadata:', error);
    return {};
  }
};
