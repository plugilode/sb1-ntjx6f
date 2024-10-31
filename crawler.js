import axios from 'axios';
import cheerio from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';

const urls = [
  // Add your URLs here
  'https://example.com/business1',
  'https://example.com/business2'
];

const csvWriter = createObjectCsvWriter({
  path: 'results.csv',
  header: [
    { id: 'companyName', title: 'Company Name' },
    { id: 'address', title: 'Address' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Phone' },
    { id: 'url', title: 'URL' },
    { id: 'category', title: 'Category' }
  ]
});

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // These selectors need to be adjusted based on the actual websites' HTML structure
    const data = {
      companyName: $('h1').first().text().trim(),
      address: $('[itemprop="address"]').text().trim(),
      email: $('a[href^="mailto:"]').text().trim() || $('a[href^="mailto:"]').attr('href')?.replace('mailto:', ''),
      phone: $('[itemprop="telephone"]').text().trim(),
      url: url,
      category: $('[itemprop="category"]').text().trim()
    };

    return data;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

async function main() {
  const results = [];
  
  for (const url of urls) {
    console.log(`Scraping: ${url}`);
    const data = await scrapeWebsite(url);
    if (data) {
      results.push(data);
    }
    // Add a delay to be respectful to the servers
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await csvWriter.writeRecords(results);
  console.log('Scraping completed! Results saved to results.csv');
}

main().catch(console.error);