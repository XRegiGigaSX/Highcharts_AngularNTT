import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Chart } from 'angular-highcharts';

HC_more(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'NTT_pro2';
  Highcharts: typeof Highcharts = Highcharts;
  pbform!: FormGroup;
  chart: any;
  chartData: any;
  // pickedcolor: any;

  constructor(private fb: FormBuilder) {
    this.pbform = this.fb.group({
      pairs: this.fb.array([])
    });
  }

  ngOnInit() {
    this.chart = Highcharts.chart('container', {
      chart: {
        type: 'packedbubble'
      },
      title: {
        text: 'Packed Bubble Chart'
      },
      series: [{
        type: 'packedbubble',
        data: [1, 2, 4, 5]
      }]
    });
  }

  get pairs() {
    return this.pbform.get('pairs') as FormArray;
  }

  addPair() {
    this.pairs.push(this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      pickedcolor: ['', Validators.required]
    }));
  }

  removePair(index: number) {
    this.pairs.removeAt(index);
  }

  onSubmit() {
    if (this.pbform.valid) {
      const formData = this.pbform.value.pairs;
      const seriesData = formData.map((pair: { name: string; value: string; pickedcolor: string; }) => ({
        type: 'packedbubble',
        name: pair.name,
        data: [{
          value: parseFloat(pair.value),
          color: pair.pickedcolor
        }]
      }));

      this.chartData = seriesData;

      // Clear existing series
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(true);
      }

      // Add new series
      seriesData.forEach((series: Highcharts.SeriesPackedbubbleOptions) => {
        this.chart.addSeries(series);
      });

      console.log(seriesData);
    }
  }
}

