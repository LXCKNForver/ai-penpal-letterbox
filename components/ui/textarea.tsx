"use client"

import * as React from "react"

import { useFocusScrollIntoView } from "@/src/hooks/useFocusScrollIntoView"
import { cn } from "@/lib/utils"

function Textarea({ className, onFocus, ...props }: React.ComponentProps<"textarea">) {
  const scrollIntoViewOnFocus = useFocusScrollIntoView<HTMLTextAreaElement>()

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-lg border border-input bg-transparent px-3 py-3 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      onFocus={(event) => {
        onFocus?.(event)
        scrollIntoViewOnFocus(event)
      }}
      {...props}
    />
  )
}

export { Textarea }
