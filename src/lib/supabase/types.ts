export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          rank: string;
          tier_badge: string;
          badge: string;
          price: number;
          level: number;
          badges_tokens: number;
          coins: number;
          skins: number;
          featured: boolean;
          sold: boolean;
          platform: string | null;
          description: string | null;
          tags: string[];
          images: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          rank: string;
          tier_badge: string;
          badge: string;
          price: number;
          level: number;
          badges_tokens?: number;
          coins?: number;
          skins?: number;
          featured?: boolean;
          sold?: boolean;
          platform?: string | null;
          description?: string | null;
          tags?: string[];
          images?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          rank?: string;
          tier_badge?: string;
          badge?: string;
          price?: number;
          level?: number;
          badges_tokens?: number;
          coins?: number;
          skins?: number;
          featured?: boolean;
          sold?: boolean;
          platform?: string | null;
          description?: string | null;
          tags?: string[];
          images?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// Convenience type from the Row
export type AccountRow = Database["public"]["Tables"]["accounts"]["Row"];
