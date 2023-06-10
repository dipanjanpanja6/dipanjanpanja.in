import { useEffect, useRef } from "react"

export function useInterval(callback: () => any, delay: number, reset: boolean) {
  const savedCallback = useRef<() => any>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current!()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, reset])
}
