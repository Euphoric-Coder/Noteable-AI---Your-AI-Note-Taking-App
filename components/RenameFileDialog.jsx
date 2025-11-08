import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Save } from "lucide-react";

export default function RenameFileDialog({
  open,
  onOpenChange,
  fileName,
  onRename,
}) {
  const [newName, setNewName] = useState(fileName);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleRename = async () => {
    if (!newName.trim() || newName === fileName) return;

    setIsRenaming(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    onRename(newName.trim());
    setIsRenaming(false);
    onOpenChange(false);
  };

  const handleOpenChange = (open) => {
    if (!isRenaming) {
      onOpenChange(open);
      if (!open) {
        setNewName(fileName); // Reset to original name if cancelled
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
              <FileText className="h-4 w-4 text-red-600" />
            </div>
            <span>Rename File</span>
          </DialogTitle>
          <DialogDescription>
            Enter a new name for your file. The file extension will be
            preserved.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file-name">File Name</Label>
            <Input
              id="file-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new file name..."
              className="focus:ring-red-400 focus:border-red-400"
              disabled={isRenaming}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isRenaming) {
                  handleRename();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isRenaming}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            disabled={!newName.trim() || newName === fileName || isRenaming}
            className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
          >
            {isRenaming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Renaming...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Rename
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
