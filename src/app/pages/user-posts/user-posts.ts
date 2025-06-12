import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.scss',
})

// showing user's posts and name based on route
export class UserPosts implements OnInit {
  userId: number | null = null;
  userName: string = 'User';
  userPosts: any[] = [];
  users: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        this.userId = +id;
        this.fetchUserDetailsAndPosts();
      } else {
        console.error('User ID not found in route parameters.');
        this.router.navigate(['/users']);
      }
    });
  }

  fetchUserDetailsAndPosts(): void {
    if (this.userId !== null) {
      this.apiService.getUsers().subscribe((usersData) => {
        this.users = usersData;
        const currentUser = this.users.find((u) => u.id === this.userId);
        if (currentUser) {
          this.userName = currentUser.name;
        } else {
          this.userName = 'უცნობი მომხმარებელი';
        }

        this.apiService.getUserPosts(this.userId!).subscribe((postsData) => {
          this.userPosts = postsData;
        });
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
