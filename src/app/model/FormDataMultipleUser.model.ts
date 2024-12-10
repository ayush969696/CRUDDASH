export interface FormDataMultipleUsers {
  users: { id: string; name: string }[]; 
    designation: string;
    files: File[];  
    fileUrls?: string[];  
  }
  