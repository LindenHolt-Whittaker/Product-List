const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    var newDate = new Date().toLocaleString();    
    console.log('Connected to the database.', newDate);
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
        // Append an ID value and check for valid amount of values.
        let parameters = line.split(',').filter(Boolean);
        parameters.unshift(i);
        if (parameters.length === 4) {
            collection.push(`('${parameters.join("','")}')`);
        } else {
            console.log(`Invalid values: ${parameters}`);
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
    
    // As the FileReader reads asynchronously,
    // we can't just return the result; instead,
    // we're passing it to a callback function
    return result;
}


// import products.csv file and convert to an array.
const fs = require('fs');
const product_path = '../products.tar/products.csv';
const product_text = fs.readFileSync(product_path).toString('utf-8');
let products_data = parseCSV(product_text);

const create_table = [
    'CREATE TABLE IF NOT EXISTS ',
    'products(',
        'product_id INTEGER PRIMARY KEY, ',//UNIQUE
        'product_name VARCHAR NOT NULL, ',//UNIQUE
        'sku VARCHAR NOT NULL, ',//UNIQUE
        'advertiser VARCHAR NOT NULL',//, ',
        //'CONSTRAINT product_name_unique UNIQUE (product_id, product_name, sku)',
    ')'
].join('');

db.run(create_table, function(err) {
    if (err) {
        return console.error(err.message);
    }
    insertProducts(products_data);
    console.log(`Product table created.`);
});

function insertProducts(products_parameters) {
    let sql = `INSERT INTO products VALUES ${products_parameters}`;

    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`${this.changes} product rows inserted`);
    });
}

// close the database
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    var newDate = new Date().toLocaleString();
    console.log('Close the database connection.', newDate);
});
