import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ICountry } from './ICountry';
import { IGroupCountries } from './IGroupCountries';
import * as countries from './countries.json';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  simpleExampleCountries: ICountry[] = [];
  ellipsisModeCountries: ICountry[] = [];
  chipsCountries: ICountry[] = [];
  chipsEllipsisCountries: ICountry[] = [];
  customCheckboxesCountries: ICountry[] = [];
  withoutCheckboxesCountries: ICountry[] = [];
  customItemTemplateCountries: ICountry[] = [];
  customSelectedItemTemplateCountries: ICountry[] = [];
  groupedCountries: IGroupCountries[] = [];

  simpleExampleControl: FormControl = new FormControl([]);
  ellipsisModeControl: FormControl = new FormControl([]);
  chipsControl: FormControl = new FormControl([]);
  chipsEllipsisControl: FormControl = new FormControl([]);
  customCheckboxesControl: FormControl = new FormControl([]);
  withoutCheckboxesControl: FormControl = new FormControl([]);
  customItemTemplateControl: FormControl = new FormControl([]);
  customSelectedItemTemplateControl: FormControl = new FormControl([]);
  groupedControl: FormControl = new FormControl([]);

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.simpleExampleCountries = this.appService.deepCopy((countries as any).default);
    this.ellipsisModeCountries = this.appService.deepCopy((countries as any).default);
    this.chipsCountries = this.appService.deepCopy((countries as any).default);
    this.chipsEllipsisCountries = this.appService.deepCopy((countries as any).default);
    this.customCheckboxesCountries = this.appService.deepCopy((countries as any).default);
    this.withoutCheckboxesCountries = this.appService.deepCopy((countries as any).default);
    this.customItemTemplateCountries = this.appService.deepCopy((countries as any).default);
    this.customSelectedItemTemplateCountries = this.appService.deepCopy((countries as any).default);
    this.groupedCountries = this.appService.deepCopy((countries as any).default).sort(
      (prev: ICountry, next: ICountry) => {
        if (prev.name === next.name) {
          return 0;
        }

        return prev.name < next.name ? -1 : 1;
      }
    ).reduce(
      (prev: IGroupCountries[], next: ICountry) => {
        const letter = next.name[0].toLowerCase();
        let group = prev.find((group: IGroupCountries) => group.value === letter);

        if (!group) {
          group = {
            label: 'Countries start from letter ' + letter.toUpperCase(),
            value: letter,
            items: [],
          };

          prev.push(group);
        }

        group.items.push(next);

        return prev;
      },
      []
    );

    document.addEventListener('error', this.onDocumentError, true);
  }

  ngOnDestroy(): void {
    document.removeEventListener('error', this.onDocumentError);
  }

  onDocumentError(event: Event): void {
    if (!(event.target as HTMLElement).classList.contains('country-item-flag')) {
      return;
    }

    (event.target as HTMLElement).style.display = 'none';
  }
}
