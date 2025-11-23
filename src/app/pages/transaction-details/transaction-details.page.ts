import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
  standalone: false,
})
export class TransactionDetailsPage implements OnInit {

  transaction: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Capture the data passed via navigation state
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.transaction = this.router.getCurrentNavigation()?.extras.state?.['transaction'];
      }
    });
  }

  ngOnInit() {
    
  }
}
