//This file contain init prompt
import { input } from "@inquirer/prompts"

async function serverURL() {
    const serverUrl: string = await input({
        message: "? Enter the server url: ",
        validate(value) {
            if (!value.trim()) {
                return "Url is required"
            }
            return true
        }
    })
    return serverUrl
}

async function pairCode() {
    const serverCode: string = await input({
        message: "? Enter the pairing code: ",
        validate(value) {
            if (!value.trim()) return "Pairing Code is required"
            return true
        }
    })
    return serverCode
}

export { serverURL, pairCode }