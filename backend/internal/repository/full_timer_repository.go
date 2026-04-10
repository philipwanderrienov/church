package repository

import (
	"database/sql"
	"time"

	"church-app/internal/models"

	"github.com/google/uuid"
)

type FullTimerRepository struct {
	db *sql.DB
}

func NewFullTimerRepository(db *sql.DB) *FullTimerRepository {
	return &FullTimerRepository{db: db}
}

func (r *FullTimerRepository) List() ([]models.FullTimer, error) {
	rows, err := r.db.Query(`
		SELECT id, name, title, phone, photo, active, notes, created_at, updated_at
		FROM full_timers
		ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	items := make([]models.FullTimer, 0)
	for rows.Next() {
		var item models.FullTimer
		var phone, photo, notes sql.NullString
		err := rows.Scan(&item.ID, &item.Name, &item.Title, &phone, &photo, &item.Active, &notes, &item.CreatedAt, &item.UpdatedAt)
		if err != nil {
			return nil, err
		}
		item.Phone = phone.String
		item.Photo = photo.String
		item.Notes = notes.String
		items = append(items, item)
	}

	return items, rows.Err()
}

func (r *FullTimerRepository) GetByID(id string) (*models.FullTimer, error) {
	var item models.FullTimer
	var phone, photo, notes sql.NullString

	err := r.db.QueryRow(`
		SELECT id, name, title, phone, photo, active, notes, created_at, updated_at
		FROM full_timers
		WHERE id = $1
	`, id).Scan(&item.ID, &item.Name, &item.Title, &phone, &photo, &item.Active, &notes, &item.CreatedAt, &item.UpdatedAt)
	if err != nil {
		return nil, err
	}

	item.Phone = phone.String
	item.Photo = photo.String
	item.Notes = notes.String
	return &item, nil
}

func (r *FullTimerRepository) Create(req models.FullTimerCreateRequest) (*models.FullTimer, error) {
	now := time.Now().UTC()
	id := uuid.NewString()
	active := true
	if req.Active != nil {
		active = *req.Active
	}

	_, err := r.db.Exec(`
		INSERT INTO full_timers (id, name, title, phone, photo, active, notes, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`, id, req.Name, req.Title, req.Phone, req.Photo, active, req.Notes, now, now)
	if err != nil {
		return nil, err
	}

	return &models.FullTimer{
		ID:        id,
		Name:      req.Name,
		Title:     req.Title,
		Phone:     req.Phone,
		Photo:     req.Photo,
		Active:    active,
		Notes:     req.Notes,
		CreatedAt: now,
		UpdatedAt: now,
	}, nil
}

func (r *FullTimerRepository) Update(id string, req models.FullTimerUpdateRequest) (*models.FullTimer, error) {
	now := time.Now().UTC()
	active := true
	if req.Active != nil {
		active = *req.Active
	}

	_, err := r.db.Exec(`
		UPDATE full_timers
		SET name = $1, title = $2, phone = $3, photo = $4, active = $5, notes = $6, updated_at = $7
		WHERE id = $8
	`, req.Name, req.Title, req.Phone, req.Photo, active, req.Notes, now, id)
	if err != nil {
		return nil, err
	}

	return &models.FullTimer{
		ID:        id,
		Name:      req.Name,
		Title:     req.Title,
		Phone:     req.Phone,
		Photo:     req.Photo,
		Active:    active,
		Notes:     req.Notes,
		UpdatedAt: now,
	}, nil
}

func (r *FullTimerRepository) Delete(id string) error {
	_, err := r.db.Exec(`DELETE FROM full_timers WHERE id = $1`, id)
	return err
}
