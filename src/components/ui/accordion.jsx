import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext({
  openItem: null,
  toggleItem: () => {},
});

function Accordion({ children, className, defaultValue = null }) {
  const [openItem, setOpenItem] = React.useState(defaultValue);

  const toggleItem = React.useCallback((value) => {
    setOpenItem((prev) => (prev === value ? null : value));
  }, []);

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn("space-y-3.5", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ value, children, className }) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl overflow-hidden border border-white/80 transition-all duration-300",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { value }) : child
      )}
    </div>
  );
}

function AccordionTrigger({ value, children, className }) {
  const { openItem, toggleItem } = React.useContext(AccordionContext);
  const isOpen = openItem === value;

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      className={cn(
        "w-full flex items-center justify-between p-5 sm:p-6 text-left font-display font-bold text-base sm:text-lg text-ink transition-colors hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset min-h-[56px]",
        className
      )}
    >
      <span>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="shrink-0 p-1 rounded-full bg-surface/50 text-accent ml-4"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </button>
  );
}

function AccordionContent({ value, children, className }) {
  const { openItem } = React.useContext(AccordionContext);
  const isOpen = openItem === value;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn("px-5 sm:px-6 pb-6 pt-1 text-muted text-sm sm:text-base leading-relaxed font-sans border-t border-border/30", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
