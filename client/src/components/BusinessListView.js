import React from "react";
import BusinessListItem from "./BusinessListItem";
import CircularProgress from "@mui/material/CircularProgress";

const BusinessListView = ({ businesses = [], loading = false }) => {
  return (
    <div className="business-list">
      {!loading ? (
        businesses.map((business) => <BusinessListItem business={business} key={`${business.name}-${business.rating}`} />)
      ) : (
        <CircularProgress color="inherit" size={20} />
      )}
    </div>
  );
};

export default BusinessListView;
