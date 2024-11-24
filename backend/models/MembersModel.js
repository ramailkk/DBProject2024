const oracledb = require("oracledb");

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

module.exports = {
   List_Row_Members
};     
