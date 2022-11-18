const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "wizgarden",
  password: "example",
  port: 5432,
});

const getScienceLessons = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM science_lessons;");
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all science lessons" });
  }
};

const getMathLessons = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM math_lessons;");
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all math lessons" });
  }
};

const getChineseLessons = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM chinese_lessons;");
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all chinese lessons" });
  }
};

const getEnglishLessons = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM english_lessons;");
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all english lessons" });
  }
};

const signUp = async (req, res) => {
  // username, userpassword, userlevel
  console.log(req.body.username);
  let userN = req.body.username.toLowerCase();
  console.log(userN);
  try {
    const usernameExists = await pool.query(
      `SELECT username FROM user_accounts WHERE username = '${userN}';`
    );

    if (usernameExists.rowCount) {
      res.json({ status: "error", message: "username taken" });
    } else {
      const password = await bcrypt.hash(req.body.password, 12);

      await pool.query(
        `INSERT INTO user_accounts(username,firstname,lastname, userpassword, userlevel)
        VALUES ('${userN}','${req.body.firstname}','${req.body.lastname}', '${password}',2);`
      );
      await pool.query(
        `INSERT INTO users_details(         
          emailladdress, parentsname,password, mobilenumber, childsname, childslevel,interestedsubjects)
          VALUES (            
            '${userN}', '', '', '', '', '', '' );`
      );

      res.json({
        status: "ok",
        message: `user ${userN} created successfully`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create ${userN} user account`,
    });
  }
};

const deleteUser = async (req, res) => {
  // username, userpassword, userlevel

  try {
    await pool.query(
      `delete FROM user_accounts WHERE username = '${req.body.username}';`
    );

    await pool.query(
      `delete FROM users_details WHERE emailladdress = '${req.body.username}';`
    );

    res.json({
      status: "ok",
      message: `user ${req.body.username} deleted successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create ${req.body.username} user account`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body.username);

    const usernameFound = await pool.query(
      `SELECT username FROM user_accounts
      WHERE username = '${req.body.username}';`
    );

    if (usernameFound.rowCount !== 0) {
      const passwordFound = await pool.query(
        `SELECT * FROM user_accounts WHERE username = '${req.body.username}';`
      );
      //console.log(passwordFound);

      const passwordInDatabase = passwordFound.rows[0].userpassword;

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        passwordInDatabase
      );

      if (passwordMatch) {
        res.json({
          status: "ok",
          message: `user ${req.body.username} login successful`,
          userdata: {
            user: req.body.username,
            level: passwordFound.rows[0].userlevel,
            firstname: passwordFound.rows[0].firstname,
          },
        });
      } else {
        res.json({ status: "error", message: "invalid username or password" });
      }
    } else {
      res.json({ status: "error", message: "invalid username or password" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `user ${req.body.username} failed to login`,
    });
  }
};

const createDetailsUser = async (req, res) => {
  try {
    // after user creates account, will be re-directed to fill in their details
    // find the user account's user_id based on its username from users_accounts table => set user_id found to userID
    const getUserID = await pool.query(
      `SELECT user_id FROM users_accounts
      WHERE username = '${req.body.username}';`
    );
    // console.log(userID.rows[0].user_id);
    const userID = getUserID.rows[0].user_id;

    // create a new row inside user_details table
    // where users_details.user_id = users_accounts.user_id = userID found above
    await pool.query(
      `INSERT INTO users_details(
        user_id,
        emailAddress,
        parentsName,
        mobileNumber,
        childsName,
        childsLevel,
        interestedSubjects
        )
        VALUES (
          '${userID}',
          '${req.body.emailAddress}',
          '${req.body.parentsName}',
          '${req.body.mobileNumber}',
          '${req.body.childsName}',
          '${req.body.childsLevel}',
          '${req.body.interestedSubjects}'
        );`
    );

    res.json({
      status: "ok",
      message: `new user detail for user ${req.body.username} created successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to create new user details for user ${req.body.username}`,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const getUserID = await pool.query(
      `SELECT user_id FROM users_accounts
      WHERE username = '${req.body.username}';`
    );

    const userID = getUserID.rows[0].user_id;

    const userDetails = await pool.query(
      `SELECT emailAddress, parentsName, mobileNumber,childsName, childsLevel, interestedSubjects FROM users_details
      WHERE user_id = '${userID}';`
    );

    res.json(userDetails.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to get all user details for user ${req.body.username}`,
    });
  }
};

const updateDetailsUser = async (req, res) => {
  try {
    await pool.query(
      `update user_accounts
      set
      firstname='${req.body.firstname}',
      lastname='${req.body.lastname}'
      WHERE username = '${req.body.username}';`
    );

    await pool.query(
      `UPDATE users_details
      SET
        mobileNumber = '${req.body.mobileNumber}',
        childsName = '${req.body.childsName}',
        childsLevel = '${req.body.childsLevel}',
        interestedSubjects = '${req.body.interestedSubjects}'
      WHERE emailladdress = '${req.body.username}';`
    );

    res.json({
      status: "ok",
      message: `updated user detail for user ${req.body.username} successfully`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to update user details for user ${req.body.username}`,
    });
  }
};

const getAllUsersAccounts = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users_accounts;");
    res.json(data.rows);
    console.log(data.rows); // to access the table data only from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users accounts" });
  }
};

// ============ Edit User Account Login Details by Admin ==================== //
const updateUserAccount = async (req, res) => {
  try {
    // on frontend, Admin fills up a form => form provides req.body = {user_id, newUsername, newPassword} to backend

    // check to see if newUsername already taken to prevent duplicates
    const usernameExists = await pool.query(
      `SELECT username FROM users_accounts
      WHERE username = '${req.body.newUsername}';`
    );
    // console.log(usernameExists);

    if (usernameExists.rowCount) {
      // if newUsername already exists, dont update username and respond with error
      res.json({ status: "error", message: "new username taken" });
    } else {
      // if newUsername does not exist, proceed to update user account below:

      // update username
      await pool.query(
        `UPDATE users_accounts
        SET username = '${req.body.newUsername}'
        WHERE user_id = '${req.body.user_id}'`
      );

      // add in bcrypt to newPassword
      const password = await bcrypt.hash(req.body.newPassword, 12);

      // update password
      await pool.query(
        `UPDATE users_accounts
        SET password = '${password}'
        WHERE user_id = '${req.body.user_id}'`
      );

      res.json({
        status: "ok",
        message: `user ${req.body.user_id} with new username (${req.body.newUsername}) and new password updated successfully`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      status: "error",
      message: `failed to update user account ${req.body.user_id}`,
    });
  }
};

// ========================== Get All User Details ========================== //
const getAllUsersDetails = async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT ud.*,ua.firstname,ua.lastname FROM users_details ud join user_accounts ua on ua.username=ud.emailladdress where ua.userlevel=2;`
    );
    res.json(data.rows);
    // console.log(data.rows); // to access the table data only from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users details" });
  }
};

// ========================== Get  User Details ========================== //
const getUsersDetails = async (req, res) => {
  // console.log(req.body.userName)
  try {
    const data = await pool.query(
      `SELECT ud.*,ua.firstname,ua.lastname FROM users_details ud join user_accounts ua on ua.username=ud.emailladdress where ua.userlevel=2 and ua.username='${req.body.userName}'`
    );
    res.json(data.rows);
    // console.log(data.rows); // to access the table data only from response
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", message: "failed to GET all users details" });
  }
};

module.exports = {
  signUp,
  loginUser,
  createDetailsUser,
  getDetailsUser,
  updateDetailsUser,
  deleteUser,
  getUsersDetails,
  getAllUsersAccounts,
  updateUserAccount,
  getAllUsersDetails,
  getEnglishLessons,
  getChineseLessons,
  getMathLessons,
  getScienceLessons,
};
