const oracledb = require("oracledb");

async function listfavmovies(userID){
    let conn;
    try {
    conn = await oracledb.getConnection();
    const query = `SELECT M.* FROM MOVIE M
INNER JOIN LISTMOVIES L
ON M.MOVIEID = L.MOVIEID
WHERE LISTID = 2 AND USERID = :userID
FETCH FIRST 4 ROWS ONLY`

    const result = await conn.execute(query ,[userID]);
    return result.rows;
    } catch (err) {
    throw err;
    } finally {
    if (conn) {
        await conn.close();
    }   
    }
}

async function listbyrev(userid){
    let conn;
    try {
    conn = await oracledb.getConnection();
    const query = 'Select * from movie m inner join reviews r on r.movieID = m.movieID inner join movieuser mu on mu.userID = r.userID where mu.userID = :userid order by r.ReviewDate desc limit 3';
    const result = await conn.execute(query);
    return result.rows;
    } catch (err) {
    throw err;
    } finally {
    if (conn) {
        await conn.close();
    }   
    }
}

async function List_Row_Members() {
    let conn;
    try {
    conn = await oracledb.getConnection();
    const query = 
    `WITH
USER_REVIEWS AS (
    SELECT U.USERID, COUNT(R.USERID) AS REVIEWS_FOR_EACH
    FROM MOVIEUSER U
    LEFT JOIN REVIEWS R ON U.USERID = R.USERID
    GROUP BY U.USERID
),
USER_WATCHED AS (
    SELECT U.USERID, COUNT(LM.USERID) AS FILMS_FOR_EACH
    FROM MOVIEUSER U
    LEFT JOIN LISTMOVIES LM ON U.USERID = LM.USERID AND LM.LISTID = 1
    GROUP BY U.USERID
),
USER_LISTS AS (
    SELECT USERID, COUNT(LISTID)-3 AS LISTS_FOR_EACH
    FROM USERLIST
    GROUP BY USERID
)
SELECT U.USERID, U.USERNAME, W.FILMS_FOR_EACH, L.LISTS_FOR_EACH, R.REVIEWS_FOR_EACH
FROM MOVIEUSER U
LEFT JOIN USER_REVIEWS R ON U.USERID = R.USERID
LEFT JOIN USER_WATCHED W ON U.USERID = W.USERID
INNER JOIN USER_LISTS L ON U.USERID = L.USERID
ORDER BY U.USERID
`;
const result = await conn.execute(query);
    return result.rows;
    } catch (err) {
    throw err;
    } finally {
    if (conn) {
        await conn.close();
    }   
    }
}
async function List_Single_Member(userID) {
    let conn;
    try {
    conn = await oracledb.getConnection();
    const query = 
    `    WITH
    USER_REVIEWS AS (
        SELECT 
            U.USERID, 
            U.USERNAME, 
            COALESCE(COUNT(R.USERID), 0) AS REVIEWS_FOR_ONE
        FROM MOVIEUSER U
        LEFT JOIN REVIEWS R ON R.USERID = U.USERID
        WHERE U.USERID = 83
        GROUP BY U.USERID, U.USERNAME
    ),
    USER_FILMS AS (
        SELECT 
            U.USERID, 
            U.USERNAME, 
            COALESCE(COUNT(LM.USERID), 0) AS FILMS_FOR_ONE
        FROM MOVIEUSER U
        LEFT JOIN LISTMOVIES LM ON LM.USERID = U.USERID
        WHERE U.USERID = 83 AND LM.LISTID = 1 
        GROUP BY U.USERID, U.USERNAME
    )
    SELECT 
        R.USERNAME, 
        COALESCE(R.REVIEWS_FOR_ONE, 0) AS REVIEWS_FOR_ONE, 
        COALESCE(F.FILMS_FOR_ONE, 0) AS FILMS_FOR_ONE
    FROM USER_REVIEWS R
    LEFT JOIN USER_FILMS F ON R.USERID = F.USERID

    `;
const result = await conn.execute(query, {userID});
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
   List_Row_Members,
   List_Single_Member,
   listfavmovies,
   listbyrev
};     
