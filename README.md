# KMV PLACEMENT CELL — University Placement Portal

A comprehensive, full-stack university placement and career development platform engineered specifically for **Kanya Maha Vidyalaya (Autonomous), Jalandhar** (Estd. 1886, UGC Heritage College, DBT Star Status).

---

## 🏛️ Project Architecture & Folder Structure

As specified, the project is organized into strictly separated client and server tiers:

```
KMV Placement Portal/
│
├── client/                     # Frontend Web Application (React, Vite, Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable UI components, Modals, Badges, StatCards, Layouts
│   │   ├── context/            # AuthContext (JWT, session persistence, role-based state)
│   │   ├── pages/
│   │   │   ├── public/         # Public pages: Home, About, Opportunities, Stories, Career Prep, Resources, Contact
│   │   │   ├── student/        # Student portal: Dashboard, Profile, Applications, Aptitude, Mock Interview, Resume, Coding Arena
│   │   │   ├── recruiter/      # Recruiter portal: Dashboard, Create Drive, Manage Applicants, Company Profile
│   │   │   └── admin/          # Admin portal: Dashboard, Student Management, Recruiter Verification, Circulars, Analytics
│   │   ├── services/           # REST API client (api.ts) & reactive persistence layer (dbStore.ts)
│   │   ├── types/              # TypeScript interfaces for all database models
│   │   ├── App.tsx             # Main router & role portal switcher
│   │   ├── index.css           # Tailwind CSS base styles & collegiate theme variables
│   │   └── main.tsx            # React root entry
│   ├── index.html              # HTML entry with DM Sans & KMV branding
│   ├── package.json            # Client dependencies & scripts
│   ├── vite.config.ts          # Vite bundler configuration
│   └── .env.example            # Client environment variables template
│
├── server/                     # Backend API Server (Node.js, Express, MongoDB, Mongoose)
│   ├── src/
│   │   ├── config/             # MongoDB database connection (db.js)
│   │   ├── controllers/        # REST controllers (auth, student, recruiter, admin, drive, application, announcement)
│   │   ├── middleware/         # JWT verification (protect) and role authorization (authorize)
│   │   ├── models/             # Mongoose schemas: User, StudentProfile, RecruiterProfile, PlacementDrive, Application, Announcement, Resource, Notification, AssessmentResult
│   │   ├── routes/             # Express API route modules (/api/*)
│   │   ├── scripts/            # Database seed script with initial admin & demo records (seed.js)
│   │   └── server.js           # Express app initialization & server entry
│   ├── package.json            # Server dependencies (express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv)
│   └── .env.example            # Server environment variables template
│
├── .gitignore
└── README.md                   # Complete architectural guide & setup instructions
```

---

## ⚙️ Prerequisites

Before launching the project locally, ensure you have:

1. **Node.js**: `v18.x` or higher (`v20.x+` recommended)
2. **npm**: `v9.x` or higher
3. **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster connection string.

---

## 🚀 Step-by-Step Installation & Setup

### 1. Configure Backend Environment

Navigate to the `server/` directory and configure environment variables:

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/kmv_placement_cell
# For MongoDB Atlas use: mongodb+srv://<user>:<password>@cluster0.mongodb.net/kmv_placement_cell?retryWrites=true&w=majority
JWT_SECRET=kmv_super_secret_jwt_key_2026_placement_cell_secure_token
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Initial Administrator Credentials (used by npm run seed)
ADMIN_NAME=KMV Placement Director
ADMIN_EMAIL=admin@kmv.ac.in
ADMIN_PASSWORD=KmvAdmin@2026
ADMIN_PHONE=+91 181 2296605
```

Install server dependencies:

```bash
npm install
```

### 2. Seed Initial Admin & Placement Drives

Run the dedicated seeding script to provision the initial administrator, verified recruiters, student records, announcements, and placement drives from TCS, Deloitte, Infosys, and Wipro:

```bash
npm run seed
```

### 3. Start the Backend API Server

```bash
npm run dev
# or npm start
```

The Express server will launch on `http://localhost:5000` with connected MongoDB.

---

### 4. Configure & Start the Client Frontend

Open a second terminal window and navigate to the `client/` directory:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Install client dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will start at `http://localhost:5173` (or port 3000 in AI Studio preview).

---

## 🔑 Pre-Configured Test Accounts (1-Click Demo)

The system includes pre-seeded verified accounts for testing every role:

| Role | Email | Password | Permissions & Features |
|---|---|---|---|
| **Student** | `student@kmv.ac.in` | `Student@123` | Dashboard, Profile, Applications, Drives, Aptitude Test, Mock Interview, Resume Builder, Coding Arena |
| **Recruiter** | `careers@tcs.com` | `Recruiter@123` | Post Drives, Screen Applicants, Schedule Interviews, Company Profile |
| **Admin** | `admin@kmv.ac.in` | `KmvAdmin@2026` | Full system analytics, Student directory, Recruiter approval, Circulars, Reports |

*(You can also register brand-new student accounts through the registration modal with automatic validation and duplicate prevention).*

---

## 🧪 Functional Verification & Testing Workflow

1. **Student Registration**:
   - Click **Student Register** on the top navigation.
   - Enter Full Name, KMV Roll No (e.g. `KMV/2023/BCA/099`), Email, Phone, Course, Semester, and Password.
   - Test password confirmation and duplicate checks.
   - Upon submission, the student account and profile are saved.

2. **Placement Drive Application**:
   - Navigate to **Opportunities** or **Student Portal > Placement Drives**.
   - Review eligibility criteria (e.g. minimum CGPA, eligible courses, max backlogs).
   - Click **Apply for this Drive**. The backend validates CGPA and eligibility, prevents duplicates, and saves the application record.

3. **Recruiter Applicant Review & Interview Scheduling**:
   - Sign in as `careers@tcs.com`.
   - Go to **View Applicants**.
   - View candidate profile and click **Update**.
   - Change status to **Interview Scheduled**, set the date/time, provide meeting link, and click **Save**.
   - Sign back in as the student to see the scheduled interview with a direct meeting launch button.

4. **Career Tools**:
   - **Aptitude Practice**: 10-minute timed diagnostic test across quantitative, logical, and verbal categories with instant scoring and question review.
   - **Mock Interviews**: STAR-method evaluation with scoring out of 10 and actionable feedback.
   - **ATS Resume Builder**: Auto-populates from student profile with one-click print/PDF download.
   - **Coding Arena**: Interactive code editor with test cases runner in JavaScript and Python.

---

## 🔒 Security Architecture

- **Password Hashing**: Salted `bcryptjs` hashing with minimum 10 rounds. Passwords are never stored or returned in plain text.
- **JWT Authorization**: Authenticated API routes require `Authorization: Bearer <token>`. Role middleware enforces `student`, `recruiter`, and `admin` permission barriers.
- **Ownership Checks**: Recruiters can only access and update applicants for drives they own.
- **Safe Code Execution**: Coding challenges are verified in an isolated client sandbox with no server-side `eval` or remote execution vulnerabilities.

---

## 🎓 About Kanya Maha Vidyalaya (Autonomous)

Kanya Maha Vidyalaya, Jalandhar (Punjab), established in 1886, is an autonomous heritage institution accredited Grade 'A' by NAAC and recognized with Star College Status by DBT, Government of India.
