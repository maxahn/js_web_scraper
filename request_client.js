var request = require('request');
var cheerio = require('cheerio');
const TESTURL= 'http://substack.net/images/';
var url = 'http://substack.net';


request(TESTURL, function(error, response, body) {   //required: file permission, absolute url, file type
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    var files = [];
    $('tr').each(function(i, elem) {
      // console.log($(elem).find('code').first().text() + ' ' + $(elem).find('a').text() + ' ' + $(elem).find('a').attr('href'));
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
      console.log(files[i]);
    });
  }
});

// module.exports = getHTML;


