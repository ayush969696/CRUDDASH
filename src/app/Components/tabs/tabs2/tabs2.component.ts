import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormDataMultipleUsers } from '../../../model/FormDataMultipleUser.model';
import { DataService } from '../../../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabs2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabs2.component.html',
  styleUrls: ['./tabs2.component.css'],
})
export class Tabs2Component implements OnInit {
  formData: FormDataMultipleUsers = {
    users: [],
    designation: '',
    files: [],
    fileUrls: [],
  };

  selectedUsers: { id: string; name: string }[] = [];
  designation: string = '';
  searchText: string = '';
  dropdownActive = false;
  filteredUserCards: any[] = [];
  userCards: any[] = []; // Store all user cards here
  selectedFilter: any;

  fileName = "";

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.filteredUserCards = this.userCards; // Initialize filteredUserCards
  }

  // Load users from the service
  loadUsers(): void {
    this.dataService.getUsers().subscribe((response) => {
      this.formData.users = response.map((user: any) => ({
        id: user.id,
        name: user.name,
      }));
    });
  }

  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  toggleUserSelection(user: { id: string; name: string }, event: MouseEvent): void {
    event.stopPropagation();
    const index = this.selectedUsers.findIndex((u) => u.id === user.id);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  isSelected(user: { id: string; name: string }): boolean {
    return this.selectedUsers.some((u) => u.id === user.id);
  }

  clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedUsers = [];
  }

  getSelectedUserNames(): string {
    return this.selectedUsers.length > 0
      ? this.selectedUsers.map((user) => user.name).join(', ')
      : 'Select';
  }

  // Handle file selection
  onFileSelect(event: any): void {
    const files = event.target.files;
    this.fileName = files[0].name;
    this.formData.files = [...files];
  }

  // Submit the form
  onSubmit(): void {
    if (this.selectedUsers.length === 0 || !this.designation.trim()) {
      alert('Please select at least one user and enter a designation before submitting.');
      return;
    }
    const newCard = {
      users: [...this.selectedUsers], // Store all selected users
      designation: this.designation,
      file: this.formData.files,
      fileUrls: this.formData.files.map((file) =>
        URL.createObjectURL(file) // Simulate file URLs
      ),
    };
  
    if (newCard.users.length > 0 && newCard.designation) {
      this.userCards.push(newCard);
      this.filteredUserCards = [...this.userCards]; // Update the displayed cards
      this.resetForm();
    }
  }

  // Reset the form
  onReset(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedUsers = [];
    this.designation = '';
    this.formData.files = [];
    this.dropdownActive = false;
    this.searchText = ''; 
    this.fileName = '';
  }

  // Delete a user card
  deleteCard(index: number): void {
    this.userCards.splice(index, 1);
    this.filteredUserCards = [...this.userCards];
  }

  // Search users
  get filteredUsers(): any[] {
    let filteredBySearch = this.userCards.filter((card) =>
      card.users.some((user: any) =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  
    if (this.selectedFilter) {
      return filteredBySearch.filter((card) =>
        card.designation.toLowerCase().includes(this.selectedFilter.toLowerCase())
      );
    }
  
    return filteredBySearch;
  }
  
  

}
