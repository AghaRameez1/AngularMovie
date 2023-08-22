import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../services/api-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddmovieComponent} from "./form/addmovie/addmovie.component";
import {ConfirmationModalComponent} from "../shared/confirmation-modal/confirmation-modal.component";
import Swal from "sweetalert2";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['movie_name', 'movie_language', 'movie_genre', 'movie_image','movie_url', 'action'];
  dataSource: any;
  loading: boolean = false;
  constructor(private apiService: ApiService,private modalService: NgbModal,) {

  }

  ngOnInit(): void {
    this.getlistOfMovies();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getlistOfMovies() {
    this.dataSource  = [];
    this.loading = true;
    this.apiService.get('movies/?api=angular').subscribe((res: any) => {
      if(res.statusCode == 200){
        this.dataSource = res.message;
        console.log(this.dataSource)
      }
      this.loading = false;
    })
  }
  createMovie(){
    const modalRef = this.modalService.open(AddmovieComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.getlistOfMovies();
    }, (reason) => {
      console.log(reason);
    });
  }
  editMovie(data: any){
    const modalRef = this.modalService.open(AddmovieComponent, { size: 'lg' });
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
      this.getlistOfMovies();
    }, (reason) => {
      console.log(reason);
    });
  }

  deleteMovie(id:any){
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'md' });
    modalRef.componentInstance.title = 'Delete Movie'+id;
    modalRef.componentInstance.heading = 'Are you sure you want to delete this movie?';
    modalRef.result.then((result:any)=>{
      if(result){
        this.apiService.delete(`/movies?title=`+id).subscribe((res:any)=>{
          if(res.statusCode == 200){
            Swal.fire('Success',`${res.body.message}`)
            this.getlistOfMovies();
          }
        })
      }
    })
  }

}
