Light and Wonder Frontend Test Raphael Bier

### `npm install`

Install the dependencies.

### `npm start`

Runs the app in the development mode, It will open a new window in your default browser accessible here : "http://localhost:3000".

# Developer Comments :

This was an exciting opportunity to learn about Pixi.JS, which I found great to add more feature onto the basic Canvas element.

If I were to expand further on that project, I would probably start by adding an auto play functionnality, and create a Websocket server to feed the results to the frontend application instead of getting the results from a json file.

A payment provider such as Stripe could also be a nice next step for that kind of project.

Adding more onto that project, Having a few more assets could have helped expanding a bit on the design.

I made some assumptions about the winner sequence. Here is the way I interpreted the winner sequence format :

"36:113425268@BGS:nickname:0.20:2147483647:1:1@1:EUR:2"

"36" Would be the ID of the Game played
"113425268@BGS" Would be the user ID
"nickname" Would be the user nickname
"0.20" Would be the amount remaining on the user account
"2147483647" Would be the ID of this particular roll
"1" Would be the amount the user spent on the roll
"1@1" Would be the way of matching the pot (So in this case for 1 Euro spent by the user, We would match it in the pot)
"EUR" Would be the currency
"2" Would be the total amount of the pot (And in this case the amount won by the user).
