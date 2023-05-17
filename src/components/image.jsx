import React from "react";

export const Image = ({ title, smallImage,link }) => {
  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        {" "}
        <a href={link} title={title} data-lightbox-gallery="gallery1">
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <img
            src={smallImage}
            className="img-responsive"
            alt={title}
            style={{ width: "1000px", height: "250px" }}
          />{" "}
        </a>{" "}
      </div>
    </div>
  );
};
