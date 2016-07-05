var request = require('request');
var cheerio = require('cheerio');
var csvWriter = require('csv-write-stream');
const fs = require('fs');

const TESTURL= 'http://substack.net/images/';
var url = 'http://substack.net';

var writer = csvWriter({headers: ['FilePermission', 'AbsoluteURL', 'FileType']});
writer.pipe(fs.createWriteStream('scraped_files.csv'));

request(TESTURL, function(error, response, body) {   //required: file permission, absolute url, file type
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    var files = [];
    $('tr').each(function(i, elem) {

      var fileExt = $(elem).find('a').text().split('.')[1];
      var filePerm = $(elem).find('code').first().text(); 
      var absUrl =  url + $(elem).find('a').attr('href');

      if (fileExt) {
        files[i] = {
          filepermission: filePerm, 
          absoluteurl: absUrl,  
          filetype: fileExt 
        }
      }

      for (var counter = 0; counter < files.length; counter++) {
        if (files[counter]) {
        // console.log(files[counter].filepermission, files[counter].absoluteurl, files[counter].filetype);
        writer.write(
          [files[counter].filepermission, files[counter].absoluteurl, files[counter].filetype]
        ); 
        }
      }
//        writer.end();
    });

  }
});

// module.exports = getHTML;


