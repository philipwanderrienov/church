package repository

import (
	"database/sql"
	"strings"

	"church-app/internal/models"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// AccountRepository is the data access layer for accounts
type AccountRepository struct {
	db *sql.DB
}

// NewAccountRepository creates a new account repository
func NewAccountRepository(db *sql.DB) *AccountRepository {
	return &AccountRepository{db: db}
}

// GetAll returns all accounts
func (r *AccountRepository) GetAll() ([]models.Account, error) {
	rows, err := r.db.Query("SELECT id, name, email, username, role FROM accounts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var accounts []models.Account
	for rows.Next() {
		var account models.Account
		if err := rows.Scan(&account.ID, &account.Fullname, &account.Email, &account.Username, &account.Role); err != nil {
			return nil, err
		}
		accounts = append(accounts, account)
	}
	return accounts, nil
}

// GetByID retrieves an account by ID
func (r *AccountRepository) GetByID(id string) (*models.Account, error) {
	var account models.Account
	err := r.db.QueryRow("SELECT id, fullname, email, username, role FROM accounts WHERE id = $1", id).Scan(
		&account.ID, &account.Fullname, &account.Email, &account.Username, &account.Role)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &account, nil
}

// Create adds a new account
func (r *AccountRepository) Create(req models.CreateAccountRequest) (*models.Account, error) {
	id := req.ID
	if strings.TrimSpace(id) == "" {
		id = uuid.New().String()
	}
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	account := models.Account{
		ID:       id,
		Fullname: req.Fullname,
		Email:    req.Email,
		Username: req.Username,
		Role:     req.Role,
	}
	_, err = r.db.Exec("INSERT INTO accounts (id, fullname, email, username, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6)",
		account.ID, account.Fullname, account.Email, account.Username, string(passwordHash), account.Role)
	if err != nil {
		return nil, err
	}
	return &account, nil
}

// Update modifies an existing account
func (r *AccountRepository) Update(id string, req models.UpdateAccountRequest) (*models.Account, error) {
	if strings.TrimSpace(req.Password) != "" {
		passwordHash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, err
		}
		_, err = r.db.Exec("UPDATE accounts SET fullname = $1, email = $2, username = $3, password_hash = $4, role = $5 WHERE id = $6",
			req.Fullname, req.Email, req.Username, string(passwordHash), req.Role, id)
		if err != nil {
			return nil, err
		}
	} else {
		_, err := r.db.Exec("UPDATE accounts SET fullname = $1, email = $2, username = $3, role = $4 WHERE id = $5",
			req.Fullname, req.Email, req.Username, req.Role, id)
		if err != nil {
			return nil, err
		}
	}
	account := models.Account{
		ID:       id,
		Fullname: req.Fullname,
		Email:    req.Email,
		Username: req.Username,
		Role:     req.Role,
	}
	return &account, nil
}

// Delete removes an account by ID
func (r *AccountRepository) Delete(id string) error {
	_, err := r.db.Exec("DELETE FROM accounts WHERE id = $1", id)
	return err
}
