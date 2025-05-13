
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Clock, Calendar } from 'lucide-react';

const ReportsPage = () => {
  const navigate = useNavigate();
  
  const reports = [
    {
      id: 1,
      title: 'Monthly Maintenance Summary',
      type: 'Maintenance',
      date: '2024-04-30',
      author: 'System',
      format: 'PDF'
    },
    {
      id: 2,
      title: 'Machine Uptime Analysis',
      type: 'Performance',
      date: '2024-04-15',
      author: 'John Smith',
      format: 'Excel'
    },
    {
      id: 3,
      title: 'Q1 2024 Parts Usage',
      type: 'Inventory',
      date: '2024-04-01',
      author: 'System',
      format: 'PDF'
    },
    {
      id: 4,
      title: 'Technician Productivity',
      type: 'Personnel',
      date: '2024-03-31',
      author: 'Sarah Williams',
      format: 'PDF'
    },
    {
      id: 5,
      title: 'Annual Equipment Review',
      type: 'Asset Management',
      date: '2024-01-15',
      author: 'System',
      format: 'PDF/Excel'
    }
  ];

  const getTypeClass = (type) => {
    switch(type) {
      case 'Maintenance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Performance': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Inventory': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Personnel': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Asset Management': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <Button onClick={() => navigate('/reports/generate')}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Set to run automatically
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground mt-1">
              In the last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Report Name</div>
                  <div>Type</div>
                  <div>Date</div>
                  <div>Author</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {reports.map((report) => (
                    <div key={report.id} className="grid grid-cols-6 p-4 text-sm items-center hover:bg-muted/50">
                      <div className="col-span-2 font-medium">{report.title}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getTypeClass(report.type)}`}>
                          {report.type}
                        </span>
                      </div>
                      <div>{report.date}</div>
                      <div>{report.author}</div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          {report.format}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Scheduled reports will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Report templates will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
