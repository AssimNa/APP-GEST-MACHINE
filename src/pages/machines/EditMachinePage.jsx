import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  machine_name: z.string().min(1, 'Required').optional(),
  Nmachine: z.string().min(1, 'Required').optional(),
  description: z.string().optional(),
  Nserie: z.union([z.number(), z.string()]).optional(), // Accepts both number and string
  constructeur: z.string().optional(),
  poids: z.union([z.number(), z.string()]).optional(), // Accepts both number and string
  dimension: z.union([z.number(), z.string()]).optional(), // Accepts both number and string
  status: z.enum(['operational', 'inmaintenance', 'warning', 'offline']).optional(),
  health: z.union([z.number(), z.string()]).optional(), // Accepts both number and string
  description: z.string().optional(),
}).partial(); // Makes all fields optional

export default function EditMachinePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      machine_name: '',
      Nmachine: '',
      description: '',
      Nserie: '',
      constructeur: '',
      poids: '',
      dimension: '',
      status: 'operational',
      health: '',
    },
  });

  // Load existing data
  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/machines/${id}`);
        const data = await res.json();
        form.reset(data);
      } catch (err) {
        toast.error('Error loading machine data.');
      }
    };

    fetchMachine();
  }, [id, form]);

  const onSubmit = async (data) => {
      console.log("Form submitted with data:", data);

    try {
      const response = await fetch(`http://localhost:5000/api/machines/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machine_name: data.machine_name,
          Nmachine: data.Nmachine,
          Description: data.description,
          Nserie: data.Nserie,
          constructeur: data.constructeur,
          poids: data.poids,
          Dimension: data.dimension,
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
          <form onSubmit={(e) => {
  e.preventDefault();
  form.handleSubmit(onSubmit)(e);
}} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="machine_name"
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
                name="Nmachine"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description*</FormLabel>
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
                name="dimension"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>dimension</FormLabel>
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
                          <option value="">-- Select --</option>
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
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate('/machines')}
              >
                Cancel
              </Button>

              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Update
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}