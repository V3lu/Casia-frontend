import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-staff',
  imports: [ToolbarModule, CardModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent {

  readonly summaryTiles = [
    { label: 'Active members', value: '24', note: 'Staff currently assigned' },
    { label: 'On shift', value: '14', note: 'Working this rotation' },
    { label: 'Open roles', value: '3', note: 'Positions ready to fill' },
  ];

  readonly detailRows = [
    { name: 'Warehouse', value: '100% staffed', note: 'Full coverage today' },
    { name: 'Admin', value: '2 on leave', note: 'Temporary coverage in place' },
    { name: 'Weekend', value: '91% ready', note: 'Coverage check pending' },
  ];

}
