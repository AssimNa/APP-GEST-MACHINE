
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Search, FileText, Video, Book } from 'lucide-react';

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I create a maintenance task?",
      answer: "To create a maintenance task, navigate to the Maintenance page and click on the 'Create Task' button. Fill out the required fields in the form and click 'Save' to create the task."
    },
    {
      question: "How do I assign a technician to a task?",
      answer: "When creating or editing a maintenance task, you can assign a technician using the dropdown menu in the form. Only users with the Technician role will be displayed in this list."
    },
    {
      question: "How do I track machine downtime?",
      answer: "Machine downtime is automatically tracked when you mark a machine as 'Down for Maintenance' in the machine details page. You can view downtime reports in the Analytics section."
    },
    {
      question: "How do I set up scheduled maintenance?",
      answer: "Navigate to the Maintenance > Schedules section and click on 'Create Schedule'. Choose the machine, maintenance type, frequency, and assign technicians as needed."
    },
    {
      question: "How do I generate reports?",
      answer: "Go to the Reports section and click on 'Generate Report'. Select the report type, date range, and any other filters, then click 'Generate'."
    }
  ];

  const videos = [
    { title: "Getting Started Guide", duration: "5:32", thumbnail: "thumbnail1.jpg" },
    { title: "Creating Maintenance Tasks", duration: "4:17", thumbnail: "thumbnail2.jpg" },
    { title: "Machine Management", duration: "6:45", thumbnail: "thumbnail3.jpg" },
    { title: "Inventory Management", duration: "3:58", thumbnail: "thumbnail4.jpg" },
    { title: "Reporting and Analytics", duration: "7:22", thumbnail: "thumbnail5.jpg" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
      </div>
      
    

      <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Tutorial Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-4 mt-6">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Can't find an answer?</CardTitle>
              <CardDescription>
                Submit a question to our support team and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Subject" />
              </div>
              <div className="space-y-2">
                <Textarea 
                  placeholder="Describe your question in detail..." 
                  className="min-h-32"
                />
              </div>
              <Button>Submit Question</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Book className="h-8 w-8 text-primary mb-2" />
                <CardTitle>User Guides</CardTitle>
                <CardDescription>Step-by-step guides for using the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="link" className="p-0 h-auto justify-start">Getting Started Guide</Button>
                <Button variant="link" className="p-0 h-auto justify-start">Machine Management</Button>
                <Button variant="link" className="p-0 h-auto justify-start">Maintenance Scheduling</Button>
                <Button variant="link" className="p-0 h-auto justify-start">Parts Inventory</Button>
                <Button variant="link" className="p-0 h-auto justify-start">Reporting</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Book className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Administrator Guides</CardTitle>
                <CardDescription>Documentation for system administrators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="link" className="p-0 h-auto justify-start">User Management</Button>
                <Button variant="link" className="p-0 h-auto justify-start">System Configuration</Button>
                <Button variant="link" className="p-0 h-auto justify-start">Data Backup & Recovery</Button>
                <Button variant="link" className="p-0 h-auto justify-start">API Documentation</Button>
                <Button variant="link" className="p-0 h-auto justify-start">Security Settings</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Release Notes</CardTitle>
              <CardDescription>Latest updates and changes to the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Version 2.5.1 (May 1, 2024)</h3>
                <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
                  <li>Added new parts inventory tracking features</li>
                  <li>Improved maintenance scheduling interface</li>
                  <li>Fixed issue with report generation</li>
                  <li>Performance optimizations for large datasets</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Version 2.5.0 (April 10, 2024)</h3>
                <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
                  <li>Added machine performance analytics dashboard</li>
                  <li>Implemented advanced filtering in reports</li>
                  <li>Updated user interface for better mobile experience</li>
                  <li>Various bug fixes and improvements</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted relative flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                  <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                </div>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="outline" className="w-full">
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Playlists</CardTitle>
              <CardDescription>Organized collections of tutorial videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Getting Started Series</h3>
                    <p className="text-sm text-muted-foreground">5 videos</p>
                  </div>
                  <Button variant="outline" size="sm">View Playlist</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Management</h3>
                    <p className="text-sm text-muted-foreground">8 videos</p>
                  </div>
                  <Button variant="outline" size="sm">View Playlist</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Advanced Reporting</h3>
                    <p className="text-sm text-muted-foreground">4 videos</p>
                  </div>
                  <Button variant="outline" size="sm">View Playlist</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpPage;
