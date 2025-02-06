import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading = signal<boolean>(false);

  get loadingStatus(): boolean {
    return this.loading();
  }

  setValue(value: boolean) {
    this.loading.set(value);
  }
}
