import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private employeeData: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,   
  ) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  private fetchEmployeeData(): void {
  
    this.employeeData = [
      { name: 'tom baby', someNumericProperty: 4 },
      { name: 'basil babu', someNumericProperty: 5 },
      { name: 'amal biju', someNumericProperty: 1 },
      { name: 'iby binu', someNumericProperty: 3 },
      { name: 'don joseph', someNumericProperty: 2 },
    ];

    this.createChart();
  }

  private createChart(): void {
    this.zone.runOutsideAngular(() => {
      const svg = d3.select(this.elementRef.nativeElement).select('svg');
      svg.selectAll('*').remove();

      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const chartGroup = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.5); //bar width
      const y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);  //bar height

      x.domain(this.employeeData.map((d) => d.name));
      y.domain([0, d3.max(this.employeeData, (d) => d.someNumericProperty)]);

      const bars = chartGroup
        .selectAll('.bar')
        .data(this.employeeData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => y(d.someNumericProperty)!)
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - margin.top - margin.bottom - y(d.someNumericProperty)!)
        .style('fill', '#4CAF50'); // Green color

      bars.on('mouseover', function () {
        d3.select(this).style('fill', '#45a049'); // Darker green on hover
      });

      bars.on('mouseout', function () {
        d3.select(this).style('fill', '#4CAF50'); //mouse out
      });

      chartGroup.append('g').call(d3.axisLeft(y));
      chartGroup
        .append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-18)'); //label rotate
    });
  }
}
