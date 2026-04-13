import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { Heart, ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { motion } from 'motion/react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Mock package data
  const packageData = {
    '1': { name: 'Classic Elegance', price: 35000 },
    '2': { name: 'Royal Affair', price: 75000 },
    '3': { name: 'Grand Celebration', price: 150000 },
  };

  const pkg = packageData[id as keyof typeof packageData];

  if (!pkg) {
    return <div>Package not found</div>;
  }

  const deposit = pkg.price * 0.2; // 20% deposit
  const tax = pkg.price * 0.1; // 10% tax
  const total = pkg.price + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock booking confirmation
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-purple-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(`/package/${id}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)' }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-semibold text-lg">Blissful Moments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground">You're just one step away from your dream wedding!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h2 className="text-2xl mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h2 className="text-2xl mb-6">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-200'
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium">Credit / Debit Card</div>
                          <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                        </div>
                      </label>

                      <label
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === 'bank'
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-200'
                        }`}
                      >
                        <RadioGroupItem value="bank" id="bank" />
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <div className="flex-1">
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-sm text-muted-foreground">Direct bank transfer</div>
                        </div>
                      </label>

                      <label
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-200'
                        }`}
                      >
                        <RadioGroupItem value="paypal" id="paypal" />
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 01-.793.679H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
                        </svg>
                        <div className="flex-1">
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-muted-foreground">Pay with PayPal account</div>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Details */}
                {paymentMethod === 'card' && (
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-2xl mb-6">Card Details</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM / YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" maxLength={3} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" required />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <button type="button" className="text-rose-600 hover:underline">
                        terms and conditions
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-rose-600 hover:underline">
                        cancellation policy
                      </button>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)',
                    color: 'white'
                  }}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Complete Booking - ${deposit.toLocaleString()}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h2 className="text-2xl mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="font-medium mb-1">{pkg.name}</div>
                      <div className="text-sm text-muted-foreground">Complete wedding package</div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Package Price</span>
                        <span>${pkg.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span>${tax.toLocaleString()}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-200 mb-6">
                    <div className="flex items-start gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Pay Deposit Today</div>
                        <div className="text-2xl font-bold text-rose-600 mb-2">
                          ${deposit.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          20% deposit to secure your booking. Remaining balance due 30 days before the wedding.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Free cancellation within 48 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Flexible payment plans available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Full refund if we cancel</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex gap-3">
                    <div className="text-2xl">🎁</div>
                    <div>
                      <div className="font-medium mb-1">Special Offer</div>
                      <div className="text-sm text-gray-700">
                        Book today and receive a complimentary honeymoon planning consultation!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
