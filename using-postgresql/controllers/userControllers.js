const db = require('../db/queries')

async function getUsernames(req, res) {
  try {
    const usernames = await db.getAllUsernames()
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
      </head>
      <body>
        <h1>Usernames:</h1>
        <ul>
          ${usernames.map((user) => `<li>${user.username}</li>`).join('')}
        </ul>
        <a href="/new">Add new username</a>
      </body>
      </html>
    `)
  } catch (error) {
    res.status(500).send('Server error')
  }
}

async function createUsernameGet(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New</title>
    </head>
    <body>
      <form action="/new" method="post">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />
        <button type="submit">Add</button>
      </form>
    </body>
    </html>
  `)
}

async function createUsernamePost(req, res) {
  try {
    const { username } = req.body
    await db.insertUsername(username)
    res.redirect('/')
  } catch (error) {
    res.status(500).send('Server error')
  }
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
}
