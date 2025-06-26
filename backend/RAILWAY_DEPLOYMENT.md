# Railway Deployment Guide

## Prerequisites
- Railway account
- PostgreSQL database (can be provisioned through Railway)
- Git repository connected to Railway

## Deployment Steps

### 1. Connect Repository to Railway
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect the Dockerfile and deploy

### 2. Set Up PostgreSQL Database
1. In your Railway project, click "New" → "Database" → "PostgreSQL"
2. Railway will automatically provision a PostgreSQL database
3. Copy the database connection details

### 3. Configure Environment Variables
Set the following environment variables in your Railway project:

#### Required Variables:
```
DATABASE_URL=postgresql://username:password@host:port/database_name
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
PORT=8080
```

#### Optional Variables (for production optimization):
```
SHOW_SQL=false
FORMAT_SQL=false
HIBERNATE_SQL_LOG=WARN
HIBERNATE_TYPE_LOG=WARN
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:3000
```

### 4. Deploy
1. Railway will automatically build and deploy your application
2. Monitor the deployment logs for any issues
3. Once deployed, Railway will provide a public URL

### 5. Verify Deployment
1. Test the health endpoint: `https://your-app.railway.app/api/health`
2. Test the root endpoint: `https://your-app.railway.app/`
3. Verify database connectivity

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection URL | `jdbc:postgresql://localhost:5432/examsdb` | Yes |
| `DATABASE_USERNAME` | Database username | `postgres` | Yes |
| `DATABASE_PASSWORD` | Database password | `2212` | Yes |
| `PORT` | Application port | `8080` | No |
| `SHOW_SQL` | Enable SQL logging | `false` | No |
| `FORMAT_SQL` | Format SQL output | `false` | No |
| `HIBERNATE_SQL_LOG` | Hibernate SQL log level | `WARN` | No |
| `HIBERNATE_TYPE_LOG` | Hibernate type log level | `WARN` | No |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000,https://examscheduler.vercel.app` | No |

## Troubleshooting

### Common Issues:
1. **Database Connection Failed**: Verify DATABASE_URL format and credentials
2. **Port Issues**: Ensure PORT is set to 8080 or Railway's assigned port
3. **CORS Errors**: Update ALLOWED_ORIGINS with your frontend URL
4. **Memory Issues**: The JVM is configured to use 75% of available memory

### Logs:
- Check Railway deployment logs for build issues
- Monitor application logs for runtime errors
- Use Railway's built-in logging dashboard

## Performance Optimization
- JVM is tuned for Railway's container environment
- Uses G1GC garbage collector for better performance
- Memory allocation is optimized for Railway's resource limits
- Database connection pooling is handled by Spring Boot

## Security Notes
- Application runs as non-root user in container
- CORS is properly configured for production
- Database credentials are stored as environment variables
- No sensitive data in code or configuration files 