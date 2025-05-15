import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription,
} from '@/components/ui/form';
import { Hash, Tag, FileText, Weight, Package, Save } from 'lucide-react';
import { toast } from 'sonner';

const machineSchema = z.object({
  name: z.string().min(1, 'Required'),
  nIdentification: z.string().min(1, 'Required'),
  designation: z.string().min(1, 'Required'),
  Nserie: z.string().optional(),
  constructeur: z.string().optional(),
  nFicheMachine: z.string().optional(),
  poids: z.string().optional(),
  dimensions: z.string().optional(),
  status: z.enum(['operational', 'inmaintenance', 'warning', 'offline']),
  health: z.string().optional(),
  description: z.string().optional(),
});

type MachineFormData = z.infer<typeof machineSchema>;

export default function EditMachinePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm<MachineFormData>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      name: '',
      nIdentification: '',
      designation: '',
      Nserie: '',
      constructeur: '',
      nFicheMachine: '',
      poids: '',
      dimensions: '',
      status: 'operational',
      health: '',
      description: '',
    },
  });

  // Charger les données existantes
  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/machines/${id}`);
        const data = await res.json();
        form.reset(data);
      } catch (err) {
        toast.error('Erreur lors du chargement de la machine.');
      }
    };

    fetchMachine();
  }, [id, form]);

  const onSubmit = async (data: MachineFormData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/machines/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machine_name: data.name,
          Nmachine: data.nIdentification,
          Description: data.designation,
          Nserie: data.Nserie,
          constructeur: data.constructeur,
          poids: data.poids,
          Dimension: data.dimensions,
          status: data.status,
          health: data.health
        }),
      });

      if (!response.ok) throw new Error('Update failed');

      toast.success('Machine updated successfully');
      navigate('/machines');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update machine');
    }
  };

  return (
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
                  name="Nserie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N° Serie</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="12345" {...field} />
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
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <select className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring" {...field}>
                            <option value="">-- Sélectionner --</option>
                            <option value="operational">Operational</option>
                            <option value="inmaintenance">In Maintenance</option>
                            <option value="warning">Warning</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="health"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health (%)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          placeholder="Ex: 85"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
          </form>
          <div>
           <div className="flex justify-end space-x-4">
    <Button
      variant="outline"
      type="button"
      onClick={() => navigate('/machines')}
    >
      cancel
    </Button>

    <Button type="submit">
      <Save className="mr-2 h-4 w-4" />
      update
    </Button>
  </div>
  </div>
        </Form>
      </CardContent>
    </Card>
  );
}
