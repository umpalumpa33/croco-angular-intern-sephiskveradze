import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  users: any[] = [];
  searchTerm: string = '';

  showDetailsModal: boolean = false;
  selectedPost: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((usersData) => {
      this.users = usersData;
      this.fetchPosts();
    });
  }

  fetchPosts(): void {
    this.apiService.getPosts().subscribe((postsData) => {
      this.posts = postsData.map((post: any) => ({
        ...post,
        userName:
          this.users.find((user) => user.id === post.userId)?.name || 'Unknown',
      }));
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredPosts = [...this.posts];
      return;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredPosts = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.body.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.userName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  openDetailsModal(post: any): void {
    this.selectedPost = post;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedPost = null;
  }
}
