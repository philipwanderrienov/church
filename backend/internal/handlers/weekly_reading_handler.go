package handlers

import (
	"net/http"

	"church-app/internal/common/response"
	"church-app/internal/models"
	"church-app/internal/repository"

	"github.com/gin-gonic/gin"
)

// WeeklyReadingHandler handles weekly reading HTTP requests.
type WeeklyReadingHandler struct {
	repo *repository.WeeklyReadingRepository
}

// NewWeeklyReadingHandler creates a new weekly reading handler.
func NewWeeklyReadingHandler(repo *repository.WeeklyReadingRepository) *WeeklyReadingHandler {
	return &WeeklyReadingHandler{repo: repo}
}

// GetAllWeeklyReadings handles GET /weekly-readings
func (h *WeeklyReadingHandler) GetAllWeeklyReadings(c *gin.Context) {
	weeklyReadings, err := h.repo.GetAll()
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve weekly readings", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Weekly readings retrieved successfully", gin.H{
		"data":  weeklyReadings,
		"total": len(weeklyReadings),
	})
}

// GetWeeklyReadingByID handles GET /weekly-readings/:id
func (h *WeeklyReadingHandler) GetWeeklyReadingByID(c *gin.Context) {
	id := c.Param("id")
	weeklyReading, err := h.repo.GetByID(id)
	if err != nil {
		response.InternalServerError(c, "Failed to retrieve weekly reading", err.Error())
		return
	}
	if weeklyReading == nil {
		response.NotFound(c, "Weekly reading not found", nil)
		return
	}

	response.Success(c, http.StatusOK, "Weekly reading retrieved successfully", gin.H{
		"data": weeklyReading,
	})
}

// CreateWeeklyReading handles POST /weekly-readings
func (h *WeeklyReadingHandler) CreateWeeklyReading(c *gin.Context) {
	var req models.CreateWeeklyReadingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request data", err.Error())
		return
	}

	weeklyReading, err := h.repo.Create(req)
	if err != nil {
		response.InternalServerError(c, "Failed to create weekly reading", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Weekly reading created successfully", gin.H{
		"data": weeklyReading,
	})
}

// UpdateWeeklyReading handles PUT /weekly-readings/:id
func (h *WeeklyReadingHandler) UpdateWeeklyReading(c *gin.Context) {
	id := c.Param("id")

	var req models.UpdateWeeklyReadingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid request data", err.Error())
		return
	}

	weeklyReading, err := h.repo.Update(id, req)
	if err != nil {
		response.InternalServerError(c, "Failed to update weekly reading", err.Error())
		return
	}
	if weeklyReading == nil {
		response.NotFound(c, "Weekly reading not found", nil)
		return
	}

	response.Success(c, http.StatusOK, "Weekly reading updated successfully", gin.H{
		"data": weeklyReading,
	})
}

// DeleteWeeklyReading handles DELETE /weekly-readings/:id
func (h *WeeklyReadingHandler) DeleteWeeklyReading(c *gin.Context) {
	id := c.Param("id")
	err := h.repo.Delete(id)
	if err != nil {
		response.InternalServerError(c, "Failed to delete weekly reading", err.Error())
		return
	}

	c.Status(http.StatusNoContent)
}