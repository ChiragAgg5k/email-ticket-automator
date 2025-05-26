import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  setIsMenuOpen: (isMenuOpen: boolean) => void,
) => {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#")) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
