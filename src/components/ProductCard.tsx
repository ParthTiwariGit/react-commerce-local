import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-all duration-300"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-all",
              inWishlist && "text-accent"
            )}
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
          </Button>

          <Button
            variant="default"
            size="sm"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>

          <h3 className="font-semibold line-clamp-1 text-sm">{product.name}</h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {!product.inStock && (
            <Badge variant="secondary" className="mt-2">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
