import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public snackBar: MatSnackBar) {

  }

  parseError(err): Array<string> {
    let messages: Array<string> = [];
    if(!err) {
      return messages;
    }
    if(err.code && err.message) {
      messages.push(err.message);
      return messages;
    }
    if(err.error) {
      if(err.error.message) {
        messages.push(err.error.message);
        return messages;
      }
      if(err.error.errors) {
        for (const key of Object.keys(err.error.errors)) {
          messages.push(err.error.errors[key].message);
        }
        return messages;
      } else if (err.error.errmsg) {
        messages.push(err.error.errmsg);
        return messages;
      } else if (err.error) {
        messages.push(err.error);
        return messages;
      }
    } else {
      messages.push(err);
      return messages;
    }
    return ['Something went wrong!'];
  }

  showError(errorMessages: string[]) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { errorMessages: errorMessages },
      duration: 2500,
    });
  }

  showSuccess(successMessages: string[]) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { successMessages: successMessages },
      duration: 2500,
    });
  }

}
