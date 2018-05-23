const fs = require('fs');
const request = require('request');
const targz = require('targz');

const seed_url = 'https://s3.amazonaws.com/rm-rant-interviewing/products.tar.gz';
const compressed_path = './seed/data/products.tar.gz';
const decompressed_path = './seed/data/products.tar';

request(seed_url, (error, response, body) => {
    if (error) { console.log('error:', error); }
    if (response.statusCode === 200) { console.log('Downloaded products.tar.gz'); }

    targz.decompress({
        src: compressed_path,
        dest: decompressed_path
    }, (error) => {
        if (error) { console.log('error:', error); }
        else { console.log("Decompressed products.tar.gz"); }
    });
}).pipe(fs.createWriteStream(compressed_path));
