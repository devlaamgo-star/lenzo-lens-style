export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      design_requests: {
        Row: {
          address: string
          admin_notes: string
          archived: boolean
          city: string
          colors: string
          created_at: string
          description: string
          email: string
          expected_delivery_at: string | null
          file_path: string | null
          file_paths: string[]
          full_name: string
          id: string
          locale: string
          notes: string
          payment_status: string
          phone: string
          phone_brand: string
          phone_color: string
          phone_model: string
          preview_path: string | null
          priority: string
          quantity: number
          request_number: string
          request_type: string
          shipped_at: string | null
          shipping_carrier: string
          source: string
          status: string
          status_history: Json
          style: string
          subject: string
          tracking_number: string
          updated_at: string
        }
        Insert: {
          address?: string
          admin_notes?: string
          archived?: boolean
          city: string
          colors?: string
          created_at?: string
          description?: string
          email?: string
          expected_delivery_at?: string | null
          file_path?: string | null
          file_paths?: string[]
          full_name: string
          id?: string
          locale?: string
          notes?: string
          payment_status?: string
          phone: string
          phone_brand?: string
          phone_color?: string
          phone_model?: string
          preview_path?: string | null
          priority?: string
          quantity?: number
          request_number: string
          request_type: string
          shipped_at?: string | null
          shipping_carrier?: string
          source?: string
          status?: string
          status_history?: Json
          style?: string
          subject?: string
          tracking_number?: string
          updated_at?: string
        }
        Update: {
          address?: string
          admin_notes?: string
          archived?: boolean
          city?: string
          colors?: string
          created_at?: string
          description?: string
          email?: string
          expected_delivery_at?: string | null
          file_path?: string | null
          file_paths?: string[]
          full_name?: string
          id?: string
          locale?: string
          notes?: string
          payment_status?: string
          phone?: string
          phone_brand?: string
          phone_color?: string
          phone_model?: string
          preview_path?: string | null
          priority?: string
          quantity?: number
          request_number?: string
          request_type?: string
          shipped_at?: string | null
          shipping_carrier?: string
          source?: string
          status?: string
          status_history?: Json
          style?: string
          subject?: string
          tracking_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string
          admin_notes: string
          archived: boolean
          city: string
          created_at: string
          designs: Json
          expected_delivery_at: string | null
          file_paths: string[]
          full_name: string
          id: string
          iphone_model: string
          items: Json
          locale: string
          notes: string | null
          order_number: string
          pack_breakdown: Json | null
          payment_method: string
          payment_status: string
          phone: string
          priority: string
          quantity: number
          shipped_at: string | null
          shipping_carrier: string
          source: string
          status: string
          status_history: Json
          total_mad: number
          tracking_number: string
          updated_at: string
        }
        Insert: {
          address: string
          admin_notes?: string
          archived?: boolean
          city: string
          created_at?: string
          designs?: Json
          expected_delivery_at?: string | null
          file_paths?: string[]
          full_name: string
          id?: string
          iphone_model?: string
          items?: Json
          locale?: string
          notes?: string | null
          order_number: string
          pack_breakdown?: Json | null
          payment_method?: string
          payment_status?: string
          phone: string
          priority?: string
          quantity?: number
          shipped_at?: string | null
          shipping_carrier?: string
          source?: string
          status?: string
          status_history?: Json
          total_mad?: number
          tracking_number?: string
          updated_at?: string
        }
        Update: {
          address?: string
          admin_notes?: string
          archived?: boolean
          city?: string
          created_at?: string
          designs?: Json
          expected_delivery_at?: string | null
          file_paths?: string[]
          full_name?: string
          id?: string
          iphone_model?: string
          items?: Json
          locale?: string
          notes?: string | null
          order_number?: string
          pack_breakdown?: Json | null
          payment_method?: string
          payment_status?: string
          phone?: string
          priority?: string
          quantity?: number
          shipped_at?: string | null
          shipping_carrier?: string
          source?: string
          status?: string
          status_history?: Json
          total_mad?: number
          tracking_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
