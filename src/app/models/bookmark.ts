export interface Bookmark {
  id: string;
  name: string;
  url: string;
  lastUpdated: Date;
}

export interface BookmarksList {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}
