import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "success" | "error" | "warning";
  title: string;
  description: string;
  details?: string[];

  // ✅ ADD THESE (IMPORTANT)
  showConfirm?: boolean;
  confirmText?: string;
  onConfirm?: () => void;
}

export function StatusDialog({
  open,
  onOpenChange,
  type,
  title,
  description,
  details,
  showConfirm = false,
  confirmText = "Confirm",
  onConfirm
}: StatusDialogProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-12 w-12 text-green-600" />;
      case "error":
        return <XCircle className="h-12 w-12 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-12 w-12 text-yellow-600" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            {getIcon()}
            <DialogTitle className="text-center text-xl">
              {title}
            </DialogTitle>
          </div>

          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        {details && details.length > 0 && (
          <div className={`rounded-lg border p-4 ${getColors()}`}>
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-sm">•</span>
                  <span className="text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <DialogFooter className="flex justify-center gap-2">
          {/* ✅ YES BUTTON */}
          {showConfirm && (
            <Button onClick={handleConfirm} className="min-w-24">
              {confirmText}
            </Button>
          )}

          {/* CLOSE BUTTON */}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}