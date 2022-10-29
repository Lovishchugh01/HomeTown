import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleAuthHandler = async () =>{
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if(!docSnap.exists()){
          await setDoc(doc(db, 'users', user.uid),{
            name: user.displayName,
            email: user.email,
            timestamp: serverTimestamp()
          })
        }
        navigate('/');
      } catch (error) {
        toast.error('Problem with Google Auth')
      }
    }
  return (
    <div className='container'>
      <h6>Sign {location.pathname=== "/signup" ? "Up" : "in"} with  
        <button className='ms-2'><FcGoogle onClick={onGoogleAuthHandler} /></button>
      </h6>
    </div>
  )
}

export default OAuth