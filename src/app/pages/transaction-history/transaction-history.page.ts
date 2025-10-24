import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
export class TransactionHistoryPage implements OnInit {

  transactions: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // Simulamos la carga de datos
    this.loadHistory();
  }

  loadHistory() {
    // En el futuro, aquí llamarías a tu servicio
    // Por ahora, usamos los 3 datos harcodeados
    this.transactions = [
      {
        id: 'tx_1a2b3c4d5e',
        fecha: '2025-10-23T14:30:00Z',
        monto: 1500.00,
        tarjeta: '...1234'
      },
      {
        id: 'tx_6f7g8h9i0j',
        fecha: '2025-10-22T09:15:00Z',
        monto: 80.50,
        tarjeta: '...5678'
      },
      {
        id: 'tx_k1l2m3n4o5',
        fecha: '2025-10-21T18:45:00Z',
        monto: 3200.75,
        tarjeta: '...9012'
      }
    ];
  }

  // 1. Acción de NAVEGAR
  transactionDetails(id: string) {
    console.log('Navegando al detalle de la transacción:', id);
    
    // Aquí navegarías a tu página de detalle
    // (Asegúrate de crear esta página, ej: 'transaction-detail')
    // this.router.navigate(['/transaction-detail', id]);

    // Por ahora, solo mostramos un alert
    this.showAlert('Ver Detalle', `Navegando a la página de detalle para ${id}`);
  }

  // 2. Acción de ELIMINAR
  async deleteTransaction(id: string, slidingItem: any) { // 'any' para ion-item-sliding
    
    // Cerramos el ítem deslizable primero
    slidingItem.close();

    // Mostramos una confirmación
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta transacción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Si el usuario confirma, procedemos a borrar
            this.executeDelete(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async executeDelete(id: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });
    await loading.present();

    // --- Simulación de llamada a API ---
    // En un caso real:
    // this.apiService.deleteTransaction(id).subscribe(() => { ... });
    setTimeout(() => {
      // Filtramos el arreglo para quitar el ítem eliminado (simulación)
      this.transactions = this.transactions.filter(tx => tx.id !== id);
      loading.dismiss();
      this.showAlert('Éxito', 'Transacción eliminada correctamente.');
    }, 1000); // Simulamos 1 segundo de espera
    // --- Fin Simulación ---
  }


  // Helper para mostrar alertas rápido
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
