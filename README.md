# tictactoe.fun

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).




-----

Multiplayer Thoughts

- Give each player a unique id/ask for display name (save both to local storage)
- Ask if user wants to invite someone else to play
  - Associate the unique id given to a player with the remote game
- Generate link with unique game id
  - create node in firebase with unique game id
- Provide a new game button and allow players to swap who is X
- Save game in local storage so it can be resumed later (multiple games with multiple users and can still play against computer)

Firebase:
serialize the game state to json


alternate plan:

- user indicates they want to play online
  - create a room 
  - create a sharable link to the room
  - only allow 2 users in a room
  - destroy rooms after X-days

