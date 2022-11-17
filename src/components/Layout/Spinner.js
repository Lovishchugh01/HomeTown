import React from 'react'

const Spinner = () => {
  return (
    // <div className="spinner-border text-danger" role="status">
    //   <span className="visually-hidden">Loading...</span>
    // </div>
    <div className='d-flex align-items-center justify-content-center'>
      <div className="lds-hourglass"></div>
    </div>
  )
}

export default Spinner

