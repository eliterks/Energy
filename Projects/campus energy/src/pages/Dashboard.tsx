import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Battery, 
  Zap, 
  Sun,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

import { Power } from 'lucide-react';

const iconMap = {
  Zap: Zap,
  Sun: Sun,
  Activity: Activity,
  Battery: Battery,
  Power: Power,
};

const Dashboard = () => {
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [powerFlowData, setPowerFlowData] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState([]);

  const chartConfig = {
    consumption: {
      label: 'Consumption',
      color: 'hsl(var(--primary))',
    },
    solar: {
      label: 'Solar Production',
      color: 'hsl(var(--secondary))',
    },
  };

  const fetchData = async () => {
    try {
      const [recommendationRes, metricsRes, powerFlowRes, deviceStatusRes] = await Promise.all([
        api.get('/dashboard/ai-recommendation'),
        api.get('/dashboard/metrics'),
        api.get('/dashboard/power-flow'),
        api.get('/dashboard/device-status'),
      ]);
      setAiRecommendation(recommendationRes.data.recommendation);
      setMetrics(metricsRes.data);
      setPowerFlowData(powerFlowRes.data);
      setDeviceStatus(deviceStatusRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 21000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Recommendation Widget */}
      <Card className="border-card-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <CardTitle className="text-foreground">Latest AI Recommendation</CardTitle>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              Just now
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {aiRecommendation ? (
            <p className="text-foreground mb-4 leading-relaxed">
              {aiRecommendation}
            </p>
          ) : (
            <Skeleton className="h-16 w-full" />
          )}
          <Link to="/app/strategy">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground" disabled={!aiRecommendation}>
              View Full Strategy
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.length > 0 ? (
          metrics.map((metric, index) => {
            const Icon = iconMap[metric.icon];
            return (
              <Card key={index} className="border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <div className="flex items-baseline space-x-1 mt-2">
                        <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                        <span className="text-sm text-muted-foreground">{metric.unit}</span>
                      </div>
                      {metric.change && (
                        <div className={`flex items-center mt-2 text-sm ${metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : metric.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          ) : null}
                          {metric.change}
                        </div>
                      )}
                      {metric.title === 'Battery Level' && (
                        <Progress value={parseInt(metric.value)} className="mt-3 h-2" />
                      )}
                    </div>
                    {Icon && (
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-muted/50 ${metric.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-card-border">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2 mt-2" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Campus Power Flow Widget */}
      <Card className="border-card-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Campus Power Flow - Last 24 Hours</CardTitle>
              <CardDescription>Real-time consumption vs. solar production</CardDescription>
            </div>
            <Link to="/app/monitoring">
              <Button variant="outline" size="sm">
                View Details
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {powerFlowData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={powerFlowData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis 
                    dataKey="time" 
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="solar" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <Skeleton className="h-[400px] w-full" />
          )}
        </CardContent>
      </Card>

      {/* Device Status Widget */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-foreground">Device Status</CardTitle>
          <CardDescription>Live status of all connected devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceStatus.length > 0 ? (
              deviceStatus.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-success' : 'bg-destructive'}`}></div>
                    <span className="font-medium text-foreground">{device.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold ${device.status === 'online' ? 'text-success' : 'text-destructive'}`}>
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </span>
                    <p className="text-xs text-muted-foreground">{device.power.toFixed(2)} kW</p>
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;