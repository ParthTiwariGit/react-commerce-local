import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    toast.success('Profile updated successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="loyalty">
              <Gift className="h-4 w-4 mr-2" />
              Loyalty Points
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-gradient-primary">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Points</CardTitle>
                <CardDescription>
                  Earn points with every purchase and unlock rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary">
                    <Gift className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {user.loyaltyPoints}
                    </p>
                    <p className="text-muted-foreground">Total Points</p>
                  </div>
                  <div className="pt-6 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      • Earn 10 points for every dollar spent
                    </p>
                    <p className="text-sm text-muted-foreground">
                      • Redeem points for exclusive discounts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      • Get bonus points on special occasions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
