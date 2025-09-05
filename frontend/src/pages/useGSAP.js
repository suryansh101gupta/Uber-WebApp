import { useEffect } from 'react'

export const useGSAP = (callback, deps = []) => {
  useEffect(() => {
    callback()
  }, deps) // dependency array like useEffect
}
