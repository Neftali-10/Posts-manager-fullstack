import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  handle(error: any) {

    console.error(
      'API Error:',
      error,
    );

    const message =
      error?.error?.message ||
      'Unexpected error';

    alert(message);
  }
}