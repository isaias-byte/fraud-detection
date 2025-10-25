import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
  standalone: false,
})
export class AddTransactionPage implements OnInit {

  paymentForm: FormGroup;
  // URL de tu API en Python
  private apiURL = ''; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    
    // Definición del formulario y sus validadores
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

  processPayment() {
    if (this.paymentForm.invalid) {
      console.log('Formulario inválido');
      // Opcional: Marcar todos los campos como "tocados" para mostrar errores
      this.paymentForm.markAllAsTouched();
      return;
    }

    // Si el formulario es válido, aquí llamamos a la API
    console.log('Datos del formulario:', this.paymentForm.value);

    // Aquí es donde nos conectamos al backend de Python
    // this.http.post(this.apiURL, this.paymentForm.value).subscribe(
    //   (respuesta) => {
    //     console.log('Respuesta de la API:', respuesta);
    //     // Aquí puedes mostrar si fue fraudulenta o no
    //     // por ejemplo, con un Alert de Ionic
    //   },
    //   (error) => {
    //     console.error('Error al contactar la API:', error);
    //   }
    // );
    
    // Por ahora (demo), solo reseteamos el formulario
    alert('Transacción enviada a verificar (simulación)');
    this.paymentForm.reset();
  }

}
