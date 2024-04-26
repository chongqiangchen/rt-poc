import {useState} from "react";

const unsecuredCopyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value=text;
    document.body.appendChild(textArea);
    textArea.focus();textArea.select();
    try{
        document.execCommand('copy')
    } catch(err) {
        console.error('Unable to copy to clipboard',err)
    }
    document.body.removeChild(textArea)
};

/**
 * Copies the text passed as param to the system clipboard
 * Check if using HTTPS and navigator.clipboard is available
 * Then uses standard clipboard API, otherwise uses fallback
 */
const copyToClipboard = (content: string) => {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(content).then(() => {
                resolve(void 0);
            }).catch(err => {
                reject(err);
            });
        } else {
            unsecuredCopyToClipboard(content);
            resolve(void 0);
        }
    })
};

const useCopy = () => {
    const [isCopy, setIsCopy] = useState(false)

    const copy = (text: string) => {
        setIsCopy(true)
        copyToClipboard(text).then(() => {
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
