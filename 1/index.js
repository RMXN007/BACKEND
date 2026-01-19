console.log("HELLO FROM BACKEND");

const express = require('express')
const app = express()
const port = 4000

const gitData={
  "login": "RMXN007",
  "id": 205825249,
  "node_id": "U_kgDODESk4Q",
  "avatar_url": "https://avatars.githubusercontent.com/u/205825249?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/RMXN007",
  "html_url": "https://github.com/RMXN007",
  "followers_url": "https://api.github.com/users/RMXN007/followers",
  "following_url": "https://api.github.com/users/RMXN007/following{/other_user}",
  "gists_url": "https://api.github.com/users/RMXN007/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/RMXN007/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/RMXN007/subscriptions",
  "organizations_url": "https://api.github.com/users/RMXN007/orgs",
  "repos_url": "https://api.github.com/users/RMXN007/repos",
  "events_url": "https://api.github.com/users/RMXN007/events{/privacy}",
  "received_events_url": "https://api.github.com/users/RMXN007/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Raman pawar",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": ".",
  "twitter_username": null,
  "public_repos": 7,
  "public_gists": 0,
  "followers": 0,
  "following": 2,
  "created_at": "2025-04-01T18:30:33Z",
  "updated_at": "2025-12-29T17:09:59Z"
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/youtube',(req,res)=>{
    res.send("Namaste ji")
})

app.get("/github",(req,res)=>{
    res.json(gitData);
})

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`)
})