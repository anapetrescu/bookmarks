import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  createDb(): { bookmarks: Bookmark[] } {
    const bookmarks: Bookmark[] = [
      {
        id: 'd515e5d5-5b1a-4511-beb3-d747475c383c',
        name: 'Google',
        url: 'https://www.google.com',
        lastUpdated: new Date('2024-10-20T13:22:00'),
      },
      {
        id: 'd515e5d5-5b1a-4511-beb3-d747475c323c',
        name: 'Gits',
        url: 'https://www.gitscom.ro/',
        lastUpdated: new Date('2024-09-17T13:22:00'),
      },
      {
        id: 'daba481d-122e-4a59-8214-d2d356dd70f8',
        name: 'Angular',
        url: 'https://angular.io',
        lastUpdated: new Date('2024-10-18T10:11:00'),
      },
      {
        id: '1f6d44a4-4a36-4288-8bdc-3df1281adaf1',
        name: 'GitHub',
        url: 'https://github.com',
        lastUpdated: new Date('2024-10-19T19:32:00'),
      },
      {
        id: '1f6d44a4-4a36-4288-8bdc-3df1281aeae1',
        name: 'Speed Test',
        url: 'https://www.speedtest.net/',
        lastUpdated: new Date('2024-10-16T19:32:00'),
      },
    ];

    return { bookmarks };
  }
}
