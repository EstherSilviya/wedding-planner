import { useNavigate } from "react-router-dom";
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Heart, Sparkles, Check, Crown, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Package {
  id: string;
  name: string;
  tier: string;
  price: string;
  description: string;
  image: string;
  features: string[];
  highlighted?: boolean;
}

const packages: Package[] = [
  {
    id: '1',
    name: 'Classic Elegance',
    tier: 'Essential',
    price: '$35,000',
    description: 'Perfect for intimate celebrations with timeless sophistication',
    image: 'https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlJTIwYmFsbHJvb218ZW58MXx8fHwxNzczMDA4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Elegant venue for up to 100 guests',
      'Professional catering service',
      'Floral decorations',
      'Professional photography (8 hours)',
      'Wedding cake',
      'DJ & sound system',
    ],
  },
  {
    id: '2',
    name: 'Royal Affair',
    tier: 'Premium',
    price: '$75,000',
    description: 'An unforgettable experience with premium services and luxury touches',
    image: 'https://images.unsplash.com/photo-1724847664831-27b55fef3121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3JhbCUyMGFycmFuZ2VtZW50c3xlbnwxfHx8fDE3NzMwNDg3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Luxury venue for up to 200 guests',
      'Gourmet catering with premium menu',
      'Premium floral & decor styling',
      'Photography & videography team',
      'Makeup artist & hair stylist',
      'Live entertainment',
      'Hotel accommodations for couple',
      'Custom invitation design',
    ],
    highlighted: true,
  },
  {
    id: '3',
    name: 'Grand Celebration',
    tier: 'Luxury',
    price: '$150,000',
    description: 'The ultimate wedding experience with everything you could dream of',
    image: 'https://images.unsplash.com/photo-1766041677004-46d1525ae2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBiZWFjaCUyMGNlcmVtb255fGVufDF8fHx8MTc3MzA0ODc3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    features: [
      'Exclusive destination venue',
      'Multi-day celebration package',
      'Celebrity chef catering',
      'Designer decor & installations',
      'Professional photo & video team',
      'Celebrity makeup & styling',
      'Live band & DJ',
      'Hotel block for guests',
      'Travel arrangements',
      'Luxury return gifts',
      'Custom everything',
    ],
  },
];

export function PlansPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-purple-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)' }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-semibold text-lg">Blissful Moments</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 text-rose-900 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Curated Wedding Packages</span>
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-rose-900 via-purple-900 to-rose-900 bg-clip-text text-transparent">
            Your Perfect Wedding Awaits
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your preferences, we've curated these exclusive packages designed just for you
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${pkg.highlighted ? 'lg:-mt-4' : ''}`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div 
                className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 h-full flex flex-col ${
                  pkg.highlighted 
                    ? 'border-amber-400 shadow-2xl shadow-amber-100' 
                    : 'border-gray-200 hover:border-rose-300 hover:shadow-xl'
                }`}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/95 text-gray-900 backdrop-blur-sm border-0">
                      {pkg.tier}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                        {pkg.price}
                      </span>
                      <span className="text-muted-foreground text-sm">starting from</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => navigate(`/package/${pkg.id}`)}
                    className="w-full"
                    style={pkg.highlighted ? {
                      background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)',
                      color: 'white'
                    } : undefined}
                    variant={pkg.highlighted ? 'default' : 'outline'}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 border border-rose-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-amber-600" />
                <h3 className="text-2xl">Need something different?</h3>
              </div>
              <p className="text-muted-foreground">
                Work with our wedding planners to create a completely custom package tailored to your unique vision and requirements.
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-rose-300 hover:bg-rose-50 whitespace-nowrap"
            >
              Create Custom Package
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
