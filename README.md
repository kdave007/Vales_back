# Vales Backend API

## Development Setup

### Prerequisites
- Node.js 18+
- Docker 20.10+

### Installation
```bash
npm install

GET /api/mock - Test mock endpoint



Build Image

    docker build -t vales-backend .

Run Container

    docker run -p 3000:3000 vales-backend

View Running Containers

    docker ps

Stop Container

    docker stop <container-id>

## Environment Configuration

Create a `.env` file in the root directory with the following configuration:

```env
# Database Configuration
DB_USER=db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_generated_secret_here
JWT_EXPIRES_IN=2h  # Token expiration time (e.g., 2h, 1d, 7d)
AUTH_REQUIRED=true # Set to 'true' to enable authentication, 'false' to disable
```

### Environment Variables

- `DB_USER`: Database username
- `DB_HOST`: Database host address
- `DB_NAME`: Database name
- `DB_PASSWORD`: Database password
- `DB_PORT`: Database port number
- `JWT_SECRET`: Secret key for JWT token generation (should be a long, random string)
- `JWT_EXPIRES_IN`: Token expiration time (e.g., '2h' for 2 hours, '1d' for 1 day)
- `AUTH_REQUIRED`: Toggle authentication requirement ('true' or 'false')

## Authentication

When `AUTH_REQUIRED` is set to 'true', all protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

To get a token, use the login endpoint:

```bash
POST /login
Content-Type: application/json

{
    "username": "your_username",
    "password": "your_password"
}
