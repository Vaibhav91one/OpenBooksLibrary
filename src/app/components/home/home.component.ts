import { Component, OnInit , Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { Router } from '@angular/router';


@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  data: string = '';

  constructor(private subjectservice: SubjectsService, private router: Router) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'Blockchain' },
  ];
  
  updateSharedData(query: string) {
    this.data = query
    this.subjectservice.setSharedData(this.data);
  }

  trendingsubject(query: string) {
    this.data = query
    this.subjectservice.setSharedData(this.data);     
    this.router.navigate([`trending-subject/:this.data`]);
    
  }
 
  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      });
  }

  
}
