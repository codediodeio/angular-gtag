export interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: any;
  [key: string]: any;
}

export interface GtagPageview {
  page_title?: string;
  page_path?: string;
  page_location?: string;
  user_id?: string;
  [key: string]: any;
}

export interface GtagConfig {
  trackingId: string;
  trackPageviews?: boolean;
  debug?: boolean;
}
