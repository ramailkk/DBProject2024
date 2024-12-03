const oracledb = require("oracledb");

async function getRecentMovies() {
let conn;
try {
  conn = await oracledb.getConnection();
  const result = await conn.execute(`SELECT MovieID,Title,ReleaseDate,Description,averageRating
FROM Movie
ORDER BY ReleaseDate DESC
FETCH FIRST 5 ROWS ONLY`);
  return result.rows;
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
      const result = await conn.execute(`SELECT M.MovieID, M.Title, COUNT(LM.MovieID) AS ListCount
FROM Movie M
LEFT JOIN ListMovies LM ON M.MovieID = LM.MovieID
GROUP BY M.MovieID, M.Title
ORDER BY ListCount DESC
FETCH FIRST 5 ROWS ONLY`);
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
    getRecentMovies,
    getPopularMovies
}