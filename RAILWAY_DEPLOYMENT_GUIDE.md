# 🚀 Railway Deployment Guide - Step by Step

## Environment Variables for Railway Application Service

Copy and paste these exact variables into your Railway application service:

### Method 1: Using Railway's Individual Database Variables (Recommended)
```bash
# Database Configuration - Use Railway's built-in database variables
DATABASE_URL=jdbc:postgresql://${{ Postgres.POSTGRES_HOST }}:${{ Postgres.POSTGRES_PORT }}/${{ Postgres.POSTGRES_DB }}
DATABASE_USERNAME=${{ Postgres.POSTGRES_USER }}
DATABASE_PASSWORD=${{ Postgres.POSTGRES_PASSWORD }}

# Production Optimization
SHOW_SQL=false
FORMAT_SQL=false
HIBERNATE_SQL_LOG=WARN
HIBERNATE_TYPE_LOG=WARN

# CORS Configuration (update with your actual Vercel URL after frontend deployment)
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-app.vercel.app
```

### Method 2: Using DATABASE_URL Reference (Alternative)
```bash
# Database Configuration - Use Railway's DATABASE_URL reference
DATABASE_URL=${{ Postgres.DATABASE_URL }}
DATABASE_USERNAME=${{ Postgres.POSTGRES_USER }}
DATABASE_PASSWORD=${{ Postgres.POSTGRES_PASSWORD }}

# Production Optimization
SHOW_SQL=false
FORMAT_SQL=false
HIBERNATE_SQL_LOG=WARN
HIBERNATE_TYPE_LOG=WARN

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-app.vercel.app
```

## 🎯 Quick Railway Setup Steps

1. **Create PostgreSQL Service First**
2. **Add GitHub Repository as New Service** 
3. **Set Root Directory to: `backend`**
4. **Add Environment Variables Above**
5. **Deploy and Test**

## 🧪 Test Endpoints After Deployment

Replace `your-app-name` with your actual Railway app URL:

```bash
# Health Check
https://your-app-name.railway.app/api/health

# Get All Exams
https://your-app-name.railway.app/api/exams

# Search for CP104
https://your-app-name.railway.app/api/exams/search?courseCode=CP104

# Root Endpoint
https://your-app-name.railway.app/
```

## ✅ Expected Success Messages in Logs

Look for these in your Railway deployment logs:

```
✅ Exam data initialized successfully!
✅ Retrieved 457 exams
✅ Search for 'CP104' returned 1 results
```

## 🔧 Frontend Vercel Configuration

After Railway is working, set this in Vercel:

```bash
REACT_APP_API_URL=https://your-railway-app-name.railway.app/api/exams
```

Then update Railway's ALLOWED_ORIGINS with your Vercel URL.
