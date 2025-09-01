import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Rocket, Globe, ShoppingCart, Users, Mail, BarChart3, HandHeart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThreeBackground from "@/components/ThreeBackground";
import floatingShapes from "@/assets/floating-shapes.jpg";
import waitlistWaves from "@/assets/waitlist-waves.jpg";
const Index = () => {
  const [email, setEmail] = useState("");
  const {
    toast
  } = useToast();
  const handleWaitlistSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "🚀 You're on the waitlist!",
        description: "We'll notify you when Influsuite launches with exclusive bonuses."
      });
      setEmail("");
    }
  };
  const features = [{
    icon: Globe,
    title: "Profile Hub",
    description: "Convert clicks into customers with beautiful link-in-bio pages and custom landing pages."
  }, {
    icon: ShoppingCart,
    title: "Digital Storefront",
    description: "Sell ebooks, courses, merchandise, and templates with integrated payment processing."
  }, {
    icon: Users,
    title: "Community & Memberships",
    description: "Build paid communities with Discord/Telegram integration and member management."
  }, {
    icon: Mail,
    title: "Marketing Automation",
    description: "Automated email and SMS campaigns that nurture leads and drive sales."
  }, {
    icon: BarChart3,
    title: "Unified Analytics",
    description: "Track revenue, engagement, LTV, and all key metrics in one clean dashboard."
  }, {
    icon: HandHeart,
    title: "Collaboration Tools",
    description: "Partner with creators, manage affiliates, and cross-promote content seamlessly."
  }];
  return <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 opacity-20 float-1" style={{
        backgroundImage: `url(${floatingShapes})`,
        backgroundSize: 'cover',
        filter: 'hue-rotate(180deg)'
      }} />
        <div className="absolute bottom-40 left-10 w-24 h-24 opacity-15 float-2" style={{
        backgroundImage: `url(${floatingShapes})`,
        backgroundSize: 'cover',
        filter: 'hue-rotate(90deg)'
      }} />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 opacity-10 float-3" style={{
        backgroundImage: `url(${floatingShapes})`,
        backgroundSize: 'cover',
        filter: 'hue-rotate(270deg)'
      }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-background via-background/95 to-background/90">
        {/* 3D Animated Background */}
        <ThreeBackground />
        
        {/* Content overlay */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Launch Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full mb-8 animate-pulse-glow">
            <Rocket className="w-5 h-5 text-neon-cyan" />
            <span className="neon-text font-bold text-lg">Launching Soon</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">The Operating System</span>
            <br />
            <span className="text-foreground">for Influencers</span>
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-neon-cyan">
            All your creator tools. One powerful platform.
          </h2>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Everything you need to monetize your influence. From profile management to e-commerce, 
            community building to analytics – Influsuite combines all your creator tools into one 
            powerful platform. Built for influencers who are serious about scaling their business.
          </p>

          {/* Waitlist Form */}
          <div className="glass-card p-8 rounded-3xl max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">
                <span className="neon-text animate-pulse-glow">🚀 Join the Waitlist</span>
              </h3>
              <p className="text-lg text-muted-foreground">
                Be the first to know when Influsuite goes live. Get early access and bonuses.
              </p>
            </div>

            <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} className="futuristic-input flex-1 h-12 text-lg px-6" required />
              <Button type="submit" size="lg" className="neon-border bg-primary text-primary-foreground px-8 h-12 font-bold interactive-hover">
                <Rocket className="w-5 h-5 mr-2" />
                Get Early Access
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              Join 10,000+ creators already on the waitlist. No spam, just updates.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-background/90 to-background/95">
        {/* Enhanced 3D background for section */}
        <ThreeBackground variant="section" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Six Powerful Modules, One Unified Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Stop juggling multiple tools and subscriptions. Influsuite brings everything you need 
              to build, grow, and monetize your influence into one seamless experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="glass-card glass-hover p-8 text-center group transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,26,46,0.6)] hover:border-neon-blue/50 active:shadow-[0_0_50px_rgba(26,26,46,0.8)] active:scale-95 cursor-pointer">
                <div className="mb-6 relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-neon rounded-full flex items-center justify-center group-hover:animate-pulse-glow">
                    <feature.icon className="w-10 h-10 text-background" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>)}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 px-6 border-t border-glass-border bg-gradient-to-t from-background to-background/95">
        {/* Subtle 3D background for footer */}
        <ThreeBackground variant="footer" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">Influsuite</h3>
            <p className="text-muted-foreground">The Creator Hub</p>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Influsuite. All rights reserved. Built for the next generation of creators.
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;