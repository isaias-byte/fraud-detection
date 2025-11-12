import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
export class TransactionHistoryPage implements OnInit {

  historial: any[] = [];
  
  currentPage: number = 1;
  isLoading: boolean = false;

  totalPages: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 25;

  private searchTerm: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: Api
  ) { }

  ngOnInit() {    
    this.goToPage(1);
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value || '';    
    this.goToPage(1, true); 
  }
  
  async goToPage(page: number, isNewSearch: boolean = false) {   
    if (this.isLoading || page < 1 || (page > this.totalPages && this.totalPages > 0)) {
      return;
    }

    this.isLoading = true;
    this.currentPage = page;

    const loading = await this.loadingCtrl.create({
      message: `Cargando página ${page}...`,
    });
    await loading.present();

    this.api.allFraudulentTransactions(this.currentPage, this.searchTerm).subscribe(
      (response) => {        
        this.historial = response.results || [];
              
        this.totalItems = response.count || 0;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        
        loading.dismiss();
        this.isLoading = false;
      },
      async (error) => {
        loading.dismiss();
        this.isLoading = false;        
              
        if (isNewSearch) {
          this.historial = [];
          this.totalItems = 0;
          this.totalPages = 0;
        }
        
        this.showAlert('Error', 'No se pudo cargar el historial de fraudes.');
      }
    );
  }

  goToFirst() {
    this.goToPage(1);
  }

  goToPrevious() {
    this.goToPage(this.currentPage - 1);
  }

  goToNext() {
    this.goToPage(this.currentPage + 1);
  }

  goToLast() {
    this.goToPage(this.totalPages);
  }  

  // 1. Acción de NAVEGAR
  transactionDetails(id: string) {
    console.log('Navegando al detalle de la transacción:', id);
        
    this.showAlert('Ver Detalle', `Navegando a la página de detalle para ${id}`);
  }

  async deleteTransaction(id: string, slidingItem: any) {      
    slidingItem.close();
   
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
      this.historial = this.historial.filter(tx => tx.id !== id);
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
