// pages/products/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductById, getSimilarProducts } from '@/lib/actions';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { searchFlipkartProduct } from '@/lib/scraper';
import { scrapeAmazonProduct } from '@/lib/scraper';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [flipkartProducts, setFlipkartProducts] = useState<Product[]>([]);
  const [priceStats, setPriceStats] = useState<{ highest: number; lowest: number; average: number } | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
   
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    if (product) {
      setIsFavorite(favorites.some((fav: Product) => fav._id === product._id));
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id === 'string') {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);

        const fetchedSimilarProducts = await getSimilarProducts(id);
        if (fetchedSimilarProducts) {
          setSimilarProducts(fetchedSimilarProducts);
        }

        if (fetchedProduct.url.includes("amazon")) {
          const amazonProductData = await scrapeAmazonProduct(fetchedProduct.url);
          if (amazonProductData) {
            setProduct(amazonProductData);
            setPriceStats({
              highest: amazonProductData.highestPrice,
              lowest: amazonProductData.lowestPrice,
              average: amazonProductData.averagePrice,
            });
          }
        }

        // Search for the product on Flipkart
        const flipkartProductsData = await searchFlipkartProduct(fetchedProduct.title);
        if (flipkartProductsData && flipkartProductsData.length > 0) {
          setFlipkartProducts(flipkartProductsData);
        }
      }
    };

    fetchProduct();
  }, [id]);
  

  const toggleFavorite = () => {
    if (product) {
      const savedFavorites = localStorage.getItem('favorites');
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      if (isFavorite) {
        // Remove from favorites
        const updatedFavorites = favorites.filter((fav: Product) => fav._id !== product._id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Add to favorites
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      setIsFavorite(!isFavorite);
    }
  };
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="mb-4" />
      <button onClick={toggleFavorite} className={`btn ${isFavorite ? 'bg-red-500' : 'bg-gray-500'}`}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <div className="product-info mb-4">
        <p className="text-lg font-semibold">
          Current Price: <span className="text-green-600">{product.currency}{product.currentPrice}</span>
        </p>
        <p className="text-lg line-through text-gray-500">
          Original Price: {product.currency}{product.originalPrice}
        </p>
        <p className="text-lg text-red-500">Discount Rate: {product.discountRate}%</p>
      </div>

      {priceStats && (
        <div className="price-stats mb-4">
          <h2 className="text-2xl font-semibold">Price Analysis</h2>
          <p>Highest Price: {product.currency}{priceStats.highest}</p>
          <p>Lowest Price: {product.currency}{priceStats.lowest}</p>
          <p>Average Price: {product.currency}{priceStats.average}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-2">Product Description</h2>
      <div className="product-description bg-gray-100 p-4 rounded-md shadow-md mb-4">
        <p className="text-gray-700">{product.description}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Similar Products</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {similarProducts.map((similarProduct) => (
          <ProductCard key={similarProduct._id} product={similarProduct} />
        ))}
      </div>

      {flipkartProducts.length > 0 && (
        <div className="flipkart-products mb-4">
          <h2 className="text-2xl font-semibold">Flipkart Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {flipkartProducts.map((flipkartProduct, index) => (
              <ProductCard key={index} product={flipkartProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default ProductDetails;
