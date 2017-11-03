import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-templates',
  templateUrl: './basic-templates.component.html',
  styleUrls: ['./basic-templates.component.sass']
})
export class BasicTemplatesComponent implements OnInit {

  // templates = [
  //   [ 0, 0, 0 ],
  //   [ 1, 1, 1 ],
  //   [ 2, 2, 2 ]
  // ];
  //
  // templateOptions = [
  //   {
  //     type: 'Frontend',
  //     options: [
  //       { value: 0, name: 'VueJS', color: '#41B883', logo: 'vuejs_logo.png' },
  //       { value: 1, name: 'Angular', color: '#C30E2E', logo: 'angular_logo.png' },
  //       { value: 2, name: 'React', color: '#61DAFB', logo: 'react_logo.png' }
  //     ]
  //   },
  //   {
  //     type: 'Backend',
  //     options: [
  //       { value: 0, name: 'Laravel', color: '#FB503B', logo: 'laravel_logo.png' },
  //       { value: 1, name: 'Django', color: '#417DB0', logo: 'python_logo.png' },
  //       { value: 2, name: 'Express', color: '#35434F', logo: 'nodejs_logo.png' }
  //     ]
  //   },
  //   {
  //     type: 'Database',
  //     options: [
  //       { value: 0, name: 'MariaDB', color: '#FB503B', logo: 'mariadb_logo.png' },
  //       { value: 1, name: 'MySQL', color: '#417DB0', logo: 'mysql_logo.png' },
  //       { value: 2, name: 'MongoDB', color: '#35434F', logo: 'mongodb_logo.png' }
  //     ]
  //   }
  // ]




  constructor() {

  }

  ngOnInit() {
  }
  //
  // change () {
  //   this.templates[0][0] = 1
  // }

}
