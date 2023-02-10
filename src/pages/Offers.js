import React, { useEffect, useState } from 'react'
import { db } from './../firebase.config';
import { toast } from 'react-toastify';
import { IoReloadCircle } from "react-icons/io5";
import Layout from '../components/Layout/Layout';
import { collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore';
import Spinner from './../components/Layout/Spinner';
import ListingItem from './../components/Layout/ListingItem';
import "../styles/offers.css"
const Offers = () => {
  const [listing, setListing] = useState("");
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [loading, setLoading] = useState(true);

    // Fetch listings
    useEffect(() =>{
        const fetchListing = async () => {
            try {
                // refrence
                const listingsRef = collection(db, "listings");
                // query
                const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(1));
                // execute query
                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchListing(lastVisible);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setListing(listings);
                setLoading(false);
            } catch (error) {
                console.log(error)
                toast.error('Unable to fetch data')
            }
        };
        // function calling
        fetchListing();
    }, []);
    
    // Load more listings
    const fetchLoadMoreListing = async () => {
        try {
            // refrence
            const listingsRef = collection(db, "listings");
            // query
            const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"),startAfter(lastFetchListing), limit(10));
            // execute query
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchListing(lastVisible);
            const listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListing((prevState) => [...prevState, ...listings]);
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error('Unable to fetch data')
        }
    };
  return (
    <Layout>
        <div className="container mt-5 offers">
            <h1 className='text-center'>
                
                Best Offers
            </h1>
            {loading ? (
                <Spinner />
                ) : listing && listing.length > 0 ? (
                <>
                    <div>
                    {listing.map((list) => (
                        <ListingItem listing={list.data} id={list.id} key={list.id} />
                    ))}
                    </div>
                </>
                ) : (
                <p>No Offers Available Now</p>
            )}
        </div>
        <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
        {lastFetchListing && (
          <button className="load-btn" onClick={fetchLoadMoreListing}>
          <IoReloadCircle /> load more
        </button>
        )}
      </div>
    </Layout>
  )
}

export default Offers