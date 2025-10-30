import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground">Save your favorite items here!</p>
            <Button onClick={() => navigate('/shop')} className="bg-gradient-primary">
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlist.length} items</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">{item.category}</p>
                    <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                    <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>

                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => handleMoveToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Move to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
