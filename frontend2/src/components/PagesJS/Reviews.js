import { useState, useEffect } from 'react';
import '../StyleCSS/Reviews.css';
import { useSelectedMember } from './SelectedMemberContext.js';

function Reviews() {
  const { selectedMember } = useSelectedMember();
  console.log(selectedMember?.userId); // Safely log userId

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (selectedMember?.userId) {
      fetch(`http://localhost:3001/api/reviews?id=${selectedMember.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setReviews(data.data); // Ensure reviews are an array
        })
        .catch((error) => console.error('Error fetching reviews:', error));
    }
    
  }, []); // Add selectedMember.userId as a dependency




  const [years, setyears] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetch(`http://localhost:3001/api/reviewsyear?id=${selectedMember.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data); // Assuming data.data is an array of genres
        setyears(data.data); // Set genres to the entire array from the API
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);


  const help = [5,4, 3, 2,1 ];

  const allratings = help.map((item) => (
    <div
      className="film-page-criteria-dropdown__element"
      onClick={() => changeReviewsOnCriteria('http://localhost:3001/api/reviewsrating?', `userID=${selectedMember.userId}&rating=${item}`)}
    >
      &lt; {item}
    </div>
  ));
  const allyears = years.map((item, index) => (
    <div
      className="film-page-criteria-dropdown__element"
      onClick={() => changeReviewsOnCriteria('http://localhost:3001/api/reviewsbyyear?', `id=${selectedMember.userId}&year=${item}`)}
      key={index}
    >
      {item}
    </div>
  ));
  
  function changeReviewsOnCriteria(get_api,criteria){
    let custom_api = get_api + "" + criteria ;
  
    fetch(custom_api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviews(data.data);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }  

  function getRecentReviews(array) {
 
    if (!Array.isArray(array)) return; // Ensure array is valid
    console.log(reviews);
    return array.map((review, index) => (
      <div key={index} className="review-page-review__element">
        <div className="review-page-review__poster"></div>
        <div className="review-page-review__details">
          <div className="review-page-review__name">{review[0]}</div>
          <div className="review-page-review__rating">Rating: {review[3]}/5</div>
          <div className="review-page-review__date">
    Reviewed on: {new Date(review[2]).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })}
</div>

          <div className="review-page-review__comment">{review[1]}</div>
        </div>
      </div>
    ));
  }

  return (  
    <div className="review-page">
      <div className="review-page-container">
        <div className="review-page-heading">Reviews of Insert name of User ID {selectedMember.userId}</div>

        <form className="review-page-criteria-selectorbox">
          <div className="review-page-criteria-selectorbox__element">
            <p className="review-page-browse-by">Browse by</p>
          </div>
          <div className="review-page-criteria-selectorbox__element">
            <button className="review-page-criteria-dropdown__button review-page-genre-criteria">
              <p>Year <i className="arrow down"></i></p>
            </button>
            <div className="review-page-age-criteria-dropdown">
              {allyears}
              </div>
          </div>
          <div className="review-page-criteria-selectorbox__element">
            <button className="review-page-criteria-dropdown__button review-page-genre-criteria">
              <p>Rating <i className="arrow down"></i></p>
            </button>
            <div className="review-page-age-criteria-dropdown">
              <div className="review-page-criteria-dropdown__element" onClick={() => changeReviewsOnCriteria('http://localhost:3001/api/reviewsrating?', `userID=${selectedMember.userId}&rating=6`)}>Highest</div>
              {allratings}
              <div className="review-page-criteria-dropdown__element" onClick={() => changeReviewsOnCriteria('http://localhost:3001/api/reviewsrating?', `userID=${selectedMember.userId}&rating=0`)}>Lowest</div>
            </div>
          </div>
        </form>

        <div className="review-page-review-container">
          {getRecentReviews(reviews)}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
