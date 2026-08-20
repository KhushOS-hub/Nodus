# Product Requirements Document — Android File Server

## 1. Overview

**Project:** Android File Server

**Goal:** Turn an unused Android phone with a 64 GB SD card into a self-hosted personal file storage server accessible over the local network.

The backend will run on Android through **Termux**, using **Node.js, TypeScript, Express, Prisma, and SQLite**.

A lightweight **Vue.js frontend** will be built later to practice Vue development.

---

## 2. Problem

An unused Android phone has available storage but no useful purpose.

The project will turn it into a small personal file server that allows the user to:

- Upload files
- Download files
- Browse stored files
- Create folders
- Delete files
- View file metadata
- Access storage from a Mac or other device on the same network

The actual files will be stored on the phone's **64 GB SD card**, while SQLite will store metadata.

---

## 3. Goals

### Primary Goals

- Run a reliable HTTP file server on Android.
- Store actual files on the SD card.
- Store file metadata in SQLite through Prisma.
- Provide a clean REST API.
- Support large-file uploads and downloads without loading entire files into RAM.
- Allow access from the local network.
- Build the backend using production-style TypeScript architecture.
- Build a simple Vue client after the backend is complete.

### Secondary Goals

Practice:

- TypeScript
- Express
- Prisma
- SQLite
- REST API design
- File streams
- Multipart uploads
- Error handling
- Vue.js

---

## 4. Non-Goals for V1

The first version will **not** include:

- Public internet access
- Cloud synchronization
- End-to-end encryption
- Multi-user accounts
- File sharing links
- File versioning
- File previews/thumbnails
- Automatic backups
- Mobile application
- Advanced permissions
- Duplicate-file detection

These can be considered later.

---

# 5. System Architecture

```text
                         Local Wi-Fi
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
           Mac              PC              Other Device
            │                 │                 │
            └─────────────────┼─────────────────┘
                              │
                              ▼
                  ┌─────────────────────┐
                  │    Android Phone    │
                  │                     │
                  │      Termux         │
                  │         │           │
                  │         ▼           │
                  │ Node.js + Express   │
                  │         │           │
                  │         ├── Prisma  │
                  │         │      │    │
                  │         │    SQLite │
                  │         │           │
                  │         ▼           │
                  │   File Storage      │
                  └─────────┼───────────┘
                            │
                            ▼
                         SD Card
```

---

# 6. Technology Stack

## Backend

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- SQLite

## Runtime

- Android
- Termux

## Storage

- 64 GB microSD card

## Frontend

- Vue 3
- Vite
- TypeScript

The frontend will be implemented after the backend API is stable.

---

# 7. Storage Architecture

The project will separate **file storage** from **metadata storage**.

### Actual Files

Stored on the SD card:

```text
/storage/
└── file-server/
    ├── documents/
    ├── music/
    ├── projects/
    └── misc/
```

### Database

SQLite stores metadata:

```text
File
├── id
├── originalName
├── storedName
├── mimeType
├── size
├── path
├── folderId
├── createdAt
└── updatedAt
```

The database should never contain the actual binary file contents.

---

# 8. Folder Structure

