import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-tachometer'
  },
  {
    title: true,
    name: 'Inquiry'
  },
  {
    name: 'All Inquiry',
    url: '/all-inquiries',
    icon: 'fa fa-users'
  },
  {
    title: true,
    name: 'Student Management'
  },
  {
    name: 'All Students',
    url: 'all-students',
    icon: 'fa fa-address-book'
  },
  {
    title: true,
    name: 'Expence Management'
  },
  {
    name: 'All Expence',
    url: 'all-expences',
    icon: 'fa fa-database'
  },
  {
    title: true,
    name: 'Exam Management'
  },
  {
    name: 'Exam Section',
    url: 'all-exams',
    icon: 'fa fa-book'
  },
  {
    name: 'Result Creation Wizard',
    url: 'final-exam-results',
    icon: 'fa fa-table'
  }
];
