import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogContext = React.createContext({
  open: false,
  setOpen: () => {},
});

function Dialog({ open, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = React.useCallback(
    (val) => {
      if (isControlled) {
        onOpenChange?.(val);
      } else {
        setInternalOpen(val);
      }
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, asChild = false, ...props }) {
  const { setOpen } = React.useContext(DialogContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(true)} {...props}>
      {children}
    </button>
  );
}

function DialogContent({ children, className, ...props }) {
  const { open, setOpen } = React.useContext(DialogContext);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className={cn(
              "relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-white/90 text-ink",
              className
            )}
            {...props}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-muted hover:text-ink hover:bg-surface/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-5", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "font-display font-bold text-xl sm:text-2xl text-ink tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-xs sm:text-sm text-muted font-sans", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
