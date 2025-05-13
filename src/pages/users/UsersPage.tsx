
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Search, FilterX, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Administrator',
      department: 'Management',
      status: 'Active',
      lastActive: '2024-05-09 09:23 AM'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'Technician',
      department: 'Maintenance',
      status: 'Active',
      lastActive: '2024-05-09 08:45 AM'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      role: 'Technician',
      department: 'Operations',
      status: 'Active',
      lastActive: '2024-05-08 04:17 PM'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'Viewer',
      department: 'Engineering',
      status: 'Active',
      lastActive: '2024-05-09 10:30 AM'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      role: 'Technician',
      department: 'Maintenance',
      status: 'Inactive',
      lastActive: '2024-04-15 02:50 PM'
    }
  ];

  const getRoleClass = (role) => {
    switch(role) {
      case 'Administrator': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Technician': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Viewer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => navigate('/users/add')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technicians</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-8" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          Filter by Role
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          <FilterX className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Name / Email</div>
                  <div>Role</div>
                  <div>Department</div>
                  <div>Status</div>
                  <div>Last Active</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {users.map((user) => (
                    <div key={user.id} className="grid grid-cols-7 p-4 text-sm items-center hover:bg-muted/50">
                      <div className="col-span-2">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getRoleClass(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                      <div>{user.department}</div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <div>{user.lastActive}</div>
                      <div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roles" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Role and permission management will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>User activity logs will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;
