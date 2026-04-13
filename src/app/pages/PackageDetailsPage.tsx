import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';


import {
  Heart, ArrowLeft, Check,
  MapPin, Sparkles, Camera,
  UtensilsCrossed, Palette
} from 'lucide-react';

import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";

export function PackageDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [servicesData, setServicesData] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [booked, setBooked] = useState(false);

  const auth = getAuth();

  // 🔥 FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, "services"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServicesData(data);
    };
    fetchServices();
  }, []);

  // 🔹 PACKAGE DATA
  const packageData = {
    '1': { name: 'Classic Elegance', tier: 'Essential', price: 35000 },
    '2': { name: 'Royal Affair', tier: 'Premium', price: 75000 },
    '3': { name: 'Grand Celebration', tier: 'Luxury', price: 150000 },
  };

  const pkg = packageData[id];
  if (!pkg) return <div>Package not found</div>;

  // 🔥 CATEGORY GROUPING
  const services = [
    { title: "Venue", icon: <MapPin />, key: "venue", items: servicesData.filter(s => s.category === "venue") },
    { title: "Catering", icon: <UtensilsCrossed />, key: "catering", items: servicesData.filter(s => s.category === "catering") },
    { title: "Decoration", icon: <Palette />, key: "decoration", items: servicesData.filter(s => s.category === "decoration") },
    { title: "Makeup", icon: <Sparkles />, key: "makeup", items: servicesData.filter(s => s.category === "makeup") },
    { title: "Photography", icon: <Camera />, key: "photography", items: servicesData.filter(s => s.category === "photography") },
    { title: "Hotel", icon: <MapPin />, key: "hotel", items: servicesData.filter(s => s.category === "hotel") },
    { title: "Travel", icon: <MapPin />, key: "travel", items: servicesData.filter(s => s.category === "travel") },
    { title: "Invitation", icon: <Sparkles />, key: "invitation", items: servicesData.filter(s => s.category === "invitation") },
    { title: "Return Gifts", icon: <Heart />, key: "gifts", items: servicesData.filter(s => s.category === "gifts") }
  ];

  // ✅ SELECT
  const handleSelect = (categoryKey, item) => {
    setSelectedServices(prev => ({
      ...prev,
      [categoryKey]: item
    }));
  };

  // ✅ BOOK + SAVE TO FIRESTORE
  const handleBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("⚠️ Please login first");
      return;
    }

    if (Object.keys(selectedServices).length < services.length) {
      alert("⚠️ Select one service in ALL categories");
      return;
    }

    try {
      // 🔥 SAVE BOOKING
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        packageId: id,
        packageName: pkg.name,
        price: pkg.price,

        services: Object.values(selectedServices).map(s => ({
          id: s.id,
          name: s.name,
          category: s.category
        })),

        createdAt: serverTimestamp()
      });

      // UI
      setBooked(true);
      setActiveTab("timeline");

      setTimeout(() => {
        alert("🎉 Booking saved successfully!");
      }, 300);

      // 👉 REDIRECT
      setTimeout(() => {
        navigate(`/checkout/${id}`);
      }, 2500);

    } catch (error) {
      console.error(error);
      alert("❌ Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="border-b p-4 flex justify-between items-center">
        <Button variant="ghost" onClick={() => navigate('/plans')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span className="font-semibold">Blissful Moments</span>
        </div>
      </div>

      {/* HERO */}
      <div className="p-6 border-b">
        <Badge className="mb-2">{pkg.tier}</Badge>
        <h1 className="text-3xl font-bold">{pkg.name}</h1>
        <p className="text-2xl mt-2 font-semibold text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--rose-gold), var(--gold-accent))' }}>
          ${pkg.price}
        </p>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>

          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <h2 className="text-xl font-semibold mb-4">Included Services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <div key={i} className="p-4 border rounded-xl">
                  {s.title}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* SERVICES */}
          <TabsContent value="services">

            {services.map((category, idx) => (
              <div key={idx} className="mb-10">

                <h2 className="text-xl font-semibold mb-4 flex gap-2 items-center">
                  {category.icon} {category.title}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                  {category.items.map(item => {
                    const isSelected = selectedServices[category.key]?.id === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(category.key, item)}
                        className={`cursor-pointer border rounded-xl p-3 transition ${
                          isSelected
                            ? "border-rose-500 ring-2 ring-rose-300"
                            : "hover:shadow"
                        }`}
                      >
                        <img src={item.image} className="h-28 w-full object-cover rounded mb-2" />

                        <h3 className="text-sm font-semibold">{item.name}</h3>

                        {isSelected && (
                          <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Selected
                          </div>
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>
            ))}

            {/* SUMMARY */}
            <div className="bg-gray-50 p-6 rounded-xl mt-10 border">
              <h3 className="font-semibold mb-3">Selected Services</h3>

              {Object.keys(selectedServices).length === 0 ? (
                <p className="text-gray-400">No selections yet</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {Object.values(selectedServices).map((s, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{s.name}</span>
                      <Check className="text-green-500 w-4 h-4" />
                    </li>
                  ))}
                </ul>
              )}

              <Button
                onClick={handleBooking}
                className="w-full mt-4 text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--rose-gold), var(--gold-accent))'
                }}
              >
                Book This Package
              </Button>
            </div>

          </TabsContent>

          {/* TIMELINE */}
          <TabsContent value="timeline">
            {!booked ? (
              <p className="text-gray-400">No booking yet</p>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Selected Plan</h2>

                {Object.values(selectedServices).map((s, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Check className="text-green-500 w-4 h-4" />
                    {s.name}
                  </div>
                ))}

                <div className="mt-6 p-4 bg-green-50 rounded">
                  🎉 Package booked! Redirecting to checkout...
                </div>
              </div>
            )}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}