import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../firebase.config";
import { FaEdit, FaArrowAltCircleRight } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import ListingItem from "./ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  // useeffect for getting data
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
      // console.log(listings);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);
  const [changeDetails, setChangeDetials] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const handleLogout = () => {
    auth.signOut();
    toast.success("Successfully Logout");
    navigate("/signin");
  };

  // onchange handler
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // submit handler
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success("User Updated");
      }
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong");
    }
  };

  // Delete Handler
  const onDelete = async(listingId) => {
    if(window.confirm('Are you sure want to delete ?')){
        await deleteDoc(doc(db, 'listings', listingId))
        const updatedListings = listings.filter(listing => listing.id !== listingId)
        setListings(updatedListings)
        toast.success('Listing Deleted Successfully')
    }
  }

  // Edit handler
  const onEdit= (listingId) => {
    navigate(`/editlisting/${listingId}`)
  } 
  return (
    <Layout>
      <div className="container">
        <div className="my-2 d-flex justify-content-between">
          <h4>Profile Detials</h4>
          <button className="btn btn-info" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="container w-50 card">
          <div className="mt-2 d-flex justify-content-between">
            <p>User Personal details</p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetials((prevState) => !prevState);
              }}
            >
              {changeDetails ? (
                <IoCheckmarkDoneCircle color="green" />
              ) : (
                <FaEdit color="red" />
              )}
              {changeDetails ? "Save" : "Edit"}
            </span>
          </div>
          <div className="card-body">
            <form>
              <div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={onChange}
                    disabled={!changeDetails}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={onChange}
                    disabled={!changeDetails}
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <Link to="/create-listing">
          <FaArrowAltCircleRight /> Sell or Rent Your Home
        </Link>
      </div>
      <div className="container">
        {listings && listings?.length > 0 && (
          <>
            <h4 className="text-center">Your Listings</h4>
            <div>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
