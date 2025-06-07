"use client";

import { trpc } from "@/trpc/client";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Tldraw,
  createTLStore,
  getSnapshot,
  loadSnapshot,
  DefaultSpinner,
  Editor,
  TLStoreSnapshot,
  TLShapeId,
} from "tldraw";
import { throttle } from "lodash";
import { ShapeColorPicker } from "@/components/ui/shape-color-picker";
import { hasColorProp } from "@/lib/tldraw/utils";
import { setupShapeSelectionListener } from "@/lib/tldraw/shape-selection-listener";
import { Button } from "@/components/ui/button";
import type { ColorName } from "@/lib/tldraw/types";
import Link from "next/link";
import "tldraw/tldraw.css";

export default function EditorPage() {
  const store = useMemo(() => createTLStore(), []);
  const editorRef = useRef<Editor | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<TLShapeId | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<ColorName>("black");

  const [loadingState, setLoadingState] = useState<
    | { status: "loading" }
    | { status: "ready" }
    | { status: "error"; error: string }
  >({ status: "loading" });

  const getDoc = trpc.getDocument.useQuery(undefined, { enabled: false });
  const saveDoc = trpc.saveDocument.useMutation();

  useLayoutEffect(() => {
    setLoadingState({ status: "loading" });
    getDoc.refetch().then((res) => {
      if (res.data && res.data.snapshot) {
        try {
          loadSnapshot(store, res.data.snapshot as unknown as TLStoreSnapshot);
          setLoadingState({ status: "ready" });
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          setLoadingState({ status: "error", error: errorMessage });
        }
      } else if (res.error) {
        setLoadingState({ status: "error", error: res.error.message });
      } else {
        setLoadingState({ status: "ready" });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const cleanup = store.listen(
      throttle(() => {
        const snapshot = getSnapshot(store);
        saveDoc.mutate({ snapshot });
      }, 1000)
    );
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  if (loadingState.status === "loading") {
    return (
      <div className="tldraw__editor h-[600px] flex items-center justify-center">
        <DefaultSpinner />
      </div>
    );
  }

  if (loadingState.status === "error") {
    return (
      <div className="tldraw__editor h-[600px] flex items-center justify-center">
        <div>Error: {loadingState.error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  gap-4 p-4 h-full w-full">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <Button asChild variant="outline" size="sm">
          <Link href="/">🏠 Volver al Inicio</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/api-test">🧪 Probar APIs</Link>
        </Button>
      </div>
      <div className="w-full max-w-5xl bg-blue-100 border border-blue-300 text-blue-900 rounded p-4 text-sm shadow">
        🧪 <strong>Prueba técnica:</strong> Se implementó una paleta
        personalizada para cambiar el color de una figura seleccionada.
        <br />
        👉 Para probarla, <strong>creá y seleccioná una figura</strong> en el
        lienzo. Al hacerlo, aparecerá un botón con la paleta de colores
        alternativa para modificarla.
      </div>
      <div className="flex gap-2">
        <ShapeColorPicker
          color={selectedColor}
          onChange={(newColor) => {
            const shape = editorRef.current?.getShape(selectedShapeId!);
            if (shape?.props && hasColorProp(shape.props)) {
              editorRef.current?.updateShape({
                ...shape,
                props: {
                  ...shape.props,
                  color: newColor,
                },
              });
              setSelectedColor(newColor);
            }
          }}
          disabled={!selectedShapeId}
        />
      </div>
      <div className="tldraw__editor h-[600px] w-full max-w-5xl">
        <Tldraw
          store={store}
          onMount={(editor) => {
            editorRef.current = editor;
            setupShapeSelectionListener(
              editor,
              setSelectedShapeId,
              setSelectedColor
            );
          }}
        />
      </div>
    </div>
  );
}
