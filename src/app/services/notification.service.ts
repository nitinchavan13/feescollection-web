import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable()
export class NotificationService {

    constructor(public toastr: ToastrManager) { }

    showSuccess(message, title = "Success") {
        this.toastr.successToastr(message, title);
      }
    
      showError(message, title = "Error") {
        this.toastr.errorToastr(message, title);
      }
    
      showWarning(message, title = "Warning") {
        this.toastr.warningToastr(message, title);
      }
    
      showInfo(message, title = "Info") {
        this.toastr.infoToastr(message, title);
      }
    
      showCustom() {
        this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
      }
    
      showToast(position: any = 'top-left') {
        this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
      }
}
