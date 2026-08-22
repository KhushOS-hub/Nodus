import {
    ensureDirectory,
    fileExists,
    fileInfo,
    deleteFile,
    readSmallFile,
    writeSmallFile
} from "../src/services/storage.service.js";

const testDir = "./storage/test";
const testFile = `${testDir}/hello.txt`;

// 1. Ensure directory
const directory = await ensureDirectory(testDir);
console.log("Directory ready:", directory);


// 2. Check whether file exists`
const before = await fileExists(testFile);
console.log("File exists before creation:", before);


// 3. Write file
const writeResult = await writeSmallFile(
    testFile,
    "Hello from Home Cloud!"
);

console.log("Write result:", writeResult);


// 4. Check existence again
const after = await fileExists(testFile);
console.log("File exists after creation:", after);


// 5. Read file
const data = await readSmallFile(testFile);

if (data) {
    console.log("File contents:", data.toString());
}


// 6. Get file information
const info = await fileInfo(testFile);

if (info) {
    console.log("File size:", info.size);
    console.log("Is file:", info.isFile());
    console.log("Is directory:", info.isDirectory());
    console.log("Modified:", info.mtime);
    console.log("Created:", info.birthtime);
}


// 7. Delete file
const deleted = await deleteFile(testFile);

console.log("File deleted:", deleted);


// 8. Verify deletion
const afterDelete = await fileExists(testFile);

console.log("File exists after deletion:", afterDelete);