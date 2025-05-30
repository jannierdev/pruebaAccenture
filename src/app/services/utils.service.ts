import { Injectable } from '@angular/core';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async loading(message: string) {
    const loader = await this.loadingController.create({
      mode: 'ios',
      message,
    });
    await loader.present();
    return loader;
  }

  async showToast(message: string, action?: any) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
    if (action) {
      toast.onDidDismiss().then(() => {
        action();
      });
    }
  }

  async presentAlert(
    header: string,
    message: string,
    button: any,
    inputs?: any,
    subHeader?: string
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      inputs: inputs || [],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // console.log('Alert canceled');
          },
        },
        button,
      ],
    });

    await alert.present();
  }
}
