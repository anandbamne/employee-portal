

import Swal from 'sweetalert2';





export const errorAlert = (err:any, title?: string) => {



  Swal.fire({

    title: title || 'Something went wrong!!',

    width: 550,

    padding:50,

    icon:'error',
    // imageUrl: "/src/assets/error.png",

    text: err.error

      ? err.error.error_message || err.error.message

      : err.message,

    showConfirmButton:false,

    backdrop: `

    rgba(0,0,123,0.4)

  `,

    timer: 3000,

    showClass: {

      popup: `

        animate__animated

        animate__fadeInUp

        animate__faster

      `

    },

    hideClass: {

      popup: `

        animate__animated

        animate__fadeOutDown

        animate__faster

      `

    }

   

  });

};



export const successAlert = (title:any, text:any) => {

  Swal.fire({

    title,

    text,

    width: 550,

    padding:50,
    icon: 'success',
    // imageUrl: "/src/assets/sucess.png",

    timer: 2000,

    showConfirmButton:false,

    backdrop: `

    rgba(0,0,123,0.4)

  `,

    showClass: {

      popup: `

        animate__animated

        animate__fadeInUp

        animate__faster

      `

    },

    hideClass: {

      popup: `

        animate__animated

        animate__fadeOutDown

        animate__faster

      `

    }

  });

};



export const warningAlert = (title:any, text:any) => {

  Swal.fire({

    title,

    text,

    icon: 'warning',

    confirmButtonText: 'Okay',

    timer: 3000,

  });

};



export const msgErrorAlert = (message:any) => {

  Swal.fire({

    title: message,

    width: 550,

    padding:50,

    imageUrl: "../assets/icons/alerticon/error.png",

    showConfirmButton:false,

    backdrop: `

    rgba(0,0,123,0.4)`,

   timer: 3000,

    showClass: {

      popup: `

        animate__animated

        animate__backInDown

        animate__faster

      `

    },

    hideClass: {

      popup: `

        animate__animated

        animate__fadeOutDown

        animate__faster

      `

    }



  });



};



export const confirmAlert = (title: any, text: any) => {

  return Swal.fire({

    title,

    text,

    width: 550,

    padding: 30,

    showDenyButton: true,

    denyButtonText: 'No',

    showCancelButton: false,

    confirmButtonText: 'Yes',

    customClass: {

      confirmButton: 'confirm-button',

      cancelButton: 'cancel-button',

    },

    buttonsStyling: false,

  });

};