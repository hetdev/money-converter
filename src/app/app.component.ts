import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConverterService} from './shared/converter.service';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  converterForm: FormGroup;
  dollarRate = 1;
  amountConverted = 0;
  internalError = 'Internal Error';
  historicalRates = [];
  updateIntervalTime = 600000;

  constructor(private formBuilder: FormBuilder,
              private converterService: ConverterService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.converterForm = this.formBuilder.group({
      dollarAmount: ['', Validators.required]
    });

    setInterval(() => {
      this.getUpdateConversionData();
    }, this.updateIntervalTime);

    this.getUpdateConversionData();
    this.getHistoricalConversionData();
  }

  onSubmit() {
    if (this.converterForm.invalid) {
      alert('Debes digitar una valor!!');
      return;
    }
    this.amountConverted = this.makeConversion(this.converterForm.value.dollarAmount, this.dollarRate);
  }

  getUpdateConversionData() {
    this.converterService.getConverterData()
      .subscribe((data) => {
          // console.log(data);
          if (_.get(data, 'success')) {
            this.dollarRate = _.get(data, 'rates.USD');
          } else {
            alert('Currency Api failed');
            this.dollarRate = 1;
          }
        },
        error => {
          alert(this.internalError);
        });
  }

  getHistoricalConversionData() {
    const today = new Date();
    today.setDate(today.getDate() - 3);
    const strToday = this.datePipe.transform(today, 'yyyy-MM-dd');
    this.converterService.getHistoricalData(strToday)
      .subscribe((data) => {
          // console.log(data);
          if (_.get(data, 'success')) {
            this.historicalRates = Object.entries(_.get(data, 'rates')).map(([type, value]) => ({type, value}));
            // console.log(this.historicalRates);
          } else {
            alert('Historical Api failed');
          }
        },
        error => {
          alert(this.internalError);
          this.dollarRate = 1;
        });
  }

  makeConversion(amount, rate) {
    return amount * rate;
  }


}
