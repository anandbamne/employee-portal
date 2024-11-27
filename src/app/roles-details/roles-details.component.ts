import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles-details',
  templateUrl: './roles-details.component.html',
  styleUrl: './roles-details.component.scss'
})
export class RolesDetailsComponent {
  adminName:any;
  roleForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      let username = JSON.parse(storedData);
      console.log(storedData)
    this.adminName=username.name;
  }
    // Initialize the FormGroup
    this.roleForm = this.fb.group({
      createdBy:this.adminName, 
      role: ['', [Validators.required, Validators.minLength(3)]], // Editable text field
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.roleForm.valid) {
      this.activeModal.close(this.roleForm.value); // Pass data back to the parent on close
    } 
  }
}
