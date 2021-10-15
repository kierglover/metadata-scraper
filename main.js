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
  
  ;(async () => {
    const { body: html, url } = await got(targetUrl)
    const metadata = await metascraper({ html, url })
    console.log(metadata)
  })()


  //Create CSV
  const csvWriter = createCsvWriter({
      path: '/Users/imac/Developer/metadata-scraper/output/output.csv',
      header: [
          {id: 'name', title: 'NAME'},
          {id: 'lang', title: 'LANGUAGE'}
      ]
  });
   
  const records = [
      {name: 'Bob',  lang: 'French, English'},
      {name: 'Mary', lang: 'English'}
  ];
   
  csvWriter.writeRecords(records)       // returns a promise
      .then(() => {
          console.log('...Done');
      });
   
  // This will produce a file path/to/file.csv with following contents:
  //
  //   NAME,LANGUAGE
  //   Bob,"French, English"
  //   Mary,English