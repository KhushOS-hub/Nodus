import {
    streamReadFile,
    streamWriteFile
} from "../server/services/filestorage.service.js"

const sourcePath = "./storage/source.bin"
const destinationPath = "./storage/copy.bin"

const readStream = streamReadFile(sourcePath)
const writeStream = streamWriteFile(destinationPath)

readStream.on("data", (chunk: Buffer) => {
    console.log(`Received: ${chunk.length} bytes`)
});

readStream.on("end", () => {
    console.log("Finished reading")
});

readStream.on("error", (error: Error) => {
    console.error("Read error:", error.message)
});

writeStream.on("finish", () => {
    console.log("Finished writing")
});

writeStream.on("error", (error: Error) => {
    console.error("Write error:", error.message)
});

readStream.pipe(writeStream)