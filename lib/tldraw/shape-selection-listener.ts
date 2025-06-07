
import { hasColorProp } from "@/lib/tldraw/utils";
import { defaultColorNames } from "@tldraw/tlschema";
import { Editor, TLShapeId } from "tldraw";
import type { ColorName } from "@/lib/tldraw/types";

export const setupShapeSelectionListener = (
  editor: Editor,
  setSelectedShapeId: (id: TLShapeId | null) => void,
  setSelectedColor: (color: ColorName) => void
) => {
  let lastSelectedId: TLShapeId | null = null;

  const handleTick = () => {
    const selected = editor.getSelectedShapeIds();
    const currentId = selected.length === 1 ? selected[0] : null;

    if (currentId === lastSelectedId) return;
    lastSelectedId = currentId;

    const shape = currentId ? editor.getShape(currentId) : null;

    if (shape?.props && hasColorProp(shape.props)) {
      setSelectedShapeId(shape.id);
      const color = shape.props.color as ColorName;
      setSelectedColor(defaultColorNames.includes(color) ? color : "black");
    } else {
      setSelectedShapeId(null);
    }
  };

  editor.on("tick", handleTick);
  return () => editor.off("tick", handleTick);
};
