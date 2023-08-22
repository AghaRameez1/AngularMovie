import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../../services/api-service.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  @Input() data: any;
  isInline: boolean = false;
  createMovieForm: FormGroup = new FormGroup({});
  processing: boolean = false;
  constructor(public fb: FormBuilder,public modal: NgbActiveModal,public apiService: ApiService) {
    this.createMovieForm = this.buildCreateMovieForm()
  }

  ngOnInit(): void {
   if(this.inEditMode()){
     this.createMovieForm.patchValue(this.data);
     this.createMovieForm.get('title')?.disable();
   }
  }
  inEditMode(){
    return this.data? true: false;
  }
  buildCreateMovieForm() {
    return this.fb.group({
      title: new FormControl('', [Validators.required]),
      plot: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{0,4}')]),
    });
  }
  get title() {
    return this.createMovieForm?.get('title');
  }

  get plot() {
    return this.createMovieForm?.get('plot');
  }

  get rating() {
    return this.createMovieForm?.get('rating');
  }

  get year() {
    return this.createMovieForm?.get('year');
  }
  onSubmit(){
    if(this.inEditMode()){
      this.updateMovie();
    }else{
      this.addMoive();
    }


  }
  addMoive(){
    if(!this.createMovieForm.valid){
      Swal.fire('error','Please fill all the fields','error');
      return;
    }else{
      this.processing = true;
      let body={
        title: this.createMovieForm.value.title,
        plot: this.createMovieForm.value.plot,
        rating: this.createMovieForm.value.rating,
        year: this.createMovieForm.value.year,
      }
      this.apiService.post('/movies',body).subscribe(res=>{
        this.processing = false;
        if(res.statusCode == 200){
          Swal.fire('success',res?.body, 'success')
          this.modal.close('true');
        }
        // this.modal.close(res);
      })
    }
  }
  updateMovie(){
    if(!this.createMovieForm.valid){
      Swal.fire('error','Please fill all the fields','error');
      return;
    }else{
      this.processing = true;
      let body={
        title: this.createMovieForm.getRawValue().title,
        plot: this.createMovieForm.value.plot,
        rating: this.createMovieForm.value.rating,
        year: this.createMovieForm.value.year,
      }
      this.apiService.put('/movies',body).subscribe(res=>{
        this.processing = false;
        if(res.statusCode == 200){
          Swal.fire('success',res?.body, 'success')
          this.modal.close('true');
        }
        // this.modal.close(res);
      })
    }
  }
}
