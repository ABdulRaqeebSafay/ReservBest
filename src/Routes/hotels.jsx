import React,{useState} from 'react';

const Hotels = () =>{
    return(
    <div className="">
        <div className="row mx-5 all-cards align-items-center justifyy-content-center " style={{paddingTop:"120px"}}>
        <div className="card text-center mx-1 col-sm-6 col-md-5 col-lg my-2" >
            <img className="card-img-top" src="/photo1.jpg" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Hotel Name</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="text-center btn btn-primary">More Details</a>
            </div>
        </div>
        <div className="card text-center mx-1 col-sm-6 col-md-5 col-lg my-2"  >
            <img className="card-img-top" src="/photo1.jpg" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Hotel Name</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className=" btn btn-primary">More Details</a>
            </div>
        </div>
        <div className="card text-center mx-1 col-sm-6 col-md-5 col-lg my-2" >
            <img className="card-img-top" src="/photo1.jpg" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Hotel Name</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="  btn btn-primary">More Details</a>
            </div>
        </div>
        <button className="btn btn secondary">View More</button>
    </div>
    </div>)
}

export default Hotels;