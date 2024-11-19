const oracledb = require("oracledb");

async function getGenreByMovie(movieID) {
    let conn;
    try {
    conn = await oracledb.getConnection();
    const query = `
        SELECT 
        g.GenreType 
        From MovieGenre mg
        JOIN Genre g 
        ON mg.GenreID = g.GenreID
        WHERE mg.MovieID = :movieID
    `;
const result = await conn.execute(query, [movieID]);
    return result.rows;
    } catch (err) {
    throw err;
    } finally {
    if (conn) {
        await conn.close();
    }
    }
}
async function getActorByMovie(movieID) {
    let conn;
    try {
        conn = await oracledb.getConnection();
        const query = `
            SELECT 
                a.Name
            FROM Movie m
            JOIN MovieActor ma 
                ON m.MovieID = ma.MovieID
            JOIN Actor a 
                ON ma.ActorID = a.ActorID
            WHERE m.MovieID = :movieID
        `;
        const result = await conn.execute(query, [movieID]);
        return result.rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.close();
        }
    } 
}

async function getDirectorsByMovie(movieID) {
    let conn;
    try {
        conn = await oracledb.getConnection();
        const query = `
            SELECT 
                d.Name
            FROM Movie m
            JOIN MovieDirector md 
                ON m.MovieID = md.MovieID
            JOIN Director d 
                ON md.DirectorID = d.DirectorID
            WHERE m.MovieID = :movieID
        `;
        const result = await conn.execute(query, [movieID]);
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
    getGenreByMovie,
    getActorByMovie,
    getDirectorsByMovie
};     
