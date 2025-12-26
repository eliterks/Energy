import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Send, 
  Clock,
  Bot,
  User,
  Loader2,
  CheckCircle,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const staticStrategies = [
  {
    id: '1',
    title: 'Q3 2025 Energy Savings Initiative',
    description: 'This strategy focuses on reducing peak demand charges by implementing a campus-wide load shedding program. The program will target non-essential services during peak hours, such as decorative lighting and HVAC adjustments in unoccupied areas. We project a 15% reduction in peak demand and a 10% reduction in overall energy costs.',
    date: new Date('2025-07-15T10:00:00Z'),
  },
  {
    id: '2',
    title: 'HVAC Optimization for Summer 2025',
    description: 'This strategy involves a comprehensive optimization of the campus HVAC system. Key actions include upgrading to more efficient chillers, implementing a predictive maintenance schedule, and deploying smart thermostats in all buildings. The goal is to reduce HVAC energy consumption by 25% over the summer months.',
    date: new Date('2025-06-01T14:30:00Z'),
  },
];

const Strategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      message: 'Hello! I\'m your AI Energy Advisor. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user' as const,
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        type: 'ai' as const,
        message: 'This is a static response for the demo. In a real application, this would be a dynamic response from the AI.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Strategy Center</h1>
        <p className="text-muted-foreground">Intelligent energy optimization recommendations and interactive advisor</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Strategy Archive */}
          <Card className="border-card-border h-fit">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Strategy Archive
              </CardTitle>
              <CardDescription>Previous AI recommendations and analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {staticStrategies.map((strategy, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedStrategy === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:bg-muted/30'
                      }`}
                      onClick={() => setSelectedStrategy(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {formatDate(strategy.date)}
                        </Badge>
                        {selectedStrategy === index && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium text-foreground text-sm mb-1">
                        {strategy.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {strategy.description.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Strategy Display */}
          <Card className="border-card-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">
                    {staticStrategies[selectedStrategy]?.title}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(staticStrategies[selectedStrategy]?.date)}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    disabled
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    disabled
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="prose prose-sm max-w-none text-foreground">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {staticStrategies[selectedStrategy]?.description}
                  </pre>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Interactive Chat */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Bot className="w-5 h-5 mr-2 text-secondary" />
                Query the AI
              </CardTitle>
              <CardDescription>Ask questions about energy patterns, optimization opportunities, or system performance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chat History */}
              <ScrollArea className="h-[250px] mb-4 border border-border rounded-lg p-4 bg-muted/20">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border border-border text-foreground'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          {msg.type === 'user' ? (
                            <User className="w-4 h-4 mr-2" />
                          ) : (
                            <Bot className="w-4 h-4 mr-2 text-secondary" />
                          )}
                          <span className="text-xs opacity-75">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-card border border-border text-foreground p-3 rounded-lg">
                        <div className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin text-secondary" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about energy optimization, system performance, or recommendations..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
