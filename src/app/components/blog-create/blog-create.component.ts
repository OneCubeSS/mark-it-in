import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Post } from './post';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit {
  displayedColumns: string[] = ['postTitle', 'postDesc'];
  data: Post[] = [];
  isLoadingResults = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {    
    if(!this.isLoggedIn()) {
      this.router.navigate(['adminlogin']);
    } else {
      this.router.navigate(['blogposts']);
    }
    if (!window.location.href.toString().endsWith('index.html')) {
      let id = document.getElementById('headermain') as HTMLElement;
      console.log('tag: ', id);
      if (id.classList.length == 0) {
        id.classList.add('background-header');
      }
    }

    this.apiService.getPosts().subscribe(
      (res) => {
        console.log('result: ', res);
        this.data = res.data;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log('error: ', err);
        this.isLoadingResults = false;
      }
    );
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

}
