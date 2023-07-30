import React, { useState, useEffect } from "react";
import Pin from "../assets/pin";
import PinBlue from "../assets/pinBlue";
import PinGreen from "../assets/pinGreen";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import axios from "axios";

const TOKEN =
  "pk.eyJ1IjoiaXZhbi1rcmlzdGlhd2FuIiwiYSI6ImNsMWN4dHljZzA3Z2ozcHFjcnpxbDhnaTIifQ.Z7KSBghh93LRW-7aCNQzEg"; // Set your mapbox token here

// export const tempUrl = "http://localhost:5000";
export const tempUrl = "https://kembangputihanapi.techkudev.com";

export const About = (props) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupUmkm, setPopupUmkm] = useState(null);
  const [popupWisata, setPopupWisata] = useState(null);
  const [penduduk, setPenduduk] = useState({});
  const [umkm, setUmkm] = useState({});
  const [lokasiPetinggis, setLokasiPetinggis] = useState([]);
  const [lokasiUmkms, setLokasiUmkms] = useState([]);
  const [lokasiWisatas, setLokasiWisatas] = useState([]);

  useEffect(() => {
    getLokasiPetinggis();
    getLokasiUmkms();
    getLokasiWisatas();
  }, []);

  const getLokasiPetinggis = async () => {
    try {
      const response = await axios.post(`${tempUrl}/lokasiPetinggis`);
      setLokasiPetinggis(response.data);
    } catch (err) {
      alert(err);
    }
  };

  const getLokasiUmkms = async () => {
    try {
      const response = await axios.post(`${tempUrl}/lokasiUmkms`);
      setLokasiUmkms(response.data);
    } catch (err) {
      alert(err);
    }
  };

  const getLokasiWisatas = async () => {
    try {
      const response = await axios.post(`${tempUrl}/lokasiWisatas`);
      setLokasiWisatas(response.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div id="about" style={{ marginBottom: "100px", marginTop: "-100px" }}>
      <div className="container">
        <div className="row">
          <div
            className="col-xs-12 col-md-12"
            style={{
              height: "400px",
            }}
          >
            <h2>PETA</h2>

            <div>
              <div style={styleMarkerDetail}>
                <Pin />
                <h5>Petinggi Desa</h5>
              </div>
              <div style={styleMarkerDetail}>
                <PinBlue />
                <h5>UMKM</h5>
              </div>
              <div style={styleMarkerDetail}>
                <PinGreen />
                <h5>Wisata</h5>
              </div>
            </div>

            <Map
              initialViewState={{
                latitude: -7.864825,
                longitude: 110.320174,
                zoom: 15,
                bearing: 0,
                pitch: 0,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={TOKEN}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />

              {lokasiPetinggis
                ? lokasiPetinggis.map((d, i) => (
                    <>
                      <Marker
                        key={`marker`}
                        latitude={d.latitude}
                        longitude={d.longitude}
                        anchor="bottom"
                        onClick={(e) => {
                          // If we let the click event propagates to the map, it will immediately close the popup
                          // with `closeOnClick: true`
                          e.originalEvent.stopPropagation();
                          setPopupInfo(penduduk);
                        }}
                      >
                        <Pin />
                      </Marker>

                      {popupInfo && (
                        <Popup
                          anchor="top"
                          latitude={d.latitude}
                          longitude={d.longitude}
                          onClose={() => setPopupInfo(null)}
                        >
                          <div>{d.namaLokasiPetinggi}</div>
                          <a href={d.linkGoogleMaps}>Lihat</a>
                        </Popup>
                      )}
                    </>
                  ))
                : "Loading..."}

              {lokasiUmkms
                ? lokasiUmkms.map((d, i) => (
                    <>
                      <Marker
                        key={`marker`}
                        latitude={d.latitude}
                        longitude={d.longitude}
                        anchor="bottom"
                        onClick={(e) => {
                          // If we let the click event propagates to the map, it will immediately close the popup
                          // with `closeOnClick: true`
                          e.originalEvent.stopPropagation();
                          setPopupUmkm(umkm);
                        }}
                      >
                        <PinBlue />
                      </Marker>

                      {popupUmkm && (
                        <Popup
                          anchor="top"
                          latitude={d.latitude}
                          longitude={d.longitude}
                          onClose={() => setPopupUmkm(null)}
                        >
                          <div>{d.namaLokasiUmkm}</div>
                          <a href={d.linkGoogleMaps}>Lihat</a>
                        </Popup>
                      )}
                    </>
                  ))
                : "Loading..."}

              {lokasiWisatas
                ? lokasiWisatas.map((d, i) => (
                    <>
                      <Marker
                        key={`marker`}
                        latitude={d.latitude}
                        longitude={d.longitude}
                        anchor="bottom"
                        onClick={(e) => {
                          // If we let the click event propagates to the map, it will immediately close the popup
                          // with `closeOnClick: true`
                          e.originalEvent.stopPropagation();
                          setPopupWisata(umkm);
                        }}
                      >
                        <PinGreen />
                      </Marker>

                      {popupWisata && (
                        <Popup
                          anchor="top"
                          latitude={d.latitude}
                          longitude={d.longitude}
                          onClose={() => setPopupWisata(null)}
                        >
                          <div>{d.namaLokasiWisata}</div>
                          <a href={d.linkGoogleMaps}>Lihat</a>
                        </Popup>
                      )}
                    </>
                  ))
                : "Loading..."}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

const styleMarkerDetail = {
  display: "flex",
  alignItems: "center",
};
