const oracledb = require("oracledb");

async function getRecentMovies() {
let conn;
try {
  conn = await oracledb.getConnection();
  const result = await conn.execute(`
SELECT  *
FROM Movie
ORDER BY ReleaseDate DESC
FETCH FIRST 5 ROWS ONLY`);
const moviePromises = result.rows.map(async (row) => {
  const [movieID, title, releaseDate, description, averageRating, moviePicture] = row;

  // Default to null if the moviePicture is not available
  let imageBase64 = null;

  if (moviePicture && moviePicture.getData) {
    try {
      // Retrieve the BLOB data asynchronously
      const buffer = await new Promise((resolve, reject) => {
        moviePicture.getData((err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });

      imageBase64 = buffer.toString('base64'); // Convert BLOB to Base64
    } catch (err) {
      console.error('Error converting BLOB to Base64:', err);
    }
  }

  return {
    movieID,
    title,
    releaseDate,
    description,
    averageRating,
    moviePicture: imageBase64,
  };
});

// Wait for all movie promises to resolve, including image processing
const movies = await Promise.all(moviePromises);
return movies;
} catch (err) {
  throw err;
} finally {
  if (conn) {
    await conn.close();
  }
}
}

async function getPopularMovies() {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(`
WITH 
POPULARMOVIES AS (
SELECT M.MOVIEID, COUNT(*) AS COUNT_OF_ALL
FROM Movie M
LEFT JOIN ListMovies LM ON M.MovieID = LM.MovieID
WHERE LISTID = 1
GROUP BY M.MOVIEID
ORDER BY COUNT_OF_ALL DESC
FETCH FIRST 5 ROWS ONLY)
SELECT M.* FROM MOVIE M
INNER JOIN POPULARMOVIES P
ON P.MOVIEID = M.MOVIEID
`);
const moviePromises = result.rows.map(async (row) => {
  const [movieID, title, releaseDate, description, averageRating, moviePicture] = row;

  // Default to null if the moviePicture is not available
  let imageBase64 = null;

  if (moviePicture && moviePicture.getData) {
    try {
      // Retrieve the BLOB data asynchronously
      const buffer = await new Promise((resolve, reject) => {
        moviePicture.getData((err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });

      imageBase64 = buffer.toString('base64'); // Convert BLOB to Base64
    } catch (err) {
      console.error('Error converting BLOB to Base64:', err);
    }
  }

  return {
    movieID,
    title,
    releaseDate,
    description,
    averageRating,
    moviePicture: imageBase64,
  };
});

// Wait for all movie promises to resolve, including image processing
const movies = await Promise.all(moviePromises);
return movies;
    } catch (err) {
      throw err;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
    }

module.exports = {
    getRecentMovies,
    getPopularMovies
}