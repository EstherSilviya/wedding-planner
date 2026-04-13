import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Switch } from '../components/ui/switch';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Heart, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';


interface OnboardingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget: string;
  weddingType: string;
  destinationWedding: boolean;
  city: string;
  guestCount: string;
  mainDate: Date | undefined;
  mainTime: string;
  ceremonies: string[];
  ceremonyDetails: {
    [key: string]: {
      date: Date | undefined;
      time: string;
    };
  };
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    weddingType: '',
    destinationWedding: false,
    city: '',
    guestCount: '',
    mainDate: undefined,
    mainTime: '',
    ceremonies: [],
    ceremonyDetails: {},
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;
// 🔥 SAVE TO FIREBASE
const handleSubmitToFirebase = async () => {
  try {
    const user = auth.currentUser;

    console.log("USER:", user);

    if (!user) {
      alert("User not logged in");
      return;
    }

    await setDoc(
      doc(db, "users", user.uid),
      {
        onboardingData: {
          ...data,

          // ✅ FIXED DATE
          mainDate: data.mainDate
            ? new Date(data.mainDate).toISOString()
            : null,

          // ✅ FIXED CEREMONIES
          ceremonyDetails: Object.fromEntries(
            Object.entries(data.ceremonyDetails || {}).map(
              ([key, value]: any) => [
                key,
                {
                  date: value?.date
                    ? new Date(value.date).toISOString()
                    : null,
                  time: value?.time || "",
                },
              ]
            )
          ),
        },
      },
      { merge: true }
    );

    console.log("🔥 Saved successfully");

    navigate("/plans");

  } catch (error: any) {
    console.error("❌ FULL ERROR:", error);
    alert(error.message);
  }
};


// 🔥 NEXT BUTTON HANDLER
const handleNext = () => {
  if (step < totalSteps) {
    setStep((prev: number) => prev + 1);
  } else {
    handleSubmitToFirebase();
  }
};


