const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-logo')(),
    require('metascraper-clearbit')({}),
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
    selectedData.push(metadata.author, metadata.date, metadata.description, metadata.image, metadata.title, metadata.publisher, metadata.url);
    console.log(selectedData);

  //Create CSV
    const csvWriter = createCsvWriter({
        path: './output/output.csv',
        header: [
            {id: 'author', title: 'AUTHOR'},
            {id: 'date', title: 'DATE'},
            {id: 'description', title: 'DESCRIPTION'},
            {id: 'image', title: 'IMAGE URL'},
            //TODO - Return logo as a file
            //TDODO - What's clearbit?
            {id: 'title', title: "TITLE"},
            {id: 'publisher', title: "PUBLISHER"},
            {id: 'url', title: "URL"}
        ]
    });
 
    const records = [
        {
            author: (selectedData[0]), date: (selectedData[1]), description: (selectedData[2]), image:(selectedData[3]), title:(selectedData[4]), publisher:(selectedData[5]), url:(selectedData[6])
        }
    ];
 
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('Wrote csv');
        });

     })()

  //TODO - Push metadata to csv