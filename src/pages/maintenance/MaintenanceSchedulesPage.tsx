import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Search, FilterX, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MaintenanceSchedulesPage = () => {
  const navigate = useNavigate();
  
  const schedules = [
    {
      id: 1,
      title: 'Quarterly Maintenance',
      machine: 'Production Line 1',
      frequency: 'Quarterly',
      nextDate: '2024-06-15',
      technician: 'John Smith',
      estimatedDuration: '4 hours'
    },
    {
      id: 2,
      title: 'Monthly Inspection',
      machine: 'Packaging Unit 3',
      frequency: 'Monthly',
      nextDate: '2024-06-01',
      technician: 'Emma Davis',
      estimatedDuration: '2 hours'
    },
    {
      id: 3,
      title: 'Annual Overhaul',
      machine: 'Main Generator',
      frequency: 'Yearly',
      nextDate: '2024-08-10',
      technician: 'Michael Johnson',
      estimatedDuration: '2 days'
    },
    {
      id: 4,
      title: 'Weekly Check',
      machine: 'Security Systems',
      frequency: 'Weekly',
      nextDate: '2024-05-20',
      technician: 'Sarah Williams',
      estimatedDuration: '45 minutes'
    },
    {
      id: 5,
      title: 'Semi-annual Calibration',
      machine: 'Quality Control Station',
      frequency: 'Bi-annual',
      nextDate: '2024-07-05',
      technician: 'Robert Brown',
      estimatedDuration: '6 hours'
    }
  ];

  const getFrequencyClass = (frequency) => {
    switch(frequency) {
      case 'Weekly': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Monthly': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Quarterly': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Bi-annual': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Yearly': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Maintenance Schedules</h1>
        <Button onClick={() => navigate('/maintenance/schedules/create')}>
          <Calendar className="mr-2 h-4 w-4" />
          Create Schedule
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search schedules..." className="pl-8" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          Filter
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          <FilterX className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Schedules</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Schedule</div>
                  <div>Machine</div>
                  <div>Frequency</div>
                  <div>Next Date</div>
                  <div>Technician</div>
                  <div>Duration</div>
                </div>
                <div className="divide-y">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="grid grid-cols-7 p-4 text-sm items-center hover:bg-muted/50 cursor-pointer">
                      <div className="col-span-2 font-medium">{schedule.title}</div>
                      <div>{schedule.machine}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getFrequencyClass(schedule.frequency)}`}>
                          {schedule.frequency}
                        </span>
                      </div>
                      <div>{schedule.nextDate}</div>
                      <div>{schedule.technician}</div>
                      <div>{schedule.estimatedDuration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>All schedules will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center items-center p-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-xl font-semibold">Calendar View</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Calendar integration coming soon.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceSchedulesPage;
