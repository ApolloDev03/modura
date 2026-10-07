/* ============================================================
   Shared types for the MVNL admin panel
   ============================================================ */

/* ---------- API responses (backend helpers/response.js) ---------- */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationInfo;
}

/** 422 / error body: { success:false, message, errors:{ field: message } } */
export interface ApiErrorBody {
  success: false;
  message?: string;
  errors?: Record<string, string>;
}

/** Field name → error message (undefined = no error). */
export type FieldErrors = Record<string, string | undefined>;

/* ---------- Records ---------- */

/** Any record returned by a CRUD endpoint. Known keys are typed, the rest are loose. */
export interface ApiRecord {
  id: number;
  status?: boolean | string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  lastLoginAt?: string | null;
  status?: boolean;
}

export interface GalleryImage {
  id: number;
  image: string;
  imageUrl: string;
  sortOrder?: number;
}

export interface PortfolioAlbumRecord {
  id: number;
  title: string;
  sortOrder?: number;
  images: GalleryImage[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface JobApplication extends ApiRecord {
  name: string;
  email: string;
  phone: string;
  experience?: string | null;
  currentCtc?: string | null;
  expectedCtc?: string | null;
  noticePeriod?: string | null;
  portfolioLink?: string | null;
  coverLetter?: string | null;
  status: ApplicationStatus;
  adminNotes?: string | null;
  career?: { id: number; jobTitle: string } | null;
  createdAt: string;
}

export type ApplicationStatus = 'new' | 'shortlisted' | 'interviewed' | 'rejected';

export interface SeoPage extends ApiRecord {
  pageKey: string;
  pageName: string;
  metaTitle?: string | null;
  metaKeyword?: string | null;
  metaDescription?: string | null;
  headScript?: string | null;
  bodyScript?: string | null;
  updatedAt: string;
}

/** Website inquiry (Contact / Project) – all values are strings or null. */
export interface Inquiry extends ApiRecord {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface DashboardData {
  counts: {
    services: number;
    portfolios: number;
    blogs: number;
    applications: number;
    newApplications: number;
    activeJobs: number;
    contactInquiries: number;
    projectInquiries: number;
    newContactInquiries: number;
    newProjectInquiries: number;
  };
  recentApplications: Array<Pick<JobApplication, 'id' | 'name' | 'email' | 'status' | 'createdAt' | 'career'>>;
  recentBlogs: Array<{ id: number; title: string; status: 'draft' | 'published'; createdAt: string }>;
}

/* ---------- Generic list / form configuration (lib/modules.ts) ---------- */

export interface Option {
  value: string;
  label: string;
}

/** Dropdown options loaded from an admin endpoint (?all=1). */
export interface OptionsSource {
  endpoint: string;
  labelKey?: string;
}

export type FieldType =
  | 'text' | 'number' | 'date' | 'url' | 'email' | 'textarea' | 'editor' | 'select' | 'image' | 'file'
  | 'gallery' | 'albums' | 'toggle' | 'faqs' | 'code';

/** showIf: { otherField: 'value' } → field only shown / validated / sent when it matches. */
export type ShowIf = Record<string, string>;

export interface InputField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  optional?: boolean;
  full?: boolean;
  hint?: string;
  placeholder?: string;
  maxLength?: number;
  default?: string | number | boolean;
  options?: Option[];
  optionsFrom?: OptionsSource;
  small?: boolean;
  onLabel?: string;
  offLabel?: string;
  showIf?: ShowIf;
}

export interface SectionField {
  type: 'section';
  label: string;
  note?: string;
  name?: undefined;
  showIf?: ShowIf;
}

export type FieldConfig = InputField | SectionField;

export type ColumnType = 'text' | 'image' | 'status' | 'date' | 'enum' | 'star' | 'rating' | 'html';

export interface ColumnConfig {
  key: string;
  label: string;
  type?: ColumnType;
  options?: Option[];
  badge?: boolean;
}

export interface FilterConfig {
  name: string;
  label: string;
  options?: Option[];
  optionsFrom?: OptionsSource;
}

export interface RowAction {
  type: 'addAlbum';
  showIf?: Record<string, unknown>;
}

export interface ModuleConfig {
  title: string;
  singular: string;
  endpoint: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  filters?: FilterConfig[];
  tabs?: { name: string; options: Option[] };
  noStatusFilter?: boolean;
  rowActions?: RowAction[];
}

export interface NavGroup {
  group: string;
  items: Array<{ label: string; href: string }>;
}

export interface InquiryConfig {
  title: string;
  singular: string;
  endpoint: string;
  file: string;
  searchHint: string;
  /** [recordKey, column label] */
  columns: Array<[string, string]>;
  /** [recordKey, label] shown in the View popup */
  detail: Array<[string, string]>;
}

/* ---------- Form values ---------- */

/** Value of a "gallery" field (and of one album's images). */
export interface GalleryValue {
  existing: GalleryImage[];
  added: File[];
  removed: number[];
}

/** One album in the "albums" repeater. key = stable React key. */
export interface AlbumValue extends GalleryValue {
  key: string;
  id: number | null;
  title: string;
}

export type FieldValue = string | boolean | File | null | GalleryValue | AlbumValue[] | FaqItem[];

export type FormValues = Record<string, FieldValue>;
