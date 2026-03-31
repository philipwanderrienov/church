package models

type Account struct {
	ID       string `json:"id" example:"1"`                    // Unique identifier for the account
	Fullname string `json:"name" example:"Alice Smith"`        // Name of the account holder
	Email    string `json:"email" example:"alice@example.com"` // Email address of the account holder
	Role     string `json:"role" example:"admin"`              // Account role: admin or jemaat
	Username string `json:"username" example:"alice.smith"`    // Login username
}

type CreateAccountRequest struct {
	ID       string `json:"id" example:"1"`                    // Unique identifier for the account
	Fullname string `json:"name" example:"Alice Smith"`        // Name of the account holder
	Email    string `json:"email" example:"alice@example.com"` // Email address of the account holder
	Role     string `json:"role" example:"admin"`              // Account role: admin or jemaat
	Username string `json:"username" example:"alice.smith"`    // Login username
	Password string `json:"password" example:"ChangeMe123!"`   // Optional plaintext password update
}

type UpdateAccountRequest struct {
	Fullname string `json:"name" example:"Alice Smith"`        // Name of the account holder
	Email    string `json:"email" example:"alice@example.com"` // Email address of the account holder
	Role     string `json:"role" example:"admin"`              // Account role: admin or jemaat
	Username string `json:"username" example:"alice.smith"`    // Login username
	Password string `json:"password" example:"ChangeMe123!"`   // Optional plaintext password update
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
