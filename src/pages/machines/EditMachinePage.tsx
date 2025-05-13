
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Hash, Tag, FileText, Weight, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

// Sample data for a machine
const machineData = {
  '1': {
    name: 'CNC Machine #1',
    nIdentification: 'ID-1001',
    designation: 'Production Equipment',
    nSerie: 'SN-78901234',
    constructeur: 'Haas Automation',
    nFicheMachine: 'FM-5678',
    poids: '1200 kg',
    dimensions: '2.5m x 1.8m x 1.2m'
  },
  '2': {
    name: 'Assembly Line #3',
    nIdentification: 'ID-1002',
    designation: 'Assembly Equipment',
    nSerie: 'AL-2022-003',
    constructeur: 'Internal Build',
    nFicheMachine: 'FM-9012',
    poids: '3500 kg',
    dimensions: '12m x 3m x 2.2m'
  }
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  nIdentification: z.string().min(1, { message: "Identification number is required." }),
  designation: z.string().min(1, { message: "Designation is required." }),
  nSerie: z.string().min(1, { message: "Serial number is required." }),
  constructeur: z.string().min(1, { message: "Manufacturer is required." }),
  nFicheMachine: z.string().min(1, { message: "Machine sheet number is required." }),
  poids: z.string().optional(),
  dimensions: z.string().optional(),
});

const EditMachinePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const machine = id ? machineData[id] : null;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: machine?.name || '',
      nIdentification: machine?.nIdentification || '',
      designation: machine?.designation || '',
      nSerie: machine?.nSerie || '',
      constructeur: machine?.constructeur || '',
      nFicheMachine: machine?.nFicheMachine || '',
      poids: machine?.poids || '',
      dimensions: machine?.dimensions || '',
    }
  });
  
  if (!machine) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Machine Not Found</h2>
        <p className="mb-6">The machine you are trying to edit does not exist.</p>
        <Button onClick={() => navigate('/machines')}>
          Return to Machines
        </Button>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Machine updated successfully");
    setTimeout(() => navigate('/machines'), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/machines')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Machine</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machine Information</CardTitle>
          <CardDescription>Edit details for this machine</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Machine Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nIdentification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° Identification</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="ID-1001" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Production Equipment" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nSerie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° Serie</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="SN-78901234" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="constructeur"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Constructeur</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Manufacturer name" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nFicheMachine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° Fiche Machine</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="FM-5678" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="poids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poids</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="1200 kg" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="2.5m x 1.8m x 1.2m" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/machines')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Update Machine
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMachinePage;
