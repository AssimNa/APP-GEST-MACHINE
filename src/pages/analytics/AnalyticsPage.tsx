
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, Calendar, Download } from 'lucide-react';

const AnalyticsPage = () => {
  // In a real application, this would be dynamic data from an API
  const performanceMetrics = {
    uptimePercentage: 92.7,
    mtbf: "285 hours", // Mean Time Between Failures
    mttr: "4.3 hours", // Mean Time To Repair
    oee: 81.4, // Overall Equipment Effectiveness
    availability: 92.7,
    performance: 88.2,
    quality: 99.6
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.uptimePercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTBF</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.mtbf}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Mean Time Between Failures
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTTR</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.mttr}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Mean Time To Repair
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OEE</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.oee}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall Equipment Effectiveness
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>OEE Components</CardTitle>
                <CardDescription>Availability, Performance, Quality</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Availability</p>
                    <p className="text-sm font-medium">{performanceMetrics.availability}%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-blue-500" 
                      style={{ width: `${performanceMetrics.availability}%` }} 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Performance</p>
                    <p className="text-sm font-medium">{performanceMetrics.performance}%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-green-500" 
                      style={{ width: `${performanceMetrics.performance}%` }} 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Quality</p>
                    <p className="text-sm font-medium">{performanceMetrics.quality}%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div 
                      className="h-full rounded-full bg-purple-500" 
                      style={{ width: `${performanceMetrics.quality}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Machines</CardTitle>
                <CardDescription>By uptime percentage</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {name: "Assembly Line 2", uptime: 97.8},
                    {name: "Packaging Unit 3", uptime: 96.5},
                    {name: "CNC Machine 4", uptime: 95.2},
                    {name: "Conveyor System A", uptime: 94.7},
                    {name: "Robotic Arm 7", uptime: 93.9}
                  ].map((machine, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-3">
                      <p className="font-medium">{machine.name}</p>
                      <p className="font-bold">{machine.uptime}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Last 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Activity className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Chart Placeholder</h3>
                <p className="text-muted-foreground">
                  In a real application, a line chart would be displayed here showing
                  performance metrics over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Maintenance analytics will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="costs" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Cost analytics will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Trend analytics will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