```text
android-file-server/
│
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── storage.ts
│   │
│   ├── controllers/
│   │   ├── file.controller.ts
│   │   └── folder.controller.ts
│   │
│   ├── routes/
│   │   ├── file.routes.ts
│   │   └── folder.routes.ts
│   │
│   ├── services/
│   │   ├── file.service.ts
│   │   └── folder.service.ts
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── upload.middleware.ts
│   │
│   ├── utils/
│   │   ├── file.utils.ts
│   │   └── response.utils.ts
│   │
│   ├── types/
│   │   └── file.types.ts
│   │
│   ├── app.ts
│   └── index.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── storage/
│   └── .gitkeep
│
├── tests/
│   ├── file.test.ts
│   └── folder.test.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# 9. Database Schema

## Folder

```text
Folder
├── id
├── name
└── createdAt
```

## File

```text
File
├── id
├── originalName
├── storedName
├── mimeType
├── size
├── path
├── folderId
├── createdAt
└── updatedAt
```

### Relationship

```text
Folder 1 ──────────── N File
```

A folder can contain multiple files.

A file can optionally belong to a folder.

---

# 10. REST API

Base URL:

```text
/api
```

## Files

### Upload File

```http
POST /api/files
```

Content type:

```text
multipart/form-data
```

Request:

```text
file=<binary>
folderId=<optional>
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "file_id",
    "originalName": "song.wav",
    "size": 84532412,
    "mimeType": "audio/wav"
  }
}
```

---

### List Files

```http
GET /api/files
```

Optional query parameters:

```text
?page=1
&limit=20
&folderId=abc
&search=song
```

---

### Get File Metadata

```http
GET /api/files/:id
```

---

### Download File

```http
GET /api/files/:id/download
```

The server should stream the file instead of loading the entire file into memory.

---

### Delete File

```http
DELETE /api/files/:id
```

Deletion must:

1. Delete the physical file.
2. Delete the corresponding database record.

The application must avoid leaving orphaned database records or files whenever possible.

---

# 11. Folder API

### Create Folder

```http
POST /api/folders
```

Request:

```json
{
  "name": "Music"
}
```

---

### List Folders

```http
GET /api/folders
```

---

### Get Folder

```http
GET /api/folders/:id
```

---

### Delete Folder

```http
DELETE /api/folders/:id
```

V1 should reject deletion if the folder contains files unless an explicit recursive-delete feature is later implemented.

---

# 12. File Naming

Uploaded files should not necessarily be stored using their original filename.

Example:

```text
Original:
My Amazing Song.wav

Stored:
clx82k4m9-8f2c.wav
```

The database maintains the relationship between:

```text
originalName
        ↓
My Amazing Song.wav

storedName
        ↓
clx82k4m9-8f2c.wav
```

This prevents filename collisions and reduces problems caused by unusual filenames.

---

# 13. Upload Requirements

The server must:

- Accept multipart uploads.
- Validate that a file exists.
- Generate a unique stored filename.
- Save the file to the configured storage directory.
- Record metadata in SQLite.
- Return metadata to the client.

The server should use streaming/file-system APIs where appropriate.

### V1 Upload Limit

Suggested maximum:

```text
2 GB per file
```

This can be configured through environment variables.

---

# 14. Download Requirements

Downloads must use streaming.

The server should:

- Check that the database record exists.
- Verify that the physical file exists.
- Set an appropriate `Content-Type`.
- Set an appropriate `Content-Disposition`.
- Stream the file to the client.

Example:

```text
GET /api/files/abc123/download

        ↓

Database lookup

        ↓

Locate physical file

        ↓

Create read stream

        ↓

HTTP response
```

---

# 15. Error Handling

All API errors should follow a consistent structure.

Example:

```json
{
  "success": false,
  "error": {
    "code": "FILE_NOT_FOUND",
    "message": "The requested file does not exist."
  }
}
```

Potential error codes:

```text
FILE_NOT_FOUND
FILE_ALREADY_EXISTS
UPLOAD_FAILED
INVALID_FILE
FOLDER_NOT_FOUND
FOLDER_NOT_EMPTY
STORAGE_ERROR
DATABASE_ERROR
VALIDATION_ERROR
```

---

# 16. Security

V1 is intended for **local-network use only**.

The server should:

- Bind to the local network interface.
- Avoid exposing itself directly to the public internet.
- Validate filenames.
- Prevent path traversal.
- Never allow clients to provide arbitrary filesystem paths.
- Validate folder IDs.
- Validate uploaded files.
- Restrict access to the configured storage directory.

For example, requests attempting:

```text
../../../../etc/passwd
```

must never be allowed to escape the storage directory.

Authentication can be added in V2.

---

# 17. Configuration

`.env`:

```env
PORT=3000
HOST=0.0.0.0

DATABASE_URL="file:./dev.db"

STORAGE_PATH="/storage/XXXX-XXXX/file-server"

