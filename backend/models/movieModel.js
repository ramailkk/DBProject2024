const oracledb = require("oracledb");

async function listAllmovies() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Movie`);
    return result.rows;
  } catch (err) {
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
    const result = await conn.execute(`SELECT GenreType FROM Genre`);
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
    const query = `
      SELECT 
        m.MovieID, m.Title, m.ReleaseDate, m.Description, g.GenreType 
      FROM 
        Movie m
      JOIN 
        MovieGenre mg ON m.MovieID = mg.MovieID
      JOIN 
        Genre g ON mg.GenreID = g.GenreID
      WHERE 
        g.GenreID = :genreID
    `;
    const result = await conn.execute(query, [genreID]);
    return result.rows;
  } catch (err) {
    throw err;
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

    const query = `
      SELECT * 
      FROM Movie
      WHERE EXTRACT(YEAR FROM ReleaseDate) BETWEEN :startYear AND :endYear
    `;

    const result = await conn.execute(query, { startYear, endYear });
    return result.rows;
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


async function getMoviesByName(name) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    console.log('Connected to Oracle database');

    // Ensure the name is trimmed of excess spaces
    const trimmedName = name.trim();

    // SQL query to search movies by name, allowing partial matches anywhere in the title
    const result = await conn.execute(
      `SELECT * 
       FROM Movie 
       WHERE UPPER(Title) LIKE UPPER('%' || :name || '%') 
       ORDER BY 
         CASE 
           WHEN UPPER(Title) = UPPER(:name) THEN 1   -- Exact match first
           WHEN UPPER(Title) LIKE UPPER(:name || '%') THEN 2  -- Starts with name
           WHEN UPPER(Title) LIKE UPPER('%' || :name || '%') THEN 3  -- Contains name anywhere
           ELSE 4
         END`,
      {
        name: `${trimmedName}%`  // Pass the parameter for wildcards
      }
    );

    // Ensure that result.rows is not null or empty
    if (!result.rows || result.rows.length === 0) {
      return { message: "No movies found for the given name." };
    }

    return result.rows;  // Return the found movies
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
  try {
    let query = '';

    if (rating === 6) {
      // Fetch highest rated movies
      query = `SELECT * FROM movie ORDER BY AVERAGERATING DESC`;
    } else if (rating === 0) {
      // Fetch lowest rated movies
      query = `SELECT * FROM movie ORDER BY AVERAGERATING ASC`;
    } else {
      // Rating ranges (e.g., 5 -> 5-4, 4 -> 4-3, etc.)
      const rangeStart = rating;
      const rangeEnd = rating - 1;
      query = `SELECT * FROM movie WHERE AVERAGERATING <= ${rangeStart} AND AVERAGERATING > ${rangeEnd} ORDER BY AVERAGERATING DESC`;
    }
    let conn;
    conn = await oracledb.getConnection();
    console.log('Connected to Oracle database');

    const result = await conn.execute(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching movies by rating range: ' + error.message);
  }
}


module.exports = {
  listAllmovies,
  listAllgenres,
  getMoviesByGenre,
  listMoviesByDecade,
  getMoviesByName,
  listMoviesByRatingRange
};
