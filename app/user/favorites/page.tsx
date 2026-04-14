import { BookmarksSidebar } from "@/components/user/dashboard/sidebar";
import { BookmarksHeader } from "@/components/user/dashboard/header";
import { FavoritesContent } from "@/components/user/dashboard/favorites-content";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function FavoritesPage() {
  return (
    <SidebarProvider className="bg-sidebar">
      <BookmarksSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <BookmarksHeader title="Favorites" />
          <FavoritesContent />
        </div>
      </div>
    </SidebarProvider>
  );
}

