import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResultMessage, setSearchResultMessage] = useState(""); 
  const itemsPerPage = 6; 
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${baseUrl}/hotels`)
      .then((response) => {
        setHotels(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const indexOfLastHotel = currentPage * itemsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - itemsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const regex = new RegExp(searchQuery, 'i');
    const matchingHotels = hotels.filter((hotel) =>
      regex.test(hotel.hotelName)
    );

    setHotels(matchingHotels);

    if (matchingHotels.length === 0) {
      setSearchResultMessage("We haven't added this hotel in our database yet.");
    } else {
      setSearchResultMessage('');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    axios
      .get(`${baseUrl}/hotels`)
      .then((response) => {
        setHotels(response.data);
        setSearchResultMessage('');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(hotels.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
  
      <nav aria-label="Page navigation">
            <div className="alert alert-danger" role="alert">
              Website is under Development, features will work correctly as soon...!
            </div>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className={`page-link ${currentPage === 1 ? 'active-button' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
              <button
                className={`page-link ${
                  currentPage === number ? 'active-button' : ''
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(hotels.length / itemsPerPage)
                ? 'disabled'
                : ''
            }`}
          >
            <button
              className={`page-link ${currentPage === Math.ceil(hotels.length / itemsPerPage) ? 'active-button' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Generate skeleton cards
  const numSkeletons = 6 - hotels.length;
  const skeletonCards = Array.from({ length: numSkeletons }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className={`card ps-1 text-center col-sm-6 col-md-4 my-2 ${
        index % 4 === 0 ? 'first-in-row' : ''
      }`}
    >
      <SkeletonTheme color="#333" highlightColor="rgb(211, 207, 207)">
        <div className="card-img-top">
          <Skeleton width={320} height={200} />
        </div>
        <div className="card-body">
          <Skeleton className="skeleton-animation" width={200} height={20}></Skeleton>
          <Skeleton width={200} height={20}></Skeleton>
          <p className="card-text">
            <div>
              <div className="d-inline">
                <Skeleton width={50} height={20} />
              </div>
              <div className="d-inline ml-2">
                <Skeleton width={150} height={20} />
              </div>
            </div>
          </p>
          <Skeleton width={70} height={30}></Skeleton>
        </div>
      </SkeletonTheme>
    </div>
  ));

  return (
    <div className="hotels-page">
      <div className="row mx-5 all-cards align-items-center justify-content-center" style={{ paddingTop: '120px' }}>
        {isLoading ? (
          skeletonCards
        ) : (
          <>
          <div className="search-container text-center justify-content-center">
              <input
                type="serch"
                className="searchbar"
                placeholder="Search Your Favorite Hotel Name:  e.g Imperial Continental"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button className="search-btn" onClick={handleSearchButtonClick}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <button className="clear-btn" onClick={handleClearSearch}>
                Clear
              </button>
          </div>
            {currentHotels.map((hotel, index) => (
              <div
                key={hotel._id}
                className={`card text-center col-sm-6 col-md-4 my-2 ${
                  index % 4 === 0 ? 'first-in-row' : ''
                }`}
              >
                <>
                  <img
                    className="card-img-top"
                    src={`data:image/png;base64,${hotel.hotelImage}`}
                    alt=""
                    width="400"
                    height="250"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{hotel.hotelName}</h5>
                    <h6>{hotel.hotelDescription}</h6>
                    <p className="card-text">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <span className="mx-1">{hotel.hotelLocation}</span>
                    </p>
                    <Link to={`/hotels/${hotel.hotelName}`} className="text-center button">
                      Book Now
                    </Link>
                  </div>
                </>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="pagination-container text-center mt-3">
        {renderPaginationButtons()}
      </div>
      
      {searchResultMessage && (
        <h1 className="text-center mt-3" style={{color:"#c97f08"}}>{searchResultMessage}</h1>
      )}
    </div>
  );
};

export default Hotels;
