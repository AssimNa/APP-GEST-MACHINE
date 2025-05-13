
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  Save,
  Tag,
  FileText,
  Hash,
  Package,
  Weight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Machine name is required' }),
  nIdentification: z.string().min(1, { message: 'N° Identification is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
  nSerie: z.string().optional(),
  constructeur: z.string().optional(),
  nFicheMachine: z.string().optional(),
  poids: z.string().optional(),
  dimensions: z.string().optional(),
  description: z.string().optional(),
});

type MachineFormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<MachineFormValues> = {
  name: '',
  nIdentification: '',
  designation: '',
  nSerie: '',
  constructeur: '',
  nFicheMachine: '',
  poids: '',
  dimensions: '',
  description: '',
};

const AddMachinePage = () => {
  const navigate = useNavigate();
  
  const form = useForm<MachineFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: MachineFormValues) => {
    // Here you would typically send the data to your API
    console.log('Form submitted:', data);
    
    // Show success message
    toast.success('Machine added successfully', {
      description: `${data.name} has been added to your machines.`,
    });
    
    // Navigate back to machines list
    navigate('/machines');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Add New Machine</h2>
          <p className="text-muted-foreground">
            Enter the details of the new machine to add it to the system.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/machines')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Machines
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machine Information</CardTitle>
          <CardDescription>
            Fill in the required information about the machine.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Machine name" {...field} />
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
                      <FormLabel>N° Identification*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="ID-123" {...field} />
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
                      <FormLabel>Designation*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Production Equipment" {...field} />
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
                          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="SN-12345" {...field} />
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
                          <Input className="pl-10" placeholder="Manufacturer name" {...field} />
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
                          <Input className="pl-10" placeholder="FM-123" {...field} />
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
                          <Input className="pl-10" placeholder="1200 kg" {...field} />
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
                          <Input className="pl-10" placeholder="2.5m x 1.8m x 1.2m" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="min-h-32" 
                        placeholder="Additional details about the machine..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => navigate('/machines')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Machine
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMachinePage;
