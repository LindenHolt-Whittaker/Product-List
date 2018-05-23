const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

fs.writeFile('./db/data.db', '', function(err) {
    if(err) {
        console.log(err);
    }
    console.log("The file was saved!");
});

// open the database
let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.error(err.message); }
    var newDate = new Date().toLocaleString();    
    console.log('Connected to the database.', newDate);
});

const create_advertisers_table = [
    'CREATE TABLE IF NOT EXISTS ',
    'advertisers(',
        'advertiser_id INTEGER PRIMARY KEY UNIQUE, ',
        'advertiser text VARCHAR NOT NULL UNIQUE',
    ')'
].join('');

// import advertisers.txt file and convert to an array.
const ad_text = fs.readFileSync('./seed/data/products.tar/advertisers.txt').toString('utf-8');
const ads_arr = ad_text.replace(/'/g, '').replace('\n', '').split(", ");
const ads_data = ads_arr.map((ad, i) => `('${i + 1}', '${ad}')`).join(',');

const insert_advertisers_data = `INSERT INTO advertisers VALUES ${ads_data}`;

const create_products_table = [
    'CREATE TABLE IF NOT EXISTS ',
    'products(',
        'product_id INTEGER PRIMARY KEY UNIQUE, ',
        'product_name VARCHAR NOT NULL, ',
        'product_sku VARCHAR NOT NULL UNIQUE, ',
        'advertiser_id INTEGER NOT NULL',
    ')'
].join('');

// import products.csv file and convert to an array.
const product_text = fs.readFileSync('./seed/data/products.tar/products.csv').toString('utf-8');
const products_data = parseCSV(product_text);

const insert_products_data = `INSERT INTO products VALUES ${products_data}`;

db.serialize(() => {
    // Delete advertisers
    db.run('DROP TABLE IF EXISTS advertisers', function(err) {
        if (err) { return console.error(err.message); }
        console.log(`advertisers table deleted.`);
    // Create advertisers
    }).run(create_advertisers_table, function(err) {
        if (err) { return console.error(err.message); }
        console.log(`advertisers table created.`);
    // Insert advertisers data
    }).run(insert_advertisers_data, function(err) {
        if (err) { return console.error(err.message); }
        console.log(`${this.changes} advitiser rows inserted`);
    // Create products
    }).run(create_products_table, function(err) {
        if (err) { return console.error(err.message); }
        console.log(`product table created.`);
    // Insert products data
    }).run(insert_products_data, function(err) {
        if (err) { return console.error(err.message); }
        console.log(`${this.changes} product rows inserted`);
    // Delete unique_products
    }).run('DROP TABLE IF EXISTS unique_products', function(err) {
        if (err) { return console.error(err.message); }
        console.log(`unique_products table deleted.`);
    // Create unique_products
    }).run('CREATE TABLE unique_products AS SELECT * FROM products GROUP BY product_name', function(err) {
        if (err) { return console.error(err.message); }
        console.log(`unique_products table created.`);
    // Delete products
    }).run('DROP TABLE IF EXISTS products', function(err) {
        if (err) { return console.error(err.message); }
        console.log(`product table deleted.`);
    // Close database connection
    }).close((err) => {
        if (err) { console.error(err.message); }
        var newDate = new Date().toLocaleString();
        console.log('Close the database connection.', newDate);
    });
});

// Takes the provided products.csv file and returns a string with the format:
// (id1, val1_a, val1_b, val1_c), (id2, val2_a, val2_b, val2_c), (id3, val3_a, val3_b, val3_c)
function parseCSV(text, delimiter, callback) {
    // Split the result to an array of lines
    var lines = text.split('\n');
    
    let collection = [];
    var result = '';
    var batch_size = 1;
    lines.forEach((line, i) => {
        if(i === 0) {
            console.log('Start parseCSV()');
            return;
        }

        // Split the lines by comma and filter empty values.
        // Append an ID value and check for valid amount of values,
        // as well as a valid advertiser (in ads_arr).
        let parameters = line.split(',').filter(Boolean);
        parameters.unshift(i);
        if (parameters.length === 4 &&
        ads_arr.indexOf(parameters[3]) > -1) {
            parameters[3] = ads_arr.indexOf(parameters[3]) + 1;
            collection.push(`('${parameters.join("','")}')`);
        }

        // if (i % batch_size === 0) {
        //     result.push(collection.join(","));
        //     collection = [];
        // }
        if (i === lines.length - 1) {
            result = collection.join(",");
            console.log('Complete parseCSV()');
        }
    });

    return result;
}
