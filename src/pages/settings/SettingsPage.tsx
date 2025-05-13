
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Bell, Shield, Wrench } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system">
            <Wrench className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Update your organization information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" value="Acme Manufacturing, Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-address">Address</Label>
                <Textarea 
                  id="org-address" 
                  value="123 Industrial Parkway, Metropolis, NY 10001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Primary Contact Email</Label>
                <Input id="contact-email" type="email" value="contact@acmemanufacturing.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Primary Contact Phone</Label>
                <Input id="contact-phone" type="tel" value="(555) 123-4567" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>
                Configure application behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="dark-mode" />
                <Label htmlFor="dark-mode">Enable Dark Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="date-format" checked />
                <Label htmlFor="date-format">Use ISO date format (YYYY-MM-DD)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-refresh" checked />
                <Label htmlFor="auto-refresh">Auto-refresh dashboards (every 5 minutes)</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-alerts" checked />
                      <Label htmlFor="email-alerts">Critical alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-maint" checked />
                      <Label htmlFor="email-maint">Maintenance due</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-parts" checked />
                      <Label htmlFor="email-parts">Low parts inventory</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-reports" />
                      <Label htmlFor="email-reports">Scheduled reports</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-alerts" checked />
                      <Label htmlFor="app-alerts">All alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-maint" checked />
                      <Label htmlFor="app-maint">Maintenance tasks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-updates" checked />
                      <Label htmlFor="app-updates">System updates</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Password Policy</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="complex-password" checked />
                  <Label htmlFor="complex-password">Require complex passwords</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="expiration" checked />
                  <Label htmlFor="expiration">Password expiration (90 days)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="unique-passwords" />
                  <Label htmlFor="unique-passwords">Prevent password reuse (last 5 passwords)</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="2fa-admin" checked />
                  <Label htmlFor="2fa-admin">Require for administrators</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="2fa-all" />
                  <Label htmlFor="2fa-all">Require for all users</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Session Settings</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-logout" checked />
                  <Label htmlFor="auto-logout">Auto-logout after inactivity (30 minutes)</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Advanced system configuration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input id="api-endpoint" value="https://api.maintenance-system.com/v1" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                <Input id="data-retention" type="number" value="365" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Backup Settings</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-backup" checked />
                  <Label htmlFor="auto-backup">Automatic daily backups</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="retain-backups" checked />
                  <Label htmlFor="retain-backups">Retain backups for 30 days</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">System Logs</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="verbose-logs" />
                  <Label htmlFor="verbose-logs">Enable verbose logging</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="error-reports" checked />
                  <Label htmlFor="error-reports">Send anonymous error reports</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Current system status and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Version</p>
                  <p>2.5.1</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p>2024-05-01</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Database</p>
                  <p>Connected (PostgreSQL 14.2)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage</p>
                  <p>4.2 GB / 10 GB used</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Check for Updates</Button>
              <Button>Run System Diagnostic</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
