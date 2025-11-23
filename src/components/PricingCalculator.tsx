import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, MapPin, TrendingUp, Eye, Plus, PlusCircle, Minus, ExternalLink } from 'lucide-react';

// Declare HubSpot interface
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormSubmit?: (form: any) => void;
          onFormSubmitted?: (form: any, data: any) => void;
        }) => void;
      };
    };
  }
}

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
  const [locationCount, setLocationCount] = useState<number>(1);
  const [contractTerm, setContractTerm] = useState<6 | 12>(6);
  const [screenTakeover, setScreenTakeover] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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

  // Tiered pricing based on location quantity
  const getBasePrice = (count: number) => {
    if (count === 1) return 75;
    if (count === 2) return 125;
    if (count === 3) return 150;
    // 4+ locations: $150 for first 3, then $50 for each additional
    return 150 + ((count - 3) * 50);
  };

  useEffect(() => {
    // Get base price for the location count
    const basePrice = getBasePrice(locationCount);
    
    // Add screen takeover cost if selected ($5 per location)
    const addOnCost = screenTakeover ? (5 * locationCount) : 0;
    const subtotalBeforeDiscount = basePrice + addOnCost;
    
    // Apply 12-month commitment discount (5%)
    const planDiscountRate = contractTerm === 12 ? 0.05 : 0;
    const planDiscountAmount = subtotalBeforeDiscount * planDiscountRate;
    
    const finalPrice = subtotalBeforeDiscount - planDiscountAmount;
    const annualSavings = planDiscountAmount * 12;

    setCalculation({
      basePrice,
      addOns: addOnCost,
      subtotal: subtotalBeforeDiscount,
      planDiscount: planDiscountAmount,
      locationDiscount: 0,
      finalPrice,
      totalSavings: planDiscountAmount,
      annualSavings,
    });
  }, [locationCount, contractTerm, screenTakeover]);

  useEffect(() => {
    // Listen for form submission message from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "form-submitted") {
        // Wait 10 seconds then redirect
        setTimeout(() => {
          window.location.href = 'https://arrowsdisplays.com/locations/';
        }, 10000);
      }
    };

    window.addEventListener("message", handleMessage);
    
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Instructions */}
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Follow the simple steps below to calculate your digital advertising investment. 
          Select the quantity of locations, choose your commitment term, and add any optional upgrades.
        </p>
      </div>

      {/* Ad Length Info */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
            <Clock className="w-5 h-5 text-primary" />
            All advertising spots are 10-20 seconds in length
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Number of Locations */}
          <Card className="hover:shadow-card transition-all duration-300 relative">
            <Badge className="absolute -top-4 left-2 bg-[#404041] text-white border border-border z-10 shadow-lg px-4 py-2 text-sm font-bold uppercase">
              Step 1
            </Badge>
            <CardHeader className="text-center pt-8">
              <CardTitle className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                <MapPin className="w-5 h-5 text-primary" />
                <span>How many locations would you like to advertise at?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="p-2"
                  onClick={() => setLocationCount(Math.max(1, locationCount - 1))}
                  disabled={locationCount <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={locationCount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setLocationCount(Math.max(1, value));
                  }}
                  className="w-24 text-center text-lg font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="p-2"
                  onClick={() => setLocationCount(locationCount + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Savings messaging */}
              {locationCount === 1 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-sm text-accent font-semibold text-center">
                    Want to save 17%? Add another location for just $62.50/location
                  </p>
                </div>
              )}
              {locationCount === 2 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-sm text-accent font-semibold text-center">
                    Want to save even more? Add another to save 33% ($50/location)
                  </p>
                </div>
              )}
              {locationCount >= 3 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-sm text-accent font-semibold text-center">
                    You're getting our best rate at $50/location!
                  </p>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Not sure which locations?{' '}
                <a 
                  href="https://www.arrowsdisplays.com/locations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  View our available locations
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Contract Term */}
          <Card className="hover:shadow-card transition-all duration-300 relative">
            <Badge className="absolute -top-4 left-2 bg-[#404041] text-white border border-border z-10 shadow-lg px-4 py-2 text-sm font-bold uppercase">
              Step 2
            </Badge>
            <CardHeader className="pt-8">
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
                  <span className="text-sm">5% off</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Minimum 6-month commitment required for all advertising plans
              </p>
            </CardContent>
          </Card>

          {/* Add-Ons */}
          <Card className="hover:shadow-card transition-all duration-300 relative">
            <Badge className="absolute -top-4 left-2 bg-[#404041] text-white border border-border z-10 shadow-lg px-4 py-2 text-sm font-bold uppercase">
              Step 3
            </Badge>
            <CardHeader className="pt-8">
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-primary" />
                Add-Ons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-warning" />
                  <div>
                    <div className="font-medium">Screen Takeover</div>
                    <div className="text-sm text-muted-foreground">Full screen visibility for maximum impact</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">+$5/location</span>
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
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-scale-in relative shadow-elegant">
            <Badge className="absolute -top-4 left-2 bg-[#404041] text-white border border-border z-10 shadow-lg px-4 py-2 text-sm font-bold uppercase">
              Your Price
            </Badge>
            <CardHeader className="text-center pt-8">
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
                  <div className="text-accent font-bold text-lg">
                    Monthly Savings: ${Math.round(calculation.totalSavings)}
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold">
                    That's ${Math.round(calculation.annualSavings)} saved per year!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Savings Breakdown */}
          {calculation.planDiscount > 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Savings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>12-month commitment:</span>
                  <span className="text-accent font-bold text-lg">-${Math.round(calculation.planDiscount)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-xl">
                  <span>Total Monthly Savings:</span>
                  <span className="text-accent">${Math.round(calculation.totalSavings)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                <p className="text-primary-foreground/90">
                  Connect with Southern Idaho customers today
                </p>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setScrollPosition(window.scrollY);
                    setShowPopup(true);
                  }}
                >
                  Sign Up Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
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
                  <span>Base price ({locationCount} location{locationCount > 1 ? 's' : ''}):</span>
                  <span>${calculation.basePrice}</span>
                </div>
                {calculation.addOns > 0 && (
                  <div className="flex justify-between">
                    <span>Screen Takeover ({locationCount} location{locationCount > 1 ? 's' : ''}):</span>
                    <span>+${calculation.addOns}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>Subtotal:</span>
                  <span>${calculation.subtotal}</span>
                </div>
                {calculation.planDiscount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>12-month discount:</span>
                    <span>-${Math.round(calculation.planDiscount)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Final Monthly Total:</span>
                  <span>${Math.round(calculation.finalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </details>
        </div>
      </div>

      {showPopup && (
        <div 
          className="absolute bg-black/80 flex items-center justify-center z-50 p-2"
          style={{ 
            position: 'absolute',
            top: scrollPosition,
            left: 0,
            right: 0,
            width: '100%',
            height: '100vh',
            zIndex: 9999
          }}
        >
          <div className="bg-white rounded-md p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto relative border border-gray-300">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
            <div className="hs-form-frame" data-region="na2" data-form-id="5dc939be-4be4-4ce1-b271-187881e30fa5" data-portal-id="242168862"></div>
          </div>
        </div>
      )}
    </div>
  );
};