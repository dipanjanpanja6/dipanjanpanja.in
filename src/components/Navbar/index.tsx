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
  const { menuOpen, dispatch } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()
  const windowSize = useWindowSize()
  const headerRef = useRef<HTMLElement>()
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
  const getCurrent = (url = "") => {
    const nonTrailing = current?.endsWith("/") ? current?.slice(0, -1) : current

    if (url === nonTrailing) {
      return "page"
    }

    return ""
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
        className={`flex relative p-2 ${syncopate.className}`}
        aria-label="Hamish Williams, Designer"
        onClick={handleMobileNavClick}>
        {/* <Monogram highlight /> */}
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
              className="inline-flex items-center relative transition-colors mx-4 text-lg"
              // aria-current={getCurrent(pathname)}
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
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a key={label} data-navbar-item={desktop || undefined} className={styles.navIconLink} aria-label={label} href={url} target="_blank" rel="noopener noreferrer">
        <Icon className={styles.navIcon} icon={icon} />
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
  {
    label: "Twitter",
    url: "https://twitter.com/dipanjanpanja6",
    icon: "twitter",
  },
  {
    label: "Figma",
    url: "https://www.figma.com/@dipanjanpanja6",
    icon: "figma",
  },
  {
    label: "Github",
    url: "https://github.com/dipanjanpanja6",
    icon: "github",
  },
]
