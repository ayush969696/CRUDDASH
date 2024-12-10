import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;  // URL for viewing the file
}

@Component({
  selector: 'app-tabs3',
  templateUrl: './tabs3.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./tabs3.component.css']
})
export class Tabs3Component {
  uploadedFiles: UploadedFile[] = [];

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        const fileUrl = URL.createObjectURL(file); // Generate a temporary URL for the file

        // Add the file to the array
        this.uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileUrl,
        });
      });
      console.log('Updated Files:', this.uploadedFiles); // Ensure files are being added
    }
  }

  deleteFile(index: number): void {
    // Remove the file at the given index from the uploadedFiles array
    this.uploadedFiles.splice(index, 1);
  }

  trackByFile(index: number, file: UploadedFile): string {
    return file.name; // or file.url if it's unique enough
  }
}
