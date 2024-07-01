import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  languages: string[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.languages = ['ENG', 'SPA', 'FRE'];
  }

  selectLanguage(language: string) {
    this.activeModal.close(language);
  }

  close() {
    this.activeModal.close();
  }
}
