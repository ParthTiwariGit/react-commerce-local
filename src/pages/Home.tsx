import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import productsData from '@/data/products.json';
import heroBanner from '@/assets/hero-banner.jpg';

const categories = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400' },
];

const Home = () => {
  const navigate = useNavigate();
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get trending products (sorted by rating)
    const trending = [...productsData]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
    setTrendingProducts(trending);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Style Today
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Shop the latest trends in fashion, electronics, and home essentials. 
              Quality products at unbeatable prices.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary"
                onClick={() => navigate('/shop')}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/shop')}
              >
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our diverse collection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => navigate(`/shop?category=${category.name}`)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end justify-center pb-6">
                  <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Now</h2>
              <p className="text-muted-foreground">Most popular products this week</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/shop')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-lg">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure transactions</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">↩️</span>
              </div>
              <h3 className="font-semibold text-lg">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
