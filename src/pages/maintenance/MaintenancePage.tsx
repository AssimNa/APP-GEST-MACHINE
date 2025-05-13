import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarCheck, Wrench, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MaintenancePage = () => {
  const navigate = useNavigate();

  const handleCreateTask = () => {
    navigate('/maintenance/tasks/create');
  };

  const handleCreateSchedule = () => {
    navigate('/maintenance/schedules/create');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
        <div className="flex space-x-2">
          <Button onClick={handleCreateTask}>
            <Wrench className="mr-2 h-4 w-4" />
            Create Task
          </Button>
          <Button onClick={handleCreateSchedule}>
            <Calendar className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks" onClick={() => navigate('/maintenance/tasks')}>Tasks</TabsTrigger>
          <TabsTrigger value="schedules" onClick={() => navigate('/maintenance/schedules')}>Schedules</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-1">
                  4 due today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Schedules</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground mt-1">
                  2 this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +5 this month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Maintenance</CardTitle>
                <CardDescription>Last 5 maintenance tasks completed</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">Machine {item}</p>
                        <p className="text-sm text-muted-foreground">Routine maintenance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{new Date().toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">Tech: John D.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Maintenance</CardTitle>
                <CardDescription>Next 5 scheduled maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div 
                      key={item} 
                      className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">Machine {item + 5}</p>
                        <p className="text-sm text-muted-foreground">Quarterly inspection</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{new Date(Date.now() + item * 86400000).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">Assigned: Sarah L.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenancePage;
