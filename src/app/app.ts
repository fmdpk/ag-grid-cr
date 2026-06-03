import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import './ag-grid-crack';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AutoGroupColumnDef,
  GridReadyEvent,
  LocaleText,
  SideBarDef,
  type ColDef,
} from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';
import { themeQuartz } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { AG_GRID_LOCALE_IR } from '@ag-grid-community/locale';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('ag-grid-latest-second');
// }

// Row Data Interface
interface IRow {
  company: string;
  date: string;
  country: string;
  gold: string;
  sport: string;
  price: number;
  mission: string;
}

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  standalone: true,
  imports: [AgGridAngular],
  selector: 'app-root',
  template: `
    <div style="display: flex; flex-direction: column; height: 90vh">
      @if (isBrowser) {
        <ag-grid-angular
          style="width: 100%; height: 100%;"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [autoGroupColumnDef]="autoGroupColumnDef"
          [sideBar]="sideBar"
          [enableFilterHandlers]="true"
          [suppressSetFilterByDefault]="true"
          [enableRtl]="true"
          [pivotMode]="pivotMode"
          [localeText]="localeText"
          [rowGroupPanelShow]="'always'"
          [rowData]="rowData"
          (gridReady)="onGridReady($event)"
        />
      }
    </div>
  `,
})
export class App implements OnInit {
  isBrowser: boolean = false;
  theme = themeQuartz;
  private http = inject(HttpClient);
  pivotMode: boolean = false;
  localeText: LocaleText = AG_GRID_LOCALE_IR;
  columnDefs: ColDef[] = [
    { field: 'country', enableRowGroup: true, enablePivot: true },
    { field: 'gold', aggFunc: 'sum', enableValue: true, enablePivot: true, enableRowGroup: true },
    { field: 'sport', enablePivot: true, enableRowGroup: true },
  ];
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 130,
    // filter: true,
    filter: 'agSelectableColumnFilter',
    floatingFilter: true,
  };
  autoGroupColumnDef: AutoGroupColumnDef = {
    minWidth: 200,
  };
  // sideBar: SideBarDef | string | string[] | boolean | null = {
  //   toolPanels: ['columns', 'filters'],
  //   defaultToolPanel: '',
  // };

  sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters-new'],
    defaultToolPanel: '',
  };
  rowData!: IOlympicData[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        console.log(data);
        this.rowData = data;
      });
  }
}
