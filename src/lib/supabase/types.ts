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
          crafting_materials: number;
          crafting_materials_legends: number;
          coins: number;
          legendary_skins: number;
          featured: boolean;
          sold: boolean;
          platform: string | null;
          description: string | null;
          tags: string[];
          images: string[];
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
          crafting_materials?: number;
          crafting_materials_legends?: number;
          coins?: number;
          legendary_skins?: number;
          featured?: boolean;
          sold?: boolean;
          platform?: string | null;
          description?: string | null;
          tags?: string[];
          images?: string[];
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
          crafting_materials?: number;
          crafting_materials_legends?: number;
          coins?: number;
          legendary_skins?: number;
          featured?: boolean;
          sold?: boolean;
          platform?: string | null;
          description?: string | null;
          tags?: string[];
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          account_id: string;
          snap_token: string | null;
          order_id_midtrans: string;
          status: string;
          total_amount: number;
          credential_email: string | null;
          credential_password: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          account_id: string;
          snap_token?: string | null;
          order_id_midtrans: string;
          status?: string;
          total_amount: number;
          credential_email?: string | null;
          credential_password?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          account_id?: string;
          snap_token?: string | null;
          order_id_midtrans?: string;
          status?: string;
          total_amount?: number;
          credential_email?: string | null;
          credential_password?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

export type AccountRow = Database["public"]["Tables"]["accounts"]["Row"];
