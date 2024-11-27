import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    public router:Router
  ){
    if (sessionStorage.getItem('userData')== null) {
      this.router.navigateByUrl('/login');
    }
  }

userData: any;
ngOnInit(): void {
  const storedData = sessionStorage.getItem('userData');
  if (storedData) {
    this.userData = JSON.parse(storedData);
    console.log('User Data:', this.userData); // You can now use this userData in your component
  }
}

logout() {
  // SweetAlert2 confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to log out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, log me out',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      
      sessionStorage.clear(); 
      Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
      this.router.navigateByUrl('/login');
    } 
  });
}
}
