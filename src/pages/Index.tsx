import { PricingCalculator } from '@/components/PricingCalculator';
import heroImage from '@/assets/arrows-displays-hero.jpg';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header Section */}
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary/80 via-primary to-primary/40 bg-clip-text text-transparent animate-[gradient-slide_4s_ease-in-out_infinite] bg-[length:200%_auto] leading-tight">
            Calculate Your Digital Advertising Investment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our community-focused pricing works for your business
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 pb-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-b from-primary/8 to-primary/3 rounded-lg transition-all duration-300 animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
              <p className="text-muted-foreground">
                Reach Southern Idaho residents where they shop, dine, and gather every day.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-primary/8 to-primary/3 rounded-lg transition-all duration-300 animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple & Affordable</h3>
              <p className="text-muted-foreground">
                Transparent pricing with volume discounts. No hidden fees or complicated contracts.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-primary/8 to-primary/3 rounded-lg transition-all duration-300 animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
              <p className="text-muted-foreground">
                Premium locations with proven foot traffic and engaged local audiences.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Calculator */}
        <PricingCalculator />
      </div>
    </div>
  );
};

export default Index;
