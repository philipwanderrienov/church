package models

import "time"

// WeeklyReading represents a weekly reading entry stored in PostgreSQL.
type WeeklyReading struct {
	ID          string    `json:"id" example:"550e8400-e29b-41d4-a716-446655440000"`
	ServiceDate time.Time `json:"service_date" example:"2026-04-12"`
	Title       string    `json:"title" example:"Easter Sunday"`
	Passage     string    `json:"passage" example:"John 20:1-18"`
	Notes       *string   `json:"notes,omitempty" example:"He is risen"`
	CreatedAt   time.Time `json:"created_at" example:"2026-04-01T10:00:00Z"`
	UpdatedAt   time.Time `json:"updated_at" example:"2026-04-01T10:00:00Z"`
}

// CreateWeeklyReadingRequest is used for creating a weekly reading.
type CreateWeeklyReadingRequest struct {
	ServiceDate time.Time `json:"service_date" binding:"required" example:"2026-04-12"`
	Title       string    `json:"title" binding:"required" example:"Easter Sunday"`
	Passage     string    `json:"passage" binding:"required" example:"John 20:1-18"`
	Notes       *string   `json:"notes,omitempty" example:"He is risen"`
}

// UpdateWeeklyReadingRequest is used for updating a weekly reading.
type UpdateWeeklyReadingRequest struct {
	ServiceDate time.Time `json:"service_date" binding:"required" example:"2026-04-12"`
	Title       string    `json:"title" binding:"required" example:"Easter Sunday"`
	Passage     string    `json:"passage" binding:"required" example:"John 20:1-18"`
	Notes       *string   `json:"notes,omitempty" example:"He is risen"`
}

// WeeklyReadingResponse is the standard response structure for a weekly reading.
type WeeklyReadingResponse struct {
	Message string         `json:"message" example:"Weekly reading retrieved successfully"`
	Data    *WeeklyReading `json:"data"`
}

// WeeklyReadingsListResponse is the response structure for multiple weekly readings.
type WeeklyReadingsListResponse struct {
	Message string           `json:"message" example:"Weekly readings retrieved successfully"`
	Data    []WeeklyReading  `json:"data"`
	Total   int              `json:"total" example:"1"`
}

// WeeklyReadingErrorResponse is the standard error response structure.
type WeeklyReadingErrorResponse struct {
	Error string `json:"error" example:"Weekly reading not found"`
	Code  int    `json:"code" example:"404"`
}