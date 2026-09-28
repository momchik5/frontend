import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  inputText: string = '';
  resultText: string = '';
  private apiUrl = 'http://localhost:5177/api/data';

  constructor(private http: HttpClient) {}

  sendData() {
    if (!this.inputText.trim()) {
      alert('Пожалуйста, введите текст!');
      return;
    }
    this.http.post(this.apiUrl, { text: this.inputText }).subscribe({
      next: (res: any) => alert(res.message),
      error: (err) => alert('Ошибка при отправке: ' + err.message)
    });
  }

  fetchData() {
    this.http.get<{ text: string }>(this.apiUrl).subscribe({
      next: (res) => this.resultText = res.text,
      error: (err) => alert('Ошибка при получении: ' + err.message)
    });
  }
}