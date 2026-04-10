package models

import "time"

type FullTimer struct {
	ID        string    `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Title     string    `json:"title" db:"title"`
	Phone     string    `json:"phone" db:"phone"`
	Photo     string    `json:"photo" db:"photo"`
	Active    bool      `json:"active" db:"active"`
	Notes     string    `json:"notes" db:"notes"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

type FullTimerCreateRequest struct {
	Name   string `json:"name" binding:"required"`
	Title  string `json:"title" binding:"required"`
	Phone  string `json:"phone"`
	Photo  string `json:"photo"`
	Active *bool  `json:"active"`
	Notes  string `json:"notes"`
}

type FullTimerUpdateRequest struct {
	Name   string `json:"name" binding:"required"`
	Title  string `json:"title" binding:"required"`
	Phone  string `json:"phone"`
	Photo  string `json:"photo"`
	Active *bool  `json:"active"`
	Notes  string `json:"notes"`
}