MAX_FILE_SIZE=2147483648
```

The actual SD-card path should be discovered on the Android device rather than hardcoded.

---

# 18. Logging

The server should log important events:

```text
[INFO] Server started on port 3000
[INFO] File uploaded: song.wav
[INFO] File downloaded: song.wav
[INFO] File deleted: song.wav
[ERROR] Storage unavailable
```

Avoid logging sensitive information unnecessarily.

---

# 19. Vue Frontend — V1

The frontend will be intentionally simple.

### Main Page

```text
┌─────────────────────────────────────────┐
│             My File Server              │
├─────────────────────────────────────────┤
│                                         │
│  [ Upload File ]                        │
│                                         │
│  Search: [____________________]         │
│                                         │
│  Files                                  │
│  ─────────────────────────────────────  │
│                                         │
│  📄 resume.pdf       1.4 MB   Download  │
│  🎵 song.wav        84.2 MB   Download  │
│  📦 project.zip     52.1 MB   Download  │
│                                         │
└─────────────────────────────────────────┘
```

### Vue Concepts to Practice

- `ref`
- `computed`
- `watch`
- `onMounted`
- Components
- Props
- Emits
- Forms
- File input
- `FormData`
- API requests
- Loading states
- Error states
- Conditional rendering
- List rendering
- Composables

---

# 20. Development Phases

## Phase 1 — Android Environment

- [ ] Install Termux.
- [ ] Install Node.js.
- [ ] Configure storage permissions.
- [ ] Verify SD-card access.
- [ ] Create project.

**Estimated:** 30–60 minutes.

---

## Phase 2 — Backend Foundation

- [ ] Initialize TypeScript.
- [ ] Configure Express.
- [ ] Configure environment variables.
- [ ] Create application structure.
- [ ] Add error middleware.

**Estimated:** 1 hour.

---

## Phase 3 — Database

- [ ] Install Prisma.
- [ ] Configure SQLite.
- [ ] Create schema.
- [ ] Create migrations.
- [ ] Create Prisma client.

**Estimated:** 1 hour.

---

## Phase 4 — File Management

Implement:

- [ ] Upload
- [ ] List
- [ ] Get metadata
- [ ] Download
- [ ] Delete

**Estimated:** 2–3 hours.

---

## Phase 5 — Folders

Implement:

- [ ] Create
- [ ] List
- [ ] Get
- [ ] Delete

**Estimated:** 1–2 hours.

---

## Phase 6 — Validation & Security

Implement:

- [ ] File validation
- [ ] Size limits
- [ ] Path traversal protection
- [ ] Error handling
- [ ] Storage validation

**Estimated:** 1–2 hours.

---

## Phase 7 — Testing

Test from the Mac using:

```bash
curl
```

Test:

- [ ] Small files
- [ ] Large files
- [ ] Multiple files
- [ ] Invalid files
- [ ] Missing files
- [ ] Delete operations
- [ ] Network interruptions
- [ ] SD-card unavailable scenarios

**Estimated:** 1–2 hours.

---

# 21. V1 Success Criteria

V1 is considered complete when:

- [ ] Android can run the backend reliably.
- [ ] Backend is accessible from the Mac over Wi-Fi.
- [ ] SQLite database works through Prisma.
- [ ] Files are stored on the SD card.
- [ ] Metadata is stored in SQLite.
- [ ] Files can be uploaded.
- [ ] Files can be listed.
- [ ] Files can be downloaded.
- [ ] Files can be deleted.
- [ ] Folders can be created.
- [ ] Files can belong to folders.
- [ ] Large files are streamed.
- [ ] Path traversal is prevented.
- [ ] API errors are consistent.
- [ ] Vue frontend can communicate with the API.

---

# 22. Future Features

Possible V2/V3 features:

```text
Authentication
      ↓
Multiple users
      ↓
Permissions
      ↓
Public/private shares
      ↓
Expiring download links
      ↓
File previews
      ↓
Image thumbnails
      ↓
Video streaming
      ↓
Resumable uploads
      ↓
File hashing
      ↓
Duplicate detection
      ↓
Automatic backups
```

---

# 23. Final V1 Definition

The finished V1 should essentially be:

```text
              ┌──────────────┐
              │     Vue      │
              │   Frontend   │
              └──────┬───────┘
                     │
                    HTTP
                     │
                     ▼
        ┌────────────────────────┐
        │ Android File Server    │
        │                        │
        │ TypeScript + Express   │
        │         │              │
        │      Services          │
        │       /    \           │
        │    Prisma   FS         │
        │      │      │          │
        │   SQLite   SD Card     │
        └────────────────────────┘
```

**Target:** ~6–10 hours for the backend V1, followed by the Vue frontend as a separate learning phase.
