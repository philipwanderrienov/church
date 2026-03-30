package models

type Account struct {
	ID       string `json:"id" example:"1"`                 // Unique identifier for the account
	Name     string `json:"name" example:"Alice Smith"`     // Name of the account holder
	Email    string `json:"email" example:"alice@example.com"` // Email address of the account holder
	Username string `json:"username" example:"alice.smith"` // Login username
	Role     string `json:"role" example:"admin"`           // Account role: admin or jemaat
}

type CreateAccountRequest struct {
	ID       string `json:"id" binding:"required" example:"1"`                      // Account ID, must match congregation ID
	Name     string `json:"name" binding:"required" example:"Alice Smith"`          // Name of the account holder
	Email    string `json:"email" binding:"required,email" example:"alice@example.com"` // Email address of the account holder
	Username string `json:"username" binding:"required" example:"alice.smith"`      // Login username
	Password string `json:"password" binding:"required" example:"ChangeMe123!"`     // Plaintext password, hashed before storage
	Role     string `json:"role" binding:"required,oneof=admin jemaat" example:"admin"` // Account role: admin or jemaat
}

type UpdateAccountRequest struct {
	Name     string `json:"name" example:"Alice Smith"`          // Name of the account holder
	Email    string `json:"email" example:"alice@example.com"`   // Email address of the account holder
	Username string `json:"username" example:"alice.smith"`      // Login username
	Password string `json:"password" example:"ChangeMe123!"`     // Optional plaintext password update
	Role     string `json:"role" example:"admin"`                // Account role: admin or jemaat
}

type AccountResponse struct {
	Message string   `json:"message" example:"Account retrieved successfully"` // Message describing the result of the operation
	Data    *Account `json:"data"`                                             // Pointer to account, can be nil for empty responses
}

type AccountsListResponse struct {
	Message string    `json:"message" example:"Accounts retrieved successfully"` // Message describing the result of the operation
	Data    []Account `json:"data"`                                              // Slice of accounts
	Total   int       `json:"total" example:"2"`                                 // Total count of accounts
}

type AccountErrorResponse struct {
	Error string `json:"error" example:"Account not found"` // Error message describing what went wrong
	Code  int    `json:"code" example:"404"`                // HTTP status code representing the error
}
