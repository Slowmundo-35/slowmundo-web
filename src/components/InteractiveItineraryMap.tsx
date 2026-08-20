"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MapWaypoint {
  day: number;
  title: string;
  locationName: string;
  desc: string;
  images: string[];
  lat: number;
  lng: number;
}

interface InteractiveItineraryMapProps {
  country: string;
  waypoints: MapWaypoint[];
  activeMapDay: number;
  setActiveMapDay: (day: number) => void;
  handleScrollToDay: (day: number) => void;
}

export const InteractiveItineraryMap: React.FC<InteractiveItineraryMapProps> = ({
  country,
  waypoints,
  activeMapDay,
  setActiveMapDay,
  handleScrollToDay,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // Active waypoint object
  const activeWaypoint = waypoints.find((w) => w.day === activeMapDay) || waypoints[0];

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Default center from first waypoint or country center
    const initialLat = waypoints[0]?.lat || 40.0;
    const initialLng = waypoints[0]?.lng || 0.0;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 7,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    // High quality Voyager tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Track if bounds have been fitted for current waypoints
  const hasFittedBoundsRef = useRef<boolean>(false);

  // Update markers, polyline whenever waypoints or activeMapDay changes
  useEffect(() => {
    const map = mapRef.current;
    const layerGroup = layerGroupRef.current;

    if (!map || !layerGroup || waypoints.length === 0) return;

    // Clear previous markers & polylines
    layerGroup.clearLayers();

    const latLngs: [number, number][] = [];

    // Draw route polyline
    waypoints.forEach((w) => {
      latLngs.push([w.lat, w.lng]);
    });

    if (latLngs.length > 1) {
      const polyline = L.polyline(latLngs, {
        color: '#064E3B',
        weight: 2.5,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round',
      });
      polyline.addTo(layerGroup);
    }

    // Add Markers with HTML icons
    waypoints.forEach((w) => {
      const isActive = w.day === activeMapDay;

      const markerHtml = `
        <div class="relative group cursor-pointer flex items-center justify-center">
          ${
            isActive
              ? `<span class="absolute -inset-1.5 rounded-full bg-[#064E3B]/30 animate-ping pointer-events-none"></span>`
              : ''
          }
          <div class="w-10 h-10 md:w-11 md:h-11 rounded-full font-extrabold text-xs md:text-sm flex items-center justify-center transition-all duration-300 shadow-xl ${
            isActive
              ? 'bg-[#064E3B] text-white ring-4 ring-[#064E3B]/30 scale-125 z-30'
              : 'bg-white text-[#064E3B] border-2 border-[#064E3B] hover:bg-[#064E3B] hover:text-white hover:scale-110 z-20'
          }">
            J${w.day}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-pin',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const marker = L.marker([w.lat, w.lng], {
        icon: customIcon,
        zIndexOffset: isActive ? 1000 : w.day,
      });

      marker.on('click', () => {
        setActiveMapDay(w.day);
      });

      marker.addTo(layerGroup);
    });

    // Fit bounds on first render for this waypoint list
    if (latLngs.length > 0 && !hasFittedBoundsRef.current) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 });
      hasFittedBoundsRef.current = true;
    }
  }, [waypoints, activeMapDay, setActiveMapDay]);

  // Pan map when activeMapDay changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeWaypoint) return;

    map.panTo([activeWaypoint.lat, activeWaypoint.lng], { animate: true, duration: 0.6 });
  }, [activeMapDay, activeWaypoint]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-md">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-[480px] md:h-[540px] z-0" />

      {/* Floating Info Card for Active Waypoint */}
      <AnimatePresence mode="wait">
        {activeWaypoint && (
          <motion.div
            key={activeWaypoint.day}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-5 left-5 right-5 sm:right-auto sm:left-6 sm:max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-100 z-20"
          >
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow-sm">
                <img
                  src={activeWaypoint.images?.[0]}
                  alt={activeWaypoint.locationName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md shrink-0">
                    Jour {activeWaypoint.day}
                  </span>
                  <span className="text-xs font-semibold text-text-muted truncate">
                    {activeWaypoint.locationName}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-text-main line-clamp-1 mb-1">
                  {activeWaypoint.title.replace(/^Jour \d+ : /, '')}
                </h4>

                <p className="text-xs text-text-muted line-clamp-2 mb-2.5 leading-relaxed">
                  {activeWaypoint.desc}
                </p>

                <button
                  onClick={() => handleScrollToDay(activeWaypoint.day)}
                  className="w-full text-center bg-primary text-white py-1.5 px-3 rounded-lg font-bold text-xs hover:bg-primary-hover transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Voir le détail de la journée</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* External Google Maps Link Button */}
      <div className="absolute top-4 right-4 z-20">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${activeWaypoint?.locationName || country}, ${country}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-text-main font-semibold text-xs px-3 py-2 rounded-xl shadow-md border border-gray-200/80 hover:bg-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
          <span>Ouvrir dans Google Maps</span>
        </a>
      </div>
    </div>
  );
};
