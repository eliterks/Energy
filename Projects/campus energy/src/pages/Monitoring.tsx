import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  Clock,
  Zap,
  Sun,
  Battery,
  Building
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import api from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap = {
  Zap: Zap,
  Sun: Sun,
  Activity: Activity,
  Battery: Battery,
  Building: Building,
};

const Monitoring = () => {
  const [timeRange, setTimeRange] = useState('24H');
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [errorDevices, setErrorDevices] = useState('');
  const [detailedPowerData, setDetailedPowerData] = useState([]);
  const [loadingPowerData, setLoadingPowerData] = useState(true);
  const [errorPowerData, setErrorPowerData] = useState('');

  const chartConfig = {
    gridImport: { label: 'Grid Import', color: 'hsl(var(--primary))' },
    solarProduction: { label: 'Solar Production', color: 'hsl(var(--secondary))' },
    batteryDischarge: { label: 'Battery Discharge', color: 'hsl(var(--accent))' },
    buildingALoad: { label: 'Building A', color: 'hsl(var(--info))' },
    buildingBLoad: { label: 'Building B', color: 'hsl(var(--warning))' },
    buildingCLoad: { label: 'Building C', color: 'hsl(var(--destructive))' },
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get('/monitoring/devices');
        setDevices(response.data);
      } catch (error) {
        setErrorDevices('Failed to load device status.');
      } finally {
        setLoadingDevices(false);
      }
    };

    const fetchPowerData = async () => {
      setLoadingPowerData(true);
      try {
        const response = await api.get(`/monitoring/energy-flows?time_range=${timeRange}`);
        setDetailedPowerData(response.data);
      } catch (error) {
        setErrorPowerData('Failed to load energy flow data.');
      } finally {
        setLoadingPowerData(false);
      }
    };

    const fetchData = () => {
      fetchDevices();
      fetchPowerData();
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 21000); // Fetch every 21 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeRange]);

  const timeRanges = ['6H', '24H', '7D'];

  const getStatusColor = (status: string) => {
    return status === 'online' 
      ? 'text-success bg-success/10 border-success/20' 
      : 'text-destructive bg-destructive/10 border-destructive/20';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Grid: 'bg-primary/10 text-primary border-primary/20',
      Solar: 'bg-secondary/10 text-secondary border-secondary/20',
      Battery: 'bg-accent/10 text-accent border-accent/20',
      Load: 'bg-info/10 text-info border-info/20',
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Monitoring</h1>
          <p className="text-muted-foreground">Real-time campus energy infrastructure status</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last updated: now</span>
        </div>
      </div>

      {/* Time-Series Chart */}
      <Card className="border-card-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Campus Energy Flows - Live</CardTitle>
              <CardDescription>Comprehensive real-time energy monitoring</CardDescription>
            </div>
            <div className="flex space-x-2">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? 'bg-primary text-primary-foreground' : ''}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loadingPowerData ? (
            <Skeleton className="h-[400px] w-full" />
          ) : errorPowerData ? (
            <p className="text-destructive">{errorPowerData}</p>
          ) : (
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detailedPowerData}>
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
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="gridImport" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Grid Import"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="solarProduction" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Solar Production"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="batteryDischarge" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Battery Discharge"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="buildingALoad" 
                    stroke="hsl(var(--info))" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    name="Building A Load"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Device Status Table */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="text-foreground">Device Status Overview</CardTitle>
          <CardDescription>All configured hardware from energy management system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-a">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Device Name</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Current Reading</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">IP Address</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Last Polled</th>
                </tr>
              </thead>
              <tbody>
                {loadingDevices ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4" colSpan={6}>
                        <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                  ))
                ) : errorDevices ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-destructive">{errorDevices}</td>
                  </tr>
                ) : (
                  devices.map((device, index) => {
                    const Icon = iconMap[device.icon];
                    return (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            {Icon && (
                              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                            <span className="font-medium text-foreground">{device.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={getTypeColor(device.type)}>
                            {device.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {device.status === 'online' ? (
                              <Wifi className="w-4 h-4 text-success" />
                            ) : (
                              <WifiOff className="w-4 h-4 text-destructive" />
                            )}
                            <Badge variant="outline" className={getStatusColor(device.status)}>
                              {device.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-foreground">{device.reading}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-muted-foreground">{device.ipAddress}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-muted-foreground">{device.lastPolled}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;