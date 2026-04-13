# Frontend Login Audit Report

## Expected backend login contract

- **Endpoint:** `POST /api/v1/congregations/auth/login`
- **Base URL:** `VITE_API_BASE_URL` or default `http://localhost:8081`
- **Request headers:**
  - `Content-Type: application/json`
  - `Accept: application/json`
- **Request body:**
  ```json
  {
    "identifier": "email-or-username",
    "password": "plain-password"
  }
  ```
- The UI explicitly treats `identifier` as **email or username**.

## Expected response contract

Frontend login code accepts a JSON envelope in either of these forms:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "id": "1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "role": "pmj"
  }
}
```

or:

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": "1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "role": "pmj"
  }
}
```

Failure responses are expected to be JSON with:
- `success: false`
- `message` describing the error

Plain text error responses are also tolerated, but JSON is preferred.

## Stored auth user contract

Successful login stores the normalized user in `localStorage` under:

- `church_current_user`

The stored user must contain at minimum:

- `id`
- `fullName`
- `email`
- `username`
- `role`

Optional supported fields:

- `gender`
- `dateOfBirth`
- `phoneNumber`
- `address`
- `maritalStatus`
- `familyCardNumber`
- `congregationId`
- `congregationName`
- `joinDate`
- `photo`
- `passwordHash`

## Role expectations

The frontend app shell currently understands these roles:

- `pmj`
- `jemaat`

If the backend returns other role labels, they will need to be mapped to one of those values for the UI to behave correctly.

## Mismatch summary

The migrated backend currently needs to verify:

1. It exposes `POST /api/v1/congregations/auth/login`
2. It accepts `{ identifier, password }`
3. It returns `{ success, message, data|user }`
4. The returned user includes `id`, `fullName`, `email`, `username`, and `role`
5. The role value is compatible with the frontend role model (`pmj` / `jemaat`)

## Audited files

- `frontend/src/pages/Login.tsx`
- `frontend/src/lib/auth.ts`
- `frontend/src/lib/api.ts`
- `frontend/src/lib/api-response.ts`
- `frontend/src/types/api.ts`
- `frontend/src/App.tsx`
- `frontend/src/lib/store.ts`
- `frontend/src/lib/app-shell.ts`
- `frontend/src/components/Navbar.tsx`
- `frontend/src/components/PageLayout.tsx`