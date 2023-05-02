import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { Router} from '@angular/router';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

  isLoading: boolean = true;

  subjectName: string = '';

  allBooks: Book[] = [];
  id: boolean = true;
  currentPage = 1;
  totalPages = 0;

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private router: Router
  ) {}

  Reset(){
    this.subjectsService.setSharedData('');
  }

  getAllBooks() {
    this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
      console.log(this.subjectName)
      this.allBooks = data?.works;
      // this.subjectsArray = data;
      this.isLoading = false;
    });
  }

  onInputChange(query: string) {
    if (query.length >= 3) {
      this.subjectsService.searchBooks(this.currentPage = 1, query).subscribe((response: any) => {
        this.allBooks = response.works;
        this.totalPages = Math.ceil(response.work_count / 10);
      });
    } else {
      this.allBooks = [];
    }
  }



  ngOnInit(): void {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.subjectName = params.get('name') || '';
    //   this.isLoading = true;
    //   console.log(this.subjectName)
    //   this.getAllBooks();
    // });
    this.subjectsService.getSharedData().subscribe(data => {
      this.subjectName = data;
      this.onInputChange(this.subjectName)
  });
}
}
