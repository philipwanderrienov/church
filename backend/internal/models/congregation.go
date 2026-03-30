package models

import "database/sql"

type Congregation struct {
	// ID       string `json:"id" example:"1"`                    // Unique identifier for the congregation
	// Name     string `json:"name" example:"First Congregation"` // Name of the congregation
	// Location string `json:"location" example:"City A"`         // Location of the congregation

	ID               string         `json:"id" example:"1"`                                            // Unique identifier for the congregation
	FullName         string         `json:"fullname" example:"John Doe"`                               // Full name of the congregant
	Gender           sql.NullString `json:"gender" null:"true" example:"Male"`                         // Gender of the congregant
	DateOfBirth      sql.NullString `json:"dateofbirth" null:"true" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            sql.NullString `json:"phone" null:"true" example:"+1234567890"`                   // Phone number of the congregant
	Email            sql.NullString `json:"email" null:"true" example:"john.doe@example.com"`          // Email address of the congregant
	Address          sql.NullString `json:"address" null:"true" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    sql.NullString `json:"maritalstatus" null:"true" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber sql.NullString `json:"familycardnumber" null:"true" example:"FC-12345"`           // Family card number of the congregant
	ClassSector      sql.NullString `json:"classsector" null:"true" example:"Youth"`                   // Class sector of the congregant
	Rayon            sql.NullString `json:"rayon" null:"true" example:"North"`                         // Rayon of the congregant
	JoinDate         sql.NullString `json:"joindate" null:"true" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" null:"true" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`                          // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`                        // Hashed password for authentication
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
	// Name     string `json:"name" binding:"required" example:"First Congregation"` // Name of the congregation
	// Location string `json:"location" binding:"required" example:"City A"`         // Location of the congregation

	FullName         string         `json:"fullname" binding:"required" example:"John Doe"`                      // Full name of the congregant
	Gender           sql.NullString `json:"gender" null:"true" binding:"required" example:"Male"`                // Gender of the congregant
	DateOfBirth      sql.NullString `json:"dateofbirth" null:"true" binding:"required" example:"1990-01-01"`     // Date of birth of the congregant
	Phone            sql.NullString `json:"phone" null:"true" binding:"required" example:"+1234567890"`          // Phone number of the congregant
	Email            sql.NullString `json:"email" null:"true" binding:"required" example:"john.doe@example.com"` // Email address of the congregant
	Address          sql.NullString `json:"address" null:"true" binding:"required" example:"123 Main St"`        // Address of the congregant
	MaritalStatus    sql.NullString `json:"maritalstatus" null:"true" binding:"required" example:"Single"`       // Marital status of the congregant
	FamilyCardNumber sql.NullString `json:"familycardnumber" null:"true" binding:"required" example:"FC-12345"`  // Family card number of the congregant
	ClassSector      sql.NullString `json:"classsector" null:"true" binding:"required" example:"Youth"`          // Class sector of the congregant
	Rayon            sql.NullString `json:"rayon" null:"true" binding:"required" example:"North"`                // Rayon of the congregant
	JoinDate         sql.NullString `json:"joindate" null:"true" binding:"required" example:"2020-01-01"`        // Join date of the congregant
	Photo            sql.NullString `json:"photo" null:"true" example:"https://example.com/photo.jpg"`           // URL to the photo of the congregant
}

type UpdateCongregationRequest struct {
	// Name     string `json:"name" example:"First Congregation"` // Name of the congregation
	// Location string `json:"location" example:"City A"`         // Location of the congregation

	FullName         string         `json:"fullname" example:"John Doe"`                               // Full name of the congregant
	Gender           sql.NullString `json:"gender" null:"true" example:"Male"`                         // Gender of the congregant
	DateOfBirth      sql.NullString `json:"dateofbirth" null:"true" example:"1990-01-01"`              // Date of birth of the congregant
	Phone            sql.NullString `json:"phone" null:"true" example:"+1234567890"`                   // Phone number of the congregant
	Email            sql.NullString `json:"email" null:"true" example:"john.doe@example.com"`          // Email address of the congregant
	Address          sql.NullString `json:"address" null:"true" example:"123 Main St"`                 // Address of the congregant
	MaritalStatus    sql.NullString `json:"maritalstatus" null:"true" example:"Single"`                // Marital status of the congregant
	FamilyCardNumber sql.NullString `json:"familycardnumber" null:"true" example:"FC-12345"`           // Family card number of the congregant
	ClassSector      sql.NullString `json:"classsector" null:"true" example:"Youth"`                   // Class sector of the congregant
	Rayon            sql.NullString `json:"rayon" null:"true" example:"North"`                         // Rayon of the congregant
	JoinDate         sql.NullString `json:"joindate" null:"true" example:"2020-01-01"`                 // Join date of the congregant
	Photo            sql.NullString `json:"photo" null:"true" example:"https://example.com/photo.jpg"` // URL to the photo of the congregant
	Username         string         `json:"username" example:"johnsihotang"`                          // Login username
	PasswordHash     string         `json:"-" example:"$2a$10$hashedpassword"`                        // Hashed password for authentication
}
