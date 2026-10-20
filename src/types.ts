export interface RsvpData {
  name: string;
  attending: 'accepted' | 'declined';
  guestCount: number;
  dietaryNote?: string;
  submittedAt: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  text: string;
  category: 'Blessing' | 'Question' | 'Opinion';
  timestamp: string;
  likes: number;
}
