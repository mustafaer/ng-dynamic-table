import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-dynamic-table';

  headerData: any[] = [
    {display: 'Name', contentKey: 'name', isChecked: true},
    {display: 'Age', contentKey: 'age', isChecked: true},
    {display: 'Country', contentKey: 'country', isChecked: true},
  ];

  content: any[] = [
    {name: 'Mustafa', age: 26, country: 'Turkey'},
    {name: 'Furkan', age: 27, country: 'Turkey2'},
    {name: 'Göksel', age: 26, country: 'Turkey3'},
  ];

  constructor(public cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // @ts-ignore
    $('.content, .main').sortable({
      connectWith: '.main',
      update: () => {
        this.setChanges();
      }
    }).disableSelection();
  }

  setChanges(): void {
    // @ts-ignore
    const itemOrder = $('.main').sortable('toArray');

    const newOption: any[] = [];

    itemOrder.filter((item: any) => {
      const d = this.headerData.find(i => i.contentKey === item.replace('column-filter-list-item-', ''));
      newOption.push(d);
    });
    this.headerData = [...newOption];
    this.cd.detectChanges()
  }

  changeColumnView(column: any, event: any): void {
    console.log(column)
    this.headerData.find(item => item.contentKey === column.contentKey).isChecked = event.target.checked;
    console.log(this.headerData)
  }
}
