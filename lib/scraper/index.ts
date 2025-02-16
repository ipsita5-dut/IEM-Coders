"use server"

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return null;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $('#productTitle').text().trim() || 'Unknown Product';
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol')) || '$';
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '') || '0';

    const description = extractDescription($) || 'No description available';

    // Calculate price details
    const current = Number(currentPrice) || Number(originalPrice) || 0;
    const original = Number(originalPrice) || Number(currentPrice) || 0;
    const lowestPrice = Math.min(current, original);
    const highestPrice = Math.max(current, original);
    const averagePrice = (lowestPrice + highestPrice) / 2;

    // Construct data object with scraped information
    return {
      url,
      currency,
      image: imageUrls[0] || '',
      title,
      currentPrice: current,
      originalPrice: original,
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice,
      highestPrice,
      averagePrice,
      priceTallyChart: { drops: 0, ups: 0 }

    };
  } catch (error) {
    console.error('Amazon Scraper Error:', error);
    return null;
  }
}

// In your scraper file
export async function searchFlipkartProduct(query: string) {
  try {
    const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    
    const products: any[] = [];
    
    $('div._1AtVbE').each((_, element) => {
      const title = $(element).find('a.s1Q9rs').text().trim();
      const currentPrice = extractPrice($(element).find('div._30jeq3'), $(element).find('div._3I9_wc')) || '0';
      const originalPrice = extractPrice($(element).find('div._3I9_wc'), $(element).find('div._30jeq3')) || '0';
      const image = $(element).find('img._396cs4').attr('src') || '';
      
      if (title && currentPrice) {
        products.push({
          title,
          currentPrice: Number(currentPrice),
          originalPrice: Number(originalPrice),
          image,
        });
      }
    });

    return products;
  } catch (error) {
    console.error("Flipkart Scraper Error:", error);
    return [];
  }
}
