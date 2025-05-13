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

// Mock data avec les nouvelles propriétés
const machines = [
  {
    id: 1,
    Description: 'Machine de découpe CNC haute précision',
    Nserie: 'CNC-2023-001',
    constructeur: 'Haas Automation',
    Nmachine: 'VF-2',
    poids: '1200 kg',
    Dimension: '2.5m x 1.8m x 2.1m',
    status: 'operational',
    health: 92,
  },
  {
    id: 2,
    Description: 'Ligne d\'assemblage automatique',
    Nserie: 'AL-2024-015',
    constructeur: 'Custom Assembly Tech',
    Nmachine: 'AL-230',
    poids: '2500 kg',
    Dimension: '5m x 1.5m x 1.8m',
    status: 'maintenance',
    health: 68,
  },
  {
    id: 3,
    Description: 'Bras robotique industriel 6 axes',
    Nserie: 'RB-2023-042',
    constructeur: 'ABB Robotics',
    Nmachine: 'IRB 6700',
    poids: '800 kg',
    Dimension: '1.5m x 1m x 2m',
    status: 'operational',
    health: 88,
  },
  {
    id: 4,
    Description: 'Unité de conditionnement automatique',
    Nserie: 'PK-2024-008',
    constructeur: 'PackTech Systems',
    Nmachine: 'PT-2000',
    poids: '1800 kg',
    Dimension: '3m x 2m x 2.2m',
    status: 'operational',
    health: 95,
  },
  {
    id: 5,
    Description: 'Mouleur par injection plastique',
    Nserie: 'IM-2022-023',
    constructeur: 'Arburg',
    Nmachine: '570A',
    poids: '3500 kg',
    Dimension: '4m x 2.5m x 2.5m',
    status: 'warning',
    health: 76,
  },
  {
    id: 6,
    Description: 'Cabine de peinture industrielle',
    Nserie: 'PB-2023-011',
    constructeur: 'SprayTech',
    Nmachine: 'X3',
    poids: '2200 kg',
    Dimension: '3.5m x 3m x 2.8m',
    status: 'offline',
    health: 0,
  },
];

const recentActivities = [
  {
    id: 1,
    machine: 'VF-2',
    type: 'Maintenance',
    description: 'Routine inspection completed',
    timestamp: '2025-05-07 14:30',
  },
  {
    id: 2,
    machine: 'AL-230',
    type: 'Issue',
    description: 'Belt tensioner adjustment needed',
    timestamp: '2025-05-08 09:15',
  },
  {
    id: 3,
    machine: 'IRB 6700',
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
        machine.Nmachine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.Nserie.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.constructeur.toLowerCase().includes(searchQuery.toLowerCase())
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
                        {machine.Nmachine}
                      </CardTitle>
                      <CardDescription>{machine.constructeur}</CardDescription>
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
                        <div className="text-xs text-muted-foreground">Serial Number</div>
                        <div className="text-sm font-medium">{machine.Nserie}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Weight</div>
                        <div className="text-sm font-medium">{machine.poids}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Dimensions</div>
                        <div className="text-sm font-medium">{machine.Dimension}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Description</div>
                        <div className="text-sm font-medium line-clamp-2">{machine.Description}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        ID: {machine.id}
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