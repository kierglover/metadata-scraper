const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-logo')(),
    require('metascraper-clearbit')(),
    require('metascraper-publisher')(),
    require('metascraper-title')(),
    require('metascraper-url')()
  ])

  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  
  const got = require('got')
  
  const targetUrl = 'https://arimagenomics.com/'

//ARRAY FOR STORING METADATA
  var selectedData = [];

  ;(async () => {
    const { body: html, url } = await got(targetUrl)
    const metadata = await metascraper({ html, url })
    // console.log(metadata);
    selectedData.push(metadata.author);
    console.log(selectedData);

  //Create CSV
    const csvWriter = createCsvWriter({
        path: '/Users/imac/Developer/metadata-scraper/output/output.csv',
        header: [
            {id: 'author', title: 'AUTHOR'}
        ]
    });
 
    const records = [
        {author: (selectedData[0])}
    ];
 
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('Wrote csv');
        });

     })()

  //TODO - Push metadata to csv