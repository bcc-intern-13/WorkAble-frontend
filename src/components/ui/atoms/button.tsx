import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        nav: "bg-secondary border border-secondary text-white font-inter hover:bg-white hover:text-secondary ",
        default:
          "bg-secondary border border-secondary text-white font-medium hover:bg-white hover:text-secondary ",
        lanjut:
          "bg-secondary border border-secondary text-white font-medium hover:bg-bl-06 rounded-xl hover:scale-100 ",
        back:
          "bg-white border border-gray-400 text-gray-400 font-medium hover:bg-gray-100 rounded-xl hover:scale-100",
        login:
          "bg-white border border-secondary text-secondary font-medium hover:bg-secondary hover:text-white ",
        black:
          "bg-white border-2 border-black text-black font-medium hover:bg-black hover:text-white ",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-14 w-full text-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Button = asChild ? Slot.Root : "button"

  return (
    <Button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
