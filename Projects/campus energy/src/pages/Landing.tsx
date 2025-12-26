import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/campus-hero.jpg';

const Landing = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'View live data from all campus energy hardware on one intuitive interface.'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Strategy',
      description: 'Receive clear, actionable advice from a state-of-the-art AI to reduce costs and improve efficiency.'
    },
    {
      icon: FileText,
      title: 'Automated Reporting',
      description: 'Generate comprehensive, narrative-style executive summaries automatically.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">CampusEnergy AI</h1>
          </div>
          <Link to="/login">
            <Button variant="outline" className="border-primary/20 hover:bg-primary hover:text-primary-foreground">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Intelligent Energy Management
            <br />
            <span className="text-accent">for a Smarter Campus</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Leveraging Generative AI to Optimize, Advise, and Report
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-4 text-lg">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transform Your Energy Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered tools to monitor, optimize, and report on your campus energy infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-card-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">CampusEnergy AI</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 CampusEnergy AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;