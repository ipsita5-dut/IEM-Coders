import Modal from "@/components/Modal";
import PriceinfoCard from "@/components/PriceinfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect('/');

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container p-6">
      <div className="flex gap-10 xl:flex-row flex-col">
        <div className="product-image flex-shrink-0">
          <Image 
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl text-secondary font-semibold">
                {product.title}
              </h1>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-blue-600 hover:underline"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Image 
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />
                <p className="text-base font-semibold text-[#D46F77] ml-1">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-gray-200 rounded-full">
                <Image 
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-gray-200 rounded-full">
                <Image 
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="product-info mb-6">
            <div className="flex flex-col gap-2">
              <p className="text-3xl text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-lg text-gray-500 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <p className="text-sm text-gray-600">
                <span className="text-primary-green font-semibold">93% </span>
                of buyers have recommended this.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceinfoCard 
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />
              <PriceinfoCard 
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />
              <PriceinfoCard 
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceinfoCard 
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
            </div>
          </div>

          <Modal productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-16 mt-10">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>

          <div className="product-description bg-gray-100 p-4 rounded-md shadow-md">
            <p className="text-gray-700 leading-relaxed mb-2">
              Fabric: <span className="font-semibold">100% Cotton</span>
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Washcare: <span className="font-semibold">Cold machine wash with similar colors, do not bleach, tumble dry, warm iron.</span>
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Style: <span className="font-semibold">Regular</span> | Pattern: <span className="font-semibold">Solid</span> | Fit: <span className="font-semibold">Relaxed</span> | Length: <span className="font-semibold">Regular</span> | Sleeve: <span className="font-semibold">Full-Sleeve</span> | Neck: <span className="font-semibold">Round Neck</span> | Knit/Woven: <span className="font-semibold">Knit</span> | Lining: <span className="font-semibold">No Lining</span>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Occasion: <span className="font-semibold">Casual wear, day wear, daily wear.</span>
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              The model is <span className="font-semibold">5'9"</span> and she is wearing size <span className="font-semibold">S</span>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              There might be slight color variation between the actual product and image shown on the screen due to photoshoot lighting.
            </p>
            <h4 className="text-lg font-semibold mt-4">Product Dimensions</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              <span className="font-semibold">22 x 19 x 0.8 cm; 260 g</span>
            </p>
            <h4 className="text-lg font-semibold">Date First Available</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              <span className="font-semibold">27 November 2019</span>
            </p>
            <h4 className="text-lg font-semibold">Manufacturer</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              <span className="font-semibold">Miss Chase</span>
            </p>
            <h4 className="text-lg font-semibold">Country of Origin</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              <span className="font-semibold">India</span>
            </p>
            <h4 className="text-lg font-semibold">Item Weight</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              <span className="font-semibold">260 g</span>
            </p>
            <h4 className="text-lg font-semibold">Included Components</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              <span className="font-semibold">1 Sweatshirt</span>
            </p>
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px] bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition">
          <Image 
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
          />
          <Link href="/" className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text text-2xl font-semibold">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;