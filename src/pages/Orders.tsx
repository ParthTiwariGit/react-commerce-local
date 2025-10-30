import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: any[];
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem(`orders_${user.id}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [user, navigate]);

  if (!user) return null;

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <Package className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">No Orders Yet</h1>
            <p className="text-muted-foreground">Start shopping to see your orders here!</p>
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
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <Badge variant="secondary">{order.status}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
