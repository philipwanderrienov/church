package repository

import (
	"database/sql"

	"church-app/internal/models"
)

// WeeklyReadingRepository is the data access layer for weekly readings.
type WeeklyReadingRepository struct {
	db *sql.DB
}

// NewWeeklyReadingRepository creates a new weekly reading repository.
func NewWeeklyReadingRepository(db *sql.DB) *WeeklyReadingRepository {
	return &WeeklyReadingRepository{db: db}
}

// GetAll retrieves all weekly readings from the database.
func (r *WeeklyReadingRepository) GetAll() ([]models.WeeklyReading, error) {
	rows, err := r.db.Query(`
		SELECT id, service_date, title, passage, notes, created_at, updated_at
		FROM weekly_readings
		ORDER BY service_date DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var weeklyReadings []models.WeeklyReading
	for rows.Next() {
		var weeklyReading models.WeeklyReading
		if err := rows.Scan(
			&weeklyReading.ID,
			&weeklyReading.ServiceDate,
			&weeklyReading.Title,
			&weeklyReading.Passage,
			&weeklyReading.Notes,
			&weeklyReading.CreatedAt,
			&weeklyReading.UpdatedAt,
		); err != nil {
			return nil, err
		}
		weeklyReadings = append(weeklyReadings, weeklyReading)
	}

	return weeklyReadings, nil
}

// GetByID retrieves a single weekly reading by its ID.
func (r *WeeklyReadingRepository) GetByID(id string) (*models.WeeklyReading, error) {
	var weeklyReading models.WeeklyReading
	err := r.db.QueryRow(`
		SELECT id, service_date, title, passage, notes, created_at, updated_at
		FROM weekly_readings
		WHERE id = $1
	`, id).Scan(
		&weeklyReading.ID,
		&weeklyReading.ServiceDate,
		&weeklyReading.Title,
		&weeklyReading.Passage,
		&weeklyReading.Notes,
		&weeklyReading.CreatedAt,
		&weeklyReading.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &weeklyReading, nil
}

// Create adds a new weekly reading to the database.
func (r *WeeklyReadingRepository) Create(req models.CreateWeeklyReadingRequest) (*models.WeeklyReading, error) {
	var weeklyReading models.WeeklyReading
	err := r.db.QueryRow(`
		INSERT INTO weekly_readings (service_date, title, passage, notes)
		VALUES ($1, $2, $3, $4)
		RETURNING id, service_date, title, passage, notes, created_at, updated_at
	`, req.ServiceDate, req.Title, req.Passage, req.Notes).Scan(
		&weeklyReading.ID,
		&weeklyReading.ServiceDate,
		&weeklyReading.Title,
		&weeklyReading.Passage,
		&weeklyReading.Notes,
		&weeklyReading.CreatedAt,
		&weeklyReading.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &weeklyReading, nil
}

// Update modifies an existing weekly reading by its ID.
func (r *WeeklyReadingRepository) Update(id string, req models.UpdateWeeklyReadingRequest) (*models.WeeklyReading, error) {
	var weeklyReading models.WeeklyReading
	err := r.db.QueryRow(`
		UPDATE weekly_readings
		SET service_date = $1,
			title = $2,
			passage = $3,
			notes = $4,
			updated_at = NOW()
		WHERE id = $5
		RETURNING id, service_date, title, passage, notes, created_at, updated_at
	`, req.ServiceDate, req.Title, req.Passage, req.Notes, id).Scan(
		&weeklyReading.ID,
		&weeklyReading.ServiceDate,
		&weeklyReading.Title,
		&weeklyReading.Passage,
		&weeklyReading.Notes,
		&weeklyReading.CreatedAt,
		&weeklyReading.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &weeklyReading, nil
}

// Delete removes a weekly reading by its ID.
func (r *WeeklyReadingRepository) Delete(id string) error {
	_, err := r.db.Exec("DELETE FROM weekly_readings WHERE id = $1", id)
	return err
}