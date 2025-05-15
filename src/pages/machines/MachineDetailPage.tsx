
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wrench, Calendar, FileText, AlertCircle, Package, Hash, Tag, Weight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MachineDetailPage = () => {
  const { id } = useParams();

  // In a real app, you would fetch the machine data based on the ID
  const machine = {
    id,
    name: `Machine ${id}`,
    nIdentification: `ID-${id}`,
    designation: 'Production Equipment',
    Nserie: `SN-${id}000`,
    constructeur: 'Industrial Equipment Co.',
    nFicheMachine: `FM-${id}`,
    poids: '1200 kg',
    dimensions: '2.5m x 1.8m x 1.2m',
    status: 'Operational',
    healthScore: 85,
    lastMaintenance: '2023-12-05',
    nextScheduledMaintenance: '2024-06-20'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{machine.name}</h1>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium 
            ${machine.status === 'Operational' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
            {machine.status}
          </span>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Machine Information</CardTitle>
            <CardDescription>Technical details and specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <Hash className="inline h-4 w-4 mr-1" /> N° Identification
                </dt>
                <dd className="text-sm font-semibold">{machine.nIdentification}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <Tag className="inline h-4 w-4 mr-1" /> Designation
                </dt>
                <dd className="text-sm font-semibold">{machine.designation}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <Tag className="inline h-4 w-4 mr-1" /> N° Serie
                </dt>
                <dd className="text-sm font-semibold">{machine.Nserie}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <FileText className="inline h-4 w-4 mr-1" /> Constructeur
                </dt>
                <dd className="text-sm font-semibold">{machine.constructeur}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <FileText className="inline h-4 w-4 mr-1" /> N° Fiche Machine
                </dt>
                <dd className="text-sm font-semibold">{machine.nFicheMachine}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <Weight className="inline h-4 w-4 mr-1" /> Poids
                </dt>
                <dd className="text-sm font-semibold">{machine.poids}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  <Package className="inline h-4 w-4 mr-1" /> Dimensions
                </dt>
                <dd className="text-sm font-semibold">{machine.dimensions}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
            <CardDescription>Current health and maintenance status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Health Score</span>
                <span className="text-sm font-semibold">{machine.healthScore}%</span>
              </div>
              <Progress value={machine.healthScore} 
                indicatorClassName={`${
                  machine.healthScore > 70 ? 'bg-green-500' :
                  machine.healthScore > 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Last Maintenance</dt>
                <dd className="text-sm font-semibold">{machine.lastMaintenance}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Next Scheduled</dt>
                <dd className="text-sm font-semibold">{machine.nextScheduledMaintenance}</dd>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="maintenance-history">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
          <TabsTrigger value="maintenance-history">
            <Wrench className="mr-2 h-4 w-4" />
            Maintenance History
          </TabsTrigger>
          <TabsTrigger value="schedules">
            <Calendar className="mr-2 h-4 w-4" />
            Schedules
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="parts">
            <Package className="mr-2 h-4 w-4" />
            Parts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="maintenance-history" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No maintenance history available yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedules" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No scheduled maintenance available yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documentation" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No documentation available yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parts" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No parts information available yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MachineDetailPage;
