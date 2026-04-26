export interface GeoFeature {
  n: string; // name
  p: number; // probability
  r: string; // risk level ('crit', 'high', 'mid', 'low')
  c: [number, number]; // center [lat, lon]
  g: number[][][]; // geometry (Polygon/MultiPolygon coords)
}

export interface AnalysisReport {
  id: string;
  title: string;
  location: { lat: number; lng: number };
  date: string;
  priority: 'KRYTYCZNY' | 'WYSOKI' | 'ŚREDNI' | 'NISKI' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'SEWAGE' | 'FLOOD' | 'OTHER';
  description: string;
  indices: Record<string, string>;
  predictability?: string;
  report_file: string;
  is_general?: boolean;
  leak_data?: LeakDetection;
}

export interface LeakSource {
  source: { id: string; name?: string };
  status: 'ok' | 'error';
  layers?: {
    key: string;
    label: string;
    points: { date: string; value: number | null }[];
  }[];
}

export interface LeakDetection {
  id: string;
  title: string;
  location: { lat: number; lng: number };
  date: string;
  sources: LeakSource[];
}

export interface Voivodeship {
  code: string;
  name: string;
  capital: string;
  prob: number;
  risk: string;
  area: number;
  stations: number;
  center: [number, number];
  hasDetail?: boolean;
  coords: [number, number][];
}