// 🔥 BACK BUTTON HANDLER
const handleBack = () => {
  if (step > 1) {
    setStep((prev: number) => prev - 1);
  }
};
  const ceremonyOptions = [
    'Engagement Ceremony',
    'Mehendi',
    'Sangeet',
    'Haldi',
    'Wedding Ceremony',
    'Reception',
    'Cocktail Party',
    'Rehearsal Dinner',
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--blush-pink) 0%, white 100%)' }}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)' }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-semibold text-lg">Blissful Moments</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">Let's start with your details</h2>
                    <p className="text-muted-foreground">Tell us a bit about yourself</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={data.firstName}
                        onChange={(e) => setData({ ...data, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={data.lastName}
                        onChange={(e) => setData({ ...data, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Budget Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">What's your budget?</h2>
                    <p className="text-muted-foreground">This helps us suggest the perfect packages for you</p>
                  </div>

                  <RadioGroup value={data.budget} onValueChange={(value) => setData({ ...data, budget: value })}>
                    <div className="space-y-3">
                      {[
                        { value: '10000-25000', label: '$10,000 - $25,000', desc: 'Intimate celebration' },
                        { value: '25000-50000', label: '$25,000 - $50,000', desc: 'Classic wedding' },
                        { value: '50000-100000', label: '$50,000 - $100,000', desc: 'Premium experience' },
                        { value: '100000-200000', label: '$100,000 - $200,000', desc: 'Luxury celebration' },
                        { value: '200000+', label: '$200,000+', desc: 'Ultra-luxury experience' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${data.budget === option.value
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/50'
                            }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Wedding Type */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">Wedding type</h2>
                    <p className="text-muted-foreground">Choose your wedding ceremony style</p>
                  </div>

                  <RadioGroup value={data.weddingType} onValueChange={(value) => setData({ ...data, weddingType: value })}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          value: 'christian',
                          label: 'Christian',
                          image: 'https://images.unsplash.com/photo-1643047757508-f747bbe05acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBjaHVyY2glMjB3ZWRkaW5nJTIwYWx0YXJ8ZW58MXx8fHwxNzczMDQ4NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080'
                        },
                        {
                          value: 'hindu',
                          label: 'Hindu',
                          image: 'https://images.unsplash.com/photo-1680490961937-e933bf1ef920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoaW5kdSUyMHdlZGRpbmclMjBjZXJlbW9ueXxlbnwxfHx8fDE3NzMwNDg3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
                        },
                        {
                          value: 'muslim',
                          label: 'Muslim',
                          image: 'https://images.unsplash.com/photo-1764641697973-1e55796073bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBpc2xhbWljJTIwd2VkZGluZyUyMGNlcmVtb255fGVufDF8fHx8MTc3MzA0ODc3M3ww&ixlib=rb-4.1.0&q=80&w=1080'
                        },
                        {
                          value: 'other',
                          label: 'Other / Custom',
                          image: 'https://images.unsplash.com/photo-1766041677004-46d1525ae2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXN0aW5hdGlvbiUyMHdlZGRpbmclMjBiZWFjaCUyMGNlcmVtb255fGVufDF8fHx8MTc3MzA0ODc3NHww&ixlib=rb-4.1.0&q=80&w=1080'
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`relative overflow-hidden rounded-xl cursor-pointer group border-2 transition-all ${data.weddingType === option.value
                            ? 'border-rose-400 shadow-lg'
                            : 'border-gray-200 hover:border-rose-300'
                            }`}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={option.image}
                              alt={option.label}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                            <span className="text-white font-semibold text-lg">{option.label}</span>
                            <RadioGroupItem value={option.value} id={option.value} className="bg-white" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 4: Destination & City */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">Where's the celebration?</h2>
                    <p className="text-muted-foreground">Tell us about your wedding location</p>
                  </div>

                  <div className="p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="destination" className="text-base">Destination Wedding</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Are you planning a destination wedding?
                        </p>
                      </div>
                      <Switch
                        id="destination"
                        checked={data.destinationWedding}
                        onCheckedChange={(checked) => setData({ ...data, destinationWedding: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">
                      {data.destinationWedding ? 'Destination City' : 'City'}
                    </Label>
                    <Input
                      id="city"
                      placeholder="Enter city name"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      {data.destinationWedding
                        ? 'Where would you like to host your destination wedding?'
                        : 'Which city will your wedding be in?'}
                    </p>
                  </div>

                  {data.destinationWedding && (
                    <div className="p-6 rounded-xl bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-200">
                      <p className="text-sm text-gray-700">
                        ✨ Great choice! We'll include travel arrangements and accommodation packages for your guests.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Guest Count */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">How many guests?</h2>
                    <p className="text-muted-foreground">Expected number of attendees</p>
                  </div>

                  <RadioGroup value={data.guestCount} onValueChange={(value) => setData({ ...data, guestCount: value })}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { value: '0-50', label: '0 - 50', desc: 'Intimate gathering' },
                        { value: '50-100', label: '50 - 100', desc: 'Small celebration' },
                        { value: '100-200', label: '100 - 200', desc: 'Medium wedding' },
                        { value: '200-300', label: '200 - 300', desc: 'Large celebration' },
                        { value: '300-500', label: '300 - 500', desc: 'Grand wedding' },
                        { value: '500+', label: '500+', desc: 'Mega celebration' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${data.guestCount === option.value
                            ? 'border-rose-300 bg-rose-50'
                            : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/50'
                            }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <div className="flex-1">
                            <div className="font-medium">{option.label} guests</div>
                            <div className="text-sm text-muted-foreground">{option.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 6: Wedding Schedule */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl mb-2">Wedding schedule</h2>
                    <p className="text-muted-foreground">
                      Plan your ceremonies and events
                    </p>
                  </div>

                  {/* Main Wedding Date & Time */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-rose-50 to-purple-50 border border-rose-200 space-y-4">
                    <h3>Main Wedding Day</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* DATE */}
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={data.mainDate ?? ""}
                          onChange={(e) =>
                            setData((prev: any) => ({
                              ...prev,
                              mainDate: e.target.value, // STRING only ✅
                            }))
                          }
                        />
                      </div>

                      {/* TIME */}
                      <div className="space-y-2">
                        <Label htmlFor="mainTime">Time</Label>
                        <Input
                          id="mainTime"
                          type="time"
                          value={data.mainTime ?? ""}
                          onChange={(e) =>
                            setData((prev: any) => ({
                              ...prev,
                              mainTime: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ceremony Selection */}
                  <div className="space-y-4">
                    <Label>Select ceremonies & events</Label>

                    <div className="space-y-2">
                      {ceremonyOptions.map((ceremony: string) => (
                        <label
                          key={ceremony}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                        >
                          <Checkbox
                            checked={data.ceremonies.includes(ceremony)}
                            onCheckedChange={(checked) => {
                              setData((prev: any) => {
                                if (checked) {
                                  return {
                                    ...prev,
                                    ceremonies: [...prev.ceremonies, ceremony],
                                    ceremonyDetails: {
                                      ...prev.ceremonyDetails,
                                      [ceremony]: { date: "", time: "" }, // STRING ✅
                                    },
                                  };
                                } else {
                                  const newCeremonies = prev.ceremonies.filter(
                                    (c: string) => c !== ceremony
                                  );

                                  const newDetails = { ...prev.ceremonyDetails };
                                  delete newDetails[ceremony];

                                  return {
                                    ...prev,
                                    ceremonies: newCeremonies,
                                    ceremonyDetails: newDetails,
                                  };
                                }
                              });
                            }}
                          />
                          <span>{ceremony}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Selected Ceremonies Details */}
                  {data.ceremonies.length > 0 && (
                    <div className="space-y-4">
                      <h4>Ceremony Details</h4>

                      {data.ceremonies.map((ceremony: string) => (
                        <div
                          key={ceremony}
                          className="p-4 rounded-lg border border-gray-200 bg-white space-y-3"
                        >
                          <h5 className="font-medium">{ceremony}</h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {/* DATE */}
                            <div className="space-y-2">
                              <Label className="text-sm">Date</Label>
                              <Input
                                type="date"
                                value={data.ceremonyDetails?.[ceremony]?.date ?? ""}
                                onChange={(e) =>
                                  setData((prev: any) => ({
                                    ...prev,
                                    ceremonyDetails: {
                                      ...prev.ceremonyDetails,
                                      [ceremony]: {
                                        ...prev.ceremonyDetails?.[ceremony],
                                        date: e.target.value, // STRING ✅
                                      },
                                    },
                                  }))
                                }
                              />
                            </div>

                            {/* TIME */}
                            <div className="space-y-2">
                              <Label className="text-sm">Time</Label>
                              <Input
                                type="time"
                                value={data.ceremonyDetails?.[ceremony]?.time ?? ""}
                                onChange={(e) =>
                                  setData((prev: any) => ({
                                    ...prev,
                                    ceremonyDetails: {
                                      ...prev.ceremonyDetails,
                                      [ceremony]: {
                                        ...prev.ceremonyDetails?.[ceremony],
                                        time: e.target.value,
                                      },
                                    },
                                  }))
                                }
                              />
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  onClick={handleNext}
                  className="ml-auto"
                  style={{
                    background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)',
                    color: 'white'
                  }}
                >
                  {step === totalSteps ? 'See Your Plans' : 'Continue'}
                  {step !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}