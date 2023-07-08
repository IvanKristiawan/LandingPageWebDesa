import { Image } from "./image";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const tempUrl = "http://localhost:5000";
// export const tempUrl = "https://kembangputihanapi.techkudev.com";

export const Gallery = (props) => {
  const [umkms, setUmkms] = useState([]);

  useEffect(() => {
    getUmkms();
  }, []);

  const getUmkms = async () => {
    try {
      const response = await axios.post(`${tempUrl}/umkms`);
      console.log(response.data);
      setUmkms(response.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>UMKM</h2>
          <p>
            Berikut beberapa bisnis lokal yang ada di Kembang Putihan Bantul
            Yogyakarta.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {umkms
              ? umkms.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.namaUmkm}
                      smallImage={d.linkImage}
                      link={d.linkWebsite}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
