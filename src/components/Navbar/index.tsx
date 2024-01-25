import React, { FC, LegacyRef, MutableRefObject, PropsWithChildren, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useWindowSize } from "@/hooks/useWindowSize"
import { cssProps, media, msToNum, numToMs } from "@/utils/styles"
import { useAppContext } from "@/hooks/useAppContext"
import { Transition } from "../Transition"
import { ThemeToggle } from "./ThemeToggle"
import styles from "./index.module.css"
import Icon from "../Icon"
import { Syncopate } from "next/font/google"
import { useScrollToHash } from "@/hooks/useScrollToHash"
const syncopate = Syncopate({ weight: "700", subsets: ["latin"] })

export default function Navbar() {
  const [current, setCurrent] = useState<null | string>()
  const [target, setTarget] = useState<null | string>()
  // const { themeId } = useTheme()
  //@ts-expect-error
  const { menuOpen, dispatch } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()
  const windowSize = useWindowSize()
  const headerRef = useRef<any>()
  const isMobile = windowSize.w <= media.mobile || windowSize.h <= 696
  const scrollToHash = useScrollToHash()

  // useEffect(() => {
  //   // Prevent ssr mismatch by storing this in state
  //   setCurrent(asPath)
  // }, [asPath])

  // // Handle smooth scroll nav items
  // useEffect(() => {
  //   if (!target || route !== "/") return
  //   setCurrent(`${route}${target}`)
  //   scrollToHash(target, () => setTarget(null))
  // }, [route, scrollToHash, target])

  // Check if a nav item should be active
  const getCurrent = (url: string) => {
    const nonTrailing = current?.endsWith("/") ? current?.slice(0, -1) : current

    if (url === nonTrailing) {
      return "page"
    }

    return undefined
  }

  // Store the current hash to scroll to
  const handleNavItemClick = (event: any) => {
    const hash = event.currentTarget.href.split("#")[1]
    setTarget(null)

    if (hash && pathname === "/") {
      setTarget(`#${hash}`)
      event.preventDefault()
    }
  }

  const handleMobileNavClick = (event: any) => {
    handleNavItemClick(event)
    if (menuOpen) dispatch({ type: "toggleMenu" })
  }

  return (
    <header className="flex flex-col items-center justify-start fixed top-10 left-10 bottom-10 z-10 isolate" ref={headerRef}>
      <Link
        href={pathname === "/" ? "/#intro" : "/"}
        scroll={false}
        data-navbar-item
        className={`flex relative p-2 text-2xl ${syncopate.className}`}
        aria-label="Hamish Williams, Designer"
        onClick={handleMobileNavClick}>
        DP
      </Link>
      {/* <NavToggle onClick={() => dispatch({ type: "toggleMenu" })} menuOpen={menuOpen} /> */}
      <nav className="flex flex-col justify-between items-center flex-1 max-w-0 px-2">
        <div className={`flex flex-row-reverse relative top-1 ${styles.navlist}`}>
          {navLinks.map(({ label, pathname }) => (
            <Link
              href={pathname}
              scroll={false}
              key={label}
              data-navbar-item
              className={`inline-flex items-center relative transition-colors mx-4 text-lg ${styles.link}`}
              aria-current={getCurrent(pathname)}
              onClick={handleNavItemClick}>
              {label}
            </Link>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  )
}

const NavbarIcons: FC<PropsWithChildren<{ desktop: boolean }>> = ({ desktop }) => (
  <div>
    {socialLinks.map(({ label, url, icon }) => (
      <a key={label} data-navbar-item={desktop || undefined} className={`${styles.navIconLink}`} aria-label={label} href={url} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    ))}
  </div>
)

export const navLinks = [
  {
    label: "Projects",
    pathname: "/#project-1",
  },
  {
    label: "Articles",
    pathname: "/articles",
  },
  {
    label: "Details",
    pathname: "/#details",
  },
  {
    label: "Contact",
    pathname: "/contact",
  },
]

export const socialLinks = [
  // {
  //   label: "Twitter",
  //   url: "https://twitter.com/dipanjanpanja6",
  //   icon: "twitter",
  // },
  // {
  //   label: "Figma",
  //   url: "https://www.figma.com/@dipanjanpanja6",
  //   icon: "figma",
  // },
  {
    label: "Github",
    url: "https://github.com/dipanjanpanja6",
    icon: (
      <svg className={`hover:fill-sky-400 active:fill-sky-400 focus:fill-sky-400 fill-white ${styles.navIcon}`} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
      </svg>
    ),
  },
]
