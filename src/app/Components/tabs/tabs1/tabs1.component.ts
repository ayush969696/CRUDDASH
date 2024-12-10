import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataService } from '../../../Services/data.service';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FormData } from '../../../model/user.model';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-tabs1',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, ToastModule, FileUploadModule],
  templateUrl: './tabs1.component.html',
  styleUrls: ['./tabs1.component.css']
})
export class Tabs1Component implements OnInit {
  @ViewChild('fileInput') fileInput!: HTMLInputElement;

  usetDataService = inject(DataService);

  users: SelectItem[] = [];
  selectedUser: string = '';
  designation: string = '';
  uploadedFiles: any[] = [];
  userCards: FormData[] = [];

  fileName = '';

  // Search and filter variables
  searchText: string = '';
  selectedFilter: string = '';

  ngOnInit() {
    this.usetDataService.getUsers().subscribe((data) => {
      this.users = data.map((user) => (
        {
         label: user.name,
         value: user.id,
        }
      ));
      console.log('Users:', this.users);
    });
  }

  

  onFileSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement?.files?.length) {

      this.fileName = inputElement.files[0].name;

      const file = inputElement.files[0];
      console.log('Selected File:', file);

      const fileUrl = URL.createObjectURL(file);  // creates a temporary URL for the file object
      this.uploadedFiles.push({ file, fileUrl });
    } else {
      console.log('No file selected');
    }

    console.log(this.uploadedFiles);
  }

  onSubmit() {
    console.log('Selected User:', this.selectedUser);

    if (this.selectedUser.length === 0 || !this.designation.trim()) {
      console.log('All Fields are required!');
      alert('All Fields are required!');
      return;
    }

    const selectUserData = this.users.find((user) => user.value === Number(this.selectedUser));

    if (!selectUserData) {
      console.error('Selected user data not found.');
      return;
    }

    const newEntry: FormData = {
      user: {
        name: selectUserData.label || '',
        id: selectUserData.value || ''
      },
      designation: this.designation,
      file: this.uploadedFiles,
      fileUrls: this.uploadedFiles.map(file => file.fileUrl),
    };

    this.userCards.push(newEntry);
    console.log(this.userCards);

    // Reset the form
    this.selectedUser = '';
    this.designation = '';
    this.uploadedFiles = [];
    this.fileName = '';
  }

  onReset() {
    this.selectedUser = '';
    this.designation = '';
    this.uploadedFiles = [];
    this.fileName = '';
  }

  deleteCard(index: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.userCards.splice(index, 1);
    }
  }

 get filteredUserCards() {
  return this.userCards.filter((card) => {
    const matchesSearchText =
      !this.searchText || card.user.name.toLowerCase().includes(this.searchText.toLowerCase());
    const matchesSelectedFilter =
      !this.selectedFilter || card.user.name === this.selectedFilter;

    return matchesSearchText && matchesSelectedFilter;
  });
}

}
