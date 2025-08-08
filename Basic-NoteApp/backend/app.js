const express = require("express");
const { Client } = require("pg");
const app = express();
const cors=require("cors")

app.use(express.json()); // middleware
app.use (cors())
app.post("/add", async function (req, res) {
  const note = req.body;

  const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_Syt2qOnCrlb8@ep-weathered-term-adgmkr8s-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  });

  await client.connect();

  const addNoteQuery = "insert into notes(id, title, content) values ($1, $2, $3)";
  const values = [note.id, note.title, note.content];

  await client.query(addNoteQuery, values);

  return res.json({
    msg: "note added"
  });
});

app.get("/notes", async function (req, res) {
  try {
      const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_Syt2qOnCrlb8@ep-weathered-term-adgmkr8s-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  });

  await client.connect();

  const selectQuery = "select * from notes";
  const response = await client.query(selectQuery);

  return res.json({
    data: response.rows
  });
    
  } catch (error) {
    return res.json({
      msg:"internal server error"
    })
    
  }

});

app.listen(3100, function () {
  console.log("app sahi kam kar rahi ha");
});
