import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "JIRA Bug Creator - Gerador de Relatórios de Bug",
  description: "Sistema avançado para geração de bug reports formatados para JIRA, desenvolvido para equipe N2",
  keywords: ["JIRA", "Bug Report", "Issue Tracking", "N2", "Support"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-app text-app-primary">
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-app">
            <Header />
            <main className="flex-1 bg-app">
              {children}
            </main>
            <footer className="border-t border-app bg-surface">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="text-center text-sm text-app-secondary">
                  <p>&copy; 2024 JIRA Bug Creator. Sistema para equipe N2 - 10.000+ igrejas atendidas.</p>
                  <p className="mt-1">
                    Desenvolvido com Next.js, TypeScript e Tailwind CSS.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
