# Web Crawler

A Node.js web crawler that extracts business information from websites and saves it to a CSV file.

## Usage

1. Edit the `urls` array in `crawler.js` to add the websites you want to scrape
2. Run the crawler:
   ```bash
   npm start
   ```
3. Results will be saved to `results.csv`

## Customization

Modify the CSS selectors in the `scrapeWebsite` function to match the HTML structure of your target websites.

## Note

Ensure you have permission to scrape the target websites and respect their robots.txt files.