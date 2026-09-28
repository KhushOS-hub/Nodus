interface Folder {
    id: number;
    name: string;
    parentId: number | null;
    createdAt: string;
}

interface FolderResponse {
    statusCode: number;
    data: Folder[];
    message: string;
    success: boolean;
}

export type { FolderResponse, Folder }