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
    selectedData.push(metadata.author, metadata.description, metadata.title, metadata.publisher, metadata.url);
    console.log(selectedData);

  //Create CSV
    const csvWriter = createCsvWriter({
        path: '/Users/imac/Developer/metadata-scraper/output/output.csv',
        header: [
            {id: 'author', title: 'AUTHOR'},
            {id: 'date', title: 'DATE'},
            {id: 'description', title: 'DESCRIPTION'},
            //TODO - Return image as a file
            //TODO - Return logo as a file
            //TDODO - What's clearbit?
            {id: 'title', title: "TITLE"},
            {id: 'publisher', title: "PUBLISHER"},
            {id: 'url', title: "URL"}
        ]
    });
 
    const records = [
        {
            author: (selectedData[0]), description: (selectedData[1]), title: (selectedData[2]), publisher: (selectedData[3]), url: (selectedData[4])
        }
    ];
 
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('Wrote csv');
        });

     })()

  //TODO - Push metadata to csv