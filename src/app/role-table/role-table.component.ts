import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesDetailsComponent } from '../roles-details/roles-details.component';
import { AddUserService } from '../services/add-user.service';
import { successAlert } from '../utils/alerts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.scss'
})
export class RoleTableComponent {

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any> | undefined;
  deleteRecord(userId: string) {
    // SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with deletion
        this.apiService.deleteRole(userId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.fetch(); // Refresh the table
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            Swal.fire('Error!', 'Failed to delete the user.', 'error');
          },
        });
      }
    });
  }
  

  userData: any[] = []; // Initialize as an array
  activeUsers: any[] = []; // Data for the current page
  currentPage = 1; // Current page number
  pageSize = 10; // Number of items per page
  totalUsers = 0; // Total number of users
  roles:any;
  constructor(private apiService:LoginServiceService
    ,private modalService: NgbModal,
    private userService:AddUserService,public router:Router,
  public fb:FormBuilder){}
  ngOnInit(): void {
    this.fetch();
  }
  fetch(){
    this.apiService.GetRoleData().subscribe({
      next: (response) => {
        const data=response.map((res: { role: any; })=>[
          res.role
        ]);
        this.roles=data;
      this.userData=response.reverse();
      this.totalUsers=this.userData.length;
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
  openRoleModal(){
    const modalRef = this.modalService.open(RolesDetailsComponent, { centered: true });
    modalRef.result.then((formData)=>{
      console.log(formData);
      if(formData){
        this.userService.addRole(formData).subscribe({
          next: (response) => {
            console.log( response);
            successAlert("Role added successfully!",'Success');
            this.fetch();
          }, error: (err) => {
            console.error('Error adding user:', err);
            alert('Failed to add user.');
          },
        });
      }
    })
  }
 editForm!:FormGroup;
 userId:any;
  openOnEditModal(editModal: TemplateRef<any>,data:any) {
    this.userId=data.id;
    this.editForm = this.fb.group({
      id: data.id,
      createdBy:data.createdBy,
      role: ["", Validators.required],
    });
    this.modalService.open(editModal, { centered:true }).result.then(
    );
  }

  save() {
    console.log(this.editForm.value);
    
    this.apiService.putRoleData(this.userId,this.editForm.value).subscribe({
      next:(response)=>{
        this.modalService.dismissAll();
        successAlert('Data Updated Successfully!','Succuss');
        this.fetch();
      }
    });
    }
}
