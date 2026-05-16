"use client";

import { useState } from "react";

type LetterEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function LetterEditor({ value, onChange }: LetterEditorProps) {
  const [localValue, setLocalValue] = useState("");
  const currentValue = value ?? localValue;

  return (
    <div>
      <textarea
        className="min-h-[315px] w-full resize-none bg-transparent pt-[9px] text-lg leading-[44px] text-ink outline-none placeholder:text-ink-muted/60 [background-attachment:local] [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_43px,var(--line)_43px,var(--line)_44px)] [background-size:100%_44px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        value={currentValue}
        onChange={(event) => {
          setLocalValue(event.target.value);
          onChange?.(event.target.value);
        }}
        placeholder={
          "\u4eca\u5929\u60f3\u4ece\u54ea\u91cc\u5f00\u59cb\u5199\u5462\u2026\u2026\n\u4e0d\u7528\u4e00\u4e0b\u5b50\u8bf4\u6e05\u695a\uff0c\u6162\u6162\u5199\u5c31\u597d\u3002"
        }
        maxLength={1000}
      />
      <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted/75">
        <span>{"\u8fd9\u5c01\u4fe1\u4f1a\u6162\u6162\u9001\u5230\u5bf9\u65b9\u624b\u91cc"}</span>
        <span>{currentValue.length}/1000</span>
      </div>
    </div>
  );
}
