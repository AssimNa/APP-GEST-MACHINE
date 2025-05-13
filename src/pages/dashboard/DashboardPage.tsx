
import React from 'react';
import {
  Wrench,
  Package,
  AlertCircle,
  Clock,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Mock data
const maintenanceData = [
  { name: 'Jan', completed: 65, scheduled: 85 },
  { name: 'Feb', completed: 59, scheduled: 72 },
  { name: 'Mar', completed: 80, scheduled: 78 },
  { name: 'Apr', completed: 81, scheduled: 90 },
  { name: 'May', completed: 56, scheduled: 75 },
  { name: 'Jun', completed: 55, scheduled: 60 },
  { name: 'Jul', completed: 40, scheduled: 45 },
];

const uptimeData = [
  { name: 'Mon', value: 98.2 },
  { name: 'Tue', value: 97.8 },
  { name: 'Wed', value: 99.1 },
  { name: 'Thu', value: 98.6 },
  { name: 'Fri', value: 97.9 },
  { name: 'Sat', value: 99.5 },
  { name: 'Sun', value: 99.7 },
];

const machineHealthData = [
  { name: 'Excellent', value: 38 },
  { name: 'Good', value: 45 },
  { name: 'Fair', value: 12 },
  { name: 'Poor', value: 5 },
];

const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#ef4444'];

const recentTasks = [
  {
    id: 1,
    machine: 'CNC Machine #1',
    task: 'Hydraulic System Maintenance',
    assignee: 'John Smith',
    status: 'completed',
    date: '2025-05-07',
  },
  {
    id: 2,
    machine: 'Assembly Line #3',
    task: 'Belt Replacement',
    assignee: 'Anna Johnson',
    status: 'in-progress',
    date: '2025-05-08',
  },
  {
    id: 3,
    machine: 'Packaging Unit #2',
    task: 'Calibration',
    assignee: 'Robert Chen',
    status: 'pending',
    date: '2025-05-09',
  },
  {
    id: 4,
    machine: 'Industrial Robot ARM-201',
    task: 'Software Update',
    assignee: 'Maria Garcia',
    status: 'scheduled',
    date: '2025-05-10',
  },
];

const alerts = [
  {
    id: 1,
    type: 'maintenance',
    message: 'Scheduled maintenance due for CNC Machine #2',
    severity: 'medium',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'inventory',
    message: 'Hydraulic fluid below minimum threshold',
    severity: 'high',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'performance',
    message: 'Assembly line productivity below target by 12%',
    severity: 'low',
    time: '1 day ago',
  },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Machines</p>
                <p className="text-3xl font-bold">142</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">4%</span>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowDown className="h-4 w-4 mr-1 text-destructive" />
              <span className="text-destructive font-medium">2%</span>
              <span className="text-muted-foreground ml-2">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Parts Inventory</p>
                <p className="text-3xl font-bold">1,286</p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <Package className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-muted-foreground">12 parts below minimum</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Alerts</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <div className="p-2 bg-red-500/10 rounded-full">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium text-destructive">2 critical alerts</span>
              <span className="text-muted-foreground ml-2">require attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scheduled" name="Scheduled" fill="#3b82f6" />
                  <Bar dataKey="completed" name="Completed" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Machine Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={machineHealthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {machineHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Maintenance Tasks</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={() => toast.info('This would navigate to the tasks page')}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Machine</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.machine}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <span className={`${getStatusColor(task.status)} inline-flex px-2 py-1 text-xs rounded-md`}>
                          {task.status === 'in-progress' ? 'In Progress' : 
                           task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{task.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Maintenance Schedule</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast.info('Calendar view would open here')}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">CNC Machine #2 Inspection</span>
                </div>
                <Badge variant="outline">9:00 AM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Production Line Maintenance</span>
                </div>
                <Badge variant="outline">1:30 PM</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>System Alerts</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={() => toast.info('This would navigate to the alerts page')}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start p-3 rounded-lg bg-accent/50"
                >
                  <div className="mr-3 mt-0.5">
                    {alert.type === 'maintenance' && (
                      <Wrench className="h-5 w-5 text-blue-500" />
                    )}
                    {alert.type === 'inventory' && (
                      <Package className="h-5 w-5 text-yellow-500" />
                    )}
                    {alert.type === 'performance' && (
                      <Activity className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{alert.message}</p>
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Uptime (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[95, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Uptime']} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name="Uptime"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
