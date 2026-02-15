# CVCat - Complete Project Documentation

> AI-powered CV/Resume management platform with Google OAuth, multi-template PDF export, CV import/parsing, and job-tailored CV generation.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Environment Setup](#4-environment-setup)
5. [Authentication Flow](#5-authentication-flow)
6. [Frontend Structure](#6-frontend-structure)
7. [Routing & Navigation](#7-routing--navigation)
8. [State Management](#8-state-management)
9. [Data Types & Schemas](#9-data-types--schemas)
10. [API Contracts](#10-api-contracts)
11. [Backend Models (MongoDB)](#11-backend-models-mongodb)
12. [Business Logic & Features](#12-business-logic--features)
13. [CV Templates & PDF Export](#13-cv-templates--pdf-export)
14. [File Import & AI Parsing](#14-file-import--ai-parsing)
15. [UI Components & Design System](#15-ui-components--design-system)
16. [Frontend-Backend Data Mapping](#16-frontend-backend-data-mapping)
17. [Key Patterns & Conventions](#17-key-patterns--conventions)
18. [Known Constraints & Gotchas](#18-known-constraints--gotchas)

---

## 1. Project Overview

CVCat is a two-part application:

- **Frontend** (`cvcat-frontend/`): React + Vite SPA for CV management, editing, previewing, and PDF export.
- **Backend** (`cvcat-backend/`): Express.js API with MongoDB, Firebase Auth verification, Gemini AI for CV parsing, and AWS S3 for file storage.

### User Journey

```
Landing Page → Google Sign-In → Import or Create CV → Edit CV → Preview → Download PDF
                                                      ↓
                                               Tailor CV for Job
                                                      ↓
                                               Manage All CVs
```

### Core Capabilities

- Google OAuth authentication (Firebase → custom JWT)
- CV creation from scratch or file import (PDF/Word)
- AI-powered CV parsing (Google Gemini)
- 6 CV template styles with live preview
- Client-side PDF generation and download
- CV tailoring for specific job descriptions
- AI chat assistant on every page

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React + Vite)                  │
│                                                                 │
│  AuthProvider (Firebase + JWT)                                  │
│    └── CVProvider (CV state + API sync)                         │
│          ├── Pages (Landing, Auth, CVBuilder, CVManagement...)  │
│          ├── Components (Navbar, Forms, Modals, ChatBot...)     │
│          └── Services (api.ts, pdf-service.ts)                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP (Bearer JWT)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (Express.js)                        │
│                                                                 │
│  Middleware: CORS, Helmet, express-jwt                          │
│    ├── /auth/login (Firebase token → JWT)                       │
│    ├── /cv/* (CRUD, import, parse)                              │
│    │     └── Gemini AI Parser (for import)                      │
│    └── /health                                                  │
│                                                                 │
│  MongoDB (Users, CVs, ImportLogs, ExportLogs)                   │
│  AWS S3 (uploaded CV files)                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. User actions trigger React state updates (Context API)
2. State changes call backend API via `apiClient()` fetch wrapper
3. API responses update Context state → UI re-renders
4. JWT from localStorage attached to every API request
5. 401 responses auto-clear auth and redirect to `/auth`

---

## 3. Tech Stack

### Frontend

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4.14 |
| Language | TypeScript | 5.6.3 |
| Routing | Wouter | 3.3.5 |
| UI Library | shadcn/ui (Radix UI) | v1.x |
| Styling | Tailwind CSS | 3.4.14 |
| Animation | Framer Motion | 11.18.2 |
| Icons | Lucide React | 0.453.0 |
| Forms | React Hook Form + Zod | 7.53.1 / 3.23.8 |
| Server State | TanStack React Query | 5.60.5 |
| Auth | Firebase | 12.9.0 |
| PDF | html2canvas + jsPDF | 1.4.1 / 4.1.0 |
| Charts | Recharts | 2.13.0 |

### Backend

| Category | Technology | Version |
|----------|-----------|---------|
| Runtime | Node.js | 18+ |
| Framework | Express.js | 5.1.0 |
| Database | MongoDB (Mongoose) | 8.13.2 |
| Auth | Firebase Admin + JWT | 13.4.0 / 9.0.0 |
| AI | Google Gemini (@ai-sdk/google) | 1.2.18 |
| File Storage | AWS S3 (@aws-sdk/client-s3) | 3.817.0 |
| File Upload | Multer | 1.4.5 |
| Validation | Zod | 3.25.28 |
| Security | Helmet, CORS | 8.1.0 / 2.8.5 |
| Logging | Pino + Morgan | 9.6.0 / 1.9.1 |

---

## 4. Environment Setup

### Frontend (`.env`)

```env
# Firebase Authentication
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<project>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<project-id>
VITE_FIREBASE_STORAGE_BUCKET=<project>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
VITE_FIREBASE_APP_ID=<app-id>

# Backend API
VITE_API_BASE_URL=https://cvcat-api-dev-phhm2.ondigitalocean.app/api/v1
```

All `VITE_*` variables are exposed to client-side code (Vite convention).

### Backend (`.env`)

```env
# Server
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
API_VERSION=1

# Auth
JWT_SECRET=<strong-secret-key>        # REQUIRED in production
JWT_EXPIRY=24h

# Database
MONGODB_CONNECTION_STRING=mongodb+srv://...

# AI Parsing
GEMINI_API_KEY=<google-api-key>
GEMINI_MODEL_NAME=gemini-2.0-flash-lite

# File Storage
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_S3_BUCKET_NAME=<bucket>

# Firebase (for token verification)
FIREBASE_SERVICE_ACCOUNT_BASE64=<base64-encoded-service-account-json>
```

---

## 5. Authentication Flow

### Step-by-Step

```
1. User clicks "Continue with Google"
   ↓
2. Firebase signInWithPopup(auth, googleProvider)
   ↓ Returns Firebase credential
3. result.user.getIdToken() → Firebase ID token
   ↓
4. POST /auth/login { token: firebaseIdToken }
   ↓ Backend verifies with Firebase Admin SDK
5. Backend creates/finds User in MongoDB
   ↓
6. Backend signs JWT: { id: user._id, email: user.email }
   ↓
7. Response: { token, user, isFirstTime }
   ↓
8. Frontend stores in localStorage:
   - cvcat_token → JWT string
   - cvcat_user → JSON user object
   ↓
9. Navigation:
   - isFirstTime=true → /import-selection
   - Has existing CVs → /cv-management
   - No CVs → /import-selection
```

### Token Lifecycle

- **Storage**: `localStorage` keys `cvcat_token` and `cvcat_user`
- **Usage**: Every API call includes `Authorization: Bearer <token>`
- **Validation on load**: AuthProvider calls `fetchAllCVs({ limit: 1 })` to verify token is still valid
- **Expiry**: 24 hours (configurable via `JWT_EXPIRY`)
- **401 handling**: `apiClient()` clears auth state and redirects to `/auth`

### Logout

1. Firebase `signOut(auth)`
2. Clear `cvcat_token` and `cvcat_user` from localStorage
3. Navigate to `/`

---

## 6. Frontend Structure

```
cvcat-frontend/src/
├── App.tsx                          # Root: routing + providers
├── main.tsx                         # Entry point: ReactDOM.render
├── index.css                        # Global styles + Tailwind
│
├── pages/
│   ├── LandingPage.tsx              # Public marketing page
│   ├── AuthPage.tsx                 # Google OAuth sign-in
│   ├── ImportSelection.tsx          # Choose: create or import CV
│   ├── CVBuilder.tsx                # CV editor + preview + templates
│   ├── CVManagement.tsx             # List/manage all CVs
│   ├── TailorCVWizard.tsx           # 5-step job-tailoring wizard
│   ├── TeamPage.tsx                 # Team members display
│   ├── LogoPage.tsx                 # Logo showcase
│   └── not-found.tsx                # 404 page
│
├── components/
│   ├── Layout.tsx                   # Page wrapper (navbar + footer)
│   ├── Navbar.tsx                   # Nav bar (auth-aware)
│   ├── AuthForms.tsx                # Google sign-in button
│   ├── ProtectedRoute.tsx           # Auth guard for routes
│   ├── CVBuilderForm.tsx            # Section-based CV editor form
│   ├── PDFDownloadModal.tsx         # Template selection + PDF download
│   ├── ImportAnimationModal.tsx     # Upload progress animation
│   ├── ChatBot.tsx                  # AI chat assistant
│   ├── CVSamplesModal.tsx           # Template preview samples
│   ├── Features.tsx                 # Landing page features
│   ├── Pricing.tsx                  # Landing page pricing
│   ├── Logo.tsx                     # Main logo (cat + gold accent)
│   ├── LogoMinimal.tsx              # Minimal logo variant
│   ├── LogoSleek.tsx                # Sleek logo variant
│   ├── LogoShowcase.tsx             # Logo display grid
│   └── ui/                          # 60+ shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── tabs.tsx
│       ├── card.tsx
│       ├── form.tsx
│       └── ... (accordion, badge, calendar, etc.)
│
├── lib/
│   ├── firebase.ts                  # Firebase init + Google provider
│   ├── auth-context.tsx             # AuthProvider + useAuth()
│   ├── context.tsx                  # CVProvider + useCV()
│   ├── types.ts                     # All TypeScript interfaces
│   ├── queryClient.ts              # TanStack Query config
│   ├── hooks.ts                     # useLocalStorage, useToggle, useFormState
│   └── utils.ts                     # cn() class merge utility
│
├── services/
│   ├── api.ts                       # Backend API client (all endpoints)
│   └── pdf-service.ts               # Client-side PDF generation
│
├── hooks/
│   ├── use-toast.ts                 # Toast notification system
│   └── use-mobile.tsx               # Mobile viewport detection
│
└── assets/
    ├── debojyoti-CBmUH-J9.png       # Team photo
    └── sayan-BGJPZ3Ux.png           # Team photo
```

---

## 7. Routing & Navigation

**Router**: Wouter (lightweight client-side router)

| Path | Page Component | Auth Required | Context |
|------|---------------|---------------|---------|
| `/` | `LandingPage` | No | - |
| `/auth` | `AuthPage` | No | Redirects if authenticated |
| `/team` | `TeamPage` | No | - |
| `/logo` | `LogoPage` | No | - |
| `/import-selection` | `ImportSelection` | **Yes** | `CVProvider` |
| `/cv-builder` | `CVBuilder` | **Yes** | `CVProvider` |
| `/cv-management` | `CVManagement` | **Yes** | `CVProvider` |
| `/tailor-cv` | `TailorCVWizard` | **Yes** | `CVProvider` |
| `*` | `NotFound` | No | - |

### Provider Hierarchy

```
<AuthProvider>                    ← Wraps entire app
  <QueryClientProvider>
    <Route path="/">              ← Public routes (no CVProvider)
    <ProtectedRoute>              ← Auth guard
      <CVProvider>                ← Only inside protected routes
        <Route path="/cv-builder">
        <Route path="/cv-management">
        ...
      </CVProvider>
    </ProtectedRoute>
  </QueryClientProvider>
</AuthProvider>
```

### Navigation Patterns

- **Logo click**: Always navigates to `/`
- **"Get Started" / "Log in"**: → `/auth`
- **Post-login (first time)**: → `/import-selection`
- **Post-login (returning)**: → `/cv-management`
- **"Create New CV"**: → `/cv-builder`
- **"Import"**: → `/import-selection`
- **"Save & Exit" (Navbar)**: Dispatches `cvcat:save-and-exit` DOM event → CVBuilder saves then navigates to `/cv-management`
- **Edit CV**: → `/cv-builder?id=<cvId>`
- **Tailor CV**: → `/tailor-cv`
- **Logout**: → `/`

---

## 8. State Management

### AuthProvider (`auth-context.tsx`)

```typescript
interface AuthContextType {
  user: BackendUser | null;       // Current user object
  token: string | null;           // JWT string
  loading: boolean;               // True while validating token on mount
  isAuthenticated: boolean;       // Derived: !!token && !!user
  signInWithGoogle(): Promise<{ user: BackendUser; isFirstTime: boolean }>;
  logout(): Promise<void>;
}
```

**Lifecycle:**
1. On mount: reads localStorage → sets user/token → validates via API call
2. If validation fails (401): clears state, sets loading=false
3. `signInWithGoogle()`: Firebase popup → exchange token → store auth
4. `logout()`: Firebase signOut → clear localStorage → navigate to `/`

### CVProvider (`context.tsx`)

```typescript
interface CVContextType {
  mainCV: CV | null;              // The user's base CV
  setMainCV: Dispatch;            // Direct state setter
  tailoredCVs: CV[];              // All tailored CV variants
  setTailoredCVs: Dispatch;       // Direct state setter
  currentCV: CV | null;           // Currently selected CV
  setCurrentCV: Dispatch;
  messages: ChatMessage[];        // Chat history
  addMessage(text, isBot): void;  // Add chat message
  refreshCVs(): Promise<void>;    // Re-fetch all CVs from API
  saveCV(cv: CV): Promise<CV>;    // Save CV to backend (create or update)
  savingCV: boolean;              // True while saving
  cvsLoading: boolean;            // True while fetching CVs
}
```

**CV Fetch Logic:**
1. On mount: calls `fetchAllCVs({ limit: 50 })`
2. Maps backend CVs → frontend CV type via `backendCVToFrontendCV()`
3. Separates into `mainCV` (first non-tailored) and `tailoredCVs`

**CV Save Logic:**
1. Converts frontend CV → backend format via `frontendCVToBackendData()`
2. Detects existing vs new: `cv.id.length === 24 && /^[a-f0-9]+$/.test(cv.id)` → existing (MongoDB ObjectId)
3. Existing → `PATCH /cv/update/:id`, New → `PUT /cv/add`
4. Response mapped back to frontend CV type, updates local state

### Cross-Component Communication

The Navbar's "Save & Exit" button and the CVBuilder page are in different component trees (Navbar is in Layout, which is outside CVProvider in some render paths). Communication uses a custom DOM event:

```typescript
// Navbar dispatches:
window.dispatchEvent(new CustomEvent("cvcat:save-and-exit"));

// CVBuilder listens:
window.addEventListener("cvcat:save-and-exit", handleSaveAndExit);
```

---

## 9. Data Types & Schemas

### Frontend CV Type (`types.ts`)

```typescript
interface CV {
  id: string;
  title: string;
  description?: string;
  lastUpdated: Date;
  forJob?: string;
  isTailored: boolean;
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];               // Flat string array
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  references?: Reference[];
  publications?: Publication[];
  customSections?: CustomSection[];
}

interface PersonalInfo {
  fullName: string;
  title: string;                  // Job title
  email: string;
  phone: string;
  location: string;               // Single string (city/region combined)
  summary: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;                 // e.g., "B.Sc. Computer Science"
  period: string;                 // e.g., "2018 - 2022"
  description?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  url?: string;
  description?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working'
               | 'Full Professional' | 'Native/Bilingual';
}

interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}
```

### Backend CV Data (JSON Resume Schema)

The backend stores CV data in `data` field following the [JSON Resume](https://jsonresume.org/schema/) format:

```typescript
interface BackendCVData {
  basics?: {
    name: string;                 // REQUIRED - Person's full name
    label?: string;               // Job title
    email?: string;
    phone?: string;
    summary?: string;
    location?: {
      address?: string;
      postalCode?: string;
      city?: string;
      countryCode?: string;       // ISO 3166-1 alpha-2
      region?: string;
    };
    profiles?: Array<{
      network: string;            // "linkedin", "github", etc.
      username: string;
      url: string;
    }>;
  };
  work?: Array<{
    name: string;                 // Company name
    position: string;
    startDate: string;            // YYYY-MM-DD
    endDate: string;
    summary: string;
    highlights?: string[];
    location?: string;
    url?: string;
  }>;
  education?: Array<{
    institution: string;
    studyType: string;            // Degree type
    area: string;                 // Field of study
    startDate: string;
    endDate: string;
    score?: string;               // GPA
    courses?: string[];
  }>;
  skills?: Array<{
    name: string;                 // Skill category
    level?: string;               // beginner, intermediate, advanced, master
    keywords: string[];           // Individual skills
  }>;
  languages?: Array<{
    language: string;
    fluency: string;
  }>;
  certificates?: Array<{         // Note: "certificates" not "certifications"
    name: string;
    issuer: string;               // Note: backend uses "issuer" here
    date: string;
    url?: string;
  }>;
  publications?: Array<{
    name: string;                 // Note: "name" not "title"
    publisher: string;
    releaseDate: string;          // Note: "releaseDate" not "date"
    url?: string;
    summary?: string;
  }>;
  references?: Array<{
    name: string;
    reference: string;            // Reference text (not position/company)
  }>;
  projects?: Array<{
    name: string;                 // Note: "name" not "title"
    description: string;
    keywords?: string[];          // Technologies
    startDate?: string;
    endDate?: string;
    url?: string;
    highlights?: string[];
    roles?: string[];
  }>;
  volunteer?: Array<{ ... }>;
  awards?: Array<{ ... }>;
  interests?: Array<{ ... }>;
  meta?: { ... };
}
```

---

## 10. API Contracts

**Base URL**: `https://cvcat-api-dev-phhm2.ondigitalocean.app/api/v1`

**Common Response Shape**:
```json
{
  "error": boolean,
  "message": "string",
  "data": { ... },
  "pagination?": { ... }
}
```

### Auth

#### POST `/auth/login`
**Auth**: None (public)

**Request**:
```json
{
  "token": "<firebase_id_token>"
}
```

**Response** (200):
```json
{
  "error": false,
  "token": "<jwt>",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "uid": "<firebase_uid>",
    "email": "user@example.com",
    "name": { "first": "John", "last": "Doe" }
  },
  "isFirstTime": true
}
```

---

### CV CRUD

All CV endpoints require `Authorization: Bearer <jwt>` header.

#### GET `/cv/fetchAll`
**Query Params**: `page`, `limit`, `sortBy`, `sortOrder`, `isDraft`, `cvType`, `parentId`

**Response** (200):
```json
{
  "error": false,
  "message": "CVs fetched successfully",
  "data": [ { ...BackendCV } ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 45,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### GET `/cv/getDetails/:id`
**Response** (200): Single CV object with all fields populated.

#### PUT `/cv/add`
**Request**:
```json
{
  "title": "My CV",
  "description": "Senior developer resume",
  "isDraft": false,
  "cvType": "base",
  "data": { /* JSON Resume schema */ }
}
```
**Validation**: `data.basics.name` is required.

**Response** (201): Created CV object.

#### PATCH `/cv/update/:id`
**Request**: Any subset of `{ title, description, isDraft, cvType, data }`.

**Side Effect**: If CV was `parsed` and any field besides `isDraft` changes, `cvSource` auto-updates to `modified`.

**Response** (200): Updated CV object.

#### DELETE `/cv/delete/:id`
**Response** (200): `{ error: false, message: "CV deleted successfully" }`

---

### CV Import

#### POST `/cv/import`
**Content-Type**: `multipart/form-data`
**Field**: `file` (PDF, DOC, DOCX, TXT; max 10MB)

**Process**:
1. Validates file type and size
2. AI parses file content via Gemini
3. Uploads file to S3
4. Creates CV document in DB with `cvSource: "parsed"`, `isDraft: true`
5. Creates ImportLogs entry

**Response** (201): Full CV object with parsed data.

#### POST `/cv/parse`
Same as import but **does not** save to DB. Returns parsed data only.

---

## 11. Backend Models (MongoDB)

### User

```javascript
{
  uid: String,                    // Firebase UID (unique, indexed)
  email: String,                  // Unique, lowercase, indexed
  name: {
    first: String,
    last: String,
    full: String                  // Virtual getter/setter
  },
  meta: {},                       // Flexible metadata
  createdAt: Date,                // Auto
  updatedAt: Date                 // Auto
}
```

### CV

```javascript
{
  title: String,                  // Default: "My CV"
  description: String,
  cvSource: String,               // "manual" | "imported" | "parsed" | "modified"
  originalFile: {
    name: String,                 // Original filename
    url: String,                  // S3 URL
    metadata: {
      size: Number,
      mimetype: String,
      uploadedAt: Date,
      s3Key: String,
      s3UploadedAt: Date,
      fileExtension: String
    }
  },
  isDraft: Boolean,               // Default: false
  cvType: String,                 // "base" | "tailored"
  data: {},                       // JSON Resume schema (see section 9)
  versionNumber: String,
  _parent: ObjectId,              // Ref to parent CV (for versioning)
  generatedSummary: String,       // AI-generated summary
  _user: ObjectId,                // Ref to User (required, indexed)
  // Virtuals:
  _versions: [],                  // Child CVs where _parent = this._id
  _exportHistory: [],             // ExportLogs for this CV
  createdAt: Date,
  updatedAt: Date
}
```

### ImportLogs

```javascript
{
  title: String,                  // Default: "Imported CV"
  description: String,
  isParsedByAi: Boolean,          // Default: true
  originalFile: { ... },          // Same structure as CV.originalFile
  data: {},                       // Parsed JSON Resume data
  parseStatus: String,            // "success" | "failed" | "partial"
  parseError: String,
  parseDurationMs: Number,        // Parse time in milliseconds
  aiModel: String,                // e.g., "gemini-2.0-flash-lite"
  generatedSummary: String,
  _user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### ExportLogs

```javascript
{
  _cv: ObjectId,                  // Ref to CV
  _user: ObjectId,                // Ref to User
  exportedAt: Date,
  format: String,                 // "pdf" | "docx" | "json"
  exportUrl: String,
  meta: {},
  createdAt: Date,
  updatedAt: Date
}
```

---

## 12. Business Logic & Features

### 12.1 CV Creation

**Two paths:**

1. **Manual creation**: User navigates to `/cv-builder`, fills out form sections, saves.
2. **File import**: User uploads PDF/Word on `/import-selection` → backend AI parses → creates CV with `isDraft: true` → user redirected to `/cv-builder` to review/edit.

### 12.2 CV Editing (`CVBuilder.tsx`)

- **Tabs**: Edit | Preview | Chat
- **Edit tab**: Section-based form (`CVBuilderForm`) with sidebar navigation for: Personal Info, Experience, Education, Skills, Projects, Certifications, Languages, References, Publications, Custom Sections
- **Preview tab**: Live rendered CV using selected template
- **Chat tab**: Embedded AI assistant
- **Save**: Calls `saveCV()` which detects new vs existing CV by MongoDB ObjectId format
- **Save & Exit**: Navbar button dispatches `cvcat:save-and-exit` custom event → CVBuilder handles save + navigation

### 12.3 Template System

6 templates available in preview and PDF export:

| Template | Font | Style |
|----------|------|-------|
| Modern | Inter, sans-serif | Centered header, gold accent lines |
| Classic | Georgia, serif | Left-aligned, uppercase headers, traditional |
| Minimalist | Inter, sans-serif | 1/3 sidebar + 2/3 main content split |
| Creative | Segoe UI, sans-serif | Gold banner header, timeline dots, card-based projects |
| Executive | Georgia, serif | Gold border, uppercase headers, formal |
| Technical | Roboto Mono, monospace | Code-style brackets, tabbed layout |

**Note**: Technical template exists in the template selector but does **not** have a preview rendering implementation or PDF template. Only the first 5 are fully implemented.

### 12.4 CV Management (`CVManagement.tsx`)

- Displays main CV card + tailored CV cards in a grid
- Each card shows: title, description/summary, last updated time
- **Actions per card**: Edit (→ `/cv-builder?id=<id>`), Download PDF (modal), Delete (with confirmation dialog)
- Empty state: "No CVs yet" message with "Get Started" button → `/import-selection`
- "New" and "Import" buttons in header → `/import-selection`

### 12.5 CV Tailoring (`TailorCVWizard.tsx`)

5-step wizard:

1. **Select Base CV**: Pick which CV to tailor from
2. **Job Details**: Enter job title, company name, job description
3. **Key Skills**: Select/add skills and strengths to highlight
4. **Custom Sections**: Toggle which sections to include, add custom content
5. **Review & Generate**: Preview and confirm, then save as new tailored CV

The tailored CV is saved with `cvType: "tailored"`.

### 12.6 PDF Export

- Modal (`PDFDownloadModal`) lets user pick from 5 layout styles
- Client-side generation using `html2canvas` + `jsPDF`
- Process: CV data → HTML string (per template) → offscreen DOM element → canvas capture at 2x scale → A4 PDF with multi-page support
- File named: `{cv.title}.pdf`

### 12.7 File Import

- User picks PDF or Word file via hidden `<input type="file">`
- File passed to `ImportAnimationModal` which shows animated progress
- Real API call to `POST /cv/import` with file as `FormData`
- Progress stages: Uploading → Scanning → Analyzing → Completed (first stage is real, rest are animated)
- On success: navigates to `/cv-builder` to review imported data
- On error: shows error message with close button

### 12.8 Chat Assistant (`ChatBot.tsx`)

- Available on every page (rendered in `App.tsx`)
- Cat-themed with animated paw/whisker decorations
- Stores messages in `CVProvider` context
- Initial greeting: "Meow! I'm your CV Assistant..."
- Can be embedded inline (in CVBuilder chat tab) or as floating widget

---

## 13. CV Templates & PDF Export

### PDF Generation Flow

```
CV data (frontend type)
  ↓ renderCVToHTML(cv, layout)
HTML string with inline styles
  ↓ Insert into offscreen DOM container (794px wide = A4 at 96dpi)
  ↓ html2canvas(container, { scale: 2 })
Canvas image (high resolution)
  ↓ jsPDF('p', 'mm', 'a4')
  ↓ Split across pages if height > 297mm
PDF Blob
  ↓ URL.createObjectURL() + <a download>
Browser download
```

### Template-Specific Design Details

**Modern**: Gold accent color `#DAA520`, centered header with horizontal gold line above name, each section header has a short gold line prefix.

**Classic**: Serif font (Georgia), full-width gray separator under header, all section headers in UPPERCASE with letter-spacing. Bullet separator (•) between contact info.

**Minimalist**: Two-column layout. Left 33% sidebar (gray background `#f9fafb`) contains name, contact, skills, languages. Right 67% contains summary, experience, education, other sections. Section headers use bottom border separators.

**Creative**: Gold-tinted banner header (`rgba(218,165,32,0.15)`). Contact info uses gold dots. Experience/education use left border timeline with gold dots. Skills in pill badges. Projects in gray cards.

**Executive**: Heavy gold bottom border (4px) under header. Gold circle icons for contact info. Section headers with gold underline border. Dates in gold color. Skills shown with gold bullet dots.

### Design System Colors

- **Primary accent**: `#DAA520` (Goldenrod)
- **Text primary**: `#000000`
- **Text secondary**: `#666666`
- **Text muted**: `#888888`
- **Background**: `#ffffff`
- **Surface**: `#f9fafb` / `#f3f4f6`
- **Border**: `#e5e7eb`
- **Destructive**: Red (for delete/error states)

---

## 14. File Import & AI Parsing

### Accepted Formats

| Format | MIME Type | Extension |
|--------|----------|-----------|
| PDF | `application/pdf` | `.pdf` |
| Word (old) | `application/msword` | `.doc` |
| Word (new) | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | `.docx` |
| Text | `text/plain` | `.txt` |

**Max file size**: 10MB

### AI Parsing (Backend)

- **Model**: Google Gemini (`gemini-2.0-flash-lite` default)
- **Process**: File buffer + MIME type → Gemini `generateObject()` → structured JSON Resume output
- **Schema enforcement**: Zod schema ensures output matches JSON Resume format
- **Parsing rules**: No hallucination, empty strings for missing data, dates as YYYY-MM-DD

### Import vs Parse Endpoints

| Endpoint | Saves to DB | Uploads to S3 | Returns |
|----------|------------|---------------|---------|
| `POST /cv/import` | Yes (creates CV) | Yes | Full CV document |
| `POST /cv/parse` | No | No | Parsed data only |

Currently the frontend only uses `/cv/import`.

---

## 15. UI Components & Design System

### shadcn/ui Components Used

The project has 60+ shadcn/ui components in `src/components/ui/`. Key ones actively used:

- **Button** - Multiple variants: default, destructive, outline, secondary, ghost, link
- **Dialog** - PDF download modal, delete confirmation
- **Tabs** - CVBuilder tab navigation (Edit/Preview/Chat)
- **Card** - CV cards in management view
- **Input/Textarea/Label** - Form fields
- **Form** - React Hook Form integration with Zod validation
- **Toast** - Notification system (auto-dismiss after 1s)
- **Badge** - Status indicators
- **ScrollArea** - Scrollable containers
- **Select** - Dropdown selectors
- **Separator** - Visual dividers
- **Progress** - Import progress indicator

### Design Conventions

- **Border radius**: Configurable via CSS variable `--radius`
- **Spacing**: Tailwind default scale
- **Typography**: Base font-size 0.9rem, headings scale (2xl, xl, base)
- **Dark mode**: Class-based (`dark` class on html), supported in config but not actively used
- **Animations**: Framer Motion for page transitions, section entrance effects
- **Icons**: Lucide React icons throughout
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints

### Custom CSS Classes

```css
.btn-primary    → bg-black text-white hover:bg-[#DAA520]
.btn-secondary  → bg-white text-black border border-black
.card-flat      → border border-gray-100 bg-white rounded-sm
.input-flat     → border border-gray-200 rounded-sm
```

---

## 16. Frontend-Backend Data Mapping

The frontend `CV` type and backend JSON Resume schema are different. Two functions in `types.ts` handle conversion:

### `backendCVToFrontendCV(bcv)` - Backend → Frontend

| Backend Field | Frontend Field | Transformation |
|--------------|----------------|----------------|
| `_id` | `id` | Direct copy |
| `title` | `title` | Direct copy |
| `description` | `description` | Direct copy |
| `updatedAt` | `lastUpdated` | `new Date()` |
| `cvType === "tailored"` | `isTailored` | Boolean conversion |
| `data.basics.name` | `personalInfo.fullName` | Direct |
| `data.basics.label` | `personalInfo.title` | Direct |
| `data.basics.email` | `personalInfo.email` | Direct |
| `data.basics.phone` | `personalInfo.phone` | Direct |
| `data.basics.summary` | `personalInfo.summary` | Direct |
| `data.basics.location.city + region` | `personalInfo.location` | Concatenated: `"city, region"` |
| `data.work[]` | `experience[]` | `name→company`, `position→position`, `summary→description` |
| `data.education[]` | `education[]` | `studyType + area→degree`, `startDate-endDate→period` |
| `data.skills[].keywords` | `skills[]` | Flattened from nested `keywords` arrays |
| `data.projects[]` | `projects[]` | `name→title`, `keywords→technologies` |
| `data.certificates[]` | `certifications[]` | `issuer→issuer` (same field name, different parent key) |
| `data.languages[]` | `languages[]` | `language→name`, `fluency→proficiency` |
| `data.publications[]` | `publications[]` | `name→title`, `releaseDate→date` |
| `data.references[]` | `references[]` | `reference→relationship` (limited mapping) |

### `frontendCVToBackendData(cv)` - Frontend → Backend

Reverse of the above. Key differences:
- `skills[]` (flat strings) → wrapped in single `{ name: "Skills", keywords: [...] }` object
- `personalInfo.location` (string) → split into `{ city: location }` (best-effort)
- `education.degree` → split into `{ studyType, area }` if contains space
- IDs are not sent to backend (backend generates `_id`)

### ID Detection for Save

```typescript
const isExistingCV = cv.id && cv.id.length === 24 && /^[a-f0-9]+$/.test(cv.id);
// true → PATCH /cv/update/:id
// false → PUT /cv/add (create new)
```

---

## 17. Key Patterns & Conventions

### Code Patterns

1. **Functional components** only (no class components)
2. **Custom hooks** for reusable logic (`useAuth`, `useCV`, `useLocalStorage`, `useToggle`)
3. **Context API** for global state (no Redux)
4. **Fetch wrapper** (`apiClient`) for all API calls with automatic auth headers
5. **Toast notifications** for user feedback on success/error
6. **Framer Motion** for animations (page transitions, element entrance)
7. **shadcn/ui** as component library (Radix primitives + Tailwind)
8. **Wouter** for routing (not React Router)
9. **Zod** for form validation schemas

### File Naming

- Components: `PascalCase.tsx` (e.g., `CVBuilder.tsx`)
- Pages: `PascalCase.tsx` in `pages/` directory
- Services: `kebab-case.ts` (e.g., `pdf-service.ts`)
- Hooks: `kebab-case.ts` prefixed with `use-` (e.g., `use-toast.ts`)
- Types/utils: `kebab-case.ts` (e.g., `types.ts`, `utils.ts`)

### API Client Pattern

```typescript
// All API calls go through apiClient()
async function apiClient<T>(endpoint, options?): Promise<T> {
  const token = getStoredToken();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(`${BASE_URL}${endpoint}`, { headers, ...options });
  if (response.status === 401) { clearAuth(); redirect('/auth'); }
  return response.json();
}

// Specific endpoint functions wrap apiClient:
export async function fetchAllCVs(params?) { return apiClient('/cv/fetchAll?...'); }
export async function updateCV(id, data) { return apiClient(`/cv/update/${id}`, { method: 'PATCH', body }); }
```

### State Update Pattern

```
User action → Context method call → API call → Update context state → UI re-renders
```

Example: Save CV
```
Click "Save" → saveCV(mainCV) → frontendCVToBackendData() → PATCH /cv/update/:id
→ backendCVToFrontendCV(response) → setMainCV(savedCV) → toast("Saved!")
```

---

## 18. Known Constraints & Gotchas

### Architecture

1. **Technical template**: Listed in template selector (6th option) but has no preview rendering or PDF template implementation. Only Modern, Classic, Minimalist, Creative, Executive are fully implemented.

2. **Chat assistant**: ChatBot component exists and renders on every page, but there's no backend AI chat endpoint wired up yet. Messages are stored in local context state only.

3. **CV data mapping is lossy**: The frontend CV type is simpler than JSON Resume. Some backend fields (like `work[].highlights`, `education[].courses`, `profiles[]`, `volunteer`, `awards`, `interests`) are not represented in the frontend type and may be lost during save if the CV was imported.

4. **References mapping is limited**: Backend stores `{ name, reference }` (reference text). Frontend expects `{ name, position, company, email, phone, relationship }`. The mapping loses most reference fields.

5. **Skills flattening**: Backend stores skills as categorized groups `[{ name: "Frontend", keywords: ["React", "Vue"] }]`. Frontend flattens to `["React", "Vue"]`. Category information is lost on save.

### Auth

6. **No refresh token**: JWT expires after 24h. User must re-login. No silent refresh mechanism.

7. **localStorage-based auth**: Tokens are stored in localStorage (not httpOnly cookies). This is standard for SPAs but means tokens are accessible to JavaScript.

### PDF

8. **html2canvas limitations**: The PDF generation uses html2canvas which renders at a fixed width (794px). Complex CSS features like flexbox `gap` may not render perfectly in all browsers. The capture is raster-based (PNG image in PDF), not vector text.

9. **Font loading**: PDF templates reference system fonts (Inter, Georgia, Poppins, Roboto Mono). If these fonts aren't available on the user's machine, fallback fonts will be used, which may affect layout.

### Data

10. **Single main CV assumption**: The frontend assumes there's exactly one non-tailored ("base") CV. If the user somehow has multiple base CVs, only the first one is used as `mainCV`.

11. **File import animation is partially simulated**: The uploading stage tracks real API progress, but scanning and analyzing stages are time-based animations, not real progress.

12. **No offline support**: All data is server-side. No service worker or local caching strategy.

### Development

13. **Large bundle**: The production build is ~1.5MB (gzipped ~397KB) due to the many UI components and PDF libraries. Consider code-splitting for production optimization.

14. **No tests**: There are no unit tests, integration tests, or E2E tests in the codebase.

15. **No i18n**: The app is English-only with no internationalization support.

---

*Last updated: February 2026*
*Generated from codebase analysis of cvcat-frontend and cvcat-backend*
