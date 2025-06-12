import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-todos.html',
  styleUrl: './user-todos.scss',
})
export class UserTodos implements OnInit {
  userId: number | null = null;
  userName: string = 'User';
  todos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  // grab userid and fetch
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        this.userId = +id;
        this.fetchUserDetailsAndTodos();
      } else {
        console.error('User ID not found in route parameters.');
        this.router.navigate(['/users']);
      }
    });
  }

  fetchUserDetailsAndTodos(): void {
    if (this.userId !== null) {
      this.apiService.getUser(this.userId).subscribe({
        next: (userData) => {
          this.userName = userData.name || 'უცნობი მომხმარებელი';
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
          this.userName = 'უცნობი მომხმარებელი';
        },
      });

      this.apiService.getUserTodos(this.userId).subscribe({
        next: (todosData) => {
          this.todos = todosData;
        },
        error: (err) => {
          console.error('Error fetching user todos:', err);
          this.todos = [];
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
