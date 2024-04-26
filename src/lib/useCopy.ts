import {useState} from "react";


const useCopy = () => {
    const [isCopy, setIsCopy] = useState(false)

    const copy = (text: string) => {
        setIsCopy(true)
        navigator.clipboard.writeText(text).then(() => {
            setTimeout(() => {
                setIsCopy(false)
            }, 1000)
        })
    }

    return {
        isCopy,
        copy
    }
}

export default useCopy;
