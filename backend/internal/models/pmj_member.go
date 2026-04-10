package models

import "time"

type PMJMember struct {
	ID             string    `json:"id" db:"id"`
	CongregationID *string   `json:"congregation_id" db:"congregation_id"`
	Name           string    `json:"name" db:"name"`
	Photo          *string   `json:"photo" db:"photo"`
	Phone          *string   `json:"phone" db:"phone"`
	RoleTitle      *string   `json:"role_title" db:"role_title"`
	Active         bool      `json:"active" db:"active"`
	Notes          *string   `json:"notes" db:"notes"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
	UpdatedAt      time.Time `json:"updated_at" db:"updated_at"`
}

type CreatePMJMemberRequest struct {
	CongregationID *string `json:"congregation_id"`
	Name           string  `json:"name" binding:"required"`
	Photo          *string `json:"photo"`
	Phone          *string `json:"phone"`
	RoleTitle      *string `json:"role_title"`
	Active         *bool   `json:"active"`
	Notes          *string `json:"notes"`
}

type UpdatePMJMemberRequest struct {
	CongregationID *string `json:"congregation_id"`
	Name           string  `json:"name" binding:"required"`
	Photo          *string `json:"photo"`
	Phone          *string `json:"phone"`
	RoleTitle      *string `json:"role_title"`
	Active         *bool   `json:"active"`
	Notes          *string `json:"notes"`
}