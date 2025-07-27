import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ScrollArea } from '@/components/ui/scroll-area';
    import { EngyxLogo } from '@/components/icons/EngyxLogo';
    import { Menu, X } from 'lucide-react';

    const sidebarVariants = {
      open: { width: '280px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
      closed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };

    const itemVariants = {
      open: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
      closed: { opacity: 0, x: -15, transition: { duration: 0.2 } },
    };

    export default function AdminSidebar({ menuItems, activeTab, onTabChange }) {
      const [isOpen, setIsOpen] = React.useState(true);

      return (
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="bg-secondary/50 border-r border-border h-screen sticky top-0 flex flex-col p-4"
        >
          <div className="flex items-center justify-between mb-10">
            {isOpen && (
              <motion.div variants={itemVariants} initial="closed" animate="open" exit="closed">
                <EngyxLogo className="h-8 w-auto text-primary" />
              </motion.div>
            )}
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:bg-primary/10">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <ScrollArea className="flex-grow">
            <nav className="flex flex-col gap-2">
              {menuItems.map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  onClick={() => onTabChange(item.id)}
                  className={`justify-start h-12 text-sm font-medium ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
                >
                  <item.icon className="h-5 w-5" />
                  {isOpen && <motion.span variants={itemVariants} className="ml-4 whitespace-nowrap">{item.label}</motion.span>}
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </motion.div>
      );
    }