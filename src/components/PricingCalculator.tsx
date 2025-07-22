import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, MapPin, TrendingUp, Zap, Eye } from 'lucide-react';

interface PricingCalculation {
  basePrice: number;
  addOns: number;
  subtotal: number;
  planDiscount: number;
  locationDiscount: number;
  finalPrice: number;
  totalSavings: number;
  annualSavings: number;
}

export const PricingCalculator = () => {
  const [spotDuration, setSpotDuration] = useState<10 | 20 | 30>(20);
  const [locationTier, setLocationTier] = useState<'1' | '2-5' | '6-10' | '11+'>('1');
  const [contractTerm, setContractTerm] = useState<6 | 12>(6);
  const [peakTime, setPeakTime] = useState(false);
  const [screenTakeover, setScreenTakeover] = useState(false);
  const [calculation, setCalculation] = useState<PricingCalculation>({
    basePrice: 0,
    addOns: 0,
    subtotal: 0,
    planDiscount: 0,
    locationDiscount: 0,
    finalPrice: 0,
    totalSavings: 0,
    annualSavings: 0,
  });

  const spotPrices = {
    10: 100,
    20: 150,
    30: 200,
  };

  const locationMultipliers = {
    '1': { count: 1, discount: 0 },
    '2-5': { count: 3, discount: 0.05 },
    '6-10': { count: 8, discount: 0.10 },
    '11+': { count: 15, discount: 0.15 },
  };

  useEffect(() => {
    const basePrice = spotPrices[spotDuration];
    const addOnCost = (peakTime ? 50 : 0) + (screenTakeover ? 50 : 0);
    const perLocationPrice = basePrice + addOnCost;
    
    // Apply 12-month discount first
    const planDiscountRate = contractTerm === 12 ? 0.10 : 0;
    const discountedPerLocation = perLocationPrice * (1 - planDiscountRate);
    
    // Then apply location multiplier and discount
    const locationData = locationMultipliers[locationTier];
    const subtotalBeforeLocationDiscount = discountedPerLocation * locationData.count;
    const locationDiscountAmount = subtotalBeforeLocationDiscount * locationData.discount;
    
    const finalPrice = subtotalBeforeLocationDiscount - locationDiscountAmount;
    const originalPrice = perLocationPrice * locationData.count;
    const totalSavings = originalPrice - finalPrice;
    const annualSavings = totalSavings * 12;

    setCalculation({
      basePrice,
      addOns: addOnCost,
      subtotal: perLocationPrice,
      planDiscount: perLocationPrice * planDiscountRate * locationData.count,
      locationDiscount: locationDiscountAmount,
      finalPrice,
      totalSavings,
      annualSavings,
    });
  }, [spotDuration, locationTier, contractTerm, peakTime, screenTakeover]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Calculate Your Digital Advertising Investment
        </h1>
        <p className="text-xl text-muted-foreground">
          See how our community-focused pricing works for your business
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spot Duration */}
          <Card className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Choose Your Spot Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {([10, 20, 30] as const).map((duration) => (
                  <div key={duration} className="relative">
                    <Button
                      variant={spotDuration === duration ? "option-selected" : "option"}
                      size="lg"
                      className="w-full h-20 flex-col space-y-1"
                      onClick={() => setSpotDuration(duration)}
                    >
                      <span className="text-2xl font-bold">{duration}s</span>
                      <span className="text-sm">${spotPrices[duration]}/month</span>
                    </Button>
                    {duration === 20 && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-accent">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Number of Locations */}
          <Card className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Select Number of Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {([
                  { key: '1' as const, label: '1 Location', discount: '0%' },
                  { key: '2-5' as const, label: '2-5 Locations', discount: '5% off' },
                  { key: '6-10' as const, label: '6-10 Locations', discount: '10% off' },
                  { key: '11+' as const, label: '11+ Locations', discount: '15% off' },
                ]).map((option) => (
                  <Button
                    key={option.key}
                    variant={locationTier === option.key ? "option-selected" : "option"}
                    size="lg"
                    className="h-16 flex-col space-y-1"
                    onClick={() => setLocationTier(option.key)}
                  >
                    <span className="font-semibold">{option.label}</span>
                    {option.discount !== '0%' && (
                      <span className="text-sm text-accent font-medium">{option.discount}</span>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contract Term */}
          <Card className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Choose Contract Term
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={contractTerm === 6 ? "option-selected" : "option"}
                  size="lg"
                  className="h-16 flex-col space-y-1"
                  onClick={() => setContractTerm(6)}
                >
                  <span className="font-semibold">6 Month Commitment</span>
                  <span className="text-sm">Standard Rate</span>
                </Button>
                <Button
                  variant={contractTerm === 12 ? "option-selected" : "option"}
                  size="lg"
                  className="h-16 flex-col space-y-1"
                  onClick={() => setContractTerm(12)}
                >
                  <span className="font-semibold">12 Month Commitment</span>
                  <span className="text-sm text-accent font-medium">10% off</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add-Ons */}
          <Card className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <CardTitle>Optional Add-Ons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-warning" />
                  <div>
                    <div className="font-medium">Peak Time Upgrade</div>
                    <div className="text-sm text-muted-foreground">Priority scheduling during high-traffic hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">+$50/location</span>
                  <input
                    type="checkbox"
                    checked={peakTime}
                    onChange={(e) => setPeakTime(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-warning" />
                  <div>
                    <div className="font-medium">Screen Takeover</div>
                    <div className="text-sm text-muted-foreground">Full screen visibility for maximum impact</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">+$50/location</span>
                  <input
                    type="checkbox"
                    checked={screenTakeover}
                    onChange={(e) => setScreenTakeover(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Main Price Display */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle>Your Monthly Investment</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-primary animate-price-update">
                  ${Math.round(calculation.finalPrice)}
                </div>
                <div className="text-lg text-muted-foreground">per month</div>
              </div>
              
              {calculation.totalSavings > 0 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
                  <div className="text-accent font-semibold">
                    Monthly Savings: ${Math.round(calculation.totalSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    That's ${Math.round(calculation.annualSavings)} saved per year!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Savings Breakdown */}
          {(calculation.planDiscount > 0 || calculation.locationDiscount > 0) && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Savings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {calculation.planDiscount > 0 && (
                  <div className="flex justify-between">
                    <span>12-month commitment:</span>
                    <span className="text-accent font-semibold">-${Math.round(calculation.planDiscount)}</span>
                  </div>
                )}
                {calculation.locationDiscount > 0 && (
                  <div className="flex justify-between">
                    <span>Multi-location discount:</span>
                    <span className="text-accent font-semibold">-${Math.round(calculation.locationDiscount)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Monthly Savings:</span>
                  <span className="text-accent">${Math.round(calculation.totalSavings)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Get Started?</h3>
              <p className="text-primary-foreground/90">
                Connect with Southern Idaho customers today
              </p>
              <Button variant="secondary" size="lg" className="w-full">
                Request Your Custom Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Breakdown (Expandable) */}
          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              View detailed breakdown
            </summary>
            <Card className="mt-2 group-open:animate-scale-in">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base price ({spotDuration}s per location):</span>
                  <span>${calculation.basePrice}</span>
                </div>
                {calculation.addOns > 0 && (
                  <div className="flex justify-between">
                    <span>Add-ons per location:</span>
                    <span>${calculation.addOns}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Subtotal per location:</span>
                  <span>${calculation.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of locations:</span>
                  <span>{locationMultipliers[locationTier].count}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Final Monthly Total:</span>
                  <span>${Math.round(calculation.finalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </details>
        </div>
      </div>
    </div>
  );
};