import os from "node:os"

export function getLocalIp() {
    const interfaces = os.networkInterfaces()

    for (const network of Object.values(interfaces)) {
        if (!network) continue;

        for (const net of network) {
            if (
                net.family === "IPv4" &&
                !net.internal
            ) {
                return net.address
            }
        }
    }

    return "localhost"
}