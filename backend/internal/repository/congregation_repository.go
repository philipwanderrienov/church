package repository

import (
	"database/sql"
	"log"

	"church-app/internal/models"

	"github.com/google/uuid"
)

// CongregationRepository is the data access layer for congregations
type CongregationRepository struct {
	db *sql.DB
}

// NewCongregationRepository creates a new congregation repository
func NewCongregationRepository(db *sql.DB) *CongregationRepository {
	return &CongregationRepository{db: db}
}

// GetAll returns all congregations
func (r *CongregationRepository) GetAll() ([]models.Congregation, error) {
	// rows, err := r.db.Query("SELECT id, name, location FROM congregations")

	rows, err := r.db.Query("SELECT id, fullName, gender, dateOfBirth, phone, email, address, maritalStatus, familyCardNumber, classSector, rayon, joinDate, photo FROM congregations")

	if err != nil {
		// log the SQL error for troubleshooting
		log.Printf("error querying congregations: %v", err)
		return nil, err
	}
	defer rows.Close()

	// ---- this will return nil if there's no data.
	// ---- we have to return empty array [], so vite won't be error.
	// ---- because vite will doing .slice() method.
	// ---- so, we have to send empty array instead of nil
	// var congregations []models.Congregation

	var congregations []models.Congregation = []models.Congregation{} // this is an empty array[]

	for rows.Next() {
		var congregation models.Congregation
		if err := rows.Scan(&congregation.ID, &congregation.FullName, &congregation.Gender, &congregation.DateOfBirth, &congregation.Phone, &congregation.Email, &congregation.Address, &congregation.MaritalStatus, &congregation.FamilyCardNumber, &congregation.ClassSector, &congregation.Rayon, &congregation.JoinDate, &congregation.Photo); err != nil {
			return nil, err
		}
		congregations = append(congregations, congregation)
	}
	return congregations, nil
}

// GetByID retrieves a congregation by ID
func (r *CongregationRepository) GetByID(id string) (*models.Congregation, error) {
	var congregation models.Congregation
	err := r.db.QueryRow("SELECT id, fullName, gender, dateOfBirth, phone, email, address, maritalStatus, familyCardNumber, classSector, rayon, joinDate, photo FROM congregations WHERE id = $1", id).Scan(
		&congregation.ID, &congregation.FullName, &congregation.Gender, &congregation.DateOfBirth, &congregation.Phone, &congregation.Email, &congregation.Address, &congregation.MaritalStatus, &congregation.FamilyCardNumber, &congregation.ClassSector, &congregation.Rayon, &congregation.JoinDate, &congregation.Photo)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &congregation, nil
}

// Create adds a new congregation
func (r *CongregationRepository) Create(req models.CreateCongregationRequest) (*models.Congregation, error) {
	id := uuid.New().String()
	congregation := models.Congregation{
		ID:               id,
		FullName:         req.FullName,
		Gender:           req.Gender,
		DateOfBirth:      req.DateOfBirth,
		Phone:            req.Phone,
		Email:            req.Email,
		Address:          req.Address,
		MaritalStatus:    req.MaritalStatus,
		FamilyCardNumber: req.FamilyCardNumber,
		ClassSector:      req.ClassSector,
		Rayon:            req.Rayon,
		JoinDate:         req.JoinDate,
		Photo:            req.Photo,
	}
	_, err := r.db.Exec("INSERT INTO congregations (id, fullName, gender, dateOfBirth, phone, email, address, maritalStatus, familyCardNumber, classSector, rayon, joinDate, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
		congregation.ID, congregation.FullName, congregation.Gender, congregation.DateOfBirth, congregation.Phone, congregation.Email, congregation.Address, congregation.MaritalStatus, congregation.FamilyCardNumber, congregation.ClassSector, congregation.Rayon, congregation.JoinDate, congregation.Photo)
	if err != nil {
		return nil, err
	}
	return &congregation, nil
}

// Update modifies an existing congregation
func (r *CongregationRepository) Update(id string, req models.UpdateCongregationRequest) (*models.Congregation, error) {
	_, err := r.db.Exec("UPDATE congregations SET fullName = $1, gender = $2, dateOfBirth = $3, phone = $4, email = $5, address = $6, maritalStatus = $7, familyCardNumber = $8, classSector = $9, rayon = $10, joinDate = $11, photo = $12 WHERE id = $13",
		req.FullName, req.Gender, req.DateOfBirth, req.Phone, req.Email, req.Address, req.MaritalStatus, req.FamilyCardNumber, req.ClassSector, req.Rayon, req.JoinDate, req.Photo, id)
	if err != nil {
		return nil, err
	}
	congregation := models.Congregation{
		ID:               id,
		FullName:         req.FullName,
		Gender:           req.Gender,
		DateOfBirth:      req.DateOfBirth,
		Phone:            req.Phone,
		Email:            req.Email,
		Address:          req.Address,
		MaritalStatus:    req.MaritalStatus,
		FamilyCardNumber: req.FamilyCardNumber,
		ClassSector:      req.ClassSector,
		Rayon:            req.Rayon,
		JoinDate:         req.JoinDate,
		Photo:            req.Photo,
	}
	return &congregation, nil
}

// Delete removes a congregation by ID
func (r *CongregationRepository) Delete(id string) error {
	_, err := r.db.Exec("DELETE FROM congregations WHERE id = $1", id)
	return err
}
