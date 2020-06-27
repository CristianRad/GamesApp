import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Screenshot } from 'src/app/_models/screenshot';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GameService } from 'src/app/_services/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screenshot-editor',
  templateUrl: './screenshot-editor.component.html',
  styleUrls: ['./screenshot-editor.component.css']
})
export class ScreenshotEditorComponent implements OnInit {
  @Input() screenshots: Screenshot[];
  @Input() gameId: number;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(
    private alertify: AlertifyService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'games/' + this.gameId + '/screenshots',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Screenshot = JSON.parse(response);
        const screenshot = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded
        };
        this.screenshots.push(screenshot);
      }
    };
  }

  deleteScreenshot(id: number) {
    this.alertify.confirm('Are you sure you want to delete this screenshot?', () => {
      this.gameService.deleteScreenshot(this.gameId, id).subscribe(() => {
        this.screenshots.splice(this.screenshots.findIndex(p => p.id === id), 1);
        this.alertify.success('Screenshot has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the screenshot');
      });
    });
  }
}
