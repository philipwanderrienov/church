package models

import "database/sql"

type Congregation struct {
	// ID       string `json:"id" example:"1"`                    // Unique identifier for the congregation
	// Name     string `json:"name" example:"First Congregation"` // Name of the congregation
	// Location string `json:"location" example:"City A"`         // Location of the congregation

	ID               string         `json:"id" example:"1"`                                            // Unique identifier for the congregation
	FullName         string         `json:"fullname" example:"John Doe"`                               // Full name of the congregant
	Gender           string         `json:"gender" null:"true" example:"Male"`                         // Gender of the congregant
	DateOfBirth      string         `json:"dateofbirth" null:"true" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            string         `json:"phone" null:"true" example:"+1234567890"`                   // Phone number of the congregant
	Email            string         `json:"email" null:"true" example:"john.doe@example.com"`          // Email address of the congregant
	Role             string         `json:"role" null:"true" example:"pmj"`                            // Role of the congregant (e.g., PMJ, Jemaat)
	Address          string         `json:"address" null:"true" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    string         `json:"maritalstatus" null:"true" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber string         `json:"familycardnumber" null:"true" example:"FC-12345"`           // Family card number of the congregant
	Sector           string         `json:"classsector" null:"true" example:"Youth"`                   // Class sector of the congregant
	JoinDate         string         `json:"joindate" null:"true" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" null:"true" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
<<<<<<< Updated upstream
	Username         string         `json:"username" example:"johnsihotang"`                           // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`                         // Hashed password for authentication
=======
	Username         string         `json:"username" example:"johnsihotang"`                          // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`                        // Hashed password for authentication
	Role             string         `json:"role" example:"jemaat"`                                    // Account role
>>>>>>> Stashed changes
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
	FullName         string         `json:"fullname" example:"John Doe"`                               // Full name of the congregant
	Gender           string         `json:"gender" null:"true" example:"Male"`                         // Gender of the congregant
	DateOfBirth      string         `json:"dateofbirth" null:"true" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            string         `json:"phone" null:"true" example:"+1234567890"`                   // Phone number of the congregant
	Email            string         `json:"email" null:"true" example:"john.doe@example.com"`          // Email address of the congregant
	Role             string         `json:"role" null:"true" example:"pmj"`                            // Role of the congregant (e.g., PMJ, Jemaat)
	Address          string         `json:"address" null:"true" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    string         `json:"maritalstatus" null:"true" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber string         `json:"familycardnumber" null:"true" example:"FC-12345"`           // Family card number of the congregant
	Sector           string         `json:"classsector" null:"true" example:"Youth"`                   // Class sector of the congregant
	JoinDate         string         `json:"joindate" null:"true" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" null:"true" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`                           // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`                         // Hashed password for authentication
}

type UpdateCongregationRequest struct {
	// Name     string `json:"name" example:"First Congregation"` // Name of the congregation
	// Location string `json:"location" example:"City A"`         // Location of the congregation

	FullName         string         `json:"fullname" example:"John Doe"`                               // Full name of the congregant
	Gender           string         `json:"gender" null:"true" example:"Male"`                         // Gender of the congregant
	DateOfBirth      string         `json:"dateofbirth" null:"true" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            string         `json:"phone" null:"true" example:"+1234567890"`                   // Phone number of the congregant
	Email            string         `json:"email" null:"true" example:"john.doe@example.com"`          // Email address of the congregant
	Role             string         `json:"role" null:"true" example:"pmj"`                            // Role of the congregant (e.g., PMJ, Jemaat)
	Address          string         `json:"address" null:"true" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    string         `json:"maritalstatus" null:"true" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber string         `json:"familycardnumber" null:"true" example:"FC-12345"`           // Family card number of the congregant
	Sector           string         `json:"classsector" null:"true" example:"Youth"`                   // Class sector of the congregant
	JoinDate         string         `json:"joindate" null:"true" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" null:"true" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`                           // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`                         // Hashed password for authentication
}
