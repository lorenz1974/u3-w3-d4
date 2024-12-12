

export interface IArticle  {
    id:           number;
    title:        string;
    url:          string;
    image_url:    string;
    news_site:    string;
    summary:      string;
    published_at: Date;
    updated_at:   Date;
    featured:     boolean;
    launches:     ILaunch[];
    events:       any[];
}

export interface ILaunch {
    launch_id: string;
    provider:  string;
}

export interface IApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IArticle[];
}
