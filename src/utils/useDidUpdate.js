import { useEffect, useRef } from 'react'

const useDidUpdate = (fn, conditions) => {
    const didMountRef = useRef(false)
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            return
        }

        return fn && fn()
    }, conditions)
}

export default useDidUpdate