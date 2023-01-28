import React from "react";

const BusinessListItem = ({ business }) => {
  const { name, image_url, url, rating, price, display_phone } = business;
  return (
    <div className="business-list-item">
      <div>
        <img className="business-image" src={image_url} alt={name} />
      </div>
      <div>
        <p>{name}</p>
        <a href={url} rel="noreferrer" target="_blank">
          Website
        </a>
        <p>Rating: {rating}</p>
        <p>Price: {price != null ? price : "not categorized"}</p>
        <p>Phone: {display_phone}</p>
      </div>
    </div>
  );
};

export default BusinessListItem;
