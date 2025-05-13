
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { toast } from 'sonner';

// Mock parts data (in a real app, this would come from an API)
const parts = [
  {
    id: "1",
    name: 'Bearing Assembly',
    sku: 'BRG-1001',
    category: 'Mechanical',
    inStock: 24,
    minStock: 10,
    location: 'Warehouse A, Shelf 3',
    price: '42.99',
    supplier: 'BearingCo Inc.',
    description: 'High-quality bearing assembly for industrial machines',
  },
  {
    id: "2",
    name: 'Hydraulic Pump',
    sku: 'HYD-2023',
    category: 'Hydraulics',
    inStock: 5,
    minStock: 8,
    location: 'Warehouse B, Shelf 2',
    price: '289.50',
    supplier: 'FluidTech Systems',
    description: 'Variable displacement hydraulic pump',
  },
];

const formSchema = z.object({
  name: z.string().min(3, { message: "Part name is required" }),
  sku: z.string().min(3, { message: "SKU is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  inStock: z.coerce.number().nonnegative().int(),
  minStock: z.coerce.number().nonnegative().int(),
  location: z.string().min(3, { message: "Location is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  supplier: z.string().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EditPartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Find part with the matching ID
  const part = parts.find(p => p.id === id);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: part?.name || '',
      sku: part?.sku || '',
      category: part?.category || '',
      inStock: part?.inStock || 0,
      minStock: part?.minStock || 0,
      location: part?.location || '',
      price: part?.price || '',
      supplier: part?.supplier || '',
      description: part?.description || '',
    },
  });

  if (!part) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Part Not Found</h2>
        <p className="mb-6">The part you are looking for does not exist.</p>
        <Button onClick={() => navigate('/inventory')}>
          Return to Inventory
        </Button>
      </div>
    );
  }

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast.success("Part updated successfully", {
      description: `${values.name} has been updated`,
    });
    setTimeout(() => navigate('/inventory'), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/inventory')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Part</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Part Details</CardTitle>
          <CardDescription>
            Update the information for this part
          </CardDescription>
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
                      <FormLabel>Part Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Bearing Assembly" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="BRG-1001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mechanical">Mechanical</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Hydraulics">Hydraulics</SelectItem>
                          <SelectItem value="HVAC">HVAC</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Supplier name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Stock</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Stock Level</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>Alert will be triggered when stock falls below this level</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Warehouse A, Shelf 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="42.99" {...field} />
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
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a description of the part"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/inventory')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Package className="mr-2 h-4 w-4" />
                  Update Part
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPartPage;
