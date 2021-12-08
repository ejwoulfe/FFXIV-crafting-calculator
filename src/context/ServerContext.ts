import { createContext } from "react"

export type ServerContextType = {
    server: string
    setServer: (s: string) => void
}

function setDefault() {
    if (localStorage.getItem('homeServer') === null) {
        localStorage.setItem('homeServer', 'No Server Selected')
        return "No Server Selected"
    } else {
        return localStorage.getItem('homeServer') as string
    }
}

export const ServerContext = createContext<ServerContextType>({
    server: setDefault(),
    setServer: () => { },
})