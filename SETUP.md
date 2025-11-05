# Setup Instructions

## Prerequisites
- Docker and Docker Compose
- Node.js 18+ and npm/yarn

## Initial Setup

1. **Start the PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL=postgresql://nuskheh_user:nuskheh_password@localhost:5432/nuskheh_db
   SESSION_SECRET=your-secret-key-change-in-production
   NODE_ENV=development
   ```

4. **Run database migrations:**
   The migration file is already created. You can run it manually or use Drizzle Kit:
   
   **For Windows PowerShell:**
   ```powershell
   # Run the SQL file
   Get-Content scripts/init-db.sql | docker exec -i nuskheh_postgres psql -U nuskheh_user -d nuskheh_db
   ```
   
   **For Linux/Mac:**
   ```bash
   # Generate migrations (if needed)
   yarn db:generate
   
   # Or manually run the SQL file
   docker exec -i nuskheh_postgres psql -U nuskheh_user -d nuskheh_db < scripts/init-db.sql
   ```

5. **Seed the database:**
   ```bash
   yarn db:seed
   ```
   
   This will create:
   - 2 default users (Phone: 09121234567 or 09120000000, Password: 123456)
   - 20 sample medications

6. **Start the development server:**
   ```bash
   yarn dev
   ```

## Default Login Credentials

- **Phone:** 09121234567
- **Password:** 123456

Or:

- **Phone:** 09120000000
- **Password:** 123456

## Database Management

- **Stop database:** `docker-compose down`
- **Stop and remove data:** `docker-compose down -v`
- **View database logs:** `docker-compose logs postgres`

## API Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `GET /api/medications` - Get medications (with filters)
- `POST /api/medications` - Create medication
- `PUT /api/medications/[id]` - Update medication
- `DELETE /api/medications/[id]` - Delete medication

