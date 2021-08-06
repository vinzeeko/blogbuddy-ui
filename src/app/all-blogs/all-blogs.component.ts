import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../shared/model/blog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  public allBlogsData: MatTableDataSource<Blog>;
  public displayedColumns: any[];
  public highlightedRows: Blog;

  constructor(public blogService: BlogService, public router: Router) {}

  ngOnInit(): void {
    this.displayedColumns = ['title', 'content', 'user'];
    this.blogService.listAllBlogs().subscribe((result: Blog[]) => {
      this.allBlogsData = new MatTableDataSource<Blog>(result);
    });
  }

  public viewSelectedBlog(selectedBlog: Blog): void {
      this.router.navigate([`home/${selectedBlog.blogId}`]);
  }

}
