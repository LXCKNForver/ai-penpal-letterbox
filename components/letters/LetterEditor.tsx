"use client";

import { useState, type FocusEvent } from "react";
import { useFocusScrollIntoView } from "@/src/hooks/useFocusScrollIntoView";
import { useI18n } from "@/src/i18n/useI18n";

type LetterEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function LetterEditor({ value, onChange }: LetterEditorProps) {
  const { t } = useI18n();
  const [localValue, setLocalValue] = useState("");
  const currentValue = value ?? localValue;
  const scrollIntoViewOnFocus = useFocusScrollIntoView<HTMLTextAreaElement>();

  return (
    <div>
      <textarea
        className="min-h-[315px] w-full resize-none bg-transparent pt-[9px] text-lg leading-[44px] text-ink outline-none placeholder:text-ink-muted/60 [background-attachment:local] [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_43px,var(--line)_43px,var(--line)_44px)] [background-size:100%_44px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        value={currentValue}
        onChange={(event) => {
          setLocalValue(event.target.value);
          onChange?.(event.target.value);
        }}
        onFocus={(event: FocusEvent<HTMLTextAreaElement>) => {
          scrollIntoViewOnFocus(event);
        }}
        placeholder={t("letters.placeholder")}
        maxLength={1000}
      />
      <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted/75">
        <span>{t("letters.helper")}</span>
        <span>{currentValue.length}/1000</span>
      </div>
    </div>
  );
}
