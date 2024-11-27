import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrl: './permission-modal.component.scss'
})
export class PermissionModalComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
permissionForm!:FormGroup;
  role: any;
  name: any;
  userId: any;
  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    private apiService:LoginServiceService
  ) { }
  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      id: this.userId,
      name: this.name,
      role: this.role,
      permissions: ['', Validators.required],
    });
  }
}
