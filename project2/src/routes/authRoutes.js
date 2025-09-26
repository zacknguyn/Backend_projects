import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// REGISTER a new user endpoint /auth/register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // ENCRYPTS password for security, DECRYPTS when GETS password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // SAVES the new user and hashedPassword to the db
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);

    // ADD first user's todo
    const defaultTodo = `Hello :) Add your first todo!`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // CREATE a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  // GETS email and RECEIVES encrypted password => needs to decrypt the password
  const { username, password } = req.body;

  try {
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);
    if (!user) return res.status(404).send({ message: "User not found" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    console.log("Login's password: ", password);
    console.log(user);

    // IF AUTH SUCCESSFUL
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
