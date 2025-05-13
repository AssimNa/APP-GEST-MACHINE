
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  Package, 
  Wrench,
  AlertCircle,
  ChevronRight,
  Layers,
  Activity,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isAdmin = user?.role === 'admin';
  const isTechnician = user?.role === 'technician' || isAdmin;
  
  const menuItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      title: 'Machines',
      href: '/machines',
      icon: <Layers size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      title: 'Maintenance',
      href: '/maintenance',
      icon: <Wrench size={18} />,
      roles: ['admin', 'technician', 'viewer'],
      subItems: [
        {
          title: 'Tasks',
          href: '/maintenance/tasks',
          roles: ['admin', 'technician', 'viewer'],
        },
        {
          title: 'Schedules',
          href: '/maintenance/schedules',
          roles: ['admin', 'technician', 'viewer'],
        }
      ]
    },
    {
      title: 'Parts Inventory',
      href: '/inventory',
      icon: <Package size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: <FileText size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      title: 'Alerts',
      href: '/alerts',
      icon: <AlertCircle size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: <Activity size={18} />,
      roles: ['admin'],
    },
    {
      title: 'User Management',
      href: '/users',
      icon: <Users size={18} />,
      roles: ['admin'],
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      title: 'Help',
      href: '/help',
      icon: <HelpCircle size={18} />,
      roles: ['admin', 'technician', 'viewer'],
    }
  ];

  const isItemActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center mr-2">
            <Wrench className="h-3 w-3 text-white" />
          </div>
          <span className="font-semibold text-lg">MMMS</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="px-2 space-y-1">
          {menuItems
            .filter((item) => item.roles.includes(user?.role || 'viewer'))
            .map((item) => {
              if (item.subItems) {
                return (
                  <li key={item.href}>
                    <Collapsible 
                      defaultOpen={isItemActive(item.href)}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                            isItemActive(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          )}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3">{item.title}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="pl-6 mt-1 space-y-1">
                          {item.subItems.filter((subItem) => 
                            subItem.roles.includes(user?.role || 'viewer')
                          ).map((subItem) => (
                            <li key={subItem.href}>
                              <NavLink
                                to={subItem.href}
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                  )
                                }
                              >
                                <ChevronRight className="h-3 w-3 mr-1" />
                                {subItem.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                );
              }
              
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-2 rounded-md text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )
                    }
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center p-2 rounded-md bg-sidebar-accent">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Users size={14} className="text-primary" />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
