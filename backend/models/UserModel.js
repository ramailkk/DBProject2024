const oracledb = require("oracledb");

// async function createUser(email, hashedPassword) {
//   const query = `INSERT INTO users (email, password) VALUES (:email, :password)`;
//   const binds = { email, password: hashedPassword };

//   let connection;
//   try {
//     connection = await oracledb.getConnection();
//     await connection.execute(query, binds, { autoCommit: true });
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
// }

// async function  getAllUsers() {
//   const query = `SELECT * FROM MOVIEUSER`;
//   let connection;
//   try {
//     connection = await oracledb.getConnection();
//     const result = await connection.execute(query);
//     return result.rows;
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   } 
// }

async function addNewUser(UserData) {
  const username = UserData.username; // Extract username from UserData
  const email = UserData.email; // Extract email from UserData
  const password = UserData.password; // Extract password from UserData
  const joindate = new Date().toISOString(); // Get the current date in ISO format

  let conn;
  try {
    conn = await oracledb.getConnection({
      user: 'your_db_user',
      password: 'your_db_password',
      connectString: 'your_connection_string',
    });

    // Insert the new user into the MOVIEUSER table
    const result = await conn.execute(
      `INSERT INTO MOVIEUSER (USERNAME, EMAIL, PASSWORD, JOINDATE)
      VALUES (:username, :email, :password, TO_DATE(:joindate, 'YYYY-MM-DD"T"HH24:MI:SS'))`,
      { 
        username: username, 
        email: email, 
        password: password, 
        joindate: joindate 
      },
      { autoCommit: true } // Commit the transaction automatically
    );

    console.log('User successfully added:', result.rowsAffected);
    return result; // Return the result of the insertion
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err; // Re-throw the error for further handling
  } finally {
    if (conn) {
      await conn.close(); // Always close the database connection
    }
  }
}

async function checkLogin(username,password) {
  const query = `SELECT USERID FROM MOVIEUSER
WHERE USERNAME = :username AND password = :password`;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, {username,password});
    return result.rows;
  } finally {
    if (connection) {
      await connection.close();
    }
  } 
}
async function checkLogin(username,password) {
  const query = `SELECT USERID FROM MOVIEUSER
WHERE USERNAME = :username AND password = :password`;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, {username,password});
    return result.rows;
  } finally {
    if (connection) {
      await connection.close();
    }
  } 
}
async function getUserInfo(userID) {
  const query = `SELECT * FROM MOVIEUSER
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
  


module.exports = {
  checkLogin,
  getUserInfo,
  addNewUser
};
