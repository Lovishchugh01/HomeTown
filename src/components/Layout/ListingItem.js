import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import "../../styles/listingitem.css"
const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <>
      <div className="card-item-parent d-flex align-items-center justify-content-center">
        <div className="item-card category-link mb-2 w-75  ">
          <Link to={`/category/${listing.type}/${id}`}>
            <div className="row  p-2">
              <div className="col-md-5 item-card-continer1">
                <img src={listing.imgUrls[0]} alt={listing.name} />
              </div>
              <div className="col-md-5 item-card-continer2">
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
          <div className="m-2 p-3">
            {onDelete && (
              <button
                className="btn" style={{background:"#10524c", color:"white"}}
                onClick={() => onDelete(listing.id)}
              >
                Delete Listing
              </button>
            )}
            {onEdit && (
              <button
                className="btn ms-3" style={{background:"#10524c", color:"white"}}
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