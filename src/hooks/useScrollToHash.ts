import { useReducedMotion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useRef } from "react"

export function useScrollToHash() {
  const scrollTimeout = useRef<NodeJS.Timeout>()
  const { push } = useRouter()
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const scrollToHash = useCallback(
    (hash: string, onDone?: () => void) => {
      const id = hash.split("#")[1]
      const targetElement = document.getElementById(id)
      const newPath = `${pathname}#${id}`

      targetElement?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current)

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener("scroll", handleScroll)

          if (window.location.pathname === pathname) {
            onDone?.()
            push(newPath)
          }
        }, 50)
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
        clearTimeout(scrollTimeout.current)
      }
    },
    [push, reduceMotion, pathname]
  )

  return scrollToHash
}
