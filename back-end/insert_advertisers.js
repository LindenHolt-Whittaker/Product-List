const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// import advertisers.txt file and convert to an array.
const fs = require('fs');
const ad_path = '../products.tar/advertisers.txt';
const ad_text = fs.readFileSync(ad_path).toString('utf-8');
const ads_arr = ad_text.replace(/'/g, '').replace('\n', '').split(", ");

db.run('CREATE TABLE IF NOT EXISTS advertisers(advertiser text VARCHAR NOT NULL UNIQUE)', function(err) {
    if (err) {
        return console.error(err.message);
    }
    insertAdvertisers();
    console.log(`Advertisors table created.`);
});

function insertAdvertisers() {
    let placeholders = ads_arr.map((ads_arr) => '(?)').join(',');
    let sql = `INSERT INTO advertisers(advertiser) VALUES ${placeholders}`;
     
    db.run(sql, ads_arr, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`${this.changes} advitiser rows inserted`);
    });
}

// close the database
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
