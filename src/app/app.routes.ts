import { Routes } from '@angular/router';
import { TabsComponent } from './Components/tabs/tabs.component';
import { Tabs1Component } from './Components/tabs/tabs1/tabs1.component';
import { Tabs2Component } from './Components/tabs/tabs2/tabs2.component';
import { Tabs3Component } from './Components/tabs/tabs3/tabs3.component';

export const routes: Routes = [
    {
      path: 'tabs',
      component: TabsComponent,
      children: [
          { path: 'tab1', component: Tabs1Component },
          { path: 'tab2', component: Tabs2Component },
          { path: 'tab3', component: Tabs3Component },
          {path: '', redirectTo: 'tab1', pathMatch: 'full'}
      ]
  },
      
];
