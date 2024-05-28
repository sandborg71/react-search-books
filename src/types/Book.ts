export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_date?: number;
  authors?: { name: string }[];
  publish_date?: string;
  covers?: number[];
  description?: string | { value: string };
  cover_i?: number;
}
