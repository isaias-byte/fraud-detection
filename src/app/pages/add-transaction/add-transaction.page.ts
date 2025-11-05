import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
  standalone: false,
})
export class AddTransactionPage implements OnInit {

  paymentForm: FormGroup; 

  constructor(
    private fb: FormBuilder,   
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: Api,
  ) {
        
    this.paymentForm = this.fb.group({
      cardNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{16}$') // Valida 16 dígitos numéricos
      ]],
      cardName: ['', [
        Validators.required,
        Validators.minLength(5) // Un nombre razonable
      ]],
      expiryDate: ['', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$') // Formato MM/AA
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{3,4}$') // Valida 3 o 4 dígitos
      ]],
    });
  }

  ngOnInit() {
  }

  async processPayment() {
    if (this.paymentForm.invalid) {
      console.log('Formulario inválido');
      // Opcional: Marcar todos los campos como "tocados" para mostrar errores
      this.paymentForm.markAllAsTouched();
      return;
    }

    

    const loading = await this.loadingCtrl.create({
      message: 'Procesando transacción...',
    });
    await loading.present();

    const formData = this.paymentForm.value;

    const [month, year] = formData.expiryDate.split('/');
    
    const apiPayload = {
      name: formData.cardName,
      card_bin: formData.cardNumber.substring(0, 6), // Primeros 6 dígitos
      card_last_four: formData.cardNumber.substring(12, 16), // Últimos 4 dígitos
      card_expiry_month: parseInt(month, 10), // Convertimos '05' a 5
      card_expiry_year: parseInt('20' + year, 10) // Convertimos '29' a 2029
    };

    console.log('Datos del formulario:', this.paymentForm.value);

    this.api.createTransactionAndUser(apiPayload).subscribe(
      async (response) => {
        await loading.dismiss();
        console.log('Respuesta de la API:', response);
        this.showAlert('Éxito', 'La transacción y el usuario se crearon.');
        this.paymentForm.reset();
      },
      async (error) => {
        await loading.dismiss();
        console.error('Error al contactar la API:', error);
        if (error.status === 0) {
          this.showAlert('Error de Conexión', 'No se pudo conectar con la API.');
        } else {
          this.showAlert('Error', `Ocurrió un error: ${error.message}`);
        }
      }
    );
    
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
