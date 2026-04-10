package repository

import (
	"database/sql"

	"church-app/internal/models"
)

type PMJMemberRepository struct {
	db *sql.DB
}

func NewPMJMemberRepository(db *sql.DB) *PMJMemberRepository {
	return &PMJMemberRepository{db: db}
}

func (r *PMJMemberRepository) GetAll() ([]models.PMJMember, error) {
	query := `SELECT id, congregation_id, name, photo, phone, role_title, active, notes, created_at, updated_at
		FROM pmj_members
		ORDER BY created_at DESC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	members := []models.PMJMember{}
	for rows.Next() {
		var member models.PMJMember
		if err := rows.Scan(
			&member.ID,
			&member.CongregationID,
			&member.Name,
			&member.Photo,
			&member.Phone,
			&member.RoleTitle,
			&member.Active,
			&member.Notes,
			&member.CreatedAt,
			&member.UpdatedAt,
		); err != nil {
			return nil, err
		}
		members = append(members, member)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return members, nil
}

func (r *PMJMemberRepository) GetByID(id string) (*models.PMJMember, error) {
	query := `SELECT id, congregation_id, name, photo, phone, role_title, active, notes, created_at, updated_at
		FROM pmj_members
		WHERE id = $1`

	var member models.PMJMember
	err := r.db.QueryRow(query, id).Scan(
		&member.ID,
		&member.CongregationID,
		&member.Name,
		&member.Photo,
		&member.Phone,
		&member.RoleTitle,
		&member.Active,
		&member.Notes,
		&member.CreatedAt,
		&member.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &member, nil
}

func (r *PMJMemberRepository) Create(req models.CreatePMJMemberRequest) (*models.PMJMember, error) {
	query := `INSERT INTO pmj_members (id, congregation_id, name, photo, phone, role_title, active, notes, created_at, updated_at)
		VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, COALESCE($6, true), $7, NOW(), NOW())
		RETURNING id, congregation_id, name, photo, phone, role_title, active, notes, created_at, updated_at`

	var member models.PMJMember
	err := r.db.QueryRow(
		query,
		req.CongregationID,
		req.Name,
		req.Photo,
		req.Phone,
		req.RoleTitle,
		req.Active,
		req.Notes,
	).Scan(
		&member.ID,
		&member.CongregationID,
		&member.Name,
		&member.Photo,
		&member.Phone,
		&member.RoleTitle,
		&member.Active,
		&member.Notes,
		&member.CreatedAt,
		&member.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &member, nil
}

func (r *PMJMemberRepository) Update(id string, req models.UpdatePMJMemberRequest) (*models.PMJMember, error) {
	query := `UPDATE pmj_members
		SET congregation_id = $1,
			name = $2,
			photo = $3,
			phone = $4,
			role_title = $5,
			active = COALESCE($6, active),
			notes = $7,
			updated_at = NOW()
		WHERE id = $8
		RETURNING id, congregation_id, name, photo, phone, role_title, active, notes, created_at, updated_at`

	var member models.PMJMember
	err := r.db.QueryRow(
		query,
		req.CongregationID,
		req.Name,
		req.Photo,
		req.Phone,
		req.RoleTitle,
		req.Active,
		req.Notes,
		id,
	).Scan(
		&member.ID,
		&member.CongregationID,
		&member.Name,
		&member.Photo,
		&member.Phone,
		&member.RoleTitle,
		&member.Active,
		&member.Notes,
		&member.CreatedAt,
		&member.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &member, nil
}

func (r *PMJMemberRepository) Delete(id string) error {
	query := `DELETE FROM pmj_members WHERE id = $1`
	_, err := r.db.Exec(query, id)
	return err
}
