import { Component, TemplateRef } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { AddUserService } from '../services/add-user.service';
import { successAlert } from '../utils/alerts.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrl: './permission-table.component.scss'
})
export class PermissionTableComponent {


  userData: any[] = []; // Initialize as an array
  activeUsers: any[] = []; // Data for the current page
  currentPage = 1; // Current page number
  pageSize = 10; // Number of items per page
  totalUsers = 0; // Total number of users
  editForm: any;

  constructor(private apiService:LoginServiceService,public router:Router,public fb:FormBuilder
    ,public modalService:NgbModal,public userService:AddUserService){
    if (sessionStorage.getItem('userData')== null) {
      this.router.navigateByUrl('/login');
    }
  }
  ngOnInit(): void {
    this.fetch();
  }
  fetch(){
    this.apiService.getData().subscribe({
      next: (response) => {
      this.userData=response.reverse();
      this.totalUsers=response.length;
      this.paginateData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.activeUsers = this.userData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
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
            successAlert('User added successfully!','Success');
           this.fetch();
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

userId:any;

openOnEditModal(editModal: TemplateRef<any>,data:any) {
  this.userId=data.id;
  this.editForm = this.fb.group({
    id: data.id,
    name:data.name,
    email:data.email,
    userStatus:data.userStatus,
    role: ["", Validators.required],
  });
  this.modalService.open(editModal, { centered:true }).result.then(
  );
}

saveChanges() {
  this.apiService.EditPermission(this.userId,this.editForm.value).subscribe({
    next:(response)=>{
      this.modalService.dismissAll();
      successAlert('User permissions Updated successfully!','Success');
     this.fetch();
    }
  });
  }

}
