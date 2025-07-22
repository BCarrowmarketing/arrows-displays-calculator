import { PricingCalculator } from '@/components/PricingCalculator';
import heroImage from '@/assets/arrows-displays-hero.jpg';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90 z-10"
        />
        <img 
          src={heroImage} 
          alt="Arrows Displays Digital Signage Network" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-6 py-20 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Southern Idaho's
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Digital Advertising Network
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in">
            Simple, affordable, and made for the community. Connect with local customers through our strategically placed digital displays.
          </p>
          <Button size="lg" variant="secondary" className="animate-bounce-in">
            Calculate Your Investment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-card transition-all duration-300 animate-fade-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
              <p className="text-muted-foreground">
                Reach Southern Idaho residents where they shop, dine, and gather every day.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card transition-all duration-300 animate-fade-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple & Affordable</h3>
              <p className="text-muted-foreground">
                Transparent pricing with volume discounts. No hidden fees or complicated contracts.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card transition-all duration-300 animate-fade-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
              <p className="text-muted-foreground">
                Premium locations with proven foot traffic and engaged local audiences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Calculator */}
        <PricingCalculator />
      </div>
    </div>
  );
};

export default Index;
