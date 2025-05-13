
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bell, Search, FilterX, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';

const AlertsPage = () => {
  const alerts = [
    {
      id: 1,
      title: 'Hydraulic Pressure Low',
      machine: 'Hydraulic Press 2',
      severity: 'Critical',
      timestamp: '2024-05-09 08:23 AM',
      status: 'Unresolved',
      assignedTo: 'John Smith'
    },
    {
      id: 2,
      title: 'Temperature Exceeds Threshold',
      machine: 'Generator 1',
      severity: 'High',
      timestamp: '2024-05-09 09:45 AM',
      status: 'In Progress',
      assignedTo: 'Michael Johnson'
    },
    {
      id: 3,
      title: 'Oil Level Warning',
      machine: 'Conveyor System A',
      severity: 'Medium',
      timestamp: '2024-05-08 02:17 PM',
      status: 'Resolved',
      assignedTo: 'Emma Davis'
    },
    {
      id: 4,
      title: 'Maintenance Due',
      machine: 'Assembly Station 3',
      severity: 'Low',
      timestamp: '2024-05-08 11:30 AM',
      status: 'Unresolved',
      assignedTo: 'Unassigned'
    },
    {
      id: 5,
      title: 'Part Inventory Low',
      machine: 'System-wide',
      severity: 'Low',
      timestamp: '2024-05-07 04:50 PM',
      status: 'Resolved',
      assignedTo: 'Sarah Williams'
    }
  ];

  const getSeverityClass = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Unresolved': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Configure Alerts
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium/Low</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search alerts..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Toggle>
            <AlertCircle className="h-4 w-4 mr-2" />
            Critical
          </Toggle>
          <Toggle>
            <AlertCircle className="h-4 w-4 mr-2" />
            High
          </Toggle>
          <Toggle>
            <AlertCircle className="h-4 w-4 mr-2" />
            Medium
          </Toggle>
          <Toggle>
            <AlertCircle className="h-4 w-4 mr-2" />
            Low
          </Toggle>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <FilterX className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Alert</div>
                  <div>Machine</div>
                  <div>Severity</div>
                  <div>Status</div>
                  <div>Assigned To</div>
                  <div>Timestamp</div>
                </div>
                <div className="divide-y">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="grid grid-cols-7 p-4 text-sm items-center hover:bg-muted/50 cursor-pointer">
                      <div className="col-span-2 font-medium">{alert.title}</div>
                      <div>{alert.machine}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getSeverityClass(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getStatusClass(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      <div>{alert.assignedTo}</div>
                      <div>{alert.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unresolved" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Unresolved alerts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Resolved alerts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;
