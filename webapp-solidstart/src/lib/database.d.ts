export interface Conversation {
  id: number;
  is_archived: boolean | null;
  is_public: boolean | null;
  subject: string;
  created_at: Date | null;
  updated_at: Date | null;
  participation_id: number;
  mute_notification: boolean | null;
  display_name: string | null;
  participation_created_at: Date | null;
  participation_updated_at: Date | null;
  last_message_id: number | null;
  last_message_date: Date | null;
  last_message_content: string | null;
}
