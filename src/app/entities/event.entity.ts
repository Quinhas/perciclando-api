export interface IEvent {
  id: string;
  name: string;
  description: string | null;
  date: Date | null;
  thumbnailUrl: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
