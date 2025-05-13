
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Layers,
  Clock,
  Calendar,
  CircleSlash,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  MoreHorizontal,
  Wrench,
  Pencil,
  Trash,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// Mock data
const machines = [
  {
    id: 1,
    name: 'CNC Machine #1',
    model: 'Haas VF-2',
    type: 'CNC',
    status: 'operational',
    health: 92,
    lastMaintenance: '2025-04-25',
    nextMaintenance: '2025-05-25',
    department: 'Production',
    location: 'Floor 1, Bay A',
    uptime: '98.7%',
  },
  {
    id: 2,
    name: 'Assembly Line #3',
    model: 'Custom AL-230',
    type: 'Assembly',
    status: 'maintenance',
    health: 68,
    lastMaintenance: '2025-05-02',
    nextMaintenance: '2025-05-10',
    department: 'Production',
    location: 'Floor 1, Bay C',
    uptime: '85.2%',
  },
  {
    id: 3,
    name: 'Robotic Arm #7',
    model: 'ABB IRB 6700',
    type: 'Robot',
    status: 'operational',
    health: 88,
    lastMaintenance: '2025-04-18',
    nextMaintenance: '2025-05-18',
    department: 'Assembly',
    location: 'Floor 2, Bay B',
    uptime: '95.1%',
  },
  {
    id: 4,
    name: 'Packaging Unit #2',
    model: 'PackTech PT-2000',
    type: 'Packaging',
    status: 'operational',
    health: 95,
    lastMaintenance: '2025-05-01',
    nextMaintenance: '2025-06-01',
    department: 'Shipping',
    location: 'Floor 1, Bay D',
    uptime: '99.3%',
  },
  {
    id: 5,
    name: 'Injection Molder #4',
    model: 'Arburg 570A',
    type: 'Molding',
    status: 'warning',
    health: 76,
    lastMaintenance: '2025-04-12',
    nextMaintenance: '2025-05-12',
    department: 'Production',
    location: 'Floor 2, Bay A',
    uptime: '91.8%',
  },
  {
    id: 6,
    name: 'Paint Booth #2',
    model: 'SprayTech X3',
    type: 'Painting',
    status: 'offline',
    health: 0,
    lastMaintenance: '2025-04-30',
    nextMaintenance: '2025-05-15',
    department: 'Finishing',
    location: 'Floor 3, Bay A',
    uptime: '0%',
  },
];

const recentActivities = [
  {
    id: 1,
    machine: 'CNC Machine #1',
    type: 'Maintenance',
    description: 'Routine inspection completed',
    timestamp: '2025-05-07 14:30',
  },
  {
    id: 2,
    machine: 'Assembly Line #3',
    type: 'Issue',
    description: 'Belt tensioner adjustment needed',
    timestamp: '2025-05-08 09:15',
  },
  {
    id: 3,
    machine: 'Robotic Arm #7',
    type: 'Update',
    description: 'Software update applied',
    timestamp: '2025-05-08 11:45',
  },
];

export const MachinesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState<number | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'maintenance':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'offline':
        return <CircleSlash className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'operational':
        return 'outline';
      case 'maintenance':
        return 'secondary';
      case 'warning':
        return 'warning';
      case 'offline':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'maintenance':
        return 'In Maintenance';
      case 'warning':
        return 'Warning';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-blue-500';
    if (health >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredMachines = machines.filter((machine) => {
    if (selectedTab !== 'all' && machine.status !== selectedTab) {
      return false;
    }
    
    if (searchQuery) {
      return (
        machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });

  const handleEditMachine = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/machines/${id}/edit`);
  };

  const handleDeleteMachine = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMachineToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (machineToDelete) {
      toast.success("Machine deleted successfully");
      setDeleteDialogOpen(false);
      setMachineToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Machines</h1>
          <p className="text-muted-foreground">
            View and manage all machines in the system
          </p>
        </div>
        
        <Button onClick={() => navigate('/machines/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add Machine
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Machines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machines.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Operational Machines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {machines.filter(m => m.status === 'operational').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((machines.filter(m => m.status === 'operational').length / machines.length) * 100).toFixed(1)}% of total machines
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Machines Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {machines.filter(m => m.status === 'maintenance' || m.status === 'warning' || m.status === 'offline').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {machines.filter(m => m.status === 'offline').length} offline, {machines.filter(m => m.status === 'maintenance').length} in maintenance
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10" 
            placeholder="Search machines by name, model, type..." 
          />
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cnc">CNC</SelectItem>
              <SelectItem value="assembly">Assembly</SelectItem>
              <SelectItem value="robot">Robot</SelectItem>
              <SelectItem value="packaging">Packaging</SelectItem>
              <SelectItem value="molding">Molding</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <SelectValue placeholder="Department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="assembly">Assembly</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="finishing">Finishing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full justify-start max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="maintenance">In Maintenance</TabsTrigger>
          <TabsTrigger value="warning">Warning</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
        </TabsList>
        <TabsContent value={selectedTab} className="pt-4">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMachines.map((machine) => (
              <Card key={machine.id} className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/machines/${machine.id}`)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {machine.name}
                      </CardTitle>
                      <CardDescription>{machine.model}</CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(machine.status) as any} className="flex items-center gap-1">
                      {getStatusIcon(machine.status)}
                      {getStatusLabel(machine.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Health</span>
                        <span className="text-sm">{machine.health}%</span>
                      </div>
                      <Progress 
                        value={machine.health} 
                        className="h-2"
                        indicatorClassName={getHealthColor(machine.health)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Department</div>
                        <div className="text-sm font-medium">{machine.department}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm font-medium">{machine.location}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Last Maintenance</div>
                        <div className="text-sm font-medium flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {machine.lastMaintenance}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Next Maintenance</div>
                        <div className="text-sm font-medium flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {machine.nextMaintenance}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {machine.type} • Uptime {machine.uptime}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => handleEditMachine(machine.id, e)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleDeleteMachine(machine.id, e)} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredMachines.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Layers className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No machines found</h3>
              <p className="text-sm text-muted-foreground text-center mt-2 max-w-md">
                No machines match your current filters or search query. Try adjusting your filters or search for something else.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Machine Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {activity.type === 'Maintenance' && (
                      <Wrench className="h-5 w-5 text-blue-500" />
                    )}
                    {activity.type === 'Issue' && (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    {activity.type === 'Update' && (
                      <Layers className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {activity.machine} - {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-sm" onClick={() => toast.info('This would navigate to the activities page')}>
                  View All Activities
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No recent activities</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this machine from the system.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
