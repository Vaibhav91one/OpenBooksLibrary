import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { Router , NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
  @Input() parentIdentifier: boolean = false;
  isSearching: boolean = false;
  NoResultsFound: boolean = false;
  currentPage = 1;
  totalPages = 0;

  constructor(
    private subjectservice: SubjectsService,
    private router: Router
    ) {
  }
  
  onInputChange(query: string) {
    if (query.length >= 3) {
      this.isSearching = true;
      this.subjectservice.searchBooks(this.currentPage = 1, query).subscribe((response: any) => {
        if (response.works == 0){
          this.NoResultsFound = true
        }
        this.booksList = response.works;
        this.totalPages = Math.ceil(response.work_count / 10);
        this.isSearching = false;
      });
    } else {
      this.booksList = [];
    }
  }

  PageChange(query: string) {
    if (query.length >= 3) {
      this.isSearching = true;
      this.subjectservice.searchBooks(this.currentPage, query).subscribe((response: any) => {
        this.booksList = response.works;
        this.totalPages = Math.ceil(response.work_count / 10);
        console.log(this.totalPages)
        this.isSearching = false;
        console.log(this.booksList)
      });
    } else {
      this.booksList = [];
    }
  }

  onNextPage(event: any) {
    event.preventDefault();
    this.currentPage = this.currentPage + 1
    this.PageChange(this.subjectName)
  }

  onFirstPage(event: any) {
    event.preventDefault();
    this.currentPage = 1
    this.PageChange(this.subjectName)
  }

  onJumpPage(value: number) {
    if (value > this.totalPages || value == 0) {
      alert("No page Found");
    }
    else {
      this.currentPage = value
      this.PageChange(this.subjectName)
    }
  }
  onPrevPage(event: any) {
    event.preventDefault();
    this.currentPage = this.currentPage - 1
    this.PageChange(this.subjectName)
  }

  onLastPage(event: any) {
    event.preventDefault();
    // if (this.currentPage > this.totalPages){
    this.currentPage = this.totalPages
    this.PageChange(this.subjectName)
    // }

  }

  ngOnInit() {
    this.subjectservice.getSharedData().subscribe(data => {
      this.subjectName = data;
      this.onInputChange(this.subjectName)
    });
  }
}
