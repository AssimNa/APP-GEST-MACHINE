
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useHotkeys } from '@/hooks/use-hotkeys';
import { toast } from '@/components/ui/use-toast';

// Type definitions for search results
type SearchResultItem = {
  id: number | string;
  name: string;
  route: string;
  description?: string;
  tags?: string[];
};

type SearchResults = {
  machines: SearchResultItem[];
  tasks: SearchResultItem[];
  parts: SearchResultItem[];
  users: SearchResultItem[];
  reports: SearchResultItem[];
};

// Mock data for search results - would be replaced with real data in production
const mockSearchResults: SearchResults = {
  machines: [
    { id: 1, name: "CNC Machine #1", route: "/machines/1", description: "Main production CNC machine", tags: ["production", "cnc"] },
    { id: 2, name: "Assembly Line #3", route: "/machines/2", description: "Secondary assembly line", tags: ["assembly", "production"] },
    { id: 3, name: "Packaging Unit #2", route: "/machines/3", description: "Automated packaging system", tags: ["packaging"] },
  ],
  tasks: [
    { id: 1, name: "Hydraulic System Maintenance", route: "/maintenance/tasks", description: "Regular hydraulic system check", tags: ["hydraulic", "maintenance"] },
    { id: 2, name: "Belt Replacement", route: "/maintenance/tasks", description: "Scheduled belt replacement for CNC machines", tags: ["belt", "replacement"] },
    { id: 3, name: "Calibration", route: "/maintenance/tasks", description: "Annual machine calibration", tags: ["calibration"] },
  ],
  parts: [
    { id: 1, name: "Hydraulic Filter HF-238", route: "/inventory", description: "Standard hydraulic filter", tags: ["filter", "hydraulic"] },
    { id: 2, name: "Drive Belt B-450", route: "/inventory", description: "Heavy-duty drive belt", tags: ["belt", "drive"] },
    { id: 3, name: "Control Board CB-17X", route: "/inventory", description: "Main control board for assembly units", tags: ["electronics", "control"] },
  ],
  users: [
    { id: 1, name: "Maintenance Team", route: "/users", description: "Maintenance staff access", tags: ["staff", "maintenance"] },
    { id: 2, name: "Operations Manager", route: "/users", description: "Management access", tags: ["management"] },
    { id: 3, name: "Technician Group", route: "/users", description: "Technical staff access", tags: ["staff", "technical"] },
  ],
  reports: [
    { id: 1, name: "Monthly Maintenance Report", route: "/reports", description: "Scheduled maintenance summary", tags: ["report", "maintenance"] },
    { id: 2, name: "Equipment Downtime Analysis", route: "/reports", description: "Downtime statistics and analysis", tags: ["analysis", "downtime"] },
    { id: 3, name: "Inventory Status Report", route: "/reports", description: "Current inventory levels", tags: ["report", "inventory"] },
  ],
};

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResults>(mockSearchResults);
  const navigate = useNavigate();
  const location = useLocation();

  // Register keyboard shortcut
  useHotkeys("ctrl+k, cmd+k", (e) => {
    e.preventDefault();
    setOpen((open) => !open);
  }, []);

  // Update search results when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults(mockSearchResults);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();
    
    // Filter each category based on query
    const filtered: SearchResults = {
      machines: mockSearchResults.machines.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ),
      tasks: mockSearchResults.tasks.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ),
      parts: mockSearchResults.parts.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ),
      users: mockSearchResults.users.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ),
      reports: mockSearchResults.reports.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      ),
    };

    setFilteredResults(filtered);
  }, [query]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setQuery('');
        setFilteredResults(mockSearchResults);
      }, 200); // Small delay to avoid flickering during close animation
    }
  }, [open]);

  const handleSelect = (route: string, itemName: string) => {
    setOpen(false);
    
    // Only navigate if the route is different from current location
    if (location.pathname !== route) {
      navigate(route);
      toast({
        title: "Navigated to search result",
        description: `Opened "${itemName}"`,
        duration: 3000,
      });
    }
  };

  // Count total results
  const totalResults = Object.values(filteredResults).reduce(
    (acc, category) => acc + category.length, 0
  );

  return (
    <>
      {/* Clickable search input that opens command dialog */}
      <div 
        className="relative w-full max-w-md cursor-pointer" 
        onClick={() => setOpen(true)}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm text-muted-foreground">
          Search machines, tasks, parts... <CommandShortcut>⌘K</CommandShortcut>
        </div>
      </div>
      
      {/* Command dialog for search results */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search machines, tasks, parts..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {totalResults === 0 && (
            <CommandEmpty>No results found. Try a different search term.</CommandEmpty>
          )}
          
          {filteredResults.machines.length > 0 && (
            <CommandGroup heading="Machines">
              {filteredResults.machines.map((item) => (
                <CommandItem 
                  key={`machine-${item.id}`}
                  onSelect={() => handleSelect(item.route, item.name)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {filteredResults.tasks.length > 0 && (
            <CommandGroup heading="Maintenance Tasks">
              {filteredResults.tasks.map((item) => (
                <CommandItem 
                  key={`task-${item.id}`}
                  onSelect={() => handleSelect(item.route, item.name)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {filteredResults.parts.length > 0 && (
            <CommandGroup heading="Inventory Parts">
              {filteredResults.parts.map((item) => (
                <CommandItem 
                  key={`part-${item.id}`}
                  onSelect={() => handleSelect(item.route, item.name)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredResults.users.length > 0 && (
            <CommandGroup heading="User Management">
              {filteredResults.users.map((item) => (
                <CommandItem 
                  key={`user-${item.id}`}
                  onSelect={() => handleSelect(item.route, item.name)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredResults.reports.length > 0 && (
            <CommandGroup heading="Reports">
              {filteredResults.reports.map((item) => (
                <CommandItem 
                  key={`report-${item.id}`}
                  onSelect={() => handleSelect(item.route, item.name)}
                  className="cursor-pointer flex flex-col items-start"
                >
                  <div className="font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
