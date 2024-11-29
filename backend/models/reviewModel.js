const oracledb = require("oracledb");

async function listAllreviews(userID) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const query = `
    SELECT m.Title,r.reviewdescription, r.reviewdate, r.userrating 
    FROM Movie m 
    INNER JOIN Reviews r ON r.MovieID = m.MovieID 
    WHERE r.UserID = :userID
`;
      const result = await conn.execute(query, {userID});
      return result.rows;
    } 
    catch (err) {
      throw err;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

  async function listAllreviewsyear(userID) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const query = `
        SELECT DISTINCT EXTRACT(YEAR FROM r.REVIEWDATE) AS RELEASE_YEAR
FROM Movie m 
INNER JOIN Reviews r ON r.MovieID = m.MovieID 
WHERE r.UserID = :userID
      `;
      const result = await conn.execute(query, [userID]);
      return result.rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

  async function listreviewsbyyear(userID,year) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const query = `
         SELECT m.Title,r.reviewdescription, r.reviewdate, r.userrating  FROM Movie m
            INNER JOIN Reviews r ON r.MovieID = m.MovieID
            WHERE r.UserID = :userID
            AND EXTRACT(YEAR FROM r.ReviewDate) = :year
      `;
      const result = await conn.execute(query, {userID,year});
      return result.rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

  async function listReviewsByRatingRange(userID, rating) {
    let conn;
    try {
      conn = await oracledb.getConnection();
  
      let query = '';
      let params = { userID };  // Bind userID here
  
      if (rating === 6) {
        // Fetch highest rated movies
        query = `
          SELECT m.Title, r.reviewdescription, r.reviewdate, r.userrating
          FROM REVIEWS r
          INNER JOIN MOVIE m ON r.movieid = m.movieid
          WHERE r.USERID = :userID
          ORDER BY r.USERRATING DESC
        `;
      } else if (rating === 0) {
        // Fetch lowest rated movies
        query = `
          SELECT m.Title, r.reviewdescription, r.reviewdate, r.userrating
          FROM REVIEWS r
          INNER JOIN MOVIE m ON r.movieid = m.movieid
          WHERE r.USERID = :userID
          ORDER BY r.USERRATING ASC
        `;
      } else {
        // Rating ranges (e.g., 5 -> 5-4, 4 -> 4-3, etc.)
        query = `
          SELECT m.Title, r.reviewdescription, r.reviewdate, r.userrating
          FROM REVIEWS r
          INNER JOIN MOVIE m ON r.movieid = m.movieid
          WHERE r.USERRATING <= :rangeStart AND r.USERRATING > :rangeEnd AND r.USERID = :userID
          ORDER BY r.USERRATING DESC
        `;
        params.rangeStart = rating;
        params.rangeEnd = rating - 1;
      }
  
      // Execute the query with named parameters (params)
      const result = await conn.execute(query, params);
      return result.rows;
    } catch (err) {
      console.error('Error fetching movies by rating range:', err.message);
      throw new Error('Error fetching movies by rating range: ' + err.message);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (closeError) {
          console.error('Error closing connection:', closeError.message);
        }
      }
    }
  }
  

  module.exports = {
    listAllreviews,
    listAllreviewsyear,
    listreviewsbyyear,
    listReviewsByRatingRange
  };
  