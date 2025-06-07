"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDefaultColorTheme, defaultColorNames } from "@tldraw/tlschema";
import { useMemo } from "react";
import type { ColorName } from "@/lib/tldraw/types";

type ColorTheme = Record<string, unknown>;

const getColorFromTheme = (theme: ColorTheme, colorName: string): string => {
  const colorData = theme[colorName] as { solid?: string } | undefined;
  return colorData?.solid || "#000000";
};

type Props = {
  color?: ColorName;
  onChange: (color: ColorName) => void;
  disabled?: boolean;
};

export function ShapeColorPicker({
  color = "black",
  onChange,
  disabled,
}: Props) {

  const colorTheme = useMemo(
    () => getDefaultColorTheme({ isDarkMode: false }) as ColorTheme,
    []
  );

  const colorOptions: ColorName[] = [...defaultColorNames];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={disabled}
        >
          <div
            className="w-4 h-4 rounded border"
            style={{
              backgroundColor: getColorFromTheme(colorTheme, color),
            }}
          />
          Color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((colorValue) => (
            <button
              key={colorValue}
              className={cn(
                "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                color === colorValue
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "border-gray-300"
              )}
              style={{
                backgroundColor: getColorFromTheme(colorTheme, colorValue),
              }}
              onClick={() => onChange(colorValue)}
              title={colorValue}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
