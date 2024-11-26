import '../StyleCSS/Reviews.css';

function getRecentReviews(array) {
  return array.map((review, index) => (
    <div key={index} className="review-page-review__element">
      <div className="review-page-review__poster"></div>
      <div className="review-page-review__details">
        <div className="review-page-review__name">{review.movieName}</div>
        <div className="review-page-review__rating">Rating: {review.rating}/5</div>
        <div className="review-page-review__date">Reviewed on: {review.reviewDate}</div>
        <div className="review-page-review__comment">{review.comment}</div>
      </div>
    </div>
  ));
}

function Reviews() {
  const dummyReviews = [
    {
      movieName: 'The Great Escape',
      rating: 4,
      reviewDate: '2024-11-25',
      comment: 'A timeless classic that never gets old.',
    },
    {
      movieName: 'Inception',
      rating: 5,
      reviewDate: '2024-11-22',
      comment: 'Mind-blowing visuals and a thought-provoking story!',
    },
    {
      movieName: 'The Room',
      rating: 2,
      reviewDate: '2024-11-20',
      comment: 'So bad it’s actually entertaining.',
    },
    // Add more dummy reviews if needed
  ];



  return (
    <div className="review-page">
      <div className="review-page-container">
        <div className="review-page-heading">Reviews of this person</div>

        <form className="review-page-criteria-selectorbox">
  <div className="review-page-criteria-selectorbox__element">
    <p className="review-page-browse-by">Browse by</p>
  </div>
  <div className="review-page-criteria-selectorbox__element">
    <button className="review-page-criteria-dropdown__button review-page-genre-criteria">
      <p>Genre <i className="arrow down"></i></p>
    </button>
    <div className="review-page-age-criteria-dropdown">allgenres</div>
  </div>
  <div className="review-page-criteria-selectorbox__element">
    <button className="review-page-criteria-dropdown__button review-page-genre-criteria">
      <p>Year <i className="arrow down"></i></p>
    </button>
    <div className="review-page-age-criteria-dropdown">alldecades</div>
  </div>
  <div className="review-page-criteria-selectorbox__element">
    <button className="review-page-criteria-dropdown__button review-page-genre-criteria">
      <p>Rating <i className="arrow down"></i></p>
    </button>
    <div className="review-page-age-criteria-dropdown">
      <div className="review-page-criteria-dropdown__element">Highest</div>
      allratings
      <div className="review-page-criteria-dropdown__element">Lowest</div>
    </div>
  </div>
</form>


        <div className="review-page-review-container">
          {getRecentReviews(dummyReviews)}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
