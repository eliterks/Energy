import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const staticReports = [
  {
    id: '1',
    period: 'January 2024',
    type: 'Monthly',
    generatedDate: new Date('2024-02-01T10:00:00Z'),
    generatedBy: 'AI System',
    status: 'completed',
    metrics: {
      energySaved: '142 MWh',
      costReduction: '$58,240',
      efficiency: '+17.3%',
    },
  },
  {
    id: '2',
    period: 'Q4 2023',
    type: 'Quarterly',
    generatedDate: new Date('2024-01-15T14:30:00Z'),
    generatedBy: 'AI System',
    status: 'completed',
    metrics: {
      energySaved: '380 MWh',
      costReduction: '$155,600',
      efficiency: '+15.8%',
    },
  },
];

const reportPreview = `**CAMPUS ENERGY MANAGEMENT REPORT**
**January 2024 - Executive Summary**

**OVERVIEW**
This comprehensive analysis covers campus energy performance for January 2024, highlighting significant achievements in energy optimization and cost reduction through AI-driven strategies.

**KEY PERFORMANCE INDICATORS**

Energy Consumption:
• Total Campus Consumption: 2,847,320 kWh
• Solar Generation: 1,245,680 kWh (44% of consumption)
• Grid Import Reduction: 18.2% vs. January 2023
• Peak Demand Reduction: 12.4% through load management

**RECOMMENDATIONS FOR FEBRUARY**

1. **Immediate Actions (Week 1-2)**
   - Implement HVAC schedule adjustments in Buildings C and E
   - Upgrade battery management algorithms for 3% efficiency gain

2. **Medium-term Projects (Month 2-3)**
   - Install additional smart sensors in dormitory complexes
   - Pilot microgrid islanding capability for critical systems

**CONCLUSION**
January 2024 demonstrates exceptional performance across all energy management metrics. The AI-driven optimization strategies have delivered substantial cost savings while significantly improving environmental sustainability.`;

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [reportType, setReportType] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' 
      ? 'text-success bg-success/10 border-success/20' 
      : 'text-warning bg-warning/10 border-warning/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Automated Report Generation</h1>
        <p className="text-muted-foreground">AI-powered executive summaries and energy performance analysis</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report Generation Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Generate New Report
              </CardTitle>
              <CardDescription>Create comprehensive energy management reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="month-select" className="text-foreground font-medium">
                  Report Period
                </Label>
                <Input
                  id="month-select"
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-background/50 border-input"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Summary</SelectItem>
                    <SelectItem value="quarterly">Quarterly Review</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                disabled
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Report History and Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report History Table */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground">Report History</CardTitle>
              <CardDescription>Previously generated energy management reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-foreground">Period</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Type</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Generated</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Key Metrics</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticReports.map((report) => (
                      <tr key={report.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-2">
                          <div>
                            <span className="font-medium text-foreground">{report.period}</span>
                            <Badge variant="outline" className={`ml-2 ${getStatusColor(report.status)}`}>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {report.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                            {report.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-sm">
                            <div className="text-foreground">{formatDate(report.generatedDate)}</div>
                            <div className="text-muted-foreground text-xs">by {report.generatedBy}</div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-sm space-y-1">
                            <div className="text-foreground">{report.metrics.energySaved} saved</div>
                            <div className="text-success">{report.metrics.costReduction} reduced</div>
                            <div className="text-accent">{report.metrics.efficiency} efficiency</div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                              className="flex items-center"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center" disabled>
                              <Download className="w-3 h-3 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Report Preview */}
          {selectedReport && (
            <Card className="border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Report Preview</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedReport(null)}
                  >
                    ✕
                  </Button>
                </div>
                <CardDescription>January 2024 Monthly Energy Management Report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                    {reportPreview}
                  </pre>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <FileText className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
