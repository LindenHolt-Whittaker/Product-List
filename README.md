## Full-stack Developer Assignment

This assignment is seperated into two folders: 'front-end' and 'back-end'.

**Back-end**

Navigate to the back-end folder (`cd back-end`) and run `npm run get-seed` to run the script that downloads and extracts the contents of products.tar.gz.

Run `npm run seed` to seed two tables in a database with the data from `products.csv` and `advertisers`. The database will be created in `./back-end/db/` if it does not already exist.

Run `npm run server` to connect to the database and listen on port :5000. If a client connects to this port with a `get` request to `'/api/products'` then a queried response that joins the product and advertisers table (by advertiser_id) will be returned to the client.

**Front-end**

Navigate to the front-end folder (`cd front-end`) and run `npm run start` to start the application on [`http://localhost:3000/`](http://localhost:3000/).

The 'arrows' rendered in the top right send requests to the server for different ranges of product data.

To run the front-end tests, run `npm run test`.


**Comments**

I used Node.js and sqlite for the server and database. I enjoyed being able to use javascript in a back-end context, although I would be interested in learning a server side language like Python/PHP/Go. I used sqlite as I found it to be the best solution, due to it being lightweight and self-contained.

I used `create-react-app` as a bootstrap for the front-end. The tests run with Jest and Enzyme. `node-sass-chokidar` is being used to convert .scss files to .css.


I have learned a lot during the development of this assignment, nevertheless there are many things I would like to improve.

Namely, I would've liked to have put more work into the front-end, especially the styling. Perhaps added functionality, like chosing columns to order by, choosing amount of items displayed on the page, and a search/filter option. I would have liked to improve the front-end tests to cover more of the functionality of the code.

For the back-end, I would have liked to add a layer of abstraction for the sql to seperate it from the server side logic code, and use just sql to parse the csv instead of javascript. I would have also liked to develop tests for the Node.js files.
