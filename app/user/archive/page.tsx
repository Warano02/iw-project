import { BookmarksSidebar } from "@/components/user/dashboard/sidebar";
import { BookmarksHeader } from "@/components/user/dashboard/header";
import { ArchiveContent } from "@/components/user/dashboard/archive-content";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ArchivePage() {
  return (
    <SidebarProvider className="bg-sidebar">
      <BookmarksSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <BookmarksHeader title="Archive" />
          <ArchiveContent />
        </div>
      </div>
    </SidebarProvider>
  );
}

