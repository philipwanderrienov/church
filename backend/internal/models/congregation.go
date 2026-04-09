package models

import "database/sql"

type Congregation struct {
	ID               string         `json:"id" example:"1"`                                // Unique identifier for the congregation
	FullName         string         `json:"fullname" example:"John Doe"`                   // Full name of the congregant
	Gender           string         `json:"gender" example:"Male"`                         // Gender of the congregant
	DateOfBirth      string         `json:"dateofbirth" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            string         `json:"phone" example:"+1234567890"`                   // Phone number of the congregant
	Email            string         `json:"email" example:"john.doe@example.com"`          // Email address of the congregant
	Role             string         `json:"role" example:"jemaat"`                         // Role of the congregant
	Address          string         `json:"address" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    string         `json:"maritalstatus" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber string         `json:"familycardnumber" example:"FC-12345"`           // Family card number of the congregant
	Sector           string         `json:"classsector" example:"Youth"`                   // Class sector of the congregant
	JoinDate         string         `json:"joindate" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`               // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`             // Hashed password for authentication
}

type CongregationsListResponse struct {
	Message string         `json:"message" example:"Congregations retrieved successfully"` // Message describing the result of the operation
	Data    []Congregation `json:"data"`                                                   // Slice of congregations
	Total   int            `json:"total" example:"2"`                                      // Total count of congregations
}

type CongregationResponse struct {
	Message string        `json:"message" example:"Congregation retrieved successfully"` // Message describing the result of the operation
	Data    *Congregation `json:"data"`                                                  // Pointer to congregation, can be nil for empty responses
}

type CongregationErrorResponse struct {
	Error string `json:"error" example:"Congregation not found"` // Error message describing what went wrong
	Code  int    `json:"code" example:"404"`                     // HTTP status code representing the error
}

type CreateCongregationRequest struct {
	FullName         string         `json:"fullname" example:"John Doe"`                   // Full name of the congregant
	Gender           string         `json:"gender" example:"Male"`                         // Gender of the congregant
	DateOfBirth      string         `json:"dateofbirth" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            string         `json:"phone" example:"+1234567890"`                   // Phone number of the congregant
	Email            string         `json:"email" example:"john.doe@example.com"`          // Email address of the congregant
	Role             string         `json:"role" example:"pmj"`                            // Role of the congregant (e.g., PMJ, Jemaat)
	Address          string         `json:"address" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    string         `json:"maritalstatus" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber string         `json:"familycardnumber" example:"FC-12345"`           // Family card number of the congregant
	Sector           string         `json:"classsector" example:"Youth"`                   // Class sector of the congregant
	JoinDate         string         `json:"joindate" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`               // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`             // Hashed password for authentication
}

type UpdateCongregationRequest struct {
	FullName         string         `json:"fullname" example:"John Doe"`                   // Full name of the congregant
	Gender           string         `json:"gender" example:"Male"`                         // Gender of the congregant
	DateOfBirth      string         `json:"dateofbirth" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            string         `json:"phone" example:"+1234567890"`                   // Phone number of the congregant
	Email            string         `json:"email" example:"john.doe@example.com"`          // Email address of the congregant
	Role             string         `json:"role" example:"pmj"`                            // Role of the congregant (e.g., PMJ, Jemaat)
	Address          string         `json:"address" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    string         `json:"maritalstatus" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber string         `json:"familycardnumber" example:"FC-12345"`           // Family card number of the congregant
	Sector           string         `json:"classsector" example:"Youth"`                   // Class sector of the congregant
	JoinDate         string         `json:"joindate" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`               // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`             // Hashed password for authentication
}
