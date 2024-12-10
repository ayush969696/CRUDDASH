export interface FormData {
    user: {id: string; name: string},
    designation: string;
    file: File[];
    fileUrls?: string[];
  }
  