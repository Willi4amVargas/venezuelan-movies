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
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      gender: {
        Row: {
          description: string
          id: number
        }
        Insert: {
          description: string
          id?: number
        }
        Update: {
          description?: string
          id?: number
        }
        Relationships: []
      }
      movie_gender: {
        Row: {
          gender_id: number
          movie_id: number
        }
        Insert: {
          gender_id: number
          movie_id?: number
        }
        Update: {
          gender_id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "movie_gender_gender_id_fkey"
            columns: ["gender_id"]
            isOneToOne: false
            referencedRelation: "gender"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_gender_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          cover: string | null
          description: string
          director: number
          duration: number
          id: number
          release: string
          state: number | null
          synopsis: string | null
          title: string
          trailer: string | null
        }
        Insert: {
          cover?: string | null
          description: string
          director: number
          duration: number
          id?: number
          release: string
          state?: number | null
          synopsis?: string | null
          title: string
          trailer?: string | null
        }
        Update: {
          cover?: string | null
          description?: string
          director?: number
          duration?: number
          id?: number
          release?: string
          state?: number | null
          synopsis?: string | null
          title?: string
          trailer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movies_director_fkey1"
            columns: ["director"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movies_state_fkey"
            columns: ["state"]
            isOneToOne: false
            referencedRelation: "movies_state"
            referencedColumns: ["id"]
          },
        ]
      }
      movies_creator: {
        Row: {
          movie_id: number
          user_id: string
        }
        Insert: {
          movie_id?: number
          user_id: string
        }
        Update: {
          movie_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movies_creator_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      movies_people: {
        Row: {
          id: string
          movie_id: number
          people_id: number
        }
        Insert: {
          id?: string
          movie_id: number
          people_id: number
        }
        Update: {
          id?: string
          movie_id?: number
          people_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "movies_people_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movies_people_people_id_fkey"
            columns: ["people_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      movies_state: {
        Row: {
          description: string
          id: number
        }
        Insert: {
          description: string
          id?: number
        }
        Update: {
          description?: string
          id?: number
        }
        Relationships: []
      }
      people: {
        Row: {
          biography: string | null
          birth: string | null
          created_at: string
          id: number
          last_name: string | null
          name: string
          type: number
        }
        Insert: {
          biography?: string | null
          birth?: string | null
          created_at?: string
          id?: number
          last_name?: string | null
          name: string
          type?: number
        }
        Update: {
          biography?: string | null
          birth?: string | null
          created_at?: string
          id?: number
          last_name?: string | null
          name?: string
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "people_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "people_type"
            referencedColumns: ["id"]
          },
        ]
      }
      people_type: {
        Row: {
          created_at: string
          description: string
          id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
        }
        Relationships: []
      }
      review: {
        Row: {
          created_at: string
          description: string
          id: number
          movie: number | null
          user: string | null
          username: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          movie?: number | null
          user?: string | null
          username: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          movie?: number | null
          user?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_movie_fkey"
            columns: ["movie"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_watchlist: {
        Row: {
          created_at: string
          movie_id: number
          user: string
        }
        Insert: {
          created_at?: string
          movie_id: number
          user: string
        }
        Update: {
          created_at?: string
          movie_id?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
