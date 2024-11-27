import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss'
})
export class AddNewUserComponent {
  // @Input() user: any; // Pass initial data if needed
  userForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,private apiService:LoginServiceService) {
    this.userForm = this.fb.group({
      id: 101,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      userStatus: ['', Validators.required],
      permissions: ['', Validators.required],
    });
    this.fetchRole();
  }
  roles:any;
  fetchRole(){
     this.apiService.GetRoleData().subscribe({
      next: (response) => {
     const data=response.map((res: { role: any; })=>[
          res.role
        ]);
        this.roles=data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.activeModal.close(this.userForm.value); 
    }
  }
}
