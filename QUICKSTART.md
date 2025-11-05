# Quick Start Guide

## 1. Start Database
```bash
docker-compose up -d
```

## 2. Install Dependencies
```bash
yarn install
```

## 3. Initialize Database
Run the SQL migration file:

**For Windows PowerShell:**
```powershell
# Option 1: Using Get-Content (PowerShell)
Get-Content scripts/init-db.sql | docker exec -i nuskheh_postgres psql -U nuskheh_user -d nuskheh_db

# Option 2: Using type (Command Prompt)
type scripts/init-db.sql | docker exec -i nuskheh_postgres psql -U nuskheh_user -d nuskheh_db

# Option 3: Copy file into container and run
docker cp scripts/init-db.sql nuskheh_postgres:/tmp/init-db.sql
docker exec nuskheh_postgres psql -U nuskheh_user -d nuskheh_db -f /tmp/init-db.sql
```

**For Linux/Mac (Bash):**
```bash
# Option 1: Using psql directly (if installed locally)
psql -U nuskheh_user -d nuskheh_db -h localhost -f scripts/init-db.sql

# Option 2: Using docker exec with redirection
docker exec -i nuskheh_postgres psql -U nuskheh_user -d nuskheh_db < scripts/init-db.sql
```

## 4. Seed Database
```bash
yarn db:seed
```

## 5. Start Development Server
```bash
yarn dev
```

## 6. Login
Navigate to `http://localhost:3000/login`

**Default Credentials:**
- Phone: `09121234567`
- Password: `123456`

---

## What's Been Implemented

✅ **Real PostgreSQL Database** (Docker)
✅ **Database Schema** (medications & users tables)
✅ **Drizzle ORM** for database queries
✅ **All Mock Data Removed** - Now using real database
✅ **Authentication System:**
   - Login page (`/login`)
   - Session management
   - Protected API routes
✅ **User Display in Header:**
   - Real user name
   - Real phone number
✅ **Logout Button** in header

## Notes

- All medication data from mock has been imported to database
- Passwords are hashed using bcrypt
- Sessions are stored in HTTP-only cookies
- API routes are protected by authentication middleware

