import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (
      this.searchTerm == '' ||
      this.searchTerm == undefined ||
      this.searchTerm == null
    ) {
      this.filteredUsers = [...this.users];
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }

  viewUserPosts(userId: number): void {
    this.router.navigate(['/user-posts', userId]);
  }

  viewUserTodos(userId: number): void {
    this.router.navigate(['/user-todos', userId]);
  }
}
