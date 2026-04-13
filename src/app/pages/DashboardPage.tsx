import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Heart, Calendar, DollarSign, CheckCircle2, Clock, MapPin, Phone, Mail, Download, Bell, Settings, LogOut, Users, Camera, UtensilsCrossed, Palette, Music } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: 'Sarah & John',
    weddingDate: 'June 15, 2026',
    daysUntilWedding: 98,
    package: 'Royal Affair',
    totalAmount: 82500,
    paidAmount: 16500,
    remainingAmount: 66000,
  };

  const upcomingTasks = [
    { id: 1, task: 'Finalize guest list', dueDate: 'Mar 15, 2026', status: 'pending' },
    { id: 2, task: 'Choose ceremony music', dueDate: 'Mar 20, 2026', status: 'pending' },
    { id: 3, task: 'Confirm catering menu', dueDate: 'Mar 25, 2026', status: 'pending' },
    { id: 4, task: 'Book rehearsal dinner venue', dueDate: 'Apr 1, 2026', status: 'pending' },
  ];

  const completedTasks = [
    { id: 1, task: 'Venue booking confirmed', completedDate: 'Jan 10, 2026' },
    { id: 2, task: 'Photography contract signed', completedDate: 'Jan 15, 2026' },
    { id: 3, task: 'Catering tasting completed', completedDate: 'Feb 1, 2026' },
    { id: 4, task: 'Invitation design approved', completedDate: 'Feb 10, 2026' },
  ];

  const timeline = [
    { date: 'Jan 10, 2026', event: 'Package Booked', icon: <CheckCircle2 className="w-5 h-5" />, status: 'completed' },
    { date: 'Jan 15, 2026', event: 'Initial Deposit Paid', icon: <DollarSign className="w-5 h-5" />, status: 'completed' },
    { date: 'Feb 1, 2026', event: 'Vendor Meetings Started', icon: <Users className="w-5 h-5" />, status: 'completed' },
    { date: 'Mar 15, 2026', event: 'Menu Selection Deadline', icon: <UtensilsCrossed className="w-5 h-5" />, status: 'upcoming' },
    { date: 'Apr 1, 2026', event: 'Decor Finalization', icon: <Palette className="w-5 h-5" />, status: 'upcoming' },
    { date: 'May 15, 2026', event: 'Final Payment Due', icon: <DollarSign className="w-5 h-5" />, status: 'upcoming' },
    { date: 'Jun 1, 2026', event: 'Final Walk-through', icon: <MapPin className="w-5 h-5" />, status: 'upcoming' },
    { date: 'Jun 15, 2026', event: 'Wedding Day!', icon: <Heart className="w-5 h-5" />, status: 'upcoming' },
  ];

  const payments = [
    { id: 1, date: 'Jan 15, 2026', description: 'Initial Deposit (20%)', amount: 16500, status: 'paid' },
    { id: 2, date: 'May 15, 2026', description: 'Final Payment (80%)', amount: 66000, status: 'pending' },
  ];

  const vendors = [
    { 
      name: 'Grand Palace Venue', 
      category: 'Venue', 
      contact: 'venue@grandpalace.com',
      phone: '(555) 123-4567',
      status: 'confirmed' 
    },
    { 
      name: 'Elite Catering Co.', 
      category: 'Catering', 
      contact: 'info@elitecatering.com',
      phone: '(555) 234-5678',
      status: 'confirmed' 
    },
    { 
      name: 'Moments Photography', 
      category: 'Photography', 
      contact: 'hello@momentsphotography.com',
      phone: '(555) 345-6789',
      status: 'confirmed' 
    },
    { 
      name: 'Bloom & Petal', 
      category: 'Flowers', 
      contact: 'orders@bloomandpetal.com',
      phone: '(555) 456-7890',
      status: 'pending' 
    },
  ];

  const paymentProgress = (userData.paidAmount / userData.totalAmount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-purple-50/20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)' }}
              >
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">Blissful Moments</div>
                <div className="text-xs text-muted-foreground">Wedding Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" onClick={() => navigate('/')}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100 border-b border-rose-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl mb-2">{userData.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{userData.weddingDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Grand Palace Venue</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div 
                className="text-6xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent"
              >
                {userData.daysUntilWedding}
              </div>
              <div className="text-muted-foreground">days until your wedding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-white border border-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--blush-pink)' }}
                  >
                    <Calendar className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Wedding Date</div>
                    <div className="font-semibold">{userData.weddingDate}</div>
                  </div>
                </div>
                <Badge className="bg-rose-100 text-rose-700 border-rose-200">
                  {userData.daysUntilWedding} days to go
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--lavender)' }}
                  >
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Package</div>
                    <div className="font-semibold">{userData.package}</div>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  Premium
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--sage-green)' }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Tasks Completed</div>
                    <div className="font-semibold">{completedTasks.length}/{upcomingTasks.length + completedTasks.length}</div>
                  </div>
                </div>
                <Progress value={(completedTasks.length / (upcomingTasks.length + completedTasks.length)) * 100} className="h-2" />
              </motion.div>
            </div>

            {/* Payment Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Payment Status</h2>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  On Track
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                  <div className="text-2xl font-semibold">${userData.totalAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Paid</div>
                  <div className="text-2xl font-semibold text-green-600">${userData.paidAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Remaining</div>
                  <div className="text-2xl font-semibold text-rose-600">${userData.remainingAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Progress</span>
                  <span className="font-medium">{Math.round(paymentProgress)}%</span>
                </div>
                <Progress value={paymentProgress} className="h-3" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Upcoming Tasks</h2>
                  <Badge>{upcomingTasks.length} pending</Badge>
                </div>

                <div className="space-y-3">
                  {upcomingTasks.map((task, idx) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 transition-all cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium mb-1">{task.task}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Tasks
                </Button>
              </motion.div>

              {/* Completed Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Completed</h2>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {completedTasks.length} done
                  </Badge>
                </div>

                <div className="space-y-3">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-700 mb-1">{task.task}</div>
                        <div className="text-sm text-muted-foreground">
                          Completed: {task.completedDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View History
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 border border-gray-200"
            >
              <h2 className="text-2xl mb-8">Wedding Planning Timeline</h2>

              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                          item.status === 'completed' 
                            ? 'border-green-200 bg-green-50 text-green-600' 
                            : 'border-rose-200 bg-white text-rose-600'
                        }`}
                      >
                        {item.icon}
                      </div>
                      {idx < timeline.length - 1 && (
                        <div 
                          className={`w-0.5 h-16 mt-2 ${
                            item.status === 'completed' ? 'bg-green-200' : 'bg-rose-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{item.event}</h4>
                        <Badge 
                          className={
                            item.status === 'completed'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : 'bg-rose-100 text-rose-700 border-rose-200'
                          }
                        >
                          {item.status === 'completed' ? 'Completed' : 'Upcoming'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl">Payment Schedule</h2>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </div>

              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className={`p-6 rounded-xl border-2 ${
                      payment.status === 'paid'
                        ? 'border-green-200 bg-green-50/50'
                        : 'border-rose-200 bg-rose-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium mb-1">{payment.description}</h4>
                        <div className="text-sm text-muted-foreground">Due: {payment.date}</div>
                      </div>
                      <Badge 
                        className={
                          payment.status === 'paid'
                            ? 'bg-green-600 text-white'
                            : 'bg-rose-600 text-white'
                        }
                      >
                        {payment.status === 'paid' ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        ${payment.amount.toLocaleString()}
                      </div>
                      {payment.status === 'pending' && (
                        <Button
                          style={{ 
                            background: 'linear-gradient(135deg, var(--rose-gold) 0%, var(--gold-accent) 100%)',
                            color: 'white'
                          }}
                        >
                          Make Payment
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-gray-50">
                  <div className="text-sm text-muted-foreground mb-1">Total Package Cost</div>
                  <div className="text-2xl font-semibold">${userData.totalAmount.toLocaleString()}</div>
                </div>
                <div className="p-6 rounded-xl bg-green-50">
                  <div className="text-sm text-muted-foreground mb-1">Total Paid</div>
                  <div className="text-2xl font-semibold text-green-600">${userData.paidAmount.toLocaleString()}</div>
                </div>
                <div className="p-6 rounded-xl bg-rose-50">
                  <div className="text-sm text-muted-foreground mb-1">Balance Due</div>
                  <div className="text-2xl font-semibold text-rose-600">${userData.remainingAmount.toLocaleString()}</div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl">Vendor Contacts</h2>
                <Button variant="outline">Add Vendor</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendors.map((vendor, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium mb-1">{vendor.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {vendor.category}
                        </Badge>
                      </div>
                      <Badge 
                        className={
                          vendor.status === 'confirmed'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${vendor.contact}`} className="hover:text-rose-600 hover:underline">
                          {vendor.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${vendor.phone}`} className="hover:text-rose-600 hover:underline">
                          {vendor.phone}
                        </a>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      View Contract
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
