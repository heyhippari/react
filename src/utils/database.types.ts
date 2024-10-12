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
          parent_id: number | null
          update_time: string
        }
        Insert: {
          create_time: string
          id?: number
          name: string
          parent_id?: number | null
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: string
          parent_id?: number | null
          update_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          id: number
          type: Database["public"]["Enums"]["image_type"]
          uuid: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: Database["public"]["Enums"]["image_type"]
          uuid: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: Database["public"]["Enums"]["image_type"]
          uuid?: string
        }
        Relationships: []
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
            foreignKeyName: "jobs_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_missing_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_recently_released"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_released_today"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_persons_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "most_popular_persons"
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
          create_time?: string
          id?: number
          name?: string | null
          original_name: string
          update_time?: string
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
      movie_images: {
        Row: {
          id: number
          image_id: number
          movie_id: number
        }
        Insert: {
          id?: number
          image_id: number
          movie_id: number
        }
        Update: {
          id?: number
          image_id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "movie_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_images_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_images_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_missing_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_images_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_recently_released"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_images_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_released_today"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          create_time: string
          dvd_id: string | null
          front_cover_url: string | null
          full_cover_url: string | null
          has_nudity: boolean
          id: number
          label_id: number | null
          length: number | null
          name: string | null
          original_name: string
          release_date: string | null
          series_id: number | null
          studio_id: number | null
          update_time: string
        }
        Insert: {
          create_time?: string
          dvd_id?: string | null
          front_cover_url?: string | null
          full_cover_url?: string | null
          has_nudity?: boolean
          id?: number
          label_id?: number | null
          length?: number | null
          name?: string | null
          original_name: string
          release_date?: string | null
          series_id?: number | null
          studio_id?: number | null
          update_time?: string
        }
        Update: {
          create_time?: string
          dvd_id?: string | null
          front_cover_url?: string | null
          full_cover_url?: string | null
          has_nudity?: boolean
          id?: number
          label_id?: number | null
          length?: number | null
          name?: string | null
          original_name?: string
          release_date?: string | null
          series_id?: number | null
          studio_id?: number | null
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
      person_images: {
        Row: {
          id: number
          image_id: number
          person_id: number
        }
        Insert: {
          id?: number
          image_id: number
          person_id: number
        }
        Update: {
          id?: number
          image_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "person_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_images_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "most_popular_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_images_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      persons: {
        Row: {
          birth_date: string | null
          bust_size: number | null
          create_time: string
          height: number | null
          hips_size: number | null
          id: number
          name: string | null
          original_name: string
          popularity: number | null
          profile_url: string | null
          update_time: string
          waist_size: number | null
          persons_movies_count: number | null
        }
        Insert: {
          birth_date?: string | null
          bust_size?: number | null
          create_time?: string
          height?: number | null
          hips_size?: number | null
          id?: number
          name?: string | null
          original_name: string
          popularity?: number | null
          profile_url?: string | null
          update_time?: string
          waist_size?: number | null
        }
        Update: {
          birth_date?: string | null
          bust_size?: number | null
          create_time?: string
          height?: number | null
          hips_size?: number | null
          id?: number
          name?: string | null
          original_name?: string
          popularity?: number | null
          profile_url?: string | null
          update_time?: string
          waist_size?: number | null
        }
        Relationships: []
      }
      persons_aliases: {
        Row: {
          id: number
          name: string | null
          original_name: string | null
          person_id: number
        }
        Insert: {
          id?: number
          name?: string | null
          original_name?: string | null
          person_id: number
        }
        Update: {
          id?: number
          name?: string | null
          original_name?: string | null
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "persons_aliases_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "most_popular_persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persons_aliases_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          create_time: string
          email: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          create_time?: string
          email?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          create_time?: string
          email?: string | null
          id?: string
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
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
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
            foreignKeyName: "roles_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_missing_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_recently_released"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_movies_movie"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_released_today"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_persons_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "most_popular_persons"
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
          create_time?: string
          id?: number
          name?: string | null
          original_name: string
          update_time?: string
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
          fts_doc: unknown | null
          homepage: string | null
          id: number
          name: string | null
          original_name: string
          update_time: string
          studio_movies_count: number | null
        }
        Insert: {
          create_time?: string
          fts_doc?: unknown | null
          homepage?: string | null
          id?: number
          name?: string | null
          original_name: string
          update_time?: string
        }
        Update: {
          create_time?: string
          fts_doc?: unknown | null
          homepage?: string | null
          id?: number
          name?: string | null
          original_name?: string
          update_time?: string
        }
        Relationships: []
      }
      tags: {
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
          {
            foreignKeyName: "category_movies_movie_id"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_missing_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_movies_movie_id"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_recently_released"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_movies_movie_id"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies_released_today"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      views: {
        Row: {
          client_hash: string | null
          date: string
          id: number
          item_id: number | null
          item_type: string | null
        }
        Insert: {
          client_hash?: string | null
          date?: string
          id?: number
          item_id?: number | null
          item_type?: string | null
        }
        Update: {
          client_hash?: string | null
          date?: string
          id?: number
          item_id?: number | null
          item_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      current_counts: {
        Row: {
          label_count: number | null
          movie_count: number | null
          person_count: number | null
          series_count: number | null
          studio_count: number | null
          tag_count: number | null
        }
        Relationships: []
      }
      most_popular_persons: {
        Row: {
          id: number | null
          name: string | null
          original_name: string | null
          popularity: number | null
          profile_url: string | null
        }
        Relationships: []
      }
      movies_missing_info: {
        Row: {
          dvd_id: string | null
          front_cover_url: string | null
          id: number | null
          name: string | null
          original_name: string | null
          release_date: string | null
        }
        Relationships: []
      }
      movies_recently_released: {
        Row: {
          dvd_id: string | null
          front_cover_url: string | null
          id: number | null
          name: string | null
          original_name: string | null
        }
        Relationships: []
      }
      movies_released_today: {
        Row: {
          create_time: string | null
          dvd_id: string | null
          front_cover_url: string | null
          id: number | null
          label_id: number | null
          length: number | null
          name: string | null
          original_name: string | null
          release_date: string | null
          series_id: number | null
          studio_id: number | null
          update_time: string | null
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
      roles_by_age: {
        Row: {
          age: number | null
          count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
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
      update_person_popularity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_permission:
        | "movie.delete"
        | "movie.update"
        | "movie.create"
        | "person.delete"
        | "person.update"
        | "person.create"
        | "series.delete"
        | "series.update"
        | "series.create"
        | "studio.delete"
        | "studio.update"
        | "studio.create"
        | "category.delete"
        | "category.update"
        | "category.create"
        | "label.delete"
        | "label.update"
        | "label.create"
        | "image.delete"
        | "image.update"
        | "image.create"
        | "job.delete"
        | "job.update"
        | "job.create"
        | "role.delete"
        | "role.update"
        | "role.create"
        | "tag.delete"
        | "tag.update"
        | "tag.create"
      app_role: "admin" | "moderator" | "user" | "banned"
      image_type:
        | "front_cover"
        | "full_cover"
        | "art"
        | "disc"
        | "profile"
        | "logo"
        | "screenshot"
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
