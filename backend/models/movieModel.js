const oracledb = require("oracledb");

let selectedMember = null;  // Initially set to null
var user_table;
var with_query = ` WITH userTable AS (
        SELECT M.* FROM LISTMOVIES LM
        INNER JOIN MOVIE M 
        ON M.MOVIEID = LM.MOVIEID
        WHERE USERID = :userID AND LISTID = :listID
      )
    `;
// Function to update the selectedMember (called by the controller)
const setSelectedMember = (member) => {
  selectedMember = member;
};
async function listAllmovies() {
  let conn;

  try {
    conn = await oracledb.getConnection();

    let result;
  

    if (selectedMember !== null) {
      const selectedMemberArray = selectedMember ? Object.values(selectedMember).slice(0, 2) : [0, 0];
      console.log(selectedMemberArray + " In model");
      const [userID, listID] = selectedMemberArray;

      result = await conn.execute(`${with_query} SELECT MOVIEID, TITLE, RELEASEDATE, DESCRIPTION, AVERAGERATING, MOVIE_PICTURE  FROM userTable`, { userID, listID });
    } else {
      result = await conn.execute(`
        SELECT MOVIEID, TITLE, RELEASEDATE, DESCRIPTION, AVERAGERATING, MOVIE_PICTURE 
        FROM MOVIE
      `,);
    }

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
    console.error('Error fetching movies:', err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}




async function listAllgenres() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Genre`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}
async function getMoviesByGenre(genreID) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Define the base table name based on the selected member
    let table = selectedMember ? "UserTable" : "Movie";

    // Construct the query dynamically with the correct table name
    const query = `
      SELECT 
        m.MovieID, m.Title, m.ReleaseDate, m.Description, g.GenreType , m.movie_picture
      FROM 
        ${table} m
      JOIN 
        MovieGenre mg ON m.MovieID = mg.MovieID
      JOIN 
        Genre g ON mg.GenreID = g.GenreID
      WHERE 
        g.GenreID = :genreID
    `;

    let result;
    
    if (selectedMember) {
      const selectedMemberArray = Object.values(selectedMember).slice(0, 2);
      console.log(selectedMemberArray + " In model");
      const [userID, listID] = selectedMemberArray;
      result = await conn.execute(`${with_query}${query}`, { userID, listID, genreID });
    } 
    else {
      result = await conn.execute(query, { genreID });
    }


    
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
    console.error("Error in getMoviesByGenre:", err);
    throw new Error("Failed to fetch movies by genre.");
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function listMoviesByDecade(decade) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    // Get the range for the given decade
    const startYear = parseInt(decade, 10);
    const endYear = startYear + 9;
    let table = selectedMember ? "UserTable" : "Movie";

    const query = `
      SELECT * 
      FROM ${table}
      WHERE EXTRACT(YEAR FROM ReleaseDate) BETWEEN :startYear AND :endYear
    `;

    let result;
    if (selectedMember) {
      const selectedMemberArray = Object.values(selectedMember).slice(0, 2);
      console.log(selectedMemberArray + " In model");
      const [userID, listID] = selectedMemberArray;
      result = await conn.execute(`${with_query}${query}`, { userID, listID, startYear, endYear });
    } 
    else {
      result = await conn.execute(query, { startYear, endYear });
    }

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

/**
 * Fetch all movies from the database.
 * 
 * @param {string} movieName - If provided, can filter the movies by name, otherwise returns all.
 * @returns {Promise<Array>} - A promise that resolves to an array of movies.
 */

async function getUserListInfo(userID,listID) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT u.UserName,l.listname  FROM MovieUser u inner join UserList l on u.UserID = l.UserID where u.UserID =: userID and l.ListID=:listID`, {userID,listID});
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}
async function getUserReviewInfo(userID) {
  const query = `SELECT Username FROM MOVIEUSER
WHERE USERID = :userID`
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, [userID]);
    return result.rows;
  } finally {
    if (connection) {
      await connection.close();
    }
  } 
}

async function getRecentMovies() {
  const query = `SELECT * from Movie order by ReleaseDate DESC limit 5`
  let connection;
  try {
    connection = await oracledb.getConnection();
    return result.rows;
  } finally {
    if (connection) {
      await connection.close();
    }
  } 
}

async function getMoviesByName(name) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    console.log('Connected to Oracle database');

    // Ensure the name is trimmed of excess spaces
    const trimmedName = name.trim();
    let table = selectedMember ? "UserTable" : "Movie";

    // SQL query to search movies by name, allowing partial matches anywhere in the title
    let query = `SELECT * 
       FROM ${table} 
       WHERE UPPER(Title) LIKE UPPER('%' || :name || '%') 
       ORDER BY 
         CASE 
           WHEN UPPER(Title) = UPPER(:name) THEN 1   -- Exact match first
           WHEN UPPER(Title) LIKE UPPER(:name || '%') THEN 2  -- Starts with name
           WHEN UPPER(Title) LIKE UPPER('%' || :name || '%') THEN 3  -- Contains name anywhere
           ELSE 4
         END`;


    if (selectedMember) {
      const selectedMemberArray = Object.values(selectedMember).slice(0, 2);
      console.log(selectedMemberArray + " In model");
      const [userID, listID] = selectedMemberArray;
      // Include userID and listID as part of the bind parameters
      result = await conn.execute(`${with_query}${query}`, {userID, listID, name:`${trimmedName}%`});
    } else {
      result = await conn.execute(query, {name: `${trimmedName}%`});
    }

    // Ensure that result.rows is not null or empty
    // if (!result.rows || result.rows.length === 0) {
    //   return { message: "No movies found for the given name." };
    // }

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
    console.error('Error in getMoviesByName:', err);
    throw err;  // Propagate error
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

/**
 * Get movies based on the rating range or highest/lowest rated movies.
 * @param {number} rating - The rating or special value (6 for highest, 0 for lowest).
 * @returns {Array} - List of movies matching the rating range or highest/lowest ratings.
 */
async function listMoviesByRatingRange(rating) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    let query = '';
    let params = {};
    let table = selectedMember ? "UserTable" : "Movie";
    
    if (rating === 6) {
      // Fetch highest rated movies
      query = `SELECT * FROM ${table} ORDER BY AVERAGERATING DESC`;
    } else if (rating === 0) {
      // Fetch lowest rated movies
      query = `SELECT * FROM ${table} ORDER BY AVERAGERATING ASC`;
    } else {
      // Rating ranges (e.g., 5 -> 5-4, 4 -> 4-3, etc.)
      query = `
        SELECT * 
        FROM ${table}
        WHERE AVERAGERATING <= :rangeStart AND AVERAGERATING > :rangeEnd 
        ORDER BY AVERAGERATING DESC
      `;
      params.rangeStart = rating;
      params.rangeEnd = rating - 1;
    }

    let result;
    if (selectedMember) {
      const selectedMemberArray = Object.values(selectedMember).slice(0, 2);
      console.log(selectedMemberArray + " In model");
      const [userID, listID] = selectedMemberArray;
      // Include userID and listID as part of the bind parameters
      result = await conn.execute(`${with_query}${query}`, {userID, listID,...params});
    } else {
      result = await conn.execute(query, params);
    }

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
  listAllmovies,
  listAllgenres,
  getMoviesByGenre,
  listMoviesByDecade,
  getMoviesByName,
  listMoviesByRatingRange,
  setSelectedMember,
  with_query,
  user_table,
  getUserReviewInfo,
  getUserListInfo
};
