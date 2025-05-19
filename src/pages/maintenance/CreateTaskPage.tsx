
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardCheck, ArrowLeft, Calendar } from 'lucide-react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const formSchema = z.object({
  Task_Title: z.string().min(1, "Title is required"),
  Machine_ID: z.string().min(1, "Machine selection is required"),
  Priority: z.string().min(1, "Priority selection is required"),
  Task_Type: z.string().min(1, "Task type is required"),
  Assigned_To: z.string().min(1, "Assignee is required"),
  Estimate_Hours: z.number().min(0.5, "Minimum 0.5 hours").max(24, "Maximum 24 hours"),
  Description: z.string().optional(),
  Parts_Needed: z.string().optional(),
  Scheduled_Date: z.string().min(1, "Scheduled date is required"),
});

type FormValues = z.infer<typeof formSchema>;

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Task_Title: '',
      Machine_ID: '',
      Priority: '',
      Task_Type: '',
      Assigned_To: '',
      Estimate_Hours: 1,
      Description: '',
      Parts_Needed: '',
      Scheduled_Date: new Date().toISOString().split('T')[0], // Default to today
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Add Status with default value when creating
      const taskData = {
        ...values,
        Status: 'Pending', // Default status for new tasks
      };
      
      await createTask(taskData); // Call your API function to create the task
      
      toast.success("Maintenance task created", {
        description: `Task assigned to ${values.Assigned_To}`,
      });
      setTimeout(() => navigate('/maintenance/tasks'), 1500);
    } catch (error) {
      toast.error("Failed to create task", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  // Mock data for selects
  const machines = [
    { id: '1', name: 'CNC Machine #1' },
    { id: '2', name: 'Assembly Line #3' },
    { id: '3', name: 'Robotic Arm #7' },
    { id: '4', name: 'Packaging Unit #2' },
    { id: '5', name: 'Injection Molder #4' },
    { id: '6', name: 'Paint Booth #2' },
  ];

  const technicians = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Williams' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/maintenance/tasks')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Maintenance Task</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>
            Enter the information for the new maintenance task
          </CardDescription>
        </CardHeader>
<CardContent>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="Task_Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Quarterly Maintenance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Machine_ID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Machine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {machines.map(machine => (
                    <SelectItem key={machine.id} value={machine.id}>{machine.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Task_Type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Routine">Routine Maintenance</SelectItem>
                  <SelectItem value="Repair">Repair</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                  <SelectItem value="Upgrade">Upgrade</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Assigned_To"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Technician" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {technicians.map(tech => (
                    <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Scheduled_Date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Scheduled Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Estimate_Hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Hours</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0.5" 
                  max="24" 
                  step="0.5" 
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Detailed description of the task"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="Parts_Needed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Parts Needed (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List any parts that will be needed for this task"
                {...field}
              />
            </FormControl>
            <FormDescription>Enter one part per line or part numbers separated by commas</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate('/maintenance/tasks')}
        >
          Cancel
        </Button>
        <Button type="submit">
          <ClipboardCheck className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
    </form>
  </Form>
</CardContent>
      </Card>
    </div>
  );
};

export default CreateTaskPage;
