import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { EmployeeService } from '../services/employee.service';
import { PieArcDatum } from 'd3-shape';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  private employeeData: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }
 
  private fetchEmployeeData(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employeeData = employees;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  private createChart(): void {
    this.zone.runOutsideAngular(() => {
      const svg = d3.select(this.elementRef.nativeElement).select('svg');
      svg.selectAll('*').remove(); 
      const width = 700;
    
      const height = 600;
     
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeSet1);


      const chartGroup = svg
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`); 

   
      const arc = d3
        .arc<PieArcDatum<any>>()
        .innerRadius(radius - 150)
        .outerRadius(radius);

    
      const pie = d3
        .pie<any>()
        .sort(null)
        .value((d) => 1);

      const slices = chartGroup
        .selectAll('path')
        .data(pie(this.employeeData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d) =>
          d.data.online ? color('Online') : color('Offline')
        )
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
      
   
      const textLabels = chartGroup
        .selectAll('text')
        .data(pie(this.employeeData))
        .enter()
        .append('text')
        .attr('transform', (d) => {
          const centroid = arc.centroid(d);
          return `translate(${centroid[0]}, ${centroid[1]})`;
        })
        .attr('text-anchor', 'middle')
        .text(
          (d: any) => `${d.data.name} - ${d.data.online ? 'Active' : 'InActive'}`
        );
    });
  }

  
}
