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

module.exports = {
  listAllmovies,
  listAllgenres,
  getMoviesByGenre,
  listMoviesByDecade,
};
