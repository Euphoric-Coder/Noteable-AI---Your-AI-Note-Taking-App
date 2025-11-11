"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLink,
} from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { Sparkles, Trash } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { aiAssist } from "@/lib/aiAssist";
import { toast } from "sonner";
import { useState } from "react";

const MenuBar = ({ editor, fileId }) => {
  const vectorSearchQuery = useAction(api.myActions.search);
  const [linkDialog, setLinkDialog] = useState(false);
  const [aiSuggestDialog, setAiSuggestDialog] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [manualText, setManualText] = useState("");
  const [url, setUrl] = useState("");

  if (!editor) return null;

  // 🔗 Insert link
  const insertLink = () => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setLinkDialog(false);
      setUrl("");
    }
  };

  // 🤖 Run AI Search and Insert Suggestion
  const runAiSuggestion = async (text) => {
    if (!text.trim()) {
      toast.error("Please enter some text for AI suggestion.");
      return;
    }

    toast.info("✨ AI is thinking... please wait");
    try {
      const queryResult = JSON.parse(
        await vectorSearchQuery({ query: text, fileId: fileId.id })
      );

      const response = await aiAssist(text, queryResult[0]?.pageContent || "");

      const cleanResponse = response.replace(/```/g, "").trim();

      if (!cleanResponse || cleanResponse === `""`) {
        toast.error("No meaningful AI response. Try rephrasing your query.");
        return;
      }

      editor.commands.insertContent(`<strong>${text}</strong>`);
      editor.commands.insertContent(cleanResponse);

      toast.success("AI suggestion inserted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("AI suggestion failed. Try again.");
    }
  };

  // ✨ Handle Sparkles Button Click
  const handleAiSuggest = () => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;
    const selected = state.doc.textBetween(from, to, "").trim();

    if (selected) {
      // If text selected, run AI immediately
      setSelectedText(selected);
      console.log("Selected Text for AI Suggestion:", selected);
      console.log("File ID for AI Suggestion:", fileId);
      // runAiSuggestion(selected);
    } else {
      // If no selection, open manual input dialog
      setAiSuggestDialog(true);
    }
  };

  const buttonStyle = (isActive) =>
    `text-md px-3 py-1 rounded-xl transition ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-600 dark:to-purple-700"
        : "text-foreground hover:bg-muted/80 dark:hover:bg-slate-700"
    }`;

  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between rounded-tr-2xl rounded-tl-2xl gap-2 border-r border-l border-2 border-gray-300 p-4 backdrop-blur-md bg-white/60 dark:bg-slate-900/60">
      <div className="flex items-center">
        {/* Headings */}
        {[1, 2, 3].map((level) => (
          <TooltipProvider key={level}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={buttonStyle(editor.isActive("heading", { level }))}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level }).run()
                  }
                >
                  H{level}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Heading {level}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Basic Formatting */}
        {[
          {
            icon: <MdFormatListBulleted size={24} />,
            action: () => editor.chain().focus().toggleBulletList().run(),
            active: editor.isActive("bulletList"),
            label: "Bullet List",
          },
          {
            icon: <MdFormatListNumbered size={24} />,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            active: editor.isActive("orderedList"),
            label: "Numbered List",
          },
          {
            icon: <MdFormatBold size={24} />,
            action: () => editor.chain().focus().toggleBold().run(),
            active: editor.isActive("bold"),
            label: "Bold",
          },
          {
            icon: <MdFormatItalic size={24} />,
            action: () => editor.chain().focus().toggleItalic().run(),
            active: editor.isActive("italic"),
            label: "Italic",
          },
          {
            icon: <MdFormatQuote size={24} />,
            action: () => editor.chain().focus().toggleBlockquote().run(),
            active: editor.isActive("blockquote"),
            label: "Quote",
          },
        ].map((btn, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={buttonStyle(btn.active)}
                  onClick={btn.action}
                >
                  {btn.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{btn.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Link Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={buttonStyle(editor.isActive("link"))}
                onClick={() => setLinkDialog(true)}
              >
                <MdLink className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* AI Suggest */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleAiSuggest} className={buttonStyle()}>
                <Sparkles className="mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>AI Suggest</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Clear Content */}
      <button
        onClick={() => editor.commands.clearContent(true)}
        className="text-gray-500 hover:text-red-500 transition"
      >
        <Trash />
      </button>

      {/* ─────────────── Link Dialog ─────────────── */}
      <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={insertLink}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─────────────── AI Suggest Dialog ─────────────── */}
      <Dialog open={aiSuggestDialog} onOpenChange={setAiSuggestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Suggest</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-2">
            Enter a topic or question for AI to suggest content:
          </p>
          <Input
            placeholder="e.g., Explain the concept of cloud computing"
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                runAiSuggestion(manualText);
                setAiSuggestDialog(false);
                setManualText("");
              }}
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function Editor({ fileId }) {
  const [content, setContent] = useState("");
  const { user } = useUser();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder: "Start taking your notes..." }),
      Document,
      Paragraph,
      Text,
      Link,
      Image,
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none p-4 min-h-screen rounded-3xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="h-full flex flex-col">
      <MenuBar editor={editor} fileId={fileId} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
