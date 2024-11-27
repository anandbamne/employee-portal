import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { AddUserService } from '../services/add-user.service';
import { RolesDetailsComponent } from '../roles-details/roles-details.component';
import { successAlert } from '../utils/alerts.service';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private userService:AddUserService,
    private apiService:LoginServiceService,
    public router:Router
  ){
    
  }
  userData: any;
  totalUser:any;
  totalActiveUser:any;
  ngOnInit(): void {
    this.fetch();
  }
  fetch(){
    this.apiService.getData().subscribe({
      next: (response) => {
      this.userData=response.reverse();
      this.totalUser=response.length;
      const activeuse=this.userData.filter((user:any) => user.userStatus === 'Active');
      this.totalActiveUser=activeuse.length;
      },
      error: (err) => {
        console.error(err);
      },
    });
   
  }
  openModal() {
    const modalRef = this.modalService.open(AddNewUserComponent, { centered: true });
    modalRef.componentInstance.modalTitle = 'User Information';
    modalRef.result
    .then((formData) => {
      if (formData) {
        this.userService.addUser(formData).subscribe({
          next: (response) => {
            console.log('User added successfully:', response);
            alert('User added successfully!');
          },
          error: (err) => {
            console.error('Error adding user:', err);
            alert('Failed to add user.');
          },
        });
      }
    })
    .catch((error) => {
      console.log('Modal dismissed:', error);
    });
}

openRoleModal(){
  const modalRef = this.modalService.open(RolesDetailsComponent, { centered: true });
  modalRef.result.then((formData)=>{
    console.log(formData);
    if(formData){
      this.userService.addRole(formData).subscribe({
        next: (response) => {
          console.log( response);
          successAlert("Role added successfully!",'Success');
        }, error: (err) => {
          console.error('Error adding user:', err);
          alert('Failed to add user.');
        },
        
      });
    }
    
  })
}}

