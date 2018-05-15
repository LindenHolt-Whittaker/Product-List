## Full-stack Developer Assignment
**Frontend**

Create a single page application with either React, Angular/JS, Backbone, or Vue. The application will primarily consist of at least one custom built component. The component then renders the list as a table. Populate the table with the results of the API endpoint described below.

**Backend**

Using any server side language and any MVC framework/architecture, create a new backend service with two resources: products and their corresponding advertisers.
Using any relational database, you will setup a schema that includes the following attributes:

- Product name
- Product SKU
- associated advertiser id
- Advertiser name

The ID, name and SKU should be unique for each product. We have created a seed file for you to download, process and insert into your database via a script of your own creation. The file lives at https://s3.amazonaws.com/rm-rant-interviewing/products.tar.gz and should not be included in the repo. Your script will be submitted as part of the assignment and will be run by us to validate the homework. Also as part of this, we'd like you to describe an efficient approach to inserting the file. How would this approach scale?

**Tests**

Include them :)