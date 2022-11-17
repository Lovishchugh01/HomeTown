import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="card category-link mb-2" style={{ width: "800px" }}>
          <Link to={`/category/${listing.type}/${id}`}>
            <div className="row container p-2">
              <div className="col-md-5">
                <img
                  src={listing.imgUrls[0]}
                  className="img-thumbnail"
                  alt={listing.name}
                  height={200}
                  width={300}
                />
              </div>
              <div className="col-md-5">
                <h2>{listing.name}</h2>
                <h6>{listing.location || listing.address}</h6>
                <p>
                  
                  
                </p>
                <p>
                  RS : {listing.regularPrice} {listing.type === "rent" && " / Month"}

                </p>
                <p>
                { listing.offer ? ` Discount : ${listing.regularPrice - listing.discountedPrice}` : ''}
                </p>
                <p>
                  <FaBed /> &nbsp;
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : "1 Bedroom"}
                </p>
                <p>
                  <FaBath /> &nbsp;
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : "1 Bathroom"}
                </p>
              </div>
            </div>
          </Link>
          <div>
            {onDelete && (
              <button
                className="btn btn-dark ms-3"
                onClick={() => onDelete(listing.id)}
              >
                Delete Listing
              </button>
            )}
            {onEdit && (
              <button
                className="btn btn-info ms-3"
                onClick={() => onEdit(listing.id)}
              >
                Edit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingItem;