export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          create_time: string
          id: number
          name: string
          update_time: string
        }
        Insert: {
          create_time: string
          id?: number
          name: string
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: string
          update_time?: string
        }
        Relationships: []
      }
      category_movies: {
        Row: {
          category_id: number
          movie_id: number
        }
        Insert: {
          category_id: number
          movie_id: number
        }
        Update: {
          category_id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "category_movies_category_id"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_movies_movie_id"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          id: number
          movie_id: number
          person_id: number
          type: string | null
        }
        Insert: {
          id?: number
          movie_id: number
          person_id: number
          type?: string | null
        }
        Update: {
          id?: number
          movie_id?: number
          person_id?: number
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_persons_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      labels: {
        Row: {
          create_time: string
          id: number
          name: string | null
          original_name: string
          update_time: string
        }
        Insert: {
          create_time: string
          id?: number
          name?: string | null
          original_name: string
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: string | null
          original_name?: string
          update_time?: string
        }
        Relationships: []
      }
      movies: {
        Row: {
          art_url: string | null
          create_time: string
          dvd_id: string | null
          id: number
          label_id: number | null
          length: number | null
          name: string | null
          original_name: string
          release_date: string | null
          series_id: number | null
          studio_id: number | null
          thumb_url: string | null
          update_time: string
        }
        Insert: {
          art_url?: string | null
          create_time: string
          dvd_id?: string | null
          id?: number
          label_id?: number | null
          length?: number | null
          name?: string | null
          original_name: string
          release_date?: string | null
          series_id?: number | null
          studio_id?: number | null
          thumb_url?: string | null
          update_time: string
        }
        Update: {
          art_url?: string | null
          create_time?: string
          dvd_id?: string | null
          id?: number
          label_id?: number | null
          length?: number | null
          name?: string | null
          original_name?: string
          release_date?: string | null
          series_id?: number | null
          studio_id?: number | null
          thumb_url?: string | null
          update_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "movies_labels_movies"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "labels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movies_series_movies"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movies_studios_movies"
            columns: ["studio_id"]
            isOneToOne: false
            referencedRelation: "studios"
            referencedColumns: ["id"]
          },
        ]
      }
      persons: {
        Row: {
          art_url: string | null
          birth_date: string | null
          create_time: string
          id: number
          name: string | null
          original_name: string
          thumb_url: string | null
          update_time: string
          persons_movies_count: number | null
        }
        Insert: {
          art_url?: string | null
          birth_date?: string | null
          create_time: string
          id?: number
          name?: string | null
          original_name: string
          thumb_url?: string | null
          update_time: string
        }
        Update: {
          art_url?: string | null
          birth_date?: string | null
          create_time?: string
          id?: number
          name?: string | null
          original_name?: string
          thumb_url?: string | null
          update_time?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          age: number | null
          id: number
          movie_id: number
          person_id: number
        }
        Insert: {
          age?: number | null
          id?: number
          movie_id: number
          person_id: number
        }
        Update: {
          age?: number | null
          id?: number
          movie_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "roles_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_persons_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      series: {
        Row: {
          create_time: string
          id: number
          name: string | null
          original_name: string
          update_time: string
          series_movies_count: number | null
        }
        Insert: {
          create_time: string
          id?: number
          name?: string | null
          original_name: string
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: string | null
          original_name?: string
          update_time?: string
        }
        Relationships: []
      }
      studios: {
        Row: {
          create_time: string
          id: number
          name: string | null
          original_name: string
          update_time: string
          studio_movies_count: number | null
        }
        Insert: {
          create_time: string
          id?: number
          name?: string | null
          original_name: string
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: string | null
          original_name?: string
          update_time?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      persons_movies_count: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      series_movies_count: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      studio_movies_count: {
        Args: {
          "": unknown
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
