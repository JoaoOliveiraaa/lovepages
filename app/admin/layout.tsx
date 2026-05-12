import type { Metadata } from "next"
import { AdminMobileHeader, AdminDesktopSidebar } from "@/components/admin/admin-sidebar"

export const metadata: Metadata = {
  title: "Admin | LovePage",
  description: "Painel administrativo do LovePage",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile header */}
      <AdminMobileHeader />

      <div className="flex">
        {/* Desktop sidebar */}
        <AdminDesktopSidebar />

        {/* Main content */}
        <main className="flex-1 lg:pl-64">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
