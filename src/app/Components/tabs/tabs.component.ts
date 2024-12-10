import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  items: MenuItem[] = [];  // MenuItem[] means "an array of menu items."  and a menu "item" is an object that represents an option in a menu, in this case, tabs in a navigation menu.
  // I’m creating a variable called items that will hold a list of menu items (tabs), and right now it’s an empty list.
  
  activeItem: MenuItem | undefined;
  //It will hold the currently active or selected menu item (tab) in your navigation

  ngOnInit() {
    // Define the tabs and their respective router links or actions
    this.items = [
      { label: 'User Data', icon: 'pi pi-fw pi-home', routerLink: 'tab1' },
      { label: 'Multiple Users', icon: 'pi pi-fw pi-users', routerLink: 'tab2' },
      { label: 'PDF Images', icon: 'pi pi-fw pi-file-pdf', routerLink: 'tab3' },
    ];

    // Set the first tab as active by default
    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
}
}
