import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit{

  returnUrl: string = '/admin';
  
  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/admin';
    });
  }

  goBack() {
    this.router.navigate([this.returnUrl]);
  }

}
