import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen bg-muted px-6 py-12 sm:px-20 gap-16 font-sans">
      <main className="flex flex-col items-center justify-center text-center row-start-1">
        <h1 className="text-5xl font-bold mb-4 text-foreground">
          QuickDraw Editor
        </h1>
        <p className="mb-6 text-lg text-muted-foreground max-w-xl">
          Un editor visual simple con Tldraw, Next.js, tRPC y más.
        </p>

        <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground mb-6">
          <span className="px-3 py-1 bg-white rounded-md shadow-sm">
            Next.js
          </span>
          <span className="px-3 py-1 bg-white rounded-md shadow-sm">tRPC</span>
          <span className="px-3 py-1 bg-white rounded-md shadow-sm">
            Tldraw
          </span>
          <span className="px-3 py-1 bg-white rounded-md shadow-sm">
            TailwindCSS
          </span>
          <span className="px-3 py-1 bg-white rounded-md shadow-sm">
            Shadcn UI
          </span>
        </div>

        <div className="flex gap-4">
          <Button size="lg" className="text-base px-6 py-2 w-48">
            <Link href="/editor">✏️ Empezar a dibujar</Link>
          </Button>
          
          <Button size="lg" variant="outline" className="text-base px-6 py-2 w-48">
            <Link href="/api-test">🧪 Probar APIs</Link>
          </Button>
        </div>
      </main>

      <footer className="row-start-2 flex flex-col items-center gap-2 text-sm text-gray-500">
        <span>
          Hecho con <span className="text-blue-500">🛠️</span> para el desafío
          técnico{" "}
        </span>
        <a
          className="hover:underline"
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver código en GitHub
        </a>
      </footer>
    </div>
  );
}