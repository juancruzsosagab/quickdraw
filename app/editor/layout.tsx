import { ReactNode } from "react";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-start px-4">
      <header className="py-6 text-center">
        <h1 className="text-3xl font-bold">QuickDraw Editor</h1>
        <p className="text-sm text-gray-500 mt-1">
          Dibujá, editá y guardá tus ideas visuales fácilmente
        </p>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center bg-red">
        {children}
      </main>

      <footer className="py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} QuickDraw — 🧪 Prueba técnica desarrollada
        con Next.js, Tldraw y tRPC
      </footer>
    </div>
  );
}
