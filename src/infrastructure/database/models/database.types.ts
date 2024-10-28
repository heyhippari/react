export type Json =
  | { [key: string]: Json | undefined }
  | boolean
  | Json[]
  | null
  | number
  | string

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      app_permission:
        | "category.create"
        | "category.delete"
        | "category.update"
        | "image.create"
        | "image.delete"
        | "image.update"
        | "job.create"
        | "job.delete"
        | "job.update"
        | "label.create"
        | "label.delete"
        | "label.update"
        | "movie.create"
        | "movie.delete"
        | "movie.update"
        | "person.create"
        | "person.delete"
        | "person.update"
        | "role.create"
        | "role.delete"
        | "role.update"
        | "series.create"
        | "series.delete"
        | "series.update"
        | "studio.create"
        | "studio.delete"
        | "studio.update"
        | "tag.create"
        | "tag.delete"
        | "tag.update"
      app_role: "admin" | "banned" | "moderator" | "user"
      bra_size:
        | "A"
        | "AA"
        | "B"
        | "C"
        | "D"
        | "E"
        | "F"
        | "G"
        | "H"
        | "I"
        | "J"
        | "K"
        | "L"
        | "M"
      image_type:
        | "art"
        | "disc"
        | "front_cover"
        | "full_cover"
        | "logo"
        | "profile"
        | "screenshot"
      media_format:
        | "Blu-ray"
        | "Blu-ray 4K"
        | "Digital"
        | "DVD"
        | "LaserDisc"
        | "UMD Video"
        | "VHS"
        | "Video CD"
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
      ean13_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ean13_out:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
         
         
         
      hashean13: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashisbn: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashisbn13: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashismn: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashismn13: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashissn: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashissn13: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hashupc: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      is_valid:
        | {
            Args: {
              "": unknown
            }
            Returns: boolean
          }
         
         
         
         
         
         
         
      isbn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      isbn_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      isbn13: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      isbn13_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ismn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ismn_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ismn13: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ismn13_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      isn_out:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
         
         
         
      isn_weak:
        | {
            Args: {
              "": boolean
            }
            Returns: boolean
          }
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
      issn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      issn_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      issn13: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      issn13_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      make_valid:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
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
      upc: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      upc_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      update_person_popularity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Tables: {
      categories: {
        Insert: {
          create_time: string
          id?: number
          name: string
          parent_id?: null | number
          update_time: string
        }
        Relationships: [
          {
            columns: ["parent_id"]
            foreignKeyName: "categories_parent_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "categories"
          },
        ]
        Row: {
          create_time: string
          id: number
          name: string
          parent_id: null | number
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: string
          parent_id?: null | number
          update_time?: string
        }
      }
      images: {
        Insert: {
          created_at?: string
          id?: number
          type: Database["public"]["Enums"]["image_type"]
          uuid: string
        }
        Relationships: []
        Row: {
          created_at: string
          id: number
          type: Database["public"]["Enums"]["image_type"]
          uuid: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: Database["public"]["Enums"]["image_type"]
          uuid?: string
        }
      }
      jobs: {
        Insert: {
          id?: number
          movie_id: number
          person_id: number
          type?: null | string
        }
        Relationships: [
          {
            columns: ["movie_id"]
            foreignKeyName: "jobs_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "jobs_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_missing_info"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "jobs_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_recently_released"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "jobs_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_released_today"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "jobs_persons_person"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "most_popular_persons"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "jobs_persons_person"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "persons"
          },
        ]
        Row: {
          id: number
          movie_id: number
          person_id: number
          type: null | string
        }
        Update: {
          id?: number
          movie_id?: number
          person_id?: number
          type?: null | string
        }
      }
      labels: {
        Insert: {
          create_time?: string
          id?: number
          name?: null | string
          original_name: string
          update_time?: string
        }
        Relationships: []
        Row: {
          create_time: string
          id: number
          name: null | string
          original_name: string
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: null | string
          original_name?: string
          update_time?: string
        }
      }
      movie_images: {
        Insert: {
          id?: number
          image_id: number
          movie_id: number
          sequence?: null | number
        }
        Relationships: [
          {
            columns: ["image_id"]
            foreignKeyName: "movie_images_image_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "images"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "movie_images_movie_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "movie_images_movie_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_missing_info"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "movie_images_movie_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_recently_released"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "movie_images_movie_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_released_today"
          },
        ]
        Row: {
          id: number
          image_id: number
          movie_id: number
          sequence: null | number
        }
        Update: {
          id?: number
          image_id?: number
          movie_id?: number
          sequence?: null | number
        }
      }
      movies: {
        Insert: {
          barcode?: null | unknown
          create_time?: string
          dvd_id?: null | string
          format?: Database["public"]["Enums"]["media_format"] | null
          front_cover_url?: null | string
          full_cover_url?: null | string
          has_nudity?: boolean
          id?: number
          label_id?: null | number
          length?: null | number
          name?: null | string
          original_name: string
          popularity?: null | number
          release_date?: null | string
          series_id?: null | number
          studio_id?: null | number
          update_time?: string
        }
        Relationships: [
          {
            columns: ["label_id"]
            foreignKeyName: "movies_labels_movies"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "labels"
          },
          {
            columns: ["series_id"]
            foreignKeyName: "movies_series_movies"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "series"
          },
          {
            columns: ["studio_id"]
            foreignKeyName: "movies_studios_movies"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "studios"
          },
        ]
        Row: {
          barcode: null | unknown
          create_time: string
          dvd_id: null | string
          format: Database["public"]["Enums"]["media_format"] | null
          front_cover_url: null | string
          full_cover_url: null | string
          has_nudity: boolean
          id: number
          label_id: null | number
          length: null | number
          name: null | string
          original_name: string
          popularity: null | number
          release_date: null | string
          series_id: null | number
          studio_id: null | number
          update_time: string
        }
        Update: {
          barcode?: null | unknown
          create_time?: string
          dvd_id?: null | string
          format?: Database["public"]["Enums"]["media_format"] | null
          front_cover_url?: null | string
          full_cover_url?: null | string
          has_nudity?: boolean
          id?: number
          label_id?: null | number
          length?: null | number
          name?: null | string
          original_name?: string
          popularity?: null | number
          release_date?: null | string
          series_id?: null | number
          studio_id?: null | number
          update_time?: string
        }
      }
      person_images: {
        Insert: {
          id?: number
          image_id: number
          person_id: number
        }
        Relationships: [
          {
            columns: ["image_id"]
            foreignKeyName: "person_images_image_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "images"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "person_images_person_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "most_popular_persons"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "person_images_person_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "persons"
          },
        ]
        Row: {
          id: number
          image_id: number
          person_id: number
        }
        Update: {
          id?: number
          image_id?: number
          person_id?: number
        }
      }
      persons: {
        Insert: {
          birth_date?: null | string
          bust_size?: null | number
          create_time?: string
          cup_size?: Database["public"]["Enums"]["bra_size"] | null
          height?: null | number
          hips_size?: null | number
          id?: number
          name?: null | string
          original_name: string
          popularity?: null | number
          profile_url?: null | string
          update_time?: string
          waist_size?: null | number
        }
        Relationships: []
        Row: {
          birth_date: null | string
          bust_size: null | number
          create_time: string
          cup_size: Database["public"]["Enums"]["bra_size"] | null
          height: null | number
          hips_size: null | number
          id: number
          name: null | string
          original_name: string
          persons_movies_count: null | number
          popularity: null | number
          profile_url: null | string
          update_time: string
          waist_size: null | number
        }
        Update: {
          birth_date?: null | string
          bust_size?: null | number
          create_time?: string
          cup_size?: Database["public"]["Enums"]["bra_size"] | null
          height?: null | number
          hips_size?: null | number
          id?: number
          name?: null | string
          original_name?: string
          popularity?: null | number
          profile_url?: null | string
          update_time?: string
          waist_size?: null | number
        }
      }
      persons_aliases: {
        Insert: {
          id?: number
          name?: null | string
          original_name?: null | string
          person_id: number
        }
        Relationships: [
          {
            columns: ["person_id"]
            foreignKeyName: "persons_aliases_person_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "most_popular_persons"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "persons_aliases_person_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "persons"
          },
        ]
        Row: {
          id: number
          name: null | string
          original_name: null | string
          person_id: number
        }
        Update: {
          id?: number
          name?: null | string
          original_name?: null | string
          person_id?: number
        }
      }
      profiles: {
        Insert: {
          avatar_url?: null | string
          create_time?: string
          email?: null | string
          id: string
          username?: null | string
        }
        Relationships: []
        Row: {
          avatar_url: null | string
          create_time: string
          email: null | string
          id: string
          username: null | string
        }
        Update: {
          avatar_url?: null | string
          create_time?: string
          email?: null | string
          id?: string
          username?: null | string
        }
      }
      role_permissions: {
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
      }
      roles: {
        Insert: {
          age?: null | number
          id?: number
          movie_id: number
          person_id: number
        }
        Relationships: [
          {
            columns: ["movie_id"]
            foreignKeyName: "roles_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "roles_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_missing_info"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "roles_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_recently_released"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "roles_movies_movie"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_released_today"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "roles_persons_person"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "most_popular_persons"
          },
          {
            columns: ["person_id"]
            foreignKeyName: "roles_persons_person"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "persons"
          },
        ]
        Row: {
          age: null | number
          id: number
          movie_id: number
          person_id: number
        }
        Update: {
          age?: null | number
          id?: number
          movie_id?: number
          person_id?: number
        }
      }
      series: {
        Insert: {
          create_time?: string
          id?: number
          name?: null | string
          original_name: string
          update_time?: string
        }
        Relationships: []
        Row: {
          create_time: string
          id: number
          name: null | string
          original_name: string
          series_movies_count: null | number
          update_time: string
        }
        Update: {
          create_time?: string
          id?: number
          name?: null | string
          original_name?: string
          update_time?: string
        }
      }
      studios: {
        Insert: {
          create_time?: string
          fts_doc?: null | unknown
          homepage?: null | string
          id?: number
          name?: null | string
          original_name: string
          update_time?: string
        }
        Relationships: []
        Row: {
          create_time: string
          fts_doc: null | unknown
          homepage: null | string
          id: number
          name: null | string
          original_name: string
          studio_movies_count: null | number
          update_time: string
        }
        Update: {
          create_time?: string
          fts_doc?: null | unknown
          homepage?: null | string
          id?: number
          name?: null | string
          original_name?: string
          update_time?: string
        }
      }
      tags: {
        Insert: {
          category_id: number
          movie_id: number
        }
        Relationships: [
          {
            columns: ["category_id"]
            foreignKeyName: "category_movies_category_id"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "categories"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "category_movies_movie_id"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "category_movies_movie_id"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_missing_info"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "category_movies_movie_id"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_recently_released"
          },
          {
            columns: ["movie_id"]
            foreignKeyName: "category_movies_movie_id"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "movies_released_today"
          },
        ]
        Row: {
          category_id: number
          movie_id: number
        }
        Update: {
          category_id?: number
          movie_id?: number
        }
      }
      user_roles: {
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Relationships: [
          {
            columns: ["user_id"]
            foreignKeyName: "user_roles_user_id_fkey"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "profiles"
          },
        ]
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
      }
      views: {
        Insert: {
          client_hash?: null | string
          date?: string
          id?: number
          item_id?: null | number
          item_type?: null | string
        }
        Relationships: []
        Row: {
          client_hash: null | string
          date: string
          id: number
          item_id: null | number
          item_type: null | string
        }
        Update: {
          client_hash?: null | string
          date?: string
          id?: number
          item_id?: null | number
          item_type?: null | string
        }
      }
    }
    Views: {
      current_counts: {
        Relationships: []
        Row: {
          label_count: null | number
          movie_count: null | number
          person_count: null | number
          series_count: null | number
          studio_count: null | number
          tag_count: null | number
        }
      }
      most_popular_persons: {
        Relationships: []
        Row: {
          id: null | number
          name: null | string
          original_name: null | string
          popularity: null | number
          profile_url: null | string
        }
      }
      movies_missing_info: {
        Relationships: []
        Row: {
          dvd_id: null | string
          front_cover_url: null | string
          id: null | number
          name: null | string
          original_name: null | string
          release_date: null | string
        }
      }
      movies_recently_released: {
        Relationships: []
        Row: {
          dvd_id: null | string
          front_cover_url: null | string
          id: null | number
          name: null | string
          original_name: null | string
        }
      }
      movies_released_today: {
        Relationships: [
          {
            columns: ["label_id"]
            foreignKeyName: "movies_labels_movies"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "labels"
          },
          {
            columns: ["series_id"]
            foreignKeyName: "movies_series_movies"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "series"
          },
          {
            columns: ["studio_id"]
            foreignKeyName: "movies_studios_movies"
            isOneToOne: false
            referencedColumns: ["id"]
            referencedRelation: "studios"
          },
        ]
        Row: {
          create_time: null | string
          dvd_id: null | string
          front_cover_url: null | string
          id: null | number
          label_id: null | number
          length: null | number
          name: null | string
          original_name: null | string
          release_date: null | string
          series_id: null | number
          studio_id: null | number
          update_time: null | string
        }
      }
      persons_ordered_by_roles: {
        Relationships: []
        Row: {
          birth_date: null | string
          name: null | string
          original_name: null | string
          role_count: null | number
        }
      }
      roles_by_age: {
        Relationships: []
        Row: {
          age: null | number
          count: null | number
        }
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"]),
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
    | { schema: keyof Database }
    | keyof PublicSchema["Tables"],
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
    | { schema: keyof Database }
    | keyof PublicSchema["Tables"],
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
    | { schema: keyof Database }
    | keyof PublicSchema["Enums"],
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | { schema: keyof Database }
    | keyof PublicSchema["CompositeTypes"],
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
